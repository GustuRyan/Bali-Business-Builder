<script lang="ts" setup>
import { GeneralResponse, Product, AuthUser } from "@/types";

import { storeToRefs } from "pinia";

import { useTimeoutFn } from "@vueuse/core";

const { serviceFormIntro } = useSchema();

const emit = defineEmits(["completed"]);

const formStore = useFormVisa();

const { authHelper } = usePersonLocalstorage();

const { $user, $isLogin } = useAuth();

const { authUser } = useHelperNonLogin();

const { minDate } = useDateHelper();

const { t: $t, locale } = useI18n();

const { formatCurrency } = useMoneyFormat();

const { phoneLocalStrorage } = usePhone();

const { loading, setErrorMessage, message, alertType, transformErrors } =
  useStateRequestHelper();

const store = useProductStore();

const storeForm = useFormStore();

const { getProduct: products } = storeToRefs(store);

const { dataForm } = storeToRefs(formStore);

const { start: startTimeout, stop: stopTimeout } = useTimeoutFn(() => {
  resetVariant();
}, 1000);

const slug = computed(() => {
  return products.value.find(
    (product) => product.id === dataForm.value.product_id
  )?.slug;
});

const productDesription = computed(() => {
  return products.value.find(
    (product) => product.id === dataForm.value.product_id
  )?.description;
});

/**
 * product selected
 *
 */
const product = computed(() => {
  return storeForm.product;
});

/**
 * variants from selected product
 *
 */
const variants = computed(() => {
  return product.value?.variants ?? [];
});

const isVaried = computed(() => {
  return variants.value?.length > 1;
});

const idVariants = computed(() => {
  return variants.value?.map((el) => el.id);
});

const selectedVariant = computed(() => {
  return variants.value?.find((el) => el.id === dataForm.value.variant_id);
});

const isExpress = computed(() => {
  return dataForm.value.is_express_mode;
});

const expressDay = computed(() => {
  if (isVaried.value) {
    return Number(selectedVariant.value?.express_estimated_day);
  }
  return Number(product.value?.express_estimated_day);
});

const estimateDayProduct = computed(() => {
  if (isExpress.value) {
    return Number(expressDay.value);
  }
  return isVaried.value
    ? Number(selectedVariant.value?.estimated_day)
    : Number(product.value?.estimated_day);
});

const isExtend = computed(() => {
  return products.value.find(
    (product) => product.id === dataForm.value.product_id
  )?.is_extend;
});

const disabledFormForUserAuth = computed(() => {
  return $isLogin;
});

/**
 * FIXME: this is not implemented well
 *
 * the express should come from the product object when the product have experss mode
 * then able to show the express price switch on frontend
 *
 */
const showExpressSwitch = computed(() => {
  return product.value.is_express === 1;
});

const _expressPrice = computed(() => {
  let expressPrice;
  if (isVaried.value) {
    expressPrice = selectedVariant.value?.express_usd_price ?? 0;
  } else {
    expressPrice = product.value?.express_usd_price ?? 0;
  }

  return Number(expressPrice);
});

const _productPrice = computed(() => {
  if (isVaried.value) {
    return Number(selectedVariant.value?.usd_price);
  }
  return Number(product.value?.usd_price);
});

const productPrice = computed(() => {
  /**
   * need to refactor this
   * should use express price only or sum with express price
   */
  if (dataForm.value.is_express_mode) {
    const variantPrice = _productPrice.value ?? 0;
    const expressPrice = _expressPrice.value ?? 0;
    return Number(variantPrice) + Number(expressPrice);
  }
  return _productPrice.value;
});

const totalPrice = computed(() => {
  return (productPrice?.value as number) * dataForm.value.total_apply;
});

watch(
  () => slug.value,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      getVariants();
    }
  },
  { immediate: true }
);

watch(
  () => showExpressSwitch.value,
  (value) => {
    if (!value) {
      dataForm.value.is_express_mode = false;
    }
  }
);

watch(
  () => isExtend.value,
  (value) => {
    dataForm.value.is_extend = value;
    if (value === 0) {
      dataForm.value.delivery_address = undefined;
      dataForm.value.pickup_address = undefined;
      dataForm.value.visa_validation_end_at = undefined;
    } else {
      dataForm.value.date_arriving_in_indonesia = undefined;
    }
  }
);

async function resetVariant() {
  await nextTick();
  if (!idVariants.value.includes(dataForm.value.variant_id as number)) {
    dataForm.value.variant_id = undefined;
  }
  stopTimeout();
}
async function getVariants() {
  if (!slug.value) {
    return;
  }

  await nextTick();

  loading.value = true;
  storeForm.setProduct(undefined);
  const { data: productVariant } = await useCustomFetch<
    GeneralResponse<Product>
  >(`products/${slug.value}?lang=${locale.value}`, {
    method: "GET",
  });
  storeForm.setProduct(productVariant.value?.data);
  startTimeout();

  loading.value = false;
}

async function createNewUser(ctx: any) {
  loading.value = true;

  const { data, error } = await useCustomFetch<GeneralResponse<AuthUser>>(
    `create-user?lang=${locale.value}`,
    {
      method: "POST",
      body: { ...dataForm.value },
    }
  );
  if (error.value) {
    setErrorMessage(error.value?.data?.message);
    ctx.setErrors(transformErrors(error.value?.data));
  } else if (data.value) {
    authUser.value = data.value.data;
    storeForm.setUser({ ...data.value.data });

    setAuthNotLogin();
    emit("completed", true);
  }

  loading.value = false;
}

function setAuthNotLogin() {
  if (authUser.value) {
    storeForm.setUser({ ...authUser.value });
  }
}

function updateAuthHelper() {
  authHelper.value.email = dataForm.value.email;
  authHelper.value.first_name = dataForm.value.first_name;
  authHelper.value.last_name = dataForm.value.last_name;
  authHelper.value.mobile_number = dataForm.value.mobile_number;
}

async function onSubmit(values: any, ctx: any) {
  await nextTick();

  if (isVaried.value && !dataForm.value.variant_id) {
    ctx.setErrors({ variant_id: $t("validity_period_required_msg") });
    return;
  }

  if (!isExtend.value && !dataForm.value.date_arriving_in_indonesia) {
    ctx.setErrors({
      date_arriving_in_indonesia: $t("date_arrive_required_msg"),
    });
    return;
  }

  if (isExtend.value && !dataForm.value.pickup_address) {
    ctx.setErrors({
      pickup_address: $t("pickup_address_required_msg"),
    });
    return;
  }

  if (isExtend.value && !dataForm.value.delivery_address) {
    ctx.setErrors({
      delivery_address: $t("delivery_address_required_msg"),
    });
    return;
  }

  if (isExtend.value && !dataForm.value.visa_validation_end_at) {
    ctx.setErrors({
      visa_validation_end_at: $t("date_current_visa_required_msg"),
    });
    return;
  }

  storeForm.setTotalOrder(totalPrice.value);
  storeForm.setIntro({ ...dataForm.value });

  updateAuthHelper();

  if ($isLogin) {
    emit("completed", true);
  } else {
    createNewUser(ctx);
  }
}

onMounted(async () => {
  await nextTick();
  if (dataForm.value.variant_id) {
    storeForm.setIntro({ ...dataForm.value });
    storeForm.setTotalOrder(totalPrice.value);
  }

  if ($isLogin) {
    dataForm.value.first_name = $user.value?.first_name;
    dataForm.value.last_name = $user.value?.last_name;
    dataForm.value.email = $user.value?.email;
    dataForm.value.mobile_number =
      $user.value?.mobile_number ?? phoneLocalStrorage.value;
  } else {
    dataForm.value.first_name = authHelper.value?.first_name;
    dataForm.value.last_name = authHelper.value?.last_name;
    dataForm.value.email = authHelper.value?.email;
    dataForm.value.mobile_number = authHelper.value?.mobile_number;
  }

  if (authUser.value?.email) {
    storeForm.setUser({ ...authUser.value });
  }

  getVariants();
});

//
</script>

<template>
  <ClientOnly>
    <div class="rounded-lg border p-8">
      <VeeForm @submit="onSubmit" :validation-schema="serviceFormIntro" v-slot="{ errors }">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 divide-x">
          <div>
            <Alert :type="alertType" v-model="message" />
            <div class="space-y-8">
              <!-- wrap with form -->

              <div class="hidden">
                <VeeField name="is_extend" :validateOnChange="true" v-model="dataForm.is_extend">
                </VeeField>
                <VeeField name="is_varied" :validateOnChange="true" :value="isVaried">
                </VeeField>
              </div>

              <FormGroup :label="$t('select_our_service_txt')" name="product_id">
                <FormSpSelect v-model="dataForm.product_id" name="product_id"
                  class="select select-bordered w-full h-11 select-sm">
                  <option disabled selected value="">
                    {{ $t("select_our_service_txt") }}
                  </option>
                  <option v-for="item in products" :value="item.id">
                    {{ item.name }}
                  </option>
                </FormSpSelect>
              </FormGroup>

              <div class="text-sm text-gray-500" v-if="productDesription">
                {{ productDesription }}
              </div>

              <div class="flex justify-between items-center">
                <div class="font-semibold text-black :text-base leading-5" v-html="$t('total_visa_going_apply_txt')">
                </div>
                <div>
                  <FormNumber v-model="dataForm.total_apply" />
                </div>
                <div class="hidden">
                  <VeeField name="total_apply" :value="dataForm.total_apply" />
                </div>
              </div>
              <template v-if="isExtend">
                <hr />
                <div class="font-medium">
                  {{ $t("title_pickup_and_delivery_txt") }}
                </div>
                <div>
                  <FormGroup :label="$t('pickup_address_txt')" name="pickup_address">
                    <FormSpInput type="text-base" v-model="dataForm.pickup_address" name="pickup_address"
                      placeholder="eq: Canggu" class="input-bordered w-full input-sm h-11" />
                  </FormGroup>
                </div>
                <div>
                  <FormGroup :label="$t('delivery_address_txt')" name="delivery_address">
                    <FormSpInput type="text-base" v-model="dataForm.delivery_address" name="delivery_address"
                      placeholder="eq: Canggu" class="input-bordered w-full input-sm h-11" />
                  </FormGroup>
                </div>
              </template>
              <hr />
              <template v-if="dataForm.product_id">
                <div v-if="variants && variants.length">
                  <FormGroup name="validity_period" label="Validity Period">
                    <div class="space-y-2">
                      <template v-for="(variant, index) in variants" :key="index">
                        <div class="cursor-pointer flex space-x-2 items-center">
                          <VeeField name="variant_id" type="radio" v-model="dataForm.variant_id"
                            :validate-on-change="true" :validate-on-input="true">
                            <input type="radio" class="radio" :value="variant.id" v-model="dataForm.variant_id"
                              :checked="variant.id === dataForm.variant_id" />
                          </VeeField>
                          <label :for="variant.name">{{ variant.name }},
                            <span v-if="dataForm.is_express_mode" class="transition-all duration-300">
                              {{ $t("additional_price_txt") }}:
                              {{ formatCurrency(variant.express_usd_price) }}
                            </span>
                          </label>
                        </div>
                      </template>
                    </div>

                    <VeeErrorMessage name="variant_id" class="text-error" />
                  </FormGroup>
                </div>

                <div v-else>
                  {{ $t("estimated_days_note", { estimateDayProduct }) }}
                </div>

                <hr />
              </template>

              <template v-if="isExtend">
                <div class="space-y-2">
                  <span class="font-bold">{{
                    $t("my_current_visa_valid_until_txt")
                  }}</span>
                  <div class="opacity-50 text-sm">
                    {{ $t("my_current_visa_valid_until_desc_txt") }}
                  </div>
                </div>

                <div>
                  <FormSpInput name="visa_validation_end_at" class="input-bordered input-sm h-11 w-full" type="date"
                    :min="minDate" placeholder="2024-01-01" v-model="dataForm.visa_validation_end_at" />
                </div>
              </template>
              <template v-else>
                <div class="space-y-2">
                  <span class="font-bold">{{
                    $t("when_you_arriving_to_indonesia_txt")
                  }}</span>
                  <div class="opacity-50 text-sm">
                    {{ $t("arriving_to_indonesia_txt") }}
                  </div>
                </div>

                <div>
                  <FormSpInput name="date_arriving_in_indonesia" class="input-bordered input-sm h-11 w-full" type="date"
                    placeholder="2024-01-01" :min="minDate" v-model="dataForm.date_arriving_in_indonesia" />
                </div>
              </template>
              <div v-if="showExpressSwitch">
                <div class="flex space-x-2 items-center">
                  <VeeField v-slot="{ field }" name="is_express_mode">
                    <input type="checkbox" class="toggle toggle-sm h-5" v-model="dataForm.is_express_mode"
                      v-bind="field" />
                  </VeeField>
                  <span class="font-semibold text-base text-black">
                    {{ $t("express_mode_txt") }}
                  </span>
                </div>
                <div class="text-sm text-gray-500" v-if="dataForm.is_express_mode">
                  {{ $t("exppress_description_days", { expressDay }) }}
                  .{{ $t("additional_price_txt") }} :
                  {{ countGapPencen(_productPrice, _expressPrice) }}
                </div>
              </div>
              <EstimateDoc v-if="selectedVariant" :product_estimate_day="estimateDayProduct" />
            </div>
          </div>

          <div>
            <div class="p-6 space-y-4">
              <div class="font-bold">{{ $t("intoduce_your_self_txt") }}</div>
              <div class="text-gray-500 text-sm">
                {{ $t("into_note_txt") }}
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FormGroup :label="$t('first_name_txt')" name="first_name">
                    <FormSpInput class="input-bordered w-full input-sm h-11" name="first_name" placeholder="jhon"
                      v-model="dataForm.first_name" :disabled="disabledFormForUserAuth" />
                  </FormGroup>
                </div>
                <div>
                  <FormGroup :label="$t('last_name_txt')" name="last_name">
                    <FormSpInput class="input-bordered w-full input-sm h-11" name="last_name" v-model="dataForm.last_name"
                      placeholder="doe" :disabled="disabledFormForUserAuth" />
                  </FormGroup>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <VeeField v-slot="{ field }" name="is_taking_for_self">
                  <input class="toggle toggle-sm h-5" type="checkbox" v-bind="field"
                    v-model="dataForm.is_taking_for_self" />
                </VeeField>
                <div class="text-sm">
                  {{ $t("taking_for_self_msg") }}
                </div>
              </div>
              <FormGroup :label="$t('email_txt')" name="email">
                <FormSpInput placeholder="jhondoe@gmail" v-model="dataForm.email" name="email"
                  class="input-bordered w-full input-sm h-11" :disabled="disabledFormForUserAuth" />
              </FormGroup>
              <div class="hidden">
                <VeeField name="is_authenticate" :value="$isLogin" />
                <VeeField name="mobile_number" v-model="dataForm.mobile_number" />
              </div>
              <div>
                <FormGroup :label="$t('phone_txt')" name="mobile_number">
                  <VeeField name="mobile_number" as="div" v-slot="{ handleInput }" v-model="dataForm.mobile_number">
                    <VueTelInput v-model="dataForm.mobile_number" class="!rounded-lg !p-0.5 !h-11" @on-input="handleInput"
                      :disabled="disabledFormForUserAuth" :inputOptions="{
                        styleClasses: 'disabled:!bg-gray-200/50',
                      }" />
                  </VeeField>
                </FormGroup>
                <VeeErrorMessage name="mobile_number" class="text-error" />
              </div>

              <div class="flex justify-between items-center">
                <div class="text-gray-500">{{ $t("total_txt") }}</div>
                <div class="font-bold">
                  {{ formatCurrency(totalPrice) }}
                </div>
              </div>
              <div>
                <button type="submit" :disabled="loading" class="btn btn-block btn-neutral btn-md rounded-full">
                  {{ $t("continue_txt") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </VeeForm>
    </div>
  </ClientOnly>
</template>

<style></style>

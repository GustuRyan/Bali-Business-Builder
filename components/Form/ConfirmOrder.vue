<script lang="ts" setup>
import { GeneralResponse, Product, payment, Promo } from "@/types";

import { storeToRefs } from "pinia";

const { t: $t, locale } = useI18n();

const snackbar = useSnackbar();

const { $user, $isLogin } = useAuth();

const { formatCurrency } = useMoneyFormat();

const formVisa = useFormVisa();

const { dataForm } = storeToRefs(formVisa);

const store = useFormStore();

const emit = defineEmits(["completed"]);

const productStore = useProductStore();

const {
  formPersons: persons,
  product: selectedProduct,
  getUser: authUser,
} = storeToRefs(store);

const { formConfirmPaymentSchema } = useSchema();

const { loading, message, setErrorMessage, alertType, transformErrors } =
  useStateRequestHelper();

const finalUser = computed(() => {
  return $user.value ?? authUser.value;
});

const promo = ref<Promo>();

const orderData = computed(() => {
  return {
    products: [
      {
        id: dataForm.value.product_id,
        variant_id: dataForm.value.variant_id,
        quantity: dataForm.value.total_apply,
        is_express: dataForm.value.is_express_mode ? 1 : 0,
      },
    ],
    person_forms: persons.value.map((el) => ({
      uuid: el.uuid,
      id: el.id,
    })),
    user_uuid: authUser.value.uuid,
    is_for_other_person: dataForm.value.is_taking_for_self ? 1 : 0,
    arrive_at: dataForm.value.date_arriving_in_indonesia,
    visa_validation_end_at: dataForm.value.visa_validation_end_at,
    is_extend: dataForm.value.is_extend,
    pickup_address: dataForm.value.pickup_address,
    deliver_address: dataForm.value.delivery_address,
    promo_uuid: promo.value?.uuid,
  };
});

const product = computed(() => {
  return productStore.getProductById(dataForm.value.product_id as number);
});

const variants = computed(() => {
  return selectedProduct.value.variants;
});

const isVaried = computed(() => {
  return variants.value.length >= 1;
});

const selectedVariant = computed(() => {
  let variant = variants.value?.find(
    (el) => el.id === dataForm.value.variant_id
  );

  return variant;
});

const slug = computed(() => {
  return product.value?.slug;
});

const productPrice = computed(() => {
  let price;

  if (isVaried.value) {
    price = parseFloat(selectedVariant.value?.usd_price as string).toFixed(2);
  } else {
    price = parseFloat(selectedProduct.value?.usd_price as string).toFixed(2);
  }

  return Number(price);
});

const _expressPrice = computed(() => {
  if (isVaried.value) {
    return parseFloat(selectedVariant.value?.express_usd_price as string).toFixed(
      2
    );
  }
  return parseFloat(selectedProduct.value.express_usd_price).toFixed(2);
});

const expressPrice = computed(() => {
  if (dataForm.value.is_express_mode) {
    return Number(_expressPrice.value);
  }
  return 0;
});

const totalExpressPrice = computed(() => {
  if (dataForm.value.is_express_mode) {
    return expressPrice.value * dataForm.value.total_apply;
  }
  return 0;
});

const expressDay = computed(() => {
  if (isVaried.value) {
    Number(selectedVariant.value?.express_estimated_day);
  }
  return Number(selectedProduct.value.express_estimated_day);
});

const _estimatedDayProduct = computed(() => {
  if (isVaried.value) {
    return Number(selectedVariant.value?.estimated_day);
  }
  return Number(selectedProduct.value.estimated_day);
});

const estimateDayProduct = computed(() => {
  if (dataForm.value.is_express_mode) {
    return expressDay.value;
  }
  return _estimatedDayProduct.value;
});

/**
 * FIXME: need to test
 *
 */
const totalPrice = computed(() => {
  if (dataForm.value.is_express_mode) {
    const priceProudct =
      (productPrice.value as number) * dataForm.value.total_apply;
    const expressTotalPrice =
      (expressPrice.value as number) * dataForm.value.total_apply;

    return priceProudct + expressTotalPrice;
  }
  return (productPrice.value as number) * dataForm.value.total_apply;
});

const totalPriceProduct = computed(() => {
  return (productPrice.value as number) * dataForm.value.total_apply;
});

const priceAfterDiscount = computed<number>(() => {
  if (!promo.value) {
    return totalPrice.value;
  }
  const str = promo.value.amount_usd?.toString() as string;
  const promoAmount = parseFloat(str.replace(/,/g, ""));

  const totalCalc = calculateDiscount(
    totalPrice.value,
    promoAmount,
    promo.value.type as "percentage" | "fixed"
  );

  return totalCalc ? (totalCalc <= 0 ? 0 : totalCalc) : 0;
});

const disabledIfTotalPriceProductZero = computed(() => {
  if (loading.value) {
    return true;
  }
  return priceAfterDiscount.value <= 0;
});

const showMessageIfTotalPriceProductZero = computed(() => {
  return priceAfterDiscount.value <= 0;
});

const gapTotalAndDiscount = computed(() => {
  if (!priceAfterDiscount.value) {
    return totalPrice.value;
  }
  return totalPrice.value - priceAfterDiscount.value;
});

const isExtend = computed(() => {
  return dataForm.value.is_extend === 1;
});

const discountTypeLabel = computed(() => {
  if (promo.value) {
    return promo.value.type === "percentage"
      ? promo.value.amount + "%"
      : "$" + promo.value.amount;
  }
  return "";
});

const showExpressSwitch = computed(() => {
  return product.value?.is_express === 1;
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

async function orderNonLogin(ctx: any) {
  store.setIntro({ ...dataForm.value });
  loading.value = true;
  const dataOrder = { ...toRaw(orderData.value) };
  const { data, error } = await useCustomFetch<GeneralResponse<payment>>(
    `/orders?lang=${locale.value}`,
    {
      method: "POST",
      body: dataOrder,
    }
  );
  if (error.value) {
    setErrorMessage(error.value?.data?.message);
    ctx.setErrors(transformErrors(error.value?.data));
  } else {
    if (data.value?.data.payment_url) {
      window.location.href = data.value?.data.payment_url;
    }
    await snackbar.clear();
    await snackbar.add({
      type: "success",
      text: $t("add_order_success_txt"),
      groupKey: new Date().toISOString(),
    });
    emit("completed", true);
  }
  loading.value = false;
}

async function orderForLoginUser(ctx: any) {
  store.setIntro({ ...dataForm.value });
  loading.value = true;
  const dataOrder = { ...toRaw(orderData.value) };
  const { data, error } = await useCustomFetch<GeneralResponse<payment>>(
    `users/${$user.value?.uuid}/orders?lang=${locale.value}`,
    {
      method: "POST",
      body: dataOrder,
    }
  );
  if (error.value) {
    setErrorMessage(error.value?.data?.message);
    ctx.setErrors(transformErrors(error.value?.data));
  } else {
    if (data.value?.data.payment_url) {
      window.location.href = data.value?.data.payment_url;
    }
    await snackbar.clear();
    await snackbar.add({
      type: "success",
      text: $t("add_order_success_txt"),
      groupKey: new Date().toISOString(),
    });

    emit("completed", true);
  }
  loading.value = false;
}

async function getVariants() {
  await nextTick();
  loading.value = true;
  const { data: productVariant } = await useCustomFetch<
    GeneralResponse<Product>
  >(`products/${slug.value}?lang=${locale.value}`, {
    method: "GET",
  });
  store.setProduct(productVariant.value?.data);
  loading.value = false;
}

function calculateDiscount(
  total: number,
  discount: number,
  discount_type: "percentage" | "fixed"
) {
  let finalTotal;

  if (discount_type === "fixed") {
    finalTotal = total - discount;
  } else if (discount_type === "percentage") {
    finalTotal = total - total * (discount / 100);
  }

  return finalTotal;
}

async function submit(values: any, ctx: any) {
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

  if (isExtend.value && !dataForm.value.visa_validation_end_at) {
    ctx.setErrors({
      visa_validation_end_at: $t("date_current_visa_required_msg"),
    });
    return;
  }

  if ($isLogin) {
    orderForLoginUser(ctx);
  } else {
    orderNonLogin(ctx);
  }
}

onMounted(async () => {
  await nextTick();
});
</script>

<template>
  <div class="rounded-lg border p-8">
    <VeeForm :validation-schema="formConfirmPaymentSchema" @submit="submit" v-slot="{ errors }">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:divide-x">
        <div class="space-y-4">
          <div>
            <template v-if="Object.keys(errors).length">
              <p>
                {{ $t("please_following_error_txt") }}
              </p>
              <ul>
                <li class="text-error" v-for="(message, field) in errors" :key="field">
                  {{ message }}
                </li>
              </ul>
            </template>
          </div>
          <div v-if="message">
            <Alert :message="message" :type="alertType" />
          </div>
          <div class="flex flex-col">
            <div class="font-bold">{{ $t("confirm_order_txt") }}</div>
            <div class="opacity-50 text-sm">
              {{ $t("form_confirm_order_desc_txt") }}
            </div>
          </div>
          <hr />
          <div class="space-y-2 py-4">
            <span class="font-semibold text-black !text-base">
              {{ $t("indentity_txt") }}
            </span>
            <div class="grid grid-cols-2 gap-4">
              <template v-for="(person, index) in persons" :key="index + 'p'">
                <CardIndentity :person="person" />
              </template>
            </div>
          </div>
          <hr />
          <div class="hidden">
            <VeeField name="is_varied" :value="isVaried" />
            <VeeField name="validity_period" v-model="dataForm.variant_id" />
          </div>
          <div>
            <FormGroup name="validity_period" :label="$t('validity_period_txt')"
              :description="selectedProduct.description" top-description>
              <div class="space-y-2 mt-3" v-if="isVaried">
                <template v-for="(variant, index) in variants" :key="index">
                  <div class="cursor-pointer flex space-x-2 items-center">
                    <VeeField v-slot="{ field }" name="variant_id" type="radio" :value="variant.id">
                      <input type="radio" class="radio" :value="variant.id" v-bind="field" v-model="dataForm.variant_id"
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
              <div v-else>
                {{ $t("estimated_days_note", { estimateDayProduct }) }}
              </div>
            </FormGroup>
            <VeeErrorMessage name="validity_period" class="text-error" />
          </div>

          <hr />

          <div v-if="dataForm.is_extend">
            <FormGroup :label="$t('my_current_visa_valid_until_txt')"
              :description="$t('my_current_visa_valid_until_desc_txt')" name="visa_validation_end_at" top-description>
              <FormSpInput type="date" v-model="dataForm.visa_validation_end_at" name="visa_validation_end_at"
                placeholder="eq: yyyy-mm-dd" class="input-bordered w-full input-sm h-11" />
            </FormGroup>
          </div>

          <div v-else>
            <FormGroup :label="$t('when_you_arriving_to_indonesia_txt')" :description="$t('arriving_to_indonesia_txt')"
              name="date_arriving_in_indonesia" top-description>
              <FormSpInput type="date" v-model="dataForm.date_arriving_in_indonesia" name="date_arriving_in_indonesia"
                placeholder="eq: yyyy-mm-dd" class="input-bordered w-full input-sm h-11" />
            </FormGroup>
          </div>
          <div v-if="showExpressSwitch">
            <div class="flex space-x-2 items-center">
              <VeeField v-slot="{ field }" name="is_express_mode">
                <input type="checkbox" class="toggle toggle-sm h-5" v-model="dataForm.is_express_mode" v-bind="field" />
              </VeeField>
              <span class="font-semibold text-base text-black">
                {{ $t("express_mode_txt") }}
              </span>
            </div>
            <div class="text-sm text-gray-500" v-if="dataForm.is_express_mode">
              {{ $t("exppress_description_days", { expressDay }) }}.
              {{ $t("additional_price_txt") }} :
              {{ countGapPencen(totalPrice, totalExpressPrice) }}
            </div>
          </div>
        </div>

        <div class="space-y-4 lg:pl-8">
          <EstimateDoc v-if="estimateDayProduct" :product_estimate_day="estimateDayProduct" />
          <hr />

          <FormVoucher :user="finalUser" v-model:promo="promo" />
          <hr />
          <div>
            <div class="overflow-x-auto">
              <table class="table">
                <!-- head -->

                <tbody>
                  <!-- row 1 -->
                  <tr>
                    <td class="font-bold">{{ $t("item_txt") }}</td>
                    <td>{{ $t("price_txt") }}</td>
                    <td>{{ $t("total_txt") }}</td>
                  </tr>
                  <!-- row 2 -->
                  <tr>
                    <td class="font-bold">
                      {{ product?.name }}
                    </td>
                    <td>
                      {{ dataForm.total_apply }}
                      x
                      {{ formatCurrency(productPrice) }}
                    </td>
                    <td>{{ formatCurrency(totalPriceProduct) }}</td>
                  </tr>
                  <tr>
                    <td class="font-bold">{{ $t("express_txt") }}</td>
                    <td>
                      <div v-if="dataForm.is_express_mode">
                        {{ dataForm.total_apply }} x
                        {{ formatCurrency(expressPrice) }}
                      </div>
                    </td>
                    <td>
                      <span v-if="dataForm.is_express_mode">
                        {{ formatCurrency(totalExpressPrice as number) }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="font-bold">{{ $t("discount_txt") }}</td>
                    <td>
                      {{ discountTypeLabel }}
                    </td>
                    <td>
                      <span v-if="promo" class="text-error">
                        {{ "-" + formatCurrency(gapTotalAndDiscount) }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="font-bold">{{ $t("total_txt") }}</td>
                    <td></td>
                    <td class="font-bold">
                      {{ formatCurrency(priceAfterDiscount) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="alert alert-error" v-if="showMessageIfTotalPriceProductZero">
            {{ $t("zero_total_order_msg") }}
          </div>
          <div>
            <button type="submit" class="btn btn-neutral btn-block rounded-full"
              :disabled="disabledIfTotalPriceProductZero">
              {{ $t("continue_payment_txt") }}
            </button>
          </div>
          <div>
            {{ $t("secure_by_xendit_txt") }} :
            <img class="h-12 mx-auto" src="/card-support.png" alt="supported payment" />
          </div>
        </div>
      </div>
    </VeeForm>
  </div>
</template>

<style></style>

<template>
  <VeeForm :validation-schema="serviceFormSchema" @submit="onSubmit" :initial-values="dataForm" v-slot="{ errors }">
    <div class="card rounded-lg border">
      <div class="card-body p-6" :class="{ 'space-y-8': isVaried, 'space-y-2': !isVaried }">
        <div class="space-y-2">
          <span class="font-bold"> {{ $t("validity_period_txt") }} </span>
          <div class="opacity-50 text-sm">
            {{ props.product?.description }}
          </div>
        </div>

        <div class="space-y-2" v-if="variants?.length">
          <template v-for="(variant, index) in variants" :key="index">
            <div class="cursor-pointer flex space-x-2 items-center">
              <VeeField v-slot="{ field }" name="variant_id" type="radio" :value="variant.id">
                <input type="radio" class="radio" :value="variant.id" v-bind="field" v-model="dataForm.variant_id" />
              </VeeField>
              <label :for="variant.name">
                {{ variant.name }},
                <span v-if="dataForm.is_express_mode" class="transition-all duration-300">
                  {{ $t("additional_price_txt") }}:
                  {{ formatCurrency(variant.express_usd_price) }}
                </span>
              </label>
            </div>
          </template>

          <VeeErrorMessage name="variant_id" class="text-error" />
        </div>
        <div v-else>{{ props.product?.estimated_day }} Days</div>

        <hr />
        <div class="hidden">
          <VeeField name="is_extend" v-model="dataForm.is_extend"> </VeeField>
          <VeeField name="is_varied" :value="isVaried"> </VeeField>
        </div>

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
              placeholder="2024-01-01" :min="minDate" v-model="dataForm.visa_validation_end_at" />
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
          <div class="flex items-center space-x-2">
            <VeeField v-slot="{ field }" name="is_express_mode">
              <input type="checkbox" class="toggle" v-bind="field" v-model="dataForm.is_express_mode" />
            </VeeField>

            <span class="font-semibold">{{ $t("express_mode_txt") }}</span>
          </div>
          <VeeErrorMessage name="is_express_mode" class="text-error" />
          <div class="text-sm opacity-50" v-if="dataForm.is_express_mode">
            <!-- Additional Price :
            {{ formatCurrency(expressPrice) }} -->
            {{ $t("exppress_description_days", { expressDay }) }}
            {{ $t("additional_price_txt") }} :
            {{ countGapPencen(_productPrice, _expressPrice) }}
          </div>
        </div>

        <hr />

        <div class="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
          <div class="inline-flex items-center space-x-3">
            <div class="inline-flex items-center space-x-2">
              <div>
                <button @click="decrement" :disabled="dataForm.total_apply <= 1"
                  class="btn btn-neutral btn-square btn-sm rounded-full" type="button">
                  <Icon name="i-heroicons-minus" />
                </button>
              </div>
              <div class="px-2">{{ dataForm.total_apply }}</div>
              <div>
                <button class="btn btn-neutral btn-square btn-sm rounded-full" @click="increment" type="button">
                  <Icon name="i-heroicons-plus" />
                </button>
              </div>
            </div>
            <div class="flex flex-col text-sm">
              <div class="font-bold">{{ formatCurrency(totalPrice) }}</div>
              <div class="opacity-50 hidden">(IDR 780.000)</div>
            </div>
          </div>

          <div class="hidden">
            <VeeField name="total_apply" :value="dataForm.total_apply"></VeeField>
          </div>

          <div>
            <button type="submit" :disabled="loading" class="btn btn-neutral rounded-full">
              {{ $t("apply_now_txt") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </VeeForm>
</template>

<script lang="ts" setup>
import { Product } from "@/types";

import { storeToRefs } from "pinia";

import { useTimeoutFn } from "@vueuse/core";

const store = useFormStore();

const { minDate } = useDateHelper();

const { $user } = useAuth();

const { formatCurrency } = useMoneyFormat();

const formStore = useFormVisa();

const { dataForm } = storeToRefs(formStore);

const { authHelper } = usePersonLocalstorage();

const { serviceFormSchema } = useSchema();

const router = useRouter();

const props = defineProps<{ product: Product | undefined }>();

const loading = ref(false);

const { start: startTimeout, stop: stopTimeout } = useTimeoutFn(() => {
  resetVariant();
}, 1000);

const showExpressSwitch = computed(() => {
  return props.product?.is_express === 1;
});

const variants = computed(() => {
  return props.product?.variants ?? [];
});

const isVaried = computed(() => {
  return variants.value?.length >= 1;
});

const idVariants = computed(() => {
  if (!variants.value?.length) {
    return [];
  }
  return variants.value?.map((el) => el.id);
});

const isExtend = computed(() => {
  return dataForm.value.is_extend === 1;
});

const _productPrice = computed(() => {
  if (isVaried.value) {
    return Number(selectedVariant.value?.usd_price);
  }
  return Number(props.product?.usd_price);
});

const _expressPrice = computed(() => {
  if (isVaried.value) {
    return Number(selectedVariant.value?.express_usd_price);
  }
  return Number(props.product?.express_usd_price);
});

const selectedVariant = computed(() => {
  return variants.value?.find((el) => el.id === dataForm.value.variant_id);
});

const productPrice = computed(() => {
  /**
   * express price should refactor
   * it using only exppress price or sum of express and product price
   */
  if (dataForm.value.is_express_mode) {
    const expressPrice = _expressPrice.value;
    const productPrice = _productPrice.value;
    return Number(expressPrice) + Number(productPrice);
  }
  return _productPrice.value;
});

const totalPrice = computed(() => {
  return (productPrice?.value as number) * dataForm.value.total_apply;
});

const expressDay = computed(() => {
  if (isVaried.value) {
    return selectedVariant.value?.express_estimated_day;
  }
  return props.product?.express_estimated_day;
});

watch(
  () => dataForm.value.variant_id,
  (value, oldValue) => {
    if (value !== oldValue) {
      startTimeout();
    }
  }
);

watch(
  () => showExpressSwitch.value,
  (value) => {
    if (!value) {
      dataForm.value.is_express_mode = false;
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

function increment() {
  dataForm.value.total_apply++;
}
function decrement() {
  dataForm.value.total_apply--;
}

async function onSubmit() {
  loading.value = true;
  await nextTick(() => {
    router.push("/form");
  });
  loading.value = false;
}

onMounted(async () => {
  await nextTick();
  dataForm.value.product_id = props.product?.id as number;
  dataForm.value.is_extend = props.product?.is_extend ?? 0;
  dataForm.value.variant_id = undefined;
  dataForm.value.date_arriving_in_indonesia = undefined;
  dataForm.value.visa_validation_end_at = undefined;
  dataForm.value.is_express_mode = false;
  dataForm.value.total_apply = 1;
  dataForm.value.pickup_address = undefined;
  dataForm.value.delivery_address = undefined;

  if ($user.value) {
    dataForm.value.first_name = $user.value.first_name;
    dataForm.value.last_name = $user.value.last_name;
    dataForm.value.email = $user.value.email;
    dataForm.value.mobile_number = $user.value?.mobile_number ?? "";
  } else {
    dataForm.value.first_name = authHelper.value?.first_name;
    dataForm.value.last_name = authHelper.value?.last_name;
    dataForm.value.email = authHelper.value?.email;
    dataForm.value.mobile_number = authHelper.value?.mobile_number;
  }

  store.clearFormPersons();
});
</script>

<style></style>

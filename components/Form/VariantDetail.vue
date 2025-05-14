<template>
  <div>
    <VeeFieldArray name="product_variants">
      <template v-for="(item, idx) in state" :key="idx">
        <FormGroup :name="`product_variants[${idx}].name`" :label="$t('variant_title_txt') + ` (${idx + 1})`">
          <FormSpInput :name="`product_variants[${idx}].name`" v-model="item.name" placeholder="eg. Validity Period"
            :key="`product_variants[${idx}].name`" class="input-bordered input-sm w-full h-11" />
        </FormGroup>

        <div class="hidden">
          <VeeField name="is_express" :value="isExpress" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormGroup :name="`product_variants[${idx}].price`" :label="$t('price_txt')">
            <FormSpPreInput :name="`product_variants[${idx}].price`" v-model="item.price" placeholder="eg: 500"
              :key="`product_variants[${idx}].price`" price-label="IDR" type="number"
              class="input !outline-none !border-none w-full h-11 rounded-none" />
          </FormGroup>

          <FormGroup :name="`product_variants[${idx}].usd_price`" :label="$t('price_txt') + ' (USD)'">
            <FormSpPreInput :name="`product_variants[${idx}].usd_price`" v-model="item.usd_price" placeholder="eg: 500"
              :key="`product_variants[${idx}].usd_price`" price-label="USD" type="number"
              class="input !outline-none !border-none w-full h-11 rounded-none" />
          </FormGroup>

          <FormGroup :name="`product_variants[${idx}].estimated_day`" :label="$t('estimated_day_txt')">
            <FormSpInput :name="`product_variants[${idx}].estimated_day`" v-model="item.estimated_day" placeholder="eg. 5"
              :key="`product_variants[${idx}].estimated_day`" type="number" class="input-bordered input-sm w-full h-11" />
          </FormGroup>

          <FormGroup :name="`product_variants[${idx}].express_estimated_day`" :label="$t('express_estimated_day_txt')">
            <FormSpInput :name="`product_variants[${idx}].express_estimated_day`" v-model="item.express_estimated_day"
              placeholder="eg. 2" :key="`product_variants[${idx}].express_estimated_day`" type="number"
              class="input-bordered input-sm w-full h-11" :disabled="notExpressParent" />
          </FormGroup>


          <FormGroup :name="`product_variants[${idx}].express_price`" :label="$t('express_price_txt')">
            <FormVariantExpressPrice v-model="item.express_price"
              v-model:express-estimated-day="item.express_estimated_day" :name="`product_variants[${idx}].express_price`"
              :price="item.price" placeholder="eg: 600" :key="`product_variants[${idx}].express_price`" type="number"
              class="input !outline-none !border-none w-full h-11 rounded-none" :disabled="notExpressParent"
              :is-express="isExpress" />
            <p class="text-xs">
              {{ $t("express_price_note_txt") }}
            </p>
          </FormGroup>

          <FormGroup :name="`product_variants[${idx}].express_usd_price`" :label="$t('express_price_txt') + ' (USD)'">
            <FormVariantExpressPrice v-model="item.express_usd_price"
              v-model:express-estimated-day="item.express_estimated_day"
              :name="`product_variants[${idx}].express_usd_price`" :price="item.usd_price" placeholder="eg: 600"
              :key="`product_variants[${idx}].express_usd_price`" type="number"
              class="input !outline-none !border-none w-full h-11 rounded-none" :disabled="notExpressParent"
              :is-express="isExpress" />
            <p class="text-xs">
              {{ $t("express_price_note_txt", { type: "USD" }) }}
            </p>
          </FormGroup>





          <div class="col-span-1 md:col-span-2">
            <div class="flex justify-between items-center h-11">
              <div></div>
              <div class="-mb-5 space-x-2">
                <button v-if="showRemoveButton" @click="removerVariant(idx)" type="button"
                  class="btn btn-square btn-error btn-sm" :key="`product_variants[${idx}].remove`">
                  <Icon name="i-heroicons-trash" />
                </button>
                <button v-if="showButtonAdd(idx)" type="button" @click="addVariant" :key="`product_variants[${idx}].add`"
                  class="btn btn-square btn-success btn-sm">
                  <Icon name="i-heroicons-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </VeeFieldArray>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from "nuxt/dist/app/compat/capi";

interface Variant {
  id?: number | undefined;
  name: string | undefined;
  description: string | undefined;
  price: number | undefined | string;
  usd_price: number | undefined | string;
  express_price: number | undefined | string;
  express_usd_price: number | undefined | string;
  estimated_day: number | undefined;
  express_estimated_day: number | undefined;
}

const props = defineProps({
  variants: {
    type: Array as PropType<Variant[]>,
  },
  isExpress: {
    type: Number,
    default: () => 0,
  },
});

const emit = defineEmits(["setVariant"]);

const state = ref<Variant[]>([]);

const showRemoveButton = computed(() => {
  return state.value ? state.value.length > 0 : false;
});

async function removerVariant(idx: number) {
  await nextTick();
  state.value.splice(idx, 1);
}

function showButtonAdd(idx: number) {
  if (state.value?.length <= 0) return true;
  return idx === state.value?.length - 1;
}

function addVariant() {
  state.value?.push({
    name: undefined,
    description: undefined,
    price: undefined,
    usd_price: undefined,
    express_price: undefined,
    express_usd_price: undefined,
    estimated_day: undefined,
    express_estimated_day: undefined,
  });
}

const notExpressParent = computed(() => {
  return props.isExpress === 0;
});

watch(
  () => state.value,
  (newValue) => {
    emit("setVariant", newValue);
  },
  { deep: true }
);

onMounted(() => {
  if (props.variants?.length) {
    state.value = props.variants as Variant[];
  }
});
</script>

<style></style>

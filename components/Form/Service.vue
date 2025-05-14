<script lang="ts" setup>
import { PropType } from "nuxt/dist/app/compat/capi";
const snackbar = useSnackbar();

const { ProductSchema } = useSchema();
const { axiosRequest } = useAxios();
const router = useRouter();
const { t: $t, locale } = useI18n();

const { transformErrors, message, alertType, setErrorMessage } =
  useStateRequestHelper();

interface Variant {
  id?: undefined | number;
  name: undefined | string;
  description: undefined | string;
  price: undefined | number | string;
  usd_price: undefined | number | string;
  express_price: undefined | number | string;
  express_usd_price: undefined | number | string;
  estimated_day: undefined | number;
  express_estimated_day: undefined | number;
}

interface Product {
  slug?: undefined | string;
  name: undefined | string;
  price: undefined | number | string;
  usd_price: undefined | number | string;
  icon: undefined | File | string;
  image: undefined | File | string;
  full_description: undefined | string;
  description: undefined | string;
  de_description: undefined | string;
  de_full_description: undefined | string;
  hu_description: undefined | string;
  hu_full_description: undefined | string;
  estimated_day: undefined | number;
  is_extend: 0 | 1;
  is_express: 0 | 1;
  express_title: undefined | string;
  express_estimated_day: undefined | number;
  express_description: undefined | string;
  express_price: undefined | number | string;
  express_usd_price: undefined | number | string;
  express_price_type: undefined | string;
  is_varied: 0 | 1;
  is_saleable: 1 | 0;
  product_variants: Variant[];
  variants?: Variant[];
}

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  product: {
    type: Object as PropType<Partial<Product>>,
  },
});

const emit = defineEmits(["update:loading"]);
const btnSubmit = ref<HTMLButtonElement | null>();

const dataForm = ref<Product>({
  name: undefined,
  price: undefined,
  usd_price: undefined,
  icon: undefined,
  image: undefined,
  description: undefined,
  full_description: undefined,
  de_description: undefined,
  de_full_description: undefined,
  hu_description: undefined,
  hu_full_description: undefined,
  estimated_day: undefined,
  is_extend: 0,
  is_express: 0,
  express_title: undefined,
  express_estimated_day: undefined,
  express_description: undefined,
  express_price: undefined,
  express_usd_price: undefined,
  express_price_type: undefined,
  is_varied: 0,
  is_saleable: 1,
  product_variants: [],
});

const isVaried = computed(() => {
  return dataForm.value.is_varied === 1;
});

const isExpress = computed(() => {
  return dataForm.value.is_express === 1;
});

const disabledIfVariendOrNotExpress = computed(() => {
  return isVaried.value || !isExpress.value;
});

watch(
  () => dataForm.value.is_varied,
  (value) => {
    if (value === 1) {
      setVariantProduct();
    } else {
      resetVariantProduct();
    }
  }
);

watch(
  () => dataForm.value.price,
  (value) => {
    calculateExpressPrice();
  }
);

watch(
  () => dataForm.value.usd_price,
  (value) => {
    calculateExpressUsdPrice();
  }
);

watch(
  () => dataForm.value.is_express,
  (value) => {
    calculateExpressPrice();
    calculateExpressUsdPrice()
  }
);

function calculateExpressPrice() {
  const price = dataForm.value.price;
  if (price && isExpress.value) {
    const callExpressPrice = ((price as number) * 20) / 100;
    dataForm.value.express_price = callExpressPrice;
    dataForm.value.express_estimated_day =
      props.product?.express_estimated_day ?? undefined;
  } else {
    dataForm.value.express_price = undefined;
    dataForm.value.express_estimated_day = undefined;
  }
}

function calculateExpressUsdPrice() {
  const price = dataForm.value.usd_price;
  if (price && isExpress.value) {
    const callExpressPrice = ((price as number) * 20) / 100;
    dataForm.value.express_usd_price = callExpressPrice;
    dataForm.value.express_estimated_day =
      props.product?.express_estimated_day ?? undefined;
  } else {
    dataForm.value.express_usd_price = undefined;
    dataForm.value.express_estimated_day = undefined;
  }
}



function resetVariantProduct() {
  dataForm.value.product_variants = [];
}

function setVariantProduct() {
  if (props.product?.variants?.length) {
    dataForm.value.product_variants = props.product.variants.map((el) => {
      const expressPriceStr = el.express_price as string;

      const expressUSDPriceStr = el.express_usd_price as string;
      let expressPrice = el.express_price
        ? parseFloat(expressPriceStr?.replace(/,/g, ""))
        : undefined;


      let expressUSDPrice = el.express_usd_price
        ? parseFloat(expressUSDPriceStr?.replace(/,/g, ""))
        : undefined;


      const priceStr = el.price as string;
      let price = el.price
        ? parseFloat(priceStr?.replace(/,/g, ""))
        : undefined;
      return {
        id: el.id,
        name: el.name,
        description: el.description,
        price: price,
        usd_price: el.usd_price ?? undefined,
        express_price: expressPrice,
        express_usd_price: expressUSDPrice,
        estimated_day: el.estimated_day ?? undefined,
        express_estimated_day: el.express_estimated_day ?? undefined,
      };
    });
  } else {
    dataForm.value.product_variants = [
      {
        name: undefined,
        description: undefined,
        price: undefined,
        usd_price: undefined,
        express_price: undefined,
        express_usd_price: undefined,
        estimated_day: undefined,
        express_estimated_day: undefined,

      },
    ];
  }
}

function serVariants(items: Variant[]) {
  dataForm.value.product_variants = items;
}

async function createProduct(ctx: any) {
  emit("update:loading", true);

  const formData = new FormData();
  const object = { ...dataForm.value };

  for (const item in object) {
    // @ts-ignore
    const objectItem = object[item];
    formData.append(item, objectItem);
  }
  if (!dataForm.value.icon) {
    formData.delete("icon");
  }
  if (!dataForm.value.image) {
    formData.delete("image");
  }

  if (object.is_varied === 1) {
    formData.delete("price");
    formData.delete("usd_price");
    formData.delete("express_estimated_day");
    formData.delete("estimated_day");
    formData.delete("express_price");
    formData.delete("express_usd_price");
  } else {
    if (!object.price) {
      ctx.setErros({
        price: $t("price_required_msg"),
      });
      return;
    }

    if (!object.usd_price) {
      ctx.setErros({
        usd_price: $t("price_required_msg"),
      });
      return;
    }

    if (!object.estimated_day) {
      ctx.setErros({
        estimated_day: $t("estimated_day_required_msg"),
      });
      return;
    }

    if (object.is_express === 1 && !object.express_price) {
      ctx.setErros({
        express_price: $t("express_price_required_msg"),
      });
      return;
    }

    if (object.is_express === 1 && !object.express_usd_price) {
      ctx.setErros({
        express_usd_price: $t("express_price_required_msg"),
      });
      return;
    }

    if (object.is_express === 1 && !object.express_estimated_day) {
      ctx.setErros({
        express_estimated_day: $t("express_estimated_day_required_msg"),
      });

      return;
    }



    if (object.is_express === 0) {
      formData.delete("express_price");
      formData.delete("express_usd_price");
      formData.delete("express_estimated_day");
    }
  }

  formData.delete("product_variants");

  const { product_variants } = object;
  if (product_variants.length > 0) {
    for (let index = 0; index < product_variants.length; index++) {
      if (object.is_express === 1 && !product_variants[index]?.express_price) {
        const expressPriceKey = `product_variants.${index}.express_price`;
        const obj = {} as any;
        obj[expressPriceKey] = $t("express_price_required_msg");
        return ctx.setErrors(obj);
      }

      if (object.is_express === 1 && !product_variants[index]?.express_usd_price) {
        const expressPriceKey = `product_variants.${index}.express_usd_price`;
        const obj = {} as any;
        obj[expressPriceKey] = $t("express_price_required_msg");
        return ctx.setErrors(obj);
      }

      if (
        object.is_express === 1 &&
        !product_variants[index]?.express_estimated_day
      ) {
        const expressPriceKey = `product_variants.${index}.express_estimated_day`;
        const obj = {} as any;
        obj[expressPriceKey] = $t("express_estimated_day_required_msg");
        return ctx.setErrors(obj);
      }
    }

    for (let index = 0; index < product_variants.length; index++) {
      formData.append(
        `product_variants[${index}][name]`,
        product_variants[index].name as string
      );
      formData.append(
        `product_variants[${index}][price]`,
        product_variants[index]?.price as string
      );
      formData.append(
        `product_variants[${index}][usd_price]`,
        product_variants[index]?.usd_price as string
      );
      formData.append(
        `product_variants[${index}][desciption]`,
        product_variants[index]?.description as string
      );

      formData.append(
        `product_variants[${index}][estimated_day]`,
        product_variants[index]?.estimated_day as any as string
      );

      if (object.is_express === 1) {
        formData.append(
          `product_variants[${index}][express_price]`,
          product_variants[index]?.express_price as any as string
        );

        formData.append(
          `product_variants[${index}][express_usd_price]`,
          product_variants[index]?.express_usd_price as any as string
        );

        formData.append(
          `product_variants[${index}][express_estimated_day]`,
          product_variants[index]?.express_estimated_day as any as string
        );
      }
    }
  }

  try {
    const { data } = await axiosRequest.post(
      `/admins/products?lang=${locale.value}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    await snackbar.clear();
    await snackbar.add({
      type: "success",
      text: $t("service_craated_success_txt"),
      groupKey: new Date().toISOString(),
    });

    ctx.resetForm();
    router.push("/admin/services");
  } catch (error: any) {
    setErrorMessage(error.response?.data?.message);
    ctx.setErrors(transformErrors(error.response?.data));
  }

  emit("update:loading", false);
}

async function updateProduct(ctx: any) {
  emit("update:loading", true);

  const formData = new FormData();
  const object = { ...dataForm.value };

  for (const item in object) {
    // @ts-ignore
    const objectItem = object[item];
    formData.append(item, objectItem);
  }
  if (!dataForm.value.icon) {
    formData.delete("icon");
  }
  if (!dataForm.value.image) {
    formData.delete("image");
  }

  if (object.is_varied === 1) {
    formData.delete("price");
    formData.delete("usd_price");
    formData.delete("express_estimated_day");
    formData.delete("estimated_day");
    formData.delete("express_price");
    formData.delete("express_usd_price");
  } else {
    if (!object.price) {
      ctx.setErros({
        price: $t("price_required_msg"),
      });
      return;
    }

    if (!object.usd_price) {
      ctx.setErros({
        usd_price: $t("price_required_msg"),
      });
      return;
    }

    if (!object.estimated_day) {
      ctx.setErros({
        estimated_day: $t("estimated_day_required_msg"),
      });
      return;
    }

    if (object.is_express === 1 && !object.express_price) {
      ctx.setErros({
        express_price: $t("express_price_required_msg"),
      });
      return;
    }

    if (object.is_express === 1 && !object.express_usd_price) {
      ctx.setErros({
        express_usd_price: $t("express_price_required_msg"),
      });
      return;
    }

    if (object.is_express === 1 && !object.express_estimated_day) {
      ctx.setErros({
        express_estimated_day: $t("express_estimated_day_required_msg"),
      });

      return;
    }
    if (object.is_express === 0) {
      formData.delete("express_price");
      formData.delete("express_usd_price");
      formData.delete("express_estimated_day");
    }
  }

  formData.delete("product_variants");

  const { product_variants } = object;

  if (product_variants.length > 0) {
    for (let index = 0; index < product_variants.length; index++) {
      if (object.is_express === 1 && !product_variants[index]?.express_price) {
        const expressPriceKey = `product_variants.${index}.express_price`;
        const obj = {} as any;
        obj[expressPriceKey] = $t("express_price_required_msg");
        return ctx.setErrors(obj);
      }

      if (object.is_express === 1 && !product_variants[index]?.express_usd_price) {
        const expressPriceKey = `product_variants.${index}.express_usd_price`;
        const obj = {} as any;
        obj[expressPriceKey] = $t("express_price_required_msg");
        return ctx.setErrors(obj);
      }

      if (
        object.is_express === 1 &&
        !product_variants[index]?.express_estimated_day
      ) {
        const expressPriceKey = `product_variants.${index}.express_estimated_day`;
        const obj = {} as any;
        obj[expressPriceKey] = $t("express_estimated_day_required_msg");
        return ctx.setErrors(obj);
      }
    }

    for (let index = 0; index < product_variants.length; index++) {
      formData.append(
        `product_variants[${index}][name]`,
        product_variants[index].name as string
      );
      formData.append(
        `product_variants[${index}][price]`,
        product_variants[index]?.price as string
      );

      formData.append(
        `product_variants[${index}][usd_price]`,
        product_variants[index]?.usd_price as string
      );
      formData.append(
        `product_variants[${index}][desciption]`,
        product_variants[index]?.description as string
      );

      if (object.is_express === 1) {
        formData.append(
          `product_variants[${index}][express_price]`,
          product_variants[index]?.express_price as any as string
        );

        formData.append(
          `product_variants[${index}][express_usd_price]`,
          product_variants[index]?.express_usd_price as any as string
        );

        formData.append(
          `product_variants[${index}][express_estimated_day]`,
          product_variants[index]?.express_estimated_day as any as string
        );
      }

      formData.append(
        `product_variants[${index}][estimated_day]`,
        product_variants[index]?.estimated_day as any as string
      );
    }
  }

  try {
    const { data } = await axiosRequest.post(
      `/admins/products/${props.product?.slug}?_method=PUT&lang=${locale.value}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    await snackbar.clear();
    await snackbar.add({
      type: "success",
      text: $t("service_updated_success_txt"),
      groupKey: new Date().toISOString(),
    });

    ctx.resetForm();
    router.push("/admin/services");
  } catch (error: any) {
    setErrorMessage(error.response?.data?.message);
    ctx.setErrors(transformErrors(error.response?.data));
  }

  emit("update:loading", false);
}

function submit(values: any, ctx: any) {
  if (props.product) {
    updateProduct(ctx);
  } else {
    createProduct(ctx);
  }
}

function clickBtnSubmit() {
  btnSubmit.value?.click();
}

onMounted(() => {
  if (props.product) {
    const priceStr = props.product?.price as string;
    const UsdPriceStr = props.product?.price as string;
    let price = priceStr ? parseFloat(priceStr?.replace(/,/g, "")) : undefined;
    let usd_price = priceStr ? parseFloat(UsdPriceStr?.replace(/,/g, "")) : undefined;

    dataForm.value.name = props.product.name;
    dataForm.value.price = price;
    dataForm.value.usd_price = usd_price;
    dataForm.value.full_description =
      props.product?.full_description ?? undefined;
    dataForm.value.description = props.product?.description ?? undefined;
    dataForm.value.de_full_description =
      props.product?.de_full_description ?? undefined;
    dataForm.value.de_description = props.product?.de_description ?? undefined;
    dataForm.value.hu_full_description =
      props.product?.hu_full_description ?? undefined;
    dataForm.value.hu_description = props.product?.hu_description ?? undefined;
    dataForm.value.estimated_day = props.product?.estimated_day ?? undefined;
    dataForm.value.is_extend = props.product?.is_extend ?? 0;
    dataForm.value.is_express = props.product?.is_express ?? 0;
    dataForm.value.is_varied = props.product?.is_varied ?? 0;
    dataForm.value.express_title = props.product?.express_title;
    dataForm.value.express_estimated_day =
      props.product?.express_estimated_day ?? undefined;
    dataForm.value.express_description = props.product?.express_description;

    dataForm.value.express_price_type = props.product?.express_price_type;
    dataForm.value.is_varied = props.product?.is_varied ?? 0;
    calculateExpressPrice();
    calculateExpressUsdPrice();
  }
});

defineExpose({
  clickBtnSubmit,
});
</script>
<template>
  <div>
    <VeeForm @submit="submit" :validation-schema="ProductSchema" v-slot="{ errors }">
      <pre>
        {{ errors }}
      </pre>
      <Alert :type="alertType" v-model="message" />
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div class="space-y-4">
          <div>
            <BallonStep :title="$t('service_information_txt')"
              v-bind:short-description="$t('service_information_helper_txt')" step="1" total-step="6" />
          </div>
          <FormGroup name="name" :label="$t('service_name_txt')">
            <FormSpInput name="name" v-model="dataForm.name" placeholder="eg: B211A0"
              class="input-bordered input-sm w-full h-11" />
          </FormGroup>
          <FormGroup name="price" :label="$t('base_price_txt')">
            <FormSpPreInput name="price" v-model="dataForm.price" placeholder="eg: 100" type="number" :disabled="isVaried"
              price-label="IDR" class="input !outline-none !border-none w-full h-11 rounded-none" />
          </FormGroup>

          <FormGroup name="usd_price" :label="$t('base_price_txt') + ' (USD)'">
            <FormSpPreInput name="usd_price" v-model="dataForm.usd_price" placeholder="eg: 100" type="number"
              :disabled="isVaried" price-label="USD" class="input !outline-none !border-none w-full h-11 rounded-none" />
          </FormGroup>
          <FormGroup name="estimated_day" :label="$t('estimated_day_txt')">
            <FormSpInput name="estimated_day" v-model="dataForm.estimated_day" placeholder="eg: 5" type="number"
              :disabled="isVaried" class="input-bordered input-sm w-full h-11" />
          </FormGroup>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <VeeField name="icon" v-slot="{ errorMessage, field }" as="div" v-model="dataForm.icon">
              <FormUploadImage :title="$t('icon_txt')" :error-message="errorMessage" v-bind="field" ref="icon_image"
                v-model="dataForm.icon" :imageSource="(props.product?.icon as string)">
                {{ $t("upload_icon_helper") }}
              </FormUploadImage>
            </VeeField>

            <VeeField name="thumbnail_image" v-slot="{ errorMessage, field }" as="div" v-model="dataForm.image">
              <FormUploadImage :title="$t('thumbnail_cover_txt')" :error-message="errorMessage" v-bind="field"
                v-model="dataForm.image" ref="thumbnail_image" :imageSource="(props.product?.image as string)">
                {{ $t("upload_thumbnail_helper") }}
              </FormUploadImage>
            </VeeField>
          </div>
          <LanguageTab>
            <template #en>
              <FormGroup name="description" :description="$t('short_description_helper')" :label="$t('description_txt')">
                <FormSpTextarea name="description" v-model="dataForm.description" placeholder="eg: B211A0 ...."
                  class="textarea-bordered w-full" />
              </FormGroup>

              <ClientOnly>
                <div class="hidden">
                  <VeeField name="full_description" as="div" v-model="dataForm.full_description" />
                </div>
                <FormGroup name="full_description" :description="$t('full_description_helper_txt')"
                  :label="$t('full_description_txt')">
                  <FormTextEditor v-model="dataForm.full_description" :is-error="!!errors.full_description" />
                </FormGroup>
              </ClientOnly>
            </template>
            <template #de>
              <FormGroup name="de_description" :description="$t('short_description_helper')"
                :label="'DE-' + $t('description_txt')">
                <FormSpTextarea name="de_description" v-model="dataForm.de_description" placeholder="eg: B211A0 ...."
                  class="textarea-bordered w-full" />
              </FormGroup>

              <ClientOnly>
                <div class="hidden">
                  <VeeField name="de_full_description" as="div" v-model="dataForm.de_full_description" />
                </div>
                <FormGroup name="de_full_description" :description="$t('full_description_helper_txt')"
                  :label="'DE-' + $t('full_description_txt')">
                  <FormTextEditor v-model="dataForm.de_full_description" :is-error="!!errors.de_full_description" />
                </FormGroup>
              </ClientOnly>
            </template>
            <template #hu>
              <FormGroup name="hu_description" :description="$t('short_description_helper')"
                :label="'HU-' + $t('description_txt')">
                <FormSpTextarea name="hu_description" v-model="dataForm.hu_description" placeholder="eg: B211A0 ...."
                  class="textarea-bordered w-full" />
              </FormGroup>

              <ClientOnly>
                <div class="hidden">
                  <VeeField name="hu_full_description" as="div" v-model="dataForm.hu_full_description" />
                </div>
                <FormGroup name="hu_full_description" :description="$t('full_description_helper_txt')"
                  :label="$t('full_description_txt')">
                  <FormTextEditor v-model="dataForm.hu_full_description" :is-error="!!errors.hu_full_description" />
                </FormGroup>
              </ClientOnly>
            </template>
            <template #message>
              <div class="space-y-2 flex flex-col">
                <VeeErrorMessage name="description" class="text-error" />
                <VeeErrorMessage name="full_description" class="text-error" />
                <VeeErrorMessage name="hu_full_description" class="text-error" />
                <VeeErrorMessage name="hu_description" class="text-error" />
                <VeeErrorMessage name="de_full_description" class="text-error" />
                <VeeErrorMessage name="de_description" class="text-error" />
              </div>
            </template>
          </LanguageTab>
        </div>
        <div class="space-y-4">
          <div>
            <BallonStep :title="$t('service_option_txt')" :short-description="$t('service_option_helper_txt')" step="2"
              total-step="6" />
          </div>

          <FormGroup name="is_extend" :description="$t('service_extend_helper_txt')">
            <div class="flex space-x-2 items-center">
              <VeeField v-slot="{ field }" :value="dataForm.is_extend" name="is_extend">
                <input type="checkbox" class="toggle toggle-sm h-5" v-model="dataForm.is_extend" v-bind="field"
                  :true-value="1" :false-value="0" />
              </VeeField>
              <span class="font-semibold text-base text-black">
                {{ $t("visa_extend_txt") }}
              </span>
            </div>
          </FormGroup>
          <hr />

          <FormGroup name="is_express" :description="$t('service_express_helper_txt')">
            <div class="flex space-x-2 items-center">
              <VeeField v-slot="{ field }" :value="dataForm.is_express" name="is_express">
                <input type="checkbox" class="toggle toggle-sm h-5" v-model="dataForm.is_express" v-bind="field"
                  :true-value="1" :false-value="0" />
              </VeeField>
              <span class="font-semibold text-base text-black">
                {{ $t("express_mode_txt") }}
              </span>
            </div>
          </FormGroup>

          <FormGroup name="express_estimated_day" :label="$t('express_estimated_day_txt')">
            <FormSpInput name="express_estimated_day" v-model="dataForm.express_estimated_day" type="number"
              placeholder="eg: 1" :disabled="disabledIfVariendOrNotExpress"
              :description="$t('express_estimated_day_helper_txt')" class="input-bordered input-sm w-full h-11" />
          </FormGroup>

          <FormGroup name="express_price" :label="$t('express_price_txt')">
            <FormSpPreInput name="express_price" v-model.lazy="dataForm.express_price" placeholder="eg: 200" readonly
              :disabled="disabledIfVariendOrNotExpress" price-label="IDR"
              class="input !outline-none !border-none w-full h-11 rounded-none" />
            <p class="text-sm">
              {{ $t("express_price_note_txt") }}
            </p>
          </FormGroup>

          <FormGroup name="express_usd_price" :label="$t('express_price_txt') + ' (USD)'">
            <FormSpPreInput name="express_usd_price" v-model.lazy="dataForm.express_usd_price" placeholder="eg: 200"
              readonly :disabled="disabledIfVariendOrNotExpress" price-label="USD"
              class="input !outline-none !border-none w-full h-11 rounded-none" />
            <p class="text-sm">
              {{ $t("express_price_note_txt", { type: "USD" }) }}
            </p>
          </FormGroup>
        </div>
        <div class="space-y-4">
          <div>
            <BallonStep :title="$t('service_variant_txt')" :short-description="$t('service_variant_helper_txt')" step="3"
              total-step="6" />
          </div>
          <div class="hidden">
            <VeeField v-model="dataForm.is_varied" name="is_varied" />
          </div>
          <FormGroup name="variant_mode" :description="$t('service_variant_helper_2_txt')">
            <div class="flex space-x-2 items-center">
              <VeeField v-slot="{ field }" :value="dataForm.is_varied" name="is_varied">
                <input type="checkbox" class="toggle toggle-sm h-5" v-model="dataForm.is_varied" v-bind="field"
                  :true-value="1" :false-value="0" />
              </VeeField>
              <span class="font-semibold text-base text-black">
                {{ $t("have_variant_txt") }}
              </span>
            </div>
          </FormGroup>

          <hr />

          <VeeErrorMessage name="product_variants" class="text-error" />

          <div v-if="dataForm.is_varied === 1">
            <FormVariantDetail :variants="dataForm.product_variants" @set-variant="serVariants"
              :is-express="dataForm.is_express" />
          </div>
        </div>
        <div class="hidden">
          <button type="submit" :disabled="loading" ref="btnSubmit" class="btn btn-primary">
            {{ $t("submit_txt") }}
          </button>
        </div>
      </div>
    </VeeForm>
  </div>
</template>

<style></style>

<script lang="ts" setup>
const dataForm = ref({
  name: undefined,
  icon_image: undefined,
  thumbnail_image: undefined,
  short_description: undefined,
  description: undefined,
  is_varied: 0,
  is_extend: 0,
  is_saleable: 0,
  product_variants: [
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
  ],
});
</script>
<template>
  <VeeForm :initial-values="dataForm">
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <div class="space-y-4">
        <FormGroup name="name" :label="$t('service_name')">
          <FormSpInput name="name" v-model="dataForm.name" placeholder="eg: B211A0"
            class="input-bordered input-sm w-full h-11" />
        </FormGroup>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <VeeField name="icon" v-slot="{ errorMessage, field }" as="div" v-model="dataForm.icon_image">
            <FormUploadImage title="Icon" :error-message="errorMessage" v-bind="field" ref="icon_image">
              {{ $t("upload_icon_helper") }}
            </FormUploadImage>
          </VeeField>

          <VeeField name="thumbnail_image" v-slot="{ errorMessage, field }" as="div" v-model="dataForm.thumbnail_image">
            <FormUploadImage title="Thumbnail Cover" :error-message="errorMessage" v-bind="field" ref="thumbnail_image">
              {{ $t("upload_thumbnail_helper") }}
            </FormUploadImage>
          </VeeField>
        </div>
        <FormGroup name="short_description" :description="$t('short_description_helper')"
          :label="$t('short_description_txt')">
          <FormSpTextarea name="short_description" v-model="dataForm.short_description" placeholder="eg: B211A0 ...."
            class="textarea-bordered w-full" />
        </FormGroup>

        <ClientOnly>
          <FormGroup name="description" :description="$t('service_description_helper')" :label="$t('description_txt')">
            <FormTextEditor v-model="dataForm.description" />
          </FormGroup>
        </ClientOnly>
      </div>

      <div class="space-y-4">
        <FormGroup name="is_extend" description="Service for extend or not?">
          <div class="flex space-x-2 items-center">
            <VeeField v-slot="{ field }" name="is_extend">
              <input type="checkbox" class="toggle toggle-sm h-5" v-model="dataForm.is_extend" v-bind="field"
                :true-value="1" :false-value="0" />
            </VeeField>
            <span class="font-semibold text-base text-black"> Is extend </span>
          </div>
        </FormGroup>

        <FormGroup name="is_saleable" :description="$t('service_saleable_helper')">
          <div class="flex space-x-2 items-center">
            <VeeField v-slot="{ field }" name="is_saleable">
              <input type="checkbox" class="toggle toggle-sm h-5" v-model="dataForm.is_saleable" v-bind="field"
                :true-value="1" :false-value="0" />
            </VeeField>
            <span class="font-semibold text-base text-black">
              {{ $t("is_saleable_txt") }}
            </span>
          </div>
        </FormGroup>
        <FormGroup name="is_varied" :description="$t('service_varied_helper')">
          <div class="flex space-x-2 items-center">
            <VeeField v-slot="{ field }" name="is_varied">
              <input type="checkbox" class="toggle toggle-sm h-5" v-model="dataForm.is_varied" v-bind="field"
                :true-value="1" :false-value="0" />
            </VeeField>
            <span class="font-semibold text-base text-black">
              {{ $t("is_varied_txt") }}
            </span>
          </div>
        </FormGroup>

        <div>
          <FormVariantDetail v-model="dataForm.product_variants" />
        </div>
      </div>
    </div>
  </VeeForm>
</template>

<style></style>

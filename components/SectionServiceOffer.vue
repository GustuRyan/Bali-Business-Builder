<template>
  <section class="bg-neutral-100">
    <Container class="py-32">
      <div class="space-y-16">
        <div class="text-center max-w-md mx-auto space-y-3">
          <p class="text-primary-900">
            {{ $t("section_service_offering_title") }}
          </p>
          <h3
            class="font-bold text-3xl"
            v-html="$t('why_you_should_choose_bali_visa_txt')"
          ></h3>
          <p class="opacity-50 leading-5">
            {{ $t("section_service_offering_description") }}
          </p>
        </div>
        <div class="flex justify-center">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ItemAdventage
              v-for="(itemAdventage, index) in itemAdventages"
              :key="index + 'ad'"
              v-bind="itemAdventage"
            />
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>

<script lang="ts" setup>
const { t: $t } = useI18n();

const itemAdventages = ref([
  {
    image: "/icon-phone-check-1.png",
    title: $t("_01_service_title"),
    description: $t("_01_service_desc"),
  },
  {
    image: "/icon-phone-check-2.png",
    title: $t("_02_service_title"),
    description: $t("_02_service_desc"),
  },
  {
    image: "/icon-phone-check-3.png",
    title: $t("_03_service_title"),
    description: $t("_03_service_desc"),
  },
  {
    image: "/icon-phone-check-4.png",
    title: $t("_04_service_title"),
    description: $t("_04_service_desc"),
  },
]);
</script>

<style></style>

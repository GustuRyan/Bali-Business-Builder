<template>
  <div>
    <div class="relative z-0 min-h-[450px] inline-block w-full">
      <div class="absolute z-20 flex w-full py-10 min-h-[600px] lg:min-h-full isolate">
        <div class="static z-50 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-white pt-32">
          <div class="text-center max-w-xl h-full mx-auto space-y-8 p-10 rounded-md">
            <h1 class="text-3xl md:text-[52px] leading-tight font-bold">
              {{ $t("home_title") }}
            </h1>
            <p>
              {{ $t("moto_desc") }}
            </p>
            <div class="inline-flex space-x-3 items-center p-2 rounded-full z-50">
              <NuxtLink to="/services" no-prefetch
                class="z-50 btn bg-white text-bl hover:bg-black hover:text-white rounded-full btn-md">
                {{ $t("get_visa_now") }}
              </NuxtLink>
              <span>{{ $t("or_txt") }}</span>
              <NuxtLink to="/services/extend" no-prefetch
                class="btn hover:bg-white hover:text-black !outline-white !border-white btn-outline rounded-full btn-md text-white">
                {{ $t("extend_my_visa") }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <div class="xl:opacity-100 -z-50 inset-0">
        <div class="relative">
          <div class="absolute w-full h-full bg-gradient-to-b from-black/80 from-60% to-black/50 z-10"></div>

          <img src="/home-page-hero.png"
            class="w-full h-full min-h-[600px] lg:min-h-full object-cover pointer-events-none isolate"
            alt="hero-background" loading="eager" />
        </div>
      </div>
    </div>
    <!-- adventage service-->
    <div class="py-16">
      <AdventageServices />
    </div>
    <!-- end of adventage service-->

    <!-- other service -->
    <section class="bg-neutral-50">
      <Container>
        <div class="text-center flex flex-col max-w-3xl mx-auto space-y-3 py-20">
          <p class="text-primary-900">
            {{ $t("other_services") }}
          </p>
          <h3 class="font-bold text-3xl" v-html="$t('establish_pt_pma')"></h3>
          <p class="opacity-50 leading-5">
            {{ $t("pt_pma_description") }}
          </p>
          <div class="flex justify-center items-center">
            <NuxtLink to="/services/other" class="btn btn-neutral hover:opacity-80 bg-black font-bold rounded-full" no-prefetch>
              {{ $t("get_started") }}
            </NuxtLink>
          </div>
        </div>
      </Container>
    </section>
    <!-- end of other service -->

    <!-- section services offer -->
    <SectionServiceOffer />
    <!-- end of services offer -->

    <section>
      <Container class="py-32">
        <div class="text-center max-w-lg mx-auto space-y-3">
          <h3 class="font-bold text-3xl">
            {{ $t("let_effort_visa_title_txt") }}
          </h3>
          <p class="opacity-50 leading-6">
            {{ $t("let_effort_visa_desc_txt") }}
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          <ItemStepCard v-for="(itemStep, index) in itemSteps" :key="index + 'is'" v-bind="itemStep" />
        </div>
      </Container>
    </section>
    <section>
      <DarkBanner />
    </section>
    <!-- costumer feedback -->
    <SectionCostumerFeedback />
    <!-- end of costumer feedback -->
    <section>
      <FaqSection />
    </section>
  </div>
</template>

<script setup lang="ts">
const { t: $t } = useI18n();
const itemSteps = ref([
  {
    image: "/online-registration.png",
    title: $t("step_1_title_txt"),
    description: $t("step_1_desc_txt"),
  },
  {
    image: "/submit-document.png",
    title: $t("step_2_title_txt"),
    description: $t("step_2_desc_txt"),
  },
  {
    image: "/make-payment.png",
    title: $t("step_3_title_txt"),
    description: $t("step_3_desc_txt"),
  },
  {
    image: "/get-visa.png",
    title: $t("step_4_title_txt"),
    description: $t("step_4_desc_txt"),
  },
]);

useSeoMeta({
  title: "Bali Visa Official",
  ogTitle: "Bali Visa Official",
  description: $t("home_meta_desc_txt"),
  ogDescription: $t("home_meta_desc_txt"),
  ogImage: "/thumbnail.png",
  twitterCard: "summary_large_image",
});
</script>

<style scoped></style>

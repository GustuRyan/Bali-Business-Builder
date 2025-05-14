<script lang="ts" setup>
import { Root } from "@/types";

const { locale } = useI18n();

const { data } = await useCustomFetch<Root>("/products?lang=" + locale.value, {
  method: "GET",
});
useHead({
  title: "Services",
});
</script>
<template>
  <div>
    <Container class="py-16 space-y-16">
      <h1 class="text-center text-3xl md:text-[52px] leading-tight font-bold">
        {{ $t("explore_our_service_txt") }}
      </h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(product, index) in data?.data" :key="index">
          <AdventageCard :product="product" />
        </div>
      </div>
    </Container>

    <!-- Other Services -->
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
    <!-- Other Services -->
  </div>
</template>

<style></style>

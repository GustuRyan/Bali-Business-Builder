<script lang="ts" setup>
import { Root } from "@/types";

const { locale } = useI18n();

const { data } = await useCustomFetch<Root>("/products?lang=" + locale.value, {
  method: "GET",
});

const extendVisa = computed(() => {
  return data.value?.data.filter((el) => el.is_extend);
});

useHead({
  title: "Services Extend",
});
</script>
<template>
  <div>
    <Container class="py-16 space-y-16">
      <h1 class="text-center text-3xl md:text-[52px] leading-tight font-bold">
        {{ $t("extention_service_txt") }}
      </h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(product, index) in extendVisa" :key="index">
          <AdventageCard :product="product" />
        </div>
      </div>
    </Container>
  </div>
</template>

<style></style>

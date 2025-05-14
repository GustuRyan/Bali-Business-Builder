<template>
  <section>
    <Container class="py-10">
      <div class="space-y-16">
        <div class="text-center max-w-lg mx-auto space-y-3">
          <h3 class="font-semibold text-3xl">
            {{ $t("adventage_service_title") }}
          </h3>
          <p class="leading-5 opacity-50">
            {{ $t("adventage_service_description") }}
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(product, index) in products" :key="index">
            <AdventageCard :product="product" />
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>

<script lang="ts" setup>
const { products } = useServices();
</script>

<style></style>

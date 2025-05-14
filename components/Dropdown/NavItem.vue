<template>
  <VMenu :triggers="['hover']" :distance="17">
    <button
      class="btn btn-ghost normal-case"
      type="button"
      :class="{ 'text-primary-600': isActivePage }"
    >
      {{ props.isApplyVisa ? $t("apply_visa_txt") : $t("extend_visa_txt") }}
      <Icon name="i-heroicons-chevron-down" />
    </button>

    <template #popper>
      <ul class="z-[1] menu p-2 shadow bg-base-100 w-64 space-y-2">
        <li v-for="(link, index) in links" :key="index + 'n'">
          <NuxtLink
            :to="'/services/' + link.slug"
            active-class="text-primary-600"
            no-prefetch
          >
            {{ link.name }}
          </NuxtLink>
        </li>
      </ul>
    </template>
  </VMenu>
</template>

<script setup lang="ts">
const route = useRoute();

const props = defineProps({
  isApplyVisa: {
    type: Boolean,
  },
});
import { useProductStore } from "~/stores/product";
import { storeToRefs } from "pinia";

const store = useProductStore();
const { getProduct: products } = storeToRefs(store);

const extendVisas = computed(() => {
  return [...products.value.filter((p) => p.is_extend === 1)];
});

const newVisas = computed(() => {
  return [...products.value.filter((p) => p.is_extend === 0)];
});

const links = computed(() => {
  if (props.isApplyVisa) {
    return newVisas.value;
  }
  return extendVisas.value;
});
const slug = computed(() => {
  return route.params.slug;
});
const isActivePage = computed(() => {
  return links.value.map((el) => el.slug).includes(slug.value as string);
});
</script>

<style scoped></style>

<template>
  <ClientOnly>
    <NuxtLink :to="link">
      <div
        class="px-4 hover:bg-neutral-100 rounded-lg pb-3 transition-colors duration-300 h-full"
      >
        <div class="rounded-lg overflow-hidden" v-if="props.product.image">
          <img
            :src="props.product.image"
            class="h-full w-full object-cover min-h-[200px] max-h-[200px] object-center"
          />
        </div>

        <div
          class="rounded-lg overflow-hidden min-h-[200px] max-h-[200px]"
          v-else
        >
          <img
            src="https://via.placeholder.com/300x300"
            class="h-full w-full object-cover min-h-[200px]"
          />
        </div>
        <div class="space-y-2 mt-2">
          <div class="font-bold text-xl">
            {{ props.product.name }}
          </div>
          <div class="opacity-50 leading-5 line-clamp-2">
            {{ props.product.description }}
          </div>
          <div>
            <div
              role="button"
              class="inline-flex items-center pl-0 hover:pl-2 p-2 rounded-md hover:bg-neutral-300 text-primary-900 transition-all duration-300 font-bold"
            >
              {{ $t("get_now") }}

              <Icon
                name="i-heroicons-arrow-right-20-solid"
                class="-rotate-45"
              />
            </div>
          </div>
        </div>
      </div>
    </NuxtLink>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { Product } from "@/types";
const props = defineProps<{ product: Product }>();

const link = computed(() => {
  return "/services/" + props.product?.slug;
});
</script>

<style></style>

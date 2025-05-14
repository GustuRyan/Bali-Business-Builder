<template>
  <div
    class="space-y-3 p-2 text-center rounded-md hover:shadow-lg transition-shadow duration-300"
  >
    <div class="md:max-h-48 lg:max-h-52 flex items-center justify-center">
      <img
        :src="props.image"
        class="object-contain lg:object-cover h-full w-full md:max-h-48 lg:max-h-52"
        :alt="props.title"
        loading="lazy"
      />
    </div>

    <div class="font-bold text-xl">
      {{ props.title }}
    </div>
    <div class="opacity-50 leading-5">
      {{ props.description }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  image: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});
</script>

<style></style>

<template>
  <div class="text-center space-y-4 max-w-lg p-2 rounded-md">
    <div class="avatar">
      <img :src="props.image" size="xl" alt="check phone" />
    </div>
    <h3 class="text-xl font-bold">{{ props.title }}</h3>
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

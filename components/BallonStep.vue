<template>
  <div class="flex flex-row space-x-4 items-center">
    <div
      class="rounded-full h-9 w-9 sm:w-12 md:w-9 flex items-center justify-center bg-neutral text-white"
    >
      <div class="flex items-center">
        <span class="text-sm md:text-xl">{{ props.step }}</span>
      </div>
    </div>
    <div>
      <div class="font-bold">{{ props.title }}</div>
      <div class="opacity-50 text-sm">
        {{ props.shortDescription }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
  },
  shortDescription: {
    type: String,
  },
  totalStep: {
    type: [Number, String],
    defalut: 1,
  },
  step: {
    type: [Number, String],
    defalut: 1,
  },
});
</script>

<style></style>

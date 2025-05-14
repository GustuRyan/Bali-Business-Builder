<template>
  <div>
    <div
      class="flex hover:bg-base-200 transition-colors duration-300 p-2"
      :class="{ 'flex-col': flexCol, 'justify-between': !flexCol }"
    >
      <div class="text-sm">{{ props.label }}</div>
      <div class="text-sm font-semibold">
        {{ props.content }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  label: {
    type: String,
  },
  content: {
    type: String,
  },
  flexCol: {
    type: Boolean,
    default: false,
  },
});
</script>

<style></style>

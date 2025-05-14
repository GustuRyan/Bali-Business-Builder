<template>
  <div class="badge" :class="badgeClass">
    {{ props.status }}
  </div>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
const props = defineProps({
  status: {
    type: String,
  },
});

const badgeClass = computed(() => {
  if (props.status === "complete") {
    return "badge-success";
  } else if (props.status === "incomplete") {
    return "badge-error";
  }
  return "";
});
</script>

<style scoped></style>

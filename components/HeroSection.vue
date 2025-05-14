<template>
  <div class="grid place-items-center h-[550px]" v-bind="$attrs">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
</script>

<style scoped></style>

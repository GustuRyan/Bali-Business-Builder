<template>
  <div class="flex w-full">
    <div class="grid place-items-center">{{ page }}</div>
    <div class="divider divider-horizontal">from</div>
    <div class="grid place-items-center">{{ totalPages }} Pages</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  total: number | string;
  perPage: number | string;
  page: number | string;
}>();
const totalPages = computed(() => {
  if (parseInt(props.total as string) <= parseInt(props.perPage as string)) {
    return 1;
  }
  return Math.ceil(
    parseInt(props.total as string) / parseInt(props.perPage as string)
  );
});
</script>

<style lang="scss" scoped></style>

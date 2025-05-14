<template>
  <div>
    <div class="grid place-items-center h-[550px]">
      <div class="max-w-md text-center space-y-4">
        <span class="text-5xl text-emerald-600 font-medium tracking-tight">
          {{ $props.error?.statusCode }}
        </span>
        <p>
          {{ $props.error?.message }}
        </p>
        <NuxtLink class="btn btn-primary" to="/">Home page</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: Object,
});
useHead({
  title: "Error",
});
</script>

<style scoped></style>

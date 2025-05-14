<script setup lang="ts">
definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});
useHead({
  title: "Settings",
});
</script>
<template>
  <Container class="py-16">
    <div class="text-sm breadcrumbs">
      <ul>
        <li><NuxtLink to="/admin">Dashboard</NuxtLink></li>
        <li class="opacity-50">Settings</li>
      </ul>
    </div>
    <div class="max-w-md">
      <FormAuthUser />
    </div>
    <hr />
    <div class="max-w-md">
      <FormAuthRenewPassword />
    </div>
  </Container>
</template>

<style scoped></style>

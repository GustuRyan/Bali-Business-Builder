<script setup lang="ts">
definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});

useHead({
  title: "Create Admin",
});
</script>
<template>
  <Container class="py-16">
    <div class="text-sm breadcrumbs">
      <ul>
        <li><NuxtLink to="/admin/user-admins">User Admins</NuxtLink></li>
        <li class="opacity-50">{{ $t("create_txt") }}</li>
      </ul>
    </div>
    <div>
      <FormRegistered is-admin />
    </div>
  </Container>
</template>

<style scoped></style>

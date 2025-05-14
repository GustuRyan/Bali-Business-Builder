<script setup lang="ts">
definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});
</script>
<template>
  <Container class="py-16">
    <div class="text-sm breadcrumbs">
      <ul>
        <li><NuxtLink to="/admin/customers">Users</NuxtLink></li>
        <li class="opacity-50">Create</li>
      </ul>
    </div>
  </Container>
</template>

<style scoped></style>

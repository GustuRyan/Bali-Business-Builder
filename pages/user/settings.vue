<script setup lang="ts">
definePageMeta({
  layout: "user",
  // @ts-ignore
  middleware: ["auth", "user"],
});
useHead({
  title: "Settings",
});
</script>
<template>
  <Container class="py-16">
    <div class="max-w-5xl mx-auto">
      <div class="max-w-md">
        <FormAuthUser />
      </div>
      <hr />
      <div class="max-w-md">
        <FormAuthRenewPassword />
      </div>
    </div>
  </Container>
</template>

<style scoped></style>

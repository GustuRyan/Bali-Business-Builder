<script setup lang="ts">
const route = useRoute();
const { data } = await useCustomFetch(
  `admins/orders/${route.params.uuid}/forms`
);
definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});
</script>
<template>
  <Container class="py-16">
    <pre>{{ data }}</pre>
  </Container>
</template>

<style scoped></style>

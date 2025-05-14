<script setup lang="ts">
import { AuthUser, GeneralResponse } from "@/types";

const route = useRoute();
const { locale } = useI18n();

const { data } = await useCustomFetch<GeneralResponse<AuthUser>>(
  `/admins/${route.params.uuid}?lang=${locale.value}`,
  {
    method: "GET",
  }
);

definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});
useHead({
  title: "Edit Admin",
});
</script>
<template>
  <Container class="py-16">
    <div class="text-sm breadcrumbs">
      <ul>
        <li><NuxtLink to="/admin/user-admins">User Admins</NuxtLink></li>
        <li class="opacity-50">{{ $t("edit_txt") }}</li>
      </ul>
    </div>
    <div>
      <FormRegistered is-admin :user="data?.data" />
    </div>
  </Container>
</template>

<style scoped></style>

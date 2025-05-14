<template>
  <NuxtLink
    :to="dashboard"
    class="btn btn-neutral rounded-full normal-case btn-sm h-10 btn-block"
    aria-label="menu"
  >
    {{ $t("dashboard_txt") }}
  </NuxtLink>
</template>

<script lang="ts" setup>
import { Role } from "~/types";
const { $credetial } = useAuth();

const dashboard = computed(() => {
  if ($credetial?.role === Role.ADMIN) {
    return "/admin";
  }
  return "/user";
});
</script>

<style></style>

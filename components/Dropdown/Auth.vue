<template>
  <VMenu :triggers="['hover']" placement="bottom-end" :distance="17">
    <button type="button" class="btn btn-ghost normal-case">
      <div class="bg-neutral rounded-full text-white">
        <Icon name="i-heroicons-user-circle" class="h-6 w-6" />
      </div>
      <Icon name="i-heroicons-chevron-down" class="h-4.5 w-4.5" />
    </button>
    <template #popper>
      <div class="text-center my-3">
        {{ $user?.first_name }} {{ $user?.last_name }}
      </div>
      <hr />
      <ul tabindex="0" class="z-[1] menu p-2 shadow bg-base-100 w-52 space-y-2">
        <li>
          <NuxtLink :to="dashboard" active-class="text-primary-600">{{
            $t("dashboard_txt")
          }}</NuxtLink>
        </li>

        <li v-if="$isUser">
          <NuxtLink to="/user/settings" active-class="text-primary-600">{{
            $t("settings_txt")
          }}</NuxtLink>
        </li>
        <li>
          <button
            @click="$logout"
            class="btn btn-block btn-sm normal-case btn-ghost"
          >
            {{ $t("logout_txt") }}
          </button>
        </li>
      </ul>
    </template>
  </VMenu>
</template>

<script setup lang="ts">
const { $logout, $user, $isAdmin, $isUser } = useAuth();

const dashboard = computed(() => {
  if ($isAdmin.value) {
    return "/admin";
  }
  return "/user";
});
</script>

<style scoped></style>

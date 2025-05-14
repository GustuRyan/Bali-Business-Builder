<template>
  <div class="overflow-hidden">
    <ClientOnly>
      <div class="shadow backdrop-blur relative z-[9999]">
        <div class="z-50 max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div class="flex justify-between items-center py-4">
            <div>
              <NuxtLink to="/" class="flex items-center gap-2">
                <img
                  class="h-10"
                  src="/logo-visas-black.png"
                  alt="logo"
                  height="40"
                />
                <span class="hidden sm:block md:text-lg font-bold">
                  Bali Business Builder
                </span>
              </NuxtLink>
            </div>
            <div class="hidden lg:block">
              <div class="flex justify-center items-center space-x-3">
                <NuxtLink
                  to="/"
                  class="btn btn-ghost normal-case"
                  active-class="text-primary-600"
                >
                  {{ $t("btn_home_txt") }}
                </NuxtLink>
                <DropdownNavItem is-apply-visa />
                <DropdownNavItem />

                <VMenu :triggers="['hover']" :distance="17">
                  <button
                    type="button"
                    tabindex="0"
                    class="btn btn-ghost btn-primary normal-case"
                    :class="{ 'text-primary-600': activeInformationCenter }"
                  >
                    {{ $t("infomation_center_txt") }}
                    <Icon name="i-heroicons-chevron-down" />
                  </button>

                  <template #popper>
                    <ul
                      class="z-[1] menu p-2 shadow bg-base-100 w-64 space-y-2"
                    >
                      <li
                        v-for="(link, index) in servicesList"
                        :key="index + 'n'"
                      >
                        <NuxtLink
                          :to="link.to"
                          :active-class="link.activeClass"
                          >{{ link.label }}</NuxtLink
                        >
                      </li>
                    </ul>
                  </template>
                </VMenu>

                <NuxtLink
                  to="/about"
                  class="btn btn-ghost normal-case btn-md"
                  active-class="text-primary-600"
                >
                  {{ $t("btn_about_us_txt") }}
                </NuxtLink>
                <LanguageDropdown />
                <NuxtLink
                  :to="dashboardLink"
                  class="btn btn-neutral rounded-full normal-case btn-sm h-10"
                  v-if="$isLogin"
                  aria-label="menu"
                >
                  {{ $t("dashboard_txt") }}
                </NuxtLink>
                <NuxtLink
                  to="/sign-in"
                  class="btn btn-neutral rounded-full normal-case btn-sm h-10"
                  v-else
                  aria-label="menu"
                  no-prefetch
                >
                  <Icon name="i-heroicons-user-circle" class="h-6 w-6" />
                  {{ $t("btn_my_account_txt") }}
                </NuxtLink>
              </div>
            </div>
            <div class="block lg:hidden">
              <div class="flex items-center space-x-2">
                <LanguageDropdown />

                <VMenu :triggers="['click']" placement="auto">
                  <button
                    type="button"
                    tabindex="0"
                    class="btn btn-ghost btn-primary normal-case"
                    aria-label="Menu"
                  >
                    <Icon name="i-heroicons-bars-3" class="h-6 w-6" />
                  </button>

                  <template #popper>
                    <div
                      class="z-[1] p-2 shadow bg-base-100 w-64 space-y-1.5"
                      tabindex="0"
                    >
                      <ul class="space-y-1 menu">
                        <li>
                          <NuxtLink to="/" active-class="text-primary-600">
                            {{ $t("home_txt") }}
                          </NuxtLink>
                        </li>
                      </ul>
                      <hr />

                      <VMenu
                        placement="auto"
                        instant-move
                        :triggers="['hover', 'click']"
                      >
                        <button
                          class="btn btn-sm btn-block normal-case flex justify-between btn-ghost font-normal"
                          type="button"
                        >
                          {{ $t("apply_visa_txt") }}
                          <Icon name="i-heroicons-chevron-right" />
                        </button>
                        <template #popper>
                          <ul class="space-y-1 menu w-full">
                            <li
                              v-for="(link, index) in newVisas"
                              :key="index + 'n'"
                            >
                              <NuxtLink
                                :to="'/services/' + link.slug"
                                active-class="text-primary-600"
                                no-prefetch
                              >
                                {{ link.name }}
                              </NuxtLink>
                            </li>
                          </ul>
                        </template>
                      </VMenu>

                      <VMenu
                        placement="auto"
                        instant-move
                        :triggers="['hover', 'click']"
                      >
                        <button
                          class="btn btn-sm btn-block normal-case flex justify-between btn-ghost font-normal"
                          type="button"
                        >
                          {{ $t("extend_visa_txt") }}
                          <Icon name="i-heroicons-chevron-right" />
                        </button>
                        <template #popper>
                          <ul class="space-y-1 menu w-full">
                            <li
                              v-for="(link, index) in extendVisas"
                              :key="index + 'n'"
                            >
                              <NuxtLink
                                :to="'/services/' + link.slug"
                                active-class="text-primary-600"
                                no-prefetch
                              >
                                {{ link.name }}</NuxtLink
                              >
                            </li>
                          </ul>
                        </template>
                      </VMenu>

                      <hr />
                      <ul class="space-y-1 menu w-full">
                        <li v-for="(link, index) in links" :key="index + 'n'">
                          <NuxtLink
                            :to="link.to"
                            :active-class="link.activeClass"
                            no-prefetch
                            >{{ link.label }}</NuxtLink
                          >
                        </li>
                      </ul>
                      <ul class="menu">
                        <li v-if="$isLogin">
                          <AuthLink />
                        </li>
                        <li v-else>
                          <NuxtLink
                            to="/sign-in"
                            class="btn btn-neutral rounded-full normal-case btn-sm h-10 btn-block"
                            aria-label="menu"
                          >
                            <Icon
                              name="i-heroicons-user-circle"
                              class="h-6 w-6"
                            />
                            {{ $t("btn_my_account_txt") }}
                          </NuxtLink>
                        </li>
                      </ul>
                    </div>
                  </template>
                </VMenu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>

    <main class="min-h-screen">
      <slot />
    </main>
    <DarkFooter />
    <NuxtSnackbar />
  </div>
</template>

<script setup lang="ts">
// https://github.com/Akryum/floating-vue/blob/main/demos/demo-vue3/src/views/component/SubMenuDemo1.vue
const route = useRoute();
const { $isLogin, $credetial } = useAuth();
import { Role } from "~/types";

const dashboardLink = computed(() => {
  if ($credetial?.role === Role.ADMIN) {
    return "/admin";
  }
  return "/user";
});

const { t: $t } = useI18n();

const { newVisas, extendVisas } = useServices();

const servicesList = ref([
  {
    label: $t("frequently_asked_question_txt"),
    to: "/faq",
    activeClass: "text-primary-600",
  },
  {
    label: $t("contact_us_txt"),
    to: "/contact-us",
    activeClass: "text-primary-600",
  },
  {
    label: $t("privacy_policy_txt"),
    to: "/privacy-policy",
    activeClass: "text-primary-600",
  },
  {
    label: $t("terms_and_conditions_txt"),
    to: "/terms-and-conditions",
    activeClass: "text-primary-600",
  },
]);

const links = computed(() => {
  const links = [
    {
      label: $t("frequently_asked_question_txt"),
      to: "/faq",
      activeClass: "text-primary-600",
    },
    {
      label: $t("contact_us_txt"),
      to: "/contact-us",
      activeClass: "text-primary-600",
    },
    {
      label: $t("privacy_policy_txt"),
      to: "/privacy-policy",
      activeClass: "text-primary-600",
    },
    {
      label: $t("terms_and_conditions_txt"),
      to: "/terms-and-conditions",
      activeClass: "text-primary-600",
    },
  ];

  return links;
});

const activeInformationCenter = computed(() => {
  return [
    "/contact-us",
    "/faq",
    "/privacy-policy",
    "/terms-and-conditions",
  ].includes(route.path);
});
</script>

<style scoped></style>

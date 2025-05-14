<script setup lang="ts">
import { useMediaQuery, onClickOutside } from "@vueuse/core";
import { useElementSize } from "@vueuse/core";
const child = ref<HTMLDivElement>();

const { t: $t } = useI18n();

const { height } = useElementSize(child);

const parentHeight = computed(() => {
  return height.value;
});

const route = useRoute();
const menuDrawer = ref<boolean>(true);

const drawer = ref();

const routePath = computed(() => route.fullPath);

const itemsSideMenu = ref([
  {
    label: "Dashboard",
    href: "/user",
    icon: "i-heroicons-home",
  },
  {
    label: "Visa Form",
    href: "/form",
    icon: "i-heroicons-folder-plus",
  },
  {
    label: $t("settings_txt"),
    href: "/user/settings",
    icon: "i-heroicons-cog-6-tooth",
  },
]);

function toggleDrawer() {
  menuDrawer.value = !menuDrawer.value;
}
const isMobileOrTablet = useMediaQuery("(max-width:768px)");

watch(routePath, (newValue, oldValue) => {
  if (isMobileOrTablet.value && menuDrawer.value && newValue !== oldValue) {
    menuDrawer.value = false;
  }
});

watch(isMobileOrTablet, (value) => {
  if (!value) {
    menuDrawer.value = true;
  }
});
/**
 * click outside of the aside element on table or mobile device should
 * close the drawer
 */
onClickOutside(drawer, () => {
  if (isMobileOrTablet.value && menuDrawer.value) {
    menuDrawer.value = false;
  }
});

onMounted(() => {
  if (process.client) {
    if (isMobileOrTablet.value) {
      menuDrawer.value = false;
    }
  }
});
</script>

<template>
  <div>
    <div class="flex flex-row" :class="{ relative: isMobileOrTablet }">
      <div class="flex flex-col flex-1">
        <div class="border-b">
          <Container>
            <div class="flex justify-between lg:py-4 items-center">
              <div>
                <NuxtLink to="/user">
                  <img
                    src="/logo-bali-visum-blue.png"
                    height="100"
                    width="100"
                    alt="logo"
                    class="object-cover"
                  />
                </NuxtLink>
              </div>
              <div class="flex items-center space-x-2">
                <NuxtLink
                  to="/"
                  class="btn btn-ghost normal-case"
                  active-class="text-primary-600"
                  >{{ $t("landing_page_txt") }}</NuxtLink
                >
                <NuxtLink
                  to="/user"
                  class="btn btn-ghost normal-case"
                  active-class="text-primary-600"
                  >{{ $t("my_visa_txt") }}</NuxtLink
                >
                <LanguageDropdown />
                <DropdownAuth />
              </div>
            </div>
          </Container>
        </div>

        <main class="flex-grow-0" ref="child">
          <slot />
        </main>
      </div>
    </div>
    <NuxtSnackbar />
  </div>
</template>

<style scoped></style>

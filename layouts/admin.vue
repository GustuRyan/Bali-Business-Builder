<script setup lang="ts">
import { useMediaQuery, onClickOutside } from "@vueuse/core";
import { useElementSize } from "@vueuse/core";
const { $user, $logout } = useAuth();
const { t: $t } = useI18n();
const route = useRoute();
const menuDrawer = ref<boolean>(true);

const drawer = ref();

const routePath = computed(() => route.fullPath);

const child = ref<HTMLDivElement>();

const { height } = useElementSize(child);

const parentHeight = computed(() => {
  return height.value;
});

const itemsSideMenu = ref([
  {
    label: $t("dashboard_txt"),
    href: "/admin",
    icon: "i-heroicons-home",
  },
  {
    label: $t("services_txt"),
    href: "/admin/services",
    icon: "i-heroicons-square-3-stack-3d",
  },
  {
    label: "Order",
    href: "/admin/orders",
    icon: "i-heroicons-inbox-arrow-down",
  },
  {
    label: $t("customer_txt"),
    href: "/admin/customers",
    icon: "i-heroicons-users",
  },
  {
    label: $t("customer_indentity_txt"),
    href: "/admin/customer-indentity",
    icon: "i-heroicons-briefcase",
  },
  {
    label: "Promo",
    href: "/admin/promo",
    icon: "i-heroicons-tag",
  },
  {
    label: "Admin User",
    href: "/admin/user-admins",
    icon: "i-heroicons-user",
  },
  {
    label: $t("contact_txt"),
    href: "/admin/contacts",
    icon: "i-heroicons-phone",
  },
  {
    label: $t("settings_txt"),
    href: "/admin/settings",
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
    <div class="flex flex-row bg-black" :class="{ relative: isMobileOrTablet }">
      <transition
        enter-active-class="transition ease-in-out duration-100 transform"
        enter-to-class="translate-x-0"
        leave-active-class="transition ease-in-out duration-700 transform"
        leave-to-class="-translate-x-full"
        :mode="menuDrawer ? 'out-in' : 'in-out'"
        appear
      >
        <aside
          class="h-screen min-w-[280px] pb-10 px-2 pt-4 bg-black z-10 transition-all duration-700 overflow-y-auto"
          v-if="menuDrawer"
          ref="drawer"
          :class="{ absolute: isMobileOrTablet }"
        >
          <div class="flex flex-col h-full">
            <div class="flex items-center flex-grow-0">
              <NuxtLink
                to="/admin"
                class="flex flex-row items-center space-x-2"
              >
                <div>
                  <img
                    src="/logo-visas-white.png"
                    alt="logo"
                    class="h-11 w-11 object-contain"
                  />
                </div>
                <div class="text-white text-lg font-bold">
                  Bali Business Builder
                </div>
              </NuxtLink>
            </div>

            <div class="flex-grow" ref="child">
              <ul class="space-y-2 mt-2">
                <li v-for="(item, index) in itemsSideMenu" :key="index + 'mn'">
                  <NuxtLink
                    :to="item.href"
                    class="block px-2 rounded-md hover:bg-slate-600 text-white transition-colors ease-out duration-500 group"
                    active-class="bg-slate-600"
                  >
                    <div class="inline-flex items-center space-x-3">
                      <div class="p-2">
                        <Icon
                          :name="item.icon"
                          class="h-5 w-5 group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <span> {{ item.label }} </span>
                    </div>
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <div class="flex items-end flex-grow mt-auto bg-black">
              <div class="space-y-1 text-white left-0 bottom-0 w-full">
                <hr />
                <div class="flex flex-row items-center space-x-3">
                  <div class="avatar">
                    <div class="h-8 rounded-full">
                      <img
                        v-if="$user?.profile_picture"
                        :src="$user.profile_picture"
                        alt="avatar"
                        class="h-full w-full"
                      />
                      <div
                        v-else
                        class="h-full w-full bg-gray-400 flex items-center justify-center"
                      >
                        AD
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <span class="whitespace-nowrap truncate">
                      {{ $user?.first_name }} {{ $user?.last_name }}
                    </span>
                    <span class="text-sm truncate">{{ $user?.email }}</span>
                  </div>
                  <div>
                    <button
                      type="button"
                      @click="$logout"
                      class="btn btn-ghost btn-sm h-11 btn-square"
                    >
                      <Icon
                        name="i-heroicons-arrow-right-on-rectangle"
                        class="h-6 w-6"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </transition>
      <div class="flex flex-col flex-1">
        <div class="block lg:hidden">
          <Container>
            <div class="flex justify-between py-4 items-center">
              <div>
                <button
                  @click="toggleDrawer"
                  class="btn btn-ghost text-white"
                  v-if="isMobileOrTablet"
                >
                  <Icon name="i-heroicons-bars-3" class="h-6 w-6" />
                </button>
              </div>
            </div>
          </Container>
        </div>

        <main
          class="flex-grow-0 bg-white rounded-tl-3xl lg:mt-8 overflow-y-auto h-screen"
          ref="child"
        >
          <slot />
        </main>
      </div>
    </div>
    <NuxtSnackbar />
  </div>
</template>

<style scoped>
/* For Webkit browsers like Chrome and Safari */
::-webkit-scrollbar {
  width: 5px !important;
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1 !important;
}

::-webkit-scrollbar-thumb {
  background-color: #888 !important;
}

::-webkit-scrollbar-thumb:hover {
  background: #555 !important;
}

/* For Firefox */
/* Note: Firefox supports a limited subset of scrollbar styles */
.scrollbar-thin {
  scrollbar-width: thin !important;
  scrollbar-color: #888 #f1f1f1 !important;
}

.scrollbar-thin:hover {
  scrollbar-color: #555 #f1f1f1 !important;
}
</style>

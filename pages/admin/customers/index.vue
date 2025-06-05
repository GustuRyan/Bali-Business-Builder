<script setup lang="ts">
/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import type { AuthUser, ResponseData } from "@/types";
const { loading } = useStateRequestHelper();
import { useTimeoutFn } from "@vueuse/core";
const { modal, openModal, closeModal } = useModal();

const { locale } = useI18n();

const {
  modal: modalOrder,
  openModal: openModalOrder,
  closeModal: closeModalOrder,
} = useModal();

const {
  modal: modalSetPassword,
  openModal: openModalSetPassword,
  closeModal: closeModalSetPassword,
} = useModal();

const router = useRouter();
const route = useRoute();

const data = ref<ResponseData<AuthUser[]>>();
const selectedItem = ref<AuthUser>();

const page = ref(1);
const search = ref("");
const { axiosRequest } = useAxios();

const { start: startRequest, stop: stopRequest } = useTimeoutFn(() => {
  loadData();
}, 1500);

async function loadData() {
  allModalClode();
  loading.value = true;
  const { data: responData }: { data: ResponseData<AuthUser[]> } =
    await axiosRequest.get(
      `/admins/users?lang=${locale.value}&page=${page.value}&filter[search]=${search.value}`
    );
  data.value = responData;
  stopRequest();
  loading.value = false;
}

function replaceWindowUrl() {
  router.replace(`/admin/customers?page=${page.value}&search=${search.value}`);

  startRequest();
}

watch(
  () => search.value,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      page.value = 1;
    }

    replaceWindowUrl();
  }
);

watch(
  () => page.value,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      replaceWindowUrl();
    }
  }
);

function editItem(item: AuthUser) {
  selectedItem.value = { ...item };
  openModal();
}

function openOrderList(item: AuthUser) {
  selectedItem.value = { ...item };
  openModalOrder();
}

function allModalClode() {
  selectedItem.value = undefined;
  closeModal();
  closeModalOrder();
  closeModalSetPassword();
}

function setPasswordUser(item: AuthUser) {
  selectedItem.value = { ...item };
  openModalSetPassword();
}

definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});

onMounted(() => {
  stopRequest();
  if (route.query.page) {
    page.value = route.query?.page as unknown as number;
  }
  if (route.query.search) {
    search.value = route.query?.search as unknown as string;
  }
  loadData();
});

useHead({
  title: "Orders",
});
</script>
<template>
  <Container class="py-14 space-y-8">
    <div class="flex justify-between items-center">
      <div>
        <div class="text-xl md:text-3xl font-bold">
          {{ $t("customer_txt") }}
        </div>
        <div>{{ $t("manage_customer_identity_txt") }}</div>
      </div>
      <div></div>
    </div>

    <div class="flex flex-col md:flex-row space-y-4 md:justify-between md:items-center">
      <div>
        <FormSearch v-model="search" :disabled="loading" :placeholder="$t('search_txt')" type="search" />
      </div>
    </div>

    <div>
      <div class="overflow-x-auto !py-2 border rounded-t-lg">
        <table class="table table-xs md:table-md w-full rounded-t-xl">
          <!-- head -->
          <thead class="h-12">
            <tr>
              <th v-for="(title, index) in [
                $t('profile_txt'),
                $t('name_txt'),
                $t('email_txt'),
                $t('phone_txt'),
                $t('active_txt'),
                $t('already_setup_account_txt'),
                '',
              ]" :key="index" class="font-medium">
                {{ title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr class="odd:bg-gray-100 even:hover:bg-gray-100 transition-colors duration-300"
              v-for="(item, index) in data?.data" :key="index">
              <th class="text-gray-500 text-sm font-normal !py-2">
                <div class="avatar">
                  <div class="rounded-full h-11">
                    <img v-if="item.profile_picture" alt="avatar" :src="item.profile_picture"
                      class="h-full w-full object-cover" />
                    <div v-else class="bg-gray-400 flex items-center justify-center h-full">
                      AD
                    </div>
                  </div>
                </div>
              </th>
              <th class="text-gray-500 text-sm font-normal !py-2">
                {{ item.first_name }} {{ item.last_name }}
              </th>
              <td class="text-gray-500 text-sm font-normal !py-2">
                {{ item.email }}
              </td>
              <td class="text-gray-500 text-sm font-normal !py-2">
                {{ item.mobile_number }}
              </td>
              <td class="text-gray-500 text-sm font-normal !py-2">
                {{ item.is_active ? $t("yes_txt") : $t("no_txt") }}
              </td>
              <td class="text-gray-500 text-sm font-normal !py-2">
                {{ item.is_setup === 1 ? $t("yes_txt") : $t("no_txt") }}
              </td>
              <td class="text-gray-500 text-sm font-normal !py-2">
                <div>
                  <VMenu>
                    <button class="btn btn-sm rounded-full normal-case">
                      {{ $t("action_txt")
                      }}
                      <Icon name="i-heroicons-chevron-down" />
                    </button>
                    <template #popper>
                      <ul class="menu w-56">
                        <li>
                          <button type="button" @click="openOrderList(item)">
                            <Icon name="i-heroicons-inbox-stack" class="h-5 w-5" />
                            {{ $t("order_list_txt") }}
                          </button>
                        </li>
                        <li>
                          <button type="button" @click="editItem(item)">
                            <Icon name="i-heroicons-pencil" class="h-5 w-5" />
                            {{ $t("edit_txt") }}
                          </button>
                        </li>
                        <li v-if="item.is_setup === 0">
                          <button type="button" @click="setPasswordUser(item)">
                            <Icon name="i-heroicons-lock-closed" class="h-5 w-5" />
                            {{ $t("set_password_txt") }}
                          </button>
                        </li>
                      </ul>
                    </template>
                  </VMenu>
                </div>
              </td>
            </tr>
            <!-- row 2 -->
          </tbody>
          <tfoot v-if="data?.meta">
            <tr>
              <td colspan="6">
                <Pagination v-model="page" :total="data?.meta.total" :per-page="data?.meta.per_page"
                  :include-first-last="false" />
              </td>
              <td>
                <PageMetaHelper v-if="data?.meta" :page="page" :total="data?.meta.total" :perPage="data?.meta.per_page" />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </Container>
  <ModalBase v-model="modal" class="p-0 rounded-lg w-10/12 max-w-xl">
    <div class="card card-compact border rounded-lg">
      <div class="card-body">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-lg font-bold">{{ $t("update_customer_txt") }}</h3>
          </div>
          <div>
            <button type="button" class="btn btn-square btn-xs rounded-full" @click="allModalClode">
              <Icon name="i-heroicons-x-mark" />
            </button>
          </div>
        </div>
        <FormRegisterNonAdmin :user="selectedItem" @reload="loadData" />
      </div>
    </div>
  </ModalBase>

  <ModalBase v-model="modalOrder" class="p-0 rounded-lg w-full max-w-5xl">
    <div class="card card-compact border rounded-lg">
      <div class="card-body">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-lg font-bold">{{ $t("order_list_txt") }}</h3>
          </div>
          <div>
            <button type="button" class="btn btn-square btn-xs rounded-full" @click="allModalClode">
              <Icon name="i-heroicons-x-mark" />
            </button>
          </div>
        </div>
        <template v-if="selectedItem">
          <UserOrderList :user="selectedItem" />
        </template>
      </div>
    </div>
  </ModalBase>

  <ModalBase v-model="modalSetPassword" class="p-0 rounded-lg w-10/12 max-w-xl">
    <div class="card card-compact border rounded-lg">
      <div class="card-body">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-lg font-bold">{{ $t("set_password_txt") }}</h3>
          </div>
          <div>
            <button type="button" class="btn btn-square btn-xs rounded-full" @click="allModalClode">
              <Icon name="i-heroicons-x-mark" />
            </button>
          </div>
        </div>
        <FormNewPassword :user="selectedItem" @reload="loadData" />
      </div>
    </div>
  </ModalBase>
</template>

<style scoped></style>

<script setup lang="ts">
/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import type { ResponseData, Contact } from "@/types";
import { useDateFormat } from "@vueuse/core";
const { modal, openModal, closeModal } = useModal();

const { locale } = useI18n();

import { useTimeoutFn } from "@vueuse/core";
const router = useRouter();
const route = useRoute();
const { loading } = useStateRequestHelper();

const { axiosRequest } = useAxios();

const page = ref(1);
const search = ref("");
const selectedItem = ref<Contact>();

const { start: startRequest, stop: stopRequest } = useTimeoutFn(() => {
  loadData();
}, 1500);

const data = ref<ResponseData<Contact[]>>();

function formatDate(date: string) {
  if (!date) {
    return;
  }

  const dateTime = useDateFormat(date, "YYYY MMM DD hh:mm");
  return dateTime.value;
}

async function loadData() {
  loading.value = true;
  closeModal();
  selectedItem.value = undefined;

  const { data: responData }: { data: ResponseData<Contact[]> } =
    await axiosRequest.get(
      `/admins/contacts?lang=${locale.value}&page=${page.value}&filter[search]=${search.value}`
    );
  data.value = responData;
  stopRequest();
  loading.value = false;
}

function replaceWindowUrl() {
  router.replace(`/admin/contacts?page=${page.value}&search=${search.value}`);

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

function showDetail(item: Contact) {
  selectedItem.value = item;
  openModal();
}

onMounted(() => {
  stopRequest();
  if (route.query.page) {
    page.value = Number(route.query?.page as unknown as number);
  }
  if (route.query.search) {
    search.value = route.query?.search as unknown as string;
  }

  loadData();
});

definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});
useHead({
  title: "Contact",
});
</script>
<template>
  <Container class="py-8 space-y-8">
    <div class="flex justify-between items-center">
      <div>
        <div class="text-xl md:text-3xl font-bold">{{ $t("contact_txt") }}</div>
        <div>{{ $t("manage_your_contact_txt") }}</div>
      </div>
      <div></div>
    </div>

    <div class="max-w-md">
      <FormSearch v-model="search" :placeholder="$t('search_txt')" :disabled="loading" type="search" />
    </div>

    <div>
      <div class="overflow-x-auto !py-2 border rounded-t-lg">
        <table class="table table-xs md:table-md w-full rounded-t-xl">
          <!-- head -->
          <thead class="h-12">
            <tr>
              <th v-for="(title, index) in [
                $t('date_txt'),
                $t('first_name_txt'),
                $t('last_name_txt'),
                $t('email_txt'),
                $t('phone_txt'),
                $t('message_txt'),
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
              <td class="text-gray-500 text-sm font-normal !py-2">
                <span class="whitespace-nowrap">
                  {{ formatDate(item.created_at as string) }}
                </span>
              </td>
              <td class="text-gray-500 text-sm font-normal !py-2">
                {{ item.first_name }}
              </td>
              <td class="text-gray-500 text-sm font-normal !py-2">
                {{ item.last_name }}
              </td>

              <td class="text-gray-500 text-sm font-normal !py-2">
                {{ item.email }}
              </td>
              <td class="text-gray-500 text-sm font-normal !py-2">
                {{ item.phone }}
              </td>
              <td class="text-gray-500 text-sm font-normal !py-2">
                <span class="line-clamp-2">
                  {{ item.message }}
                </span>
              </td>

              <td class="text-gray-500 text-sm font-normal !py-2">
                <div class="space-x-2">
                  <button type="button" @click="showDetail(item)" class="btn btn-sm normal-case btn-ghost btn-square">
                    <Icon name="i-heroicons-eye" />
                  </button>
                </div>
              </td>
            </tr>
            <!-- row 2 -->
          </tbody>
          <tfoot v-if="data?.meta">
            <tr>
              <td colspan="6">
                <Pagination v-model="page" :total="(data?.meta.total as number)"
                  :per-page="(data?.meta.per_page as number)" :include-first-last="false" />
              </td>
              <td colspan="1">
                <PageMetaHelper :page="page" :total="(data?.meta.total as number)"
                  :per-page="(data?.meta.per_page as number)" />
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
            <h3 class="text-lg font-bold">{{ $t("detail_contact_txt") }}</h3>
          </div>
          <div>
            <button type="button" class="btn btn-square btn-xs rounded-full" @click="closeModal">
              <Icon name="i-heroicons-x-mark" />
            </button>
          </div>
        </div>
        <div class="flex justify-between py-1">
          <div>{{ $t("first_name_txt") }}</div>
          <div>
            {{ selectedItem?.first_name }}
          </div>
        </div>
        <div class="flex justify-between py-1">
          <div>{{ $t("last_name_txt") }}</div>
          <div>
            {{ selectedItem?.last_name }}
          </div>
        </div>
        <div class="flex justify-between py-1">
          <div>{{ $t("email_txt") }}</div>
          <div>
            {{ selectedItem?.email }}
          </div>
        </div>
        <div class="flex justify-between py-1">
          <div>{{ $t("phone_txt") }}</div>
          <div>
            {{ selectedItem?.phone }}
          </div>
        </div>
        <div>
          <div>{{ $t("message_txt") }}</div>
          <div class="overflow-y-auto max-h-40">
            {{ selectedItem?.message }}
          </div>
        </div>
        <div class="flex flex-col">
          <div class="text-sm">This message also sent to your email <span class="text-blue-500">
              info@bali-visum.com
            </span></div>
        </div>

      </div>
    </div>
  </ModalBase>
</template>

<style scoped></style>

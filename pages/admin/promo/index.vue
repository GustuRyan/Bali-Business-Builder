<script setup lang="ts">
const { modal, openModal, closeModal } = useModal();
const { modal: modalDelete, closeModal: closeModalDelete } = useModal();
const { loading } = useStateRequestHelper();
const { getPromoType } = usePromo();
const { axiosRequest } = useAxios();
const router = useRouter();
const route = useRoute();
const { locale } = useI18n();

import { useTimeoutFn, useDateFormat } from "@vueuse/core";

import { ResponseData, Promo } from "@/types";

const page = ref<number>(1);
const search = ref("");
const selectedItem = ref<Promo>();

const params = computed(() => {
  return {
    page: page.value,
    search: search.value,
  };
});

const data = ref<ResponseData<Promo[]>>();

async function loadData() {
  loading.value = true;
  modal.value = false;
  modalDelete.value = false;
  selectedItem.value = undefined;

  const { data: promoData }: { data: ResponseData<Promo[]> } =
    await axiosRequest.get(
      `/admins/promos?lang=${locale.value}&page=${params.value.page}&filter[search]=${params.value.search}`
    );

  data.value = promoData;
  loading.value = false;
  stopRequest();
}

const { start: startRequest, stop: stopRequest } = useTimeoutFn(() => {
  loadData();
}, 1500);

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

function formatDate(startDate: string, endDate: string) {
  const start = useDateFormat(startDate, "DD MMM YYYY");
  const end = useDateFormat(endDate, "DD MMM YYYY");
  return start.value + "-" + end.value;
}

function replaceWindowUrl() {
  router.replace(`/admin/promo?page=${page.value}&search=${search.value}`);

  startRequest();
}

function editItem(item: Promo) {
  selectedItem.value = { ...item };
  modal.value = true;
}

function deleteItem(item: Promo) {
  selectedItem.value = { ...item };
  modalDelete.value = true;
}

function allModalClode() {
  selectedItem.value = undefined;
  closeModalDelete();
  closeModal();
}

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

definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});

useHead({
  title: "Orders",
});
</script>
<template>
  <Container class="py-14 space-y-8">
    <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:justify-between md:items-center">
      <div>
        <div class="text-xl md:text-3xl font-bold">
          {{ $t("promo_code_txt") }}
        </div>
        <div>{{ $t("manage_your_promo_code_data_txt") }}</div>
      </div>
      <div>
        <button @click="openModal" class="btn btn-neutral btn-sm h-9 rounded-full px-5 normal-case">
          + {{ $t("create_new_promo_txt") }}
        </button>
      </div>
    </div>

    <div class="flex flex-col md:flex-row space-y-4 md:justify-between md:items-center">
      <div>
        <FormSearch :placeholder="$t('search_txt')" v-model="search" :disabled="loading" type="search" />
      </div>
    </div>

    <div>
      <div class="overflow-x-auto !py-2 border rounded-t-lg">
        <table class="table table-xs md:table-md w-full rounded-t-xl">
          <!-- head -->
          <thead class="h-12">
            <tr>
              <th v-for="(title, index) in [
                $t('promo_code_txt'),
                $t('valid_date_txt'),
                $t('amount_of_discount_txt'),
                $t('amount_of_discount_txt') + ' USD',
                $t('usage_txt'),
                $t('is_active_txt'),
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
                {{ item.code }}
              </th>
              <td class="text-gray-500 text-sm font-normal !py-2">
                {{ formatDate(item.start_at, item.expired_at) }}
              </td>
              <td class="text-gray-500 text-sm font-normal !py-2">
                {{
                  getPromoType(
                    item.amount as number,
                    item.type as string,
                    " IDR"
                  )
                }}
              </td>

              <td class="text-gray-500 text-sm font-normal !py-2">
                {{
                  getPromoType(
                    item.amount_usd as number,
                    item.type as string,
                    " USD"
                  )
                }}
              </td>
              <td class="text-gray-500 text-sm font-normal !py-2">
                {{ item.total_order + "x" }} applied
              </td>
              <td class="text-gray-500 text-sm font-normal !py-2">
                {{ item.is_active ? $t("yes_txt") : $t("no_txt") }}
              </td>
              <td class="text-gray-500 text-sm font-normal !py-2">
                <div class="space-x-2">
                  <button type="button" @click="editItem(item)" class="btn btn-sm normal-case btn-ghost btn-square">
                    <Icon name="i-heroicons-pencil" />
                  </button>
                  <button type="button" @click="deleteItem(item)" class="btn btn-sm normal-case btn-ghost btn-square">
                    <Icon name="i-heroicons-trash" />
                  </button>
                </div>
              </td>
            </tr>
            <!-- row 2 -->
          </tbody>
          <tfoot v-if="data?.meta">
            <tr>
              <td colspan="5">
                <Pagination v-model="page" :total="(data?.meta.total as number)"
                  :per-page="(data?.meta.per_page as number)" :include-first-last="false" />
              </td>
              <td colspan="1">
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
      <div class="card-body space-y-4">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-lg font-bold">{{ $t("promo_code_txt") }}</h3>
          </div>
          <div>
            <button type="button" class="btn btn-square btn-xs rounded-full" @click="allModalClode">
              <Icon name="i-heroicons-x-mark" />
            </button>
          </div>
        </div>
        <FormPromo @reload="loadData" :promo="selectedItem" />
      </div>
    </div>
  </ModalBase>
  <ModalBase v-model="modalDelete" class="p-0 rounded-lg w-10/12 max-w-xl">
    <div class="card card-compact border rounded-lg">
      <div class="card-body space-y-4">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-lg font-bold">{{ $t("delete_promo_code_txt") }}</h3>
          </div>
          <div class="hidden">
            <button type="button" class="btn btn-square btn-xs rounded-full" @click="allModalClode">
              <Icon name="i-heroicons-x-mark" />
            </button>
          </div>
        </div>
        <ConfirmDeletePromo :promo="selectedItem" @reload="loadData" @close="allModalClode" />
      </div>
    </div>
  </ModalBase>
</template>

<style scoped></style>

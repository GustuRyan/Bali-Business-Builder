<script setup lang="ts">
import { useDateFormat, useTimeoutFn } from "@vueuse/core";
const { modal, openModal } = useModal();
const { loading } = useStateRequestHelper();

import type { ResponseData, Product } from "@/types";
const { formatCurrency } = useMoneyFormat();
const router = useRouter();
const route = useRoute();

const { axiosRequest } = useAxios();
const { locale } = useI18n();

const page = ref(1);

const search = ref("");
const status = ref("");

function tableFormatDate(date: string) {
  const dateT = useDateFormat(date, "DD MMM YYYY");
  return dateT.value;
}

const data = ref<ResponseData<Product[]>>();
const selectedItem = ref<Product>();

const params = computed(() => {
  return {
    page: page.value,
    search: search.value,
    status: status.value,
  };
});

async function loadData() {
  loading.value = true;
  modal.value = false;
  selectedItem.value = undefined;
  const { data: responData }: { data: ResponseData<Product[]> } =
    await axiosRequest.get(
      `/admins/products?lang=${locale.value}&page=${params.value.page}&filter[search]=${params.value.search}`
    );
  data.value = responData;
  stopRequest();
  loading.value = false;
}

const { start: startRequest, stop: stopRequest } = useTimeoutFn(() => {
  loadData();
}, 1500);
function replaceWindowUrl() {
  router.replace(`/admin/services?page=${page.value}&search=${search.value}`);

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

function allModalClode() {
  modal.value = false;
}

function deleteItem(item: Product) {
  selectedItem.value = item;
  openModal();
}

onMounted(() => {
  stopRequest();
  if (route.query.page) {
    page.value = route.query?.page as unknown as number;
  }
  if (route.query.search) {
    search.value = route.query?.search as unknown as string;
  }
  if (route.query.status) {
    status.value = route.query?.status as unknown as string;
  }
  loadData();
});

definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});

useHead({
  title: "Service",
});
</script>
<template>
  <Container class="py-14 space-y-8">
    <div class="flex justify-between items-center">
      <div>
        <div class="text-xl md:text-3xl font-bold">
          {{ $t("services_txt") }}
        </div>
        <div>{{ $t("manage_your_services_txt") }}</div>
      </div>
      <div>
        <NuxtLink to="/admin/services/create" no-prefetch
          class="btn btn-neutral btn-sm h-9 rounded-full px-5 normal-case">
          +{{ $t("create_new_service_txt") }}
        </NuxtLink>
      </div>
    </div>

    <div>
      <div class="overflow-x-auto !py-2 border rounded-t-lg max-w-[1171px]">
        <table class="table table-xs md:table-md w-full rounded-t-xl">
          <!-- head -->
          <thead class="h-12">
            <tr>
              <th v-for="(title, index) in [
                $t('service_name_txt'),
                $t('base_price_txt'),
                $t('base_price_txt') + ' USD',
                $t('short_description_txt'),
                $t('total_order_txt'),
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
                <div class="inline-flex items-center space-x-2">
                  <div class="avatar">
                    <div class="h-11 rounded-full">
                      <img v-if="item.image" class="h-full w-full object-cover" alt="avatar" :src="item.image"
                        loading="lazy" />
                      <div v-else class="h-full w-full bg-gray-300 flex justify-center items-center">
                        SV
                      </div>
                    </div>
                  </div>
                  <span>
                    {{ item.name }}
                  </span>
                </div>
              </th>
              <td class="text-gray-500 text-sm font-normal !py-2">
                <span class="whitespace-nowrap">
                  {{ formatCurrency(item.price) }}
                </span>
              </td>
              <td class="text-gray-500 text-sm font-normal !py-2">
                <span class="whitespace-nowrap">
                  {{ formatCurrency(item.usd_price, "$") }}
                </span>
              </td>
              <td class="text-gray-500 text-sm font-normal !py-2">
                <div class="truncate max-w-md">
                  {{ item.description }}
                </div>
              </td>
              <td class="text-gray-500 text-sm font-normal !py-2">
                {{ item.total_order }} Orders
              </td>
              <td class="text-gray-500 text-sm font-normal !py-2">
                <div>
                  <VMenu placements="auto">
                    <button class="btn btn-sm normal-case whitespace-nowrap w-24">
                      <span> {{ $t("action_txt") }} </span>
                      <Icon name="i-heroicons-chevron-down" />
                    </button>
                    <template #popper>
                      <ul class="menu w-56">
                        <li>
                          <NuxtLink :to="`/admin/services/${item.slug}/faq`">
                            <Icon name="i-heroicons-chat-bubble-left-right" />
                            FAQ
                          </NuxtLink>
                        </li>
                        <li>
                          <NuxtLink :to="`/admin/services/${item.slug}/edit`">
                            <Icon name="i-heroicons-pencil" />
                            {{ $t("edit_txt") }}
                          </NuxtLink>
                        </li>
                        <li>
                          <button @click="deleteItem(item)">
                            <Icon name="i-heroicons-trash" />
                            {{ $t("delete_txt") }}
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
          <tfoot>
            <tr>
              <td colspan="4">
                <Pagination v-if="data?.meta" v-model="page" :total="data?.meta.total" :per-page="data?.meta.per_page"
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
            <h3 class="text-lg font-bold">
              {{ $t("delete_service_item_txt") }}
            </h3>
          </div>
          <div class="hidden">
            <button type="button" class="btn btn-square btn-xs rounded-full" @click="allModalClode">
              <Icon name="i-heroicons-x-mark" />
            </button>
          </div>
        </div>
        <ConfirmDeleteService :product="selectedItem" @reload="loadData" @close="allModalClode" />
      </div>
    </div>
  </ModalBase>
</template>

<style scoped></style>

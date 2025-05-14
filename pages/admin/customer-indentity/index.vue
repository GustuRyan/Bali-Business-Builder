<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";
import { PERSON_FORM_LIST, ResponseData } from "@/types";
const { loading } = useStateRequestHelper();
const { axiosRequest } = useAxios();
const { modal, openModal, closeModal } = useModal();
const router = useRouter();
const route = useRoute();

const { locale } = useI18n();

const { start: startRequest, stop: stopRequest } = useTimeoutFn(() => {
  loadData();
}, 1500);

const data = ref<ResponseData<PERSON_FORM_LIST[]>>();
const selectedItem = ref<PERSON_FORM_LIST>();

const page = ref(1);
const search = ref("");
async function loadData() {
  closeModal();
  loading.value = true;
  const { data: responData }: { data: ResponseData<PERSON_FORM_LIST[]> } =
    await axiosRequest.get(
      `/admins/person-forms?lang=${locale.value}&page=${page.value}&filter[search]=${search.value}`
    );
  data.value = responData;
  stopRequest();
  loading.value = false;
}

function replaceWindowUrl() {
  router.replace(
    `/admin/customer-indentity?page=${page.value}&search=${search.value}`
  );

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

function allModalClose() {
  modal.value = false;
  selectedItem.value = undefined;
}

function showModalIndentity(item: PERSON_FORM_LIST) {
  selectedItem.value = item;
  modal.value = true;
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
    <div class="flex justify-between items-center">
      <div>
        <div class="text-xl md:text-3xl font-bold">
          {{ $t("customer_identity_txt") }}
        </div>
        <div>{{ $t("manage_costumer_indentity_txt") }}</div>
      </div>
      <div></div>
    </div>

    <div
      class="flex flex-col md:flex-row space-y-4 md:justify-between md:items-center"
    >
      <div>
        <FormSearch
          v-model="search"
          type="search"
          :placeholder="$t('search_txt')"
        />
      </div>
    </div>

    <div>
      <div class="overflow-x-auto !py-2 border rounded-t-lg">
        <table class="table table-xs md:table-md w-full rounded-t-xl">
          <!-- head -->
          <thead class="h-12">
            <tr>
              <th
                v-for="(title, index) in [
                  $t('name_txt'),
                  $t('passport_no_txt'),
                  $t('citizenship_txt'),
                  '',
                ]"
                :key="index"
                class="font-medium"
              >
                {{ title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr
              class="odd:bg-gray-100 even:hover:bg-gray-100 transition-colors duration-300"
              v-for="(item, index) in data?.data"
              :key="index"
            >
              <th class="text-gray-500 text-sm font-normal !py-2">
                {{ item.name }}
              </th>
              <td class="text-gray-500 text-sm font-normal !py-2">
                {{ item.passport_no }}
              </td>
              <td class="text-gray-500 text-sm font-normal !py-2">
                {{ item.citizenship }}
              </td>

              <td class="text-gray-500 text-sm font-normal !py-2">
                <div>
                  <button
                    type="button"
                    @click="showModalIndentity(item)"
                    class="btn btn-sm normal-case btn-ghost btn-square"
                  >
                    <Icon name="i-heroicons-eye" />
                  </button>
                </div>
              </td>
            </tr>
            <!-- row 2 -->
          </tbody>
          <tfoot v-if="data?.meta">
            <tr>
              <td colspan="3">
                <Pagination
                  v-model="page"
                  :total="data?.meta.total"
                  :per-page="data?.meta.per_page"
                  :include-first-last="false"
                />
              </td>
              <td>
                <PageMetaHelper
                  v-if="data?.meta"
                  :page="page"
                  :total="data?.meta.total"
                  :perPage="data?.meta.per_page"
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </Container>
  <ModalBase v-model="modal" class="p-0 rounded-lg w-full max-w-5xl">
    <div class="card card-compact border rounded-lg">
      <div class="card-body min-h-[300px]">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-lg font-bold">{{ $t("customer_identity_txt") }}</h3>
          </div>
          <div>
            <button
              type="button"
              class="btn btn-square btn-xs rounded-full"
              @click="allModalClose"
            >
              <Icon name="i-heroicons-x-mark" />
            </button>
          </div>
        </div>
        <div class="overflow-auto">
          <template v-if="selectedItem">
            <IdentityUserForm :person-uuid="selectedItem.uuid" />
          </template>
        </div>
      </div>
    </div>
  </ModalBase>
</template>

<style scoped></style>

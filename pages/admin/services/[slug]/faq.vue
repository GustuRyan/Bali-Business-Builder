<script setup lang="ts">
const { loading } = useStateRequestHelper();
const { modal, openModal, closeModal } = useModal();
const {
  modal: modalDelete,
  openModal: openModalDelete,
  closeModal: closeModalDelete,
} = useModal();

const { locale } = useI18n();

import { ResponseData, Product, FAQ } from "@/types";

const router = useRouter();
const route = useRoute();

const { axiosRequest } = useAxios();

const selectedItem = ref<FAQ>();

const productSlug = computed(() => {
  return route.params.slug as string;
});

const data = ref<ResponseData<FAQ[]>>();

async function loadData() {
  allModalClose();
  loading.value = true;
  const { data: responData }: { data: ResponseData<FAQ[]> } =
    await axiosRequest.get(
      `/admins/products/${productSlug.value}/questions?lang=${locale.value}`
    );
  data.value = responData;

  loading.value = false;
}

function allModalClose() {
  selectedItem.value = undefined;
  closeModal();
  closeModalDelete();
}

function editItem(item: FAQ) {
  selectedItem.value = item;
  openModal();
}

function deleteItem(item: FAQ) {
  selectedItem.value = item;
  openModalDelete();
}

onMounted(() => {
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
          <NuxtLink to="/admin/services">
            <Icon name="i-heroicons-arrow-left" /> FAQ/{{ productSlug }}
          </NuxtLink>
        </div>
      </div>
      <div>
        <button
          type="button"
          @click="openModal"
          class="btn btn-neutral btn-sm h-9 rounded-full px-5 normal-case"
        >
          + {{ $t("craete_new_content_txt") }}
        </button>
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
                  $t('question_txt'),
                  $t('answer_txt'),
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
              <td class="text-gray-500 text-sm font-normal !py-2">
                <div class="inline-flex items-center space-x-2">
                  <span> {{ item.question }} </span>
                </div>
              </td>
              <td class="text-gray-500 text-sm font-normal !py-2">
                <div class="inline-flex items-center space-x-2">
                  <span> {{ item.answer }} </span>
                </div>
              </td>

              <td class="text-gray-500 text-sm font-normal !py-2">
                <div class="w-fit ml-auto">
                  <VMenu>
                    <button class="btn btn-sm normal-case whitespace-nowrap">
                      <span> {{ $t("action_txt") }}</span>
                      <Icon name="i-heroicons-chevron-down" />
                    </button>
                    <template #popper>
                      <ul class="menu w-56">
                        <li>
                          <button type="button" @click="editItem(item)">
                            <Icon name="i-heroicons-pencil" />
                            {{ $t("edit_txt") }}
                          </button>
                        </li>
                        <li>
                          <button type="button" @click="deleteItem(item)">
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
        </table>
      </div>
    </div>
  </Container>
  <ModalBase v-model="modal" class="p-0 rounded-lg w-10/12 max-w-xl">
    <div class="card card-compact border rounded-lg">
      <div class="card-body">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-lg font-bold">Form FAQ</h3>
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
        <FormProductFaq
          :product-slug="productSlug"
          @reload="loadData"
          :faq="selectedItem"
        />
      </div>
    </div>
  </ModalBase>

  <ModalBase v-model="modalDelete" class="p-0 rounded-lg w-10/12 max-w-xl">
    <div class="card card-compact border rounded-lg">
      <div class="card-body">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-lg font-bold">{{ $t("delete_item_faq_txt") }}</h3>
          </div>
          <div class="hidden">
            <button
              type="button"
              class="btn btn-square btn-xs rounded-full"
              @click="allModalClose"
            >
              <Icon name="i-heroicons-x-mark" />
            </button>
          </div>
        </div>
        <ConfirmDeleteFaq
          :faq="selectedItem"
          @close="allModalClose"
          @reload="loadData"
          :proudct-slug="productSlug"
        />
      </div>
    </div>
  </ModalBase>
</template>

<style scoped></style>

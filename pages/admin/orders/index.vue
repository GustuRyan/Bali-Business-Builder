<script setup lang="ts">
import { useStepper, useDateFormat, useTimeoutFn } from "@vueuse/core";
const { loading } = useStateRequestHelper();
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import { storeToRefs } from "pinia";

import {
  ResponseData,
  ProductOrders,
  ORDER_COUNT,
  GeneralResponse,
} from "@/types";

const stateAdminStore = useStateAdmin();

const { status, search, page, dateRange } = storeToRefs(stateAdminStore);

const router = useRouter();
const route = useRoute();

const { axiosRequest } = useAxios();

const { locale } = useI18n();

function formatDate(date: string[]) {
  const startDate = useDateFormat(date[0], "MMM,DD YYYY");
  const endDate = useDateFormat(date[1], "MMM,DD YYYY");
  return [startDate.value, endDate.value].join("-");
}

const startDate = computed(() => {
  if (!dateRange.value) {
    return "";
  }
  const start = dateRange.value[0];
  if (start) {
    return useDateFormat(start, "YYYY-MM-DD").value;
  }
});

const endtDate = computed(() => {
  if (!dateRange.value) {
    return "";
  }
  const date = dateRange.value[1];
  if (date) {
    return useDateFormat(date, "YYYY-MM-DD").value;
  }
});

const data = ref<ResponseData<ProductOrders[]>>();
const dataCount = ref<GeneralResponse<ORDER_COUNT>>();

function stepperGoTo(
  name:
    | "all"
    | "review-process"
    | "success"
    | "rejected"
    | "failed"
    | "confirmed"
) {
  page.value = 1;
  search.value = "";
  dateRange.value = null;
  if (name === "all") {
    status.value = "";
  } else if (name === "review-process") {
    status.value = "waiting_for_confirmation";
  } else if (name === "success") {
    status.value = "done";
  } else if (name === "rejected") {
    status.value = "declined";
  } else if (name === "confirmed") {
    status.value = "order_processed";
  }
  if (name === "failed") {
    status.value = "failed";
  }
  stepper.goTo(name);
  startRequest();
}

async function loadData() {
  loading.value = true;
  const { data: responData }: { data: ResponseData<ProductOrders[]> } =
    await axiosRequest.get(
      `/admins/orders?lang=${locale.value}&page=${page.value}&filter[search]=${search.value}&filter[status]=${status.value}&filter[from_date]=${startDate.value}&filter[to_date]=${endtDate.value}`
    );
  data.value = responData;
  stopRequest();
  loading.value = false;
}

async function loadTotalOrderCount() {
  loading.value = true;
  const { data: responData }: { data: GeneralResponse<ORDER_COUNT> } =
    await axiosRequest.get(`/admins/total-orders?lang=${locale.value}`);
  dataCount.value = responData;

  loading.value = false;
}

const { start: startRequest, stop: stopRequest } = useTimeoutFn(() => {
  loadData();
}, 1500);

const stepper = useStepper({
  all: {
    isValid: () => true,
  },
  "review-process": {
    isValid: () => true,
  },
  confirmed: {
    isValid: () => true,
  },
  success: {
    isValid: () => true,
  },
  rejected: {
    isValid: () => true,
  },
  failed: {
    isValid: () => true,
  },
});

function replaceWindowUrl() {
  router.replace(
    `/admin/orders?page=${page.value}&search=${search.value}&status=${status.value}&from_date=${startDate.value}&to_date=${endtDate.value}`
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
  () => status.value,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      page.value = 1;
    }

    replaceWindowUrl();
  }
);

watch(
  () => dateRange.value,
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

function statusChangeUpdateStepper() {
  if (status.value === "waiting_for_confirmation") {
    stepper.goTo("review-process");
  } else if (status.value === "order_processed") {
    stepper.goTo("confirmed");
  } else if (status.value === "done") {
    stepper.goTo("success");
  } else if (status.value === "declined") {
    stepper.goTo("rejected");
  } else if (status.value === "failed") {
    stepper.goTo("failed");
  } else {
    stepper.goTo("all");
  }
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
    stepper.goTo(status.value as any);
  }
  loadData();
  loadTotalOrderCount();
  statusChangeUpdateStepper();
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
        <div class="text-xl md:text-3xl font-bold">Order</div>
        <div>{{ $t("manage_your_order_txt") }}</div>
      </div>
      <div></div>
    </div>

    <div class="tabs tabs-boxed max-w-4xl">
      <button
        class="tab"
        type="button"
        @click="stepperGoTo('all')"
        :class="{ 'bg-white': stepper.isCurrent('all') }"
        :disabled="loading"
      >
        <div class="flex items-center space-x-2">
          <span> ALL ({{ dataCount?.data?.total_all }}) </span>
        </div>
      </button>
      <button
        class="tab"
        type="button"
        @click="stepperGoTo('review-process')"
        :disabled="loading"
        :class="{ 'bg-white': stepper.isCurrent('review-process') }"
      >
        <div class="flex items-center space-x-2">
          <img src="/on-process.png" class="h-6 w-6" />
          <span> Review Process ({{ dataCount?.data?.total_review }}) </span>
        </div>
      </button>

      <button
        class="tab"
        type="button"
        @click="stepperGoTo('rejected')"
        :disabled="loading"
        :class="{ 'bg-white': stepper.isCurrent('rejected') }"
      >
        <div class="flex items-center space-x-2">
          <img src="/on-rejected.png" class="h-6 w-6" />
          <span> Decline ({{ dataCount?.data?.total_rejected }}) </span>
        </div>
      </button>
      <button
        class="tab"
        type="button"
        @click="stepperGoTo('failed')"
        :disabled="loading"
        :class="{ 'bg-white': stepper.isCurrent('failed') }"
      >
        <div class="flex items-center space-x-2">
          <img src="/on-rejected.png" class="h-6 w-6" />
          <span>Failed ({{ dataCount?.data?.total_failed }}) </span>
        </div>
      </button>

      <button
        class="tab"
        type="button"
        @click="stepperGoTo('confirmed')"
        :disabled="loading"
        :class="{ 'bg-white': stepper.isCurrent('confirmed') }"
      >
        <div class="flex items-center space-x-2">
          <img src="/on-success.png" class="h-6 w-6" />
          <span> Confirmed ({{ dataCount?.data?.total_success }})</span>
        </div>
      </button>
      <button
        class="tab"
        type="button"
        @click="stepperGoTo('success')"
        :disabled="loading"
        :class="{ 'bg-white': stepper.isCurrent('success') }"
      >
        <div class="flex items-center space-x-2">
          <img src="/on-completed.png" class="h-6 w-6" />
          <span> Completed ({{ dataCount?.data?.total_complete }})</span>
        </div>
      </button>
    </div>

    <div
      class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:justify-between md:items-center"
    >
      <div>
        <FormSearch
          v-model="search"
          :disabled="loading"
          :placeholder="$t('search_txt')"
          type="search"
        />
      </div>
      <div class="min-w-[300px]">
        <VueDatePicker
          v-model="dateRange"
          month-name-format="long"
          :disabled="loading"
          range
          :multi-calendars="{ solo: true }"
          placeholder="Select date"
          auto-apply
          :format="formatDate"
        />
      </div>
    </div>

    <div>
      <OrderTable :data="data?.data">
        <template #left-pagination>
          <Pagination
            v-if="data?.meta"
            v-model="page"
            :total="data?.meta.total"
            :per-page="data?.meta.per_page"
            :include-first-last="false"
          />
        </template>
        <template #right-pagination>
          <PageMetaHelper
            v-if="data?.meta"
            :page="page"
            :total="data?.meta.total"
            :perPage="data?.meta.per_page"
          />
        </template>
      </OrderTable>
    </div>
  </Container>
</template>

<style scoped></style>

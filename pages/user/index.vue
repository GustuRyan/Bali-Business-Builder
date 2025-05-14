<script setup lang="ts">
import { storeToRefs } from "pinia";

import {
  ResponseData,
  ProductOrders,
  GeneralResponse,
  ORDER_COUNT_USER,
} from "@/types";
const { $user } = useAuth();
import { useStepper } from "@vueuse/core";

const stateUserStore = useStateUser();

const { status, page } = storeToRefs(stateUserStore);

const { axiosRequest } = useAxios();

const { locale } = useI18n();

const loading = ref(false);

const data = ref<ResponseData<ProductOrders[]>>();

const countOrderUser = ref<ORDER_COUNT_USER>({
  total_failed: 0,
  total_unpaid: 0,
  total_review: 0,
  total_success: 0,
  total_rejected: 0,
  total_complete: 0,
});

const url = computed(() => {
  return `/users/${$user.value?.uuid}/orders?lang=${locale.value}&page=${page.value}&filter[status]=${status.value}`;
});

async function requestData() {
  loading.value = true;
  const { data: response }: { data: ResponseData<ProductOrders[]> } =
    await axiosRequest.get(url.value);
  if (response) {
    data.value = response;
  }

  loading.value = false;
}

async function getTotalOrderList() {
  const { data: response }: { data: GeneralResponse<ORDER_COUNT_USER> } =
    await axiosRequest.get(
      `/users/${$user.value?.uuid}/total-orders?lang=${locale.value}`
    );
  if (response?.data) {
    countOrderUser.value = response.data;
  }
}

const stepper = useStepper({
  unpaid: {
    isValid: () => true,
  },
  "review-process": {
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
  completed: {
    isValid: () => true,
  },
});

watch(
  () => page.value,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      requestData();
    }
  }
);

function stepperGoTo(
  name:
    | "unpaid"
    | "review-process"
    | "success"
    | "rejected"
    | "completed"
    | "failed"
) {
  if (name === "completed") {
    status.value = "done";
  } else if (name === "rejected") {
    status.value = "declined,cancelled";
  } else if (name === "review-process") {
    status.value = "waiting_for_confirmation";
  } else if (name === "unpaid") {
    status.value = "waiting_for_payment";
  } else if (name === "failed") {
    status.value = "failed";
  } else if (name === "success") {
    status.value = "order_processed";
  }
  page.value = 1;
  stepper.goTo(name);
  requestData();
}

function statusChangeUpdateStepper() {
  if (status.value === "done") {
    stepper.goTo("completed");
  } else if (status.value === "declined,cancelled") {
    stepper.goTo("rejected");
  } else if (status.value === "waiting_for_confirmation") {
    stepper.goTo("review-process");
  } else if (status.value === "waiting_for_payment") {
    stepper.goTo("unpaid");
  } else if (status.value === "failed") {
    stepper.goTo("failed");
  } else if (status.value === "order_processed") {
    stepper.goTo("success");
  }
  page.value = 1;
}

onMounted(() => {
  statusChangeUpdateStepper();
  getTotalOrderList();
  requestData();
});

definePageMeta({
  layout: "user",
  // @ts-ignore
  middleware: ["auth", "user"],
});

useHead({
  title: "My Visa",
});
</script>
<template>
  <Container class="py-16 space-y-8">
    <div class="tabs tabs-boxed max-w-5xl">
      <button
        class="tab"
        type="button"
        @click="stepperGoTo('unpaid')"
        :class="{ 'bg-white': stepper.isCurrent('unpaid') }"
      >
        <div class="flex items-center space-x-2">
          <img src="/on-process.png" class="h-6 w-6" />
          <span> Unpaid ({{ countOrderUser?.total_unpaid }}) </span>
        </div>
      </button>
      <button
        class="tab"
        type="button"
        @click="stepperGoTo('review-process')"
        :class="{ 'bg-white': stepper.isCurrent('review-process') }"
      >
        <div class="flex items-center space-x-2">
          <img src="/on-process.png" class="h-6 w-6" />
          <span> Review Process ({{ countOrderUser?.total_review }}) </span>
        </div>
      </button>
      <button
        class="tab"
        type="button"
        @click="stepperGoTo('success')"
        :class="{ 'bg-white': stepper.isCurrent('success') }"
      >
        <div class="flex items-center space-x-2">
          <img src="/on-success.png" class="h-6 w-6" />
          <span>Confirmed ({{ countOrderUser?.total_success }}) </span>
        </div>
      </button>
      <button
        class="tab"
        type="button"
        @click="stepperGoTo('rejected')"
        :class="{ 'bg-white': stepper.isCurrent('rejected') }"
      >
        <div class="flex items-center space-x-2">
          <img src="/on-rejected.png" class="h-6 w-6" />
          <span> Rejected/Decline ({{ countOrderUser?.total_rejected }}) </span>
        </div>
      </button>
      <button
        class="tab"
        type="button"
        @click="stepperGoTo('failed')"
        :class="{ 'bg-white': stepper.isCurrent('failed') }"
      >
        <div class="flex items-center space-x-2">
          <img src="/on-rejected.png" class="h-6 w-6" />
          <span> Failed ({{ countOrderUser?.total_failed }}) </span>
        </div>
      </button>
      <button
        class="tab"
        type="button"
        @click="stepperGoTo('completed')"
        :class="{ 'bg-white': stepper.isCurrent('completed') }"
      >
        <div class="flex items-center space-x-2">
          <img src="/on-completed.png" class="h-6 w-6" />
          <span> Completed ({{ countOrderUser?.total_complete }}) </span>
        </div>
      </button>
    </div>

    <div>
      <div v-if="stepper.isCurrent('unpaid')" class="space-y-4">
        <div class="flex flex-row space-x-2 items-center">
          <div class="h-10 w-10">
            <img src="/on-process.png" class="h-full w-full object-contain" />
          </div>
          <div class="flex flex-col">
            <span class="font-semibold text-2xl"
              >({{ countOrderUser?.total_unpaid }}) Unpaid
            </span>
            <span class="opacity-50">
              {{ $t("user_unpaid_status_msg") }}
            </span>
          </div>
        </div>
      </div>
      <div v-if="stepper.isCurrent('review-process')" class="space-y-4">
        <div class="flex flex-row space-x-2 items-center">
          <div class="h-10 w-10">
            <img src="/on-process.png" class="h-full w-full object-contain" />
          </div>
          <div class="flex flex-col">
            <span class="font-semibold text-2xl"
              >({{ countOrderUser?.total_review }}) Review Process
            </span>
            <span class="opacity-50">
              {{ $t("user_review_process_msg") }}
            </span>
          </div>
        </div>
      </div>
      <div v-if="stepper.isCurrent('success')" class="space-y-4">
        <div class="flex flex-row space-x-2 items-center">
          <div class="h-10 w-10">
            <img src="/on-success.png" class="h-full w-full object-contain" />
          </div>
          <div class="flex flex-col">
            <span class="font-semibold text-2xl"
              >({{ countOrderUser?.total_success }}) Confirmed
            </span>
            <span class="opacity-50">
              {{ $t("user_sucess_status_msg") }}
            </span>
          </div>
        </div>
      </div>
      <div v-if="stepper.isCurrent('rejected')" class="space-y-4">
        <div class="flex flex-row space-x-2 items-center">
          <div class="h-10 w-10">
            <img src="/on-rejected.png" class="h-full w-full object-contain" />
          </div>
          <div class="flex flex-col">
            <span class="font-semibold text-2xl"
              >({{ countOrderUser?.total_rejected }}) Rejected/Decline
            </span>
            <span class="opacity-50">
              {{ $t("user_rejected_status_msg") }}
            </span>
          </div>
        </div>
      </div>

      <div v-if="stepper.isCurrent('failed')" class="space-y-4">
        <div class="flex flex-row space-x-2 items-center">
          <div class="h-10 w-10">
            <img src="/on-rejected.png" class="h-full w-full object-contain" />
          </div>
          <div class="flex flex-col">
            <span class="font-semibold text-2xl"
              >({{ countOrderUser?.total_failed }}) Failed</span
            >
            <span class="opacity-50">
              Failed indicates that the order did not paid
            </span>
          </div>
        </div>
      </div>
      <div v-if="stepper.isCurrent('completed')" class="space-y-4">
        <div class="flex flex-row space-x-2 items-center">
          <div>
            <img src="/on-completed.png" class="h-10 w-10 object-contain" />
          </div>
          <div class="flex flex-col">
            <span class="font-semibold text-2xl"
              >({{ countOrderUser?.total_complete }}) Completed
            </span>
            <span class="opacity-50">
              {{ $t("user_completed_status_msg") }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="loading">
      <span class="loading loading-spinner loading-xs"></span>
      <span class="loading loading-spinner loading-sm"></span>
      <span class="loading loading-spinner loading-md"></span>
      <span class="loading loading-spinner loading-lg"></span>
    </div>

    <div v-else>
      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-8 min-h-[200px]"
        v-if="data?.data.length"
      >
        <CardUserApplicationVisa
          v-for="(order, index) in data?.data"
          :key="index"
          :order="order"
        />
      </div>
      <div
        v-else
        class="w-full h-[200px] grid place-items-center items-center bg-gray-100 rounded-md"
      >
        <p>No data</p>
      </div>
    </div>

    <div>
      <Pagination
        v-if="data?.meta"
        v-model="page"
        :total="data?.meta.total"
        :per-page="data?.meta.per_page"
        :include-first-last="false"
      />
    </div>
  </Container>
</template>

<style scoped></style>

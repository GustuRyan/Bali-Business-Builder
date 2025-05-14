<script setup lang="ts">
definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});
const { loading } = useStateRequestHelper();
import { DASHBOARD_ADMIN, GeneralResponse } from "@/types";
const { axiosRequest } = useAxios();
const { formatCurrency } = useMoneyFormat();

const { locale } = useI18n();

const data = ref<DASHBOARD_ADMIN>({
  total_revenue: 0,
  total_order: 0,
  total_pending_order: 0,
  list_pending_order: [],
});

async function loadData() {
  loading.value = true;
  const { data: responData }: { data: GeneralResponse<DASHBOARD_ADMIN> } =
    await axiosRequest.get(`/admins/dashboard?lang=${locale.value}`);
  data.value = responData.data;

  loading.value = false;
}

onMounted(() => {
  loadData();
});
useHead({
  title: "Dashboard",
});
</script>
<template>
  <Container class="py-14 space-y-8">
    <div class="flex justify-between items-center">
      <div>
        <div class="text-xl md:text-3xl font-bold">
          {{ $t("welcome_admin_txt") }}
        </div>
        <div>{{ $t("admin_sub_desc_txt") }}</div>
      </div>
      <div></div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div class="card card-compact rounded-lg border shadow">
        <div class="card-body">
          <div class="flex justify-between items-center">
            <div class="font-medium font-['Inter']">
              {{ $t("total_revenue_txt") }}
            </div>
            <div class="avatar">
              <div class="h-8 md:h-12 rounded">
                <img src="/coin-icon.png" class="h-full w-full object-contain" alt="coin" />
              </div>
            </div>
          </div>
          <span class="text-2xl xl:text-4xl font-semibold font-['Inter']">
            {{ formatCurrency(data?.total_revenue) }}
          </span>
        </div>
      </div>
      <div class="card card-compact rounded-lg border shadow">
        <div class="card-body">
          <div class="flex justify-between items-center">
            <div class="font-medium font-['Inter']">
              {{ $t("total_order_txt") }}
            </div>
            <div class="avatar">
              <div class="h-8 md:h-12 rounded">
                <img src="/bookmark-icon.png" class="h-full w-full object-contain" alt="coin" />
              </div>
            </div>
          </div>
          <span class="text-2xl xl:text-4xl font-semibold font-['Inter']">
            {{ data?.total_order }}
          </span>
        </div>
      </div>
      <div class="card card-compact rounded-lg border col-span-2 md:col-span-1 shadow">
        <div class="card-body">
          <div class="flex justify-between items-center">
            <div class="font-medium font-['Inter']">
              {{ $t("pending_costumer_txt") }}
            </div>
            <div class="avatar">
              <div class="h-12 rounded">
                <img src="/envelope-timer-icon.png" class="h-full w-full object-contain" alt="coin" />
              </div>
            </div>
          </div>
          <span class="text-2xl xl:text-4xl font-semibold font-['Inter']">
            {{ data?.total_pending_order }}
          </span>
        </div>
      </div>
    </div>

    <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-2">
      <div>
        <div class="font-bold text-xl lg:text-2xl">
          {{ $t("dashboard_pending_customer_txt") }}
        </div>
        <div>{{ $t("admin_pending_process_to_review") }}</div>
      </div>
      <div>
        <NuxtLink to="/admin/orders" class="btn btn-neutral btn-sm rounded-full px-5">
          {{ $t("view_all_data_txt") }}
        </NuxtLink>
      </div>
    </div>
    <div>
      <OrderTable :data="data?.list_pending_order" />
    </div>
  </Container>
</template>

<style scoped></style>

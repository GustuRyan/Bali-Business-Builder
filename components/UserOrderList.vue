<script setup lang="ts">
import { useDateFormat, useTimeoutFn } from "@vueuse/core";
import { AuthUser } from "@/types";
const { loading } = useStateRequestHelper();
const { locale } = useI18n();

import { ResponseData, ProductOrders } from "@/types";

const props = defineProps({
  user: {
    type: Object as PropType<AuthUser>,
  },
});

const { axiosRequest } = useAxios();

const page = ref(1);

function formatDate(date: string[]) {
  const startDate = useDateFormat(date[0], "MMM,DD YYYY");
  const endDate = useDateFormat(date[1], "MMM,DD YYYY");
  return [startDate.value, endDate.value].join("-");
}

const { start: startRequest, stop: stopRequest } = useTimeoutFn(() => {
  loadData();
}, 1500);

const data = ref<ResponseData<ProductOrders[]>>();

async function loadData() {
  loading.value = true;
  const { data: order }: { data: ResponseData<ProductOrders[]> } =
    await axiosRequest.get(
      `/admins/users/${props.user?.uuid}/orders?page=${page.value}?lang=${locale.value}`
    );
  data.value = order;
  loading.value = false;
  stopRequest();
}

watch(
  () => page.value,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      startRequest();
    }
  }
);

onMounted(() => {
  stopRequest();
  startRequest();
});
</script>
<template>
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
  </OrderTable>
</template>

<style scoped></style>

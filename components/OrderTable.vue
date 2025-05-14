<script setup lang="ts">
import { ProductOrders } from "@/types";
import { PropType } from "nuxt/dist/app/compat/capi";
import { useDateFormat } from "@vueuse/core";
const { formatCurrency } = useMoneyFormat();

function tableFormatDate(date: string) {
  const dateT = useDateFormat(date, "DD MMM YYYY");
  return dateT.value;
}

const props = defineProps({
  data: {
    type: Array as PropType<ProductOrders[]>,
  },
});
</script>
<template>
  <div class="overflow-x-auto !py-2 border rounded-t-lg">
    <table class="table table-xs md:table-md w-full rounded-t-xl">
      <!-- head -->
      <thead class="h-12">
        <tr>
          <th v-for="(title, index) in [
            $t('transaction_number_txt'),
            $t('customer_info_txt'),
            $t('ordered_services_txt'),
            $t('total_txt'),
            $t('status_txt'),
            '',
          ]" :key="index" class="font-medium">
            {{ title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr class="odd:bg-gray-100 even:hover:bg-gray-100 transition-colors duration-300"
          v-for="(item, index) in props.data" :key="index">
          <td class="text-gray-500 text-sm font-normal !py-2">
            <div class="flex flex-col">
              <span> # {{ item.uuid }} </span>
              <span> {{ tableFormatDate(item.created_at) }} </span>
            </div>
          </td>
          <td class="text-gray-500 text-sm font-normal !py-2">
            <div class="flex flex-col" v-if="item.user">
              <span> {{ item.user.first_name }} {{ item.user.last_name }}</span>
              <span>{{ item.user.email }}</span>
            </div>
          </td>
          <td>
            <div class="flex flex-col">
              <span>
                {{ item.product_thumbnail.name }}
              </span>
              <span v-if="item.other_products > 0">
                +{{ item.other_products }} {{ $t("products_txt") }}
              </span>
            </div>
          </td>
          <td class="text-gray-500 text-sm font-normal !py-2">
            <div class="flex flex-col">
              <span class="badge bg-green-200/50 text-success">
                {{ $t("qty_txt") }}: {{ 1 + item.other_products }}
              </span>
              <span>
                {{ formatCurrency(item.grand_total_purchased) }}
              </span>
            </div>
          </td>
          <td class="text-gray-500 text-sm font-normal !py-2">
            <OrderStatus :status="item.status" />
          </td>
          <td class="text-gray-500 text-sm font-normal !py-2">
            <div>
              <NuxtLink no-prefetch :to="`/admin/orders/${item.uuid}`"
                class="btn btn-sm btn-ghost normal-case btn-square">
                <Icon name="i-heroicons-eye" />
              </NuxtLink>
            </div>
          </td>
        </tr>
        <!-- row 2 -->
      </tbody>
      <tfoot v-if="$slots['left-pagination']">
        <tr>
          <td colspan="5">
            <slot name="left-pagination"></slot>
          </td>
          <td>
            <slot name="right-pagination"></slot>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<style scoped></style>

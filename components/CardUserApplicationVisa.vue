<script setup lang="ts">
import { ProductOrders } from "@/types";
const { formatCurrency } = useMoneyFormat();
import { useDateFormat } from "@vueuse/core";

interface propsInterface {
  order: ProductOrders;
  isCompleted?: boolean;
  isRejected?: boolean;
}

const props = defineProps<propsInterface>();
const date = useDateFormat(props.order.created_at, "YYYY MMMM DD");
</script>
<template>
  <div
    class="card border rounded-lg card-compact hover:shadow-md transition-shadow duration-300"
  >
    <div class="card-body space-y-2">
      <span class="font-semibold text-lg">#{{ props.order.uuid }}</span>
      <div class="text-lg">
        {{ props.order.product_thumbnail.name }}
        {{
          props.order.other_products > 1
            ? "+" + props.order.other_products + " more"
            : ""
        }}
      </div>
      <div class="text-sm opacity-50">{{ date }}</div>
      <hr v-if="props.isCompleted" />
      <div class="text-sm flex flex-col" v-if="props.isCompleted">
        <span class="text-success">You’re visa completed</span>
        <span class="opacity-50">
          Please come to our office around 10 Aug - 15 Aug to get your visa
        </span>
      </div>
      <hr v-if="props.isRejected" />
      <div v-if="props.isRejected" class="text-sm flex flex-col">
        <span class="text-error">Rejected reason :</span>
        <span class="opacity-50">
          The document for passport that you sent to us not correct, please
          retry to upload again your document.
        </span>
      </div>
      <hr />
      <div class="flex justify-between">
        <div class="text-lg">{{ $t("total_transaction_txt") }}</div>
        <div class="font-semibold text-lg">
          {{ formatCurrency(props.order.grand_total_purchased) }}
        </div>
      </div>
      <NuxtLink
        :to="`/user/orders/${props.order.uuid}`"
        class="btn btn-neutral btn-block rounded-full btn-sm h-11"
      >
        {{ $t("view_application_txt") }}
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped></style>

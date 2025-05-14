<template>
  <div class="flex gap-1">
    <button type="button" class="btn btn-sm btn-ghost" title="Cancel Order">
      <Icon name="i-heroicons-x-mark" class="text-error" />
    </button>

    <button
      type="button"
      @click="goToDetail"
      class="btn btn-sm btn-ghost"
      title="Detail"
    >
      <Icon name="i-heroicons-eye" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ProductOrders } from "@/types";
const router = useRouter();
const props = defineProps<{ order: ProductOrders }>();

function goToDetail() {
  router.push(`/user/orders/${props.order.uuid}`);
}
</script>

<style></style>

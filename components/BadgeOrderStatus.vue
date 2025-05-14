<script lang="ts" setup>
const props = defineProps({
  status: {
    type: String,
  },
});

const statusBadge = computed(() => {
  if (props.status === "payment_success") {
    return {
      label: "Payment Success",
      classBadge: "badge-success",
    };
  } else if (props.status === "failed") {
    return {
      label: "Failed",
      classBadge: "badge-error",
    };
  } else if (props.status === "canceled") {
    return {
      label: "Canceled",
      classBadge: "badge-error",
    };
  } else if (props.status === "declined") {
    return {
      label: "Declained",
      classBadge: "badge-neutral",
    };
  } else if (props.status === "waiting_for_payment") {
    return {
      label: "Waiting for payment",
      classBadge: "badge-warning",
    };
  } else if (props.status === "order_processed") {
    return {
      label: "Order process",
      classBadge: "badge-info",
    };
  } else if (props.status === "waiting_for_confirmation") {
    return {
      label: "Waiting for Confirmation",
      classBadge: "badge-info",
    };
  }

  return {
    label: props.status,
    classBadge: "badge-neutral",
  };
});
</script>
<template>
  <div class="badge" :class="[statusBadge?.classBadge]">
    {{ statusBadge?.label }}
  </div>
</template>

<style></style>

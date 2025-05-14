<template>
  <div>
    <div
      v-if="props.status === 'rejected'"
      class="flex items-center space-x-2 bg-gray-100 w-fit hover:shadow-sm transition-all duration-300 p-2 rounded-lg"
    >
      <img src="/on-rejected.png" alt="rejected" class="h-6 w-6" />
      <span> Rejected </span>
    </div>
    <div
      v-else-if="props.status === 'completed'"
      class="flex items-center space-x-2 bg-gray-100 w-fit hover:shadow-sm transition-all duration-300 p-2 rounded-lg"
    >
      <img src="/on-completed.png" alt="rejected" class="h-6 w-6" />
      <span> Completed </span>
    </div>
    <div
      v-else-if="props.status === 'success'"
      class="flex items-center space-x-2 bg-gray-100 w-fit hover:shadow-sm transition-all duration-300 p-2 rounded-lg"
    >
      <img src="/on-success.png" alt="rejected" class="h-6 w-6" />
      <span> Success </span>
    </div>
    <div
      v-else-if="props.status === 'process'"
      class="flex items-center space-x-2 bg-gray-100 w-fit hover:shadow-sm transition-all duration-300 p-2 rounded-lg"
    >
      <img src="/on-process.png" alt="rejected" class="h-6 w-6" />
      <span> Process </span>
    </div>
    <div
      v-else-if="props.status === 'failed'"
      class="flex items-center space-x-2 bg-gray-100 w-fit hover:shadow-sm transition-all duration-300 p-2 rounded-lg"
    >
      <img src="/on-rejected.png" alt="rejected" class="h-6 w-6" />
      <span> Failed </span>
    </div>
    <div
      v-else-if="props.status === 'waiting_for_confirmation'"
      class="flex items-center space-x-2 bg-gray-100 w-fit hover:shadow-sm transition-all duration-300 p-2 rounded-lg"
    >
      <img src="/on-process.png" alt="rejected" class="h-6 w-6" />
      <span>Waiting for Confirm </span>
    </div>
    <div
      v-else-if="props.status === 'payment_success'"
      class="flex items-center space-x-2 bg-gray-100 w-fit hover:shadow-sm transition-all duration-300 p-2 rounded-lg"
    >
      <img src="/on-success.png" alt="rejected" class="h-6 w-6" />
      <span> Payment Success </span>
    </div>

    <div
      v-else-if="props.status === 'waiting_for_payment'"
      class="flex items-center space-x-2 bg-gray-100 w-fit hover:shadow-sm transition-all duration-300 p-2 rounded-lg"
    >
      <span> Waiting For Payment </span>
    </div>
    <div
      v-else-if="props.status === 'declined'"
      class="flex items-center space-x-2 bg-gray-100 w-fit hover:shadow-sm transition-all duration-300 p-2 rounded-lg"
    >
      <img src="/on-rejected.png" alt="rejected" class="h-6 w-6" />
      <span> Declined </span>
    </div>

    <div
      v-else-if="props.status === 'canceled'"
      class="flex items-center space-x-2 bg-gray-100 w-fit hover:shadow-sm transition-all duration-300 p-2 rounded-lg"
    >
      <img src="/on-rejected.png" alt="rejected" class="h-6 w-6" />
      <span> Canceled </span>
    </div>

    <div
      v-else-if="props.status === 'order_processed'"
      class="flex items-center space-x-2 bg-gray-100 w-fit hover:shadow-sm transition-all duration-300 p-2 rounded-lg"
    >
      <img src="/on-success.png" alt="Order process" class="h-6 w-6" />
      <span>Order Processed </span>
    </div>

    <div
      v-else-if="props.status === 'done'"
      class="flex items-center space-x-2 bg-gray-100 w-fit hover:shadow-sm transition-all duration-300 p-2 rounded-lg"
    >
      <img src="/on-completed.png" alt="rejected" class="h-6 w-6" />
      <span> Done </span>
    </div>

    <div
      v-else
      class="flex items-center space-x-2 bg-gray-100 w-fit hover:shadow-sm transition-all duration-300 p-2 rounded-lg"
    >
      <span> {{ props.status }} </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  status: {
    type: String,
  },
});
</script>

<style></style>

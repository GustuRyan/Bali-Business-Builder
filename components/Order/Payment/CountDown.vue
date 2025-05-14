<template>
  <div>
    <div
      v-if="!expired"
      class="bg-gradient-to-tr from-success to-green-900 p-2 rounded-lg text-white px-5"
    >
      <div class="flex justify-between items-center w-full">
        <div>
          <p>{{ $t("please_do_payment_for_your_order") }}</p>
          <p>
            {{ $t("payment_will_expired_in") }} :<strong>{{
              formatTime(remainingTime)
            }}</strong>
          </p>
        </div>
        <div>
          <button
            type="button"
            @click="openPayment"
            class="btn btn-xs h-11 normal-case text-white btn-success-custome px-5"
          >
            {{ $t("pay_now_txt") }}
          </button>
        </div>
      </div>
    </div>
    <div v-else class="alert alert-error text-white rounded-lg">
      <p>{{ $t("the_payment_has_expired_txt") }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { PaymentOrder } from "@/types";
const props = defineProps({
  expirationTime: {
    type: String,
    default: () => null,
  },
  payment: {
    type: Object as PropType<PaymentOrder>,
  },
  orderUuid: {
    type: String,
    required: true,
  },
});

const remainingTime = ref(0);
const expired = ref(false);
let timer: ReturnType<typeof setInterval>;

onMounted(() => {
  // Convert expirationTime prop to a Date object
  const expirationDate = new Date(props.expirationTime);
  // Update the countdown every second
  timer = setInterval(() => updateCountdown(expirationDate), 1000);
});

const updateCountdown = (expirationTime: Date) => {
  const currentTime = new Date();
  // @ts-ignore
  const timeDifference = expirationTime - currentTime;

  if (timeDifference <= 0) {
    clearInterval(timer);
    expired.value = true;
    remainingTime.value = 0;
  } else {
    remainingTime.value = timeDifference;
  }
};

const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  return `${hours}h ${minutes}m ${seconds}s`;
};

// Watch for changes in the expirationTime prop
watch(
  () => props.expirationTime,
  (newExpirationTime) => {
    const expirationDate = new Date(newExpirationTime);
    updateCountdown(expirationDate);
  }
);

function openPayment() {
  window.location.href = props.payment?.url as string;
}

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<style>
/* Add your styles here */
</style>

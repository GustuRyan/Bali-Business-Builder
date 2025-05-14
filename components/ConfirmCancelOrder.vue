<script lang="ts" setup>
const { loading, message, setErrorMessage, alertType } =
  useStateRequestHelper();
const snackbar = useSnackbar();
const { t: $t, locale } = useI18n();

const { $user } = useAuth();

import { useTimeoutFn } from "@vueuse/core";

const props = defineProps<{
  orderId: string;
}>();

const emit = defineEmits(["close", "reload"]);

const { start, stop } = useTimeoutFn(() => {
  reloadData();
}, 1000);

function closeModal() {
  emit("close");
}

const reason = ref();

async function cancelOrder() {
  loading.value = true;
  const { error } = await useCustomFetch(
    `/users/${$user.value?.uuid}/orders/${props.orderId}/cancel?lang=${locale.value}`,
    {
      method: "POST",
      body: {
        reason: reason.value,
      },
    }
  );
  if (error.value) {
    setErrorMessage(error.value?.data?.message);
  } else {
    await snackbar.clear();
    await snackbar.add({
      type: "success",
      text: $t("cancel_order_success_msg"),
      groupKey: new Date().toISOString(),
    });
    start();
  }

  loading.value = false;
}

function reloadData() {
  emit("reload");
}

onMounted(() => {
  stop();
});
</script>

<template>
  <div>
    <div class="card card-compact">
      <div class="card-body">
        <Alert v-model="message" :type="alertType" />
        <p>{{ $t("cancel_order_confirm_msg") }}</p>
        <h3 class="text-2xl font-medium">
          {{ props.orderId }}
        </h3>
      </div>

      <div class="card-actions flex justify-between items-center">
        <div>
          <button
            class="btn btn-sm h-11 normal-case"
            @click="closeModal"
            :disabled="loading"
            type="button"
          >
            {{ $t("cancel_txt") }}
          </button>
        </div>
        <div>
          <button
            type="button"
            :disabled="loading"
            @click="cancelOrder"
            class="btn btn-sm btn-error h-11 normal-case"
          >
            {{ $t("cancel_order_txt") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

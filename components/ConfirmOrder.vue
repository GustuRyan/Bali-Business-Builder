<script lang="ts" setup>
const { loading, message, setErrorMessage, alertType } =
  useStateRequestHelper();
const snackbar = useSnackbar();

const { t: $t, locale } = useI18n();

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
async function confirmOrder() {
  loading.value = true;
  const { error } = await useCustomFetch(
    `/admins/orders/${props.orderId}/confirm?lang=${locale.value}`,
    {
      method: "POST",
    }
  );
  if (error.value) {
    setErrorMessage(error.value?.data?.message);
  } else {
    await snackbar.clear();
    await snackbar.add({
      type: "success",
      text: $t("confirm_order_success_msg"),
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
        <p>{{ $t("confirm_order_confirm_msg") }}</p>
        <h3 class="text-2xl font-medium">
          {{ props.orderId }}
        </h3>
        <p>
          {{ $t("confirm_order_helper_txt") }}
        </p>
      </div>
      <div class="card-actions flex justify-between items-center">
        <div>
          <button
            class="btn btn-sm h-11 normal-case"
            @click="closeModal"
            :disabled="loading"
          >
            {{ $t("cancel_txt") }}
          </button>
        </div>
        <div>
          <button
            type="button"
            @click="confirmOrder"
            :disabled="loading"
            class="btn btn-sm btn-success h-11 normal-case"
          >
            {{ $t("confirm_order_txt") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

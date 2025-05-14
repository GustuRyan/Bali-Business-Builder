<script lang="ts" setup>
import { Promo } from "@/types";
const { loading, message, setErrorMessage, alertType } =
  useStateRequestHelper();
const snackbar = useSnackbar();

const { t: $t, locale } = useI18n();

import { useTimeoutFn } from "@vueuse/core";
const props = defineProps<{
  promo?: Promo;
}>();

const emit = defineEmits(["close", "reload"]);

const { start, stop } = useTimeoutFn(() => {
  reloadData();
}, 1000);

function closeModal() {
  emit("close");
}
async function deletePromo() {
  loading.value = true;
  const { error } = await useCustomFetch(
    `/admins/promos/${props.promo?.uuid}?lang=${locale.value}`,
    {
      method: "DELETE",
    }
  );
  if (error.value) {
    setErrorMessage(error.value?.data?.message);
  } else {
    await snackbar.clear();
    await snackbar.add({
      type: "success",
      text: $t("delete_promo_success_txt"),
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
        <p>{{ $t("promo_confirm_delete_msg") }}</p>
        <h3 class="text-2xl font-medium">
          {{ props.promo?.code }}
        </h3>
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
            @click="deletePromo"
            :disabled="loading"
            class="btn btn-sm btn-error h-11 normal-case"
          >
            {{ $t("delete_promo_txt") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

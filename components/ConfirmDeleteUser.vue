<script lang="ts" setup>
import { AuthUser } from "@/types";
const { loading, message, setErrorMessage, alertType } =
  useStateRequestHelper();

const snackbar = useSnackbar();

const { t: $t, locale } = useI18n();

import { useTimeoutFn } from "@vueuse/core";
const props = defineProps<{
  user?: AuthUser;
  isAdmin?: boolean;
}>();

const emit = defineEmits(["close", "reload"]);

const { start, stop } = useTimeoutFn(() => {
  reloadData();
}, 1000);

function closeModal() {
  emit("close");
}
async function deleteItem() {
  loading.value = true;
  const { error } = await useCustomFetch(
    `/admins/${props.user?.uuid}?lang=${locale.value}`,
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
      text: $t("delete_user_success_txt"),
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
        <p>{{ $t("user_delete_confirm_msg") }}</p>
        <h3 class="text-2xl font-medium">
          {{ props.user?.first_name }}
          {{ props.user?.last_name }}
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
            @click="deleteItem"
            :disabled="loading"
            class="btn btn-sm btn-error h-11 normal-case"
          >
            {{ $t("delete_user_txt") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

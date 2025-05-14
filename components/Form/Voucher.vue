<script lang="ts" setup>
const {
  message,
  loading,
  alertType,
  setErrorMessage,
  setSuccessMessage,
  transformErrors,
} = useStateRequestHelper();

const { ApplyPromoSchema } = useSchema();

const { t: $t, locale } = useI18n();

import { AuthUser, GeneralResponse, Promo } from "@/types";

const props = defineProps<{ user: AuthUser; promo?: Promo | undefined }>();

const emit = defineEmits(["update:promo"]);

const dataForm = ref({
  code: "",
  user_id: props.user.id,
});

watch(
  () => dataForm.value.code,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      emit("update:promo", undefined);
    }
  }
);

function resetForm() {
  dataForm.value.code = "";
  dataForm.value.user_id = props.user.id;
}

async function submit(values: any, ctx: any) {
  const { data, error } = await useCustomFetch<GeneralResponse<Promo>>(
    `/apply-promo?lang=${locale.value}`,
    {
      method: "POST",
      body: { ...dataForm.value },
    }
  );

  if (error.value) {
    setErrorMessage(error.value?.data?.message);
    ctx.setErrors(transformErrors(error.value?.data));
    emit("update:promo", undefined);
  } else {
    console.log(data.value?.data);
    emit("update:promo", data.value?.data);
    setSuccessMessage($t("applied_promo_success_txt"));
  }
}

const messageProductSaveMoney = computed(() => {
  if (props.promo) {
    return $t("applied_promo_saving_txt", { promoCode: props.promo?.code });
  }
  return null;
});

onMounted(() => {
  resetForm();
});
</script>
<template>
  <VeeForm @submit="submit" :validation-schema="ApplyPromoSchema">
    <div class="space-y-2">
      <FormGroup name="voucher" :label="$t('voucher_code_txt')">
        <div class="hidden">
          <VeeField name="code" v-model="dataForm.code" />
        </div>
        <div class="join border w-full">
          <div class="p-2 join-item">
            <Icon name="i-heroicons-ticket" class="h-6 w-6 join-item" />
          </div>

          <input
            placeholder="xoxox"
            class="input join-item w-full input-sm h-11"
            aria-label="voucher code"
            :disabled="loading"
            v-model="dataForm.code"
          />
          <button
            :disabled="loading"
            type="submit"
            class="btn btn-ghost join-item btn-sm h-11"
          >
            <Icon name="i-heroicons-arrow-right" class="h-6 w-6" />
          </button>
        </div>
        <VeeErrorMessage name="code" class="text-error" />
      </FormGroup>
      <Alert v-model="message" :type="alertType" />
      <div v-if="messageProductSaveMoney" class="text-success p-2">
        {{ messageProductSaveMoney }}
      </div>
    </div>
  </VeeForm>
</template>

<style></style>

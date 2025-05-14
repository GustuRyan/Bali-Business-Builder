<script setup lang="ts">
const {
  transformErrors,
  loading,
  message,
  alertType,
  setErrorMessage,
  setSuccessMessage,
} = useStateRequestHelper();

const { t: $t, locale } = useI18n();

const state = ref({
  password: "",
  confirm_password: "",
});

import { AuthUser } from "@/types";
const { renewPasswordSchema } = useSchema();

const props = defineProps({
  user: {
    type: Object as PropType<AuthUser>,
  },
});

const emit = defineEmits(["reload"]);

async function submit(values: any, ctx: any) {
  loading.value = true;

  const { data, error } = await useCustomFetch<{ data: { message: string } }>(
    `admins/users/${props.user?.uuid}/change-password?lang=${locale.value}`,
    {
      method: "POST",
      body: { ...state.value },
    }
  );

  if (error.value) {
    setErrorMessage(error.value?.data?.message);
    ctx.setErrors(transformErrors(error.value?.data));
  } else {
    setSuccessMessage(
      data.value?.data?.message ?? $t("set_password_success_txt")
    );
    ctx.resetForm();
    emit("reload");
  }
  loading.value = false;
}
</script>
<template>
  <div>
    <VeeForm @submit="submit" :validation-schema="renewPasswordSchema">
      <div class="space-y-2">
        <Alert :type="alertType" v-model="message" />
        <FormGroup :label="$t('password_txt')" name="password">
          <FormSpInput
            v-model="state.password"
            type="password"
            name="password"
            placeholder="eg: *******"
            class="input-bordered input-sm h-11 w-full"
          />
        </FormGroup>
        <FormGroup :label="$t('confirm_password_txt')" name="confirm_password">
          <FormSpInput
            v-model="state.confirm_password"
            type="password"
            name="confirm_password"
            placeholder="eg: *******"
            class="input-bordered input-sm h-11 w-full"
          />
        </FormGroup>
        <div class="pt-2">
          <button
            type="submit"
            class="btn btn-block btn-success-custome rounded-full normal-case text-white"
            :disabled="loading"
          >
            {{ $t("update_txt") }}
          </button>
        </div>
      </div>
    </VeeForm>
  </div>
</template>

<style scoped></style>

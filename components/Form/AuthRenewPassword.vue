<script setup lang="ts">
const { AuthRenewPasswordSchema } = useSchema();
const { $isAdmin } = useAuth();
const { t: $t, locale } = useI18n();
const {
  loading,
  message,
  alertType,
  setErrorMessage,
  setSuccessMessage,
  transformErrors,
} = useStateRequestHelper();

const updateUrl = computed(() => {
  if ($isAdmin.value) {
    return "/admins/change-password?lang=" + locale.value;
  }
  return "/users/change-password?lang=" + locale.value;
});

const state = reactive({
  old_password: undefined,
  password: undefined,
  confirm_password: undefined,
});

async function submit(values: any, ctx: any) {
  loading.value = true;
  const { error } = await useCustomFetch(updateUrl.value, {
    method: "POST",
    body: { ...state },
  });
  if (error.value) {
    setErrorMessage(error.value?.data?.message);
    ctx.setErrors(transformErrors(error.value?.data));
  } else {
    setSuccessMessage($t("password_updated_msg"));
    ctx.resetForm();
  }
  loading.value = false;
}
</script>

<template>
  <div class="min-w-[370px]">
    <VeeForm @submit="submit" :validation-schema="AuthRenewPasswordSchema">
      <div class="card">
        <div class="space-y-4 card-body p-6">
          <div>
            <h3 class="text-xl font-semibold">
              {{ $t("renew_password_txt") }}
            </h3>
          </div>

          <Alert :type="alertType" v-model="message" />

          <FormGroup :label="$t('old_password_txt')" name="old_password">
            <FormSpInput
              v-model="state.old_password"
              placeholder="eq: "
              name="old_password"
              type="password"
              class="input-bordered input-sm h-11 w-full"
            />
          </FormGroup>
          <FormGroup :label="$t('password_txt')" name="password">
            <FormSpInput
              v-model="state.password"
              placeholder="eq: "
              name="password"
              type="password"
              class="input-bordered input-sm h-11 w-full"
            />
          </FormGroup>
          <FormGroup
            :label="$t('confirm_password_txt')"
            name="confirm_password"
          >
            <FormSpInput
              v-model="state.confirm_password"
              placeholder="eq: *********"
              type="password"
              name="confirm_password"
              class="input-bordered input-sm h-11 w-full"
            />
          </FormGroup>

          <div class="flex flex-row justify-between items-center">
            <div>
              <button
                type="submit"
                :disabled="loading"
                class="btn btn-neutral btn-md"
              >
                {{ $t("submit_txt") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </VeeForm>
  </div>
</template>

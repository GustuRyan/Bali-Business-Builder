<script setup lang="ts">
const { forgotPasswordSchema } = useSchema();
const router = useRouter();
const { t: $t, locale } = useI18n();

const {
  loading,
  message,
  transformErrors,
  alertType,
  setSuccessMessage,
  setErrorMessage,
} = useStateRequestHelper();

const state = reactive({
  email: undefined,
});

async function submit(values: any, ctx: any) {
  loading.value = true;
  const { data, error } = await useCustomFetch<{ data: { message: string } }>(
    "/admins/forget-password?lang=" + locale.value,
    {
      method: "POST",
      body: { ...state },
    }
  );

  if (error.value) {
    setErrorMessage(error.value?.data?.message);
    ctx.setErrors(transformErrors(error.value?.data));
  } else {
    setSuccessMessage(
      data.value?.data?.message ?? $t("requuest_success_and_check_email_txt")
    );
    router.push(`/admin/forgot-password-verification?email=${state.email}`);
  }
  loading.value = false;
}
definePageMeta({
  // @ts-ignore
  middleware: "guest",
});

useHead({
  title: "Forgot Password",
});
</script>

<template>
  <div>
    <Container>
      <HeroSection>
        <div class="min-w-[370px]">
          <VeeForm @submit="submit" :validation-schema="forgotPasswordSchema">
            <div class="card">
              <div class="space-y-4 card-body">
                <div>
                  <h3 class="text-xl font-semibold text-slate-600">
                    {{ $t("forgot_password_txt") }}
                  </h3>
                </div>
                <Alert v-model="message" :type="alertType" />
                <FormGroup :label="$t('email_txt')" name="email">
                  <FormSpInput
                    v-model="state.email"
                    name="email"
                    class="input-bordered w-full"
                    placeholder="eq: jhondoe@example.com"
                  />
                </FormGroup>

                <div>
                  <button
                    type="submit"
                    class="btn btn-neutral rounded-full btn-block normal-case"
                    :disabled="loading"
                  >
                    {{ $t("submit_txt") }}
                  </button>
                </div>
              </div>
            </div>
          </VeeForm>
        </div>
      </HeroSection>
    </Container>
  </div>
</template>

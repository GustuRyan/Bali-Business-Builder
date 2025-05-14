<script setup lang="ts">
const { registerSchema } = useSchema();
import { useTimeoutFn } from "@vueuse/core";
const { locale, t: $t } = useI18n();
const {
  transformErrors,
  loading,
  message,
  alertType,
  setErrorMessage,
  setSuccessMessage,
} = useStateRequestHelper();

const state = reactive({
  email: undefined,
  first_name: undefined,
  last_name: undefined,
  password: undefined,
  confirm_password: undefined,
});

const showRecentEmail = ref(false);

const resendEmail = reactive({
  email: undefined,
});

const { start, stop } = useTimeoutFn(() => {
  showRecentEmail.value = true;
}, 5000);

async function resendEmailVerification() {
  loading.value = true;
  stop();
  // TODO: should have resent otp
  const { data, error } = await useCustomFetch<{ data: { message: string } }>(
    "/users/resend-email-verification?lang=" + locale.value,
    {
      method: "POST",
      body: { ...resendEmail },
    }
  );

  if (error.value) {
    setErrorMessage(error.value?.data?.message);
  } else {
    setSuccessMessage(
      data.value?.data?.message ?? $t("requuest_success_and_check_email_txt")
    );
  }
  start();
  loading.value = false;
}

async function submit(values: any, ctx: any) {
  loading.value = true;
  resendEmail.email = state.email;
  const { data, error } = await useCustomFetch<{ data: { message: string } }>(
    "/users/register?lang=" + locale.value,
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
    ctx.resetForm();
    start();
  }
  loading.value = false;
}

useHead({
  title: "Sign Up",
});

definePageMeta({
  // @ts-ignore
  middleware: "guest",
  layout: false,
});
</script>

<template>
  <div>
    <AuthSection>
      <div
        class="flex flex-grow justify-center lg:justify-normal items-center top-1/4 lg:top-1/2 left-0 py-10"
      >
        <VeeForm :validation-schema="registerSchema" @submit="submit">
          <div class="max-w-md min-w-[400px] p-4 rounded-lg backdrop-blur">
            <div>
              <div class="mb-5">
                <NuxtLink
                  to="/"
                  class="text-xl inline-flex font-semibold items-center"
                >
                  <Icon name="i-heroicons-arrow-left-20-solid" />
                  {{ $t("setup_account_txt") }}
                </NuxtLink>
                <p class="text-gray-500/50">
                  {{ $t("setup_account_desc_txt") }}
                </p>
              </div>

              <Alert :type="alertType" v-model="message" />

              <FormGroup :label="$t('email_txt')" name="email">
                <FormSpInput
                  v-model="state.email"
                  name="email"
                  placeholder="eg: jhondoe@gmail.com"
                  class="input-bordered input-sm h-11 w-full"
                />
              </FormGroup>

              <FormGroup :label="$t('first_name_txt')" name="first_name">
                <FormSpInput
                  v-model="state.first_name"
                  name="first_name"
                  placeholder="eg: jhond"
                  class="input-bordered input-sm h-11 w-full"
                />
              </FormGroup>
              <FormGroup :label="$t('last_name_txt')" name="last_name">
                <FormSpInput
                  v-model="state.last_name"
                  name="last_name"
                  placeholder="eg: jhond"
                  class="input-bordered input-sm h-11 w-full"
                />
              </FormGroup>

              <FormGroup label="Password" name="password">
                <FormSpInput
                  v-model="state.password"
                  type="password"
                  name="password"
                  placeholder="eg: *******"
                  class="input-bordered input-sm h-11 w-full"
                />
              </FormGroup>
              <FormGroup label="Password confirmation" name="confirm_password">
                <FormSpInput
                  v-model="state.confirm_password"
                  type="password"
                  name="confirm_password"
                  placeholder="eg: *******"
                  class="input-bordered input-sm h-11 w-full"
                />
              </FormGroup>

              <div class="mt-5" v-if="!showRecentEmail">
                <button
                  type="submit"
                  class="btn btn-block btn-neutral rounded-lg"
                  :disabled="loading"
                >
                  {{ $t("submit_txt") }}
                </button>
              </div>
              <div v-if="showRecentEmail">
                <p>{{ $t("did_not_receive_email_txt") }}</p>
                <button
                  type="button"
                  class="btn btn-block btn-neutral rounded-lg"
                  :disabled="loading"
                  @click="resendEmailVerification"
                >
                  {{ $t("resend_email_txt") }}
                </button>
              </div>
              <div class="mt-4">
                <p class="text-sm">
                  {{ $t("already_have_an_account_txt") }}
                  <nuxt-link to="/sign-in" class="font-bold">{{
                    $t("sign_in_txt")
                  }}</nuxt-link>
                </p>
              </div>
            </div>
          </div>
        </VeeForm>
      </div>
    </AuthSection>
  </div>
</template>

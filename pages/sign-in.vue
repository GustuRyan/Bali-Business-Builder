<script setup lang="ts">
const { locale } = useI18n();

definePageMeta({
  // @ts-ignore
  middleware: "guest",
  layout: false,
});

const { loginSchema } = useSchema();

import { Role, Provider } from "@/types";
const { $setCredential } = useNuxtApp();
const { loading, message, alertType, setErrorMessage, transformErrors } =
  useStateRequestHelper();

const state = reactive({
  email: undefined,
  password: undefined,
});

async function submit(values: any, ctx: any) {
  loading.value = true;

  const { data, error } = await useCustomFetch<{ token: string }>(
    "/users/login?lang=" + locale.value,
    {
      method: "post",
      body: { ...state },
    }
  );

  if (error.value) {
    setErrorMessage(error.value?.data?.message);
    ctx.setErrors(transformErrors(error.value?.data));
  } else {
    $setCredential({
      token: data?.value?.token as string,
      role: Role.USER,
      provider: Provider.LOCAL,
    });
    window.location.replace("/user");
  }

  loading.value = false;
}

useHead({
  title: "Sign In",
});
</script>

<template>
  <div>
    <AuthSection>
      <div
        class="flex flex-grow justify-center lg:justify-normal items-center top-1/4 lg:top-1/2 left-0 py-28 lg:py-48"
      >
        <VeeForm @submit="submit" :validation-schema="loginSchema">
          <div class="max-w-md min-w-[400px] p-2 rounded-lg backdrop-blur">
            <div>
              <div>
                <NuxtLink
                  to="/"
                  class="text-xl inline-flex font-semibold items-center"
                >
                  <Icon name="i-heroicons-arrow-left-20-solid" />
                  {{ $t("login_txt") }}
                </NuxtLink>
                <p class="text-gray-500/50">
                  {{ $t("sign_in_welcome_msg") }}
                </p>
              </div>

              <Alert :type="alertType" v-model="message" />

              <FormGroup :label="$t('email_txt')" name="email">
                <FormSpInput
                  name="email"
                  v-model="state.email"
                  class="input-bordered input-sm h-11 w-full"
                  placeholder="eg: jhondoe@example.com"
                />
              </FormGroup>

              <FormGroup :label="$t('password_txt')" name="password">
                <FormSpInput
                  v-model="state.password"
                  type="password"
                  name="password"
                  class="input-bordered input-sm h-11 w-full"
                  placeholder="******"
                />
              </FormGroup>
              <div class="my-3">
                <p class="text-sm">
                  {{ $t("forgot_your_password_txt") }}
                  <NuxtLink to="/forgot-password">{{
                    $t("here_txt")
                  }}</NuxtLink>
                </p>
              </div>

              <button
                type="submit"
                :disabled="loading"
                class="btn btn-neutral btn-block"
              >
                {{ $t("submit_txt") }}
              </button>

              <div class="mt-4">
                <p class="text-sm text-center">
                  {{ $t("dont_have_an_account_txt") }}
                  <nuxt-link to="/sign-up" class="font-bold">
                    {{ $t("sign_up_txt") }}
                  </nuxt-link>
                </p>
              </div>
            </div>
          </div>
        </VeeForm>
      </div>
    </AuthSection>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  // @ts-ignore
  middleware: "guest",
  layout: false,
});

const { loginSchema } = useSchema();

const { locale } = useI18n();

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
    "/admins/login?lang=" + locale.value,
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
      role: Role.ADMIN,
      provider: Provider.LOCAL,
    });

    window.location.replace("/admin");
  }

  loading.value = false;
}

useHead({
  title: "Login Admin",
});
</script>

<template>
  <div>
    <div class="relative">
      <div class="absolute h-full w-full z-50">
        <div class="grid place-items-center min-w-[400px]">
          <div
            class="flex flex-grow justify-center lg:justify-normal items-center top-1/4 lg:top-1/2 left-0 py-28 lg:py-48"
          >
            <VeeForm @submit="submit" :validation-schema="loginSchema">
              <div class="max-w-md min-w-[400px] rounded-lg bg-white p-4">
                <div class="space-y-6">
                  <div class="text-center space-y-8 flex flex-col">
                    <div>
                      <img
                        alt="logo"
                        src="/logo-bali-visum-blue.png"
                        class="mx-auto"
                      />
                    </div>

                    <span class="text-4xl font-medium">
                      Welcome back, Administrator
                    </span>
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

                  <FormGroup label="Password" name="password">
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
                      Forgot your password ?
                      <NuxtLink to="/admin/forgot-password">here</NuxtLink>
                    </p>
                  </div>
                  <div>
                    <button
                      type="submit"
                      :disabled="loading"
                      class="btn btn-neutral btn-block"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </VeeForm>
          </div>
        </div>
      </div>
      <NuxtImg
        src="/auth-admin-hero.png"
        class="w-full h-full lg:min-h-full object-cover pointer-events-none isolate"
        alt="hero-background"
        loading="lazy"
        densities="x1 x2"
        format="webp"
      />
    </div>
  </div>
</template>

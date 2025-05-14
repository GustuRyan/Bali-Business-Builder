<script setup lang="ts">
const { otpSchema } = useSchema();
const {
  loading,
  message,
  alertType,
  setErrorMessage,
  setSuccessMessage,
  transformErrors,
} = useStateRequestHelper();

const { t: $t, locale } = useI18n();

const state = reactive({
  email: "",
  pin: "",
});

const props = defineProps({
  email: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: () => false,
  },
});

watch(
  () => props.email,
  (value) => {
    state.email = value as string;
  }
);

const showResentEmailButton = ref<boolean>(false);
const emit = defineEmits(["onCompleteOtp", "resendEmail"]);

function setShowResendEmailButton() {
  setInterval(() => {
    showResentEmailButton.value = true;
  }, 5000);
}

const resentEmailURl = computed(() => {
  if (props.isAdmin) {
    return "/admins/forget-password?lang=" + locale.value;
  }
  return "/users/forget-password?lang=" + locale.value;
});

async function resendEmail() {
  loading.value = true;
  // TODO: should have resent otp
  const { data, error } = await useCustomFetch<{ data: { message: string } }>(
    resentEmailURl.value,
    {
      method: "POST",
      body: { ...state },
    }
  );

  if (error.value) {
    setErrorMessage(error.value?.data?.message);
  } else {
    setSuccessMessage(
      data.value?.data?.message ?? $t("requuest_success_and_check_email_txt")
    );
    emit("resendEmail");
  }
  loading.value = false;
}

const verifyPinUrl = computed(() => {
  if (props.isAdmin) {
    return "/admins/forget-password/verify-pin?lang=" + locale.value;
  }
  return "/users/forget-password/verify-pin?lang=" + locale.value;
});

async function submit(values: any, ctx: any) {
  loading.value = true;

  const { data, error } = await useCustomFetch<{ data: { message: string } }>(
    verifyPinUrl.value,
    {
      method: "POST",
      body: { ...state },
    }
  );

  if (error.value) {
    setErrorMessage(error.value?.data?.message);
    ctx.setErrors(transformErrors(error.value?.data));
  } else {
    emit("onCompleteOtp", { ...state });
  }
  loading.value = false;
}

onMounted(() => {
  setShowResendEmailButton();
});
</script>

<template>
  <div class="min-w-[370px]">
    <VeeForm @submit="submit" :validation-schema="otpSchema">
      <div class="card">
        <div class="space-y-4 card-body">
          <Alert :type="alertType" v-model="message" />
          <div>
            <h3 class="text-xl font-semibold text-slate-600">
              {{ $t("forgot_password_txt") }}
            </h3>
          </div>
          <FormGroup label="OTP" name="pin">
            <FormOTPInput name="pin" v-model="state.pin" />
          </FormGroup>
          <div class="hidden">
            <VeeField name="pin" v-model="state.pin" />
          </div>

          <div class="flex flex-row justify-between items-center">
            <button
              type="submit"
              class="btn btn-neutral btn-block rounded-full"
              :disabled="loading"
            >
              {{ $t("submit_txt") }}
            </button>
          </div>
          <div v-if="showResentEmailButton">
            <p>
              {{ $t("did_you_receive_email_txt") }}
              <button
                class="btn btn-ghost"
                :disabled="loading"
                type="button"
                @click="resendEmail"
              >
                {{ $t("resend_txt") }}
              </button>
            </p>
          </div>
          <div>
            <slot />
          </div>
        </div>
      </div>
    </VeeForm>
  </div>
</template>

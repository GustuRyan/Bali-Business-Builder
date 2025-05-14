<script setup lang="ts">
const route = useRoute();
const showOTP = ref(true);

const credentials = reactive({
  email: "",
  pin: "",
});

const { secondTime, showPinEmailExpired, countdown } = useCountDownOTP();

function onCompleteOTP(item: { email: string; pin: string }) {
  credentials.email = item.email;
  credentials.pin = item.pin;
  showOTP.value = false;
}

const email = computed(() => {
  return route.query?.email ?? "";
});

function resendEmail() {
  showPinEmailExpired.value = false;
  secondTime.value = 60;
  countdown();
}

onMounted(() => {
  if (email.value) {
    credentials.email = email.value as string;
    countdown();
  }
});
definePageMeta({
  // @ts-ignore
  middleware: "guest",
});

useHead({
  title: "OTP Verification",
});
</script>

<template>
  <div>
    <Container>
      <HeroSection>
        <div v-if="showOTP">
          <FormOTPForm
            :email="credentials.email"
            @on-complete-otp="onCompleteOTP"
            @resend-email="resendEmail"
          >
            <div v-if="secondTime > 0" class="text-center text-info text-sm">
              We have sent an OTP to your email.<br />
              Your OTP will expired in {{ secondTime }} seconds
            </div>

            <div
              class="text-error text-center text-sm"
              v-if="showPinEmailExpired"
            >
              Your OTP has expired. Please request a new one
            </div>
          </FormOTPForm>
        </div>

        <FormRenewPassword v-else v-bind="credentials" />
      </HeroSection>
    </Container>
  </div>
</template>

<script setup lang="ts">
import { useStepper } from "@vueuse/core";
const { $isAdmin } = useAuth();
const router = useRouter();
const { stepForm, openForm } = useHelperNonLogin();

const store = useFormStore();

const { t: $t } = useI18n();

const stepper = useStepper({
  "order-infomation": {
    title: $t("form_step_1_title_txt"),
    description: $t("form_step_1_desc_txt"),
    isValid: () => openForm.value.validSelectedServices,
  },
  indenties: {
    title: $t("form_step_2_title_txt"),
    decription: $t("form_step_2_desc_txt"),
    isValid: () => openForm.value.validSelectedIdentity,
  },
  "confirm-order": {
    title: $t("form_step_3_title_txt"),
    description: $t("form_step_3_desc_txt"),
    isValid: () => openForm.value.validConfirmOrder,
  },
  payment: {
    title: $t("form_step_4_title_txt"),
    description: $t("form_step_4_desc_txt"),
    isValid: () => openForm.value.validConfirmPayment,
  },
});

function allStepsBeforeAreValid(index: number): boolean {
  return !Array(index)
    .fill(null)
    .some((_, i) => !stepper.at(i)?.isValid());
}

function completedSelectedService() {
  stepForm.value.validSelectedServices = true;
  openForm.value.validSelectedServices = true;
  stepForm.value.validSelectedIdentity = true;
  stepper.goTo("indenties");
}
function completedPasswordEquipment() {
  stepForm.value.validSelectedIdentity = true;
  openForm.value.validSelectedIdentity = true;
  stepForm.value.validConfirmOrder = true;
  stepper.goTo("confirm-order");
}
function completedPayment() {
  stepForm.value.validConfirmOrder = true;
  openForm.value.validSelectedIdentity = false;
  openForm.value.validSelectedServices = false;
  openForm.value.validConfirmOrder = false;

  stepper.goTo("payment");
}

function resetStep() {
  stepForm.value.validConfirmPayment = true;
  stepForm.value.validSelectedIdentity = false;
  stepForm.value.validConfirmOrder = false;
  stepForm.value.validConfirmPayment = false;
  openForm.value.validSelectedIdentity = false;
  openForm.value.validSelectedServices = false;
  openForm.value.validConfirmOrder = false;
  openForm.value.validConfirmPayment = false;
  stepper.goTo("order-infomation");
}

function gotoSpecificStep(
  name: "order-infomation" | "indenties" | "confirm-order" | "payment"
) {
  stepper.goTo(name);
}

onMounted(() => {
  resetStep();
  if ($isAdmin.value) {
    router.push("/");
  }

  store.clearFormPersons();
});

definePageMeta({
  middleware: ["not-admin"],
});

useHead({
  title: "Form",
});
</script>
<template>
  <ClientOnly>
    <div>
      <Container class="py-16 space-y-16">
        <div class="overflow-x-auto">
          <ol class="flex items-center w-full mb-4 sm:mb-5">
            <StepperItem
              :title="$t('form_step_1_title_txt')"
              :description="$t('form_step_1_desc_txt')"
              icon-name="i-heroicons-user"
              :is-completed="stepForm.validSelectedServices"
              :is-change-able="openForm.validSelectedServices"
              @go-to-specific="gotoSpecificStep('order-infomation')"
            />

            <StepperItem
              :title="$t('form_step_2_title_txt')"
              :description="$t('form_step_2_desc_txt')"
              icon-name="i-heroicons-identification"
              :is-completed="stepForm.validSelectedIdentity"
              :is-change-able="openForm.validSelectedIdentity"
              @go-to-specific="gotoSpecificStep('indenties')"
            />

            <StepperItem
              :title="$t('form_step_3_title_txt')"
              :description="$t('form_step_3_desc_txt')"
              icon-name="i-heroicons-credit-card"
              :is-completed="stepForm.validConfirmOrder"
              :is-change-able="openForm.validConfirmOrder"
              @go-to-specific="gotoSpecificStep('confirm-order')"
            />
            <StepperItem
              :title="$t('form_step_4_title_txt')"
              :description="$t('form_step_4_desc_txt')"
              :is-completed="stepForm.validConfirmPayment"
              @go-to-specific="gotoSpecificStep('payment')"
            />
          </ol>
        </div>

        <div class="py-16">
          <div v-if="stepper.isCurrent('order-infomation')">
            <FormServiceIntro @completed="completedSelectedService" />
          </div>
          <div v-if="stepper.isCurrent('indenties')">
            <!-- bagian-->
            <FormPassportEquipment @completed="completedPasswordEquipment" />
          </div>
          <div v-if="stepper.isCurrent('confirm-order')">
            <FormConfirmOrder @completed="completedPayment" />
          </div>
          <div v-if="stepper.isCurrent('payment')">
            <PaymentCheck @completed="resetStep" />
          </div>
        </div>
      </Container>
    </div>
  </ClientOnly>
</template>

<style scoped></style>

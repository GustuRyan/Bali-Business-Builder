<script lang="ts" setup>
const { ContactSchema } = useSchema();
const { t: $t, locale } = useI18n();
const {
  transformErrors,
  loading,
  message,
  alertType,
  setErrorMessage,
  setSuccessMessage,
} = useStateRequestHelper();

const state = ref({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  message: "",
});

async function onSubmit(values: any, ctx: any) {
  loading.value = true;

  const { data, error } = await useCustomFetch<{ data: { message: string } }>(
    "/contacts?lang=" + locale.value,
    {
      method: "POST",
      body: { ...state.value },
    }
  );

  if (error.value) {
    setErrorMessage(error.value?.data?.message);
    ctx.setErrors(transformErrors(error.value?.data));
  } else {
    setSuccessMessage(data.value?.data?.message ?? $t("contact_add_msg"));
    ctx.resetForm();
  }
  loading.value = false;
}
</script>
<template>
  <VeeForm :validation-schema="ContactSchema" @submit="onSubmit">
    <div class="card bg-gray-100 border roudend-lg">
      <div class="space-y-2 card-body p-6">
        <Alert :type="alertType" v-model="message" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormGroup name="first_name" :label="$t('first_name_txt')">
            <FormSpInput
              name="first_name"
              placeholder="eg: jhon"
              v-model="state.first_name"
              class="input-bordered input-sm h-11 w-full"
            />
          </FormGroup>
          <FormGroup name="last_name" :label="$t('last_name_txt')">
            <FormSpInput
              name="last_name"
              placeholder="eg: doe"
              v-model="state.last_name"
              class="input-bordered input-sm h-11 w-full"
            />
          </FormGroup>
        </div>
        <FormGroup :label="$t('phone_txt')" name="phone">
          <FormSpInput
            name="phone"
            v-model="state.phone"
            placeholder="eg: +628123456789"
            class="input-bordered input-sm h-11 w-full"
          />
        </FormGroup>
        <FormGroup :label="$t('email_txt')" name="email">
          <FormSpInput
            name="email"
            v-model="state.email"
            placeholder="eg: jhondoe@gmail.com"
            class="input-bordered input-sm h-11 w-full"
          />
        </FormGroup>
        <FormGroup name="message" :label="$t('message_txt')">
          <FormSpTextarea
            name="message"
            v-model="state.message"
            class="w-full textarea-bordered textarea-md"
            placeholder="eg: hallo, i'm jhon "
          />
        </FormGroup>

        <div>
          <button
            type="submit"
            class="btn btn-md btn-neutral btn-block rounded-full normal-case"
            :disabled="loading"
          >
            {{ $t("submit_txt") }}
          </button>
        </div>
      </div>
    </div>
  </VeeForm>
</template>

<style></style>

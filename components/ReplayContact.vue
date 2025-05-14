<template>
  <div>
    <VeeForm
      :validation-schema="ReplayContactSchema"
      @submit="submit"
      v-slot="{ errors }"
    >
      <Alert :type="alertType" v-model="message" />
      <ClientOnly>
        <div class="hidden">
          <VeeField name="message" as="div" v-model="messageReplay" />
        </div>
        <FormGroup
          name="message"
          :description="$t('enter_detail_msg')"
          :label="$t('message_txt')"
        >
          <FormTextEditor
            v-model="messageReplay"
            :is-error="!!errors.message"
          />
        </FormGroup>
        <VeeErrorMessage name="full_description" class="text-error" />
      </ClientOnly>

      <div class="flex justify-between">
        <div></div>
        <div>
          <button
            class="btn btn-neutral btn-sm"
            type="submit"
            :disabled="loading"
          >
            {{ $t("submit_txt") }}
          </button>
        </div>
      </div>
    </VeeForm>
  </div>
</template>

<script setup lang="ts">
const { ReplayContactSchema } = useSchema();
const { t: $t, locale } = useI18n();

const snackbar = useSnackbar();
const { transformErrors, loading, message, alertType, setErrorMessage } =
  useStateRequestHelper();

const props = defineProps({
  contact: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["reload"]);

const messageReplay = ref("");
async function submit(values: any, ctx: any) {
  loading.value = true;

  const { data, error } = await useCustomFetch<{ data: { message: string } }>(
    `/admins/contacts/${props.contact.id}/reply?lang=${locale.value}`,
    {
      method: "POST",
      body: { message: messageReplay.value },
    }
  );

  if (error.value) {
    setErrorMessage(error.value?.data?.message);
    ctx.setErrors(transformErrors(error.value?.data));
  } else {
    await snackbar.clear();
    await snackbar.add({
      type: "success",
      text: $t("replay_contact_success_msg"),
      groupKey: new Date().toISOString(),
    });

    ctx.resetForm();
    emit("reload");
  }
  loading.value = false;
}
</script>

<style scoped></style>

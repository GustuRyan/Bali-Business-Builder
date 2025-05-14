<script setup lang="ts">
const { FAQSchema } = useSchema();
const snackbar = useSnackbar();
const { loading, setErrorMessage, alertType, message, transformErrors } =
  useStateRequestHelper();

import { GeneralResponse } from "@/types";

import { useTimeoutFn } from "@vueuse/core";

const { t: $t, locale } = useI18n();

const { start, stop } = useTimeoutFn(() => {
  loadingProductFAQ();
}, 1500);

const props = defineProps({
  productSlug: {
    type: String,
    required: true,
  },
  faq: {
    type: Object,
  },
});

const emit = defineEmits(["reload"]);

interface FAQ {
  question: string | undefined;
  answer: string | undefined;
  de_question: string | undefined;
  de_answer: string | undefined;
  hu_question: string | undefined;
  hu_answer: string | undefined;
}

const state = ref<FAQ>({
  question: undefined,
  answer: undefined,
  de_question: undefined,
  de_answer: undefined,
  hu_question: undefined,
  hu_answer: undefined,
});

async function createFAQ(ctx: any) {
  loading.value = true;

  const { data, error } = await useCustomFetch(
    `/admins/products/${props.productSlug}/questions?lang=${locale.value}`,
    {
      method: "post",
      body: { ...state.value },
    }
  );

  if (error.value) {
    setErrorMessage(error.value?.data?.message);
    ctx.setErrors(transformErrors(error.value?.data));
  } else {
    await snackbar.clear();
    await snackbar.add({
      type: "success",
      text: $t("created_faq_success_txt"),
      groupKey: new Date().toISOString(),
    });

    emit("reload");
  }

  loading.value = false;
}

async function updateFAQ(ctx: any) {
  loading.value = true;
  const { data, error } = await useCustomFetch(
    `/admins/products/${props.productSlug}/questions/${props.faq?.id}?lang=${locale.value}`,
    {
      method: "put",
      body: { ...state.value },
    }
  );
  if (error.value) {
    setErrorMessage(error.value?.data?.message);
    ctx.setErrors(transformErrors(error.value?.data));
  } else {
    await snackbar.clear();
    await snackbar.add({
      type: "success",
      text: $t("updated_faq_success_txt"),
      groupKey: new Date().toISOString(),
    });

    emit("reload");
  }
}

async function loadingProductFAQ() {
  loading.value = true;
  if (!props.faq) return;
  const { data } = await useCustomFetch<GeneralResponse<FAQ>>(
    `/admins/products/${props.productSlug}/questions/${props.faq?.id}?lang=${locale.value}`
  );

  if (data.value?.data) {
    state.value.answer = data.value.data.answer;
    state.value.question = data.value.data.question;
    state.value.de_answer = data.value.data.de_answer;
    state.value.de_question = data.value.data.de_question;
    state.value.hu_answer = data.value.data.hu_answer;
    state.value.hu_question = data.value.data.hu_question;
  }

  loading.value = false;
  stop();
}

async function submit(values: any, ctx: any) {
  if (props.faq) {
    updateFAQ(ctx);
  } else {
    createFAQ(ctx);
  }
}

onMounted(() => {
  stop();
  if (props.faq) {
    start();
  }
});
</script>

<template>
  <div>
    <Alert v-model="message" :type="alertType" />
    <VeeForm @submit="submit" :validation-schema="FAQSchema">
      <div class="space-y-4">
        <LanguageTab>
          <template #en>
            <FormGroup :label="$t('question_txt')" name="question">
              <FormSpInput
                v-model="state.question"
                name="question"
                placeholder="eg: what is visa"
                class="input-bordered input-sm h-11 w-full"
              />
            </FormGroup>

            <FormGroup :label="$t('answer_txt')" name="answer">
              <FormSpTextarea
                v-model="state.answer"
                name="answer"
                placeholder="eg: what is visa"
                class="select-bordered w-full"
              />
            </FormGroup>
          </template>
          <template #de>
            <FormGroup :label="'DE-' + $t('question_txt')" name="de_question">
              <FormSpInput
                v-model="state.de_question"
                name="de_question"
                placeholder="eg: what is visa"
                class="input-bordered input-sm h-11 w-full"
              />
            </FormGroup>

            <FormGroup :label="'DE-' + $t('answer_txt')" name="de_answer">
              <FormSpTextarea
                v-model="state.de_answer"
                name="de_answer"
                placeholder="eg: what is visa"
                class="select-bordered w-full"
              />
            </FormGroup>
          </template>
          <template #hu>
            <FormGroup :label="'HU-' + $t('question_txt')" name="hu_question">
              <FormSpInput
                v-model="state.hu_question"
                name="hu_question"
                placeholder="eg: what is visa"
                class="input-bordered input-sm h-11 w-full"
              />
            </FormGroup>

            <FormGroup :label="'HU-' + $t('answer_txt')" name="hu_answer">
              <FormSpTextarea
                v-model="state.hu_answer"
                name="hu_answer"
                placeholder="eg: what is visa"
                class="select-bordered w-full"
              />
            </FormGroup>
          </template>
          <template #message>
            <div class="flex flex-col space-y-2">
              <VeeErrorMessage name="question" class="text-error" />
              <VeeErrorMessage name="answer" class="text-error" />
              <VeeErrorMessage name="de_question" class="text-error" />
              <VeeErrorMessage name="de_answer" class="text-error" />
              <VeeErrorMessage name="hu_question" class="text-error" />
              <VeeErrorMessage name="hu_answer" class="text-error" />
            </div>
          </template>
        </LanguageTab>

        <div class="pt-2">
          <div>
            <button
              type="submit"
              class="btn btn-block rounded-full btn-success-custome btn-sm h-11 text-white normal-case"
              :disabled="loading"
            >
              {{ props.faq ? $t("update_txt") : $t("create_txt") }}
            </button>
          </div>
        </div>
        <div></div>
      </div>
    </VeeForm>
  </div>
</template>

<style lang="scss" scoped></style>

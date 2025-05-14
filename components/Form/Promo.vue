<script lang="ts" setup>
import { Promo } from "@/types";
import { useDateFormat } from "@vueuse/core";
const snackbar = useSnackbar();
const { t: $t, locale } = useI18n();

const { PromoSchema } = useSchema();
const { loading, transformErrors, setErrorMessage, message, alertType } =
  useStateRequestHelper();

const props = defineProps<{ promo?: Promo }>();
const emit = defineEmits(["reload"]);

let dataForm = ref<Promo>({
  id: undefined,
  uuid: undefined,
  code: undefined,
  description: undefined,
  type: undefined,
  duration: undefined,
  amount: undefined,
  amount_usd: undefined,
  is_active: 1,
  is_new_user_promo: 1,
  start_new_user_promo_at: undefined,
  start_at: "",
  expired_at: "",
});

const isEditMode = computed(() => {
  return props.promo ? true : false;
});

async function create(ctx: any) {
  if (
    dataForm.value?.type === "percentage" &&
    dataForm.value.amount &&
    dataForm.value?.amount > 100
  ) {
    ctx.setErrors({ amount: $t("percentage_max_100") });
    return;
  }

  if (
    dataForm.value?.type === "percentage" &&
    dataForm.value.amount_usd &&
    dataForm.value?.amount_usd > 100
  ) {
    ctx.setErrors({ amount_usd: $t("percentage_max_100") });
    return;
  }

  loading.value = true;
  // TODO: should have resent otp
  const { data, error } = await useCustomFetch<{ data: { message: string } }>(
    "/admins/promos?lang=" + locale.value,
    {
      method: "POST",
      body: { ...dataForm.value },
    }
  );

  if (error.value) {
    setErrorMessage(error.value?.data?.message);
    ctx.setErrors(transformErrors(error.value?.data));
  } else {
    await snackbar.clear();
    await snackbar.add({
      type: "success",
      text: $t("created_promo_msg"),
      groupKey: new Date().toISOString(),
    });

    emit("reload", true);
  }
  loading.value = false;
}

async function update(ctx: any) {
  if (
    dataForm.value?.type === "percentage" &&
    dataForm.value.amount &&
    dataForm.value?.amount > 100
  ) {
    ctx.setErrors({ amount: $t("percentage_max_100") });
    return;
  }

  if (
    dataForm.value?.type === "percentage" &&
    dataForm.value.amount_usd &&
    dataForm.value?.amount_usd > 100
  ) {
    ctx.setErrors({ amount_usd: $t("percentage_max_100") });
    return;
  }

  loading.value = true;
  // TODO: should have resent otp
  const { data, error } = await useCustomFetch<{ data: { message: string } }>(
    `/admins/promos/${props.promo?.uuid}?lang=${locale.value}`,
    {
      method: "PUT",
      body: { ...dataForm.value },
    }
  );

  if (error.value) {
    setErrorMessage(error.value?.data?.message);
    ctx.setErrors(transformErrors(error.value?.data));
  } else {
    snackbar.add({
      type: "success",
      text: $t("update_promo_msg"),
    });
    emit("reload", true);
  }
  loading.value = false;
}

onMounted(() => {
  if (props.promo) {
    const start_at = useDateFormat(props.promo.start_at, "YYYY-MM-DD");
    const expired_at = useDateFormat(props.promo.expired_at, "YYYY-MM-DD");

    dataForm.value = props.promo as Promo;
    dataForm.value.start_at = start_at.value;
    dataForm.value.expired_at = expired_at.value;
    dataForm.value.amount = Number(props.promo.amount);
    dataForm.value.amount_usd = Number(props.promo.amount_usd);
  }
});

function submit(values: any, ctx: any) {
  if (props.promo) {
    update(ctx);
  } else {
    create(ctx);
  }
}
</script>
<template>
  <div>
    <VeeForm @submit="submit" :validation-schema="PromoSchema" v-slot="{ errors }">
      <div class="space-y-2">
        <Alert v-model="message" :type="alertType" />
        <FormGroup :label="$t('promo_code_txt')" name="code">
          <FormSpInput name="code" v-model="dataForm.code" class="input-bordered input-sm h-11 w-full"
            placeholder="eg: NEWYEAR" :disabled="isEditMode" />
        </FormGroup>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormGroup :label="$t('valid_from_txt')" name="start_at">
            <FormSpInput name="start_at" v-model="dataForm.start_at" class="input-bordered input-sm h-11 w-full"
              placeholder="eg: YYYY-MM-DD" type="date" />
          </FormGroup>
          <FormGroup :label="$t('valid_until_txt')" name="expired_at">
            <FormSpInput name="expired_at" v-model="dataForm.expired_at" class="input-bordered input-sm h-11 w-full"
              placeholder="eg: YYYY-MM-DD" type="date" />
          </FormGroup>
        </div>
        <div class="hidden">
          <VeeField name="amount" v-model="dataForm.amount" />
        </div>

        <FormGroup :label="$t('amount_txt') + ' (IDR) '" name="amount">
          <FormCostumePrice placehoder="0" v-model:price="dataForm.amount" v-model:type="dataForm.type"
            :disabled="isEditMode" price-label="IDR" name="amount" />
          <VeeErrorMessage name="amount" class="text-error" />
        </FormGroup>

        <FormGroup :label="$t('amount_txt') + ' (USD) '" name="amount_usd">
          <FormCostumePrice placehoder="0" v-model:price="dataForm.amount_usd" v-model:type="dataForm.type"
            :disabled="isEditMode" price-label="USD" name="amount_usd" />
          <VeeErrorMessage name="amount_usd" class="text-error" />
        </FormGroup>

        <div v-if="dataForm.type === 'fixed'" class="text-sm text-gray-500">
          {{ $t("fixed_price_note") }}
        </div>

        <FormGroup name="usage" :label="$t('usage_txt')">
          <FormSpSelect v-model="dataForm.duration" name="usage" class="select-bordered w-full select-sm h-11">
            <option selected disabled value="">
              {{ $t("select_option_txt") }}
            </option>
            <option value="once">{{ $t("one_time_usage_txt") }}</option>
            <option value="repeat">{{ $t("multiple_time_usage") }}</option>
          </FormSpSelect>
        </FormGroup>
        <div>
          <div class="flex space-x-2 items-center">
            <VeeField v-slot="{ field }" name="is_active">
              <input type="checkbox" class="toggle toggle-sm h-5" v-model="dataForm.is_active" v-bind="field"
                :true-value="1" :false-value="0" />
            </VeeField>
            <span class="font-semibold text-base text-black">
              {{ $t("is_active_txt") }}
            </span>
          </div>
          <div class="text-sm text-gray-500">
            {{ $t("promo_is_active_helper") }}
          </div>
        </div>

        <div>
          <button type="submit" class="btn btn-block rounded-full btn-success-custome btn-sm h-11 text-white normal-case"
            :disabled="loading">
            {{ $t("submit_txt") }}
          </button>
        </div>
        <div></div>
      </div>
    </VeeForm>
  </div>
</template>

<style></style>

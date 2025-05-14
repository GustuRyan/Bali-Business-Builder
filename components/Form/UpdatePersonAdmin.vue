<script setup lang="ts">
const { citizenziplist, gendersMutlilanguage, maritalStatusMutlilanguage } =
  useFormHelper();
const snackbar = useSnackbar();

import { FormUser, FormUserRes } from "@/types";
const props = defineProps<{
  uuid?: string;
  person?: FormUserRes;
  loading: boolean;
}>();

const router = useRouter();

const { t: $t, locale } = useI18n();

const { setErrorMessage, transformErrors, message, alertType } =
  useStateRequestHelper();

import { useFormStore } from "~/stores/form";
const storeForm = useFormStore();

const { axiosRequest } = useAxios();

const { formPersonUpdateSchema } = useSchema();

const button = ref<HTMLButtonElement | null>();

const emit = defineEmits(["update:loading"]);

const passport_cover_image = ref();
const passport_detail_image = ref();
const selfie_image = ref();
const return_ticket_image = ref();
const evisa_on_arrival_image = ref();
const onward_ticket_image = ref();

function resetImage() {
  passport_cover_image.value?.resetImage();
  passport_detail_image.value?.resetImage();
  selfie_image.value?.resetImage();
  return_ticket_image.value?.resetImage();
  evisa_on_arrival_image.value?.resetImage();
  onward_ticket_image.value?.resetImage();
}

const defaultForm: FormUserRes = {
  name: undefined,
  gender: undefined,
  citizenship: undefined,
  marital_status: undefined,
  date_of_birth: undefined,
  place_of_birth: undefined,
  mobile_phone: undefined,
  is_mobile_phone_has_whatsapp: 0,
  email: undefined,
  passport_no: undefined,
  passport_date_of_issued: undefined,
  passport_place_of_issued: undefined,
  passport_date_of_expiration: undefined,
  street_address: undefined,
  street_address2: undefined,
  city: undefined,
  state: undefined,
  country: undefined,
  zip: undefined,
  local_street_address: undefined,
  local_street_address2: undefined,
  local_city: undefined,
  local_state: undefined,
  local_country: undefined,
  local_zip: undefined,
  passport_detail_image: undefined,
  passport_cover_image: undefined,
  selfie_image: undefined,
  return_ticket_image: undefined,
  is_extend: 0,
  user_uuid: undefined,
  evisa_on_arrival_image: undefined,
  onward_ticket_image: undefined,
};

const formUpdate = ref({
  status: null,
  incomplete_message: undefined,
});

const dataForm = ref<FormUserRes>(defaultForm);

watch(
  () => props.person,
  (value) => {
    if (value) {
      dataForm.value = { ...value };
      dataForm.value.passport_detail_image = undefined;
      dataForm.value.passport_cover_image = undefined;
      dataForm.value.selfie_image = undefined;
      dataForm.value.return_ticket_image = undefined;
      dataForm.value.evisa_on_arrival_image = undefined;
      dataForm.value.onward_ticket_image = undefined;
    }
  },
  { deep: true, immediate: true }
);

const isExtend = computed(() => {
  return props.person?.is_extend;
});

const existisImage = computed(() => {
  return {
    selfie_image: props.person?.selfie_image as string,
    return_ticket_image: props.person?.return_ticket_image as string,
    passport_cover_image: props.person?.passport_cover_image as string,
    passport_detail_image: props.person?.passport_detail_image as string,
    evisa_on_arrival_image: props.person?.evisa_on_arrival_image as string,
    onward_ticket_image: props.person?.onward_ticket_image as string,
  };
});

const resultForm = computed(() => {
  return { ...dataForm.value };
});

async function updateForm(ctx: any) {
  emit("update:loading", true);
  storeForm.setLoading(true);
  const formData = new FormData();

  const object = { ...toRaw(resultForm.value), ...toRaw(formUpdate.value) };

  for (const item in object) {
    // @ts-ignore
    const objectItem = object[item];
    formData.append(item, objectItem ?? "");
  }

  if (!resultForm.value.selfie_image) {
    formData.delete("selfie_image");
  }

  if (!resultForm.value.passport_cover_image) {
    formData.delete("passport_cover_image");
  }

  if (!resultForm.value.passport_detail_image) {
    formData.delete("passport_detail_image");
  }

  if (!resultForm.value.return_ticket_image) {
    formData.delete("return_ticket_image");
  }

  if (object.status === "complete") {
    formData.delete("incomplete_message");
  }

  try {
    await axiosRequest.post(
      `/admins/orders/${props.uuid}/forms/${props.person?.id}?lang=${locale.value}&_method=PUT`,
      formData,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    );
    await snackbar.clear();
    await snackbar.add({
      type: "success",
      text: $t("update_person_success_txt"),
      groupKey: new Date().toISOString(),
    });

    router.push(`/admin/orders/${props.uuid}`);
    ctx.resetForm();
  } catch (error: any) {
    setErrorMessage(error.response?.data?.message);
    ctx.setErrors(transformErrors(error.response?.data));
  } finally {
    emit("update:loading", false);
    storeForm.setLoading(false);
  }
}

function submit(values: any, ctx: any) {
  updateForm(ctx);
}

function clickButton() {
  button.value?.click();
}

defineExpose({
  clickButton,
});
</script>
<template>
  <div>
    <VeeForm
      :validation-schema="formPersonUpdateSchema"
      @submit="submit"
      v-slot="{ errors }"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="space-y-4">
          <Alert v-model="message" :type="alertType" />
          <div>
            <BallonStep
              :title="$t('indentity_txt')"
              :short-description="$t('paperwork_for_10_minutes_txt')"
              step="1"
              total-step="6"
            />
          </div>
          <div>
            <FormGroup :label="$t('passport_name_txt')" name="name">
              <FormSpInput
                name="name"
                class="input-bordered input-sm h-11 w-full"
                placeholder="Jhon Doe"
                v-model="dataForm.name"
                disabled
              />
            </FormGroup>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <FormGroup :label="$t('gender_txt')" name="gender">
                <VeeField
                  name="gender"
                  v-model="dataForm.gender"
                  class="select select-bordered select-sm h-11 w-full"
                  as="select"
                  disabled
                >
                  <option selected value="">
                    {{ $t("select_gender_txt") }}
                  </option>
                  <option
                    v-for="gd in gendersMutlilanguage"
                    :value="gd.value"
                    :key="gd.value"
                  >
                    {{ gd.label }}
                  </option>
                </VeeField>
                <VeeErrorMessage name="gender" class="text-error mt-1" />
              </FormGroup>
            </div>
            <div>
              <FormGroup :label="$t('citizenship_txt')" name="citizenzip">
                <VeeField
                  class="select select-bordered select-sm h-11 w-full"
                  as="select"
                  name="citizenship"
                  disabled
                  v-model="dataForm.citizenship"
                >
                  <option selected value="">
                    {{ $t("select_citizenship_txt") }}
                  </option>
                  <option v-for="ct in citizenziplist" :value="ct" :key="ct">
                    {{ ct }}
                  </option>
                </VeeField>
                <VeeErrorMessage name="citizenship" class="text-error mt-1" />
              </FormGroup>
            </div>
          </div>
          <FormGroup
            :label="$t('marital_status_txt')"
            required
            name="marital_satus"
          >
            <VeeField
              name="marital_status"
              class="select select-bordered select-sm h-11 w-full"
              as="select"
              disabled
              v-model="dataForm.marital_status"
            >
              <option selected value="">
                {{ $t("select_marital_status_txt") }}
              </option>
              <option
                v-for="ct in maritalStatusMutlilanguage"
                :value="ct.value"
                :key="ct.value"
              >
                {{ ct.label }}
              </option>
            </VeeField>
            <VeeErrorMessage name="marital_status" class="text-error mt-1" />
          </FormGroup>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <FormGroup :label="$t('date_of_birth_txt')" name="date_of_birth">
                <FormSpInput
                  name="date_of_birth"
                  paceholder="yyyy-mm-dd"
                  type="date"
                  disabled
                  class="input-bordered input-sm h-11 w-full"
                  v-model="dataForm.date_of_birth"
                />
              </FormGroup>
            </div>
            <div>
              <FormGroup
                :label="$t('place_of_birth_txt')"
                name="place_of_birth"
              >
                <FormSpInput
                  name="place_of_birth"
                  class="input-bordered input-sm h-11 w-full"
                  placeholder="Eq: Denpasar"
                  disabled
                  v-model="dataForm.place_of_birth"
                />
              </FormGroup>
            </div>
          </div>
          <hr />
          <div class="mt-4">
            <BallonStep
              :title="$t('contact_txt')"
              :short-description="$t('paperwork_for_10_minutes_txt')"
              step="2"
              total-step="6"
            />
          </div>
          <div>
            <FormGroup name="mobile_phone" :label="$t('phone_txt')">
              <VueTelInput
                class="!rounded-lg !p-0.5 h-11"
                v-model="dataForm.mobile_phone"
                disabled
              />
              <VeeErrorMessage name="mobile_phone" class="text-error mt-1" />
            </FormGroup>
          </div>
          <div class="hidden">
            <VeeField name="mobile_number" v-model="dataForm.mobile_phone" />
          </div>
          <div class="flex items-center space-x-3">
            <VeeField
              name="is_mobile_phone_has_whatsapp"
              v-slot="{ field }"
              :value="dataForm.is_mobile_phone_has_whatsapp"
            >
              <input
                type="checkbox"
                v-bind="field"
                v-model="dataForm.is_mobile_phone_has_whatsapp"
                class="toggle toggle-sm h-5"
                :true-value="1"
                :false-value="0"
                disabled
              />
            </VeeField>
            <div class="text-sm">{{ $t("number_has_whatsapp_txt") }}</div>
          </div>
          <FormGroup :label="$t('email_txt')" name="email">
            <FormSpInput
              name="email"
              class="input-bordered input-sm h-11 w-full"
              placeholder="Eq: jhondoe@gmail.com"
              v-model="dataForm.email"
              disabled
            />
          </FormGroup>
          <hr />
          <div class="mt-4">
            <BallonStep
              :title="$t('passport_txt')"
              :short-description="$t('paperwork_for_10_minutes_txt')"
              step="3"
              total-step="6"
            />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <FormGroup :label="$t('passport_no_txt')" name="passport_no">
                <FormSpInput
                  name="passport_no"
                  class="input-bordered input-sm h-11 w-full"
                  placeholder="Eq: A-Z0-9"
                  v-model="dataForm.passport_no"
                  disabled
                />
              </FormGroup>
            </div>
            <div>
              <FormGroup
                :label="$t('passport_date_of_issued_txt')"
                name="passport_date_of_issued"
              >
                <FormSpInput
                  name="passport_date_of_issued"
                  class="input-bordered input-sm h-11 w-full"
                  placeholder="Eq: yyyy-mm-dd"
                  type="date"
                  disabled
                  v-model="dataForm.passport_date_of_issued"
                />
              </FormGroup>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormGroup
              :label="$t('passport_place_of_issued_txt')"
              name="passport_place_of_issued"
            >
              <FormSpInput
                name="passport_place_of_issued"
                class="input-bordered input-sm h-11 w-full"
                placeholder="Eq: Budapest"
                disabled
                v-model="dataForm.passport_place_of_issued"
              />
            </FormGroup>
            <FormGroup
              :label="$t('passport_date_of_expiration_txt')"
              required
              name="passport_date_of_expiration"
              :help="$t('passport_date_expiration_note_txt')"
            >
              <FormSpInput
                class="input-bordered input-sm h-11 w-full"
                name="passport_date_of_expiration"
                placeholder="Eq: yyyy-mm-dd"
                type="date"
                disabled
                v-model="dataForm.passport_date_of_expiration"
              />
            </FormGroup>
          </div>
          <hr />
          <div class="mt-4">
            <BallonStep
              :title="$t('home_address_txt')"
              :short-description="$t('paperwork_for_10_minutes_txt')"
              step="4"
              disabled
              total-step="6"
            />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <FormGroup :label="$t('country_txt')" name="country">
                <FormSpInput
                  name="country"
                  class="input-bordered input-sm h-11 w-full"
                  placeholder="Eq: Indonesia"
                  v-model="dataForm.country"
                  disabled
                />
              </FormGroup>
            </div>
            <div>
              <FormGroup :label="$t('state_txt')" required name="state">
                <FormSpInput
                  name="state"
                  class="input-bordered input-sm h-11 w-full"
                  placeholder="Eq: Bali"
                  v-model="dataForm.state"
                  disabled
                />
              </FormGroup>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <FormGroup :label="$t('city_txt')" required name="city">
                <FormSpInput
                  name="city"
                  class="input-bordered input-sm h-11 w-full"
                  placeholder="Eq: Denpasar"
                  v-model="dataForm.city"
                  disabled
                />
              </FormGroup>
            </div>
            <div>
              <FormGroup :label="$t('postal_code_txt')" required name="zip">
                <FormSpInput
                  name="zip"
                  class="input-bordered input-sm h-11 w-full"
                  placeholder="Eq: 80255"
                  v-model="dataForm.zip"
                  disabled
                />
              </FormGroup>
            </div>
          </div>
          <div>
            <FormGroup
              :label="$t('street_address_txt')"
              required
              name="street_address"
            >
              <LazyFormSpTextarea
                name="street_address"
                class="textarea-bordered w-full"
                placeholder="Eq: Mr John Smith. 132, My Street, Kingston, New York 12401."
                disabled
                v-model="dataForm.street_address"
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup
              :label="$t('street_address_2_txt')"
              required
              name="street_address_2"
            >
              <LazyFormSpTextarea
                name="street_address_2"
                class="textarea-bordered w-full"
                placeholder="Eq: Mr John Smith. 132, My Street, Kingston, New York 12401."
                v-model="dataForm.street_address2"
                disabled
              />
            </FormGroup>
          </div>
          <hr />
          <div class="mt-4">
            <BallonStep
              :title="$t('local_address_txt')"
              :short-description="$t('she_starred_helper_txt')"
              step="5"
              total-step="6"
            />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <FormGroup :label="$t('country_txt')" name="local_country">
                <FormSpInput
                  name="local_country"
                  class="input-bordered input-sm h-11 w-full"
                  placeholder="Eq: Indonesia"
                  v-model="dataForm.local_country"
                  disabled
                />
              </FormGroup>
            </div>
            <div>
              <FormGroup :label="$t('state_txt')" name="local_state">
                <FormSpInput
                  name="local_state"
                  class="input-bordered input-sm h-11 w-full"
                  placeholder="Eq: Bali"
                  v-model="dataForm.local_state"
                  disabled
                />
              </FormGroup>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <FormGroup :label="$t('city_txt')" name="local_city">
                <FormSpInput
                  name="local_city"
                  class="input-bordered input-sm h-11 w-full"
                  placeholder="Eq: Denpasar"
                  v-model="dataForm.local_city"
                  disabled
                />
              </FormGroup>
            </div>
            <div>
              <FormGroup :label="$t('postal_code_txt')" name="local_zip">
                <FormSpInput
                  name="local_zip"
                  class="input-bordered input-sm h-11 w-full"
                  placeholder="Eq: 80255"
                  v-model="dataForm.local_zip"
                  disabled
                />
              </FormGroup>
            </div>
          </div>
          <div>
            <FormGroup
              :label="$t('street_address_txt')"
              name="local_street_address"
            >
              <LazyFormSpTextarea
                name="local_street_address"
                class="textarea-bordered w-full"
                placeholder="Eq: Mr John Smith. 132, My Street, Kingston, New York 12401."
                v-model="dataForm.local_street_address"
                disabled
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup
              :label="$t('street_address_2_txt')"
              required
              name="local_street_address_2"
            >
              <LazyFormSpTextarea
                class="textarea-bordered w-full"
                name="local_street_address_2"
                placeholder="Eq: Mr John Smith. 132, My Street, Kingston, New York 12401."
                v-model="dataForm.local_street_address2"
                disabled
              />
            </FormGroup>
          </div>
          <hr />
          <div class="mt-4">
            <BallonStep
              :title="$t('uploading_doc_txt')"
              short-description="Do some paperwork for 10 minutes.The remaining part is on us."
              step="6"
              total-step="6"
            />
          </div>
          <template v-if="isExtend">
            <div>
              <VeeField
                name="onward_ticket_image"
                v-slot="{ errorMessage, field }"
                as="div"
                v-model="dataForm.onward_ticket_image"
              >
                <FormUploadingDocument
                  :title="$t('onward_tiket_txt')"
                  :error-message="errorMessage"
                  disabled
                  v-bind="field"
                  ref="onward_ticket_image"
                  :imageSource="existisImage.onward_ticket_image"
                />
              </VeeField>
            </div>
            <div>
              <VeeField
                name="evisa_on_arrival_image"
                v-slot="{ errorMessage, field }"
                as="div"
                v-model="dataForm.evisa_on_arrival_image"
              >
                <FormUploadingDocument
                  :title="$t('return_tiket_txt')"
                  :error-message="errorMessage"
                  disabled
                  v-bind="field"
                  ref="evisa_on_arrival_image"
                  :imageSource="existisImage.evisa_on_arrival_image"
                />
              </VeeField>
            </div>
          </template>
          <template v-else>
            <div>
              <VeeField
                name="passport_detail_image"
                as="div"
                v-slot="{ errorMessage, field }"
                v-model="dataForm.passport_detail_image"
              >
                <FormUploadingDocument
                  :title="$t('passport_detail_image_txt')"
                  :error-message="errorMessage"
                  disabled
                  v-bind="field"
                  ref="passport_detail_image"
                  :image-source="existisImage.passport_detail_image"
                />
              </VeeField>
            </div>
            <div>
              <VeeField
                name="passport_cover_image"
                v-slot="{ errorMessage, field }"
                as="div"
                v-model="dataForm.passport_cover_image"
              >
                <FormUploadingDocument
                  :title="$t('passport_cover_image_txt')"
                  :error-message="errorMessage"
                  v-bind="field"
                  ref="passport_cover_image"
                  disabled
                  :image-source="existisImage.passport_cover_image"
                />
              </VeeField>
            </div>
            <div>
              <VeeField
                name="selfie_image"
                v-slot="{ errorMessage, field }"
                as="div"
                v-model="dataForm.selfie_image"
              >
                <FormUploadingDocument
                  :title="$t('selfie_image_txt')"
                  :error-message="errorMessage"
                  disabled
                  v-bind="field"
                  ref="selfie_image"
                  :image-source="existisImage.selfie_image"
                />
              </VeeField>
            </div>
            <div>
              <VeeField
                name="return_ticket_image"
                v-slot="{ errorMessage, field }"
                as="div"
                v-model="dataForm.return_ticket_image"
              >
                <FormUploadingDocument
                  :title="$t('return_tiket_image_txt')"
                  :error-message="errorMessage"
                  disabled
                  v-bind="field"
                  ref="return_ticket_image"
                  :image-source="existisImage.return_ticket_image"
                />
              </VeeField>
            </div>
          </template>

          <div class="hidden">
            <button
              type="submit"
              ref="button"
              class="btn btn-success btn-block rounded-full text-white"
            >
              {{ $t("update_identity_txt") }}
            </button>
          </div>
        </div>
        <div class="space-y-4">
          <div>
            <FormGroup label="Status" name="status">
              <VeeField
                name="status"
                v-model="formUpdate.status"
                class="select select-bordered select-sm h-11 w-full"
                as="select"
              >
                <option selected value="">Please select status</option>
                <option
                  v-for="(item, index) in ['incomplete', 'complete']"
                  :value="item"
                  :key="index"
                >
                  {{ item }}
                </option>
              </VeeField>
              <VeeErrorMessage name="status" class="text-error mt-1" />
            </FormGroup>
          </div>
          <div>
            <FormGroup
              label="Incomplete Message"
              required
              name="incomplete_message"
              v-if="formUpdate.status === 'incomplete'"
            >
              <LazyFormSpTextarea
                name="incomplete_message"
                class="textarea-bordered w-full"
                placeholder="Eq: Uploading wrong document"
                v-model="formUpdate.incomplete_message"
              />
            </FormGroup>
          </div>
        </div>
      </div>
    </VeeForm>
  </div>
</template>

<style lang="scss" scoped></style>

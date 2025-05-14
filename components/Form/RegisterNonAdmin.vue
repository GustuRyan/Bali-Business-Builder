<script setup lang="ts">
const { NonAdminUpdateSchema } = useSchema();
const snackbar = useSnackbar();
const { axiosRequest } = useAxios();
const { t: $t, locale } = useI18n();

const props = defineProps({
  user: {
    type: Object,
  },
});

const emit = defineEmits(["reload"]);

const { transformErrors, loading, message, alertType, setErrorMessage } =
  useStateRequestHelper();

const state = ref({
  first_name: undefined,
  last_name: undefined,
  mobile_number: undefined,
  country: undefined,
  city: undefined,
  profile_picture: undefined,
  is_profile_deleted: 0,
  is_active: 1,
});

const isUpdate = computed(() => {
  return !!props.user;
});

async function updateUser(ctx: any) {
  loading.value = true;

  const formData = new FormData();
  const object = { ...state.value };

  for (const item in object) {
    // @ts-ignore
    const objectItem = object[item];
    formData.append(item, objectItem);
  }
  if (!state.value.profile_picture) {
    formData.delete("profile_picture");
  }

  try {
    const { data } = await axiosRequest.post(
      `/admins/users/${props.user?.uuid}?_method=PUT&lang=${locale.value}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    await snackbar.clear();
    await snackbar.add({
      type: "success",
      text: $t("new_user_added_success_msg"),
      groupKey: new Date().toISOString(),
    });

    ctx.resetForm();
    emit("reload");
  } catch (error: any) {
    setErrorMessage(error.response?.data?.message);
    ctx.setErrors(transformErrors(error.response?.data));
  }

  loading.value = false;
}

function submit(values: any, ctx: any) {
  updateUser(ctx);
}

onMounted(() => {
  if (props.user) {
    state.value.first_name = props.user.first_name;
    state.value.last_name = props.user.last_name;
    state.value.is_active = props.user.is_active;
    state.value.country = props.user.country;
    state.value.city = props.user.city;
    state.value.mobile_number = props.user.mobile_number;
  }
});
</script>

<template>
  <div>
    <div>
      <VeeForm
        :validation-schema="NonAdminUpdateSchema"
        @submit="submit"
        v-slot="{ errors }"
      >
        <div>
          <div class="space-y-2">
            <Alert :type="alertType" v-model="message" />

            <div class="grid grid-cols-2 gap-4">
              <FormGroup :label="$t('first_name_txt')" name="first_name">
                <FormSpInput
                  v-model="state.first_name"
                  name="first_name"
                  placeholder="eg: jhond"
                  class="input-bordered input-sm h-11 w-full"
                />
              </FormGroup>
              <FormGroup :label="$t('last_name_txt')" name="last_name">
                <FormSpInput
                  v-model="state.last_name"
                  name="last_name"
                  placeholder="eg: jhond"
                  class="input-bordered input-sm h-11 w-full"
                />
              </FormGroup>
            </div>
            <FormGroup :label="$t('phone_txt')" name="mobile_number">
              <VeeField
                name="mobile_number"
                as="div"
                v-slot="{ handleInput }"
                v-model="state.mobile_number"
              >
                <VueTelInput
                  v-model="state.mobile_number"
                  class="!rounded-lg !p-0.5 !h-11"
                  @on-input="handleInput"
                />
              </VeeField>
            </FormGroup>
            <FormImageProfile
              v-model="state.profile_picture"
              :profile-image="props.user?.profile_picture"
            />

            <div class="flex space-x-2 items-center" v-if="isUpdate">
              <VeeField
                v-slot="{ field }"
                name="is_active"
                :value="state.is_active"
              >
                <input
                  type="checkbox"
                  class="toggle toggle-sm h-5"
                  v-model="state.is_active"
                  v-bind="field"
                  :true-value="1"
                  :false-value="0"
                />
              </VeeField>
              <span class="font-semibold text-base text-black">
                {{ $t("is_active_txt") }} :
                {{ state.is_active ? $t("yes_txt") : $t("no_txt") }}
              </span>
            </div>

            <div class="pt-2">
              <button
                type="submit"
                class="btn btn-block btn-success-custome rounded-full normal-case text-white"
                :disabled="loading"
              >
                {{ $t("update_txt") }}
              </button>
            </div>
          </div>
        </div>
      </VeeForm>
    </div>
  </div>
</template>

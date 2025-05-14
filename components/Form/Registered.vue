<script setup lang="ts">
const { registerSchema, updateRegisterSchema } = useSchema();
const snackbar = useSnackbar();

const router = useRouter();
const { t: $t, locale } = useI18n();

const props = defineProps({
  isAdmin: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Object,
  },
});

const emit = defineEmits(["reload"]);

const { transformErrors, loading, message, alertType, setErrorMessage } =
  useStateRequestHelper();

const state = ref({
  email: undefined,
  first_name: undefined,
  last_name: undefined,
  password: undefined,
  confirm_password: undefined,
  is_profile_deleted: 0,
  is_active: 1,
});

const isUpdate = computed(() => {
  return !!props.user;
});

async function createAdmin(ctx: any) {
  loading.value = true;

  const { data, error } = await useCustomFetch<{ data: { message: string } }>(
    "/admins?lang=" + locale.value,
    {
      method: "POST",
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
      text: $t("new_user_added_success_msg"),
      groupKey: new Date().toISOString(),
    });

    ctx.resetForm();
    emit("reload");
  }
  loading.value = false;
}

async function updateAdmin(ctx: any) {
  loading.value = true;

  const { data, error } = await useCustomFetch<{ data: { message: string } }>(
    `/admins/${props.user?.uuid}?_method=PUT&lang=${locale.value}`,
    {
      method: "POST",
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
      text: $t("update_user_success_msg"),
      groupKey: new Date().toISOString(),
    });

    ctx.resetForm();
    emit("reload");
  }
  loading.value = false;
}
function submit(values: any, ctx: any) {
  if (isUpdate.value) {
    updateAdmin(ctx);
  } else {
    createAdmin(ctx);
  }
}

onMounted(() => {
  if (props.user) {
    state.value.email = props.user.email;
    state.value.first_name = props.user.first_name;
    state.value.last_name = props.user.last_name;
    state.value.is_active = props.user.is_active;
  }
});
</script>

<template>
  <div>
    <div>
      <VeeForm
        :validation-schema="isUpdate ? updateRegisterSchema : registerSchema"
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
                  placeholder="eg: jhon"
                  class="input-bordered input-sm h-11 w-full"
                />
              </FormGroup>
              <FormGroup :label="$t('last_name_txt')" name="last_name">
                <FormSpInput
                  v-model="state.last_name"
                  name="last_name"
                  placeholder="eg: doe"
                  class="input-bordered input-sm h-11 w-full"
                />
              </FormGroup>
            </div>

            <FormGroup :label="$t('email_txt')" name="email">
              <FormSpInput
                v-model="state.email"
                name="email"
                placeholder="eg: jhondoe@gmail.com"
                class="input-bordered input-sm h-11 w-full"
              />
            </FormGroup>

            <FormGroup
              v-if="!isUpdate"
              :label="$t('password_txt')"
              name="password"
            >
              <FormSpInput
                v-model="state.password"
                type="password"
                name="password"
                placeholder="eg: *******"
                class="input-bordered input-sm h-11 w-full"
              />
            </FormGroup>
            <FormGroup
              v-if="!isUpdate"
              :label="$t('confirm_password_txt')"
              name="confirm_password"
            >
              <FormSpInput
                v-model="state.confirm_password"
                type="password"
                name="confirm_password"
                placeholder="eg: *******"
                class="input-bordered input-sm h-11 w-full"
              />
            </FormGroup>
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
                {{ $t("save_txt") }}
              </button>
            </div>
          </div>
        </div>
      </VeeForm>
    </div>
  </div>
</template>

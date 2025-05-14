<script setup lang="ts">
const { renewPasswordSchema } = useSchema();
const { loading, message, alertType, setErrorMessage, transformErrors } =
  useStateRequestHelper();
const router = useRouter();

const { t: $t, locale } = useI18n();

const props = defineProps({
  email: {
    type: String,
  },
  pin: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: () => false,
  },
});

const state = reactive({
  password: undefined,
  confirm_password: undefined,
  email: "",
  pin: "",
});

const urlSubmit = computed(() => {
  if (props.isAdmin) {
    return "/admins/forget-password/reset-password?lang=" + locale.value;
  }
  return "/users/forget-password/reset-password?lang=" + locale.value;
});

const redirectUrl = computed(() => {
  if (props.isAdmin) {
    return "/admin/sign-in";
  }
  return "/sign-in";
});

async function submit(values: any, ctx: any) {
  loading.value = true;
  const { error } = useCustomFetch(urlSubmit.value, {
    method: "POST",
    body: { ...state },
  });
  if (error.value) {
    setErrorMessage(error.value?.data?.message);
    ctx.setErrors(transformErrors(error.value?.data));
  } else {
    router.push(redirectUrl.value);
  }
  loading.value = false;
}

onMounted(() => {
  state.email = props.email as string;
  state.pin = props.pin as string;
});
</script>

<template>
  <div class="min-w-[370px]">
    <VeeForm @submit="submit" :validation-schema="renewPasswordSchema">
      <div class="card">
        <div class="space-y-4 card-body p-6">
          <div>
            <h3 class="text-xl font-semibold text-slate-600">
              {{ $t("renew_password_txt") }}
            </h3>
          </div>
          <Alert :type="alertType" v-model="message" />
          <FormGroup :label="$t('password_txt')" name="password">
            <FormSpInput
              v-model="state.password"
              placeholder="eq: "
              name="password"
              type="password"
              class="input-bordered input-sm h-11 w-full"
            />
          </FormGroup>
          <FormGroup
            :label="$t('confirm_password_txt')"
            name="confirm_password"
          >
            <FormSpInput
              v-model="state.confirm_password"
              placeholder="eq: *********"
              type="password"
              name="confirm_password"
              class="input-bordered input-sm h-11 w-full"
            />
          </FormGroup>

          <div class="flex flex-row justify-between items-center">
            <div>
              <button
                type="submit"
                :disabled="loading"
                class="btn btn-neutral btn-md"
              >
                {{ $t("submit_txt") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </VeeForm>
  </div>
</template>

<script setup lang="ts">
const { $user, $useFetchAuthProfile, $isAdmin } = useAuth();
const { userSchema } = useSchema();
const { axiosRequest } = useAxios();
import { useFileDialog } from "@vueuse/core";

const { locale, t: $t } = useI18n();
const {
  files,
  open: openDialog,
  onChange,
} = useFileDialog({
  accept: "image/*", // Set to accept only image files
  multiple: false,
});
const {
  loading,
  message,
  alertType,
  setErrorMessage,
  setSuccessMessage,
  transformErrors,
} = useStateRequestHelper();

const updateUrl = computed(() => {
  if ($isAdmin.value) {
    return "admins/profile?_method=PUT&lang=" + locale.value;
  }
  return "/users/profile?_method=PUT&lang=" + locale.value;
});

const state = reactive<{
  first_name: string | undefined;
  last_name: string | undefined;
  profile_picture: string | undefined | File;
  email: string | undefined;
  is_profile_picture_deleted: number;
  mobile_number: string | undefined;
}>({
  first_name: undefined,
  last_name: undefined,
  profile_picture: "",
  email: undefined,
  is_profile_picture_deleted: 0,
  mobile_number: undefined,
});

onMounted(() => {
  state.first_name = $user.value?.first_name;
  state.last_name = $user.value?.last_name;
  state.email = $user.value?.email;
  state.mobile_number = $user.value?.mobile_number;
});

onChange((files) => {
  // @ts-ignore
  state.profile_picture = files[0];
});

const imagesUrl = computed(() => {
  if (state.profile_picture) {
    return URL.createObjectURL(state.profile_picture as File);
  }
  return $user.value?.profile_picture;
});

async function submit(values: any, ctx: any) {
  loading.value = true;
  const formData = new FormData();

  const object = { ...state };

  for (const item in object) {
    // @ts-ignore
    const objectItem = object[item];
    formData.append(item, objectItem);
  }

  if (!state.profile_picture) {
    formData.delete("profile_picture");
  }
  try {
    await axiosRequest.post(updateUrl.value, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setSuccessMessage($t("profile_update_success_msg"));
    await $useFetchAuthProfile();
  } catch (error: any) {
    setErrorMessage(error.response?.data?.message);
    ctx.setErrors(transformErrors(error.response?.data));
  }

  loading.value = false;
}
</script>

<template>
  <div class="min-w-[370px]">
    <VeeForm @submit="submit" :validation-schema="userSchema">
      <div class="card">
        <div class="space-y-4 card-body p-6">
          <div>
            <h3 class="text-xl font-semibold">
              Update {{ $isAdmin ? "Admin" : "User" }}
            </h3>
          </div>
          <Alert :type="alertType" v-model="message" />

          <div class="p-2 flex space-x-6 items-center">
            <div>
              <div v-if="imagesUrl" class="avatar">
                <div class="h-20 bg-base-200 rounded-full w-20">
                  <img :src="imagesUrl" alt="avatar" />
                </div>
              </div>
              <div v-else class="avatar">
                <div class="h-20 bg-base-200 rounded-full w-20">
                  <div class="flex justify-center items-center p-2">
                    <Icon name="i-heroicons-user" class="h-16 w-16" />
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-2">
              <p>{{ $t("select_image_under_1mb_txt") }}</p>

              <button
                type="button"
                @click="openDialog()"
                class="btn btn-neutral btn-sm h-11"
              >
                {{
                  imagesUrl ? $t("change_image_txt") : $t("upload_image_txt")
                }}
              </button>
              <div class="hidden">
                <VeeField
                  name="profile_picture"
                  v-model="state.profile_picture"
                />
              </div>
              <VeeErrorMessage name="profile_picture" class="text-error" />
            </div>
          </div>

          <FormGroup :label="$t('first_name_txt')" name="first_name">
            <FormSpInput
              v-model="state.first_name"
              placeholder="eq: jhon"
              name="first_name"
              class="input-bordered input-sm h-11 w-full"
            />
          </FormGroup>
          <FormGroup :label="$t('last_name_txt')" name="last_name">
            <FormSpInput
              v-model="state.last_name"
              placeholder="eq: "
              name="last_name"
              class="input-bordered input-sm h-11 w-full"
            />
          </FormGroup>

          <div>
            <FormGroup
              :label="$t('phone_txt')"
              name="phone"
              description="Make sure it's connect with WhatsApp"
            >
              <VeeField
                name="phone"
                as="div"
                v-slot="{ handleInput }"
                v-model="state.mobile_number"
              >
                <ClientOnly>
                  <VueTelInput
                    v-model="state.mobile_number"
                    class="!rounded-lg !p-0.5 !h-11"
                    @on-input="handleInput"
                  />
                </ClientOnly>
              </VeeField>
            </FormGroup>
            <VeeErrorMessage name="phone" class="text-error" />
          </div>

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

<script setup lang="ts">
const { $user } = useAuth();

const route = useRoute();

const formUpdate = ref();

const { locale } = useI18n();

const uuid = computed<string>(() => {
  return route.params.uuid as string;
});
const loading = ref(false);

const idForm = computed<string>(() => {
  return route.params.id as string;
});

import { FormUserRes, GeneralResponse } from "@/types";

const { data, pending } = await useCustomFetch<GeneralResponse<FormUserRes>>(
  `/users/${$user.value?.uuid}/orders/${uuid.value}/forms/${idForm.value}?lang=${locale.value}`,
  {
    key: "person" + new Date().toLocaleTimeString(),
  }
);

function clickButton() {
  formUpdate.value?.clickButton();
}

useHead({
  title: ("Form " + uuid.value) as string,
});

definePageMeta({
  layout: "user",
  // @ts-ignore
  middleware: ["auth", "user"],
});
</script>
<template>
  <Container class="py-16">
    <div class="max-w-5xl mx-auto space-y-8 border rounded-lg p-2 lg:p-8">
      <div class="flex justify-between items-center">
        <div>
          <div class="flex flex-row items-center">
            <div>
              <NuxtLink :to="`/user/orders/${uuid}`">
                <Icon name="i-heroicons-chevron-left" class="h-6 w-6" />
              </NuxtLink>
            </div>
            <div class="flex flex-col">
              <span class="font-semibold text-lg"> #{{ uuid }} </span>
              <span class="text-sm">Update Identity</span>
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <button
            type="button"
            :disabled="loading"
            @click="clickButton"
            class="btn btn-success btn-sm h-11 rounded-full text-white normal-case px-5"
          >
            {{ $t("update_identity_txt") }}
          </button>
        </div>
      </div>

      <hr />

      <div v-if="!pending">
        <FormUpdatePerson
          ref="formUpdate"
          v-if="data?.data"
          :uuid="uuid"
          :order="{ ...data.data }"
          v-model:loading="loading"
        />
      </div>
    </div>
  </Container>
</template>

<style lang="scss" scoped></style>

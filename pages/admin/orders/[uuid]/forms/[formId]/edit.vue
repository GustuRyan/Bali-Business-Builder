<script setup lang="ts">
const route = useRoute();
import { FormUserRes, GeneralResponse } from "@/types";

const { locale } = useI18n();

definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});

const loading = ref(false);

const orderId = computed(() => {
  return route.params.uuid as string;
});

const formId = computed(() => {
  return route.params.formId as string;
});

const { data, refresh } = await useCustomFetch<GeneralResponse<FormUserRes>>(
  `admins/orders/${orderId.value}/forms/${formId.value}?lang=${locale.value}`
);

const formUpdate = ref();

function clickButton() {
  formUpdate.value?.clickButton();
}

useHead({
  title: "Update Identity",
});
</script>
<template>
  <Container class="py-14 space-y-8">
    <div class="flex justify-between items-center">
      <div>
        <div class="text-xl md:text-3xl font-bold">
          <NuxtLink :to="`/admin/orders/` + orderId" no-prefetch>
            <Icon name="i-heroicons-arrow-left" />
            {{ $t("update_identity_txt") }}
          </NuxtLink>
        </div>
        <div>{{ data?.data?.name }} - {{ data?.data?.passport_no }}</div>
      </div>
      <div>
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

    <div>
      <FormUpdatePersonAdmin
        :uuid="orderId"
        :person="data?.data"
        v-model:loading="loading"
        ref="formUpdate"
      />
    </div>
  </Container>
</template>

<style scoped></style>

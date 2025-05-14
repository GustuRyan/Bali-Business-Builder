<template>
  <div>
    <div v-if="!isLoading" class="grid place-items-center h-[550px]">
      <div v-if="isSuccessed" class="max-w-md text-center space-y-4">
        <span class="text-2xl text-primary-600 font-medium">
          {{ $t("thanks") }}
        </span>
        <p class="prose">
          {{ $t("congrat_email_activate") }}
        </p>
        <NuxtLink to="/" class="btn btn-outline btn-primary">
          Homepage
        </NuxtLink>
      </div>
      <div v-else class="max-w-md text-center space-y-4">
        <span class="text-2xl text-primary-600 font-medium">
          {{ errorMessage }}
        </span>
        <p class="prose">
          {{ $t("error_email_activate") }}
        </p>
        <NuxtLink to="/" class="btn btn-outline btn-primary">
          Homepage
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isSuccessed = ref(true);
const isLoading = ref(true);
const errorMessage = ref();
const route = useRoute();

const { locale } = useI18n();

const token = computed(() => {
  return (route.params?.token as string) ?? "";
});

async function verifiedEmail() {
  const { error } = await useCustomFetch(
    `/admins/email-verification/${token.value}?lang=${locale.value}`,
    {
      method: "POST",
    }
  );
  if (error.value) {
    console.log(error.value);
    isSuccessed.value = false;
    errorMessage.value =
      error.value?.data?.message ?? "Email verification failed";
  }
  isLoading.value = false;
}

onMounted(async () => {
  await nextTick();
  verifiedEmail();
});

definePageMeta({
  // @ts-ignore
  middleware: "guest",
});
</script>

<style scoped></style>

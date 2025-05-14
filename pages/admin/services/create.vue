<script setup lang="ts">
const loading = ref(false);

const formService = ref();

function submitForm() {
  formService.value?.clickBtnSubmit();
}

definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});

useHead({
  title: "Create Service",
});
</script>
<template>
  <Container class="space-y-4">
    <div class="py-6 flex justify-between items-center sticky top-0 bg-white z-20">
      <div>
        <div class="text-xl md:text-3xl font-bold">
          <NuxtLink to="/admin/services" no-prefetch>
            <Icon name="i-heroicons-arrow-left" />
            {{ $t("create_new_service_txt") }}
          </NuxtLink>
        </div>
        <div>{{ $t("enter_service_information_txt") }}</div>
      </div>
      <div>
        <button
          :disabled="loading"
          @click="submitForm"
          class="btn btn-success text-white btn-sm h-10 rounded-full px-8 normal-case text-lg hover:opacity-90"
        >
          {{ $t("save_txt") }}
        </button>
      </div>
    </div>
    <div>
      <FormService ref="formService" v-model="loading" />
    </div>
  </Container>
</template>

<style scoped></style>

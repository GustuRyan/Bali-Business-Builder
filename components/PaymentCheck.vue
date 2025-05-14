<template>
  <div class="h-56">
    <div class="grid place-items-center">
      <div class="min-w-[300px] text-center space-y-8">
        <h1 class="text-2xl font-bold">{{ $t("form_payment_title_txt") }}</h1>
        <p class="max-w-2xl prose">
          {{ $t("form_payment_desc_1_txt") }}
        </p>
        <button type="button" @click="paymentConfirm" class="btn btn-neutral">
          {{ $t("form_payment_fill_visa_txt") }}
        </button>
        <div class="flex justify-between items-center">
          <div class="font-bold">
            <div class="max-w-md">
              {{ $t("form_payment_desc_2_txt") }}
            </div>
          </div>
          <div>
            <WhatsAppBtn />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(["completed"]);

function paymentConfirm() {
  emit("completed", true);
}
</script>

<style></style>

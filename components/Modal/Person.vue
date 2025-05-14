<template>
  <div
    class="modal"
    :class="{
      'modal-open': showModal,
    }"
  >
    <div class="modal-box w-11/12 max-w-2xl space-y-2" ref="modal">
      <h3 class="text-lg font-bold">{{ props.person.name }}</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <div class="avatar">
            <div class="h-52 rounded-lg overflow-hidden">
              <img
                v-if="props.person.selfie_image"
                :src="(props.person.selfie_image as string)"
                :alt="props.person.name"
                class="h-full w-full"
              />
              <div v-else class="h-full w-full bg-gray-500"></div>
            </div>
          </div>
        </div>
        <div>
          <div
            class="flex justify-between hover:bg-base-200 transition-colors duration-300 p-2 rounded-sm"
          >
            <div class="text-sm">{{ $t("name_txt") }}</div>
            <div class="font-medium">
              {{ props.person.name }}
            </div>
          </div>
          <div
            class="flex justify-between hover:bg-base-200 transition-colors duration-300 p-2 rounded-sm"
          >
            <div class="text-sm">{{ $t("gender_txt") }}</div>
            <div class="font-medium">
              {{ props.person.gender }}
            </div>
          </div>
          <div
            class="flex justify-between hover:bg-base-200 transition-colors duration-300 p-2 rounded-sm"
          >
            <div class="text-sm">{{ $t("email_txt") }}</div>
            <div class="font-medium">
              {{ props.person.email }}
            </div>
          </div>
          <div
            class="flex justify-between hover:bg-base-200 transition-colors duration-300 p-2 rounded-sm"
          >
            <div class="text-sm">{{ $t("passport_no_txt") }}</div>
            <div class="font-medium">
              {{ props.person.passport_no }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <label class="modal-backdrop">{{ $t("close_txt") }}</label>
  </div>
</template>

<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";
import { FormUser } from "@/types";
const props = defineProps<{ modelValue: boolean; person: Partial<FormUser> }>();
const emit = defineEmits(["update:modelValue"]);

const modal = ref();

const showModal = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

onClickOutside(modal, () => {
  showModal.value = false;
});
</script>

<style></style>

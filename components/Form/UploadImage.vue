<template>
  <div
    class="flex flex-col space-y-4 overflow-hidden transition-all duration-300"
  >
    <div class="font-bold">{{ props.title }}</div>
    <div
      v-if="imagesUrl"
      class="h-48 w-full grid place-items-center border shrink-0 rounded-xl overflow-hidden"
    >
      <img
        :src="imagesUrl"
        alt="img"
        v-if="imagesUrl"
        class="w-full h-full object-center"
      />
    </div>
    <div class="space-y-3">
      <div class="opacity-50 text-sm">
        <slot>
          {{ $t("support_ext_file_size_txt") }}
        </slot>
      </div>

      <div class="text-red-500 text-sm" v-if="errorMessage">
        {{ errorMessage }}
      </div>
      <div>
        <button
          @click="openDialog()"
          type="button"
          :disabled="props.disabled"
          class="btn btn-neutral rounded-full normal-case"
        >
          <Icon name="i-heroicons-arrow-up-tray" class="h-6 w-6" />
          {{ alreadyHaveImage ? "Change Image" : "Upload Image" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFileDialog } from "@vueuse/core";

const {
  open: openDialog,
  onChange,
  reset,
} = useFileDialog({
  accept: "image/*", // Set to accept only image files
  multiple: false,
});
const props = defineProps({
  /**
   * title for banner
   *
   */
  title: {
    type: String,
    default: "Image",
  },
  modelValue: {
    type: [File, String],
  },
  /**
   * indicates existing image
   */
  imageSource: {
    type: [String],
  },
  /**
   * some error message maybe from API
   */
  errorMessage: {
    type: String,
  },
  /**
   * controll the button
   */
  disabled: {
    type: Boolean,
  },
});

const emit = defineEmits(["update:modelValue"]);

const inputFile = ref<Blob | null>();

const alreadyHaveImage = computed<boolean>(() => {
  if (inputFile.value) {
    return true;
  }
  return !!props.imageSource;
});

onChange((files) => {
  // @ts-ignore
  inputFile.value = files[0];

  emit("update:modelValue", inputFile.value);
  reset();
});

watch(
  () => props.modelValue,
  (value) => {
    if (!value) {
      inputFile.value = null;
      emit("update:modelValue", undefined);
    }
  }
);

const imagesUrl = computed(() => {
  if (inputFile.value) {
    return URL.createObjectURL(inputFile.value);
  }
  return props.imageSource;
});

function resetImage() {
  inputFile.value = null;
  emit("update:modelValue", undefined);
}

defineExpose<{ resetImage: () => void }>({
  resetImage,
});
</script>

<style scoped></style>

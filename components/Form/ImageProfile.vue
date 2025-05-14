<template>
  <div class="grid grid-cols-1 md:grid-cols-[185px_1fr] py-2">
    <div class="avatar">
      <div class="h-36 rounded-full">
        <img :src="imageUrlReview" alt="profile" />
      </div>
    </div>
    <div class="flex items-center">
      <div class="space-y-2">
        <p>
          {{ $t("support_file_and_size_txt") }}
        </p>

        <button class="btn btn-neutral" type="button" @click="open()">
          {{ !!props.profileImage ? "Change" : "Upload" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFileDialog } from "@vueuse/core";

const props = defineProps({
  modelValue: {
    type: [File, String],
  },
  profileImage: {
    type: String,
  },
});

const image = ref<File | null>(null);
const emit = defineEmits(["update:modelValue"]);

const { files, open, reset, onChange } = useFileDialog({
  accept: "image/*", // Set to accept only image files
  multiple: false,
});
onChange((files) => {
  // @ts-ignore
  emit("update:modelValue", files[0]);
  // @ts-ignore
  image.value = files[0];
  reset();
});

const imageUrlReview = computed(() => {
  if (image.value) {
    return URL.createObjectURL(image.value as File);
  }

  return !!props.profileImage
    ? props.profileImage
    : "https://fakeimg.pl/400x400?text=profile";
});
</script>

<style scoped></style>

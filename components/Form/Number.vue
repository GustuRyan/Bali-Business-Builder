<template>
  <div class="inline-flex space-x-1 items-center">
    <button
      :disabled="disabledDecrement"
      class="btn btn-sm btn-neutral rounded-full h-9 w-9"
      @click="decrement"
      type="button"
      aria-label="decrement"
    >
      <Icon name="i-heroicons-minus" class="h-6 w-6" />
    </button>

    <div class="px-3">
      {{ input }}
    </div>
    <button
      class="btn btn-sm btn-neutral rounded-full h-9 w-9"
      @click="increment"
      type="button"
      aria-label="increment"
    >
      <Icon name="i-heroicons-plus" class="h-6 w-6" />
    </button>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
const props = defineProps({
  modelValue: {
    type: [Number, String],
  },
});

const emit = defineEmits(["update:modelValue"]);

const input = computed({
  get() {
    return props.modelValue ?? 0;
  },
  set(value) {
    emit("update:modelValue", value as number);
  },
});

function increment() {
  if (typeof input.value !== "number") {
    input.value = 0;
  }
  input.value = input.value + 1;
}

function decrement() {
  if (typeof input.value !== "number") {
    input.value = 0;
  }
  input.value = input.value - 1;
}

const disabledDecrement = computed(() => {
  return (input.value as number) <= 1;
});
</script>

<style scoped></style>

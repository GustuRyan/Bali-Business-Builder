<template>
  <div
    class="border rounded-md focus-within:outline-none focus-within:ring-1 focus-within:ring-gray-300 px-2 min-w-[300px] flex items-center"
    :class="{
      'bg-gray-200/80': $attrs.disabled,
    }"
  >
    <Icon name="i-heroicons-magnifying-glass" class="text-gray-400" />
    <input
      class="input input-sm !rounded-none !ring-0 !outline-none !border-none w-full h-9"
      v-model="search"
      v-bind="$attrs"
    />
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  modelValue: {
    type: String,
  },
});

const emit = defineEmits(["update:modelValue"]);

const search = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<style></style>

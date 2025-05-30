<script setup lang="ts">
import { useField } from "vee-validate";
defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  modelValue: [String, Number],
  name: {
    type: String,
    required: true,
  },
});

// use `toRef` to create reactive references to `name` prop which is passed to `useField`
// this is important because vee-validte needs to know if the field name changes
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const name = toRef(props, "name");

// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  syncVModel: true,
});

const className = computed(() => {
  const arr = ["input"];

  if (!meta.touched) {
    return arr;
  }
  if (meta.touched && meta.valid) {
    arr.push("input-success");
  }
  if (!!errorMessage.value) {
    arr.push("input-error");
  }
  return arr.join(" ");
});
</script>

<template>
  <div class="w-full">
    <input
      :name="name"
      :id="name"
      :type="type"
      :value="inputValue"
      @input="handleChange"
      @blur="handleBlur"
      :class="className"
      v-bind="$attrs"
    />
    <VeeErrorMessage :name="name" class="text-error mt-1" />
  </div>
</template>

<style scoped></style>

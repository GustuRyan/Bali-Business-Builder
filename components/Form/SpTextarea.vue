<script setup lang="ts">
import { useField } from "vee-validate";
defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  modelValue: String,
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
  const arr = ["textarea resize"];
  if (!meta.touched) {
    return arr;
  }
  if (meta.touched && meta.valid) {
    arr.push("textarea-success");
  }
  if (!!errorMessage.value) {
    arr.push("textarea-error");
  }
  return arr.join(" ");
});

const textareaInput = computed({
  get() {
    return inputValue.value as string;
  },
  set(value) {
    inputValue.value = value;
  },
});
</script>

<template>
  <ClientOnly>
    <div class="w-full">
      <textarea
        :name="name"
        :id="name"
        @input="handleChange"
        @blur="handleBlur"
        :class="className"
        v-bind="$attrs"
        v-model="textareaInput"
      >
      </textarea>
      <VeeErrorMessage :name="name" class="text-error mt-2" />
    </div>
  </ClientOnly>
</template>

<style scoped></style>

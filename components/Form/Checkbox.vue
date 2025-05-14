<script setup lang="ts">
import { useField } from "vee-validate";
defineOptions({
  inheritAttrs: false,
});

//https://github.com/logaretm/vee-validate/issues/3844
const props = defineProps({
  modelValue: {
    type: [Boolean, String, Number],
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },

  trueValue: {
    type: [String, Number, Boolean],
    default: true,
  },
  falseValue: {
    type: [String, Number, Boolean],
    default: false,
  },
  isSwitch: {
    type: Boolean,
    default: false,
  },
});

// use `toRef` to create reactive references to `name` prop which is passed to `useField`
// this is important because vee-validte needs to know if the field name changes
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const name = toRef(props, "name");

// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
const { errorMessage, checked, handleChange, meta } = useField(
  name,
  undefined,
  {
    type: "checkbox",
    checkedValue: props.trueValue,
    uncheckedValue: props.falseValue,
    syncVModel: true,
  }
);

const className = computed(() => {
  if (props.isSwitch) {
    const arr = ["toggle"];
    if (!!errorMessage.value) {
      arr.push("toggle-error");
    }
    if (meta.valid) {
      arr.push("toggle-success");
    }
    return arr.join(" ");
  }

  const arr = ["checkbox"];
  if (meta.valid) {
    arr.push("checkbox-success");
  }
  if (!!errorMessage.value) {
    arr.push("checkbox-error");
  }
  return arr.join(" ");
});
</script>

<template>
  <div>
    <div class="form-control">
      <label class="inline-flex cursor-pointer space-x-3" :for="name">
        <div class="flex-0">
          <input
            :name="name"
            :id="name"
            type="checkbox"
            :checked="checked"
            @input="handleChange"
            :class="className"
            v-bind="$attrs"
          />
        </div>

        <span class="label-text">{{ label }}</span>
      </label>
      <VeeErrorMessage :name="name" class="text-error" />
    </div>
  </div>
</template>

<style scoped></style>

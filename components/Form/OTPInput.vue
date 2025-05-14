<template>
  <div class="inline-flex space-x-3">
    <input
      type="text"
      v-for="i in length"
      v-model="fieldValues[i - 1]"
      @keyup="onKeyUp($event, i - 1)"
      class="border h-14 rounded-md outline-none focus:outline-neutral-400 text-sm border-neutral-300 w-10 px-3.5"
      maxlength="1"
      @update:model-value="onUpdate($event, i - 1)"
      :key="i"
      :ref="(el) => updateFieldRef(el, i - 1)"
    />
  </div>
</template>

<script setup lang="ts">
const prop = defineProps({
  inputLength: {
    type: Number,
    default: () => 6,
  },
  modelValue: {
    type: [String, Number],
  },
  name: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const fields = ref<any[]>([]);

const length = computed(() => prop.inputLength);

const fieldValues = ref([]);

const updateFieldRef = (element: any, index: number) => {
  if (element) {
    fields.value[index] = element;
  }
};

const composite = computed(() => {
  const nonNullFields = fieldValues.value.filter((value) => value);

  if (length.value !== nonNullFields.length) {
    return "";
  }
  return nonNullFields.join("");
});

watch(composite, () => {
  if (composite.value) {
    emit("update:modelValue", composite.value);
  } else {
    emit("update:modelValue", "");
  }
});

const onUpdate = (value: any, index: number) => {
  if (value) {
    focus(index + 1);
  }
};

const focus = (index: number) => {
  if (index >= 0) {
    if (index < length.value) {
      fields.value[index].select();
    } else {
      if (composite.value) {
        fields.value[index - 1].blur();
      }
    }
  }
};

const onKeyUp = (evnt: KeyboardEvent, index: number) => {
  const key = evnt.key;

  if (["Tab", "Shift", "Meta", "Control", "Alt"].includes(key)) {
    return;
  }

  if (["Delete"].includes(key)) {
    return;
  }

  if (key === "ArrowLeft" || key === "Backspace") {
    focus(index - 1);
  } else if (key === "ArrowRight") {
    focus(index + 1);
  }
};
// make sure to reset the refs before each update
onBeforeUpdate(() => {
  fields.value = [];
});
</script>

<style lang="scss" scoped></style>

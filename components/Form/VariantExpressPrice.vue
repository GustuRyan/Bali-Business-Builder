<template>
  <div>
    <FormSpPreInput
      v-model="item"
      price-label="IDR"
      :name="name"
      v-bind="$attrs"
    />
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
  name: {
    type: String,
    required: true,
  },
  price: {
    type: [Number, String],
  },
  expressEstimatedDay: {
    type: [Number, String],
  },
  isExpress: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["update:modelValue", "update:expressEstimatedDay"]);

const currentEstimatedDay = ref();

const item = computed({
  get() {
    return props.modelValue ?? undefined;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

watch(
  () => props.price,
  (price) => {
    if (price) {
      setPriceExpress();
    }
  }
);

watch(
  () => props.isExpress,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      setPriceExpress();
    }
  }
);

function setPriceExpress() {
  const price = props.price;

  const expressPrice = ((price as number) * 20) / 100;

  if (props.isExpress) {
    item.value = expressPrice;
    emit("update:expressEstimatedDay", currentEstimatedDay.value ?? undefined);
  } else {
    item.value = undefined;
    emit("update:expressEstimatedDay", undefined);
  }
}

onMounted(async () => {
  await nextTick();
  currentEstimatedDay.value = props.expressEstimatedDay;
  setPriceExpress();
});
</script>

<style scoped></style>

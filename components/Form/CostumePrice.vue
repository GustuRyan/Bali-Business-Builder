<script lang="ts" setup>
const props = defineProps({
  price: [Number, String],
  type: {
    type: String,
    default: () => "percentage",
  },
  name: {
    type: String,
    required: true,
  },
  priceLabel: {
    type: String,
    default: () => "$",
  },
  disabled: {
    type: Boolean,
    default: () => false,
  },
});

const emit = defineEmits(["update:price", "update:type"]);

const priceModel = computed({
  get() {
    return props.price;
  },
  set(value) {
    emit("update:price", value);
  },
});

const typeModel = computed({
  get() {
    return props.type;
  },
  set(value) {
    emit("update:type", value);
  },
});

onMounted(() => {
  typeModel.value = props.type;
});
</script>

<template>
  <div>
    <div
      class="flex input justify-between items-center border border-gray-300 overflow-hidden h-11"
      :class="{
        'bg-gray-200/80': disabled,
      }"
    >
      <input
        type="number"
        v-model="priceModel"
        class="input !px-0 !outline-none !rounded-none !border-none h-10 w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        placeholder="eg:0"
        :disabled="disabled"
      />
      <select
        v-model="typeModel"
        class="select !outline-none !border-none h-10"
        :disabled="disabled"
      >
        <option value="percentage" selected>Percentage(%)</option>
        <option value="fixed">Fixed ({{ priceLabel }})</option>
      </select>
    </div>
    <slot> </slot>
  </div>
</template>

<style></style>

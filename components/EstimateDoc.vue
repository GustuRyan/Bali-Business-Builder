<template>
  <div class="p-4 rounded-lg bg-neutral-200">
    <div class="flex flex-row space-x-2 items-center">
      <div>
        <Icon
          name="i-heroicons-sparkles-solid"
          class="h-6 w-6 text-yellow-300"
        />
      </div>
      <div>
        <div class="text-gray-600">{{ $t("estimate_date_txt") }}</div>
        <div class="font-bold text-xl">
          {{ estimateDate }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDateFormat } from "@vueuse/core";
const props = defineProps({
  date: {
    type: String,
  },
  product_estimate_day: {
    type: Number,
    default: () => 0,
  },
});

const estimateDate = computed(() => {
  let date;

  if (props.date) {
    date = new Date(props.date);
  } else {
    date = new Date();
  }

  date.setDate(date.getDate() + props.product_estimate_day);

  return useDateFormat(date, "YYYY MMMM DD").value;
});
</script>

<style></style>

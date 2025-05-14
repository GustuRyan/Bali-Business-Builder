<template>
  <div class="whitespace-nowrap">
    {{ date }}
  </div>
</template>

<script lang="ts" setup>
import { useDateFormat } from "@vueuse/core";
const props = defineProps({
  datetime: {
    type: String,
  },
});

const date = useDateFormat(props.datetime, "YYYY-MM-DD HH:mm");
</script>

<style></style>

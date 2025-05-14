<template>
  <div
    class="rounded-full p-2 inline-flex space-x-2 items-center text-sm"
    :class="[bgMain]"
  >
    <div
      v-if="props.color === 'amber'"
      class="bg-amber-600 px-2.5 py-1.5 rounded-full max-w-max text-white"
    >
      {{ props.title }}
    </div>
    <div
      v-else
      class="bg-slate-700 px-2.5 py-1.5 rounded-full max-w-max text-white"
    >
      {{ props.title }}
    </div>
    <div :class="[txtBadge]" class="px-1 font-semibold">
      {{ props.short_description }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
  },
  short_description: {
    type: String,
  },
  color: {
    type: String,
    default: "amber",
    validator(value: string) {
      return ["amber", "slate"].includes(value);
    },
  },
});

const bgMain = computed(() => {
  if (props.color === "amber") {
    return "bg-amber-100";
  }
  return "bg-slate-100";
});

const txtBadge = computed(() => {
  return `text-${props.color}-800`;
});
</script>

<style></style>

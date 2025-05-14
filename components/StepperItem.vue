<template>
  <li
    class="flex w-full items-center after:content-[''] last:after:w-auto after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block group after:transition-colors after:duration-300"
    @click="gotoSpecificSteps"
  >
    <div
      class="rounded-full lg:rounded-md p-1 lg:p-2 flex flex-row space-x-2 items-center z-10 lg:min-w-[250px] transition-colors duration-300 h-full lg:min-h-[100px]"
    >
      <div>
        <div
          class="flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0"
          :class="{
            'bg-primary-500 text-white': isCompleted,
            'bg-base-200': !isCompleted,
          }"
        >
          <Icon :name="props.iconName" />
        </div>
      </div>
      <div
        class="w-full px-4 rounded-md transition-colors duration-300 hidden lg:block"
      >
        <div class="whitespace-nowrap font-bold">
          {{ props.title }}
        </div>
        <div class="text-xs leading-4">
          {{ props.description }}
        </div>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
const props = defineProps({
  iconName: {
    type: String,
    default: "i-heroicons-check",
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  isChangeAble: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["goToSpecific"]);

function gotoSpecificSteps() {
  if (!props.isChangeAble) {
    return;
  }
  emit("goToSpecific");
}
</script>

<style scoped></style>

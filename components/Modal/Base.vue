<template>
  <Teleport to="body">
    <Transition
      enter-from-class="transition  opacity-0"
      enter-active-class="transition !ease-out !duration-300 opacity-1"
      leave-active-class="transition !ease-in !duration-400 !scale-75"
    >
      <dialog
        class="modal !z-[9999] h-full !inset-0"
        :class="{
          'modal-open': showModal,
        }"
      >
        <div class="modal-box" v-bind="$attrs" ref="modal">
          <template v-if="showModal">
            <slot />
          </template>
        </div>
      </dialog>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";
defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: () => false,
  },
  clickOutsite: {
    type: Boolean,
    default: () => false,
  },
});
const emit = defineEmits(["update:modelValue"]);

const modal = ref();

const showModal = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

function hideModal() {
  showModal.value = false;
}

onClickOutside(modal, () => {
  if (props.clickOutsite) {
    showModal.value = false;
  }
});

defineExpose({
  hideModal,
});
</script>

<style></style>

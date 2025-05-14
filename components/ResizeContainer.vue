<template>
  <div class="relative" :style="{ minHeight: parentHeight + 'px !important' }">
    <div class="absolute w-full z-10" ref="child">
      <Container class="py-16 max-w-5xl">
        <slot></slot>
      </Container>
    </div>
    <div class="opacity-20 xl:opacity-100">
      <div
        class="w-full h-full flex flex-col justify-between"
        :style="{ minHeight: parentHeight + 'px !important' }"
      >
        <div class="w-full grid py-16">
          <img
            src="/plane-stiker.png"
            class="right-0 top-0 h-full w-72 place-self-end"
            alt="right"
          />
        </div>
        <div class="grid w-full py-16">
          <img
            src="/hand-tiket.png"
            class="left-0 bottom-0 h-full w-72 place-self-start"
            alt="left"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useElementSize } from "@vueuse/core";
const child = ref<HTMLDivElement>();

const { height } = useElementSize(child);

const parentHeight = computed(() => {
  return height.value;
});
</script>

<style></style>

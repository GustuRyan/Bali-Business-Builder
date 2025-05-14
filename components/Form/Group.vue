<template>
  <div class="form-control">
    <label class="label" v-if="props.label" :for="name">
      <span class="label-text !text-black font-semibold !text-base">{{
        props.label
      }}</span>
    </label>
    <label v-if="topDescription && props.description" class="label">
      <span class="label-text text-gray-500/70">
        {{ props.description }}
      </span>
    </label>
    <slot></slot>
    <label class="label" v-if="!topDescription && props.description">
      <span class="label-text text-gray-500/70">
        {{ props.description }}
      </span>
    </label>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  label: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  topDescription: {
    type: Boolean,
    default: false,
  },
});
</script>

<style></style>

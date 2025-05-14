<template>
  <div class="avatar">
    <div class="h-10 rounded-lg">
      <img
        v-if="props.thumbnail.image"
        :src="props.thumbnail.image"
        alt="order"
        class="h-full w-full"
      />
      <div class="bg-primary-500 h-10 w-10" v-else></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Thumbnail } from "@/types";

const props = defineProps<{ thumbnail: Thumbnail }>();
</script>

<style></style>

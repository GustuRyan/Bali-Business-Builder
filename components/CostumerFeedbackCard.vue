<template>
  <div
    class="border rounded-md flex p-4 gap-4 hover:shadow-lg transition-shadow duration-300 h-full min-h-[200px]"
  >
    <div class="flex-grow-0 h-full">
      <img
        src="/qoute.png"
        alt="qoute"
        class="w-9 h-9 -mt-9"
        loading="lazy"
        height="36"
        width="36"
      />
      <div class="flex-grow flex-shrink h-full flex items-center mt-12">
        <div class="avatar">
          <div class="w-11">
            <img :src="props.image" :alt="props.name" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex-shrink space-y-2">
      <div class="font-bold">
        {{ props.name }}
      </div>
      <div>
        <Rating :rating="props.rating" />
      </div>
      <div class="opacity-50 text-sm line-clamp-6">
        {{ props.description }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  image: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  rating: {
    type: [Number, String],
    default: 1,
  },
});
</script>

<style></style>

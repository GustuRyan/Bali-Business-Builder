<template>
  <div class="flex items-center space-x-1">
    <Icon
      name="i-heroicons-star-20-solid"
      v-for="(ratingItem, index) in ratingsClass"
      :key="index + 'rs'"
      class="text-yellow-300 h-5 w-5"
      :class="[ratingItem]"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  rating: {
    type: [String, Number],
    default: 5,
  },
});

const ratingsClass = computed(() => {
  const maxRating = 5;
  const arrayYellowStar = [];
  const arrayGrayStar = [];

  const rating = props.rating as number;

  for (let i = 0; i < rating; i++) {
    arrayYellowStar.push("text-yellow-300");
  }

  if (arrayYellowStar.length === maxRating) {
    return arrayYellowStar;
  }

  const unStar = maxRating - arrayYellowStar.length;
  for (let i = 0; i < unStar; i++) {
    arrayGrayStar.push("text-gray-300");
  }
  return [...arrayYellowStar, ...arrayGrayStar];
});
</script>

<style></style>

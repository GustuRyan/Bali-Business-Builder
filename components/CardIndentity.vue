<script lang="ts" setup>
import { FormUser } from "@/types";
const props = defineProps<{ person: FormUser }>();
const imageUrl = computed(() => {
  return props.person.selfie_image as string;
});
</script>

<template>
  <div class="card rounded-xl hover:shadow transition-colors duration-300">
    <div>
      <div>
        <div class="w-full h-full flex flex-row space-x-2 p-2">
          <div class="avatar">
            <div class="h-14 rounded-full">
              <img
                :src="imageUrl"
                v-if="imageUrl"
                class="object-cover h-full w-full"
                alt="avatar"
                loading="lazy"
              />
              <div class="w-full h-full bg-gray-500" v-else></div>
            </div>
          </div>
          <div>
            <div class="font-semibold">
              {{ props.person.name }}
            </div>
            <div class="text-sm">
              {{ props.person?.passport_no ?? "xxxxxx" }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

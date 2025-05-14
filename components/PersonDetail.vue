<template>
  <div
    class="grid grid-cols-1 lg:grid-cols-4 gap-4 border rounded-md overflow-hidden p-2"
  >
    <div class="grid grid-cols-2 gap-2 lg:col-span-4">
      <div v-if="props.person.passport_detail_image">
        <img
          :src="(props.person.passport_detail_image as string)"
          alt="passport  detail"
          class="h-full w-full object-cover max-h-48"
        />
      </div>
      <div v-if="props.person.passport_cover_image">
        <img
          :src="(props.person.passport_cover_image as string)"
          alt="passport covert"
          class="h-full w-full object-cover max-h-48"
        />
      </div>
      <div v-if="props.person.selfie_image">
        <img
          :src="(props.person.selfie_image as string)"
          class="h-full w-full object-cover max-h-48"
          alt="selfie covert"
        />
      </div>
      <div v-if="props.person.return_ticket_image">
        <img
          :src="(props.person.return_ticket_image as string)"
          alt="return tiker"
          class="w-full h-full object-cover max-h-48"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FormUser } from "@/types";
const props = defineProps<{ person: FormUser }>();
</script>

<style></style>

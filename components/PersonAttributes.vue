<script lang="ts" setup>
import { FormUser } from "@/types";
const props = defineProps<{ person: FormUser }>();
</script>

<template>
  <div class="space-y-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="card card-compact border">
        <div class="card-body">
          <h3 class="font-semibold">{{ $t("person_txt") }}</h3>
          <Flex :label="$t('name_txt')" :content="props.person.name" />
          <Flex :label="$t('gender_txt')" :content="props.person.gender" />
          <Flex
            :label="$t('date_of_birth_txt')"
            :content="props.person.date_of_birth"
          />
          <Flex
            :label="$t('place_of_birth_txt')"
            :content="props.person.place_of_birth"
          />
          <Flex :label="$t('email_txt')" :content="props.person.email" />
          <Flex :label="$t('phone_txt')" :content="props.person.mobile_phone" />
          <Flex
            :label="$t('citizenship_txt')"
            :content="props.person.citizenship"
          />
        </div>
      </div>
      <div class="card card-compact border">
        <div class="card-body">
          <h3 class="font-semibold">{{ $t("address_txt") }}</h3>
          <Flex :label="$t('country_txt')" :content="props.person.country" />
          <Flex :label="$t('state_txt')" :content="props.person.state" />
          <Flex :label="$t('city_txt')" :content="props.person.city" />
          <Flex :label="$t('postal_code_txt')" :content="props.person.zip" />
          <Flex
            :label="$t('address_txt')"
            :content="props.person.street_address"
            flex-col
          />
          <Flex
            :label="$t('address_2_txt')"
            :content="props.person.street_address2"
            flex-col
          />
        </div>
      </div>

      <div class="card card-compact border">
        <div class="card-body">
          <h3 class="font-semibold">{{ $t("local_address_txt") }}</h3>
          <Flex
            :label="$tc('country_txt')"
            :content="props.person.local_country"
          />
          <Flex :label="$t('state_txt')" :content="props.person.local_state" />
          <Flex :label="$t('city_txt')" :content="props.person.local_city" />
          <Flex
            :label="$t('postal_code_txt')"
            :content="props.person.local_zip"
          />
          <Flex
            :label="$t('address_txt')"
            :content="props.person.local_street_address"
            flex-col
          />
          <Flex
            :label="$t('address_2_txt')"
            :content="props.person.local_street_address2"
            flex-col
          />
        </div>
      </div>
      <div class="card card-compact border">
        <div class="card-body">
          <h3 class="font-semibold">{{ $t("passport_txt") }}</h3>
          <Flex
            :label="$t('passport_no_txt')"
            :content="props.person.passport_no"
          />
          <Flex
            :label="$t('passport_date_of_issued_txt')"
            :content="props.person.passport_date_of_issued"
          />
          <Flex
            :label="$t('passport_place_of_issued_txt')"
            :content="props.person.passport_place_of_issued"
          />
          <Flex
            :label="$t('passport_date_of_expiration_txt')"
            :content="props.person.passport_date_of_expiration"
          />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="card card-compact border" v-if="props.person.selfie_image">
        <div class="card-body overflow-hidden rounded-lg">
          <h3 class="font-semibold">{{ $t("selfie_image_txt") }}</h3>
          <img
            :src="(props.person.selfie_image as string)"
            alt="selfie"
            class="h-full w-full object-contain max-h-[300px]"
          />
        </div>
      </div>
      <div
        class="card card-compact border"
        v-if="props.person.passport_cover_image"
      >
        <div class="card-body overflow-hidden rounded-lg">
          <h3 class="font-semibold">{{ $t("passport_cover_image_txt") }}</h3>
          <img
            :src="(props.person.passport_cover_image as string)"
            alt="cover"
            class="h-full w-full object-contain max-h-[300px]"
          />
        </div>
      </div>
      <div
        class="card card-compact border"
        v-if="props.person.passport_detail_image"
      >
        <div class="card-body overflow-hidden rounded-lg">
          <h3 class="font-semibold">{{ $t("passport_detail_image_txt") }}</h3>
          <img
            :src="(props.person.passport_detail_image as string)"
            alt="detail"
            class="h-full w-full object-contain max-h-[300px]"
          />
        </div>
      </div>
      <div
        class="card card-compact border"
        v-if="props.person.return_ticket_image"
      >
        <div class="card-body overflow-hidden rounded-lg">
          <h3 class="font-semibold">{{ $t("return_tiket_txt") }}</h3>
          <img
            :src="(props.person.return_ticket_image as string)"
            alt="return ticket"
            class="w-full object-contain h-[300px]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

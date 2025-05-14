<script lang="ts" setup>
import { FormUser, GeneralResponse } from "@/types";
import { useTimeoutFn } from "@vueuse/core";
const { locale } = useI18n();

const props = defineProps<{
  personUuid: string;
}>();
const { loading } = useStateRequestHelper();

const { axiosRequest } = useAxios();

const data = ref<GeneralResponse<FormUser>>();

const { start: startRequest, stop: stopRequest } = useTimeoutFn(() => {
  loadData();
}, 1500);

async function loadData() {
  loading.value = true;
  const { data: response }: { data: GeneralResponse<FormUser> } =
    await axiosRequest.get(
      `admins/person-forms/${props.personUuid}?lang=${locale.value}`
    );
  data.value = response;
  loading.value = false;
  stopRequest();
}

onMounted(() => {
  stopRequest();
  startRequest();
});
</script>

<template>
  <div>
    <div v-if="loading">
      <span class="loading loading-spinner loading-xs"></span>
      <span class="loading loading-spinner loading-sm"></span>
      <span class="loading loading-spinner loading-md"></span>
      <span class="loading loading-spinner loading-lg"></span>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8" v-if="data?.data">
      <div class="overflow-y-auto space-y-4 md:max-h-[550px] scroll-smooth">
        <div class="space-y-4">
          <span class="font-semibold text-lg">{{
            $t("customer_identity_txt")
          }}</span>
          <div>
            <div class="opacity-50">{{ $t("passport_name_txt") }}</div>
            <div>
              {{ data.data.name }}
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <div class="opacity-50">{{ $t("gender_txt") }}</div>
              <div>{{ data.data.gender }}</div>
            </div>
            <div>
              <div class="opacity-50">{{ $t("marital_status_txt") }}</div>
              <div>{{ data.data.marital_status }}</div>
            </div>
          </div>
          <div>
            <div class="opacity-50">{{ $t("citizenship_txt") }}</div>
            <div>
              {{ data.data.citizenship }}
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <div class="opacity-50">{{ $t("date_of_birth_txt") }}</div>
              <div>{{ data.data.date_of_birth }}</div>
            </div>
            <div>
              <div class="opacity-50">{{ $t("place_of_birth_txt") }}</div>
              <div>{{ data.data.place_of_birth }}</div>
            </div>
          </div>
        </div>
        <hr />
        <div class="space-y-2">
          <span class="font-semibold text-lg">{{ $t("contact_txt") }}</span>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div class="opacity-50">{{ $t("phone_txt") }}</div>
              <div>{{ data.data.mobile_phone }}</div>
            </div>
            <div>
              <div class="opacity-50">{{ $t("email_txt") }}</div>
              <div>{{ data.data.email }}</div>
            </div>
          </div>
        </div>
        <hr />
        <div class="space-y-4">
          <span class="font-semibold text-lg">{{ $t("passport_txt") }}</span>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <div class="opacity-50">{{ $t("passport_no_txt") }}</div>
              <div>{{ data.data.passport_no }}</div>
            </div>
            <div>
              <div class="opacity-50">
                {{ $t("passport_date_of_issued_txt") }}
              </div>
              <div>{{ data.data.passport_date_of_issued }}</div>
            </div>
            <div>
              <div class="opacity-50">
                {{ $t("passport_place_of_issued_txt") }}
              </div>
              <div>{{ data.data.passport_place_of_issued }}</div>
            </div>
            <div>
              <div class="opacity-50">
                {{ $t("passport_date_of_expiration_txt") }}
              </div>
              <div>
                {{ data.data.passport_date_of_expiration }}
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div class="space-y-4">
          <span class="font-semibold text-lg">{{
            $t("home_address_txt")
          }}</span>
          <div>
            <div class="opacity-50">{{ $t("street_address_txt") }}</div>
            <div>{{ data.data.street_address }}</div>
          </div>
          <div>
            <div class="opacity-50">{{ $t("street_address_2_txt") }}</div>
            <div>{{ data.data.street_address2 }}</div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <div class="opacity-50">{{ $t("city_txt") }}</div>
              <div>{{ data.data.city }}</div>
            </div>
            <div>
              <div class="opacity-50">{{ $t("state_txt") }}</div>
              <div>{{ data.data.state }}</div>
            </div>
            <div>
              <div class="opacity-50">{{ $t("postal_code_txt") }}</div>
              <div>{{ data.data.zip }}</div>
            </div>
            <div>
              <div class="opacity-50">{{ $t("country_txt") }}</div>
              <div>
                {{ data.data.country }}
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div class="space-y-4">
          <span class="font-semibold text-lg">{{
            $t("local_address_txt")
          }}</span>
          <div>
            <div class="opacity-50">{{ $t("street_address_txt") }}</div>
            <div>{{ data.data.local_street_address }}</div>
          </div>
          <div>
            <div class="opacity-50">{{ $t("street_address_2_txt") }}</div>
            <div>{{ data.data.local_street_address2 }}</div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <div class="opacity-50">{{ $t("city_txt") }}</div>
              <div>{{ data.data.local_city }}</div>
            </div>
            <div>
              <div class="opacity-50">{{ $t("state_txt") }}</div>
              <div>{{ data.data.local_state }}</div>
            </div>
            <div>
              <div class="opacity-50">{{ $t("postal_code_txt") }}</div>
              <div>{{ data.data.local_zip }}</div>
            </div>
            <div>
              <div class="opacity-50">{{ $t("country_txt") }}</div>
              <div>
                {{ data.data.local_country }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="space-y-4 overflow-y-auto scroll-smooth">
        <span class="font-semibold text-lg">{{ $t("documents_txt") }}</span>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-if="data.data.onward_ticket_image"
            class="rounded-lg space-y-4"
          >
            <span class="font-semibold text-lg">
              {{ $t("onward_tiket_txt") }}
            </span>
            <div>
              <img
                :src="(data.data.onward_ticket_image as string)"
                alt="details"
                class="md:w-[215px] h-full w-full md:h-[215px] object-cover rounded-lg"
              />
            </div>
          </div>
          <div
            v-if="data.data.evisa_on_arrival_image"
            class="rounded-lg space-y-4"
          >
            <span class="font-semibold text-lg">
              {{ $t("return_tiket_txt") }}
            </span>
            <div>
              <img
                :src="(data.data.evisa_on_arrival_image as string)"
                alt="details"
                class="md:w-[215px] h-full w-full md:h-[215px] object-cover rounded-lg"
              />
            </div>
          </div>
          <div
            v-if="data.data.passport_detail_image"
            class="rounded-lg space-y-4"
          >
            <span class="font-semibold text-lg">
              {{ $t("passport_detail_image_txt") }}
            </span>
            <div>
              <img
                :src="(data.data.passport_detail_image as string)"
                alt="details"
                class="md:w-[215px] h-full w-full md:h-[215px] object-cover rounded-lg"
              />
            </div>
          </div>
          <div
            v-if="data.data.passport_cover_image"
            class="rounded-lg space-y-4"
          >
            <span class="font-semibold text-lg">
              {{ $t("passport_cover_image_txt") }}
            </span>
            <div>
              <img
                :src="(data.data.passport_cover_image as string)"
                alt="details"
                class="md:w-[215px] h-full w-full md:h-[215px] object-cover rounded-lg"
              />
            </div>
          </div>
          <div v-if="data.data.selfie_image" class="rounded-lg space-y-4">
            <span class="font-semibold text-lg">
              {{ $t("selfie_image_txt") }}
            </span>
            <div>
              <img
                :src="(data.data.selfie_image as string)"
                alt="details"
                class="md:w-[215px] h-full w-full md:h-[215px] object-cover rounded-lg"
              />
            </div>
          </div>
          <div
            v-if="data.data.return_ticket_image"
            class="rounded-lg space-y-4"
          >
            <span class="font-semibold text-lg">
              {{ $t("return_tiket_image_txt") }}
            </span>
            <div>
              <img
                :src="(data.data.return_ticket_image as string)"
                alt="details"
                class="md:w-[215px] h-full w-full md:h-[215px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

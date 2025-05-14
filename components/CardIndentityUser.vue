<script lang="ts" setup>
import { FormUser } from "@/types";

const { t: $t, locale } = useI18n();

const router = useRouter();
const props = defineProps<{
  person: FormUser;
  orderSlug: string;
  isAdmin?: boolean;
  paymentStatus?: string;
  orderStatus?: string;
  status?: string;
}>();
const imageUrl = computed(() => {
  return props.person.selfie_image as string;
});

const modal = ref<boolean>(false);
const editMode = ref<boolean>(false);
function openModal() {
  modal.value = true;
}

function closeModal() {
  modal.value = false;
  editMode.value = false;
}

const canEdit = computed(() => {
  if (props.isAdmin) {
    return props.orderStatus === "waiting_for_confirmation";
  } else {
    return (
      props.orderStatus === "waiting_for_confirmation" &&
      props.status === "incomplete"
    );
  }
});

const updateLink = computed(() => {
  if (props.isAdmin) {
    return `/admin/orders/${props.orderSlug}/forms/${props.person.id}/edit?lang=${locale.value}`;
  }
  return `/user/orders/${props.orderSlug}/form/${props.person.id}?lang=${locale.value}`;
});

function openModalWithEdit() {
  router.push(updateLink.value);
}
</script>

<template>
  <div>
    <div class="card rounded-xl border-2 transition-colors duration-300">
      <div>
        <div>
          <div class="w-full h-full flex flex-row items-center space-x-4 p-2">
            <div class="avatar">
              <div class="h-14 rounded-full">
                <img
                  :src="imageUrl"
                  class="object-cover h-full w-full"
                  alt="avatar"
                  v-if="imageUrl"
                />
                <div class="w-full h-full bg-gray-500" v-else></div>
              </div>
            </div>
            <div class="grow space-y-2">
              <div class="font-semibold">
                {{ props.person.name }}
              </div>
              <div class="text-sm opacity-50">
                {{ props.person?.passport_no ?? "xxxxxx" }}
              </div>
              <FormStatus :status="props.status" />
            </div>
            <div class="join">
              <button
                class="btn btn-ghost join-item btn-square btn-sm h-11"
                type="button"
                @click="openModal"
              >
                <Icon name="i-heroicons-eye" class="h-6 w-6" />
              </button>
              <button
                v-if="canEdit"
                type="button"
                @click="openModalWithEdit"
                class="btn btn-ghost join-item btn-square btn-sm h-11"
              >
                <Icon name="i-heroicons-pencil" class="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <ModalBase v-model="modal" class="max-w-7xl">
        <div class="card card-compact space-y-4">
          <div class="card-body">
            <div class="flex justify-end">
              <div class="-mt-10 -right-10 w-fit">
                <button
                  type="button"
                  @click="closeModal"
                  class="btn btn-ghost btn-square rounded-full"
                >
                  <Icon name="i-heroicons-x-circle" class="h-6 w-6" />
                </button>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div
                class="overflow-y-auto space-y-4 md:max-h-[550px] scroll-smooth"
              >
                <div class="space-y-4">
                  <span class="font-semibold text-lg">{{
                    $t("indentity_txt")
                  }}</span>
                  <div
                    v-if="
                      props.person.incomplete_message &&
                      props.status === 'incomplete'
                    "
                  >
                    <div>{{ $t("incompleted_message_txt") }}</div>
                    <div class="bg-red-100 p-2 rounded-lg">
                      {{ props.person.incomplete_message }}
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <div class="opacity-50">
                        {{ $t("passport_name_txt") }}
                      </div>
                      <div>
                        {{ props.person.name }}
                      </div>
                    </div>
                    <div>
                      <div class="opacity-50">{{ $t("status_txt") }}</div>
                      <div>
                        <FormStatus :status="props.status" />
                      </div>
                    </div>
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <div class="opacity-50">{{ $t("gender_txt") }}</div>
                      <div>{{ props.person.gender }}</div>
                    </div>
                    <div>
                      <div class="opacity-50">
                        {{ $t("marital_status_txt") }}
                      </div>
                      <div>{{ props.person.marital_status }}</div>
                    </div>
                  </div>
                  <div>
                    <div class="opacity-50">
                      {{ $t("citizenship_txt") }}
                    </div>
                    <div>
                      {{ props.person.citizenship }}
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <div class="opacity-50">
                        {{ $t("date_of_birth_txt") }}
                      </div>
                      <div>{{ props.person.date_of_birth }}</div>
                    </div>
                    <div>
                      <div class="opacity-50">
                        {{ $t("place_of_birth_txt") }}
                      </div>
                      <div>{{ props.person.place_of_birth }}</div>
                    </div>
                  </div>
                </div>
                <hr />
                <div class="space-y-2">
                  <span class="font-semibold text-lg">{{
                    $t("contact_txt")
                  }}</span>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div class="opacity-50">{{ $t("phone_txt") }}</div>
                      <div>{{ props.person.mobile_phone }}</div>
                    </div>
                    <div>
                      <div class="opacity-50">{{ $t("email_txt") }}</div>
                      <div>{{ props.person.email }}</div>
                    </div>
                  </div>
                </div>
                <hr />
                <div class="space-y-4">
                  <span class="font-semibold text-lg">{{
                    $t("passport_txt")
                  }}</span>

                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <div class="opacity-50">
                        {{ $t("passport_no_txt") }}
                      </div>
                      <div>{{ props.person.passport_no }}</div>
                    </div>
                    <div>
                      <div class="opacity-50">
                        {{ $t("passport_date_of_issued_txt") }}
                      </div>
                      <div>{{ props.person.passport_date_of_issued }}</div>
                    </div>
                    <div>
                      <div class="opacity-50">
                        {{ $t("passport_place_of_issued_txt") }}
                      </div>
                      <div>{{ props.person.passport_place_of_issued }}</div>
                    </div>
                    <div>
                      <div class="opacity-50">
                        {{ $t("passport_date_of_expiration_txt") }}
                      </div>
                      <div>
                        {{ props.person.passport_date_of_expiration }}
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
                    <div class="opacity-50">
                      {{ $t("street_address_txt") }}
                    </div>
                    <div>{{ props.person.street_address }}</div>
                  </div>
                  <div>
                    <div class="opacity-50">
                      {{ $t("street_address_2_txt") }}
                    </div>
                    <div>{{ props.person.street_address2 }}</div>
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <div class="opacity-50">{{ $t("city_txt") }}</div>
                      <div>{{ props.person.city }}</div>
                    </div>
                    <div>
                      <div class="opacity-50">{{ $t("state_txt") }}</div>
                      <div>{{ props.person.state }}</div>
                    </div>
                    <div>
                      <div class="opacity-50">
                        {{ $t("postal_code_txt") }}
                      </div>
                      <div>{{ props.person.zip }}</div>
                    </div>
                    <div>
                      <div class="opacity-50">{{ $t("country_txt") }}</div>
                      <div>
                        {{ props.person.country }}
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
                    <div class="opacity-50">
                      {{ $t("street_address_txt") }}
                    </div>
                    <div>{{ props.person.local_street_address }}</div>
                  </div>
                  <div>
                    <div class="opacity-50">
                      {{ $t("street_address_2_txt") }}
                    </div>
                    <div>{{ props.person.local_street_address2 }}</div>
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <div class="opacity-50">{{ $t("city_txt") }}</div>
                      <div>{{ props.person.local_city }}</div>
                    </div>
                    <div>
                      <div class="opacity-50">{{ $t("state_txt") }}</div>
                      <div>{{ props.person.local_state }}</div>
                    </div>
                    <div>
                      <div class="opacity-50">
                        {{ $t("postal_code_txt") }}
                      </div>
                      <div>{{ props.person.local_zip }}</div>
                    </div>
                    <div>
                      <div class="opacity-50">{{ $t("country_txt") }}</div>
                      <div>
                        {{ props.person.local_country }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="space-y-4 overflow-y-auto scroll-smooth">
                <span class="font-semibold text-lg">{{
                  $t("documents_txt")
                }}</span>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    v-if="props.person.passport_detail_image"
                    class="rounded-lg space-y-4"
                  >
                    <span class="font-semibold text-lg">
                      {{ $t("passport_detail_image_txt") }}
                    </span>
                    <div>
                      <img
                        :src="(props.person.passport_detail_image as string)"
                        alt="details"
                        class="md:w-[215px] h-full w-full md:h-[215px] object-cover rounded-lg"
                      />
                    </div>
                  </div>
                  <div
                    v-if="props.person.passport_cover_image"
                    class="rounded-lg space-y-4"
                  >
                    <span class="font-semibold text-lg">
                      {{ $t("passport_cover_image_txt") }}
                    </span>
                    <div>
                      <img
                        :src="(props.person.passport_cover_image as string)"
                        alt="details"
                        class="md:w-[215px] h-full w-full md:h-[215px] object-cover rounded-lg"
                      />
                    </div>
                  </div>
                  <div
                    v-if="props.person.selfie_image"
                    class="rounded-lg space-y-4"
                  >
                    <span class="font-semibold text-lg">
                      {{ $t("selfie_image_txt") }}
                    </span>
                    <div>
                      <img
                        :src="(props.person.selfie_image as string)"
                        alt="details"
                        class="md:w-[215px] h-full w-full md:h-[215px] object-cover rounded-lg"
                      />
                    </div>
                  </div>
                  <div
                    v-if="props.person.return_ticket_image"
                    class="rounded-lg space-y-4"
                  >
                    <span class="font-semibold text-lg">
                      {{ $t("return_tiket_image_txt") }}
                    </span>
                    <div>
                      <img
                        :src="(props.person.return_ticket_image as string)"
                        alt="details"
                        class="md:w-[215px] h-full w-full md:h-[215px] object-cover rounded-lg"
                      />
                    </div>
                  </div>
                  <div
                    v-if="props.person.onward_ticket_image"
                    class="rounded-lg space-y-4"
                  >
                    <span class="font-semibold text-lg">
                      {{ $t("onward_tiket_txt") }}
                    </span>
                    <div>
                      <img
                        :src="(props.person.onward_ticket_image as string)"
                        alt="details"
                        class="md:w-[215px] h-full w-full md:h-[215px] object-cover rounded-lg"
                      />
                    </div>
                  </div>
                  <div
                    v-if="props.person.evisa_on_arrival_image"
                    class="rounded-lg space-y-4"
                  >
                    <span class="font-semibold text-lg">
                      {{ $t("e_visa_on_arrival_txt") }}
                    </span>
                    <div>
                      <img
                        :src="(props.person.evisa_on_arrival_image as string)"
                        alt="details"
                        class="md:w-[215px] h-full w-full md:h-[215px] object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr v-if="canEdit" />
          <div class="card-actions" v-if="canEdit">
            <NuxtLink
              no-prefetch
              :to="updateLink"
              class="btn btn-neutral rounded-full btn-sm h-11"
            >
              {{ $t("update_identity_txt") }}
            </NuxtLink>
          </div>
        </div>
      </ModalBase>
    </div>
  </div>
</template>

<style></style>

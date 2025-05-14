<script lang="ts" setup>
import { OrderDetail, GeneralResponse } from "@/types";
import { useDateFormat } from "@vueuse/core";
const { formatCurrency } = useMoneyFormat();

const { locale } = useI18n();

const {
  modal: confirmModal,
  openModal: openConfirmModal,
  closeModal: closeConfirmModal,
} = useModal();

const {
  modal: declineModal,
  openModal: openDeclineModal,
  closeModal: closeDeclineModal,
} = useModal();

const {
  modal: completedOrder,
  openModal: openCompletedModal,
  closeModal: closeCompletedModal,
} = useModal();

const route = useRoute();

const uuid = computed(() => {
  return route.params.uuid as string;
});

const { data, pending, refresh } = await useCustomFetch<
  GeneralResponse<OrderDetail>
>(`/admins/orders/${uuid.value}?lang=${locale.value}`, {
  method: "GET",
});
const date = useDateFormat(data.value?.data?.created_at, "YYYY MMMM DD");

function times(firstVallue: number, lastValue: number) {
  return firstVallue * lastValue;
}

function reload() {
  closeConfirmModal();
  closeDeclineModal();
  closeCompletedModal();
  refresh();
}

useHead({
  title: uuid.value as string,
});

definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: ["auth", "admin"],
});
</script>

<template>
  <div>
    <Container v-if="!pending" class="py-16 space-y-8">
      <div class="card card-compact rounded-lg">
        <div class="card-body space-y-4">
          <div class="flex justify-between items-center">
            <div class="flex flex-row items-center">
              <div>
                <NuxtLink to="/admin/orders">
                  <Icon name="i-heroicons-arrow-left" class="h-6 w-6" />
                </NuxtLink>
              </div>
              <div class="flex flex-col">
                <span class="font-bold text-lg"> #{{ data?.data.uuid }} </span>
                <span class="text-sm">{{ date }}</span>
              </div>
            </div>
            <div>
              <VMenu>
                <button type="button" class="btn rounded-full normal-case px-5">
                  {{ $t("action_txt") }}
                  <Icon name="i-heroicons-chevron-down" class="h-5 w-5" />
                </button>
                <template #popper>
                  <div>
                    <ul class="menu w-64" v-if="data?.data.status === 'waiting_for_confirmation'">
                      <li>
                        <button type="button" @click="openConfirmModal()">
                          <Icon name="i-heroicons-check-circle" class="w-5 h-5" />
                          {{ $t("confirm_order_txt") }}
                        </button>
                      </li>
                      <li>
                        <button type="button" @click="openDeclineModal()">
                          <Icon name="i-heroicons-x-circle" class="w-5 h-5" />
                          {{ $t("decline_order_txt") }}
                        </button>
                      </li>
                    </ul>
                    <ul class="menu w-64" v-if="data?.data.status === 'order_processed'">
                      <li>
                        <button type="button" @click="openCompletedModal()">
                          <Icon name="i-heroicons-check-circle" class="w-5 h-5" />
                          {{ $t("complete_order_txt") }}
                        </button>
                      </li>
                    </ul>

                    <hr />
                    <ul class="menu w-64">
                      <li v-if="data?.data.user?.email">
                        <a :href="`mailto:${data?.data.user?.email}`" target="_blank">
                          <Icon name="i-heroicons-envelope" class="w-5 h-5" />
                          {{ $t("contact_via_email_txt") }}
                        </a>
                      </li>
                      <li v-if="data?.data.user?.mobile_number">
                        <a :href="`https://wa.me/${data?.data.user?.mobile_number}`" target="_blank">
                          <Icon name="i-logos-whatsapp-icon" class="w-5 h-5" />
                          {{ $t("contact_via_whatsapp_txt") }}
                        </a>
                      </li>
                    </ul>
                  </div>
                </template>
              </VMenu>
            </div>
          </div>

          <div class="inline-flex space-x-2 items-center">
            <span class="font-bold text-lg">{{ $t("current_status_txt") }}:
            </span>
            <OrderStatus :status="data?.data.status" />
          </div>

          <hr />

          <div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-4">
                <span class="font-bold text-lg">{{
                  $t("order_information_txt")
                }}</span>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <div class="opacity-50">{{ $t("service_txt") }}</div>
                    <div>
                      {{ data?.data.details[0].name }}
                    </div>
                  </div>
                  <div>
                    <div class="opacity-50">{{ $t("quantity_txt") }}</div>
                    <div>{{ data?.data.details[0].quantity }}</div>
                  </div>
                  <div v-if="data?.data.details[0]?.variant_name">
                    <div class="opacity-50">
                      {{ $t("validity_period_txt") }}
                    </div>
                    <div>{{ data?.data.details[0]?.variant_name }}</div>
                  </div>
                  <div v-if="data?.data.arrive_at">
                    <div class="opacity-50 whitespace-nowrap">
                      {{ $t("date_arrive_in_indonesia_txt") }}
                    </div>
                    <div>{{ data?.data.arrive_at }}</div>
                  </div>
                  <div v-if="data?.data.visa_validation_end_at">
                    <div class="opacity-50 whitespace-nowrap">
                      {{ $t("visa_valid_until_txt") }}
                    </div>
                    <div>{{ data?.data.visa_validation_end_at }}</div>
                  </div>
                  <div v-if="data?.data.pickup_address">
                    <div class="opacity-50 whitespace-nowrap">
                      {{ $t("pickup_address_txt") }}
                    </div>
                    <div>{{ data?.data.pickup_address }}</div>
                  </div>
                  <div v-if="data?.data.deliver_address">
                    <div class="opacity-50 whitespace-nowrap">
                      {{ $t("delivery_address_txt") }}
                    </div>
                    <div>{{ data?.data.deliver_address }}</div>
                  </div>
                  <div>
                    <div class="opacity-50 whitespace-nowrap">
                      {{ $t('take_for_other_txt') }}
                    </div>
                    <div>{{ data?.data.is_for_other_person ? $t("yes_txt") : $t("no_txt") }}</div>
                  </div>
                </div>
              </div>
              <div class="space-y-4">
                <span class="font-bold text-lg">{{
                  $t("contact_information_txt")
                }}</span>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <div class="opacity-50">{{ $t("first_name_txt") }}</div>
                    <div>{{ data?.data.user?.first_name }}</div>
                  </div>
                  <div>
                    <div class="opacity-50">{{ $t("last_name_txt") }}</div>
                    <div>
                      {{ data?.data.user?.last_name }}
                    </div>
                  </div>
                  <div class="col-span-2 md:col-span-1">
                    <div class="opacity-50">{{ $t("email_txt") }}</div>
                    <div class="whitespace-nowrap">
                      {{ data?.data.user?.email }}
                    </div>
                  </div>
                  <div>
                    <div class="opacity-50">{{ $t("phone_txt") }}</div>
                    <div class="whitespace-nowrap">
                      {{ data?.data.user?.mobile_number ?? "-" }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />

          <div class="space-y-4">
            <span class="font-bold text-lg">{{ $t("indentity_txt") }}</span>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CardIndentityUser v-for="(person, index) in data?.data.person_forms" :key="index" :person="person"
                :order-slug="(uuid as string)" is-admin :payment-status="data?.data.payment_status"
                :status="person.status" :order-status="data?.data.status" />
            </div>
          </div>
          <hr />

          <div class="overflow-x-auto">
            <table class="table">
              <!-- head -->

              <tbody>
                <!-- row 1 -->
                <tr>
                  <td class="font-bold">{{ $t("item_txt") }}</td>
                  <td>{{ $t("price_txt") }}</td>
                  <td>{{ $t("total_txt") }}</td>
                </tr>
                <!-- row 2 -->
                <tr>
                  <td class="font-bold">
                    {{ data?.data.details[0].name }}
                  </td>
                  <td>
                    {{ data?.data.details[0].quantity }} X
                    {{ formatCurrency(data?.data.details[0].usd_price) }}
                  </td>
                  <td>
                    {{
                      formatCurrency(
                        times(
                          data?.data.details[0].quantity as number,
                          data?.data.details[0].usd_price as number
                        )
                      )
                    }}
                  </td>
                </tr>
                <tr>
                  <td class="font-bold">{{ $t("express_txt") }}</td>
                  <td>
                    <div v-if="data?.data.details[0].express_usd_price">
                      {{ data?.data.details[0].quantity }} X
                      {{ formatCurrency(data?.data.details[0].express_usd_price) }}
                    </div>
                  </td>
                  <td>
                    <div v-if="data?.data.details[0].express_usd_price">
                      {{
                        formatCurrency(
                          times(
                            data?.data.details[0].quantity as number,
                            data?.data.details[0].express_usd_price as number
                          )
                        )
                      }}
                    </div>
                  </td>
                </tr>
                <tr class="border-b-2 border-black">
                  <td class="font-bold">{{ $t("discount_txt") }}</td>
                  <td></td>
                  <td>
                    {{ formatCurrency(data?.data.promo_amount) }}
                  </td>
                </tr>
                <tr>
                  <td class="font-bold">{{ $t("total_txt") }}</td>
                  <td></td>
                  <td class="font-bold">
                    {{ formatCurrency(data?.data.grand_total_purchased) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Container>
    <ModalBase v-model="confirmModal">
      <div class="flex justify-between items-center">
        <div>
          <h3 class="text-lg font-bold">{{ $t("confirm_order_txt") }}</h3>
        </div>
        <div>
          <button type="button" class="btn btn-square btn-xs rounded-full" @click="closeConfirmModal()">
            <Icon name="i-heroicons-x-mark" />
          </button>
        </div>
      </div>
      <ConfirmOrder :order-id="uuid" @reload="reload" @close="closeConfirmModal()" />
    </ModalBase>

    <ModalBase v-model="declineModal">
      <div class="flex justify-between items-center">
        <div>
          <h3 class="text-lg font-bold">{{ $t("decline_order_txt") }}</h3>
        </div>
        <div>
          <button type="button" class="btn btn-square btn-xs rounded-full" @click="closeDeclineModal()">
            <Icon name="i-heroicons-x-mark" />
          </button>
        </div>
      </div>
      <ConfirmDeclineOrder :order-id="uuid" @reload="reload" @close="closeDeclineModal()" />
    </ModalBase>

    <ModalBase v-model="completedOrder">
      <div class="flex justify-between items-center">
        <div>
          <h3 class="text-lg font-bold">{{ $t("confirm_order_txt") }}</h3>
        </div>
        <div>
          <button type="button" class="btn btn-square btn-xs rounded-full" @click="closeCompletedModal()">
            <Icon name="i-heroicons-x-mark" />
          </button>
        </div>
      </div>
      <ConfirmToDoneOrder :order-id="uuid" @reload="reload" @close="closeCompletedModal()" />
    </ModalBase>
  </div>
</template>

<style></style>

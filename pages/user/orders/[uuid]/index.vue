<script lang="ts" setup>
import { OrderDetail, GeneralResponse } from "@/types";
import { useDateFormat } from "@vueuse/core";
const { formatCurrency } = useMoneyFormat();
const { gapPencen, countPencen } = useCountPercen();

const { modal, openModal } = useModal();

const { locale } = useI18n();

const route = useRoute();
const { $user } = useAuth();

const uuid = computed(() => {
  return route.params.uuid;
});

const { data, pending, refresh } = await useCustomFetch<
  GeneralResponse<OrderDetail>
>(`users/${$user.value?.uuid}/orders/${uuid.value}?lang=${locale.value}`, {
  method: "GET",
});
const date = useDateFormat(data.value?.data?.created_at, "YYYY MMMM DD");

function times(firstVallue: number, lastValue: number) {
  return firstVallue * lastValue;
}

function allModalClose() {
  modal.value = false;
}

function reload() {
  allModalClose();
  refresh();
}
/**
 * detemine if can cancel order
 *
 */
const canCancelOrder = computed(() => {
  return data.value?.data.status === "waiting_for_payment";
});

/**
 * determine if can pay the order
 *
 */
const canPayOrder = computed(() => {
  return data.value?.data.status === "waiting_for_payment";
});

useHead({
  title: uuid.value as string,
});

definePageMeta({
  layout: "user",
  // @ts-ignore
  middleware: ["auth", "user"],
});
</script>

<template>
  <div>
    <Container v-if="!pending" class="py-16 space-y-8">
      <div class="card card-compact rounded-lg border shadow">
        <div class="card-body space-y-4">
          <div class="flex justify-between items-center">
            <div class="flex flex-row items-center">
              <div>
                <NuxtLink to="/user">
                  <Icon name="i-heroicons-chevron-left" class="h-6 w-6" />
                </NuxtLink>
              </div>
              <div class="flex flex-col">
                <span class="font-semibold text-lg">
                  #{{ data?.data.uuid }}
                </span>
                <span class="text-sm">{{ date }}</span>
              </div>
            </div>
            <div class="flex flex-row space-x-2">
              <OrderStatus :status="data?.data.status" />
              <template v-if="canCancelOrder">
                <button type="button" @click="openModal" class="btn btn-error btn-xs h-9 px-4">
                  {{ $t("cancel_order_txt") }}
                </button>
              </template>
            </div>
          </div>

          <hr class="hidden" />
          <div class="space-y-4 hidden">
            <span class="text-error font-bold text-lg"> Rejected reason </span>
            <div class="italic">
              The document for passport that you sent to us not correct, please
              retry to upload again your document.
            </div>
            <div class="italic">
              Important : to refund your money, please come to our office at
              office hours or
              <nuxt-link to="/contact-us" class="text-primary-600">contact us here</nuxt-link>
            </div>
          </div>

          <hr class="hidden" />
          <div class="space-y-4 hidden">
            <span class="text-success font-bold text-lg">
              You’re visa completed
            </span>
            <div class="italic">
              Please come to our office around 10 Aug - 15 Aug to get your visa
            </div>
          </div>
          <template v-if="data?.data && canPayOrder">
            <OrderPaymentCountDown :expiration-time="data?.data.payment.expired_at" :order-uuid="data?.data.uuid"
              :payment="data?.data.payment" />
          </template>

          <hr />
          <div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-4">
                <span class="font-semibold text-lg">{{
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
                <span class="font-semibold text-lg">{{
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
            <span class="font-semibold text-lg">{{ $t("indentity_txt") }}</span>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CardIndentityUser v-for="(person, index) in data?.data.person_forms" :key="index" :person="person"
                :order-slug="(uuid as string)" :order-status="data?.data.status" :status="person.status" />
            </div>
          </div>
          <hr />
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                        {{
                          formatCurrency(data?.data.details[0].express_usd_price)
                        }}
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
                    <td class="font-bold">Total</td>
                    <td></td>
                    <td class="font-bold">
                      {{ formatCurrency(data?.data.grand_total_purchased) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <EstimateDoc :date="data?.data.estimated_day_at" />
            </div>
          </div>
        </div>
      </div>
    </Container>
    <ModalBase v-model="modal" class="p-0 rounded-lg w-10/12 max-w-xl">
      <div class="card card-compact border rounded-lg">
        <div class="card-body">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-lg font-bold">{{ $t("cancel_order_txt") }}</h3>
            </div>
            <div class="hidden">
              <button type="button" class="btn btn-square btn-xs rounded-full" @click="allModalClose">
                <Icon name="i-heroicons-x-mark" />
              </button>
            </div>
          </div>
          <template v-if="data?.data">
            <ConfirmCancelOrder :order-id="data?.data.uuid" @close="allModalClose" @reload="reload" />
          </template>
        </div>
      </div>
    </ModalBase>
  </div>
</template>

<style></style>

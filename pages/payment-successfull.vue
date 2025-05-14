<template>
  <div>
    <ResizeContainer>
      <Container>
        <div class="text-center max-w-lg mx-auto space-y-8 mt-10">
          <h1
            class="text-[42px] leading-[52px]"
            v-html="$t('title_payment_success_txt')"
          ></h1>
          <div>
            <p class="text-sm opacity-50">
              {{ $t("desc_payment_success_txt") }}
            </p>
          </div>

          <div>
            <WhatsAppBtn />
          </div>

          <div class="max-w-md mx-auto pt-10">
            <div class="card border">
              <div class="card-body">
                <img
                  class="h-28 w-28 mx-auto -mt-16"
                  src="/payment-shield.png"
                  alt="shield payment"
                />

                <div class="space-y-4 text-center">
                  <h4>Order No {{ orderUUID }}</h4>
                  <div class="text-sm opacity-50">
                    {{ $t("desc_2_payment_success_txt") }}
                  </div>
                </div>
                <div class="space-y-4">
                  <div
                    class="rounded-full bg-amber-200 flex flex-row space-x-2 items-center"
                  >
                    <div
                      class="bg-amber-500 shrink-1 rounded-full text-white text-sm px-2 flex items-center justify-center py-1"
                    >
                      {{ $t("important_txt") }}
                    </div>
                    <div class="text-xs text-amber-700">
                      {{ $t("quick_setup_account_txt") }}
                    </div>
                  </div>
                  <NuxtLink
                    to="/sign-in"
                    no-prefetch
                    class="btn btn-block btn-neutral rounded-full"
                  >
                    {{ $t("setup_my_account_txt") }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </ResizeContainer>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const orderUUID = computed(() => {
  return route.query.order as string;
});

useHead({
  title: "Payment Success",
});
</script>

<style></style>

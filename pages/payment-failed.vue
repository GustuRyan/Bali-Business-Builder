<template>
  <div>
    <ResizeContainer>
      <Container>
        <div class="text-center max-w-lg mx-auto space-y-8 mt-10">
          <h1 class="text-[42px] leading-[52px] text-error">Payment failed!</h1>
          <div>
            <p class="text-sm opacity-50">
              {{ $t("order_failed_txt") }}
              <a href="mailto:info@balivisaofficial.com">
                info@balivisaofficial.com
              </a>
            </p>
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
                  <div class="text-sm opacity-50"></div>
                </div>
                <div class="space-y-4">
                  <NuxtLink
                    to="/"
                    class="btn btn-block btn-neutral rounded-full"
                  >
                    {{ $t("homepage_txt") }}
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
  title: "Payment failed",
});
</script>

<style></style>

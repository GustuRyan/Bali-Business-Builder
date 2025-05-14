<template>
  <div class="border-t bg-black text-slate-300 py-16 relative overflow-hidden">
    <div class="absolute z-10 w-full">
      <Container class="flex flex-col space-y-12">
        <div class="space-y-14">
          <div class="text-center space-y-6">
            <h3 class="text-[32px] leading-9">
              {{ $t("footer_title") }}
            </h3>
            <p class="opacity-50 leading-5">
              {{ $t("footer_sub_title") }}
            </p>
            <div class="inline-flex items-center space-x-3">
              <NuxtLink no-prefetch to="/services" class="btn rounded-full">
                <Icon name="i-heroicons-magnifying-glass" class="h-6 w-6" />
                {{ $t("btn_find_services") }}
              </NuxtLink>
              <NuxtLink no-prefetch to="/contact-us" class="btn btn-primary rounded-full">
                {{ $t("btn_consult_txt") }}
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="h-[2px] w-full bg-white/50"></div>
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div class="col-span-1 md:col-span-2">
            <div class="flex flex-col space-y-2">
              <NuxtLink to="/" class="flex items-center gap-4">
                <img class="w-20" src="/logo-visas-white.png" alt="logo" />
                <span class="w-32 text-xl font-bold text-white">
                  Bali Business Builder
                </span>
              </NuxtLink>
              <p class="opacity-50 max-w-sm leading-5">
                {{ $t("moto_desc") }}
              </p>
            </div>
          </div>
          <div class="contents gap-4">
            <div class="space-y-4">
              <h5 class="font-bold">{{ $t("address_txt") }}</h5>
              <div class="text-sm space-y-4">
                <div>
                  Jln Legian No.475, Legian, Kuta, Badung Regency, Bali 80361
                </div>
                <div>Open Hours: Monday - Friday 8 AM - 5 PM</div>
              </div>
            </div>
            <div class="space-y-4">
              <h5 class="font-bold">{{ $t("contact_txt") }}</h5>
              <div class="text-sm">
                <ul class="space-y-2">
                  <li>
                    <a href="https://api.whatsapp.com/send/?phone=6287866244350&text&type=phone_number&app_absent=0"
                      target="_blank">
                      +62 859 338 809 03
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@balivisaofficial.com" target="_blank">
                      info@balibusinessbuilders.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="space-y-4">
              <h5 class="font-bold">{{ $t("social_media_txt") }}</h5>
              <div class="text-sm">
                <ul class="space-y-2">
                  <li>
                    <a href="www.facebook.com" target="_blank"> Facebook </a>
                  </li>
                  <li>
                    <a href="www.instagram.com" target="_blank"> Instagram </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="h-[2px] w-full bg-white/50"></div>
        <div class="flex flex-col md:flex-row gap-2 justify-center md:justify-between py-4 text-sm opacity-50">
          <div>
            <div>
              <p class="font-normal text-white">
                Copyright © Bali Business Builder Official {{ currentYear }}
              </p>
            </div>
          </div>
          <div>
            <p>
              Design and Develop by
              <a href="https://spdigitalagency.com/" target="_blank">
                s.p Digital
              </a>
            </p>
          </div>
        </div>
      </Container>
    </div>

    <div class="h-full w-full min-h-[930px] md:min-h-[720px] lg:min-h-[520px]">
      <div
        class="h-72 w-72 rounded-full bg-gradient-to-tr from-white/30 blur-2xl to-black/50 -right-24 -top-28 float-right absolute">
      </div>
      <div
        class="h-60 w-60 rounded-full bg-gradient-to-tr from-white/30 blur-2xl to-black/50 -top-28 left-[20%] absolute hidden md:block">
      </div>
      <div
        class="h-96 w-9/12 rounded-full bg-gradient-to-tr from-white/30 blur-2xl to-black/50 -bottom-48 left-[30%] absolute">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const currentYear = computed(() => {
  return new Date().getFullYear();
});
</script>

<style></style>

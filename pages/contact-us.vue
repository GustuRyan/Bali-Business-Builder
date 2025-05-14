<template>
  <div>
    <div class="relative z-0 min-h-[450px] inline-block w-full">
      <div
        class="absolute z-20 flex w-full min-h-[600px] xl:min-h-full isolate"
      >
        <div
          class="static z-50 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-white pt-32"
        >
          <div class="grid place-content-center">
            <div class="space-y-8">
              <img
                src="/icon-envelope-check.png"
                class="h-24 w-36 object-contain mx-auto"
                alt="hero"
              />
              <h1 class="font-bold text-4xl md:text-[50px] text-center">
                {{ $t("contact_us_txt") }}
              </h1>
              <div class="max-w-xl text-center">
                <p class="opacity-50 leading-5">
                  {{ $t("contact.sub_desc_txt") }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="xl:opacity-100 -z-50 inset-0">
        <div class="relative">
          <div
            class="absolute w-full h-full bg-gradient-to-b from-black/80 from-60% to-black/50 z-10"
          ></div>
          <NuxtImg
            src="/contact-hero.png"
            class="w-full h-full min-h-[600px] xl:min-h-full object-cover pointer-events-none isolate"
            alt="hero-background"
            loading="lazy"
            densities="x1 x2"
            format="webp"
          />
        </div>
      </div>
    </div>
    <Container class="py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">
        <div class="space-y-10">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!--email section -->
            <div
              class="flex flex-col space-y-3 p-2 group hover:bg-neutral-100 rounded-lg transition-colors duration-300"
            >
              <div
                class="group-hover:bg-primary-100 max-w-max group-hover:p-1 flex items-center rounded-full transition-all duration-300"
              >
                <Icon
                  name="i-heroicons-envelope"
                  class="text-primary-600 h-6 w-6"
                />
              </div>
              <div class="font-bold">{{ $t("email_txt") }}</div>
              <div class="opacity-50">{{ $t("contact.email_helper_txt") }}</div>
              <div class="text-primary-600">
                <a
                  href="mailto:info@balivisaofficial.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  info@balivisaofficial.com
                </a>
              </div>
            </div>
            <!-- end of email section -->

            <!-- phone section -->
            <div
              class="flex flex-col space-y-3 p-2 group hover:bg-neutral-100 rounded-lg"
            >
              <div
                class="group-hover:bg-primary-100 max-w-max group-hover:p-1 flex items-center rounded-full transition-all duration-300"
              >
                <Icon
                  name="i-heroicons-phone"
                  class="text-primary-600 h-6 w-6"
                />
              </div>
              <div class="font-bold">{{ $t("phone_txt") }}</div>
              <div class="opacity-50">{{ $t("contact.phone_helper_txt") }}</div>
              <div class="text-primary-600">
                <a
                  href="https://api.whatsapp.com/send/?phone=6287866244350&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +62 878 662 443 50
                </a>
              </div>
            </div>
            <!-- end of phone section -->
            <!-- office section -->
            <div
              class="flex flex-col space-y-3 p-2 group hover:bg-neutral-100 rounded-lg"
            >
              <div
                class="group-hover:bg-primary-100 max-w-max group-hover:p-1 flex items-center rounded-full transition-all duration-300"
              >
                <Icon
                  name="i-heroicons-map-pin"
                  class="text-primary-600 h-6 w-6"
                />
              </div>
              <div class="font-bold">{{ $t("office_txt") }}</div>
              <div class="opacity-50">
                {{ $t("contact.office_helper_txt") }}
              </div>
              <div class="text-primary-600">
                <a
                  href="http:google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Jalan Legian Keja No.475
                </a>
              </div>
            </div>
            <!-- end of office section -->
            <!-- opening hour section -->
            <div
              class="flex flex-col space-y-3 p-2 group hover:bg-neutral-100 rounded-lg"
            >
              <div
                class="group-hover:bg-primary-100 max-w-max group-hover:p-1 flex items-center rounded-full transition-all duration-300"
              >
                <Icon
                  name="i-heroicons-square-2-stack"
                  class="text-primary-600 h-6 w-6"
                />
              </div>
              <div class="font-bold">{{ $t("opening_hours_txt") }}</div>
              <div class="opacity-50">{{ $t("opening_hours_helper_txt") }}</div>
              <div class="text-primary-600">
                {{ $t("opening_hours_desc_txt") }}
              </div>
            </div>
            <!-- end of opening hour section -->
          </div>
        </div>
        <div class="px-0 lg:px-8">
          <FormContact />
        </div>
      </div>
    </Container>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: "Contact Us",
});
</script>

<style></style>

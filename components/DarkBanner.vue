<template>
  <div class="border-t bg-black text-slate-300 relative overflow-hidden">
    <div class="absolute z-10 w-full">
      <div class="relative flex">
        <img
          src="/background-grid-small.png"
          class="h-full w-full object-cover md:min-h-[520px] lg:min-h-[720px]"
          alt="image grid"
        />
        <div class="absolute z-10 mx-auto w-full h-full py-8">
          <Container class="">
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-8">
              <div
                class="space-y-8 pt-36 text-center col-span-1 md:text-left md:col-span-2 lg:col-span-1"
              >
                <h3
                  class="font-bold text-4xl leading-10 lg:text-[52px] lg:leading-[65.52px]"
                >
                  {{ $t("dark_b_title") }}
                </h3>
                <p class="leading-6 opacity-50">
                  {{ $t("dark_b_sub_title") }}
                </p>
                <NuxtLink
                  to="/services"
                  class="btn font-bold rounded-full btn-md"
                  no-prefetch
                >
                  <Icon name="i-heroicons-magnifying-glass" class="h-6 w-6" />
                  {{ $t("btn_find_service_need") }}
                </NuxtLink>
              </div>
              <div>
                <div class="relative">
                  <img src="/splash.png" class="h-32 w-32" alt="splash" />
                  <div class="absolute -mt-28 ml-5">
                    <div class="grid grid-cols-1 xl:grid-cols-2 gap-1">
                      <img
                        src="/iphone-1.png"
                        class="xl:min-h-[550px] xl:min-w-[300px] h-full w-full lg:min-h-[400px] lg:max-w-[310px]"
                        alt="splash"
                      />
                      <img
                        src="/iphone-2.png"
                        class="hidden xl:block xl:min-w-[300px] h-full w-full lg:min-h-[400px] lg:max-w-[310px]"
                        alt="splash"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>

    <div class="h-full w-full min-h-[900px] md:min-h-[520px] lg:min-h-[750px]">
      <div
        class="h-72 w-72 rounded-full bg-gradient-to-tr from-white/30 blur-2xl to-black/50 -right-24 -top-28 float-right absolute"
      ></div>
      <div
        class="h-60 w-60 rounded-full bg-gradient-to-tr from-white/30 blur-2xl to-black/50 -top-28 left-[20%] absolute hidden md:block"
      ></div>
      <div
        class="h-96 w-9/12 rounded-full bg-gradient-to-tr from-white/30 blur-2xl to-black/50 -bottom-48 left-[30%] absolute"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>

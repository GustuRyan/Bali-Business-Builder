<template>
  <div>
    <div class="relative mb-52 lg:mb-20 inline-block w-full">
      <div class="z-0 backdrop-blur">
        <div class="">
          <div class="min-h-[350px] w-full hidden lg:block"></div>
          <NuxtImg
            class="w-full h-full min-h-[500px] object-cover -z-[9999] pointer-events-none"
            alt="hero backgroud"
            src="/about-us-hero.png"
          />

          <div
            class="min-h-[400px] md:min-h-[200px] lg:min-h-[100px] w-full"
          ></div>
        </div>
      </div>
      <div class="absolute w-full z-50 inset-0 mx-auto">
        <Container class="h-full">
          <div class="h-full flex flex-col justify-between relative">
            <div>
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 py-16">
                <div
                  class="backdrop-blur lg:backdrop-blur-none p-2 rounded-xl lg:bg-none py-6"
                >
                  <h1
                    class="font-semibold text-4xl md:text-[42px] md:leading-[52.92px]"
                  >
                    {{ $t("about_title_txt") }}
                  </h1>
                </div>
                <div class="grid place-items-end w-full h-full">
                  <div class="mt-24" role="button">
                    <div
                      class="border rounded-lg flex flex-col text-white p-6 gap-4 max-w-none md:max-w-sm duration-300 bg-primary-600 isolate"
                    >
                      <div class="h-full w-full">
                        <NuxtImg
                          src="/qoute.png"
                          alt="qoute"
                          class="w-12 h-12 -mt-12 object-contain"
                        />
                      </div>
                      <div class="space-y-8 py-4">
                        <div class="opacity-70 line-clamp-6">
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Ullam, corporis? Minus eaque, corporis neque,
                          nostrum magnam quisquam aliquam temporibus id nobis
                          consectetur quod illo unde eligendi dignissimos eos
                          veritatis culpa!
                        </div>
                        <div class="line-clamp-6">Benyamin George ,CEO</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bottom-0">
              <div
                class="bg-white w-full rounded-xl p-8 px-2 md:px-16 shadow-xl isolate"
              >
                <div
                  class="grid grid-cols-2 md:grid-cols-3 max-w-4xl mx-auto divide-x"
                >
                  <div
                    class="p-2 text-center space-y-2 hover:bg-neutral-100 hover:rounded-lg transition-all duration-500"
                  >
                    <div class="font-bold text-3xl">1.2K+</div>
                    <div class="opacity-50">{{ $t("visa_created_txt") }}</div>
                  </div>
                  <div
                    class="p-2 text-center space-y-2 hover:bg-neutral-100 hover:rounded-lg transition-all duration-500"
                  >
                    <div class="font-bold text-3xl">400</div>
                    <div class="opacity-50">{{ $t("client_served_txt") }}</div>
                  </div>
                  <div
                    class="p-2 text-center space-y-2 hover:bg-neutral-100 hover:rounded-lg transition-all duration-500"
                  >
                    <div class="font-bold text-3xl">1yr</div>
                    <div class="opacity-50">
                      {{ $t("year_in_experience_txt") }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>

    <Container class="py-16 space-y-16">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img alt="ceo" loading="lazy" src="~assets/images/ceo.png" />
        </div>
        <div class="flex items-center">
          <div class="space-y-4">
            <div class="text-3xl font-bold">
              {{ $t("section_seo_title_txt") }}
            </div>
            <div class="opacity-50">
              {{ $t("section_seo_desc_txt") }}
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="space-y-32">
          <div class="space-y-4">
            <div class="text-sm text-primary-600 font-bold">
              {{ $t("vision_txt") }}
            </div>
            <div>
              <h3 class="font-bold text-3xl">
                {{ $t("vision_sub_desc_txt") }}
              </h3>
            </div>
            <div class="opacity-50">
              {{ $t("vision_desc_txt") }}
            </div>
          </div>
          <div class="space-y-4">
            <div class="text-sm text-primary-600 font-bold">
              {{ $t("mission_txt") }}
            </div>
            <div>
              <h3 class="font-bold text-3xl">
                {{ $t("mission_sub_desc_txt") }}
              </h3>
            </div>
            <div class="opacity-50">
              {{ $t("mission_desc_txt") }}
            </div>

            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <div class="flex grow-0">
                  <div
                    class="rounded-full border py-1.5 px-3.5 font-bold text-sm inline-flex items-center"
                  >
                    1
                  </div>
                </div>
                <div>
                  <div class="flex flex-col opacity-50">
                    <div class="font-bold">
                      {{ $t("mission_li_1_title_txt") }}
                    </div>
                    <div>
                      {{ $t("mission_li_1_desc_txt") }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <div class="flex grow-0">
                  <div
                    class="rounded-full border py-1.5 px-3.5 font-bold text-sm inline-flex items-center"
                  >
                    2
                  </div>
                </div>
                <div>
                  <div class="flex flex-col opacity-50">
                    <div class="font-bold">
                      {{ $t("mission_li_2_title_txt") }}
                    </div>
                    <div>{{ $t("mission_li_2_desc_txt") }}.</div>
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <div class="flex grow-0">
                  <div
                    class="rounded-full border py-1.5 px-3.5 font-bold text-sm inline-flex items-center"
                  >
                    3
                  </div>
                </div>
                <div>
                  <div class="flex flex-col opacity-50">
                    <div class="font-bold">
                      {{ $t("mission_li_3_title_txt") }}
                    </div>
                    <div>
                      {{ $t("mission_li_3_desc_txt") }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <div class="flex grow-0">
                  <div
                    class="rounded-full border py-1.5 px-3.5 font-bold text-sm inline-flex items-center"
                  >
                    4
                  </div>
                </div>
                <div>
                  <div class="flex flex-col opacity-50">
                    <div class="font-bold">
                      {{ $t("mission_li_4_title_txt") }}
                    </div>
                    <div>
                      {{ $t("mission_li_4_desc_txt") }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <div class="flex grow-0">
                  <div
                    class="rounded-full border py-1.5 px-3.5 font-bold text-sm inline-flex items-center"
                  >
                    5
                  </div>
                </div>
                <div>
                  <div class="flex flex-col opacity-50">
                    <div class="font-bold">
                      {{ $t("mission_li_5_title_txt") }}
                    </div>
                    <div>
                      {{ $t("mission_li_5_desc_txt") }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="hidden lg:block">
          <img
            src="~assets/images/discuss.png"
            alt="discuss"
            class="h-full w-full object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </Container>
    <AdventageServices />
    <SectionCostumerFeedback />
  </div>
</template>

<script setup lang="ts">
const { t: $t } = useI18n();
useHead({
  title: $t("about_txt"),
  meta: [
    {
      name: "description",
      content: $t("about_meta_description_txt"),
    },
  ],
});
</script>

<style scoped></style>

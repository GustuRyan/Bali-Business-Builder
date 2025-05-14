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
                src="/icon-question.png"
                class="h-24 w-36 object-contain mx-auto"
                alt="hero"
              />
              <h1
                class="font-bold text-4xl md:text-[50px] text-center md:text-start"
              >
                {{ $t("frequently_asked_question_txt") }}
              </h1>
              <div class="max-w-xl text-center">
                <p class="opacity-50 leading-5">
                  {{ $t("faq_sub_desc_txt") }}
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
            src="/faq-hero.png"
            class="w-full h-full min-h-[600px] xl:min-h-full object-cover pointer-events-none isolate"
            alt="hero-background"
            loading="lazy"
            densities="x1 x2"
            format="webp"
          />
        </div>
      </div>
    </div>

    <ResizeContainer>
      <div class="px-0 lg:px-36 space-y-8">
        <div class="space-y-2 w-full">
          <div class="collapse collapse-plus">
            <input type="radio" name="my-accordion-2" class="peer" checked />
            <div
              class="collapse-title font-bold peer-checked:bg-base-200 transition-colors duration-300"
            >
              {{ $t("faq_qa_title_1") }}
            </div>
            <div
              class="collapse-content peer-checked:bg-base-200 transition-colors duration-300"
            >
              <div>
                <ol class="list-decimal list-inside">
                  <li>{{ $t("faq_qa_li_sec1_1") }}</li>
                  <li>
                    {{ $t("faq_qa_li_sec1_2") }}
                  </li>
                  <li>
                    {{ $t("faq_qa_li_sec1_3") }}
                  </li>
                  <li>
                    {{ $t("faq_qa_li_sec1_4") }}
                  </li>
                  <li>
                    {{ $t("faq_qa_li_sec1_5") }}
                  </li>
                  <li>
                    {{ $t("faq_qa_li_sec1_6") }}
                  </li>
                  <li>
                    {{ $t("faq_qa_li_sec1_7") }}
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <div class="collapse collapse-plus">
            <input type="radio" name="my-accordion-2" class="peer" />
            <div
              class="collapse-title font-bold peer-checked:bg-base-200 transition-colors duration-300"
            >
              {{ $t("faq_qa_title_2") }}
            </div>
            <div
              class="collapse-content peer-checked:bg-base-200 transition-colors duration-300"
            >
              <div>
                1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                neque elit, tristique placerat feugiat ac, facilisis vitae arcu.
                Proin eget egestas augue. Praesent ut sem nec arcu pellentesque
                aliquet. Duis dapibus diam vel metus tempus vulputate.
              </div>
            </div>
          </div>
          <div class="collapse collapse-plus">
            <input type="radio" name="my-accordion-2" class="peer" />
            <div
              class="collapse-title font-bold peer-checked:bg-base-200 transition-colors duration-300"
            >
              {{ $t("faq_qa_title_3") }}
            </div>
            <div
              class="collapse-content peer-checked:bg-base-200 transition-colors duration-300"
            >
              <div>
                2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                neque elit, tristique placerat feugiat ac, facilisis vitae arcu.
                Proin eget egestas augue. Praesent ut sem nec arcu pellentesque
                aliquet. Duis dapibus diam vel metus tempus vulputate.
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body space-y-3">
            <div class="flex space-x-4 items-center">
              <div class="min-w-[120px]">
                <div class="avatar-group -space-x-3">
                  <div class="avatar">
                    <div class="h-10 w-10">
                      <img src="/avatar-1.png" alt="benjamincanac" />
                    </div>
                  </div>
                  <div class="avatar">
                    <div class="h-10 w-10">
                      <img src="/avatar-2.png" alt="Atinux" />
                    </div>
                  </div>
                  <div class="avatar">
                    <div class="h-10 w-10">
                      <img src="/avatar-3.png" alt="smarroufin" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex-grow">
                <p class="font-bold">{{ $t("still_have_question_txt") }}</p>
                <p class="leading-5">
                  {{ $t("faq_desc_small_txt") }}
                </p>
              </div>
            </div>
            <div>
              <NuxtLink
                to="/contact-us"
                no-prefetch
                class="btn btn-md btn-neutral rounded-full"
              >
                {{ $t("get_in_touch_txt") }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </ResizeContainer>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: "faq",
});
</script>

<style></style>

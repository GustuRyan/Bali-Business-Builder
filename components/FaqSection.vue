<template>
  <Container class="py-16">
    <p class="text-sm text-primary-900 font-bold">{{ $t("support_txt") }}</p>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-3">
      <div class="lg:max-w-sm">
        <div class="space-y-3">
          <h3 class="font-bold text-3xl">
            {{ $t("frequently_asked_question_txt") }}
          </h3>
          <p class="opacity-50 leading-5">
            {{ $t("faq_section_desc_txt") }}
          </p>
          <div class="card border-2 rounded-xl">
            <div class="card-body p-4">
              <div class="space-y-3">
                <div class="avatar-group -space-x-4">
                  <div class="avatar">
                    <div class="w-10">
                      <img src="/avatar-1.png" alt="benjamincanac" />
                    </div>
                  </div>
                  <div class="avatar">
                    <div class="w-10">
                      <img src="/avatar-2.png" alt="Atinux" />
                    </div>
                  </div>
                  <div class="avatar">
                    <div class="w-10">
                      <img
                        src="/avatar-3.png"
                        class="h-8 w-8"
                        alt="smarroufin"
                      />
                    </div>
                  </div>
                </div>

                <p class="font-bold">{{ $t("still_have_question_txt") }}</p>
                <p class="leading-5">
                  {{ $t("faq_desc_small_txt") }}
                </p>
                <NuxtLink
                  no-prefetch
                  to="/contact-us"
                  class="btn btn-neutral rounded-full"
                >
                  {{ $t("get_in_touch_txt") }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="space-y-2 w-full">
        <div class="collapse collapse-plus">
          <input
            type="radio"
            name="my-accordion-2"
            class="peer"
            aria-label="collapse"
            checked
          />
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
          <input
            type="radio"
            name="my-accordion-2"
            class="peer"
            aria-label="collapse"
          />
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
          <input
            type="radio"
            name="my-accordion-2"
            class="peer"
            aria-label="collapse"
          />
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
    </div>
  </Container>
</template>

<script lang="ts" setup></script>

<style></style>

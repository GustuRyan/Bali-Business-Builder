<script lang="ts" setup>
const route = useRoute();
const config = useRuntimeConfig();
const { serviceList } = useServices();
import { GeneralResponse, Product } from "@/types";

const { locale } = useI18n();

const slug = computed(() => {
  return route.params?.slug;
});

const selectedProduct = computed(() => {
  return serviceList.find((el) => el.slug === slug.value);
});

const { data: product, pending } = useAsyncData<GeneralResponse<Product>>(
  "product",
  () =>
    $fetch(
      `${config.public.API_ENDPOINT}/products/${slug.value}?lang=${locale.value}`,
      {
        method: "GET",
      }
    ),
  { watch: [slug] }
);
</script>
<template>
  <div>
    <Head>
      <Title>{{ product?.data.name }}</Title>
      <Meta name="description" :content="product?.data.description" />
    </Head>
    <Container v-if="pending" class="flex justify-center items-center">
      <div class="mx-auto !min-h-[300px]">
        <span class="loading loading-dots loading-xs"></span>
        <span class="loading loading-dots loading-sm"></span>
        <span class="loading loading-dots loading-md"></span>
        <span class="loading loading-dots loading-lg"></span>
      </div>
    </Container>
    <template v-else>
      <LazyHeroBanner>
        <div class="grid grid-cols-1 md:grid-cols-2 mt-10 gap-8">
          <div class="space-y-4">
            <h1 class="font-bold text-3xl lg:text-[42px] lg:leading-[52px]">
              {{ product?.data?.name ?? "" }}
            </h1>
            <p class="opacity-50">
              {{ product?.data?.description ?? "" }}
            </p>

            <div>
              <NuxtLink to="/form" class="btn btn-neutral rounded-full">
                {{ $t("apply_now_txt") }}
              </NuxtLink>
            </div>
          </div>
          <div class="hidden md:flex items-center justify-end">
            <div class="grid place-items-end">
              <div
                v-if="product?.data.icon"
                class="flex justify-center rounded-full"
              >
                <img
                  :src="product.data.icon"
                  alt="icon"
                  class="object-cover rounded-full h-52 w-52"
                />
              </div>

              <img v-else :src="selectedProduct?.image" alt="icon" />
            </div>
          </div>
        </div>
      </LazyHeroBanner>
      <LazyContainer class="py-16">
        <div class="space-y-8">
          <h3 class="font-bold text-4xl">{{ product?.data?.name }}</h3>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="[&>p]:opacity-50 space-y-8">
              <div v-html="product?.data?.full_description" class="prose"></div>

              <hr />

              <div>
                <div class="w-full">
                  <div
                    class="collapse collapse-plus p-0"
                    v-for="item in product?.data.questions"
                  >
                    <input
                      type="radio"
                      name="question"
                      checked
                      aria-label="accordion"
                    />
                    <div
                      class="collapse-title font-bold peer-checked:bg-base-200 transition-colors duration-300"
                    >
                      {{ item.question }}
                    </div>
                    <div
                      class="collapse-content peer-checked:bg-base-200 transition-colors duration-300"
                    >
                      <div>
                        {{ item.answer }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-0 md:px-4">
              <ClientOnly>
                <FormServiceBooking id="form-apply" :product="product?.data" />
              </ClientOnly>
            </div>
          </div>
        </div>
      </LazyContainer>
    </template>

    <!-- section services offer -->
    <SectionServiceOffer />
    <!-- end of section services offer-->

    <!-- section customer feedback -->
    <SectionCostumerFeedback />
    <!-- end section customer feedback -->
  </div>
</template>

<style></style>

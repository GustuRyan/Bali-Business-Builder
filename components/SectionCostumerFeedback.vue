<template>
  <section class="py-16 space-y-16 !overflow-hidden bg-white">
    <Container>
      <div class="text-center max-w-lg mx-auto space-y-3">
        <h3 class="font-bold text-3xl">
          {{ $t("what_our_customer_says_txt") }}
        </h3>
        <p class="opacity-50 leading-6">
          {{ $t("costumer_section_desc_txt") }}
        </p>
      </div>
    </Container>

    <Swiper
      :slides-per-view="3"
      :modules="[SwiperNavigation]"
      :loop="true"
      :effect="'creative'"
      space-between="20"
      centered-slides
      :autoplay="{
        delay: 8000,
        disableOnInteraction: true,
      }"
      :navigation="{
        nextEl: `.swiper-button-costume-next`,
        prevEl: `.swiper-button-costume-prev`,
      }"
      :creative-effect="{
        prev: {
          shadow: false,
          translate: ['-20%', 0, -1],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      }"
      :breakpoints="{
        424: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1440: {
          slidesPerView: 3,
        },
      }"
      class="relative !px-16 py-6 !overflow-hidden"
    >
      <template
        v-for="(feedback, index) in customerFeedbacks"
        :key="index + 'cf'"
      >
        <SwiperSlide class="py-5 h-full">
          <CostumerFeedbackCard v-bind="feedback" />
        </SwiperSlide>
      </template>

      <div
        class="swiper-button-costume-next top-1/2 absolute z-10 left-2 bg-neutral-100 rounded-full h-10 w-10 flex items-center justify-center hover:bg-neutral-300"
      >
        <Icon name="i-heroicons-chevron-left" class="h-6 w-6 stroke-2" />
      </div>

      <div
        class="swiper-button-costume-prev top-1/2 z-10 absolute right-2 bg-neutral-100 rounded-full h-10 w-10 flex items-center justify-center hover:bg-neutral-300"
      >
        <Icon name="i-heroicons-chevron-right" class="h-6 w-6 stroke-2" />
      </div>
    </Swiper>
  </section>
</template>

<script lang="ts" setup>
const customerFeedbacks = ref([
  {
    image: "/avatar-1.png",
    name: "Mateo Goncalo",
    description:
      "Bali Visa Official made my recent trip a breeze. Getting my visa with less effort was a game-changer. Their team's support was exceptional, ensuring I had all the necessary documents without any stress. Highly recommended!",
    rating: 4,
  },
  {
    image: "/avatar-2.png",
    name: "Imanuel Jyanda",
    description:
      "I'm a frequent traveler, and Bali Visa Official has been a true lifesaver. Their efficient visa services have saved me time and energy. The secure payment with Xendit added an extra layer of confidence. I won't go anywhere else for my visa needs.",
    rating: 2,
  },
  {
    image: "/avatar-3.png",
    name: "Mark Hopus",
    description:
      "The 'Get Document in One Click' feature from Bali Visa Official is a game-changer! It's the ultimate convenience for travelers like me. The ability to track my order's progress and get my documents instantly simplified my travel plans.",
    rating: 3,
  },
  {
    image: "/avatar-4.png",
    name: "Chinmato",
    description:
      "The 'Get Document in One Click' feature from Bali Visa Official is a game-changer! It's the ultimate convenience for travelers like me. The ability to track my order's progress and get my documents instantly simplified my travel plans.",
    rating: 2,
  },
  {
    image: "/avatar-5.png",
    name: "Anginan Marta",
    description:
      "Bali Visa Official made my recent trip a breeze. Getting my visa with less effort was a game-changer. Their team's support was exceptional, ensuring I had all the necessary documents without any stress. Highly recommended!",
    rating: 4,
  },
  {
    image: "/avatar-6.png",
    name: "Jack Riminese",
    description:
      "I'm a frequent traveler, and Bali Visa Official has been a true lifesaver. Their efficient visa services have saved me time and energy. The secure payment with Xendit added an extra layer of confidence. I won't go anywhere else for my visa needs.",
    rating: 5,
  },
]);
</script>

<style></style>

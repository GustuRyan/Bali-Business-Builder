<template>
  <ClientOnly>
    <VMenu :triggers="['hover']" :distance="17">
      <button type="button" class="btn btn-ghost">
        {{ selectedLanguage?.label }}
        <ClientOnly>
          <div class="avatar" v-if="selectedLanguage">
            <div class="h-6 w-6">
              <img :src="selectedLanguage?.flag" alt="flag" />
            </div>
          </div>
        </ClientOnly>
      </button>
      <template #popper>
        <ul tabindex="0" class="z-[1] menu p-2 shadow bg-base-100 w-40">
          <li @click="changeLanguageEnglish">
            <div class="flex space-x-3 items-center">
              <div class="avatar">
                <div class="h-6 w-6">
                  <img loading="lazy" src="/united-kingdom.png" alt="UK" />
                </div>
              </div>
              <div>EN</div>
            </div>
          </li>
          <li @click="changeLanguageGermany">
            <div class="flex space-x-3 items-center">
              <div class="avatar">
                <div class="h-6 w-6">
                  <img loading="lazy" src="/germany.png" alt="DE" />
                </div>
              </div>
              <div>DE</div>
            </div>
          </li>
          <li @click="changeLanguageHungary">
            <div class="flex space-x-3 items-center">
              <div class="avatar">
                <div class="h-6 w-6">
                  <img loading="lazy" src="/hungary.png" alt="HU" />
                </div>
              </div>
              <div>HU</div>
            </div>
          </li>
        </ul>
      </template>
    </VMenu>
  </ClientOnly>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n();

function changeLanguageEnglish() {
  setLocale("en");
  window.location.reload();
}

function changeLanguageGermany() {
  setLocale("de");
  window.location.reload();
}

function changeLanguageHungary() {
  setLocale("hu");
  window.location.reload();
}

function changeLanguageIndonesia() {
  setLocale("id");
  window.location.reload();
}

const languange = ref([
  {
    label: "EN",
    flag: "/united-kingdom.png",
    value: "en",
  },
  {
    label: "DE",
    flag: "/germany.png",
    value: "de",
  },
  {
    label: "HU",
    flag: "/hungary.png",
    value: "hu",
  },
  {
    label: "ID",
    flag: "/indonesia.png",
    value: "id",
  },
]);

const selectedLanguage = computed(() => {
  return languange.value.find((el) => el.value === locale.value);
});
</script>

<style scoped></style>

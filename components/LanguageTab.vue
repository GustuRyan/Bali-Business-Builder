<template>
  <div class="space-y-2">
    <div class="tabs w-full">
      <a
        class="tab tab-lifted"
        :class="{ 'tab-active': currentTab === 'en' }"
        @click="switchTab('en')"
      >
        English
      </a>
      <a
        class="tab tab-lifted"
        :class="{ 'tab-active': currentTab === 'de' }"
        @click="switchTab('de')"
      >
        Germany
      </a>
      <a
        class="tab tab-lifted"
        @click="switchTab('hu')"
        :class="{ 'tab-active': currentTab === 'hu' }"
      >
        Hungarian
      </a>
    </div>

    <div>
      <div
        v-show="currentTab === 'en'"
        class="transition-all duration-500 delay-200"
      >
        <slot name="en"></slot>
      </div>
      <div
        v-show="currentTab === 'de'"
        class="transition-all duration-500 delay-200"
      >
        <slot name="de"></slot>
      </div>
      <div
        v-show="currentTab === 'hu'"
        class="transition-all duration-500 delay-200"
      >
        <slot name="hu"></slot>
      </div>
    </div>
    <div>
      <slot name="message"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const currentTab = ref("en");

function switchTab(tab: "en" | "de" | "hu") {
  currentTab.value = tab;
}
</script>

<style scoped></style>

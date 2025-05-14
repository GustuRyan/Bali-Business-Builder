<template>
  <div class="relative">
    <div class="absolute w-full h-full">
      <Container class="overflow-y-auto">
        <slot></slot>
      </Container>
    </div>
    <div class="hidden lg:block mx-auto">
      <div class="grid grid-cols-2">
        <div></div>
        <div class="overflow-hidden">
          <img
            src="/auth-banner.png"
            alt="auth background"
            class="lg:w-[760px] h-full lg:h-[760px] object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>

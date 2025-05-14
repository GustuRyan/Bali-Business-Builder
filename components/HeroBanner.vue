<template>
  <div class="relative">
    <div class="absolute z-50 w-full h-full py-16">
      <Container class="mx-auto">
        <slot></slot>
      </Container>
    </div>
    <div class="-z-50">
      <div class="overflow-hidden relative">
        <div
          class="min-h-[429px] max-h-[429px] w-full bg-neutral-100 flex justify-end -mr-96 -right-1/2 top-0"
        >
          <div
            class="border rounded-full h-[890px] w-[860px] p-14 flex justify-center items-center -mt-10 isolate"
          >
            <div
              class="border rounded-full h-[745px] w-[716px] p-14 flex justify-center items-center"
            >
              <div
                class="border rounded-full w-[515px] h-[535px] flex justify-center items-center"
              >
                <div class="flex justify-center -space-x-48">
                  <div
                    class="-top-5 -left-2 w-72 h-72 bg-gradient-to-b from-violet-200 from-80% to-violet-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
                  ></div>

                  <div
                    class="-bottom-10 left-32 w-72 h-72 bg-gradient-to-b from-violet-100 to-emerald-200 to-80% rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>

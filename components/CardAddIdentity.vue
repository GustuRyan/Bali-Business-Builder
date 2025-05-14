<template>
  <div class="card rounded-xl border-2" role="button">
    <div class="card-body p-4 grid place-content-center place-items-center">
      <div class="flex items-center justify-center">
        <div class="space-y-2">
          <div
            class="rounded-full bg-neutral-100 flex items-center justify-center h-32 w-32 mx-auto"
          >
            <Icon name="i-heroicons-plus" class="h-24 w-24 stroke-1" />
          </div>
          <div class="text-center">+ {{ $t("add_more_indentity_txt") }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>

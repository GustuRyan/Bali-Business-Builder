<template>
  <div>
    <div v-if="showAlert" class="alert w-full" :class="[alertType]">
      <span>{{ message }}</span>
      <div class="ml-auto">
        <button
          @click="closeAlert"
          type="button"
          class="btn btn-sm btn-square rounded-full"
        >
          <Icon name="i-heroicons-x-mark"></Icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: String,
  },
  type: {
    type: String,
    validate(value: string) {
      return ["success", "error"].includes(value);
    },
  },
});

const emit = defineEmits(["update:modelValue"]);

const showAlert = ref<boolean>(false);

const message = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const alertType = computed(() => {
  if (props.type === "success") {
    return "alert-success";
  }
  return "alert-error";
});

watch(message, (value) => {
  if (value && !showAlert.value) {
    showAlert.value = true;
    setTimeout(closeAlert, 5000);
  }
});

function closeAlert() {
  message.value = "";
  showAlert.value = false;
}
</script>

<style></style>

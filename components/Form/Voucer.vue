<template>
  <div class="flex flex-col space-y-2">
    <div class="text-sm">{{ $t("do_you_have_voucher_code_txt") }}</div>
    <FormGroup name="voucher" :label="$t('voucher_code_txt')">
      <FormSpInput
        placeholder="eg:xxddf"
        v-model="voucher"
        class="input-bordered input-sm w-full h-11"
        name="voucher"
      >
      </FormSpInput>
    </FormGroup>
    <div class="text-sm text-green-600">You are saving $50</div>
  </div>
</template>

<script lang="ts" setup>
import { AuthUser } from "@/types";
import { PropType } from "nuxt/dist/app/compat/capi";

const props = defineProps({
  user: {
    type: Object as PropType<AuthUser>,
  },
});

const dataForm = ref({
  code: undefined,
  user_id: props.user?.id,
});

onMounted(() => {
  dataForm.value.user_id = props.user?.id;
  dataForm.value.code = undefined;
});

const voucher = ref("xsddxfsd");
function applyVoucer() {
  alert("Hore");
}
</script>

<style></style>

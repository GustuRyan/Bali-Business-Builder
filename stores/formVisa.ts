import { IntroForm } from "@/types";
import { defineStore } from "pinia";
export const useFormVisa = defineStore("formVisa", {
  state: () => ({
    dataForm: {
      product_id: undefined,
      variant_id: undefined,
      total_apply: 1,
      validity_period: undefined,
      date_arriving_in_indonesia: undefined,
      is_express_mode: false,
      first_name: undefined,
      last_name: undefined,
      email: undefined,
      is_taking_for_self: false,
      mobile_number: undefined,
      is_extend: 0,
      visa_validation_end_at: undefined,
      pickup_address: undefined,
      delivery_address: undefined,
    } as IntroForm,
  }),
});

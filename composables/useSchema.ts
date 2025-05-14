import {
  object,
  string,
  any,
  number,
  optional,
  boolean,
  union,
  array,
} from "zod";
import { toTypedSchema } from "@vee-validate/zod";

/**
 * contains all schema using zod's validation
 *
 */
export default function () {
  const { t: $t } = useI18n();

  const BasePassword = object({
    password: string({
      required_error: $t("password_required_msg"),
    }).min(7, { message: $t("password_min_msg") }),
    confirm_password: string({
      required_error: $t("confirm_password_required_msg"),
      invalid_type_error: $t("password_not_match_msg"),
    }),
  });

  const emailSchema = object({
    email: string({
      required_error: $t("email_required_msg"),
      invalid_type_error: $t("email_string_msg"),
    }).email($t("email_invalid_msg")),
  });

  const loginSchema = toTypedSchema(
    object({
      password: string({
        required_error: $t("password_required_msg"),
      }).min(7, $t("password_min_msg")),
    }).merge(emailSchema)
  );

  const registerSchema = toTypedSchema(
    object({
      first_name: string({
        required_error: $t("first_name_required_msg"),
        invalid_type_error: $t("first_name_string_msg"),
      }),
      last_name: string({
        required_error: $t("last_name_required_msg"),
        invalid_type_error: $t("last_name_string_msg"),
      }),
    })
      .merge(emailSchema)
      .merge(BasePassword)
      .refine((data) => data.password === data.confirm_password, {
        path: ["confirm_password"],
        message: $t("password_not_match_msg"),
      })
  );

  const updateRegisterSchema = toTypedSchema(
    object({
      first_name: string({
        required_error: $t("first_name_required_msg"),
        invalid_type_error: $t("first_name_string_msg"),
      }),
      last_name: string({
        required_error: $t("last_name_required_msg"),
        invalid_type_error: $t("last_name_string_msg"),
      }),
      is_active: number().min(0).max(1),
    }).merge(emailSchema)
  );

  const forgotPasswordSchema = toTypedSchema(emailSchema);

  const renewPasswordSchema = toTypedSchema(
    object({})
      .merge(BasePassword)
      .refine((data) => data.password === data.confirm_password, {
        path: ["confirm_password"],
        message: $t("password_not_match_msg"),
      })
  );

  const AuthRenewPasswordSchema = toTypedSchema(
    object({
      old_password: string({
        required_error: $t("old_password_required_msg"),
      }).min(7, $t("old_password_min_msg")),
    })
      .merge(BasePassword)
      .refine((data) => data.password === data.confirm_password, {
        path: ["confirm_password"],
        message: $t("password_not_match_msg"),
      })
  );

  const otpSchema = toTypedSchema(
    object({
      pin: string({ required_error: $t("otp_required_msg") })
        .min(6, $t("opt_min_length_msg"))
        .max(6, $t("opt_max_length_msg")),
    })
  );

  const MAX_FILE_SIZE = 2_000_000; //  1_250_522
  const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  const userSchema = toTypedSchema(
    object({
      first_name: string({
        required_error: $t("first_name_required_msg"),
        invalid_type_error: $t("first_name_string_msg"),
      }),
      last_name: string({
        required_error: $t("last_name_required_msg"),
        invalid_type_error: $t("last_name_string_msg"),
      }),
    })
  );

  const serviceFormSchema = toTypedSchema(
    object({
      total_apply: number().min(1),
      is_extend: number(),
      is_varied: boolean(),
      variant_id: number({
        required_error: $t("validity_period_required_msg"),
        invalid_type_error: $t("validity_period_invalid_msg"),
      }).optional(),
      date_arriving_in_indonesia: optional(
        string({
          required_error: $t("date_arrives_required_msg"),
          invalid_type_error: $t("date_arrives_invalid_msg"),
        })
      ),
      visa_validation_end_at: optional(
        string({
          required_error: $t("visa_validation_end_required_msg"),
          invalid_type_error: $t("visa_validation_end_invalid_msg"),
        })
      ),
      is_express_mode: optional(boolean()),
    }).superRefine((value, ctx) => {
      if (value.is_extend === 0 && !value.date_arriving_in_indonesia) {
        ctx.addIssue({
          path: ["date_arriving_in_indonesia"],
          message: $t("date_arrive_required_msg"),
          code: "custom",
        });
      }

      if (value.is_extend === 1 && !value.visa_validation_end_at) {
        ctx.addIssue({
          path: ["visa_validation_end_at"],
          message: $t("date_current_visa_required_msg"),
          code: "custom",
        });
      }

      if (value.is_varied && !value.variant_id) {
        ctx.addIssue({
          path: ["variant_id"],
          message: $t("validity_period_required_msg"),
          code: "custom",
        });
      }
    })
  );

  const serviceFormIntro = toTypedSchema(
    object({
      product_id: string({
        required_error: $t("product_required_msg"),
        invalid_type_error: $t("product_string_invalid_msg"),
      }).or(
        number({
          required_error: $t("product_required_msg"),
          invalid_type_error: $t("product_string_invalid_msg"),
        })
      ),
      is_varied: boolean(),
      total_apply: number({
        required_error: $t("total_apply_required_msg"),
      }).min(1),
      variant_id: number({
        required_error: $t("validity_period_required_msg"),
        invalid_type_error: $t("validity_period_invalid_msg"),
      }).optional(),
      date_arriving_in_indonesia: optional(
        string({
          required_error: $t("date_arrive_required_msg"),
          invalid_type_error: $t("date_arrive_invalid_msg"),
        })
      ),
      is_express_mode: optional(boolean()),
      is_extend: number(),
      visa_validation_end_at: optional(
        string({
          required_error: $t("visa_validation_end_required_msg"),
          invalid_type_error: $t("visa_validation_end_invalid_msg"),
        })
      ),
      pickup_address: optional(
        string({
          required_error: $t("pickup_address_required_msg"),
          invalid_type_error: $t("pickup_address_invalid_msg"),
        })
      ),
      delivery_address: optional(
        string({
          required_error: $t("delivery_address_required_msg"),
          invalid_type_error: $t("delivery_address_invalid_msg"),
        })
      ),
      is_taking_for_self: optional(boolean()),
      first_name: string({
        required_error: $t("first_name_required_msg"),
        invalid_type_error: $t("first_name_string_msg"),
      }).min(1),
      last_name: string({
        required_error: $t("last_name_required_msg"),
        invalid_type_error: $t("last_name_string_msg"),
      }).min(1),
      email: string({
        required_error: $t("email_string_msg"),
        invalid_type_error: $t("email_string_msg"),
      }).email($t("email_invalid_msg")),
      is_authenticate: boolean(),
      mobile_number: string({
        required_error: $t("mobile_number_required_msg"),
        invalid_type_error: $t("mobile_number_invalid_msg"),
      }).optional(),
    }).superRefine((value, ctx) => {
      if (value.is_extend === 0 && !value.date_arriving_in_indonesia) {
        ctx.addIssue({
          path: ["date_arriving_in_indonesia"],
          message: $t("date_arrive_required_msg"),
          code: "custom",
        });
      }

      if (value.is_extend === 1 && !value.visa_validation_end_at) {
        ctx.addIssue({
          path: ["visa_validation_end_at"],
          message: $t("visa_validation_end_required_msg"),
          code: "custom",
        });
      }

      if (value.is_extend === 1 && !value.delivery_address) {
        ctx.addIssue({
          path: ["delivery_address"],
          message: $t("delivery_address_required_msg"),
          code: "custom",
        });
      }
      if (value.is_extend === 1 && !value.pickup_address) {
        ctx.addIssue({
          path: ["pickup_address"],
          message: $t("pickup_address_required_msg"),
          code: "custom",
        });
      }

      if (!value.is_authenticate && !value.mobile_number) {
        ctx.addIssue({
          path: ["mobile_number"],
          message: $t("mobile_number_required_msg"),
          code: "custom",
        });
      }
    })
  );

  const formConfirmPaymentSchema = toTypedSchema(
    object({
      date_arriving_in_indonesia: string({
        required_error: $t("date_arrive_required_msg"),
        invalid_type_error: $t("date_arrive_invalid_msg"),
      }).optional(),
      visa_validation_end_at: string({
        required_error: $t("visa_validation_end_required_msg"),
        invalid_type_error: $t("visa_validation_end_invalid_msg"),
      }).optional(),
      is_express_mode: optional(boolean()),
    })
  );

  const PromoSchema = toTypedSchema(
    object({
      code: string({
        required_error: $t("code_promo_required_msg"),
        invalid_type_error: $t("code_promo_invalid_msg"),
      }),
      start_at: string({
        required_error: $t("date_start_required_msg"),
        invalid_type_error: $t("date_start_invalid_msg"),
      }),
      expired_at: string({
        required_error: $t("date_expired_required_msg"),
        invalid_type_error: $t("date_expired_invalid_msg"),
      }),
      amount: number({
        required_error: $t("amount_required_msg"),
        invalid_type_error: $t("amount_invalid_msg"),
      }).min(1),
    })
  );

  const formPersonSchema = toTypedSchema(
    object({
      name: string({
        required_error: $t("name_required_msg"),
        invalid_type_error: $t("name_string_msg"),
      }),
      is_extend: number(),
      gender: string({
        required_error: $t("gender_required_msg"),
        invalid_type_error: $t("gender_string_msg"),
      }),
      citizenship: string({
        required_error: $t("citizenship_required_msg"),
        invalid_type_error: $t("citizenship_string_msg"),
      }),
      marital_status: string({
        required_error: $t("marital_status_required_msg"),
        invalid_type_error: $t("marital_status_string_msg"),
      }),
      date_of_birth: string({
        required_error: $t("date_of_birth_required_msg"),
        invalid_type_error: $t("date_of_birth_invalid_msg"),
      }),
      place_of_birth: string({
        required_error: $t("place_of_birth_required_msg"),
        invalid_type_error: $t("place_of_birth_string_msg"),
      }),
      mobile_phone: string({
        required_error: $t("mobile_number_required_msg"),
      }).optional(),
      is_mobile_phone_has_whatsapp: number().min(0).max(1).optional(),
      email: string().email({
        message: $t("email_required_msg"),
      }),
      passport_no: string({
        required_error: $t("passport_no_required_msg"),
        invalid_type_error: $t("passport_no_string_msg"),
      }),
      passport_date_of_issued: string({
        required_error: $t("passport_date_of_issued_required_msg"),
        invalid_type_error: $t("passport_date_of_issued_invalid_msg"),
      }),
      passport_place_of_issued: string({
        required_error: $t("passport_place_of_issued_required_msg"),
        invalid_type_error: $t("passport_place_of_issued_string_msg"),
      }),
      passport_date_of_expiration: string({
        required_error: $t("passport_date_of_expiration_required_msg"),
        invalid_type_error: $t("passport_date_of_expiration_invalid_msg"),
      }),
      street_address: string({
        required_error: $t("street_address_required_msg"),
        invalid_type_error: $t("street_address_string_msg"),
      }),
      street_address2: string().optional(),
      city: string({
        required_error: $t("city_required_msg"),
        invalid_type_error: $t("city_string_msg"),
      }),
      state: string({
        required_error: $t("state_required_msg"),
        invalid_type_error: $t("state_string_msg"),
      }),
      country: string({
        required_error: $t("county_required_msg"),
        invalid_type_error: $t("county_string_msg"),
      }),
      zip: union([string(), number()]).optional(),
      local_street_address: string().optional(),
      local_street_address2: string().optional(),
      local_city: string().optional(),
      local_state: string().optional(),
      local_country: string().optional(),
      local_zip: union([string(), number()]).optional(),
      passport_detail_image: optional(
        any()
          .refine(
            (file: File) => file !== undefined,
            $t("passport_detail_image_required_msg")
          )
          .refine(
            (files: File) => files?.size <= MAX_FILE_SIZE,
            $t("max_2mb_file_size_msg")
          )
          .refine(
            (files: File) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
            $t("accept_file_type_msg")
          )
      ),
      passport_cover_image: optional(
        any()
          .refine(
            (file: File) => file !== undefined,
            $t("passport_cover_image_required_msg")
          )
          .refine(
            (files: File) => files?.size <= MAX_FILE_SIZE,
            $t("max_2mb_file_size_msg")
          )
          .refine(
            (files: File) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
            $t("accept_file_type_msg")
          )
      ),
      selfie_image: optional(
        any()
          .refine(
            (file: File) => file !== undefined,
            $t("selfie_image_required_msg")
          )
          .refine(
            (files: File) => files?.size <= MAX_FILE_SIZE,
            $t("max_2mb_file_size_msg")
          )
          .refine(
            (files: File) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
            $t("accept_file_type_msg")
          )
      ),
      return_ticket_image: optional(
        string()
          .optional()
          .or(
            any()
              .refine(
                (file: File) => file !== undefined,
                $t("return_tiket_image_required_msg")
              )
              .refine(
                (files: File) => files?.size <= MAX_FILE_SIZE,
                $t("max_2mb_file_size_msg")
              )
              .refine(
                (files: File) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
                $t("accept_file_type_msg")
              )
          )
      ),
      onward_ticket_image: optional(
        any()
          .refine(
            (file: File) => file !== undefined,
            "Onward image is required"
          )
          .refine(
            (files: File) => files?.size <= MAX_FILE_SIZE,
            $t("max_2mb_file_size_msg")
          )
          .refine(
            (files: File) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
            $t("accept_file_type_msg")
          )
      ),
      evisa_on_arrival_image: optional(
        any()
          .refine(
            (file: File) => file !== undefined,
            "e visa on arrival image is required"
          )
          .refine(
            (files: File) => files?.size <= MAX_FILE_SIZE,
            $t("max_2mb_file_size_msg")
          )
          .refine(
            (files: File) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
            $t("accept_file_type_msg")
          )
      ),
    }).superRefine((value, ctx) => {
      if (value.is_extend === 0 && !value.passport_detail_image) {
        ctx.addIssue({
          path: ["passport_detail_image"],
          message: $t("password_detail_image_required_msg"),
          code: "custom",
        });
      }

      if (value.is_extend === 0 && !value.passport_cover_image) {
        ctx.addIssue({
          path: ["passport_cover_image"],
          message: $t("password_cover_image_required_msg"),
          code: "custom",
        });
      }

      if (value.is_extend === 0 && !value.selfie_image) {
        ctx.addIssue({
          path: ["selfie_image"],
          message: $t("selfie_image_required_msg"),
          code: "custom",
        });
      }

      if (value.is_extend === 1 && !value.evisa_on_arrival_image) {
        ctx.addIssue({
          path: ["evisa_on_arrival_image"],
          message: $t("e_visa_on_arrival_image_required_msg"),
          code: "custom",
        });
      }

      if (value.is_extend === 1 && !value.onward_ticket_image) {
        ctx.addIssue({
          path: ["onward_ticket_image"],
          message: $t("onward_image_required_msg"),
          code: "custom",
        });
      }
    })
  );

  const ApplyPromoSchema = toTypedSchema(
    object({
      code: string({
        required_error: $t("code_promo_required_msg"),
        invalid_type_error: $t("code_promo_invalid_msg"),
      }),
    })
  );

  const formPersonUpdateSchema = toTypedSchema(
    object({
      name: string({
        required_error: $t("name_required_msg"),
        invalid_type_error: $t("name_string_msg"),
      }),
      gender: string({
        required_error: $t("gender_required_msg"),
        invalid_type_error: $t("gender_string_msg"),
      }),
      citizenship: string({
        required_error: $t("citizenship_required_msg"),
        invalid_type_error: $t("citizenship_string_msg"),
      }),
      marital_status: string({
        required_error: $t("marital_status_required_msg"),
        invalid_type_error: $t("marital_status_string_msg"),
      }),
      date_of_birth: string({
        required_error: $t("date_of_birth_required_msg"),
        invalid_type_error: $t("date_of_birth_invalid_msg"),
      }),
      place_of_birth: string({
        required_error: $t("place_of_birth_required_msg"),
        invalid_type_error: $t("place_of_birth_string_msg"),
      }),
      mobile_phone: string({
        required_error: $t("mobile_number_required_msg"),
      }).optional(),
      is_mobile_phone_has_whatsapp: number().min(0).max(1).optional(),
      email: string().email({
        message: $t("email_invalid_msg"),
      }),
      passport_no: string({
        required_error: $t("passport_no_required_msg"),
        invalid_type_error: $t("passport_no_string_msg"),
      }),
      passport_date_of_issued: string({
        required_error: $t("passport_date_of_issued_required_msg"),
        invalid_type_error: $t("passport_date_of_issued_invalid_msg"),
      }),
      passport_place_of_issued: string({
        required_error: $t("passport_place_of_issued_required_msg"),
        invalid_type_error: $t("passport_place_of_issued_string_msg"),
      }),
      passport_date_of_expiration: string({
        required_error: $t("passport_date_of_expiration_required_msg"),
        invalid_type_error: $t("passport_date_of_expiration_invalid_msg"),
      }),
      street_address: string({
        required_error: $t("street_address_required_msg"),
        invalid_type_error: $t("street_address_string_msg"),
      }),
      street_address2: string().optional(),
      city: string({
        required_error: $t("city_required_msg"),
        invalid_type_error: $t("city_string_msg"),
      }),
      state: string({
        required_error: $t("state_required_msg"),
        invalid_type_error: $t("state_string_msg"),
      }),
      country: string({
        required_error: $t("county_required_msg"),
        invalid_type_error: $t("county_string_msg"),
      }),
      zip: union([string(), number()]).optional(),
      local_street_address: string().optional(),
      local_street_address2: string().optional(),
      local_city: string().optional(),
      local_state: string().optional(),
      local_country: string().optional(),
      local_zip: union([string(), number()]).optional(),
      passport_detail_image: string()
        .optional()
        .or(
          any()
            .refine(
              (file: File) => file !== undefined,
              $t("passport_detail_image_required_msg")
            )
            .refine(
              (files: File) => files?.size <= MAX_FILE_SIZE,
              $t("max_2mb_file_size_msg")
            )
            .refine(
              (files: File) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
              $t("accept_file_type_msg")
            )
        ),
      passport_cover_image: string()
        .optional()
        .or(
          any()
            .refine(
              (file: File) => file !== undefined,
              $t("passport_cover_image_required_msg")
            )
            .refine(
              (files: File) => files?.size <= MAX_FILE_SIZE,
              $t("max_2mb_file_size_msg")
            )
            .refine(
              (files: File) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
              $t("accept_file_type_msg")
            )
        ),
      selfie_image: string()
        .optional()
        .or(
          any()
            .refine(
              (file: File) => file !== undefined,
              $t("selfie_image_required_msg")
            )
            .refine(
              (files: File) => files?.size <= MAX_FILE_SIZE,
              $t("max_2mb_file_size_msg")
            )
            .refine(
              (files: File) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
              $t("accept_file_type_msg")
            )
        ),
      return_ticket_image: string()
        .optional()
        .or(
          any()
            .refine(
              (file: File) => file !== undefined,
              $t("return_tiket_image_required_msg")
            )
            .refine(
              (files: File) => files?.size <= MAX_FILE_SIZE,
              $t("max_2mb_file_size_msg")
            )
            .refine(
              (files: File) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
              $t("accept_file_type_msg")
            )
        ),
      onward_ticket_image: string()
        .optional()
        .or(
          any()
            .refine(
              (file: File) => file !== undefined,
              "onward image is required"
            )
            .refine(
              (files: File) => files?.size <= MAX_FILE_SIZE,
              $t("max_2mb_file_size_msg")
            )
            .refine(
              (files: File) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
              $t("accept_file_type_msg")
            )
        ),
      evisa_on_arrival_image: string()
        .optional()
        .or(
          any()
            .refine(
              (file: File) => file !== undefined,
              $t("e_visa_on_arrival_image_required_msg")
            )
            .refine(
              (files: File) => files?.size <= MAX_FILE_SIZE,
              $t("max_2mb_file_size_msg")
            )
            .refine(
              (files: File) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
              $t("accept_file_type_msg")
            )
        ),
    })
  );

  const ProductVariantSchema = object({
    name: string({
      required_error: $t("variant_name_required_msg"),
      invalid_type_error: $t("variant_name_string_msg"),
    }),
    is_express: number().optional(),
    price: number(),
    usd_price: number().optional(),
    express_price: number().optional(),
    express_usd_price: number().optional(),
    express_title: string({
      required_error: $t("express_title_required_msg"),
      invalid_type_error: $t("express_title_string_msg"),
    }).optional(),
    estimated_day: number(),
    express_estimated_day: number().optional(),
  }).superRefine((data, ctx) => {
    if (data.is_express === 1 && !data.express_price) {
      ctx.addIssue({
        path: ["express_price"],
        message: $t("express_price_required_msg"),
        code: "custom",
      });
    }

    if (data.is_express === 1 && !data.express_usd_price) {
      ctx.addIssue({
        path: ["express_usd_price"],
        message: $t("express_price_required_msg"),
        code: "custom",
      });
    }

    if (data.is_express === 1 && !data.express_estimated_day) {
      ctx.addIssue({
        path: ["express_estimated_day"],
        message: $t("express_estimated_day_required_msg"),
        code: "custom",
      });
    }
  });

  const ProductSchema = toTypedSchema(
    object({
      name: string({
        required_error: $t("service_name_required_msg"),
        invalid_type_error: $t("service_name_string_msg"),
      }),
      price: number({
        required_error: $t("price_required_msg"),
        invalid_type_error: $t("price_invalid_msg"),
      }).optional(),
      usd_price: number({
        required_error: $t("price_required_msg"),
        invalid_type_error: $t("price_invalid_msg"),
      }).optional(),
      icon: string()
        .optional()
        .or(
          any()
            .refine(
              (file: File) => file !== undefined,
              $t("e_visa_on_arrival_image_required_msg")
            )
            .refine(
              (files: File) => files?.size <= MAX_FILE_SIZE,
              $t("max_2mb_file_size_msg")
            )
            .refine(
              (files: File) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
              $t("accept_file_type_msg")
            )
        ),
      image: string()
        .optional()
        .or(
          any()
            .refine(
              (file: File) => file !== undefined,
              $t("e_visa_on_arrival_image_required_msg")
            )
            .refine(
              (files: File) => files?.size <= MAX_FILE_SIZE,
              $t("max_2mb_file_size_msg")
            )
            .refine(
              (files: File) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
              $t("accept_file_type_msg")
            )
        ),
      description: string({
        required_error: $t("descrption_required_msg"),
        invalid_type_error: $t("descrption_string_msg"),
      })
        .min(1, $t("descrption_required_msg"))
        .trim(),
      full_description: string({
        required_error: $t("full_descrption_required_msg"),
        invalid_type_error: $t("full_descrption_string_msg"),
      }).trim(),
      de_description: string({
        required_error: "DE-" + $t("descrption_required_msg"),
        invalid_type_error: "DE-" + $t("descrption_string_msg"),
      })
        .min(1, "DE-" + $t("descrption_required_msg"))
        .trim(),
      de_full_description: string({
        required_error: "DE-" + $t("full_descrption_required_msg"),
        invalid_type_error: "DE-" + $t("full_descrption_string_msg"),
      }).trim(),
      hu_description: string({
        required_error: "HU-" + $t("descrption_required_msg"),
        invalid_type_error: "HU-" + $t("descrption_string_msg"),
      })
        .min(1, "HU-" + $t("descrption_required_msg"))
        .trim(),
      hu_full_description: string({
        required_error: "HU-" + $t("full_descrption_required_msg"),
        invalid_type_error: "HU-" + $t("full_descrption_string_msg"),
      }).trim(),
      is_extend: number(),
      is_express: number().optional(),
      express_estimated_day: number().optional(),
      estimated_day: number().optional(),
      express_title: string({
        required_error: $t("express_title_required_msg"),
        invalid_type_error: $t("express_title_string_msg"),
      }).optional(),
      express_price: number().optional(),
      express_usd_price: number().optional(),
      is_varied: number(),
      product_variants: array(ProductVariantSchema).optional(),
    }).superRefine((data, ctx) => {
      if (data.full_description === "<p></p>") {
        ctx.addIssue({
          path: ["full_description"],
          message: $t("full_descrption_required_msg"),
          code: "custom",
        });
      }

      if (data.de_full_description === "<p></p>") {
        ctx.addIssue({
          path: ["de_full_description"],
          message: "DE-" + $t("full_descrption_required_msg"),
          code: "custom",
        });
      }

      if (data.hu_full_description === "<p></p>") {
        ctx.addIssue({
          path: ["hu_full_description"],
          message: "HU-" + $t("full_descrption_required_msg"),
          code: "custom",
        });
      }

      if (data.is_varied === 1 && !data.product_variants) {
        ctx.addIssue({
          path: ["product_variants"],
          message: $t("product_variant_is_set_msg"),
          code: "custom",
        });
      }

      if (data.is_varied === 0 && !data.price) {
        ctx.addIssue({
          path: ["price"],
          message: $t("price_required_msg"),
          code: "custom",
        });
      }

      if (data.is_varied === 0 && !data.estimated_day) {
        ctx.addIssue({
          path: ["estimated_day"],
          message: $t("estimated_day_required_msg"),
          code: "custom",
        });
      }

      if (
        data.is_varied === 0 &&
        data.is_express === 1 &&
        !data.express_price
      ) {
        ctx.addIssue({
          path: ["express_price"],
          message: $t("express_price_required_msg"),
          code: "custom",
        });
      }

      if (
        data.is_varied === 0 &&
        data.is_express === 1 &&
        !data.express_usd_price
      ) {
        ctx.addIssue({
          path: ["express_usd_price"],
          message: $t("express_price_required_msg"),
          code: "custom",
        });
      }

      if (
        data.is_varied === 0 &&
        data.is_express === 1 &&
        !data.express_estimated_day
      ) {
        ctx.addIssue({
          path: ["express_estimated_day"],
          message: $t("express_estimated_day_required_msg"),
          code: "custom",
        });
      }
    })
  );

  const DeclineOrderSchema = toTypedSchema(
    object({
      reason: string({
        required_error: $t("decline_reason_required_msg"),
        invalid_type_error: $t("decline_reason_string_msg"),
      }),
    })
  );

  const FAQSchema = toTypedSchema(
    object({
      question: string({
        required_error: $t("question_required_msg"),
        invalid_type_error: $t("question_string_msg"),
      }),
      answer: string({
        required_error: $t("answer_required_msg"),
        invalid_type_error: $t("answer_string_msg"),
      }),
      de_question: string({
        required_error: "DE-" + $t("question_required_msg"),
        invalid_type_error: "DE" + $t("question_string_msg"),
      }),
      de_answer: string({
        required_error: "DE-" + $t("answer_required_msg"),
        invalid_type_error: "DE-" + $t("answer_string_msg"),
      }),
      hu_question: string({
        required_error: "HU-" + $t("question_required_msg"),
        invalid_type_error: "HU-" + $t("question_string_msg"),
      }),
      hu_answer: string({
        required_error: "HU-" + $t("answer_required_msg"),
        invalid_type_error: "HU-" + $t("answer_string_msg"),
      }),
    })
  );

  const NonAdminUpdateSchema = toTypedSchema(
    object({
      first_name: string({
        required_error: $t("first_name_required_msg"),
        invalid_type_error: $t("first_name_string_msg"),
      }),
      last_name: string({
        required_error: $t("last_name_required_msg"),
        invalid_type_error: $t("last_name_string_msg"),
      }),
      is_active: number().min(0).max(1),
    })
  );

  const ContactSchema = toTypedSchema(
    object({
      first_name: string({
        required_error: $t("first_name_required_msg"),
        invalid_type_error: $t("first_name_string_msg"),
      }),
      last_name: string({
        required_error: $t("last_name_required_msg"),
        invalid_type_error: $t("last_name_string_msg"),
      }),
      phone: string({
        required_error: $t("mobile_number_required_msg"),
        invalid_type_error: $t("mobile_number_invalid_msg"),
      }),
      email: string({
        required_error: $t("email_required_msg"),
        invalid_type_error: $t("email_string_msg"),
      }),
      message: string({
        required_error: $t("message_required_msg"),
        invalid_type_error: $t("message_string_msg"),
      }),
    })
  );

  const ReplayContactSchema = toTypedSchema(
    object({
      message: string({
        required_error: $t("message_required_msg"),
        invalid_type_error: $t("message_string_msg"),
      }).trim(),
    }).superRefine((data, ctx) => {
      if (data.message === "<p></p>") {
        ctx.addIssue({
          path: ["message"],
          message: $t("message_required_msg"),
          code: "custom",
        });
      }
    })
  );

  return {
    loginSchema,
    registerSchema,
    forgotPasswordSchema,
    emailSchema,
    renewPasswordSchema,
    otpSchema,
    AuthRenewPasswordSchema,
    userSchema,
    serviceFormSchema,
    serviceFormIntro,
    formPersonSchema,
    formPersonUpdateSchema,
    formConfirmPaymentSchema,
    updateRegisterSchema,
    PromoSchema,
    ProductSchema,
    DeclineOrderSchema,
    FAQSchema,
    NonAdminUpdateSchema,
    ApplyPromoSchema,
    ContactSchema,
    ReplayContactSchema,
  };
}

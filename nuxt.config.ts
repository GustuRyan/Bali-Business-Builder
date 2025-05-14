// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxt/image",
    "nuxt-swiper",
    "@vueuse/nuxt",
    "nuxt-icon",
    "@vee-validate/nuxt",
    "floating-vue/nuxt",
    "nuxt-snackbar",
  ],

  css: ["~/assets/css/main.css"],
  snackbar: {
    top: true,
    right: true,
    duration: 5000,
  },
  imports: {
    dirs: ["stores"],
  },
  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      fallbackLocale: "en",
    },
    strategy: "no_prefix",
    locales: [
      {
        code: "en",
        name: "English",
        file: "en.json",
      },
      {
        code: "de",
        name: "German",
        file: "de.json",
      },
      {
        code: "hu",
        name: "Hungarian",
        file: "hu.json",
      },
      {
        code: "id",
        name: "Indonesia",
        file: "id.json",
      },
    ],
    lazy: false,
    langDir: "internationalization",
    defaultLocale: "en",
    compilation: {
      strictMessage: false,
      escapeHtml: false,
    },
  },
  image: {
    format: ["webp", "jpg", "png"],
    domains: [process.env.FRONT_END as string],
    provider: "ipx",
  },
  devServer: {
    port: 3004,
  },
  runtimeConfig: {
    public: {
      API_ENDPOINT: process.env.API_ENDPOINT,
    },
  },
  nitro: {
    compressPublicAssets: true,
  },
  app: {
    head: {
      titleTemplate: "%s - Bali Visa",

      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
        {
          name: "robots",
          content:
            process.env.APP_STATUS === "PRODUCTION"
              ? "index, follow"
              : "noindex, nofollow",
        },
        {
          hid: "description",
          name: "description",
          content: "",
        },
        {
          name: "author",
          content: "Bali Visa Official",
        },

        // Open Graph Meta
        {
          property: "og:title",
          content: "Bali Visa",
        },
        { property: "og:type", content: "website" },
        {
          property: "og:url",
          content: "https://balivisaofficial.spdigitalhosting.com/",
        },
        { property: "og:image", content: "/thumbnail.png" },
        { property: "og:description", content: "" },
        {
          property: "og:site_name",
          content: "Bali Visa",
        },
        // Twitter Meta
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "",
        },
        { name: "twitter:description", content: "" },
        { name: "twitter:image", content: "/thumbnail.png" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 1500,
      // @ts-ignore
      transpile: ["@vuepic/vue-datepicker"],
    },
  },
  veeValidate: {
    autoImports: true,
    componentNames: {
      Field: "VeeField",
      FieldArray: "VeeFieldArray",
      ErrorMessage: "VeeErrorMessage",
      Form: "VeeForm",
    },
  },
});

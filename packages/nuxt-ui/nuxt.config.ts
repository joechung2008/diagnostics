// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      link: [
        {
          href: "/favicon.ico",
          rel: "icon",
        },
      ],
      meta: [
        {
          charset: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          name: "description",
          content: "Information about extensions in the Azure portal",
        },
      ],
      title: "Azure Portal Extensions Dashboard",
    },
  },
  compatibilityDate: "2025-07-15",
  css: ["~/assets/css/global.css"],
  devtools: {
    enabled: true,
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxt/test-utils/module",
    "@nuxt/image",
    "@nuxt/scripts",
  ],
  typescript: {
    strict: true,
    typeCheck: true,
  },
});

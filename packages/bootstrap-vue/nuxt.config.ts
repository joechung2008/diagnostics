import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "en"
      },
      link: [
        {
          href: "/favicon.ico",
          rel: "icon",
          type: "image/x-icon"
        }
      ],
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1"
        },
        {
          name: "description",
          content: "Information about extensions on the Azure portal"
        }
      ],
      title: "Azure Portal Extensions Dashboard"
    }
  },
  compatibilityDate: "2025-07-15",
  css: ["~/assets/css/global.css"],
  devtools: {
    enabled: true
  },
  modules: ["@nuxt/eslint", "@nuxt/test-utils", "@bootstrap-vue-next/nuxt"]
});

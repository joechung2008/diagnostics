import { defineNuxtConfig } from "nuxt/config"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        class: "dark",
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
          content: "Information about extensions in the Azure portal"
        }
      ],
      title: "Azure Portal Extensions Dashboard"
    }
  },
  compatibilityDate: "2025-07-15",
  css: ["./assets/scss/global.scss"],
  devtools: { enabled: true },
  elementPlus: {
    themes: ["dark"]
  },
  modules: ["@element-plus/nuxt", "@nuxt/eslint", "@nuxt/test-utils"],
  ssr: false,
  typescript: {
    strict: true,
    typeCheck: true
  }
})

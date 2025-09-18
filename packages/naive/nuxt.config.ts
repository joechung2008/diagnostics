import { NaiveUiResolver } from "unplugin-vue-components/resolvers"
import Components from "unplugin-vue-components/vite"

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
        {
          charset: "utf-8"
        },
        {
          name: "description",
          content: "Information about extensions in the Azure portal"
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1"
        }
      ],
      title: "Azure Portal Extensions Dashboard"
    }
  },
  build: {
    // Transpile Naive UI and vueuc to avoid CJS named-export issues
    // during SSR.
    transpile: ["naive-ui", "vueuc"]
  },
  compatibilityDate: "2025-07-15",
  css: ["./assets/css/global.css"],
  devtools: {
    enabled: true
  },
  modules: ["@nuxt/eslint", "@nuxt/test-utils", "nuxtjs-naive-ui"],
  pages: false,
  vite: {
    // Ensure Vite optimizes these deps
    optimizeDeps: {
      include: ["naive-ui", "vueuc"]
    },
    plugins: [
      Components({
        resolvers: [NaiveUiResolver()]
      })
    ],
    // Do not treat them as external during SSR
    ssr: {
      noExternal: ["naive-ui", "vueuc"]
    }
  }
})

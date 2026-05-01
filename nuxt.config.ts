export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@nuxt/ui", "@pinia/nuxt"],

  css: ["~/assets/css/main.css"],

  app: {
    head: {
      link: [{ rel: "icon", type: "image/png+xml", href: "/goal.png" }],
    },
  },
});

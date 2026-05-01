import Lara from '@primeuix/themes/lara'
import { definePreset } from '@primeuix/themes'
import tailwindcss from '@tailwindcss/vite'

const LeaguePreset = definePreset(Lara, {
  semantic: {
    primary: {
      50:  '{orange.50}',
      100: '{orange.100}',
      200: '{orange.200}',
      300: '{orange.300}',
      400: '{orange.400}',
      500: '{orange.500}',
      600: '{orange.600}',
      700: '{orange.700}',
      800: '{orange.800}',
      900: '{orange.900}',
      950: '{orange.950}',
    },
  },
})

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@pinia/nuxt', '@primevue/nuxt-module'],

  primevue: {
    options: {
      theme: {
        preset: LeaguePreset,
        options: {
          darkModeSelector: '.dark',
        },
      },
    },
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },
})

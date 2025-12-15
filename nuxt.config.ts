import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/styles/main.css", "@/assets/styles/fonts.css"],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  runtimeConfig: {
    ycAccessKeyId: process.env.YC_KEY_ID,
    ycSecretAccessKey: process.env.YC_SECRET,
    ycBucket: process.env.YC_BUCKET,
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  routeRules: {
    '/admin/**': { ssr: false },
  },
  app: {
    head: {
      title: "Сая Лаундж",
      meta: [
        {
          name: 'description', content: `Лаундж-бар САЯ — новое концептуальное заведение от бренд-шефа Александра Ежова. Это пространство, где время замедляет свой бег, чтобы вы смогли обрести внутренне равновесие и перезагрузить чувства.`
        },
        { name: 'keywords', content: 'пермь,сая,коктейли,коктейль-бра,гедонист,ежов' },

        // Open Graph (для соцсетей)
        { property: 'og:title', content: 'Сая Лаундж' },
        { property: 'og:description', content: 'Лаундж-бар САЯ — новое концептуальное заведение от бренд-шефа Александра Ежова. Это пространство, где время замедляет свой бег, чтобы вы смогли обрести внутренне равновесие и перезагрузить чувства.' },
        { property: 'og:image', content: '/icons/logo.png' },
        { property: 'og:type', content: 'website' },
      ],
    },
  },
})
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import colors from 'vuetify/util/colors'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,

    theme: {
      defaultTheme: "dark",
      themes: {
        // light: {
        //   dark: false,
        //   colors: {
        //     primary: "#1e8d99", // #1e8d99
        //     secondary: "#894eff", // #894eff
        //   }
        // },
        dark: {
          dark: true,
          colors: {
            background: '#000000',
            surface: '#000000',
            primary: '#FFFFFF',
            secondary: '#FFFFFF',
            info: '#FFFFFF',
          }
        },
      },
    },
    defaults: {
      VBtn: {
        style:
          `
          text-transform: none;
          border: 2px solid white;
          letter-spacing: normal;
          border-radius: 100px;
          display: flex;
          min-width: 250px;
          padding: 0 32px;
          font-size: clamp(1.125rem, 0.8267rem + 0.8523vw, 1.5rem); /* 18px-24px*/
          height: clamp(4.375rem, 2.8835rem + 4.2614vw, 6.25rem);
          `,
      },
      global: {
        // ripple: false,
      },
      VRow: {
        class: 'pa-0 ma-0',
        noGutters: true, // убирает горизонтальные отступы (gutter)
      },
      VCol: {
        class: 'pa-0 ma-0',
      },
    },
    ssr: true,
  })

  nuxtApp.vueApp.use(vuetify)
})

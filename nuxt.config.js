import colors from 'vuetify/es5/util/colors'

export default {
  server: {
    port: 3001 // default: 3000
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: 'server',
  router: {
    middleware: [ 'role' ]
  },
  head: {
    titleTemplate: '%s - lastmin',
    title: 'lastmin',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/notifier.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    'cookie-universal-nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/toast'
  ],
  toast: {
    position: 'top-right',
    duration: 3000
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    credentials: true,
    debug: true,
    proxy: true,
    headers: {
      common: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },

  proxy: {
    '/api': {
      target: 'https://apitest.fun:9595',
      pathRewrite: {
        '^/api': '/api/v1'
      }
    }
  },
  env: {
    baseUrl: 'https://apitest.fun:9595/api/v1'
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}

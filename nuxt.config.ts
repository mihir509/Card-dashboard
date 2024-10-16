// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Card',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
        { hid: 'title', name: 'title', content: 'furniflex' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.ico' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap' },
      ],

      script: [

      ],

    },
  },

  plugins: [
    { src: '~/plugins/store.js', mode: 'client' },

  ],
  css: [
    '@/static/global.css',
  ],
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', 'nuxt-swiper'],

  compatibilityDate: '2024-10-14',
})
<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import process from 'process'
// import { Plugins } from '@capacitor/core'
// const { Network } = Plugins

import { defineComponent } from 'vue'
import { createMetaMixin } from 'quasar'

export default defineComponent({
  name: 'App',
  mixins: [
    createMetaMixin(function () {
      // "this" here refers to your component
      return {

        // sets document title
        title: 'آموزش مجازی آلاء',
        // optional; sets final title as "Index Page - My Website", useful for multiple level meta
        titleTemplate: title => `${title} با هدف توسعه عدالت آموزشی در حوزه کنکور`,

        // meta tags
        meta: {
          description: { name: 'description', content: 'کلاس های درس آلاء برای کنکور، دهم، یازدهم و دوازدهم و خدمات تکمیلی از قبیل همایش‌های طلایی و اردو طلایی؛ در دروس مختلف زیست شیمی فیزیک ریاضی عربی ادبیات و.' },
          keywords: { name: 'keywords', content: 'Quasar website' },
          equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
          // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
          ogTitle: {
            property: 'og:title',
            content: 'آموزش مجازی آلاء',
            // optional; similar to titleTemplate, but allows templating with other meta properties
            template (ogTitle) {
              return `${ogTitle} با هدف توسعه عدالت آموزشی در حوزه کنکور`
            }
          },
          ogDescription: {
            property: 'og:description',
            content: 'کلاس های درس آلاء برای کنکور، دهم، یازدهم و دوازدهم و خدمات تکمیلی از قبیل همایش‌های طلایی و اردو طلایی؛ در دروس مختلف زیست شیمی فیزیک ریاضی عربی ادبیات و.'
          },
          ogType: {
            property: 'og:type',
            content: 'website'
          },
          ogUrl: {
            property: 'og:url',
            content: 'https://alaatv.com'
          },
          ogImage: {
            property: 'og:image',
            content: 'https://nodes.alaatv.com/upload/footer-alaaLogo.png'
          },
          ogImageWidth: {
            property: 'og:image:width',
            content: '80'
          },
          ogImageHeight: {
            property: 'og:image:height',
            content: '90'
          },
          twitterTitle: {
            property: 'twitter:title',
            content: 'آموزش مجازی آلاء',
            // optional; similar to titleTemplate, but allows templating with other meta properties
            template (ogTitle) {
              return `${ogTitle} با هدف توسعه عدالت آموزشی در حوزه کنکور`
            }
          },
          twitterDescription: {
            property: 'twitter:description',
            content: 'آموزش مجازی آلاء',
            // optional; similar to titleTemplate, but allows templating with other meta properties
            template (ogTitle) {
              return `${ogTitle} با هدف توسعه عدالت آموزشی در حوزه کنکور`
            }
          },
          twitterSite: {
            property: 'twitter:site',
            content: 'آموزش مجازی آلاء'
          }
        },

        // // CSS tags
        // link: {
        //   material: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
        // },

        // // JS tags
        // script: {
        //   ldJson: {
        //     type: 'application/ld+json',
        //     innerHTML: '{ "@context": "http://schema.org" }'
        //   }
        // },

        // <html> attributes
        htmlAttr: {
          lang: 'fa'
          // 'xmlns:cc': 'http://creativecommons.org/ns#', // generates <html xmlns:cc="http://creativecommons.org/ns#">,
          // empty: undefined // generates <html empty>
        }

        // // <body> attributes
        // bodyAttr: {
        //   'action-scope': 'xyz', // generates <body action-scope="xyz">
        //   empty: undefined // generates <body empty>
        // },

        // // <noscript> tags
        // noscript: {
        //   default: 'This is content for browsers with no JS (or disabled JS)'
        // }
      }
    })
  ],
  data: () => ({
    refreshing: false,
    registration: null,
    updateExists: false
  }),
  computed: {
    accessToken () {
      return this.$store.getters['Auth/accessToken']
    }
  },
  created () {
    this.updateAxiosBearerToken()
    this.setServiceWorker()
    // this.checkInternetConnection()
  },
  mounted () {
    this.updateAxiosBearerToken()
  },
  methods: {
    // ToDo: must remove this function
    updateAxiosBearerToken () {
      if (!this.accessToken) {
        return
      }
      this.$axios.defaults.headers.common.Authorization = 'Bearer ' + this.accessToken
    },
    // async checkInternetConnection () {
    //   Network.addListener('networkStatusChange', (status) => {
    //     // alert("Network status changed" + status)
    //     // window.location.reload()
    //     console.log('Network status changed', status)
    //   })
    //
    //   // Get the current network status
    //   const status = await Network.getStatus()
    //   console.log('status', status)
    // },
    setServiceWorker () {
      // Listen for our custom event from the SW registration
      if (!process.browser) {
        return
      }
      document.addEventListener('swUpdated', this.updateAvailable, { once: true })

      if (navigator && navigator.serviceWorker) {
        // Prevent multiple refreshes
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (this.refreshing) return
          this.refreshing = true
          // Here the actual reload of the page occurs
          // window.location.reload()
        })
      }
    },
    updateAvailable (event) {
      this.registration = event.detail
      this.updateExists = true
    }
  }
})
</script>

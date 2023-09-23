<template>
  <div />
</template>

<script>
import Ewano from 'src/assets/js/Ewano.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { Cookies, createMetaMixin } from 'quasar'

export default {
  name: 'EwanoLanding',
  mixins: [
    mixinWidget,
    createMetaMixin(function () {
      if ((typeof window !== 'undefined' && window.ewano) || !this.hasIdInQueryParam()) {
        return {}
      }
      return {
        // whenever "title" from above changes, your meta will automatically update
        script: {
          evano: {
            src: 'https://static-ebcom.mci.ir/static/ewano/assets/ewano-web-toolkit-v1.min.js',
            defer: true
          }
        }
      }
    })
  ],
  beforeMount () {
    // if (this.hasIdInQueryParam()) {
    Ewano.onWebAppReady()
    // }
    if (this.hasIdInQueryParam() && !this.hasEwanoFlagInQueryParam()) {
      this.setEwanoFlagInQueryParam()
    } else if (this.hasIdInQueryParam() && this.hasEwanoFlagInQueryParam()) {
      this.sendEwanoIdToBackend(this.getUuid())
    }
  },
  methods: {
    hasIdInQueryParam () {
      return !!this.getUuid()
    },
    hasEwanoFlagInQueryParam () {
      return !!this.$route.query.ewano
    },
    setEwanoFlagInQueryParam () {
      const searchURL = new URL(window.location)
      searchURL.searchParams.set('ewano', '1')
      window.history.pushState({}, '', searchURL)
      window.location.reload()
      // this.$route.query.ewano = 1
      // this.$router.push({ name: this.$route.name, params: this.$route.params, query: this.$route.query })
    },
    getUuid () {
      return this.$route.query.id
    },
    sendEwanoIdToBackend (uuid) {
      Ewano.login(uuid)
        .then(({ accessToken, user }) => {
          this.$store.commit('Auth/updateUser', user)
          this.$store.commit('Auth/updateAccessToken', accessToken)
          this.$store.commit('Auth/updateAxiosAuthorization', accessToken)
          if (typeof window !== 'undefined') {
            Cookies.set('BearerAccessToken', accessToken, {
              // domain: '.' + window.location.host,
              path: '/',
              expires: '365d'
            })
          }
        })
        .catch(() => {})
    }
  }
}
</script>

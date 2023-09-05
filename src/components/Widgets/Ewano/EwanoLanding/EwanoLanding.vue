<script>
import { Cookies } from 'quasar'
import Ewano from 'src/assets/js/Ewano.js'

export default {
  name: 'EwanoLanding',
  beforeMount () {
    if (this.hasIdInQueryParam()) {
      this.sendEwanoIdToBackend(this.getUuid())
    }
  },
  methods: {
    hasIdInQueryParam () {
      return !!this.getUuid()
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

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'
import Ewano from 'assets/js/Ewano'

export default {
  name: 'EwanoLanding',
  mixins: [mixinWidget],
  data() {
    return {
      defaultOptions: {
        RAYCHAT_TOKEN: null
      }
    }
  },
  computed: {
    raychatToket () {
      return this.localOptions.RAYCHAT_TOKEN
    }
  },
  watch: {
    raychatToket () {
      this.loadScript()
    }
  },
  mounted () {
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
          this.$store.commit('Auth/updateAxiosAuthorization')
        })
        .catch(() => {

        })
    }
  }
}
</script>

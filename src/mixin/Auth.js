import { User } from 'src/models/User.js'
import { APIGateway } from 'src/api/APIGateway.js'

const mixinAuth = {
  data () {
    return {
      user: new User(),
      isUserLogin: false,
      domainSameWithAppDomain: false,
      appDomain: this.$env?.VITE_APP_DOMAIN || 'office.alaa.tv'
    }
  },
  mounted () {
    this.loadAuthData()
    this.loadDomainSameWithAppDomain()
  },
  methods: {
    loadAuthData () { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
      this.isUserLogin = this.$store.getters['Auth/isUserLogin']
    },
    loadDomainSameWithAppDomain () { // prevent Hydration node mismatch
      this.domainSameWithAppDomain = window.location.host === this.appDomain
    },
    async getUserData () {
      APIGateway.user.showUser()
        .then((response) => {
          this.$store.commit('Auth/updateUser', response.data.data)
        })
    }
  }
}

export default mixinAuth

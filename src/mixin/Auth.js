import { User } from 'src/models/User.js'
import { APIGateway } from 'src/api/APIGateway.js'

const mixinAuth = {
  data () {
    return {
      isAdmin: false,
      user: new User(),
      hostName: 'else',
      isUserLogin: false,
      domainSameWithAppDomain: false,
      appDomain: this.$env?.VITE_APP_DOMAIN
    }
  },
  mounted () {
    this.loadAuthData()
    this.loadHostName()
    this.loadDomainSameWithAppDomain()
    this.$bus.on('onLoggedIn', () => {
      this.loadAuthData()
    })
  },
  methods: {
    loadHostName () { // prevent Hydration node mismatch
      if (typeof window === 'undefined') {
        return
      }
      this.hostName = window.location.host
    },
    loadAuthData () { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
      this.isAdmin = this.$store.getters['Auth/isAdmin']
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

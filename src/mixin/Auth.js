import { APIGateway } from 'src/api/APIGateway'
import { User } from 'src/models/User'

const mixinAuth = {
  data () {
    return {
      user: new User(),
      isUserLogin: false
    }
  },
  mounted () {
    this.loadAuthData()
  },
  methods: {
    loadAuthData () { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
      this.isUserLogin = this.$store.getters['Auth/isUserLogin']
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

import { User } from 'src/models/User'

const mixinAuthData = {
  data() {
    return {
      user: new User()
    }
  },
  mounted () {
    this.loadAuthData()
  },
  methods: {
    loadAuthData () { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
    }
  }
}

export default mixinAuthData

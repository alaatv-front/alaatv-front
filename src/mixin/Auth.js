import { APIGateway } from 'src/api/APIGateway'

const mixinAuth = {
  computed: {
    user: {
      get () {
        return this.$store.getters['Auth/user']
      },
      set (newInfo) {
        this.$store.commit('Auth/updateUser', newInfo)
      }
    }
  },
  methods: {
    async getUserData () {
      APIGateway.user.showUser()
        .then((response) => {
          this.$store.commit('Auth/updateUser', response.data.data)
        })
    }
  }
}

export default mixinAuth

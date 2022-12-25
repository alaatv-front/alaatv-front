import API_ADDRESS from 'src/api/Addresses'

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
      this.$axios.get(API_ADDRESS.user.show_user)
        .then((response) => {
          this.$store.commit('Auth/updateUser', response.data.data)
        })
    }
  }
}

export default mixinAuth

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
    getUserData (callback) {
      const that = this
      this.$axios.get(API_ADDRESS.user.show_user)
        .then((response) => {
          that.$store.commit('Auth/updateUser', response.data.data)
          if (typeof callback === 'function') {
            callback()
          }
        })
    }
  }
}

export default mixinAuth

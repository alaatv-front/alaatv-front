<template>
  <div class="login-page">
    <auth-login />
  </div>
</template>

<script>
import AuthLogin from 'src/components/Auth.vue'

export default {
  name: 'Login',
  components: { AuthLogin },
  computed: {
    isUserLogin () {
      return this.$store.getters['Auth/isUserLogin']
    }
  },
  created () {
    this.handleAuthenticatedUser()
  },
  methods: {
    redirectTo () {
      let redirectTo = this.$store.getters['Auth/redirectTo']
      if (this.redirect) {
        redirectTo = this.redirect
      }
      if (redirectTo === null || typeof redirectTo !== 'object') {
        redirectTo = { name: 'Public.Home' }
      }
      this.$router.push(redirectTo)
      this.$store.commit('Auth/updateRedirectTo', null)
    },
    handleAuthenticatedUser () {
      // ToDo: must check this if
      if (this.isUserLogin) {
        // this.$router.push({ name: 'Public.Home' })
        this.redirectTo()
        return
      }
      this.$store.dispatch('Auth/logOut', { clearRedirectTo: false })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  display: flex;
}
</style>

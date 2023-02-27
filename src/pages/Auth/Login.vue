<template>
  <div class="login-page">
    <auth-login />
  </div>
</template>

<script>
import AuthLogin from 'components/Auth.vue'

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
    handleAuthenticatedUser () {
      if (this.isUserLogin) {
        this.$router.push({ name: 'Public.Home' })
        return
      }
      this.$store.dispatch('Auth/logOut')
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  display: grid;
}
</style>

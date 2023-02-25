<template>
  <div class="login-page">
    <auth-login />
  </div>
</template>

<script>
import AuthLogin from 'components/Auth.vue'

export default {
  name: 'Login',
  components: { AuthLogin }
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  display: grid;
}
</style>

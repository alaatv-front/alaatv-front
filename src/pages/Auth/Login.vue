<template>
  <div class="login-page row flex">
    <q-card v-if="!userLogin"
            class="col-lg-4 col-md-5 col-sm-6 col-xs-10 login-card my-card shadow-6">
      <q-card-section class="row bg-blue-8 text-white justify-between">
        <div class="row login-header-right-side justify-center items-center">
          <q-img class="login-alaa-logo"
                 src="img/3a-logo.png"
                 alt="3a-logo" />
          <p class="login-entry-title q-ml-md q-mb-none">ورود</p>
        </div>
        <q-avatar>
          <img src="img/alaa-logo.png"
               alt="logo">
        </q-avatar>
      </q-card-section>
      <q-linear-progress v-if="loadingList"
                         color="warning"
                         class="q-mt-sm" />
      <q-separator></q-separator>
      <div class="q-pa-lg">
        <q-input
          ref="userName"
          v-model="username"
          bottom-slots
          color="blue-8"
          name="userName"
          label="شماره همراه"
          @keydown.enter="getEnter('pass')"
        >
          <template v-slot:before>
            <q-icon name="person"></q-icon>
          </template>
        </q-input>
        <q-input
          ref="pass"
          v-model="password"
          color="blue-8"
          bottom-slots
          name="pass"
          label="رمز"
          type="password"
          @keydown.enter="login">
          <template v-slot:before>
            <q-icon name="lock"></q-icon>
          </template>
        </q-input>
        <q-card-actions align="left">
          <q-btn style="width: 80px"
                 color="blue-8"
                 label="ورود"
                 @click="login" />
        </q-card-actions>
      </div>
    </q-card>
  </div>
</template>

<script>
import { mixinAuth } from 'src/mixin/Mixins'
export default {
  name: 'Login',
  mixins: [mixinAuth],
  data: () => ({
    userLogin: false,
    loadingList: false,
    username: null,
    password: null
  }),
  created () {
    if (this.getToken()) {
      this.getUserData()
        .then(() => {
          this.redirectTo()
        })
    }
  },
  methods: {
    getToken () {
      return this.$store.getters['Auth/accessToken']
    },

    getEnter (targetRefKey) {
      this.$refs[targetRefKey].focus()
    },

    redirectTo () {
      if (this.$route.query.redirectTo_exam) {
        this.$router.push({
          name: 'onlineQuiz.StartExamAutomatically',
          params: {
            examId: this.$route.query.redirectTo_exam,
            autoStart: this.$route.query.exam_auto_start
          }
        })
        return
      }
      let redirectTo = this.$store.getters['Auth/redirectTo']
      if (!redirectTo) {
        redirectTo = 'Public.Home'
      }
      this.$store.commit('Auth/updateRedirectTo', redirectTo)
      this.$router.push({ name: redirectTo })
      this.$store.commit('Auth/updateRedirectTo', null)
    },

    handleErr (err) {
      this.loadingList = false
      const messages = []
      for (const key in err.data.errors) {
        err.data.errors[key].forEach(message => {
          this.$q.notify({
            type: 'negative',
            message,
            position: 'top'
          })
        })
      }
      if (!err.data.errors) {
        if (err.data.message) messages.push(err.data.message)
        else messages.push(err.statusText)
        this.$q.notify({
          type: 'negative',
          message: messages,
          position: 'top'
        })
      }
    },

    login () {
      this.loadingList = true
      this.$store.dispatch('Auth/login', {
        mobile: this.username,
        password: this.password
      })
        .then(() => {
          this.loadingList = false
          this.$axios.defaults.headers.common.Authorization = 'Bearer ' + this.$store.getters['Auth/accessToken']
          this.getUserData()
            .then(() => {
              this.redirectTo()
            })
        })
        .catch(err => {
          this.handleErr(err.response)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page{
  height: 100vh;
  .login-card{
    margin: auto;
    .login-header-right-side{
      .login-alaa-logo{
        width: 20px;
      }
      .login-entry-title{
        font-size: 20px;
      }
    }
  }
}
</style>

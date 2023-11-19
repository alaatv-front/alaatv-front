<template>
  <div v-if="!isUserLogin"
       class="login  bg-white  q-my-md"
       :class="isUserLogin ? 'user-logged-in' : 'user-not-logged-in'">
    <div class="login-text bg-green-3 q-px-md q-my-xl">
      <div class="bg-grey-3 q-pa-md text-center">
        <p>پیش از ثبت سفارش وارد حساب کاربری خود شوید</p>
        <p>اگر حساب کاربری در آلاء ندارید با وارد کردن شماره همراه و کد ملی خود میتوانید به سادگی حساب خود را ایجاد
          کنید</p>
      </div>
    </div>
    <div class="row justify-between">
      <div class="row justify-center col-sm-5 col-md-12 col-xs-12">
        <span class="col-4 q-mt-sm">شماره همراه</span>
        <q-input ref="userName"
                 v-model="username"
                 class="phone-number q-mb-md col-8"
                 dir="ltr"
                 dense
                 clearable
                 outlined
                 name="userName"
                 placeholder="09........." />
      </div>
      <div class="row justify-between col-sm-5 col-md-12 col-xs-12">
        <span class="col-4 q-mt-sm">کد ملی</span>
        <q-input ref="pass"
                 v-model="password"
                 class="natinalo-code q-mb-md col-8"
                 dir="ltr"
                 dense
                 clearable
                 outlined
                 name="pass"
                 placeholder="..........."
                 @keydown.enter="login" />
      </div>
    </div>
    <q-btn color="green-6"
           unelevated
           class="q-my-md full-width"
           label="ورود/ثبت نام"
           @click="login" />
  </div>
</template>
<script>
import { mixinAuth } from 'src/mixin/Mixins.js'

export default {
  name: 'login',
  mixins: [mixinAuth],
  data: () => ({
    // localUser: new User(),
    isUserLogin: false,
    username: null,
    password: null,
    rules: {
      required: value => !!value || 'این فیلد الزامی است',
      password: value => (!!value && value.length === 10) || 'کد ملی می بایست ده رفم باشد'
    },
    errorMessage: ''
  }),
  mounted () {
    this.loadAuthData()
  },
  methods: {
    loadAuthData () { // prevent Hydration node mismatch
      // this.localUser = this.$store.getters['Auth/user']
      this.isUserLogin = this.$store.getters['Auth/isUserLogin']
    },
    handleErr(err) {
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
    login() {
      // this.loadingList = true
      this.$store.dispatch('Auth/login', {
        mobile: this.username,
        password: this.password
      })
        .then(() => {
          // this.loadingList = false
          this.$axios.defaults.headers.common.Authorization = 'Bearer ' + this.$store.getters['Auth/accessToken']
          this.getUserData()
        })
        .catch(err => {
          this.handleErr(err.response)
        })
    }
    // loginClicked() {
    //   this.errorMessage = ''
    //   this.$refs.pass.blur()
    //   console.log('loginClicked')
    //   if (!this.loginInfo.userName.value && !this.loginInfo.password.value) {
    //     this.errorMessage = 'لطفا اطلاعات خود را وارد کنید'
    //     return
    //   } else if (!this.loginInfo.userName.value) {
    //     this.errorMessage = 'وارد کردن شماره همراه الزامی است'
    //     return
    //   } else if (!this.loginInfo.password.value) {
    //     this.errorMessage = 'وارد کردن کد ملی الزامی است'
    //     return
    //   }
    //   this.$emit('login', this.loginInfo)
    // },
    // getEnter(e) {
    //   this.errorMessage = ''
    //   console.log('e in login :', e)
    //   const actions = {
    //     pass: () => this.loginClicked(),
    //     userName: () => this.$refs.pass.focus()
    //   }
    //   if (e.keyCode === 13) actions[e.target.name].call()
    // }
  }
}
</script>
<style lang="scss" scoped>
p {
  margin-bottom: 0;
  color: #575962 !important;
}

.login {
  box-shadow: 0 6px 5px rgb(0 0 0 / 3%);
  border-radius: 10px;
  padding: 30px 16px;
}

.login-text {
  border-radius: 8px;
}

.user-not-logged-in {
  margin-left: 20px;

  @media screen and (width <= 1023px) {
    margin-left: 0;
  }
}
</style>

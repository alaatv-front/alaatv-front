<template>
  <div class="login-card"
       :class="{defaultLoginCard: defaultLayout}">
    <div v-if="!userLogin">
      <div v-if="loading"
           class="text-center login-loading">
        <q-spinner-ball color="primary"
                        size="5em" />
      </div>
      <div v-else>
        <div v-if="defaultLayout"
             class="header">
          <q-btn v-if="domainSameWithAppDomain"
                 flat
                 rounded
                 :to="{name: 'Public.Home'}">
            <q-avatar size="42px">
              <lazy-img src="https://nodes.alaatv.com/upload/alaa-logo.png"
                        width="40"
                        height="40"
                        class="full-width" />
            </q-avatar>
          </q-btn>
          ثبت نام و ورود
        </div>
        <div class="phone-number">
          <div class="label" />
          <q-input ref="userName"
                   v-model="username"
                   bottom-slots
                   hide-bottom-space
                   label="شماره همراه"
                   autocomplete="off"
                   pattern="[0-9]*"
                   inputmode="numeric"
                   onfocus="this.removeAttribute('readonly');"
                   name="userName"
                   placeholder=" - - - - - - - - - 09"
                   @keydown.enter="getEnter('pass')" />
        </div>
        <div class="national-code">
          <div class="label" />
          <q-input ref="pass"
                   v-model="password"
                   name="pass"
                   label="کد ملی"
                   hide-bottom-space
                   type="password"
                   pattern="[0-9]*"
                   inputmode="numeric"
                   @keydown.enter="login" />
        </div>
        <q-btn class="full-width login-btn"
               :class="{'bg-green-6': !defaultLayout}"
               unelevated
               color="primary"
               label="ثبت نام / ورود"
               @click="login" />
      </div>
    </div>
  </div>
</template>

<script>
import { mixinAuth } from 'src/mixin/Mixins.js'
import LazyImg from 'src/components/lazyImg.vue'

export default {
  name: 'AuthLogin',
  components: { LazyImg },
  mixins: [mixinAuth],
  props: {
    redirect: {
      type: (Object, Boolean),
      default: null
    },
    defaultLayout: {
      default: true,
      type: Boolean
    }
  },
  emits: ['onLoggedIn'],
  data: () => ({
    userLogin: false,
    loading: true,
    username: null,
    password: null
  }),
  mounted () {
    this.loading = false
    this.$store.dispatch('Auth/logOut', { redirectTo: false, clearRedirectTo: false })
  },
  methods: {
    getToken () {
      return this.$store.getters['Auth/accessToken']
    },
    getEnter (targetRefKey) {
      this.$refs[targetRefKey].focus()
    },
    redirectTo () {
      let redirectTo = this.$store.getters['Auth/redirectTo']
      if (this.redirect) {
        redirectTo = this.redirect
      }
      if (this.redirect === false) {
        this.$store.commit('Auth/updateRedirectTo', null)
        return
      }
      if (redirectTo === null || typeof redirectTo !== 'object') {
        redirectTo = { name: 'Public.Home' }
      }
      this.$router.push(redirectTo)
      this.$store.commit('Auth/updateRedirectTo', null)
    },
    handleErr (err) {
      this.loading = false
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
      this.loading = true
      this.$store.dispatch('Auth/login', {
        mobile: this.username,
        password: this.password
      })
        .then(() => {
          this.loading = false
          // this.$axios.defaults.headers.common.Authorization = 'Bearer ' + this.$store.getters['Auth/accessToken']
          // this.getUserData()
          //   .then(() => {
          //     this.$store.commit('AppLayout/updateLoginDialog', false)
          //     this.redirectTo()
          //   })
          this.$store.commit('AppLayout/updateLoginDialog', false)
          this.$emit('onLoggedIn')
          this.$bus.emit('onLoggedIn')
          this.redirectTo()
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.defaultLoginCard{
  width: 434px;
  height: 485px;
}
.login-card {
  box-shadow: 2px -4px 10px rgba(255, 255, 255, 0.6), -2px 4px 10px rgba(112, 108, 162, 0.05);
  background: #fff;
  margin: auto;
  border-radius: 20px;
  padding:60px 67px;
  @media only screen and (max-width: 600px){
    padding: 30px;
  }
  .login-loading {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .header{
    margin-bottom: 50px;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 37px;
    letter-spacing: -0.03em;
    color: #65677F;
  }
  .label{
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
    letter-spacing: -0.03em;
    color: #434765;
    margin-bottom: 8px;
  }
  .login-btn{
    :deep(.q-btn__content){
      font-weight: 600;
      font-size: 14px;
      line-height: 22px;
    }
  }
  .phone-number{
    margin-bottom: 16px;
  }
  .national-code{
    margin-bottom: 56px;
  }
  :deep(.q-field--focused) {
    appearance: none;
  }
  &:deep(.q-field--focused .q-field__control) {
    background-color: rgba(255,255,255,0) !important;
    appearance: none;
  }
}
@media only screen and (max-width: 1023px){
  .default-login-card {
    width: 312px;
    height: 409px;
    border-radius: 16px;
    padding: 40px 30px;

    .header {
      margin-bottom: 30px;
      font-size: 20px;
      line-height: 31px;
    }

    .label {
      font-size: 14px;
      line-height: 22px;
      letter-spacing: -0.03em;
    }
  }
}

@media only screen and (max-width: 600px){
  .defaultLoginCard{
    width: 300px;
    height: 450px;
  }
}

@media only screen and (max-width: 400px){
  .defaultLoginCard{
    width: 270px;
    height: 450px;
  }
}
</style>

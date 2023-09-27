<template>
  <div :class="options.className"
       :style="options.style">
    <q-tab-panels v-model="panel"
                  animated
                  class="UserMobileVerification">
      <q-tab-panel name="inputMobile">
        تایید شماره همراه:
        <q-input v-model="user.mobile"
                 disable
                 class="q-mb-md" />
        <q-btn color="primary"
               :loading="user.loading"
               class="float-right"
               @click="sendVerifyCode">
          ارسال کد تایید
        </q-btn>
      </q-tab-panel>

      <q-tab-panel name="verifyCode">
        لطفا کد تایید ارسال شده به شماره
        {{ user.mobile }}
        را وارد کنید
        <q-input v-model="verifyCode"
                 class="q-mb-md" />
        <div class="resend-timer-message q-mb-md">
          <template v-if="!timerEnded">
            <span class="resend-timer-message-value">
              <timer ref="timer"
                     :time="120"
                     @stop="onStopTimer" />
            </span>
            تا درخواست مجدد
          </template>
          <template v-else>
            <q-btn color="primary"
                   class="float-left"
                   :loading="user.loading"
                   @click="restartTimer">
              ارسال مجدد کد تایید
            </q-btn>
          </template>
        </div>

        <q-btn color="primary"
               :loading="user.loading"
               class="float-right"
               @click="verifyMobile">
          تایید شماره همراه
        </q-btn>
      </q-tab-panel>

      <q-tab-panel name="verified">
        <q-linear-progress v-if="user.loading"
                           indeterminate />
        <div class="verified-panel">
          <div class="image-section">
            <lazy-img src="https://nodes.alaatv.com/aaa/landing/Soalaa/States/thankyou_page.png"
                      width="50"
                      height="50" />
          </div>
          <div>
            شماره شما تایید شده است.
          </div>
          <div>
            ({{ user.mobile }})
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { User } from 'src/models/User.js'
import Timer from './components/Timer.vue'
import LazyImg from 'src/components/lazyImg.vue'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'UserMobileVerification',
  components: { LazyImg, Timer },
  mixins: [mixinWidget],
  data () {
    return {
      user: new User(),
      panel: 'inputMobile',
      verifyCode: null,
      timerEnded: false,
      sendOtpLoading: false,
      mobile: null
    }
  },
  mounted () {
    this.loadAuthData()
    this.loadOTPCredential()
    const isMobileIsVerified = this.isMobileIsVerified()
    if (isMobileIsVerified) {
      this.panel = 'verified'
    }
  },
  methods: {
    loadOTPCredential () {
      if (typeof window !== 'undefined' && 'OTPCredential' in window) {
        const abort = new AbortController()
        setTimeout(() => {
          // abort after two minutes
          abort.abort()
        }, 2 * 60 * 1000)
        window.navigator.credentials
          .get({
            otp: { transport: ['sms'] },
            signal: abort.signal
          })
          .then((otp) => {
            this.verifyCode = otp.code
          })
          .catch(() => {})
      }
    },
    loadAuthData () {
      this.user = this.$store.getters['Auth/user']
    },
    isMobileIsVerified () {
      return !!this.user.mobile_verified_at
    },
    sendVerifyCode () {
      this.user.loading = true
      APIGateway.user.mobileResend()
        .then(({ code, message }) => {
          this.user.loading = false
          if (code) {
            this.verifyCode = code
          }
          this.panel = 'verifyCode'
          this.timerEnded = false
          this.$nextTick(() => {
            this.$refs.timer.startTimer()
          })
          this.$q.notify({
            message,
            type: 'positive'
          })
        })
        .catch(() => {
          this.user.loading = false
        })
    },
    verifyMobile () {
      this.user.loading = true
      APIGateway.user.mobileVerify({ code: this.verifyCode })
        .then(() => {
          this.panel = 'verified'
          this.user.mobile_verified_at = true
          this.$store.dispatch('Auth/updateUser')
            .then(() => {
              this.user.loading = false
              this.loadAuthData()
              if (!this.user.needToCompleteInfo()) {
                this.redirectTo()
              } else {
                this.$q.notify({
                  message: 'لطفا اطلاعات خود را کامل کنید.',
                  type: 'warning'
                })
              }
            })
            .catch(() => {
              this.user.loading = false
            })
          this.$q.notify({
            message: 'شماره شما تایید شد',
            type: 'positive'
          })
        })
        .catch(() => {
          this.user.loading = false
        })
    },
    redirectTo () {
      const redirectTo = this.$store.getters['Auth/redirectTo']
      if (redirectTo && typeof redirectTo === 'object') {
        this.$router.push(redirectTo)
        this.$store.commit('Auth/updateRedirectTo', null)
      }
    },
    onStopTimer () {
      this.timerEnded = true
    },
    restartTimer () {
      this.sendVerifyCode()
    }
  }
}
</script>

<style lang="scss" scoped>
.UserMobileVerification {
  box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
  border-radius: 20px;
  background: #fff;
  padding: 16px;
  .verified-panel {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    .image-section {
      width: 50px;
    }
  }
}
</style>

<template>
  <q-card class="dialog-card">
    <q-card-section class="dialog-title">
      ثبت نام
    </q-card-section>
    <q-card-section class="dialog-subtitle">اظلاعات خود را وارد نمایید</q-card-section>
    <q-card-section class="login-input-wrapper">
      <q-input v-if="userInputs.first_name"
               v-model="form.first_name"
               class="landing-text-input"
               placeholder="نام"
               :rules="rules"
               outlined
               color="primary" />
      <q-input v-if="userInputs.last_name"
               v-model="form.last_name"
               class="landing-text-input"
               placeholder="نام خانوادگی"
               :rules="rules"
               outlined
               color="primary" />
      <q-select v-if="userInputs.major"
                v-model="form.major_id"
                class="landing-text-input"
                hide-dropdown-icon
                :options="stringOptions.major"
                option-label="title"
                option-value="id"
                label="رشته"
                filled />
      <q-select v-if="userInputs.grade"
                v-model="form.grade_id"
                hide-dropdown-icon
                class="landing-text-input"
                :options="stringOptions.grade"
                option-label="title"
                option-value="id"
                label="پایه تحصیلی"
                filled />
    </q-card-section>
    <q-card-actions class="dialog-action">
      <q-btn class="send-btn"
             :disabled="loading"
             color="primary"
             @click="updateUser">
        ارسال
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>

export default {
  name: 'InfoCompletion',
  components: {
  },
  props: {
    options: {
      type: Object,
      default: () => {}
    },
    userInfo: {
      type: Object,
      default: () => {}
    },
    eventId: {
      type: String,
      default: null
    },
    hasRedirect: {
      type: Boolean,
      default: false
    },
    redirectUrl: {
      type: String,
      default: null
    }
  },
  emits: ['toggleDialog'],
  data() {
    return {
      loading: false,
      otpInput: null,
      bindModal: null,
      rules: {
        required: value => !!value || 'این فیلد الزامی است'
      },
      form: {
        mobile: null,
        code: null,
        first_name: null,
        last_name: null,
        major_id: null,
        grade_id: null
      },
      stringOptions: {
        major: [
          {
            id: 1,
            title: 'ریاضی'
          },
          {
            id: 2,
            title: 'تجربی'
          },
          {
            id: 3,
            title: 'انسانی'
          }
        ],
        grade: [
          {
            id: 5,
            title: 'هفتم'
          },
          {
            id: 6,
            title: 'هشتم'
          },
          {
            id: 7,
            title: 'نهم'
          },
          {
            id: 1,
            title: 'دهم'
          },
          {
            id: 2,
            title: 'یازدهم'
          },
          {
            id: 8,
            title: 'دوازدهم'
          },
          {
            id: 9,
            title: 'فارغ التحصیل نظام جدید'
          },
          {
            id: 10,
            title: 'فارغ التحصیل نظام قدیم'
          },
          {
            id: 11,
            title: 'دانشجو'
          },
          {
            id: 12,
            title: 'اولیای دانش آموز'
          },
          {
            id: 13,
            title: 'معلم'
          },
          {
            id: 14,
            title: 'سایر'
          }
        ]
      },
      userInputs: {
        first_name: true,
        last_name: true,
        major: true,
        grade: true
      }
    }
  },
  mounted() {
    this.loadConfig()
  },
  methods: {
    loadConfig() {
      this.userInputs = this.options
      // this.getTags()
    },
    getTags() {
      this.$apiGateway.forrest.getTags(['major', 'grade']).then(res => {
        this.stringOptions = []
        res.map((tree) => tree.children).forEach(category => {
          category.forEach(item => {
            this.stringOptions[category].push(item)
          })
        })
      }).catch(() => {
      })
    },
    updateUser() {
      this.form.mobile = this.userInfo.mobile
      this.form.code = this.userInfo.code
      this.setLoading(true)
      this.$apiGateway.user.newsletter({
        mobile: this.form.mobile, // String
        code: this.form.code, // String
        first_name: this.form.first_name, // String
        last_name: this.form.last_name, // String
        event_id: this.eventId, // String
        major_id: this.form.major_id.id, // String
        grade_id: this.form.grade_id.id // String
      })
        .then((message) => {
          this.showMessage(message, 'positive')
          if (this.hasRedirect) {
            this.redirectToUrl(this.redirectUrl)
          }
          this.$emit('toggleDialog')
          this.setLoading(false)
        })
        .catch(() => {
          this.setLoading(false)
        })
    },
    setLoading(loading) {
      this.loading = loading
    },
    redirectToUrl (url) {
      if (!url) {
        return
      }
      window.location.href = url
    },
    showMessage(message, type = 'negative') {
      this.$q.notify({
        message,
        color: type,
        position: 'top',
        multiLine: true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-input-wrapper{
  direction: rtl;
}

.dialog-card {
    background: transparent;
    box-shadow: none !important;

    .dialog-title {
        display: flex;
        justify-content: center;
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 28px;
        text-align: center;
        letter-spacing: -0.03em;
        color: #383838;
        padding-top: 0;
        padding-bottom: 0;
    }

    .dialog-subtitle {
        margin-top: 16px;
        padding-bottom: 0;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        text-align: center;
        letter-spacing: -0.03em;
        color: #383838;

        @media screen and (width <= 1439px) {
            margin-top: 16px;
        }

        @media screen and (width <= 1023px) {
            margin-top: 16px;
        }

        @media screen and (width <= 599px) {
            margin-top: 16px;
        }
    }

    .dialog-action {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 10px;

        .send-btn {
            width: 100%;
            margin-bottom: 24px;
            box-shadow: none;

            @media screen and (width <= 1439px) {
                width: 280px;
            }

            @media screen and (width <= 1023px) {
                width: 280px;
            }

            @media screen and (width <= 599px) {
                width: 240px;
            }
        }

        @media screen and (width <= 1439px) {
            margin-top: 60px;
        }

        @media screen and (width <= 1023px) {
            margin-top: 60px;
        }

        @media screen and (width <= 599px) {
            margin-top: 49px;
        }
    }

 .landing-text-input {
    height: 40px;
    background: #F7E5C6;
    border-radius: 8px;
    margin: 3px 0;

    &:deep(.q-field__native) {
      text-align: left;
    }

    &.desabled {
      background: #F7E5C6;
      mix-blend-mode: normal;
      opacity: .4;
    }
  }
}

</style>

<style>
.landing-otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgb(0 0 0 / 30%);
  text-align: center;
}

/* Background colour of an input field with value */
.landing-otp-input.is-complete {
  background-color: #e4e4e4;
}

.landing-otp-input::-webkit-inner-spin-button,
.landing-otp-input::-webkit-outer-spin-button {
  appearance: none;
  margin: 0;
}
</style>

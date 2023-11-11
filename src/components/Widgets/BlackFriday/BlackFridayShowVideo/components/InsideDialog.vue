<template>
  <div class="BlackFridayRewardsInsideDialog">
    <div class="top-image">
      <lazy-img :src="image"
                width="368"
                height="264"
                class="image" />
    </div>
    <q-card>
      <div class="header">
        <div class="title"
             v-html="title" />
        <div class="action">
          <q-btn v-close-popup
                 flat
                 square
                 class="size-xs"
                 color="grey"
                 icon="ph:x" />
        </div>
      </div>
      <div class="body">
        <div class="message"
             v-html="message" />
        <div v-if="hasCoupon"
             class="coupon-box">
          <div class="title-section">
            کد تخفیف
            <span>
              {{ couponTitle }}
              تومانی
            </span>
            :
          </div>
          <div class="code-section">
            <div class="code">
              {{ couponCode }}
            </div>
            <q-btn flat
                   class="btn-copy"
                   icon="ph:copy"
                   label="کپی"
                   @click="copyCode" />
          </div>
        </div>
      </div>
      <div v-if="hasAction"
           class="action-section">
        <q-btn class="action-btn"
               @click="onAction">
          <template v-if="state === 'watch-video-0'">
            متوجه شدم
          </template>
          <template v-else-if="state.includes('watch-video-')">
            استفاده از کد تخفیف
            <q-icon name="ph:caret-left" />
          </template>
          <template v-else-if="state.includes('participate-success-coupon')">
            استفاده از کد تخفیف
            <q-icon name="ph:caret-left" />
          </template>
          <template v-else-if="state.includes('participate-success-infinity')">
            <q-icon name="ph:envelope-simple" />
            ارسال تیکت پشتیبانی
          </template>
        </q-btn>
      </div>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { copyToClipboard } from 'quasar'
import LazyImg from 'components/lazyImg.vue'

export default defineComponent({
  name: 'BlackFridayRewardsInsideDialog',
  components: { LazyImg },
  props: {
    state: {
      type: String,
      validator: (val) => [
        'watch-video-0',
        'watch-video-1',
        'watch-video-2',
        'watch-video-3',
        'watch-video-4',
        'watch-video-5',
        'watch-video-6',
        'watch-video-7',
        'participate-success-coupon',
        'participate-success-infinity',
        'participate-fail-has-chance',
        'participate-fail-no-chance'
      ].includes(val),
      default: null
    },
    couponTitle: {
      type: String,
      default: ''
    },
    couponCode: {
      type: String,
      default: ''
    },
    scrollToElementClassName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  },
  computed: {
    image () {
      if (!this.state) {
        return 'https://nodes.alaatv.com/upload/alaaPages/2023-11/011699447502.png'
      }

      if (this.state.includes('watch-video-')) {
        return 'https://nodes.alaatv.com/upload/alaaPages/2023-11/011699447502.png'
      }

      if (this.state.includes('participate-success-')) {
        return 'https://nodes.alaatv.com/upload/alaaPages/2023-11/021699447376.png'
      }

      if (this.state.includes('participate-fail-')) {
        return 'https://nodes.alaatv.com/upload/alaaPages/2023-11/031699447581.png'
      }

      return 'https://nodes.alaatv.com/upload/alaaPages/2023-11/011699447502.png'
    },
    title () {
      if (!this.state) {
        return ''
      }

      if (this.state === 'watch-video-0') {
        return 'آلایی جان !'
      }

      if (this.state.includes('watch-video-')) {
        return 'ممنون که به فکر خودتی ...'
      }

      if (this.state === 'participate-success-coupon') {
        return 'سورپرایز ۱,۰۰۰,۰۰۰ تومانی'
      }

      if (this.state === 'participate-success-infinity') {
        return 'این اووووج خوش شانسیه !'
      }

      if (this.state === 'participate-fail-has-chance') {
        return 'شانس نیوردی!'
      }

      if (this.state === 'participate-fail-no-chance') {
        return 'نشد که بشه !'
      }

      return ''
    },
    message () {
      if (!this.state) {
        return ''
      }

      if (this.state === 'watch-video-0') {
        return '۷ روز با همیم تا ۷ قانون ارزشمند رتبه برتر ها رو مرور کنیم.' +
          '<br/>' +
          'فردا همینجا میبینمت ...'
      }

      if (this.state.includes('watch-video-')) {
        return 'جایزه امروز آلا، کد تخفیف' + this.couponTitle + ' تومانه و تا ۱۰ آذر معتبره!'
        // +
        // '<br/>' +
        // '(برای حداقل خرید n هزار تومان)'
      }

      if (this.state === 'participate-success-coupon') {
        return 'درسته "سرعت بی نهایت" نبردی ولی ۱ میلیون تومان تخفیف بردی!'
        // +
        // '<br/>' +
        // '(برای حداقل خرید n هزار تومان)'
      }

      if (this.state === 'participate-success-infinity') {
        return 'برنده "سرعت بی نهایت" شدی و تا کنکور 1403 هر دوره‌ای رو بخوایی بهت هدیه میدیم!' +
          '<br/>' +
          ' به پشتیبانی پیام بده:'
      }

      if (this.state === 'participate-fail-has-chance') {
        return 'فردا هم فرصت داری هم جایزه جلسه بعد بگیری و هم شانس دیگه‌ت رو امتحان کنی...'
      }

      if (this.state === 'participate-fail-no-chance') {
        return 'اما توی این ۷ روز ۷ قانون رتبه برتر ها رو یاد گرفتی و این بزرگترین هدیه به خودت بود.'
      }

      return ''
    },
    hasAction () {
      if (!this.state) {
        return false
      }

      return !this.state.includes('participate-fail-')
    },
    hasCoupon () {
      if (!this.state) {
        return false
      }

      if (this.state === 'watch-video-0') {
        return false
      }

      if (this.state.includes('watch-video-')) {
        return true
      }

      if (this.state === 'participate-success-coupon') {
        return true
      }

      if (this.state === 'participate-success-infinity') {
        return false
      }

      if (this.state.includes('participate-fail-')) {
        return false
      }

      return false
    }
  },
  methods: {
    copyCode () {
      copyToClipboard(this.couponCode)
        .then(() => {
          this.$q.notify({
            message: 'کپی شد',
            type: 'positive'
          })
        })
        .catch(() => {
          this.$q.notify({
            type: 'negative',
            message: 'مشکلی در کپی کردن رخ داده است.'
          })
        })
    },
    onAction () {
      this.scrollToElement(this.scrollToElementClassName)
    },
    scrollToElement(className) {
      const el = document.getElementsByClassName(className)[0]
      const headerOffset = 0
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }
})

</script>

<style scoped lang="scss">
.BlackFridayRewardsInsideDialog {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .top-image {
    width: 100%;
    display: flex;
    justify-content: center;
    :deep(.image) {
      width: 184px;
    }
  }
  .q-card {
    width: 495px;
    border-radius: 16px;
    background: #19172E;
    .header {
      padding: 20px 24px 0 32px;
      display: flex;
      $action-width: 24px;
      .title {
        color: #FFF;
        text-align: center;
        font-family: ModamFaNumWeb,serif;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: -0.48px;
        width: calc( 100% - #{$action-width} );
      }
      .action {
        width: $action-width;
        :deep(.q-btn) {
          .q-btn__content {
            color: #D0CCF4 !important;
          }
        }
      }
    }
    .body {
      padding: 32px;
      .message {
        color: #FFF;
        text-align: center;
        font-family: ModamFaNumWeb,serif;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.54px;
        margin-bottom: 24px;
      }
      .coupon-box {
        display: flex;
        $code-section-width: 211px;
        $code-section-height: 48px;
        .title-section {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          height: $code-section-height;
          color: #FFF;
          font-family: ModamFaNumWeb,serif;
          font-size: 20px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: -0.8px;
          width: calc( 100% - #{$code-section-width} );
          span {
            color: #F7AFA4;
            font-family: ModamFaNumWeb,serif;
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            letter-spacing: -0.8px;
          }
        }
        .code-section {
          width: $code-section-width;
          height: $code-section-height;
          border-radius: 12px;
          background: #2F2A5B;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          .code {
            color: #FFF;
            font-family: ModamFaNumWeb,serif;
            font-size: 18px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            letter-spacing: -0.36px;
          }
          :deep(.q-btn.q-btn--flat.btn-copy) {
            padding: 0 !important;
            .q-btn__content {
              color: #D0CCF4 !important;
              font-family: ModamFaNumWeb,serif;
              font-size: 18px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
              letter-spacing: -0.36px;
              .q-icon {
                font-size: 24px;
              }
            }
          }
        }
      }
    }
    .action-section {
      padding-right: 32px;
      padding-left: 32px;
      padding-bottom: 32px;
      :deep(.action-btn.q-btn) {
        width: 100%;
        height: 48px;
        padding: 12px !important;
        border-radius: 12px;
        background: #D14835;
        .q-btn__content {
          color: #FFF;
          text-align: center;
          font-family: ModamFaNumWeb,serif;
          font-size: 16px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: -0.48px;
          .q-icon {
            font-size: 20px;
            margin: 0 4px;
          }
        }
      }
    }
  }
}
</style>

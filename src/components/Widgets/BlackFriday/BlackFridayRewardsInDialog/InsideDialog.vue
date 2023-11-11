<template>
  <q-card class="BlackFridayRewardsInsideDialog">
    <div v-for="(rewar, rewarIndex) in reward"
         :key="rewarIndex"
         class="reward-item">
      <div class="reward-item-title">
        {{ rewar.title }}
        :
      </div>
      <div class="reward-item-action">
        <div v-if="rewar.code"
             class="code-section">
          <div class="code">
            {{ rewar.code }}
          </div>
          <q-btn flat
                 class="btn-copy"
                 icon="ph:copy"
                 label="کپی" />
        </div>
        <q-btn v-else
               class="btn-send-ticket">
          <q-icon name="ph:envelope-simple" />
          ارسال تیکت
        </q-btn>
      </div>
    </div>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BlackFridayRewardsInsideDialog',
  props: {
    reward: {
      type: Array,
      default: () => []
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
        return 'جایزه امروز آلا، کد تخفیفn هزار تومانه و تا ۱۰ آذر معتبره!' +
          '<br/>' +
          '(برای حداقل خرید n هزار تومان)'
      }

      if (this.state === 'participate-success-coupon') {
        return 'درسته "سرعت بی نهایت" نبردی ولی ۱ میلیون تومان تخفیف بردی!' +
          '<br/>' +
          '(برای حداقل خرید n هزار تومان)'
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
  }
})

</script>

<style scoped lang="scss">
.BlackFridayRewardsInsideDialog {
  padding: 20px;
  display: flex;
  flex-flow: column;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background: #19172E;
  width: 339px;
  .reward-item {
    padding-top: 12px;
    padding-bottom: 12px;
    border-bottom: solid 1px #2F2A5B;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    &:first-child {
      padding-top: 0;
    }
    &:last-child {
      padding-bottom: 0;
      border-bottom: none;
    }
    $action-width: 153px;
    .reward-item-title {
      width: calc( 100% - #{$action-width} );
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: #FFF;
      font-family: ModamFaNumWeb,serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.64px;
    }
    .reward-item-action {
      width: $action-width;
      .btn-send-ticket {
        width: 100%;
        padding: 8px;
        border-radius: 12px;
        background: #D14835;
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
          margin-right: 4px;
        }
      }
      $code-section-width: 153px;
      $code-section-height: 40px;
      .code-section {
        width: $code-section-width;
        height: $code-section-height;
        border-radius: 12px;
        background: #2F2A5B;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px;
        .code {
          color: #FFF;
          font-family: ModamFaNumWeb,serif;
          text-align: right;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          letter-spacing: -0.32px;
        }
        :deep(.q-btn.q-btn--flat.btn-copy) {
          padding: 0 !important;
          .q-btn__content {
            color: #D0CCF4 !important;
            font-family: ModamFaNumWeb,serif;
            text-align: right;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            letter-spacing: -0.32px;
            .q-icon {
              margin-right: 4px;
              font-size: 20px;
            }
          }
        }
      }
    }
  }
}
</style>

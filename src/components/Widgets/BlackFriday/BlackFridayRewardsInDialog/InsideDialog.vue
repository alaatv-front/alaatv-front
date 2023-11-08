<template>
  <div class="BlackFridayRewardsInsideDialog">
    <div class="top-image">
      <lazy-img src="https://nodes.alaatv.com/upload/alaaPages/2023-10/nabakhte12873.png"
                width="314"
                height="400"
                class="image" />
    </div>
    <q-card>
      <div class="header">
        <div class="title">
          تبریک آلایی جان !
        </div>
        <div class="action">
          <q-btn flat
                 square
                 class="size-xs"
                 color="grey"
                 icon="ph:x" />
        </div>
      </div>
      <div class="body">
        <div class="message">
          ۷ روز با همیم تا 7 قانون ارزشمند رتبه برتر ها رو مرور کنیم.
          فردا همینجا میبینمت ...
        </div>
        <div class="coupon-box">
          <div class="title-section">
            کد تخفیف روز اول :
          </div>
          <div class="code-section">
            <div class="code">
              GFDfgkler0
            </div>
            <q-btn flat
                   class="btn-copy"
                   icon="ph:copy"
                   label="کپی" />
          </div>
        </div>
      </div>
      <div class="action-section">
        <q-btn class="action-btn">
          <q-icon name="ph:envelope-simple" />
          استفاده از کد تخفیف
          <q-icon name="ph:caret-left" />
        </q-btn>
      </div>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import LazyImg from 'src/components/lazyImg.vue'

export default defineComponent({
  name: 'BlackFridayRewardsInsideDialog',
  components: { LazyImg },
  data () {
    return {

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

<template>
  <q-card v-if="isMount"
          class="BlackFridayRewardsInsideDialog">
    <div v-for="(reward, rewardIndex) in rewards"
         :key="rewardIndex"
         class="reward-item">
      <div class="reward-item-title">
        {{ reward.title }}
        :
      </div>
      <div class="reward-item-action">
        <div v-if="reward.code"
             class="code-section">
          <div class="code">
            {{ reward.code }}
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
    rewards: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isMount: false
    }
  },
  mounted() {
    this.isMount = true
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

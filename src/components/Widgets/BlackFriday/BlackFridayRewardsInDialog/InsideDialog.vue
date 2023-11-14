<template>
  <q-card v-if="isMount"
          class="BlackFridayRewardsInsideDialog">
    <div class="reward-header">
      <div class="reward-header__title">
        تخفیف‌های من
      </div>
      <q-btn class="reward-header__close"
             icon="close"
             flat
             color="grey1"
             @click="toggleDialog" />
    </div>
    <q-separator inset
                 dark />
    <template v-if="rewards.length > 0">
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
                   label="کپی"
                   @click="copyCode(reward.code)" />
          </div>
          <q-btn v-else
                 class="btn-send-ticket"
                 @click="gotoTicket">
            <q-icon name="ph:envelope-simple" />
            ارسال تیکت
          </q-btn>
        </div>
      </div>
    </template>
    <div v-else
         class="no-reward">
      <div class="no-reward__message">
        هنوز تخفیفی به دست نیاوردی.
      </div>
      <q-btn label="متوجه شدم"
             @click="toggleDialog" />
    </div>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import { copyToClipboard } from 'quasar'

export default defineComponent({
  name: 'BlackFridayRewardsInsideDialog',
  props: {
    rewards: {
      type: Array,
      default: () => []
    },
    departmentId: {
      type: String,
      default: null
    }
  },
  emits: ['toggleDialog'],
  data () {
    return {
      isMount: false
    }
  },
  mounted() {
    this.isMount = true
  },
  methods: {
    copyCode (code) {
      copyToClipboard(code)
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
    gotoTicket() {
      this.$router.push({ name: 'UserPanel.Ticket.Create', params: { d: this.departmentId } })
    },
    toggleDialog() {
      this.$emit('toggleDialog')
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
  width: 495px;
  max-width: 100%;

  .reward-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;

    &__title {
      color: #FFF;
      text-align: center;
      font-family: ModamFaNumWeb,serif;
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.48px;
      height: 32px;
    }

    &__close {
      position: absolute;
      right: 24px;
      top: 30px;
      padding: 0;
      width: 20px;
      height: 20px;
    }
    :deep(.q-btn.q-btn--flat .q-btn__content){
      color: #ffffff;
      font-size: 20px;
    }
  }
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
  .no-reward {
    display: flex;
    padding: 28px 12px 12px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: stretch;

    &__message {
      color: var(--neutral-01, #FFF);
      text-align: center;
      font-family: ModamFaNumWeb,serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.64px;
      margin-bottom: 48px;
    }

    :deep(.q-btn){
      border-radius: 12px;
      background: #D14835;
      height: 48px;
      width: 100%;
      padding: 12px;
      .q-btn__content {
        color: #ffffff;
        text-align: center;
        font-family: ModamFaNumWeb,serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: -0.48px;
      }
    }

    &__action {

    }
  }
}
</style>

<template>
  <div class="header">
    <div class="title">
      کار آفرینی
    </div>
    <div class="dropdown-menu">
      <div v-if="isMyCardsPage"
           class="sms-help-container"
           @click="toggleDialog">
        <div class="sms-help-text">
          راهنمای کد پیامکی
        </div>
        <q-icon class="sms-help-icon"
                name="ph:chat-text"
                size="16px" />
      </div>
      <btn-user-profile-menu />
    </div>
    <q-dialog v-model="smsHelpDialog">
      <q-card class="sms-help-dialog">
        <q-card-section class="sms-help-dialog_header">
          <span class="sms-help-dialog_header__title">راهنمای کدهای پیامکی</span>
          <q-btn icon="ph:x"
                 class="sms-help-dialog_header__closeBtn"
                 flat
                 square
                 @click="toggleDialog" />
        </q-card-section>
        <q-separator class="grey1" />
        <q-card-section class="sms-help-dialog_main">
          <div class="sms-help-dialog_main__title">
            آسان کارت با ارسال کد های پایین به سرشماره 100062013
          </div>
          <div class="sms-help-dialog_main__list">
            <div class="sms-help-item">
              دریافت کارت :G0
            </div>
            <div class="sms-help-item">
              کارت‌های موجود :G1
            </div>
            <div class="sms-help-item">
              موجودی حساب :G2
            </div>
            <div class="sms-help-item">
              تسویه حساب :G3
            </div>
          </div>
        </q-card-section>
        <q-card-actions class="sms-help-dialog_action"
                        align="right">
          <q-btn label="فهمیدم"
                 class="action-btn"
                 color="secondary"
                 @click="toggleDialog" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import BtnUserProfileMenu from 'src/components/BtnUserProfileMenu.vue'

export default {
  name: 'UserGiftCardPanel',
  components: { BtnUserProfileMenu },
  data() {
    return {
      smsHelpDialog: false
    }
  },
  computed: {
    isMyCardsPage() {
      return this.$route.name === 'UserPanel.Asset.GiftCard.MyGiftCards'
    }
  },
  methods: {
    toggleDialog() {
      this.smsHelpDialog = !this.smsHelpDialog
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  background: #F5F7FA;
  height: 90px;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  .title {
    font-weight: 700;
    font-size: 24px;
    line-height: 37px;
    letter-spacing: -0.03em;
    color: #697D9A;
    margin-top: 24px;
    margin-left: 30px;
  }
  .dropdown-menu {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
    margin-right: 30px;

    .sms-help-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 153px;
      height: 40px;
      background: #E7ECF4;
      margin-right: 24px;
      border-radius: 20px;
      cursor: pointer;

      @media screen and (max-width: 600px){
        width: 36px;
        height: 32px;
        border-radius: 50%;
      }

      .sms-help-text {
        color: #697D9A;

        @media screen and (max-width: 600px){
          display:none;
        }
      }
      .sms-help-icon {
        display:none;
        color: #697D9A;

        @media screen and (max-width: 600px){
          display:block;
        }
      }
    }
  }
}
.sms-help-dialog {
  width: 360px;
  height: 284px;
  border-radius: 12px;
  background: #FFF;
  box-shadow: 0px 2px 4px -2px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.10);

  @media screen and (max-width: 600px){
    width: 320px;
    height: 303px;
  }

  &_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;

    &__title {
      color:#697D9A;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.48px;
    }
    &__closeBtn {
      color:#697D9A;
      padding: 0;
    }
  }

  &_main {
    padding: 24px 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    &__title {
      color:#697D9A;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.42px;
    }

    &__list {
      width: 100%;
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-end;

      .sms-help-item {
        color:#697D9A;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.42px;
      }
    }
  }

  &_action {
    padding: 0 20px 20px;
    position: absolute;
    .action-btn {
      width: 96px;
      height: 32px;
      min-width: 96px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  }
}
</style>

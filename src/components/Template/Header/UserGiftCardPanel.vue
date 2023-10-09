<template>
  <div class="header">
    <div class="title">
      کارت هدیه آلاء
    </div>
    <div class="action-btn row items-center q-col-gutter-md">
      <div class="sms-guide">
        <q-btn label="راهنمای کد پیامکی"
               class="sms-btn"
               rounded
               @click="smsDialog = true" />
      </div>
      <div class="dropdown-menu">
        <btn-user-profile-menu />
      </div>
    </div>
  </div>
  <q-dialog v-model="smsDialog">
    <q-card class="dialog">
      <q-card-section class="dialog-header-section">
        <div class="row items-center justify-between">
          <div>
            راهنمای کدهای پیامکی
          </div>
          <q-btn flat
                 icon="close"
                 color="grey-6"
                 @click="smsDialog = false" />
        </div>
      </q-card-section>
      <q-separator class="grey1" />
      <q-card-section class="dialog-body-section">
        <div class="body2">
          آسان کارت با ارسال کد های پایین به سرشماره 10006420
        </div>
        <div class="body2 text-right q-mt-md">
          دریافت کارت :G0
          <br>
          کارت های موجود :G1
          <br>
          موجودی حساب :G2
          <br>
          تسویه حساب :G3
        </div>
      </q-card-section>
      <q-card-section class="dialog-action-section">
        <div class="row items-center float-right">
          <div class="dialog-action-btn-box">
            <q-btn v-close-popup
                   class="btn q-btn-md keep-min-width"
                   color="positive">
              فهمیدم
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import BtnUserProfileMenu from 'src/components/BtnUserProfileMenu.vue'

export default {
  name: 'UserGiftCardPanel',
  components: { BtnUserProfileMenu },
  data() {
    return {
      smsDialog: false
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
    margin-top: 24px;
    margin-right: 30px;
  }
  .sms-guide {
    .sms-btn {
      margin-top: 25px;
      background: #E7ECF4;
      color: #697D9A;
    }
  }
}
.dialog {
  width: 360px;
  border-radius: 12px;
  .dialog-body-section {
    color: #697D9A;
  }
}
</style>

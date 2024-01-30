<template>
  <q-card>
    <q-card-section class="dialog-header-section">
      <div class="row items-center justify-between">
        <div>
          <q-icon class="dialog-avatar"
                  color="primary"
                  size="sm"
                  name="ph:chat-circle-text" />
          ارسال پیامک به سید مرتضی صحیح النسب
        </div>
        <q-btn v-close-popup
               icon="ph:x"
               color="grey"
               square
               class="size-xs"
               flat />
      </div>
    </q-card-section>
    <q-separator class="grey1" />
    <q-card-section class="dialog-body-section">
      <q-select v-model="model"
                :options="options"
                label="نوع پیامک"
                outlined />
      <q-input v-model="input1"
               class="smsTextarea"
               label="ارسال پیام متنی"
               placeholder="متن پیامک"
               type="textarea" />
    </q-card-section>
    <q-card-section class="dialog-action-section">
      <div class="row items-center justify-between">
        <div />
        <div class="dialog-action-btn-box">
          <q-btn v-close-popup
                 class="q-btn-md keep-min-width q-mr-sm"
                 color="grey"
                 size="md"
                 outline>
            انصراف
          </q-btn>
          <q-btn class="q-btn-md keep-min-width"
                 color="primary">
            ارسال
          </q-btn>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SmsDialogInner'
})
</script>

<style lang="scss" scoped>
.smsTextarea {
  margin-top: $space-6;
}
</style>

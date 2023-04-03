<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row">
          <div class="col-md-7">
            <q-input v-model="localOptions.totalPrice" />
          </div>
          <div class="col-md-4 offset-1 text-right">
            <q-checkbox v-model="localOptions.hasTotalPrice"
                        left-label
                        label="جمع سبد خرید" />
          </div>
          <div class="col-md-7">
            <q-input v-model="localOptions.useWallet" />
          </div>
          <div class="col-md-4 offset-1 text-right">
            <q-checkbox v-model="localOptions.hasUseWallet"
                        left-label
                        label="استفاده از کیف پول" />
          </div>
          <div class="col-md-7">
            <q-input v-model="localOptions.purchaseProfit" />
          </div>
          <div class="col-md-4 offset-1 text-right">
            <q-checkbox v-model="localOptions.hasPurchaseProfit"
                        left-label
                        label="سود شما از خرید" />
          </div>
          <div class="col-md-7">
            <q-input v-model="localOptions.discountPercent" />
          </div>
          <div class="col-md-4 offset-1 text-right">
            <q-checkbox v-model="localOptions.hasDiscountPercent"
                        left-label
                        label="کد تخفیف" />
          </div>
          <div class="col-md-7">
            <q-input v-model="localOptions.giftcard" />
          </div>
          <div class="col-md-4 offset-1 text-right">
            <q-checkbox v-model="localOptions.hasGiftcard"
                        left-label
                        label="کارت هدیه" />
          </div>
          <div class="col-md-7">
            <q-input v-model="localOptions.finalPrice" />
          </div>
          <div class="col-md-4 offset-1 text-right">
            <q-checkbox v-model="localOptions.hasFinalPrice"
                        left-label
                        label="مبلغ نهایی" />
          </div>
          <div class="col-md-7">
            <q-input v-model="localOptions.paymentMethod" />
          </div>
          <div class="col-md-4 offset-1 text-right">
            <q-checkbox v-model="localOptions.hasPaymentMethod"
                        left-label
                        label="درگاه پرداخت" />
          </div>
          <div class="col-md-7">
            <q-input v-model="localOptions.commentLabel" />
          </div>
          <div class="col-md-4 offset-1 text-right">
            <q-checkbox v-model="localOptions.hasComment"
                        left-label
                        label="توضیحات" />
          </div>
          <div class="col-md-7">
            <q-input v-model="localOptions.paymentBtn" />
          </div>
          <div class="col-md-4 offset-1 text-right">
            <q-checkbox v-model="localOptions.hasPaymentBtn"
                        left-label
                        label="توضیحات" />
          </div>
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>

<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs },
  mixins: [mixinOptionPanel],
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      defaultOptions: {
        className: '',
        height: 'auto',
        boxed: false,
        boxedWidth: 1200,
        style: {}
      }
    }
  },
  watch: {
    localOptions: {
      handler(newVal) {
        this.$emit('update:options', newVal)
      },
      deep: true
    }
  }
})
</script>

<style scoped>

</style>

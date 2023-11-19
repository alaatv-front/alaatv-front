<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <q-list>
          <q-expansion-item expand-separator
                            icon="shopping_bag"
                            label="صورتحساب"
                            caption="Invoice">
            <cart-invoice-option-panel />
          </q-expansion-item>
          <q-expansion-item expand-separator
                            icon="sell"
                            label="ارقام سبد خرید"
                            caption="View">
            <cart-view-option-panel />
          </q-expansion-item>
          <q-expansion-item expand-separator
                            icon="empty"
                            label="سبد خرید خالی"
                            caption="Empty">
            <cart-empty-option-panel />
          </q-expansion-item>
        </q-list>
      </div>
    </template>
  </option-panel-tabs>
</template>

<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
import CartInvoiceOptionPanel from 'components/Widgets/Cart/CartInvoice/OptionPanel.vue'
import CartViewOptionPanel from 'components/Widgets/Cart/CartView/OptionPanel.vue'
import CartEmptyOptionPanel from 'components/Widgets/Cart/CartEmpty/OptionPanel.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: {
    OptionPanelTabs,
    CartInvoiceOptionPanel,
    CartViewOptionPanel,
    CartEmptyOptionPanel
  },
  mixins: [mixinOptionPanel],
  data () {
    return {
      defaultOptions: {
        cartEmptyOption: {
          text: 'سبد خرید شما خالی است',
          link: {
            text: 'بازگشت به فروشگاه',
            url: '/shop'
          },
          photo: 'https://nodes.alaatv.com/upload/empty-cart.png'
        },
        cartInvoiceOption: {
          totalPrice: 'جمع سبد خرید',
          hasTotalPrice: true,
          useWallet: 'استفاده از کیف پول',
          hasUseWallet: true,
          purchaseProfit: 'سود شما از خرید',
          hasPurchaseProfit: true,
          discountPercent: 'کد تخفیف',
          hasDiscountPercent: true,
          giftcard: 'کارت هدیه',
          hasGiftcard: true,
          finalPrice: 'مبلغ نهایی',
          hasFinalPrice: true,
          paymentMethod: 'درگاه پرداخت',
          hasPaymentMethod: true,
          commentLabel: 'اگر توضیحی درباره ی محصول دارید اینجا بنویسید',
          hasComment: true,
          paymentBtn: 'پرداخت و ثبت نهایی',
          hasPaymentBtn: true,
          dense: true
        },
        cartViewOption: {
          className: '',
          height: 'auto',
          boxed: false,
          boxedWidth: 1200,
          style: {},
          title: 'سبد خرید شما',
          floating: true
        }
      }
    }
  }
})
</script>

<template>
  <q-page-builder :sections="currenSections"
                  :options="options"
                  :editable="pageBuilderEditable" />
</template>

<script>
import { mixinSEO, mixinPageOptions } from 'src/mixin/Mixins.js'
export default {
  name: 'Cart',
  mixins: [mixinPageOptions, mixinSEO],
  data() {
    return {
      sections: [
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'CartEmpty',
                        options: {
                          text: 'سبد خرید شما خالی است',
                          link: {
                            text: 'بازگشت به فروشگاه',
                            url: '/shop'
                          },
                          photo: 'https://nodes.alaatv.com/aaa/landing/Soalaa/States/empty_cart.png'
                        }
                      }
                    ],
                    options: {
                      className: 'col-12'
                    }
                  }
                ],
                options: {
                  boxed: true,
                  boxedWidth: 1362,
                  style: {}
                }
              },
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'CartView',
                        options: {
                          title: 'سبد خرید شما'
                        }
                      }
                    ],
                    options: {
                      className: 'col-md-8 col-xs-12'
                    }
                  },
                  {
                    widgets: [
                      {
                        name: 'CartInvoice',
                        options: {
                          className: 'q-mt-md',
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
                          commentLabel: 'اگر توضیحی درباره ی محصول دارید اسنجا بنویسید',
                          hasComment: true,
                          paymentBtn: 'پرداخت و ثبت نهایی',
                          hasPaymentBtn: true
                        }
                      }
                    ],
                    options: {
                      className: 'col-md-4 col-xs-12'
                    }
                  }
                ],
                options: {
                  boxed: true,
                  boxedWidth: 1362,
                  style: {}
                }
              }
            ]
          },
          options: {}
        }
      ],
      options: []
    }
  },
  created () {
    this.currenSections = this.sections
  }
}
</script>

<template>
  <div ref="CartInvoice"
       class="cart-invoice main-content"
       :class="options.className"
       :style="options.style">
    <div ref="CartInvoiceContainer"
         :key="CartInvoiceContainerKey"
         class="cart-invoice-container sidebar">
      <div class="invoice-container q-mb-sm sidebar__inner">
        <template v-if="cartLoading">
          <div class="q-px-lg">
            <div class="q-mb-md">
              <q-skeleton height="100px"
                          square />
            </div>
            <div class="q-mb-md">
              <q-skeleton height="300px"
                          square />
            </div>
          </div>
        </template>
        <template v-else-if="cart.count > 0">
          <div v-if="isUserLogin">
            <div v-if="!localOptions.dense"
                 class="q-mb-md">
              <donate :cart="cart"
                      @cart-review="cartReview" />
            </div>
            <q-card class="invoice-cart">
              <q-card-section class="invoice-total-price-section invoice-cart-section">
                <div v-if="localOptions.hasTotalPrice"
                     class="total-shopping-cart price-section">
                  <div class="title">{{ localOptions.totalPrice }}{{ `(${cart.count})` }}</div>
                  <div class="price">
                    {{ totalBasePrice }}
                    <span class="iran-money-unit">تومان</span>
                  </div>
                </div>

                <div v-if="localOptions.hasUseWallet"
                     class="wallet-credit price-section">
                  <div class="title">{{ localOptions.useWallet }}</div>
                  <div class="price">
                    {{ amountUsingWallet.toLocaleString('fa') }}
                    <span class="iran-money-unit">تومان</span>
                  </div>
                </div>

                <div v-if="discountInPercent && localOptions.hasPurchaseProfit"
                     class="purchase-profit price-section">
                  <div class="title">{{ localOptions.purchaseProfit }}</div>
                  <div class="price">
                    {{ `(${discountInPercent}٪) ` + totalDiscount }}
                    <span class="iran-money-unit">تومان</span>
                  </div>
                </div>

                <q-separator class="invoice-separator" />
              </q-card-section>

              <q-card-section v-if="!isEwanoUser"
                              class="invoice-coupon-section invoice-cart-section">
                <div v-if="localOptions.hasDiscountPercent && !localOptions.dense"
                     class="enter-coupon-code">
                  <q-input v-model="couponValue"
                           type="text"
                           :label="localOptions.discountPercent"
                           placeholder="کد تخفیف خود را وارد کنید"
                           class="coupon-input"
                           :loading="couponLoading">
                    <template v-slot:append>
                      <q-btn v-if="!isCouponSet"
                             label="ثبت"
                             flat
                             square
                             :loading="couponLoading"
                             @click="setCoupon" />
                      <q-btn v-else
                             label="حذف"
                             flat
                             square
                             @click="cancelCoupon" />
                    </template>
                  </q-input>
                </div>
                <div v-if="localOptions.hasGiftcard && !localOptions.dense"
                     class="enter-coupon-code q-mt-md q-mb-lg">
                  <q-input v-model="giftCardValue"
                           dir="ltr"
                           :label="localOptions.giftcard"
                           placeholder="کد کارت هدیه خود را وارد کنید"
                           class="coupon-input"
                           mask="##-######"
                           :loading="referralCodeLoading"
                           hint="مثال: AT84-27871">
                    <template v-slot:append>
                      {{ giftCardPrefix }}

                      <q-btn v-if="!isReferralSet"
                             label="ثبت"
                             flat
                             square
                             :loading="referralCodeLoading"
                             @click="submitReferralCode" />
                      <q-btn v-else
                             label="حذف"
                             flat
                             square
                             @click="cancelReferral" />
                    </template>
                  </q-input>
                </div>

                <q-separator v-if="!localOptions.dense"
                             class="invoice-separator" />
              </q-card-section>

              <q-card-section class="payment-section invoice-cart-section">
                <div v-if="localOptions.hasFinalPrice"
                     class="final-price price-section">
                  <div class="title">{{ localOptions.finalPrice }}</div>
                  <div class="price">
                    {{ totalFinalPrice }}
                    <span class="iran-money-unit">تومان</span>
                  </div>
                </div>

                <div class="payment-gateway row">
                  <template v-if="localOptions.hasPaymentMethod && !localOptions.dense">
                    <div class="payment-title col-12">{{ localOptions.paymentMethod }}</div>
                    <div class="banks-gateway-list col-12">
                      <div class="row q-col-gutter-sm">
                        <template v-if="gateways.loading">
                          کمی صبر کنید...
                        </template>
                        <template v-else>
                          <div v-for="gateway in gateways.list"
                               :key="gateway.id"
                               class="bank-gateway-container col-lg-6 col-md-12 col-sm-4 col-xs-12">
                            <div class="bank-gateway">
                              <div class="bank-icon-container">
                                <lazy-img :src="gateway.photo"
                                          :alt="gateway.photo"
                                          class="bank-icon-photo"
                                          width="1"
                                          height="1" />
                              </div>
                              <q-radio v-model="selectedBank"
                                       dir="ltr"
                                       color="primary"
                                       size="30px"
                                       :label="gateway.displayName"
                                       :val="gateway.name"
                                       checked-icon="radio_button_checked"
                                       unchecked-icon="radio_button_unchecked" />
                            </div>
                          </div>
                        </template>
                      </div>
                    </div>
                  </template>

                  <div v-if="!localOptions.dense"
                       class="payment-description col-md-12 col-sm-6 col-xs-12">

                    <q-input v-if="localOptions.hasComment"
                             v-model="shoppingDescription"
                             type="text"
                             :label="localOptions.commentLabel"
                             class="payment-description-input" />
                  </div>

                  <div v-if="localOptions.hasPaymentBtn"
                       class="payment-button-container payment-button-container-desktop col-12">
                    <div class="payment-button payment-button-desktop-view"
                         :class="{ 'payment-button-disable': !selectedBank}"
                         @click="payment">
                      {{ localOptions.paymentBtn }}
                    </div>
                  </div>
                </div>

                <q-separator class="invoice-separator" />
              </q-card-section>

            </q-card>
            <div class="payment-button-container">
              <div class="final-price price-section">
                <div class="title">مبلغ نهایی:</div>
                <div class="price">
                  {{ totalFinalPrice }}
                  <span class="iran-money-unit">تومان</span>
                </div>
              </div>
              <div class="payment-button payment-button-mobile-view"
                   :class="{ 'payment-button-disable': !selectedBank}"
                   @click="payment">
                پرداخت
              </div>
            </div>
          </div>
          <div v-else>
            <q-card class="login custom-card bg-white q-mx-md q-mb-md">
              <div class="login-text bg-green-3 q-px-md q-mt-lg q-mx-md">
                <div class="bg-grey-3 q-pa-md text-center text-grey-9">
                  <p>پیش از ثبت سفارش وارد حساب کاربری خود شوید</p>
                  <p>
                    اگر حساب کاربری در آلاء ندارید با وارد کردن شماره همراه و کد ملی خود میتوانید به سادگی حساب خود را
                    ایجاد
                    کنید
                  </p>
                </div>
              </div>
              <auth-login :default-layout="false"
                          :redirect="false"
                          @on-logged-in="loadAuthData" />
            </q-card>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { Notify } from 'quasar'
import { Cart } from 'src/models/Cart.js'
import Ewano from 'src/assets/js/Ewano.js'
import AuthLogin from 'src/components/Auth.vue'
import LazyImg from 'src/components/lazyImg.vue'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { GatewayList } from 'src/models/Gateway.js'
import Donate from 'src/components/Widgets/Cart/Donate/Donate.vue'
import mixinEwano from 'src/components/Widgets/Ewano/mixinEwano.js'
import { AEE } from 'src/assets/js/AEE/AnalyticsEnhancedEcommerce.js'

let StickySidebar
if (typeof window !== 'undefined') {
  import('sticky-sidebar-v2')
    .then((stickySidebar) => {
      StickySidebar = stickySidebar.default
    })
}

export default {
  name: 'CartInvoice',
  components: { LazyImg, AuthLogin, Donate },
  mixins: [mixinWidget, mixinEwano],
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: ['update:options'],
  data () {
    return {
      gateways: new GatewayList(),
      couponLoading: false,
      referralCodeLoading: false,
      CartInvoiceContainerKey: Date.now(), // for dispose sticky
      isUserLogin: false,
      stickySidebar: null,
      scrollInfo: null,
      isCouponSet: false,
      isReferralSet: false,
      cart: new Cart(),
      couponValue: null,
      giftCardValue: null,
      giftCardPrefix: 'AT',
      userEnteredLoginInfo: {
        password: '',
        mobile: ''
      },
      selectedBank: true,
      shoppingDescription: '',
      defaultOptions: {
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
        dense: false
      },
      ewanoCallbackUrlRouteObject: null
    }
  },
  computed: {
    cartLoading () {
      return this.cart.loading
    },
    totalFinalPrice () {
      return this.getPriceFormat('final') ? this.getPriceFormat('final') : 0
    },

    totalBasePrice () {
      return this.getPriceFormat('base')
    },

    totalDiscount () {
      return this.getPriceFormat('discount')
    },

    discountInPercent () {
      return this.cart.price?.discountInPercent()
    },

    amountUsingWallet () {
      return this.cart.pay_by_wallet
      // return this.cart.pay_by_wallet.toLocaleString()
    }
  },
  watch: {
    cartLoading (newValue) {
      if (newValue) {
        return
      }

      if (this.cart.count > 3 && typeof window !== 'undefined' && window.screen.width > 600) {
        this.$nextTick(() => {
          this.loadSticky()
        })
      } else {
        this.CartInvoiceContainerKey = Date.now()
      }
    },
    selectedBank (newValue) {
      if (typeof newValue === 'string') {
        this.updateEECEvent(newValue)
      }
    },
    localOptions: {
      handler (newVal) {
        this.$emit('update:options', newVal)
      },
      deep: true
    }
  },
  // provide() {
  //   return {
  //     scrollInfo: computed(() => this.scrollInfo)
  //   }
  // },
  mounted () {
    this.loadAuthData()
    this.cartReview()
    this.getGateways()
    this.$bus.on('busEvent-refreshCart', this.cartReview)
    window.document.addEventListener('ewano-payment-result', (event) => {
      const status = event.detail.status
      // console.warn('CartInvoice->$bus.on->status: ', status)
      if (!this.ewanoCallbackUrlRouteObject?.query) {
        return
      }
      this.ewanoCallbackUrlRouteObject.query.ewano_payment_result_status = status ? 1 : 0

      this.$router.push(this.ewanoCallbackUrlRouteObject)
    })
  },
  methods: {
    updateEECEvent (value) {
      AEE.checkout(2, value)
    },
    getGateways () {
      if (this.isEwanoUser) {
        this.gateways = new GatewayList([{
          id: 'ewano',
          name: 'ewano',
          displayName: 'اوانو',
          description: 'اوانو',
          order: 1,
          // photo: 'https://nodes.alaatv.com/upload/alaaPages/2023-11/ewano_logo.png'
          photo: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/Icons_Logo_Export-04.svg'
        }])
        this.selectedBank = this.gateways.list[0].name
        return
      }

      this.gateways.loading = true
      APIGateway.cart.getGateways()
        .then(gateways => {
          this.gateways = new GatewayList(gateways)
          this.gateways.loading = false
          this.selectedBank = this.gateways.list[0].name
        })
        .catch(() => {
          this.gateways.loading = false
        })
    },
    loadAuthData () { // prevent Hydration node mismatch
      // this.localUser = this.$store.getters['Auth/user']
      this.isUserLogin = this.$store.getters['Auth/isUserLogin']
    },
    loadSticky () {
      // console.log('this.$refs.CartInvoice.parentElement', this.$refs.CartInvoice.parentElement.clientHeight)
      const widgetParent = this.$refs.CartInvoice.parentElement
      widgetParent.style.height = '100%'
      // const parent = this.$refs.CartInvoice.parentElement.parentElement
      // const parentClientHeight = parent.clientHeight
      // this.$refs.CartInvoice.style.height = parentClientHeight + 'px'

      this.stickySidebarInstance = new StickySidebar(this.$refs.CartInvoiceContainer, {
        topSpacing: 142,
        // bottomSpacing: 20,
        containerSelector: false,
        // containerSelector: '.cart-invoice.main-content',
        innerWrapperSelector: '.invoice-container.sidebar__inner'
        // scrollContainer: '#main-viewport'
      })

      // this.stickySidebar = new StickySidebar(this.$refs.CartInvoiceContainer, {
      //   topSpacing: 20,
      //   bottomSpacing: 20,
      //   containerSelector: '.cart-invoice',
      //   innerWrapperSelector: '.invoice-container',
      //   scrollContainer: '.page-builder'
      // })
    },
    // onPaste() {
    //   const str = this.giftCardValue.toString()
    //   str.replace('AT', '')
    // },
    submitReferralCode () {
      this.referralCodeLoading = true
      APIGateway.referralCode.submitReferralCodeOnOrder({ data: { referral_code: this.giftCardValue } })
        .then(() => {
          this.isReferralSet = true
          this.referralCodeLoading = false
          this.cartReview()
        })
        .catch(() => {
          this.referralCodeLoading = false
        })
    },
    setCoupon () {
      this.couponLoading = true
      APIGateway.coupon.base({ code: this.couponValue })
        .then(() => {
          this.isCouponSet = true
          this.couponLoading = false
          this.cartReview()
          Notify.create({
            message: 'کد تخفیف با موفقیت اعمال شد',
            type: 'positive',
            color: 'positive'
          })
        })
        .catch(() => {
          this.couponLoading = false
        })
    },
    cancelCoupon () {
      APIGateway.coupon.deleteCoupon()
        .then(response => {
          this.isCouponSet = false
          this.couponValue = ''
          this.cartReview()
          Notify.create({
            message: 'کد تخفیف با موفقیت حذف شد',
            type: 'positive',
            color: 'positive'
          })
        })
        .catch()
    },
    cancelReferral () {
      APIGateway.referralCode.DeleteReferralCodeFromOrder({
        order_id: this.cart.getOrderId()
      })
        .then(response => {
          this.isReferralSet = false
          this.giftCardValue = ''
          this.cartReview()
          Notify.create({
            message: 'کارت هدیه با موفقیت حذف شد',
            type: 'positive',
            color: 'positive'
          })
        })
        .catch()
    },
    onScroll (info) {
      this.scrollInfo = info
    },
    cartReview () {
      this.cart.loading = true
      this.$store.dispatch('Cart/reviewCart')
        .then((response) => {
          const invoice = response

          const cart = new Cart(invoice)

          if (cart.coupon) {
            this.couponValue = cart.coupon.code
            this.isCouponSet = true
          }

          if (cart.referralCode) {
            this.giftCardValue = cart.referralCode.code
            this.isReferralSet = true
          }

          if (invoice.count > 0) {
            invoice.items.list[0].order_product.list.forEach((order) => {
              cart.items.list.push(order)
            })
          }
          this.cart = cart
          this.cart.loading = false
        }).catch(() => {
          this.cart.loading = false
        })
    },

    ewanoPayment () {
      this.$store.commit('loading/loading', true)
      APIGateway.ewano.makeOrder()
        .then(({ ewanoOrderId, alaaOrderId, amount }) => {
          this.ewanoCallbackUrlRouteObject = {
            name: 'UserPanel.ThankYouPage',
            params: { orderId: alaaOrderId },
            query: { ewano_order_id: ewanoOrderId, ewano: 1 }
          }
          const callbackUrl = this.$router.resolve(this.ewanoCallbackUrlRouteObject).fullPath
          this.$store.commit('loading/loading', false)
          Ewano.pay(amount, ewanoOrderId, callbackUrl)
        })
        .catch((e) => {
          console.error('ewano error', e)
          this.$q.notify({
            type: 'negative',
            message: 'لطفا مجدد تلاش کنید.'
          })
          this.$store.commit('loading/loading', false)
        })
    },
    payment () {
      if (this.isEwanoUser) {
        this.ewanoPayment()
        return
      }

      if (!this.selectedBank) {
        this.$q.notify({
          type: 'negative',
          message: 'درگاه بانکی انتخاب نشده است.'
        })
        return
      }

      this.$store.commit('loading/loading', true)
      this.$store.dispatch('Cart/paymentCheckout', this.selectedBank)
        .then((encryptedPaymentRedirectLink) => {
          window.open(encryptedPaymentRedirectLink, '_self')
          this.$store.commit('loading/loading', false)
        })
        .catch(() => {
          this.$store.commit('loading/loading', false)
        })
    },

    login () {
      this.$store.dispatch('Auth/login', this.userEnteredLoginInfo)
        .then(() => {
          if (this.isUserLogin) {
            this.cartReview()
          }
        })
    },

    getPriceFormat (priceKey) {
      return this.cart.price.toman(priceKey, null)
    },

    clickOnGateway () {
      // this.selectedBank = !this.selectedBank
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-invoice {
  height: 100%;

  .cart-invoice-container {
    &.is-affixed {
      .invoice-container {
        margin-top: 0;
      }
    }

    .invoice-container {
      margin-top: 70px;
      margin-left: 30px;

      @media screen and (width <= 1023px) {
        margin-left: 0;
      }

      @media screen and (width <= 599px) {
        margin-bottom: 80px;
      }

      .invoice-cart {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px;
        background: #FFF;
        box-shadow: -2px -4px 10px rgb(255 255 255 / 60%), 2px 4px 10px rgb(112 108 162 / 5%);
        border-radius: 16px;
        width: 100%;

        @media screen and (width <= 1439px) {
          padding: 24px;
        }

        @media screen and (width <= 1023px) {
          padding: 20px;
        }

        &:deep(.q-separator--horizontal) {
          height: 1.3px;
          border: none;
          background: #EFF4FC;
          margin-bottom: 20px;

          @media screen and (width <= 1439px) {
            margin-bottom: 14px;
          }

          @media screen and (width <= 1023px) {
            margin-bottom: 16px;
          }

          @media screen and (width <= 599px) {
            margin-bottom: 12px;
          }
        }

        .invoice-cart-section {
          padding: 0;
          width: 100%;

          .iran-money-unit {
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
            margin-left: 6px;
          }

          &.invoice-total-price-section {
            .price-section {
              display: flex;
              justify-content: space-between;
              font-style: normal;
              font-weight: 400;
              font-size: 16px;
              line-height: 25px;
              color: #23263B;
              margin-bottom: 20px;

              @media screen and (width <= 1439px) {
                margin-bottom: 14px;
              }

              @media screen and (width <= 1023px) {
                margin-bottom: 16px;
              }

              &.purchase-profit {
                color: #E86562;
              }

              .title {
                letter-spacing: -0.03em;

                @media screen and (width <= 599px) {
                  font-size: 14px;
                }
              }

              .price {
                letter-spacing: -0.05em;
              }
            }
          }

          &.payment-section {
            .final-price {
              color: #4CAF50;
              display: flex;
              justify-content: space-between;
              margin-bottom: 24px;
              align-items: center;

              @media screen and (width <= 1439px) {
                margin-bottom: 18px;
              }

              @media screen and (width <= 1023px) {
                margin-bottom: 20px;
              }

              @media screen and (width <= 599px) {
                margin-bottom: 16px;
              }

              .title {
                font-weight: 600;
                font-size: 18px;
                line-height: 28px;
                letter-spacing: -0.03em;

                @media screen and (width <= 599px) {
                  font-size: 16px;
                }
              }

              .price {
                font-weight: 600;
                font-size: 24px;
                line-height: 37px;
                letter-spacing: -0.05em;

                @media screen and (width <= 599px) {
                  font-size: 20px;
                }
              }
            }

            .payment-gateway {
              .payment-title {
                font-weight: 400;
                font-size: 16px;
                line-height: 25px;
                letter-spacing: -0.03em;
                color: #23263B;
                margin-bottom: 8px;

                @media screen and (width <= 1439px) {
                  margin-bottom: 6px;
                }

                @media screen and (width <= 1023px) {
                  margin-bottom: 8px;
                }

                @media screen and (width <= 599px) {
                  margin-bottom: 6px;
                }
              }

              .loading-spinner {
                display: flex;
                justify-content: center
              }

              .banks-gateway-list {
                margin-bottom: 20px;

                @media screen and (width <= 1439px) {
                  margin-bottom: 8px;
                }

                @media screen and (width <= 1023px) {
                  margin-bottom: 16px;
                }

                @media screen and (width <= 599px) {
                  margin-bottom: 2px;
                }

                .bank-gateway-container {
                  .bank-gateway {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-sizing: border-box;
                    height: 74px;

                    //width: 177px;
                    width: 100%;
                    border: 1.3px solid #E7ECF4;
                    border-radius: 8px;
                    padding: 8px;
                    cursor: pointer;

                    .checked-check-box {
                      &:deep(.q-icon) {
                        color: $primary;
                      }
                    }

                    .q-radio {
                      width: calc(100% - 64px);
                      justify-content: space-between;
                    }

                    //
                    //&:deep(.q-radio__inner  ) {
                    //  width: 20px;
                    //}
                    //
                    //&:deep(.q-radio__icon-container ) {
                    //  width: 20px;
                    //}

                    &:deep(.q-radio__label) {
                      font-style: normal;
                      font-weight: 400;
                      font-size: 11px;
                      line-height: 19px;
                      letter-spacing: -0.05em;
                      color: #23263B;
                      text-align: left;
                      padding-right: 10px;
                    }

                    @media screen and (width <= 1439px) {
                      width: 100%;
                      margin-bottom: 8px;
                    }

                    @media screen and (width <= 1023px) {
                      margin-bottom: 0;
                    }

                    @media screen and (width <= 599px) {
                      margin-bottom: 10px;
                    }

                    .bank-icon-container {
                      $iconSize: 58px;

                      min-width: $iconSize;
                      height: $iconSize;
                      background: #F4F3FF;
                      border-radius: 5px;
                      margin-right: 8px;

                      :deep(.bank-icon-photo) {
                        width: $iconSize;
                        height: $iconSize;
                      }
                    }

                    .select-bank-radio-button {
                      width: 100%;
                      justify-content: space-between;

                      &:deep(.q-radio__bg) {
                        color: #E7ECF4;
                      }

                      &:deep(.q-radio__inner--truthy .q-radio__check) {
                        color: #FFB74D;
                      }

                    }
                  }
                }
              }

              .payment-description {
                .title {
                  font-style: normal;
                  font-weight: 400;
                  font-size: 16px;
                  line-height: 25px;
                  letter-spacing: -0.03em;
                  color: #23263B;
                  margin-bottom: 8px;

                  @media screen and (width <= 1439px) {
                    margin-bottom: 6px;
                  }

                  @media screen and (width <= 599px) {
                    font-size: 14px;
                  }
                }

                .payment-description-input {
                  margin-bottom: 24px;
                }
              }
            }
          }

          &.login-section {
            .title {
              font-weight: 400;
              font-size: 16px;
              line-height: 25px;
              letter-spacing: -0.003em;
              color: #23263B;
              margin-bottom: 14px;
            }

            .login-input {
              margin-bottom: 14px;
            }

            .no-account {
              text-align: right;
              font-style: normal;
              font-weight: 600;
              font-size: 12px;
              line-height: 19px;
              letter-spacing: -0.003em;
              color: #23263B;

              .sign-in {
                color: #8075DC;
                margin-bottom: 20px;
                text-decoration: none;
                cursor: pointer;
              }
            }

            .sign-in-button {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 56px;
              background: #9690E4;
              border-radius: 8px;
              font-style: normal;
              font-weight: 600;
              font-size: 16px;
              line-height: 25px;
              letter-spacing: -0.03em;
              color: #FFF;
              cursor: pointer;
            }
          }
        }

      }

      .payment-button-container {
        &.payment-button-container-desktop {
          display: flex;

          @media screen and (width <= 599px) {
            //display: none;
          }
        }

        @media screen and (width <= 599px) {
          position: fixed;
          bottom: 80px;
          left: 0;
          right: 0;
          display: flex;
          z-index: 10;
          justify-content: space-between;
          padding: 13px 19px;
          background: #FFF;
          box-shadow: 0 -6px 10px rgb(112 108 161 / 7%);
          border-radius: 16px 16px 0 0;
        }

        .final-price {
          display: none;
          color: #434765;

          @media screen and (width <= 599px) {
            display: flex;
          }

          .title {
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
            margin-right: 4px;
          }

          .price {
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 25px;
            letter-spacing: -0.05em;
          }

          .iran-money-unit {
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 19px;
          }
        }

        .payment-button {
          justify-content: center;
          align-items: center;
          height: 56px;
          background: #4CAF50;
          border-radius: 8px;
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 25px;
          letter-spacing: -0.03em;
          color: #FFF;
          cursor: pointer;
          width: 100%;

          &.payment-button-disable {
            opacity: 0.5;
            cursor: default;
          }

          @media screen and (width <= 599px) {
            width: 104px;
            height: 36px;
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            line-height: 22px;
          }

          &.payment-button-mobile-view {
            display: none;

            @media screen and (width <= 599px) {
              display: flex;
            }
          }

          &.payment-button-desktop-view {
            display: flex;

            @media screen and (width <= 599px) {
              display: none;
            }
          }
        }
      }

    }
  }

  .login {
    box-shadow: 0 6px 5px rgb(0 0 0 / 3%);
    border-radius: 10px;
    padding: 30px 0;
    margin-top: 65px;

    .login-text {
      border-radius: 8px;
    }
  }
}
</style>

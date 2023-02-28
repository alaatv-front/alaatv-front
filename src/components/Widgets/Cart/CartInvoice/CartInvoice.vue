<template>
  <q-scroll-observer @scroll="onScroll" />
  <sticky-both-sides v-if="cart.count > 0"
                     :top-gap="72"
                     :bottom-gap="10"
                     :max-width="1024">
    <div v-if="isUserLogin"
         :class="options.className"
         :style="options.style"
         class="invoice-container q-mb-sm">
      <div class="q-mb-md">
        <donate />
      </div>
      <q-card class="invoice-cart">
        <q-card-section class="invoice-total-price-section invoice-cart-section">
          <div class="total-shopping-cart price-section">
            <div class="title">جمع سبد خرید{{ `(${cart.count})` }}</div>
            <div v-if="loading"
                 class="loading-spinner">
              <q-spinner-tail color="orange"
                              size="2em" />
            </div>
            <div v-else
                 class="price">
              {{ totalBasePrice }}
              <span class="iran-money-unit">تومان</span>
            </div>
          </div>

          <div class="wallet-credit price-section">
            <div class="title">استفاده از کیف پول</div>
            <div v-if="loading"
                 class="loading-spinner">
              <q-spinner-tail color="orange"
                              size="2em" />
            </div>
            <div v-else
                 class="price">
              {{ amountUsingWallet }}
              <span class="iran-money-unit">تومان</span>
            </div>
          </div>

          <div v-if="discountInPercent"
               class="purchase-profit price-section">
            <div class="title">سود شما از خرید</div>
            <div v-if="loading"
                 class="loading-spinner">
              <q-spinner-tail color="orange"
                              size="2em" />
            </div>
            <div v-else
                 class="price">
              {{ `(${discountInPercent}٪) ` + totalDiscount }}
              <span class="iran-money-unit">تومان</span>
            </div>
          </div>

          <q-separator class="invoice-separator" />
        </q-card-section>

        <q-card-section v-if="isUserLogin"
                        class="invoice-coupon-section invoice-cart-section">
          <div class="enter-coupon-code">
            <div class="title">کد تخفیف:</div>

            <q-input v-model="couponValue"
                     type="text"
                     label="کد تخفیف خود را وارد کنید"
                     class="coupon-input"
                     outlined>
              <template v-slot:append>
                <q-btn v-if="!isCouponSet"
                       label="ثبت"
                       flat
                       @click="setCoupon" />
                <q-btn v-else
                       label="حذف"
                       flat
                       @click="cancelCoupon" />
              </template>
            </q-input>
          </div>
          <div class="enter-coupon-code">
            <div class="title">کارت هدیه:</div>

            <q-input v-model="giftCardValue"
                     dir="ltr"
                     label="کد کارت هدیه خود را وارد کنید"
                     class="coupon-input"
                     outlined
                     mask="##-#####"
                     :suffix=giftCardPrefix
                     hint="مثال: AT84-27871">
              <template v-slot:append>
                <q-btn label="ثبت"
                       flat
                       @click="submitReferralCode" />
              </template>
            </q-input>
          </div>

          <q-separator class="invoice-separator" />
        </q-card-section>

        <q-card-section class="payment-section invoice-cart-section">
          <div class="final-price price-section">
            <div class="title">مبلغ نهایی</div>
            <div v-if="loading"
                 class="loading-spinner">
              <q-spinner-tail color="orange"
                              size="2em" />
            </div>
            <div v-else
                 class="price">
              {{ totalFinalPrice }}
              <span class="iran-money-unit">تومان</span>
            </div>
          </div>

          <div v-if="isUserLogin"
               class="payment-gateway row">
            <p class="payment-title col-md-12 col-sm-2 col-xs-12">درگاه پرداخت</p>

            <div v-if="loading"
                 class="loading-spinner">
              <q-spinner-tail color="orange"
                              size="3em" />
            </div>

            <div v-else
                 class="banks-gateway-list col-md-12 col-sm-4 col-xs-12">
              <div class="bank-gateway-container col-lg-6 col-md-12 col-sm-4 col-xs-12">
                <div class="bank-gateway"
                     @click="clickOnGateway">
                  <div class="bank-icon-container">
                    <q-img src="https://nodes.alaatv.com/aaa/landing/Banklogos/saman.png"
                           class="bank-icon" />
                  </div>
                  <q-checkbox v-model="selectedBank"
                              dir="ltr"
                              label="بانک سامان"
                              checked-icon="radio_button_checked"
                              unchecked-icon="radio_button_unchecked"
                              :class="{'checked-check-box': selectedBank}" />
                </div>
              </div>
            </div>

            <div class="payment-description col-md-12 col-sm-6 col-xs-12">

              <q-input v-model="shoppingDescription"
                       type="text"
                       label="اگر توضیحی درباره ی محصول دارید اینجا بنویسید"
                       class="payment-description-input"
                       outlined />
            </div>

            <div class="payment-button-container payment-button-container-desktop col-12">
              <div class="payment-button payment-button-desktop-view"
                   :class="{ 'payment-button-disable': !selectedBank}"
                   @click="payment">
                پرداخت و ثبت نهایی
              </div>
            </div>
          </div>

          <q-separator v-if="!isUserLogin"
                       class="invoice-separator" />
        </q-card-section>

        <q-card-section v-if="!isUserLogin"
                        class="login-section invoice-cart-section">
          <p class="title">برای ادامه ثبت سفارش، به حساب کاربری خود وارد شوید </p>

          <q-input v-model="userEnteredLoginInfo.mobile"
                   type="text"
                   label="شماره موبایل خود را وارد کنید"
                   class="login-input"
                   outlined />

          <q-input v-model="userEnteredLoginInfo.password"
                   type="password"
                   label="رمز عبور خود را وارد کنید"
                   class="login-input"
                   outlined />

          <p class="no-account">
            حساب کاربری ندارید؟
            <router-link to="/"
                         class="sign-in">ثبت نام کنید
            </router-link>
          </p>

          <div class="sign-in-button"
               @click="login"> console.log(invoice)

            ورود به حساب کاربری
          </div>
        </q-card-section>
      </q-card>
      <div class="payment-button-container">
        <div class="final-price price-section">
          <div class="title">مبلغ نهایی:</div>
          <div v-if="loading"
               class="loading-spinner">
            <q-spinner-tail color="orange"
                            size="2em" />
          </div>
          <div v-else
               class="price">
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
  </sticky-both-sides>
</template>

<script>
import { Cart } from 'src/models/Cart.js'
import Widgets from 'src/components/PageBuilder/Widgets.js'
import Donate from 'components/Widgets/Cart/Donate/Donate.vue'
import StickyBothSides from 'components/Utils/StickyBothSides.vue'
import { computed } from 'vue'
import { Notify } from 'quasar'

export default {
  name: 'CartInvoice',
  components: { StickyBothSides, Donate },
  mixins: [Widgets],
  provide() {
    return {
      scrollInfo: computed(() => this.scrollInfo)
    }
  },
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  data() {
    return {
      scrollInfo: null,
      isCouponSet: false,
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
      loading: false
    }
  },

  computed: {
    totalFinalPrice() {
      return this.getPriceFormat('final') ? this.getPriceFormat('final') : 0
    },

    totalBasePrice() {
      return this.getPriceFormat('base')
    },

    totalDiscount() {
      return this.getPriceFormat('discount')
    },

    discountInPercent() {
      return this.cart.price?.discountInPercent()
    },

    isUserLogin() {
      return this.$store.getters['Auth/isUserLogin']
    },

    amountUsingWallet() {
      return this.cart.pay_by_wallet
      // return this.cart.pay_by_wallet.toLocaleString()
    }
  },
  mounted() {
    this.cartReview()
    this.$bus.on('removeProduct', this.cartReview)
  },
  methods: {
    // onPaste() {
    //   const str = this.giftCardValue.toString()
    //   str.replace('AT', '')
    // },
    submitReferralCode() {
      this.$apiGateway.referralCode.submitReferralCodeOnOrder({ data: { referral_code: this.giftCardValue } })
        .then(() => {
        })
        .catch()
    },
    setCoupon() {
      this.$apiGateway.coupon.base({ code: this.couponValue })
        .then(response => {
          this.isCouponSet = true
          Notify.create({
            message: 'کد تخفیف با موفقیت اعمال شد',
            type: 'negative',
            color: 'negative'
          })
        })
        .catch(err => {
          Notify.create({
            message: err.message,
            type: 'negative',
            color: 'negative'
          })
        })
    },
    cancelCoupon() {
      this.$apiGateway.coupon.deleteCoupon()
        .then(response => {
          this.isCouponSet = false
          Notify.create({
            message: 'کد تخفیف با موفقیت حذف شد',
            type: 'positive',
            color: 'positive'
          })
        })
        .catch()
    },
    onScroll(info) {
      this.scrollInfo = info
    },
    cartReview() {
      this.$store.dispatch('loading/overlayLoading', true)
      this.$store.dispatch('Cart/reviewCart')
        .then((response) => {
          const invoice = response

          const cart = new Cart(invoice)

          if (invoice.count > 0) {
            invoice.items.list[0].order_product.list.forEach((order) => {
              cart.items.list.push(order)
            })
          }
          this.cart = cart
          this.$store.dispatch('loading/overlayLoading', false)
        }).catch(() => {
          this.$store.dispatch('loading/overlayLoading', false)
        })
    },

    payment() {
      if (!this.selectedBank) {
        this.$q.notify({
          type: 'negative',
          message: 'درگاه بانکی انتخاب نشده است.'
        })
        return
      }
      this.$store.commit('loading/loading', true)

      this.$store.dispatch('Cart/paymentCheckout')
        .then((encryptedPaymentRedirectLink) => {
          window.open(encryptedPaymentRedirectLink, '_self')
          this.$store.commit('loading/loading', false)
        }).catch(() => {
          this.$store.commit('loading/loading', false)
        })
    },

    login() {
      this.$store.dispatch('Auth/login', this.userEnteredLoginInfo)
        .then(() => {
          if (this.isUserLogin) {
            this.cartReview()
          }
        })
    },

    getPriceFormat(priceKey) {
      return this.cart.price.toman(priceKey, null)
    },

    clickOnGateway() {
      this.selectedBank = !this.selectedBank
    }
  }
}
</script>

<style lang="scss" scoped>
.invoice-container {
  margin-top: 70px;
  margin-left: 30px;

  @media screen and (max-width: 1023px) {
    margin-left: 0;
  }
  @media screen and (max-width: 599px) {
    margin-bottom: 70px;
  }

  .invoice-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    background: #FFFFFF;
    box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
    border-radius: 16px;
    width: 100%;

    @media screen and (max-width: 1439px) {
      padding: 24px;
    }

    @media screen and (max-width: 1023px) {
      padding: 20px;
    }

    &:deep(.q-separator--horizontal) {
      height: 1.3px;
      border: none;
      background: #EFF4FC;
      margin-bottom: 20px;

      @media screen and (max-width: 1439px) {
        margin-bottom: 14px;
      }

      @media screen and (max-width: 1023px) {
        margin-bottom: 16px;
      }

      @media screen and (max-width: 599px) {
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

          @media screen and (max-width: 1439px) {
            margin-bottom: 14px;
          }

          @media screen and (max-width: 1023px) {
            margin-bottom: 16px;
          }

          &.purchase-profit {
            color: #E86562;
          }

          .title {
            letter-spacing: -0.03em;

            @media screen and (max-width: 599px) {
              font-size: 14px;
            }
          }

          .price {
            letter-spacing: -0.05em;
          }
        }
      }

      &.invoice-coupon-section {
        .enter-coupon-code {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          justify-content: space-between;

          @media screen and (max-width: 1439px) {
            margin-bottom: 14px;
          }

          @media screen and (max-width: 1023px) {
            margin-bottom: 16px;
          }

          @media screen and (max-width: 599px) {
            margin-bottom: 12px;
          }

          .title {
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 25px;
            letter-spacing: -0.03em;
            color: #23263B;
            margin-right: 16px;
            min-width: 72px;

            @media screen and (max-width: 1439px) {
              margin-right: 4px;
            }

            @media screen and (max-width: 1023px) {
              margin-right: 36px;
            }

            @media screen and (max-width: 599px) {
              font-size: 14px;
              margin-right: 14px;
            }
          }

          .coupon-input {
            @media screen and (max-width: 1023px) {
              width: 100%;
            }

            &:deep(.q-field__control) {
              height: 40px;
              border: 1.3px solid #E7ECF4;
              border-radius: 8px;
              padding: 0 16px;
              width: 286px;
              .q-field__suffix {
                padding-top: 6px;
                opacity: 1 !important;
              }

              @media screen and (max-width: 1439px) {
                padding: 0 12px;
                //min-width: 174px;
                width: 100%;
              }

              @media screen and (max-width: 1023px) {
                padding: 0 16px;
                //min-width: 392px;
              }

              @media screen and (max-width: 599px) {
                padding: 0 12px;
                //min-width: 196px;
              }
            }

            &:deep(.q-field__append) {
              height: 40px;
              width: 45px;
            }

            &:deep(.q-field__label) {
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 19px;
              letter-spacing: -0.05em;
              color: #9092A7;
              margin: -8px 0;
            }

            &:deep(.q-btn .q-btn__content) {
              font-style: normal;
              font-weight: 400;
              font-size: 16px;
              line-height: 22px;
              color: #23263B;

              @media screen and (max-width: 1439px) {
                font-size: 14px;
              }
            }

            &:deep(.q-field__inner .q-field__control:before) {
              border: none;
            }

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

          @media screen and (max-width: 1439px) {
            margin-bottom: 18px;
          }

          @media screen and (max-width: 1023px) {
            margin-bottom: 20px;
          }

          @media screen and (max-width: 599px) {
            margin-bottom: 16px;
          }

          .title {
            font-weight: 600;
            font-size: 18px;
            line-height: 28px;
            letter-spacing: -0.03em;

            @media screen and (max-width: 599px) {
              font-size: 16px;
            }
          }

          .price {
            font-weight: 600;
            font-size: 24px;
            line-height: 37px;
            letter-spacing: -0.05em;

            @media screen and (max-width: 599px) {
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

            @media screen and (max-width: 1439px) {
              margin-bottom: 6px;
            }

            @media screen and (max-width: 1023px) {
              margin-bottom: 8px;
            }

            @media screen and (max-width: 599px) {
              margin-bottom: 6px;
            }
          }

          .loading-spinner {
            display: flex;
            justify-content: center
          }

          .banks-gateway-list {
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;

            @media screen and (max-width: 1439px) {
              margin-bottom: 8px;
            }

            @media screen and (max-width: 1023px) {
              margin-bottom: 16px;
            }

            @media screen and (max-width: 599px) {
              margin-bottom: 2px;
            }

            .bank-gateway-container {
              @media screen and (max-width: 1023px) {
                padding: 0 6px;
              }

              @media screen and (max-width: 599px) {
                padding: 0;
              }

              .bank-gateway {
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-sizing: border-box;
                height: 74px;
                width: 177px;
                border: 1.3px solid #E7ECF4;
                border-radius: 8px;
                padding: 8px;
                cursor: pointer;

                .checked-check-box {
                  &:deep(.q-icon) {
                    color: #FFB74D;

                  }
                }

                &:deep(.q-checkbox__inner  ) {
                  width: 20px;
                }

                &:deep(.q-checkbox__icon-container ) {
                  width: 20px;
                }

                &:deep(.q-checkbox__label) {
                  font-style: normal;
                  font-weight: 400;
                  font-size: 11px;
                  line-height: 19px;
                  letter-spacing: -0.05em;
                  color: #23263B;
                }

                @media screen and (max-width: 1439px) {
                  width: 100%;
                  margin-bottom: 8px;
                }

                @media screen and (max-width: 1023px) {
                  margin-bottom: 0;
                }

                @media screen and (max-width: 599px) {
                  margin-bottom: 10px;
                }

                .bank-icon-container {
                  min-width: 58px;
                  height: 58px;
                  background: #F4F3FF;
                  border-radius: 5px;
                  margin-right: 8px;
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

              @media screen and (max-width: 1439px) {
                margin-bottom: 6px;
              }

              @media screen and (max-width: 599px) {
                font-size: 14px;
              }
            }

            .payment-description-input {
              margin-bottom: 24px;

              &:deep(.q-field__control) {
                height: 65px;
                border: 1.3px solid #E7ECF4;
                border-radius: 8px;
              }

              &:deep(.q-field__label ) {
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 19px;
                letter-spacing: -0.05em;
                color: #9092A7;
                margin: -8px 0;
              }

              &:deep(.q-field__label .q-field__native) {
                padding: 12px 16px;
              }

              &:deep(.q-field__inner .q-field__control:before) {
                border: none;
              }
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

          &:deep(.q-field__control) {
            width: 374px;
            height: 40px;
            background: #F6F9FF;
            border-radius: 8px;
            padding: 0 16px;
          }

          &:deep(.q-field__label) {
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 19px;
            text-align: right;
            letter-spacing: -0.003em;
            color: #ADAFC1;
            margin: -8px 0;
          }

          &:deep(.q-field__inner .q-field__control:before) {
            border: none;
          }
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
          color: #FFFFFF;
          cursor: pointer;
        }
      }
    }

  }

  .payment-button-container {
    &.payment-button-container-desktop {
      display: flex;
      @media screen and (max-width: 599px) {
        display: none;
      }
    }

    @media screen and (max-width: 599px) {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      padding: 13px 19px;
      background: #FFFFFF;
      box-shadow: 0px -6px 10px rgba(112, 108, 161, 0.07);
      border-radius: 16px 16px 0 0;
    }

    .final-price {
      display: none;
      color: #434765;
      @media screen and (max-width: 599px) {
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
      color: #FFFFFF;
      cursor: pointer;
      width: 100%;

      &.payment-button-disable {
        opacity: 0.5;
        cursor: default;
      }

      @media screen and (max-width: 599px) {
        width: 104px;
        height: 36px;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 22px;
      }

      &.payment-button-mobile-view {
        display: none;
        @media screen and (max-width: 599px) {
          display: flex;
        }
      }

      &.payment-button-desktop-view {
        display: flex;
        @media screen and (max-width: 599px) {
          display: none;
        }
      }
    }
  }

}
</style>

<template>
  <div class="RegisterKonkurFieldSelectionGoToPayment">
    <div class="state-photo">
      <lazy-img src="https://nodes.alaatv.com/upload/CheckCircle.png" />
    </div>
    <div class="title-text text-center q-mb-md">
      اطلاعات شما با موفقیت ثبت شد.
    </div>
    <div class="content-text text-center q-mb-xl">
      پس از پرداخت و تکمیل ثبت نام تیم آلاء باهاتون تماس میگیره.
    </div>
    <div v-if="selectedProductId !== freeProductId"
         class="coupon-action-row">
      <div class="coupon-input-title">
        کد تخفیف
      </div>
      <div class="coupon-input-field q-mb-lg">
        <q-input v-model="couponCode"
                 :loading="couponLoading"
                 placeholder="کد تخفیفتو وارد کن"
                 mask="NNNNN">
          <template #append>
            <q-btn v-if="!orderPrice"
                   flat
                   :loading="couponLoading"
                   @click="attachCoupon">
              ثبت
            </q-btn>
            <q-btn v-else
                   flat
                   color="red"
                   :loading="couponLoading"
                   @click="detachCoupon">
              حذف
            </q-btn>
          </template>
        </q-input>
      </div>
      <div v-if="orderPrice"
           class="coupon-price-info">
        <div v-if="orderPrice.base"
             class="coupon-price-base content-big-text">
          <div class="coupon-price-row">
            <div class="coupon-price-column coupon-price-title">
              جمع خرید
            </div>
            <div class="coupon-price-column coupon-price-value">
              <span class="price-number">
                {{ orderPrice.base.toLocaleString('fa') }}
              </span>
              <span class="price-unit content-text">
                تومان
              </span>
            </div>
          </div>
        </div>
        <div v-if="orderPrice.discount"
             class="coupon-price-discount content-big-text">
          <div class="coupon-price-row">
            <div class="coupon-price-column coupon-price-title">
              سود شما از این خرید:
            </div>
            <div class="coupon-price-column coupon-price-value">
              <span class="price-number">
                {{ orderPrice.discount.toLocaleString('fa') }}
              </span>
              <span class="price-unit content-text">
                تومان
              </span>
            </div>
          </div>
        </div>
        <div v-if="orderPrice.final"
             class="coupon-price-final Subtitle1-text">
          <div class="coupon-price-row">
            <div class="coupon-price-column coupon-price-title">
              مبلغ قابل پرداخت:
            </div>
            <div class="coupon-price-column coupon-price-value">
              <span class="price-number">
                {{ orderPrice.final.toLocaleString('fa') }}
              </span>
              <span class="price-unit content-text">
                تومان
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row q-col-gutter-md action-row">
      <div class="col-12">
        <q-btn color="primary"
               class="full-width"
               @click="pay">
          پرداخت و تکمیل ثبت نام
        </q-btn>
      </div>
    </div>
    <div class="flex justify-end q-mt-sm">
      <q-btn flat
             :to="{name: 'Public.Home'}">
        رفتن به صفحه اصلی آلاء
        <q-icon name="arrow_back" />
      </q-btn>
    </div>
  </div>
</template>

<script>
import { Notify } from 'quasar'
import Price from 'src/models/Price.js'
import LazyImg from 'src/components/lazyImg.vue'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'RegisterKonkurFieldSelectionGoToPayment',
  components: { LazyImg },
  props: {
    orderId: {
      type: Number,
      default: null
    },
    selectedProductId: {
      type: Number,
      default: null
    },
    freeProductId: {
      type: Number,
      default: null
    }
  },
  emits: ['end'],
  data () {
    return {
      couponCode: null,
      couponLoading: false,
      orderPrice: null
    }
  },
  mounted () {
  },
  methods: {
    pay () {
      if (!this.orderId) {
        return
      }
      APIGateway.cart.getPaymentRedirectEncryptedLink({ device: 'web', paymentMethod: 'mellat', orderId: this.orderId })
        .then(encryptedPaymentRedirectLink => {
          window.open(encryptedPaymentRedirectLink, '_self')
        })
        .catch(() => {
        })
    },
    attachCoupon () {
      this.couponLoading = true
      APIGateway.coupon.base({ code: this.couponCode, order_id: this.orderId })
        .then((data) => {
          this.orderPrice = new Price(data.data.price)
          this.couponLoading = false
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
    detachCoupon() {
      APIGateway.coupon.deleteCoupon({ order_id: this.orderId })
        .then(() => {
          this.orderPrice = null
          this.couponLoading = false
          this.cartReview()
          Notify.create({
            message: 'کد تخفیف با موفقیت حذف شد',
            type: 'positive',
            color: 'positive'
          })
        })
        .catch(() => {
          this.couponLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.RegisterKonkurFieldSelectionGoToPayment {
  .state-photo {
    margin-top: 88px;
  }

  .coupon-action-row {
    .coupon-input-title {

    }

    .coupon-input-field {

    }

    .coupon-price-info {
      .coupon-price-row {
        display: flex;
        flex-flow: row;
        justify-content: space-between;

        .coupon-price-column {
          &.coupon-price-title {

          }

          &.coupon-price-value {
            .price-number {}

            .price-unit {
              margin-left: 8px;
            }
          }
        }
      }

      .coupon-price-base {
        color: #424242;
        margin-bottom: 8px;
      }

      .coupon-price-discount {
        color: #EF5350;

        .coupon-price-row {
          .coupon-price-column {
            &.coupon-price-value {
              .price-unit {
                color: #EF5350;
              }
            }
          }
        }

        margin-bottom: 8px;
      }

      .coupon-price-final {
        color: #424242;
      }
    }
  }

  .action-row {
    margin-top: 48px;
  }
}
</style>

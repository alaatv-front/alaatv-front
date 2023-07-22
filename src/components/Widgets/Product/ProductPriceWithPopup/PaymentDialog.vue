<template>
  <q-dialog :model-value="dialog"
            @hide="toggleDialog">
    <q-card class="payment-card"
            :class="{'cash': paymentMethod === 'cash'}">
      <q-card-section>
        <div class="payment-header">
          <div class="header-title">ثبت نام</div>
          <div class="header-subtitle">
            شما میتونید خدمات و دوره های دیگر سال کنکور خودتون رو الان بخرید!
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row"
             :class="{'q-col-gutter-sm': paymentMethod !== 'cash'}">
          <div class="col-12"
               :class="{'col-md-6': paymentMethod !== 'cash'}">
            <div class="Products-label">
              دوره های مکمل
            </div>
            <product-selection v-model:selectedIds="selectedIds"
                               class="q-mb-lg"
                               :product="product"
                               @update:selectedIds="onChangeSelectedIds" />
          </div>
          <div v-if="paymentMethod !== 'cash'"
               class="col-12 col-md-6">
            <div class="product-label">
              اقساط
            </div>
            <div class="installment">
              <q-list>
                <q-item>
                  <q-item-section class="installment-order"
                                  side>
                    قسط
                  </q-item-section>
                  <q-item-section class="installment-date">زمان پرداخت</q-item-section>
                  <q-item-section class="installment-amount"
                                  side>
                    مبلغ
                  </q-item-section>
                </q-item>
                <q-item v-for="item in installment"
                        :key="item"
                        class="installment-item">
                  <q-item-section class="installment-order"
                                  :class="{'active': item.active}"
                                  side>
                    {{ item.order }}
                  </q-item-section>
                  <q-item-section class="installment-date"
                                  :class="{'active': item.active}">{{ item.date }}</q-item-section>
                  <q-item-section class="installment-amount"
                                  :class="{'active': item.active}"
                                  side>{{ item.amount }}</q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="payment-footer">
        <div class="price-info">
          <div class="price-title">
            <ph-tag :size="16"
                    class="price-title-icon" />
            قیمت کل :
          </div>
          <div v-if="productPrice.discount > 0"
               class="price-calculation">
            <div class="discount">
              <q-badge color="negative"
                       text-color="white"
                       :label="'%' + productPrice.discount" />
            </div>
            <div class="base">
              {{ productPrice.toman('base', null) }}
            </div>
          </div>
          <div v-if="productPrice"
               class="price-final">
            <div class="number">{{ productPrice.toman('final', null) }}</div>
            <div class="label">تومان</div>
          </div>
        </div>
        <div class="footer-action">
          <q-btn v-if="paymentMethod === 'cash'"
                 color="primary"
                 text-color="grey-9"
                 unelevated
                 class="action-btn full-width"
                 label="ثبت نام نقدی"
                 @click="addToCart('cash')" />
          <q-btn v-else
                 color="primary"
                 text-color="grey-9"
                 unelevated
                 class="action-btn full-width"
                 label="ثبت نام اقساطی"
                 @click="addToCart('installment')" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import Price from 'src/models/Price.js'
import { Product } from 'src/models/Product.js'
import { AEE } from 'src/assets/js/AEE/AnalyticsEnhancedEcommerce.js'
import { mixinPrefetchServerData } from 'src/mixin/Mixins.js'
import ProductSelection from 'src/components/Widgets/Product/ProductPriceWithPopup/ProductSelection.vue'

export default defineComponent({
  name: 'PaymentDialog',
  components: {
    ProductSelection
  },
  mixins: [mixinPrefetchServerData],
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    paymentMethod: {
      type: String,
      default: 'cash'
    },
    product: {
      type: Product,
      default: new Product()
    }
  },
  emits: ['updateProduct', 'updateProductLoading', 'toggleDialog'],
  data() {
    return {
      productPrice: new Price(),
      selectedIds: [],
      installment: [
        {
          order: 'اول',
          date: 'هم اکنون',
          amount: '800000',
          active: true
        },
        {
          order: 'دوم',
          date: 'خرداد 1402',
          amount: '700000',
          active: false
        },
        {
          order: 'سوم',
          date: 'مهر 1402',
          amount: '700000',
          active: false
        },
        {
          order: 'چهارم',
          date: 'اسفند 1402',
          amount: '700000',
          active: false
        }
      ]
    }
  },
  computed: {
    cart () {
      return this.$store.getters['Cart/cart']
    },
    discountInPercent () {
      if (this.productPrice.discountInPercent && typeof this.productPrice.discountInPercent === 'function') {
        return this.productPrice.discountInPercent()
      }

      return 0
    },
    productId () {
      if (this.urlParam && this.$route.params[this.urlParam]) {
        return this.$route.params[this.localOptions.urlParam]
      }
      if (this.$route.params.id) {
        return this.$route.params.id
      }
      return this.product.id
    }
  },
  methods: {
    onChangeSelectedIds (newValue) {
      this.productPrice.loading = true
      this.$apiGateway.product.getPrice({
        product_id: this.product.id,
        products: newValue
      })
        .then((price) => {
          this.productPrice = new Price(price)
          this.productPrice.loading = false
        })
        .catch(() => {
          this.productPrice.loading = false
        })
    },
    prefetchServerDataPromise () {
      this.$emit('updateProductLoading', true)
      return this.getProduct()
    },
    prefetchServerDataPromiseThen (product) {
      this.$emit('updateProduct', product)
      this.productPrice = product.price
      if (window) {
        this.updateEECEventDetail()
      }
      this.$emit('updateProductLoading', false)
    },
    prefetchServerDataPromiseCatch () {
      this.$emit('updateProductLoading', false)
    },
    updateEECEventDetail() {
      AEE.productDetailViews('product.show', this.product.eec.getData(), {
        TTl: 1000,
        key: this.product.id
      })
    },
    getProduct() {
      return this.$apiGateway.product.show(this.productId)
    },
    addToCart() {
      if (this.product.hasChildren() && this.selectedIds.length === 0) {
        this.$q.notify({
          type: 'negative',
          color: 'negative',
          timeout: 5000,
          position: 'top',
          message: 'یکی از موارد قابل انتخاب محصول را انتخاب کنید.',
          icon: 'report_problem'
        })
        return
      }
      this.$store.dispatch('Cart/addToCart', { product: this.product, products: this.selectedIds })
        .then(() => {
          this.$router.push({ name: 'Public.Checkout.Review' })
        })
    },
    toggleDialog() {
      this.$emit('toggleDialog')
    }
  }
})
</script>

<style lang="scss" scoped>
.payment-card {
  border-radius: 12px;
  background:#FFF;
  box-shadow: 0px 2px 4px -2px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.10);
  width: 800px;
  max-width: 100%;
  height: 649px;
  position: relative;

  &.cash {
    width: 480px;
  }

  .payment-header {
    padding: 20px 20px 0;
    .header-title {
      color: #616161;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.48px;
      margin-bottom: 4px;
    }

    .header-subtitle {
      color: #616161;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.42px;
    }
  }

  .products-label {
    padding: 0 20px 9px;

  }

  .installment {
    width: 330px;
    height: 349px;
    border-radius: 8px;
    background: #ECEFF1;
    overflow-y: auto;
    padding: 20px;

    .installment-item {
      border-radius: 4px;
      background: #FFF;
      margin: 8px 0;
      height: 36px;

      .installment-order {
        color:#616161;
        font-size: 12px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: -0.36px;

        &.active {
          color: #616161;
          font-size: 14px;
          font-style: normal;
          font-weight: 800;
          line-height: normal;
          letter-spacing: -0.42px;
        }
      }
      .installment-date {
        color:#616161;
        text-align: center;
        font-size: 12px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: -0.36px;

        &.active {
          color: #616161;
          font-size: 14px;
          font-style: normal;
          font-weight: 800;
          line-height: normal;
          letter-spacing: -0.42px;
        }
      }
      .installment-amount {
        color:#616161;
        font-size: 12px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: -0.36px;

        &.active {
          color: #616161;
          font-size: 14px;
          font-style: normal;
          font-weight: 800;
          line-height: normal;
          letter-spacing: -0.42px;
        }
      }
    }
  }

  .payment-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 30px 20px;
    .price-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-bottom: 16px;

      .price-title {
        display: flex;
        justify-content: center;
        align-items: center;
        color:#303030;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.54px;

        .price-title-icon {
          margin-right: 8px;
        }
      }
      .price-calculation {
        display: flex;
        justify-content: center;
        align-items: center;

        .discount {
          margin-right: 8px;
        }

        .base {
          color:#757575;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          letter-spacing: -0.8px;
        }
      }
      .price-final {
        display: flex;
        justify-content: center;
        align-items: center;

        .number {
          color:#424242;
          font-size: 24px;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
          letter-spacing: -1.2px;
        }

        .label {
          color:#424242;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }
    }
  }
}
</style>

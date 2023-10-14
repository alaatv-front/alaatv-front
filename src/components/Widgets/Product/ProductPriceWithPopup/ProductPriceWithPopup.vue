<template>
  <div class="product-price-container">
    <div class="price-info">
      <div class="price-title">
        <q-icon name="ph:tag"
                color="gray-7"
                size="16px" />
        <template v-if="hasInstallment">
          قیمت نقدی:
        </template>
        <template v-else>
          قیمت:
        </template>
      </div>
      <div v-if="productPrice.discount > 0"
           class="price-calculation">
        <div class="discount">
          <q-badge color="negative"
                   text-color="white"
                   :label="'%' + productPrice.discountInPercent()" />
        </div>
        <div class="base">
          {{ productPrice.toman('base', null) }}
        </div>
      </div>
      <div class="price-final">
        <div class="number">{{ productPrice.toman('final', null) }}</div>
        <div class="label">تومان</div>
      </div>
    </div>
    <div v-if="hasInstallment"
         class="price-info hasInstallment">
      <span class="instalment-message">
        <span class="instalment-label">
          اقساطی
        </span>
        <span class="simple-text">
          بیا تو دوره فقط با:
        </span>
      </span>
      <span v-if="localOptions.product.instalments && localOptions.product.instalments.length > 0"
            class="instalment-price">
        <span class="price-value">
          {{ localOptions.product.instalments[0].value.toLocaleString('fa') }}
        </span>
        <span class="price-label">
          تومان
        </span>
      </span>
      <span class="instalment-label-responsive">
        اقساطی
      </span>
    </div>
    <div class="price-action">
      <q-btn :color="!localOptions.product.payment_default || localOptions.product.payment_default === 1 ? 'primary' : 'grey-3'"
             text-color="grey-9"
             unelevated
             class="action-btn"
             :class="{'full-width': !hasInstallment}"
             :label="hasInstallment ? 'ثبت نام نقدی' : 'ثبت نام'"
             @click="paymentAction('cash')" />
      <q-btn v-if="hasInstallment"
             :color="localOptions.product?.payment_default || localOptions.product.payment_default === 2 ? 'primary' : 'grey-3'"
             text-color="grey-9"
             unelevated
             class="action-btn gesti"
             label="ثبت نام اقساطی"
             @click="paymentAction('installment')" />
    </div>
    <payment-dialog :dialog="dialog"
                    :paymentMethod="paymentMethod"
                    :product="localOptions.product"
                    :productComplimentary="productComplimentary"
                    :examList="examList"
                    @toggle-dialog="toggleDialog"
                    @update-product="onUpdateProduct($event)"
                    @update-product-loading="onUpdateProductLoading($event)" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Price from 'src/models/Price.js'
import { Product } from 'src/models/Product.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinWidget, mixinAuth } from 'src/mixin/Mixins.js'
import PaymentDialog from 'src/components/Widgets/Product/ProductPriceWithPopup/PaymentDialog.vue'

export default defineComponent({
  name: 'ProductPriceWithPopup',
  components: {
    PaymentDialog
  },
  mixins: [mixinWidget, mixinAuth],
  emits: ['updateProduct', 'updateProductLoading'],
  data() {
    return {
      defaultOptions: {
        product: new Product()
      },
      dialog: false,
      paymentMethod: null,
      productComplimentary: [],
      onLoginAction: () => {},
      examList: []
    }
  },
  computed: {
    productId () {
      return this.localOptions.product.id
    },
    productPrice() {
      if (this.localOptions.product) {
        return new Price(this.localOptions.product.price)
      }
      return new Price()
    },
    hasInstallment () {
      if (this.localOptions.product) {
        return this.localOptions.product.has_instalment_option
      }
      return false
    }
  },
  watch: {
    productId() {
      this.getProductComplimentary()
      this.getProductExams()
    }
  },
  mounted() {
    this.$bus.on('onLoggedIn', () => {
      this.onLoginAction()
    })
  },
  methods: {
    addToCart(hasInstalmentOption = false, goToCheckoutReview = true) {
      this.$store.dispatch('Cart/addToCart', { product: this.localOptions.product, has_instalment_option: hasInstalmentOption })
        .then(() => {
          if (goToCheckoutReview) {
            this.$router.push({ name: 'Public.Checkout.Review' })
          }
        })
    },
    paymentAction(paymentMethod) {
      this.paymentMethod = paymentMethod

      if (paymentMethod === 'installment') {
        this.checkLoginForInstallment()
        return
      }

      if (this.productComplimentary.length === 0 && this.examList.length === 0) {
        this.addToCart()
        return
      }
      if (this.productComplimentary.length > 0 || this.examList.length > 0) {
        this.toggleDialog()
      }
    },
    paymentActionForInstallment () {
      this.addToCart(true, false)
      this.toggleDialog()
    },
    checkLoginForInstallment() {
      if (this.isUserLogin) {
        this.paymentActionForInstallment()
        return
      }

      this.$store.commit('Auth/updateRedirectTo', { name: this.$route.name, params: this.$route.params, query: this.$route.query })
      this.onLoginAction = this.paymentActionForInstallment
      this.$store.commit('AppLayout/updateLoginDialog', true)
    },
    checkLogin() {
      this.$store.commit('Auth/updateRedirectTo', this.$route.name)
      this.onLoginAction = this.paymentActionForInstallment
      this.$store.commit('AppLayout/updateLoginDialog', true)
    },
    toggleDialog() {
      this.dialog = !this.dialog
    },
    getProductComplimentary() {
      APIGateway.product.getProductComplimentary(this.localOptions.product.id)
        .then(productList => {
          this.productComplimentary = productList.list
        })
        .catch(() => {})
    },
    getProductExams() {
      APIGateway.product.getProductExamList(this.localOptions.product.id)
        .then(examList => {
          this.examList = examList
        })
        .catch((examList) => {
          this.examList = examList
        })
    },
    onUpdateProduct(event) {
      this.$emit('updateProduct', event)
    },
    onUpdateProductLoading(event) {
      this.$emit('updateProductLoading', event)
    }
  }
})
</script>

<style lang="scss" scoped>

@mixin instalment-label () {
  display: flex;
  padding: 4px 6px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: 6px;
  background: linear-gradient(-90deg, #2CB2C5 0.01%, #31B470 99.99%);
  color: #FFF;
  text-align: right;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.36px;
}

.product-price-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media screen and (max-width: 1023px){
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    background: #FFFFFF;
    z-index: 5;
    padding: 24px 30px 16px;
    box-shadow: 1px 1px 2px 0 #010101;
  }

  .price-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 8px;
    padding: 12px;

    border-radius: 8px;
    border: 1px solid #E6E6E6;
    background: #F5F7FA;

    @media screen and (max-width: 1439px){
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      grid-column-gap: 0px;
      grid-row-gap: 0px;
    }

    @media screen and (max-width: 1023px){
      display: flex;
      padding: 12px 20px;
      margin-bottom: 12px;
    }

    @media screen and (max-width: 599px){
      padding: 12px;
    }

    .price-title {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #303030;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.54px;

      @media screen and (max-width: 1439px){
        grid-area: 1 / 1 / 2 / 2;
        justify-content: flex-start;
      }

      @media screen and (max-width: 1023px){
        font-size: 16px;
        flex-grow: 1;
      }
      @media screen and (max-width: 599px){
        font-size: 10px;
        flex-grow: initial;
      }

      .q-icon {
        margin-right: 8px;
      }
    }
    .price-calculation {
      display: flex;
      justify-content: center;
      align-items: center;

      @media screen and (max-width: 1439px){
        grid-area: 2 / 2 / 3 / 3;
      }

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
        text-decoration: line-through;
      }
    }
    .price-final {
      display: flex;
      justify-content: center;
      align-items: center;

      @media screen and (max-width: 1439px){
        grid-area: 1 / 2 / 2 / 3;
      }

      .number {
        color:#424242;
        font-size: 24px;
        @media screen and (max-width: 1300px){
          font-size: 18px;
        }
        @media screen and (max-width: 1023px){
          font-size: 24px;
        }
        @media screen and (max-width: 400px){
          font-size: 18px;
        }
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

    &.hasInstallment {
      .instalment-message {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .instalment-label {
          @include instalment-label();
          margin-right: 16px;

          @media screen and (max-width: 1439px){
            display: none;
          }
          @media screen and (max-width: 1023px){
            display: flex;
          }
        }
        .simple-text {
          color: #303030;
          font-size: 18px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          letter-spacing: -0.54px;
          @media screen and (max-width: 1439px){
            font-size: 14px;
          }
          @media screen and (max-width: 1023px){
            font-size: 18px;
          }
          @media screen and (max-width: 599px){
            font-size: 14px;
          }
        }
      }
      .instalment-price {
        color: #FF8518;
        font-style: normal;
        line-height: normal;

        @media screen and (max-width: 1439px){
          margin-left: auto;
        }
        .price-value {
          font-size: 20px;
          font-weight: 600;
          letter-spacing: -1px;
          @media screen and (max-width: 1439px){
            font-size: 18px;
          }
          @media screen and (max-width: 1023px){
            font-size: 20px;
          }
          @media screen and (max-width: 599px){
            font-size: 18px;
          }
        }
        .price-label {
          font-size: 14px;
          font-weight: 400;
        }
      }

      .instalment-label-responsive {
        @include instalment-label();
        display: none;
        margin-top: 7px;
        width: fit-content;
        justify-content: flex-end;
        margin-left: auto;
        grid-area: 2 / 2 / 3 / 3;

        @media screen and (max-width: 1439px){
          display: flex;
        }
        @media screen and (max-width: 1024px){
          display: none;
        }
      }
    }
  }

  .price-action {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 16px;

    @media screen and (max-width: 1023px){
      margin-top: 28px;
    }

    .action-btn {
      width: 179px;
      height: 48px;
      max-width: 100%;

      @media screen and (max-width: 1440px){
        width: 128px;
      }
      @media screen and (max-width: 1023px){
        width: 262px;
      }
      @media screen and (max-width: 599px){
        width: 149px;
      }

      &.gesti {
        margin-left: 16px;
      }
    }
  }
}
</style>

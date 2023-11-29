<template>
  <div class="product-price-container">
    <div v-if="paymentMode === 'cash'"
         class="price-info">
      <div v-if="productPrice.discount > 0"
           class="price-calculation">
        <div class="discount">
          <q-badge color="negative"
                   size="xs"
                   text-color="white"
                   :label="'%' + productPrice.discountInPercent()" />
        </div>
        <div class="base">
          {{ productPrice.toman('base', null) }}
        </div>
      </div>
      <div class="price-final">
        <h5>{{ productPrice.toman('final', null) }}</h5>
        <div class="label">تومان</div>
      </div>
    </div>
    <div v-if="paymentMode === 'cash'"
         class="price-action">
      <q-btn color="primary"
             class="action-btn"
             size="md"
             :label="hasInstallment ? 'ثبت نام نقدی' : 'ثبت نام'"
             @click="paymentAction('cash')" />
    </div>
    <payment-dialog :dialog="dialog"
                    :position="position"
                    :paymentMethod="paymentMethod"
                    :product="localOptions.product"
                    :productComplimentary="productComplimentary"
                    :examList="examList"
                    @toggle-dialog="toggleDialog"
                    @update-product="onUpdateProduct($event)"
                    @update-product-loading="onUpdateProductLoading($event)" />
    <div v-if="paymentMode === 'installment' && hasInstallment"
         class="installment-info">
      <div class="installment-header">
        <q-icon name="ph:credit-card"
                class="header-icon" />
        <div class="header-text">
          امکان ثبت نام به صورت اقساطی در آلاء
        </div>
      </div>
      <div class="installment-payment-info">
        <div class="installment-count">
          <h4 class="count-number">
            6
          </h4>
          <div class="count-title">
            قسط
          </div>
        </div>
        <div class="installment-price">
          <span class="installment-price-pre">فقط با</span>
          <h5 class="installment-price-number">{{ localOptions.product.instalments[0].value.toLocaleString('fa') }}</h5>
          <span class="installment-price-title">تومان</span>
        </div>
      </div>
      <div class="price-action installment">
        <q-btn color="accent"
               class="action-btn"
               size="md"
               label="ثبت نام اقساطی"
               @click="paymentAction('installment')" />
      </div>

    </div>
  </div>
  <div v-if="showResponsive"
       class="mobile-view">
    <div class="mobile-price-info">
      <div class="mobile-discount">
        <q-badge color="negative"
                 size="xs"
                 text-color="white"
                 :label="'%' + productPrice.discountInPercent()" />
      </div>
      <div class="mobile-price-calculation">
        <div class="mobile-price-calculation-base">
          {{ productPrice.toman('base', null) }}
        </div>
        <h5 class="mobile-price-calculation-final">{{ productPrice.toman('final', null) }}</h5>
        <div class="mobile-price-calculation-label">تومان</div>
      </div>
    </div>
    <div class="mobile-installment-info">
      <q-badge color="accent"
               size="xs"
               text-color="white"
               :label="'۶قسط'" />
      <div class="mobile-installment-price">
        <span class="mobile-installment-price-pre">فقط با</span>
        <h5 class="mobile-installment-price-number">{{ localOptions.product.instalments[0].value.toLocaleString('fa') }}</h5>
        <span class="mobile-installment-price-title">تومان</span>
      </div>
    </div>
    <div class="mobile-price-action">
      <q-btn color="primary"
             class="mobile-action-btn"
             :class="{'has-installment': hasInstallment}"
             size="md"
             :label="hasInstallment ? 'ثبت نام نقدی' : 'ثبت نام'"
             @click="paymentAction('cash')" />
      <q-btn color="accent"
             class="mobile-action-btn"
             :class="{'has-installment': hasInstallment}"
             size="md"
             label="ثبت نام اقساطی"
             @click="paymentAction('installment')" />
    </div>
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
  props: {
    paymentMode: {
      type: String,
      default: 'cash'
    },
    showResponsive: {
      type: Boolean,
      default: false
    }
  },
  emits: ['updateProduct', 'updateProductLoading'],
  data () {
    return {
      defaultOptions: {
        product: new Product()
      },
      dialog: false,
      position: 'center',
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
    productPrice () {
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
    productId () {
      this.getProductComplimentary()
      this.getProductExams()
    }
  },
  mounted () {
    this.$bus.on('onLoggedIn', () => {
      this.onLoginAction()
    })
  },
  methods: {
    addToCart (hasInstalmentOption = false, goToCheckoutReview = true) {
      this.$store.dispatch('Cart/addToCart', { product: this.localOptions.product, has_instalment_option: hasInstalmentOption })
        .then(() => {
          if (goToCheckoutReview) {
            this.$router.push({ name: 'Public.Checkout.Review' })
          }
        })
    },
    paymentAction (paymentMethod) {
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
    checkLoginForInstallment () {
      if (this.isUserLogin) {
        this.paymentActionForInstallment()
        return
      }

      this.$store.commit('Auth/updateRedirectTo', { name: this.$route.name, params: this.$route.params, query: this.$route.query })
      this.onLoginAction = this.paymentActionForInstallment
      this.$store.commit('AppLayout/updateLoginDialog', true)
    },
    checkLogin () {
      this.$store.commit('Auth/updateRedirectTo', this.$route.name)
      this.onLoginAction = this.paymentActionForInstallment
      this.$store.commit('AppLayout/updateLoginDialog', true)
    },
    toggleDialog () {
      if (this.$q.screen.lt.md && this.dialog === false) {
        this.position = 'bottom'
      }
      this.dialog = !this.dialog
    },
    getProductComplimentary () {
      APIGateway.product.getProductComplimentary(this.localOptions.product.id)
        .then(productList => {
          this.productComplimentary = productList.list
        })
        .catch(() => {})
    },
    getProductExams () {
      APIGateway.product.getProductExamList(this.localOptions.product.id)
        .then(examList => {
          this.examList = examList
        })
        .catch((examList) => {
          this.examList = examList
        })
    },
    onUpdateProduct (event) {
      this.$emit('updateProduct', event)
    },
    onUpdateProductLoading (event) {
      this.$emit('updateProductLoading', event)
    }
  }
})
</script>

<style lang="scss" scoped>
@import "src/css/Theme/Typography/typography";
@import "src/css/Theme/colors";
@import "src/css/Theme/spacing";
@import "src/css/Theme/radius";

@mixin instalment-label() {
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

  .price-info {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;

    @media screen and (width <= 1439px){
    }

    @media screen and (width <= 1023px){
      display: none;
    }

    @media screen and (width <= 599px){
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

      @media screen and (width <= 1439px){
        justify-content: flex-start;
      }

      @media screen and (width <= 1023px){
        font-size: 16px;
        flex-grow: 1;
      }

      @media screen and (width <= 599px){
        font-size: 10px;
        flex-grow: initial;
      }

      .q-icon {
        margin-right: 8px;
      }
    }

    .price-calculation {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      @media screen and (width <= 1439px){
      }

      @media screen and (width <= 1023px){
        margin-right: 8px;
      }

      @media screen and (width <= 599px){
        margin-right: initial;
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
        margin-right: $space-2;
      }
    }

    .price-final {
      display: flex;
      justify-content: center;
      align-items: center;

      @media screen and (width <= 1439px){
        grid-area: 1 / 2 / 2 / 3;
      }
      .label {
        @include caption1;
        margin-left: $space-1;
      }
    }
  }

  .installment-info {
    display: flex;
    width: 100%;
    padding: $space-4;
    flex-direction: column;
    align-items: flex-end;
    gap: $space-4;
    border-radius: $radius-3;
    border: 1px solid $accent-5;
    background: $grey-2;

    @media screen and (width <= 1023px){
      display: none;
    }

    .installment-header {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      align-self: stretch;

      .header-icon {
        color: $accent-5;
        font-size: 24px;
      }
      .header-text {
        color: $grey-9;
        font-feature-settings: 'clig' off, 'liga' off;

        @include subtitle2
      }
    }

    .installment-payment-info {
      height: 48px;
      align-self: stretch;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      flex-shrink: 0;
      border-radius: $radius-2;
      border: 2px solid $accent-4;
      background: $grey-1;

      .installment-count {
        position: relative;
        border-radius: 6px;
        background: $accent-5;
        width: 52px;
        height: 48px;
        display: flex;
        flex-shrink: 0;

        .count-number {
          position: absolute;
          top: 2px;
          right: 20px;
          left: 20px;
          z-index: 5;
          color: $grey-1;
          text-align: center;
        }

        .count-title {
          position: absolute;
          bottom: 6px;
          right: 12px;
          left: 12px;
          z-index: 4;
          color: $grey-1;
          text-align: center;
          font-feature-settings: 'clig' off, 'liga' off;

          @include subtitle2
        }
      }

      .installment-price {
        margin-left: $space-7;
        display: flex;
        align-items: center;
        justify-content: center;

        &-pre {
          @include caption1;
          color: $grey-9;
        }

        &-number {
          color: $grey-9;
          margin: $spacing-none $space-1;
        }

        &-title {
          @include caption1;
          color: $grey-9;
        }
      }
    }
  }

  .price-action {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 12px;

    @media screen and (width <= 1023px){
      display: none;
    }

    &.installment {
      margin-top: 0;
    }

    @media screen and (width <= 1023px){
      margin-top: 28px;
    }

    .action-btn {
      width: 100%;
      max-width: 100%;
    }
  }

}

.mobile-view {
  display: none;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  z-index: 15;
  flex-direction: column;
  align-items: flex-end;
  gap: $space-3;
  border-radius: $radius-4 $radius-4 $radius-none $radius-none;
  background: $grey-1;
  box-shadow: $shadow-8;

  @media screen and (width <= 1023px){
    display: flex;
    padding: $space-4 $space-7 $space-6 $space-7;
  }

  @media screen and (width <= 599px){
    padding: $space-4 $space-5 $space-5 $space-5;
  }

  .mobile-price-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    display: flex;
    padding: $space-2 $space-3;
    align-self: stretch;
    width: 100%;
    border-radius: $radius-3;
    border: 1px solid $primary;

    .mobile-price-calculation {
      display: flex;
      align-items: center;
      justify-content: center;

      &-base {
        color:#757575;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.8px;
        text-decoration: line-through;
      }

      &-final {
        margin: $spacing-none $space-1 $spacing-none $space-2;
      }

      &-label {
        @include caption2;
        color: $grey-9;
      }
    }
  }

  .mobile-installment-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $space-2 $space-3;
    align-self: stretch;
    border-radius: $radius-3;
    border: 1px solid $accent;
    background: $grey-1;

    .mobile-installment-price {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      &-pre {
        @include caption2;
        color: $grey-9;
      }

      &-number {
        color: $grey-9;
        margin: $spacing-none $space-1 $spacing-none $space-2;
      }

      &-title {
        @include caption2;
        color: $grey-9;
      }
    }
  }

  .mobile-price-action {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    align-self: stretch;

    .mobile-action-btn {
      width: 100%;

      &.has-installment {
        width: 50%;
      }
    }
  }
}
</style>

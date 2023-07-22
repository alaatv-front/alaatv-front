<template>
  <div class="product-price-container">
    <div class="price-info">
      <div class="price-title">
        <ph-tag :size="16"
                class="price-title-icon" />
        قیمت
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
      <div class="price-final">
        <div class="number">{{ productPrice.toman('final', null) }}</div>
        <div class="label">تومان</div>
      </div>
    </div>
    <div class="price-action">
      <q-btn color="primary"
             text-color="grey-9"
             unelevated
             class="action-btn"
             :class="{'full-width': !isInstallment}"
             label="ثبت نام نقدی"
             @click="paymentAction('cash')" />
      <q-btn v-if="isSelectable"
             color="grey-3"
             text-color="grey-9"
             unelevated
             class="action-btn gesti"
             label="ثبت نام اقساطی"
             @click="paymentAction('installment')" />
    </div>
    <payment-dialog :dialog="dialog"
                    :paymentMethod="paymentMethod"
                    :product="localOptions.product"
                    @toggle-dialog="toggleDialog"
                    @update-product="onUpdateProduct($event)"
                    @update-product-loading="onUpdateProductLoading($event)" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { Product } from 'src/models/Product.js'
import Price from 'src/models/Price.js'
import PaymentDialog from 'src/components/Widgets/Product/ProductPriceWithPopup/PaymentDialog.vue'

export default defineComponent({
  name: 'ProductPriceWithPopup',
  components: {
    PaymentDialog
  },
  mixins: [mixinWidget],
  emits: ['updateProduct', 'updateProductLoading'],
  data() {
    return {
      defaultOptions: {
        product: new Product()
      },
      dialog: false,
      paymentMethod: null
    }
  },
  computed: {
    isSelectable () {
      if (this.localOptions.product.children.length > 0) {
        return true
      } else {
        return false
      }
    },
    productPrice() {
      if (this.localOptions.product) {
        return new Price(this.localOptions.product.price)
      }
      return new Price()
    },
    isInstallment () {
      return true
    }
  },
  methods: {
    addToCart() {
      this.$store.dispatch('Cart/addToCart', { product: this.localOptions.product, products: this.selectedIds })
        .then(() => {
          this.$router.push({ name: 'Public.Checkout.Review' })
        })
    },
    paymentAction(paymentMethod) {
      if (!this.isSelectable) {
        this.addToCart()
      } else {
        this.paymentMethod = paymentMethod
        this.toggleDialog()
      }
    },
    toggleDialog() {
      this.dialog = !this.dialog
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
.product-price-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media screen and (max-width: 600px){
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    background: #FFFFFF;
    z-index: 5;
    padding: 20px;
    box-shadow: 1px 1px 2px 0 #010101;
  }

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

  .price-action {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .action-btn {
      width: 181px;
      height: 48px;
      max-width: 100%;

      &.gesti {
        margin-left: 16px;
      }
    }
  }
}
</style>

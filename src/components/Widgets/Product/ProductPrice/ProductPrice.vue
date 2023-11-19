<template>
  <div class="product-price-parent">
    <q-banner v-if="product.is_purchased"
              inline-actions
              rounded
              class="product-purchased">
      شما این محصول را قبلا خریداری کرده اید

      <template v-slot:action>
        <q-btn color="primary"
               unelevated
               text-color="white"
               label="مشاهده فیلم ها و جزوه ها"
               :to="{name: 'UserPanel.MyPurchases' }" />
      </template>
    </q-banner>
    <product-selection v-if="product.hasChildren()"
                       v-model:selectedIds="selectedIds"
                       class="q-mb-lg"
                       :product="product"
                       @update:selectedIds="onChangeSelectedIds" />
    <q-card class="product-price justify-center custom-card"
            :class="options.className"
            :style="options.style">

      <div v-if="options.discount && discountInPercent > 0"
           class="discount-percent q-px-md">
        <div class="percent">{{ '%' + discountInPercent }}</div>
        <div class="discount-title">تخفیف</div>
      </div>

      <div class="price">
        <div v-if="options.basePrice && product.has_instalment_option"
             class="product-base-price">
          {{ productPrice.toman('base', null) }}
        </div>

        <div v-if="productPrice.toman('final', null) && options.finalPrice"
             class="product-final-price">
          <q-skeleton v-if="productPrice.loading"
                      type="text"
                      width="70px" />
          <template v-else>
            {{ productPrice.toman('final', null) }}
            <div v-if="productPrice.discount"
                 class="main-price">
              {{ productPrice.toman('base', false) }}
            </div>
          </template>
        </div>

        <div class="product-price-title"> تومان</div>
      </div>

      <div v-if="options.addToCart"
           class="action">
        <q-btn v-if="product.has_instalment_option"
               unelevated
               class="purchase-button pay-later"
               label="خرید اقساطی"
               text-color="white"
               :loading="cart.loading"
               icon="https://nodes.alaatv.com/upload/landing/28/productSection/landing-taftan-product--section-add-square.png" />
        <q-btn unelevated
               class="purchase-button"
               label="خرید نقدی"
               text-color="white"
               :loading="cart.loading"
               icon="img:https://nodes.alaatv.com/upload/landing/28/productSection/landing-taftan-product--section-add-square.png"
               @click="addToCart" />
      </div>
    </q-card>
  </div>
</template>

<script>
import Price from 'src/models/Price.js'
import { Product } from 'src/models/Product.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinPrefetchServerData } from 'src/mixin/Mixins.js'
import { AEE } from 'src/assets/js/AEE/AnalyticsEnhancedEcommerce.js'
import ProductSelection from 'src/components/Widgets/Product/ProductPrice/ProductSelection.vue'

export default {
  name: 'ProductPrice',
  components: { ProductSelection },
  mixins: [mixinPrefetchServerData],
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
      product: new Product(),
      productPrice: new Price(),
      selectedIds: []
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
      if (typeof this.options.productId !== 'undefined' && this.options.productId !== null) {
        return this.options.productId
      }
      if (this.options.urlParam && this.$route.params[this.options.urlParam]) {
        return this.$route.params[this.options.urlParam]
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
      APIGateway.product.getPrice({
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
      this.product.loading = true
      return this.getProduct()
    },
    prefetchServerDataPromiseThen (data) {
      this.product = new Product(data)
      this.productPrice = this.product.price
      if (window) {
        this.updateEECEventDetail()
      }
      this.product.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.product.loading = false
    },
    updateEECEventDetail() {
      AEE.productDetailViews('product.show', this.product.eec.getData(), {
        TTl: 1000,
        key: this.product.id
      })
    },
    getProduct() {
      return APIGateway.product.show(this.productId)
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
    }
  }
}
</script>

<style lang="scss" scoped>
.product-price-parent {
  .product-price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    padding-right: 20px;

    @media only screen and (width <= 1439px) {
    }

    @media only screen and (width <= 1023px) {
      width: 100%;
      margin: 0;
      padding-right: 30px;
    }

    @media only screen and (width <= 600px) {
      font-size: 14px;
    }

    .discount-percent {
      //width: 120px;
      height: 70px;
      background-color: #E05555;
      color: #fff;
      border-radius: 20px 0 0 20px;
      display: flex;
      justify-content: center;
      align-items: center;

      @media only screen and (width <= 600px) {
        flex-direction: column;
        padding: 5px;
      }

      .percent {
        margin-right: 5px;
      }
    }

    .price {
      display: flex;
      align-items: center;
      margin: 0 20px;

      @media only screen and (width <= 1023px) {
        margin: 0 10px;
      }

      @media only screen and (width <= 1023px) {
        //flex-direction: column;
        padding-left: 30px;
      }

      .product-base-price {
        text-decoration: line-through;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 24px;
        color: #E05555;
        margin-right: 10px;
      }

      .product-final-price {
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 31px;
        letter-spacing: -0.05em;
        margin-left: 5px;
        margin-right: 10px;

        .main-price {
          text-decoration: line-through;

          /* margin-left: 12px; */
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 19px;
          color: #656f7b;
          opacity: 0.4;
        }
      }

      .product-price-title {
        font-style: normal;
        font-weight: 500;
        font-size: 10px;
        line-height: 17px;
      }
    }

    .purchase-button {
      display: flex;
      width: 117px;
      height: 40px;
      background-color: #4CAF50;
      border-radius: 10px;
      justify-content: center;
      align-items: center;

      &.pay-later {
        background-color: #75B7FF;
      }
    }

  }

  .product-purchased{
    margin: 10px 0;
    box-shadow: -2px -4px 10px rgb(255 255 255 / 60%), 2px 4px 10px rgb(112 108 162 / 5%);
    border-radius: 20px;
    background: #fff;
  }
}
</style>

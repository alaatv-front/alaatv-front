<template>
  <div v-if="product.price"
       class="product-price justify-center "
       :class="options.className"
       :style="options.style">

    <div v-if="product.price.discountInPercent() && options.discount"
         class="discount-percent">
      <div class="percent">{{ '%' + product.price.discountInPercent() }}</div>
      <div class="discount-title">تخفیف</div>
    </div>

    <div class="price">
      <div v-if="product.price.toman('base', null) && product.has_instalment_option && options.basePrice"
           class="product-base-price">
        {{ product.price.toman('base', null) }}
      </div>

      <sapn v-if="product.price.toman('final', null) && options.finalPrice"
            class="product-final-price">
        {{ product.price.toman('final', null) }}
      </sapn>

      <div class="product-price-title"> تومان</div>
    </div>

    <div v-if="options.addToCart"
         class="action">
      <q-btn v-if="product.has_instalment_option"
             unelevated
             class="purchase-button pay-later"
             label="خرید اقساطی"
             text-color="white"
             icon="https://nodes.alaatv.com/upload/landing/28/productSection/landing-taftan-product--section-add-square.png" />
      <q-btn unelevated
             class="purchase-button"
             label="خرید نقدی"
             text-color="white"
             icon="img:https://nodes.alaatv.com/upload/landing/28/productSection/landing-taftan-product--section-add-square.png"
             @click="addToCart" />
    </div>
  </div>
</template>

<script>
import { Product } from 'src/models/Product'
import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'ProductPrice',
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
      product: new Product()
    }
  },
  created() {
    this.getProduct()
  },
  methods: {
    getProduct() {
      this.product.loading = true
      APIGateway.product.show({ data: { id: this.options.productId }, cache: { TTL: 10000 } })
        .then(product => {
          this.product.loading = false
          this.product = new Product(product)
        })
        .catch(() => {
          this.product.loading = false
        })
    },
    async addToCart() {
      const data = {
        id: this.product.id
      }
      try {
        await this.$store.dispatch('Cart/addToCart', data)
        this.$router.push({ name: 'Public.Checkout.Review' })
      } catch (e) {
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.product-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  height: 70px;
  border-radius: 20px;
  width: 524px;
  padding-right: 20px;
  margin-bottom: 20px;
  @media only screen and (max-width: 1439px) {
    width: 472px;
  }
  @media only screen and (max-width: 1023px) {
    max-width: 700px;
    width: 100%;
    padding-right: 30px;
  }
  @media only screen and (max-width: 600px) {
    font-size: 14px;
  }

  .discount-percent {
    width: 120px;
    height: 70px;
    background-color: #E05555;
    color: #ffffff;
    border-radius: 20px 0 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media only screen and (max-width: 600px) {
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
  @media only screen and (max-width: 1023px) {
    margin: 0 10px;
  }
  @media only screen and (max-width: 1023px) {
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
</style>

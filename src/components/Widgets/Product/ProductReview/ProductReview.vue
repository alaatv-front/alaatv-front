<template>
  <div class="show-product-review"
       :style="options.style"
       :class="options.className">
    <div class="product-description">
      <div class="description-container">
        <p class="title-style">
          بررسی محصول
        </p>
        <q-skeleton v-if="product.loading"
                    class="description-text"
                    min-width="100%"
                    type="article" />
        <q-card class="description-text"
                v-html="product.description?.short || product.description?.long" />
      </div>
    </div>
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins'
import { Product } from 'src/models/Product'
// import { QuasarTemplateBuilderAppLayout } from 'quasar-template-builder'
// import * as getters from 'src/store/AppLayout/getters'

export default {
  name: 'productReview',
  mixins: [mixinWidget],

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
      defaultOptions: {},
      product: new Product(),
      description: {
        long: '',
        short: '',
        slogan: ''
      }
    }
  },
  watch: {
    options: {
      deep: true,
      handler(newValue) {
        Object.assign(this.description, newValue)
      }
    }
  },
  created() {
    this.loadProduct()
  },
  methods: {
    getProductId () {
      if (this.options.productId) {
        return this.options.productId
      }
      if (this.options.urlParam && this.$route.params[this.options.urlParam]) {
        return this.$route.params[this.options.urlParam]
      }
      if (this.$route.params.id) {
        return this.$route.params.id
      }
      return null
    },
    loadProduct() {
      this.getProductByRequest()
    },

    getProductByRequest() {
      let promise = null
      promise = this.$apiGateway.product.show({
        data: { id: this.options.productId },
        cache: { TTL: 10000 }
      })
      promise
        .then((response) => {
          this.product = new Product(response)
        })
        .catch(() => {
        })
    }

  }
}
</script>

<style>
h2 {
  font-size: 28px;
}
</style>
<style lang="scss" scoped>
.show-product-review {
  margin-bottom: 10px;

}

.title-style {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;

  &::before {
    content: ".";
    color: #BAD9FB;
    font-size: 50px;
    font-weight: bold;
    line-height: 10px;
  }
}

.product-description {
  display: flex;
  justify-content: center;
  margin-bottom: 80px;

  .description-container {
    width: 1140px;

    .description-text {
      background-color: #FFFFFF;
      box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(54, 90, 145, 0.05);
      border-radius: 20px;
      margin-top: 20px;
      padding: 10px 20px;
    }
  }
}

@media screen and (max-width: 1199px) {
  .product-description {
    .description-container {
      width: 908px;

      .description-text {

      }
    }

  }
}

@media screen and (max-width: 991px) {
  .product-description {
    .description-container {
      width: 684px;
    }
  }
}

@media screen and (max-width: 767px) {
  .title-style {
    width: 100%;
  }
  .product-description {
    width: 100%;

    .description-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 30px;

      .description-text {
        width: 516px;
      }
    }

  }
}

@media screen and (max-width: 575px) {
  .product-description {
    .description-container {
      margin: 0 16px;

      .description-text {
        width: 100%;
      }
    }

  }
}
</style>

<template>
  <div v-if="products.list.length > 0"
       class="product-gift-widgets row"
       :style="options.style"
       :class="options.className">
    <div class="gift-container">
      <p class="title-style">
        هدایا
      </p>
      <div class="gift-text">
        <span>این محصول شامل هدایای زیر میباشد: </span>
        <block-component class="block"
                         :options="getBlockOptions" />
      </div>
    </div>
  </div>
</template>

<script>
import { Block } from 'src/models/Block.js'
import { ProductList } from 'src/models/Product.js'
import { mixinPrefetchServerData } from 'src/mixin/Mixins.js'
import BlockComponent from 'src/components/Widgets/Block/Block.vue'

export default {
  name: 'ProductGifts',
  components: {
    BlockComponent
  },
  mixins: [mixinPrefetchServerData],
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      products: new ProductList()
    }
  },
  computed: {
    getBlockOptions () {
      return {
        block: new Block({
          title: '',
          products: this.products
        }),
        productItemOptions: {
          canAddToCart: false,
          showPrice: false
        }
      }
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
    prefetchServerDataPromise () {
      this.products.loading = true
      return this.getPriductCifts()
    },
    prefetchServerDataPromiseThen (data) {
      this.products = data
      this.products.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.products.loading = false
    },
    getPriductCifts () {
      if (this.options.products) {
        this.products = new ProductList(this.options.products)
        return new Promise((resolve) => {
          resolve(this.products)
        })
      } else if (this.options.productId || this.options.paramKey || this.$route.params.id) {
        this.loading = true
        return this.$apiGateway.product.gifts(this.productId)
      } else {
        this.products = new ProductList(this.options)
        return new Promise((resolve) => {
          resolve(this.products)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.product-gift-widgets {
  display: flex;
  justify-content: center;

  .gift-container {
    width: 1140px;
  }
}

.gift-text {
  margin-top: 20px;
  padding: 10px 20px;
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

</style>

<template>
  <div class="product-gift-widgets row"
       :style="options.style"
       :class="options.className">
    <div class="gift-container">
      <p class="title-style">
        هدایا
      </p>
      <q-card class="gift-text col-md-12 q-pa-md">
        <span>این محصول شامل هدایای زیر میباشد: </span>
        <div class="flex q-py-lg">
          <div v-for="(product, index) in products.list"
               :key="index"
               class="block-list-widget">
            <div class="img-box q-mx-lg">
              <router-link :to="{
                name: 'Public.Product.Show',
                params: { id: product.id ? product.id : -1 }
              }">
                <lazy-img :src="product.photo"
                          :alt="product.title"
                          width="1"
                          height="1"
                          class="img" />
                <div class="main-title ellipsis-2-lines">
                  {{ product.title }}
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ProductList } from 'src/models/Product'
import { APIGateway } from 'src/api/APIGateway'
import LazyImg from 'components/lazyImg.vue'

export default {
  name: 'ProductGifts',
  components: { LazyImg },
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
      products: new ProductList()
    }
  },
  mounted() {
    this.getProduct()
  },
  methods: {
    getProduct() {
      APIGateway.product.gifts({ productId: this.$route.params.id })
        .then(products => {
          this.products = new ProductList(products)
          console.log(this.products)
        })
        .catch(() => {
        })
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
  background-color: #FFFFFF;
  box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(54, 90, 145, 0.05);
  border-radius: 20px;
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

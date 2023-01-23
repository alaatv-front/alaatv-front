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
      </q-card>
    </div>
  </div>
</template>

<script>
import { Product } from 'src/models/Product'
import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'ProductGifts',
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
  mounted() {
    this.getProduct()
  },
  methods: {
    getProduct() {
      APIGateway.product.show({
        data: { id: this.options.productId },
        cache: { TTL: 10000 }
      })
        .then(product => {
          this.product = new Product(product)
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

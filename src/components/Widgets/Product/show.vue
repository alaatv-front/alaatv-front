<template>
  <product-introduction :data="introductionData"/>
  <product-demos />
  <product-review />
</template>

<script>
import productIntroduction from 'components/Widgets/Product/productIntroduction'
import productDemos from 'components/Widgets/Product/productDemos'
import productReview from 'components/Widgets/Product/productReview'
import { Product } from 'src/models/Product.js'
import { mixinWidget } from 'src/mixin/Mixins'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'show',
  components: { productIntroduction, productDemos, productReview },
  mixins:[mixinWidget],
  props: {
    data: {
      type: [String, Number ,Object , Product],
      default: new Product()
    }
  },
  data () {
    return {
      product: new Product(),
      introduction: {
        intro: null,
        attributes: null,
        price: null
      },
      mitra: 'gfg'
    }
  },
  created () {
    this.loadProduct()
  },

  computed: {
    givenData () {
      return this.product
    },
    introductionData () {
      return this.introduction
    }
  },

  watch: {
    'product.intro':{
      handler (newValue){
        this.introduction.intro = newValue
      }
    },
    'product.attributes': {
      handler (newValue){
        this.introduction.attributes = newValue
      }
    },
    'product.price': {
      handler (newValue){
        this.introduction.price = newValue
      }
    }
  },

  methods: {
    async loadProduct () {
      if (typeof this.data === 'object') {
        this.product = new Product(this.data)
      } else if (typeof this.data === 'number' || typeof this.data === 'string') {
        this.product.id = this.data
        await this.getProduct()
      }
    },

    getProduct () {
      this.product.loading = true
      const url = API_ADDRESS.product.show.base + '/' + this.product.id
      let promise = null
      if (typeof this.options.getData === 'function') {
        promise = this.options.getData(url)
      } else {
        promise = this.$axios.get(url)
      }

      promise
        .then(response => {
          this.product = new Product(response.data.data)
          this.product.loading = false
        })
        .catch((error) => {
          console.log(error)
          this.product.loading = false
        })
    }
  }
}
</script>

<style scoped>

</style>

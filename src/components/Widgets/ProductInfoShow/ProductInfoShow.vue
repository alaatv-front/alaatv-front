<template>
  <div class="show-product-introduction">
    <product-introduction :data="introductionData" />
  </div>
  <div class="show-product-demos">
    <product-demos :data="demo" />
  </div>
  <div class="show-product-review">
    <product-review :data="review" />
  </div>
</template>

<script>
import productIntroduction from 'components/Widgets/ProductInfoShow/productIntroduction'
import productDemos from 'components/Widgets/ProductInfoShow/productDemos'
import productReview from 'components/Widgets/ProductInfoShow/productReview'
import { Product } from 'src/models/Product.js'
import { mixinWidget } from 'src/mixin/Mixins'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'ProductInfoShow',
  components: { productIntroduction, productDemos, productReview },
  mixins: [mixinWidget],
  props: {
    data: {
      type: [String, Number, Object, Product],
      default: new Product()
    },
    getData: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      product: new Product(),
      introduction: {
        intro: null,
        attributes: null,
        price: null,
        has_instalment_option: false
      },
      demo: {
        contents: [],
        sample_photos: []
      },
      review: {
        long: '',
        short: '',
        slogan: ''
      }
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
    'product.intro': {
      handler (newValue) {
        this.introduction.intro = newValue
        // this.demo.contents = this.test
        // this.demo.sample_photos = this.test1
      }
    },
    'product.attributes': {
      handler (newValue) {
        this.introduction.attributes = newValue
      }
    },
    'product.price': {
      handler (newValue) {
        this.introduction.price = newValue
      }
    },
    'product.has_instalment_option': {
      handler (newValue) {
        this.introduction.has_instalment_option = newValue
      }
    },
    'product.blocks': {
      handler (newValue) {
        if (newValue && newValue.length > 0) {
          this.demo.blocks = newValue[0].contents
        }
      }
    },
    'product.sample_photos': {
      handler (newValue) {
        this.demo.sample_photos = newValue
      }
    },
    'product.description': {
      handler (newValue) {
        this.review = newValue
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
      const promise = this.getData(url)
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
.show-product-introduction {
  margin-bottom: 30px;

}

.show-product-demos {
  margin-bottom: 30px;
}

.show-product-review {
  margin-bottom: 100px;

}

</style>

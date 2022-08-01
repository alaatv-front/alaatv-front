<template>
  <div class="show-product-introduction">
    <product-introduction :data="introductionData"/>
  </div>
  <div class="show-product-demos">
    <product-demos :data="demo"/>
  </div>
  <div class="show-product-review">
    <product-review :data="review"/>
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
  mixins:[mixinWidget],
  props: {
    data: {
      type: [String, Number ,Object , Product],
      default: new Product()
    }
  },
  data () {
    return {
      test: [
          {
            'id': 29095,
            'redirect_url': null,
            'type': 8,
            'section': null,
            'title': 'درسنامه پیله، فرق 3 زمان حال',
            'duration': 1568,
            'photo': 'https://nodes.alaatv.com/media/thumbnails/1240/1128003byby.jpg',
            'is_free': 1,
            'order': 1,
            'updated_at': '2021-11-20 14:44:25',
            'url': {
              'web': 'https://alaatv.com/c/29095',
              'api': 'https://alaatv.com/api/v2/c/29095'
            },
            'redirect_code': null
          },
          {
            'id': 29636,
            'redirect_url': null,
            'type': 8,
            'section': null,
            'title': 'درسنامه فرسنگ اول، لغات',
            'duration': 1773,
            'photo': 'https://nodes.alaatv.com/media/thumbnails/1240/1156001lolo.jpg',
            'is_free': 1,
            'order': 2,
            'updated_at': '2021-11-20 14:44:35',
            'url': {
              'web': 'https://alaatv.com/c/29636',
              'api': 'https://alaatv.com/api/v2/c/29636'
            },
            'redirect_code': null
          },
          {
            'id': 31023,
            'redirect_url': null,
            'type': 8,
            'section': null,
            'title': 'درسنامه فرسنگ سوم',
            'duration': 1403,
            'photo': 'https://nodes.alaatv.com/media/thumbnails/1240/1158001tdss.jpg',
            'is_free': 1,
            'order': 3,
            'updated_at': '2021-11-20 14:45:00',
            'url': {
              'web': 'https://alaatv.com/c/31023',
              'api': 'https://alaatv.com/api/v2/c/31023'
            },
            'redirect_code': null
          },
          {
            'id': 31164,
            'redirect_url': null,
            'type': 8,
            'section': null,
            'title': 'پس آزمون فرسنگ اول',
            'duration': 1918,
            'photo': 'https://nodes.alaatv.com/media/thumbnails/1240/1172001jojo.jpg',
            'is_free': 1,
            'order': 4,
            'updated_at': '2021-11-20 14:45:03',
            'url': {
              'web': 'https://alaatv.com/c/31164',
              'api': 'https://alaatv.com/api/v2/c/31164'
            },
            'redirect_code': null
          }
        ],
      test1: [
        {
          'id': 2635,
          'title': null,
          'photo': 'https://nodes.alaatv.com/upload/images/product/1_20211123092114.jpg'
        },
        {
          'id': 2631,
          'title': null,
          'photo': 'https://nodes.alaatv.com/upload/images/product/2_20211123092112.jpg'
        },
        {
          'id': 2636,
          'title': null,
          'photo': 'https://nodes.alaatv.com/upload/images/product/3_20211123092114.jpg'
        },
        {
          'id': 2633,
          'title': null,
          'photo': 'https://nodes.alaatv.com/upload/images/product/4_20211123092110.jpg'
        },
        {
          'id': 2629,
          'title': null,
          'photo': 'https://nodes.alaatv.com/upload/images/product/5_20211123092111.jpg'
        },
        {
          'id': 2632,
          'title': null,
          'photo': 'https://nodes.alaatv.com/upload/images/product/6_20211123092113.jpg'
        },
        {
          'id': 2628,
          'title': null,
          'photo': 'https://nodes.alaatv.com/upload/images/product/7_20211123092110.jpg'
        },
        {
          'id': 2630,
          'title': null,
          'photo': 'https://nodes.alaatv.com/upload/images/product/8_20211123092111.jpg'
        },
        {
          'id': 2634,
          'title': null,
          'photo': 'https://nodes.alaatv.com/upload/images/product/9_20211123092112.jpg'
        },
        {
          'id': 2627,
          'title': null,
          'photo': 'https://nodes.alaatv.com/upload/images/product/10_20211123092059.jpg'
        },
        {
          'id': 2625,
          'title': null,
          'photo': 'https://nodes.alaatv.com/upload/images/product/11_20211123092055.jpg'
        }
      ],

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
        slogan: '',
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
    'product.intro':{
      handler (newValue){
        this.introduction.intro = newValue
        // this.demo.contents = this.test
        // this.demo.sample_photos = this.test1
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
    },
    'product.has_instalment_option': {
      handler (newValue){
        this.introduction.has_instalment_option = newValue
      }
    },
    'product.blocks': {
      handler (newValue){
        if(newValue && newValue.length > 0) {
          this.demo.blocks = newValue[0].contents
        }
      }
    },
    'product.sample_photos': {
      handler (newValue){
        this.demo.sample_photos = newValue
      }
    },
    'product.description': {
      handler (newValue){
        this.review = newValue
      }
    },
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

<template>
  <div v-if="product.intro"
       class="intro-video col-md-6 col-12"
       :class="options.className"
       :style="options.style">
    <video-player :poster="product.intro.photo"
                  :sources="videoSource()" />
    <div v-if="options.download_date"
         class="q-mt-md q-ml-md">
      <q-icon name="info"
              color="primary"
              size="25px"
              class="q-pr-sm" />
      <span>
        زمان دریافت فایل های این محصول: {{ product.attributes.info.download_date[0] }}
      </span>
    </div>
    <div v-if="product.attributes.info.duration.length > 0 && options.duration"
         class="q-mt-md q-ml-md">
      <q-icon name="timer"
              color="primary"
              size="25px"
              class="q-pr-sm" />
      <span>
        مدت زمان: {{ product.attributes.info.duration[0] }}
      </span>
    </div>
  </div>
</template>

<script>
import { Product } from 'src/models/Product.js'
import { APIGateway } from 'src/api/APIGateway.js'
import VideoPlayer from 'components/VideoPlayer.vue'
import { PlayerSourceList } from 'src/models/PlayerSource.js'

export default {
  name: 'ProductIntroduction',
  components: { VideoPlayer },
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
  watch: {
    options: {
      handler() {
        this.getProduct()
      },
      deep: true
    }
  },
  created() {
    this.getProduct()
  },
  methods: {
    videoSource() {
      return new PlayerSourceList([{ link: this.product.intro.video }])
    },
    getProduct() {
      this.product.loading = true
      APIGateway.product.show({ data: { id: this.options.productId }, cache: { TTL: 10000 } })
        .then(product => {
          this.product = new Product(product)
          this.product.loading = false
          this.setInformation()
        })
        .catch(() => {
          this.product.loading = false
        })
    }
  }
}
</script>

<style scoped>

</style>

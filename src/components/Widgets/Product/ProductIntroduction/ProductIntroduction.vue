<template>
  <q-card class="intro-video custom-card q-pb-md"
          :class="options.className"
          :style="options.style">
    <template v-if="!product.loading">
      <video-player v-if="product.intro"
                    :poster="product.intro.photo"
                    :source="videoSource()" />
      <div v-if="options.download_date"
           class="q-mt-md q-ml-md">
        <q-icon name="info"
                color="primary"
                size="25px"
                class="q-pr-sm" />
        <span>
          زمان دریافت فایل های این محصول: {{ product.attributes?.info.download_date[0] }}
        </span>
      </div>
      <div v-if="product.attributes?.info.duration.length > 0 && options.duration"
           class="q-mt-md q-ml-md">
        <q-icon name="timer"
                color="primary"
                size="25px"
                class="q-pr-sm" />
        <span>
          مدت زمان: {{ product.attributes?.info.duration[0] }}
        </span>
      </div>
    </template>
    <q-skeleton v-else
                height="250px"
                square />
  </q-card>
</template>

<script>
import { Product } from 'src/models/Product.js'
import { APIGateway } from 'src/api/APIGateway.js'
import VideoPlayer from 'src/components/VideoPlayer.vue'
import { PlayerSourceList } from 'src/models/PlayerSource.js'
import { mixinPrefetchServerData } from 'src/mixin/Mixins.js'

export default {
  name: 'ProductIntroduction',
  components: { VideoPlayer },
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
      product: new Product()
    }
  },
  computed: {
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
  watch: {
    options: {
      handler() {
        this.getProduct()
      },
      deep: true
    }
  },
  methods: {
    prefetchServerDataPromise () {
      this.product.loading = true
      return this.getProduct()
    },
    prefetchServerDataPromiseThen (data) {
      this.product = data
      this.product.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.product.loading = false
    },

    videoSource() {
      return new PlayerSourceList([{
        default: true,
        res: 1024,
        type: 'video/mp4',
        src: this.product.intro.video,
        label: 'کیفیت عالی'
      }])
    },
    getProduct() {
      return APIGateway.product.show(this.productId)
    }
  }
}
</script>

<style scoped>

</style>

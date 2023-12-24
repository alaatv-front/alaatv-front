<template>
  <div class="row product-demos-widget"
       :class="options.className"
       :style="options.style">
    <div v-if="contents.list && contents.list.length > 0"
         class="demos-container col-md-12 q-mt-md">
      <div ref="contentScroll"
           v-dragscroll
           class="contents-block">
        <div v-for="content in contents.list"
             :key="content.id">
          <content-item class="q-mr-md"
                        :options="{content,contentLinkTarget: '_blank'}" />
        </div>
        <div v-for="(pamphlet, index) in pamphlets"
             :key="pamphlet.id"
             class="pamphlet-image">
          <q-img :ref="el => { thumbRef[index] = el }"
                 :src="pamphlet.photo"
                 :class="index === indexZoomed ? 'fixed-top q-mt-md q-mx-auto z-top' : void 0"
                 :style="index === indexZoomed ? 'width: 650px; max-width: 100vw' : void 0"
                 spinner-color="primary"
                 spinner-size="82px"
                 @click="zoomImage(index)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dragscroll } from 'vue-dragscroll'
import { Product } from 'src/models/Product.js'
import { mixinPrefetchServerData, mixinWidget } from 'src/mixin/Mixins.js'
import { ContentList } from 'src/models/Content.js'
import ContentItem from 'components/Widgets/ContentItem/ContentItem.vue'
import { morph } from 'quasar'

export default {
  name: 'productDemos',
  components: {
    ContentItem
  },
  directives: {
    dragscroll
  },
  mixins: [mixinWidget, mixinPrefetchServerData],
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
      contents: new ContentList(),
      toggler: false,
      product: new Product(),
      indexZoomed: null,
      thumbRef: []
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
    },
    pamphlets () {
      if (this.product.sample_photos) {
        return this.product.sample_photos
      } else {
        return []
      }
    }
  },
  methods: {
    scrollToRight () {
      this.$refs.contentScroll.scrollLeft += 200
    },
    scrollToLeft () {
      this.$refs.contentScroll.scrollLeft -= 200
    },
    prefetchServerDataPromise () {
      this.product.loading = true
      return this.getProduct()
    },
    prefetchServerDataPromiseThen (data) {
      this.product = data
      this.getSampleContents()
      this.product.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.product.loading = false
    },
    getProduct () {
      if (this.options.product) {
        return new Promise(resolve => {
          resolve(new Product(this.options.product))
        })
      } else if (!this.productId) {
        return new Promise((resolve) => {
          resolve()
        })
      }
      this.product.loading = true
      return this.$apiGateway.product.show(this.productId)
    },
    getSampleContents () {
      if (this.options.contents) {
        this.contents = this.options.contents
      } else {
        return this.$apiGateway.product.sampleContent(this.productId)
          .then(contentList => {
            this.contents = contentList
          })
          .catch(() => {

          })
      }
    },
    zoomImage (index) {
      const indexZoomedState = this.indexZoomed
      let cancel = void 0

      this.indexZoomed = void 0

      if (index !== void 0 && index !== indexZoomedState) {
        cancel = morph({
          from: this.thumbRef[index].$el,
          onToggle: () => {
            this.indexZoomed = index
          },
          duration: 500,
          onEnd: end => {
            if (end === 'from' && this.indexZoomed === index) {
              this.indexZoomed = void 0
            }
          }
        })
      }

      if (
        indexZoomedState !== void 0 &&
        (cancel === void 0 || cancel() === false)
      ) {
        morph({
          from: this.thumbRef[indexZoomedState].$el,
          waitFor: 100,
          duration: 300
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.product-demos-widget {
  display: flex;
  justify-content: center;

  .demos-container {
    width: 1140px;
    max-width: 100%;
  }

  .section-title {
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
      margin-right: 4px;
    }

  }

  .contents-block {
    display: flex;
    overflow: auto;
    padding: 10px 0 0;

    .pamphlet-image {
      min-width: 157px;
      height: 223px;
      background-color: #F2F2F2;
      color: #fdeded;
      box-shadow: -2px -4px 10px rgb(255 255 255 / 60%), 2px 4px 10px rgb(54 90 145 / 5%);
      border-radius: 16px;
      margin: 10px 8px 19px;
      cursor: pointer;

      &:deep(.q-img__image) {
        border-radius: 10px;
      }
    }
  }
}
</style>

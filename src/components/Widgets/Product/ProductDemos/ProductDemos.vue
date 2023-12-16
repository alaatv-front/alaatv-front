<template>
  <div class="row product-demos-widget"
       :class="options.className"
       :style="options.style">
    <div v-if="contents.list && contents.list.length > 0"
         class="demos-container col-md-12">
      <div ref="contentScroll"
           v-dragscroll
           class="contents-block">
        <router-link v-for="content in contents.list"
                     :key="content.id"
                     :to="{name: 'Public.Content.Show', params: {id: content.id}}"
                     class="content-img-box">
          <lazy-img :src="content.photo"
                    :alt="content.title"
                    class="img" />
          <div class="play-btn">
            <svg width="40"
                 height="40"
                 viewBox="0 0 40 40"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_4020_4117)">
                <path d="M39.25 20.0096C39.25 30.6129 30.6093 39.25 20 39.25C9.39071 39.25 0.75 30.6129 0.75 20.0096C0.75 9.38659 9.39118 0.75 20 0.75C30.6088 0.75 39.25 9.38659 39.25 20.0096Z"
                      fill="#303030"
                      fill-opacity="0.8"
                      stroke="white"
                      stroke-width="1.5" />
                <path d="M26 19.9999C26.0004 20.1697 25.9569 20.3367 25.8736 20.4847C25.7904 20.6326 25.6703 20.7565 25.525 20.8443L16.52 26.3531C16.3682 26.446 16.1943 26.4968 16.0163 26.5001C15.8383 26.5034 15.6627 26.4591 15.5075 26.3718C15.3538 26.2859 15.2258 26.1606 15.1366 26.0088C15.0474 25.857 15.0003 25.6841 15 25.5081V14.4918C15.0003 14.3157 15.0474 14.1429 15.1366 13.9911C15.2258 13.8393 15.3538 13.714 15.5075 13.6281C15.6627 13.5408 15.8383 13.4965 16.0163 13.4998C16.1943 13.5031 16.3682 13.5539 16.52 13.6468L25.525 19.1556C25.6703 19.2434 25.7904 19.3673 25.8736 19.5152C25.9569 19.6632 26.0004 19.8302 26 19.9999Z"
                      fill="white" />
              </g>
              <defs>
                <clipPath id="clip0_4020_4117">
                  <rect width="40"
                        height="40"
                        fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div class="content-title ellipsis">
            {{ content.title }}
          </div>

        </router-link>
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
          <div class="pamphlet-title ellipsis">
            {{ pamphlet?.title }}
          </div>
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
import LazyImg from 'components/lazyImg.vue'
import { morph } from 'quasar'

export default {
  name: 'productDemos',
  components: {
    LazyImg
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
    padding-right: 24px;
    min-height: 193px;
    gap: 20px;
    overflow-x: auto;

    .content-img-box {
      position: relative;
      width: 248px;
      height: 140px;

      :deep(.img) {
        width: 248px;
        border-radius: $radius-3;
      }

      .play-btn {
        position: absolute;
        top: 50px;
        left: 104px;
      }

      .content-title {
        @include body2;
        color: $grey-9;
        margin-top: $space-2;
        max-width: 100%;
      }
    }

    .pamphlet-image {
      min-width: 100px;
      height: 140px;
      background-color: #F2F2F2;
      color: #fdeded;
      box-shadow: -2px -4px 10px rgb(255 255 255 / 60%), 2px 4px 10px rgb(54 90 145 / 5%);
      border-radius: $radius-3;
      cursor: pointer;

      &:deep(.q-img__image) {
        border-radius: $radius-3;
      }

      .pamphlet-title {
        @include body2;
        color: $grey-9;
        margin-top: $space-2;
        max-width: 100%;
      }
    }
  }
}
</style>

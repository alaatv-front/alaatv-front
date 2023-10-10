<template>
  <div class="product-page-container new-theme"
       :class="{ 'hasInstallment': hasInstallment }">
    <div class="product-background">
      <div class="background-image"
           :style="{backgroundImage: `url(${product.photo})`}">
        <div class="background-filter" />
      </div>
      <div class="row product-info-row q-col-gutter-lg">
        <div class="col-12 col-md-8">
          <div class="product-info-wrapper">
            <div class="product-info-header">
              <div class="product-title ellipsis">
                {{ product.title }}
              </div>
              <div class="header-action">
                <bookmark :is-favored="product.is_favored"
                          :rounded="false"
                          :color="'white'"
                          :className="'header-action-btn'"
                          :favoredIcon="'bookmark'"
                          :unFavoredIcon="'bookmark_border'"
                          :loading="bookmarkLoading"
                          @clicked="handleProductBookmark" />
                <q-btn icon="share"
                       text-color="black"
                       color="white"
                       class="header-action-btn">
                  <q-tooltip anchor="top middle"
                             self="bottom middle"
                             :offset="[10, 10]">
                    اشتراک گزاری
                  </q-tooltip>
                  <q-popup-proxy :offset="[10, 10]"
                                 transition-show="flip-up"
                                 transition-hide="flip-down">
                    <q-banner dense
                              rounded>
                      <share-network :url="pageUrl"
                                     @on-select="shareGiftCard" />
                    </q-banner>
                  </q-popup-proxy>
                </q-btn>
              </div>
            </div>
            <q-separator size="3px"
                         dark />
            <div class="description-expansion-wrapper">
              <div class="description-expansion">
                <div class="product-short-description">
                  <div class="short-description-title">
                    <div class="short-description-title__text">معرفی دوره</div>
                    <div class="short-description-title__action">
                      <bookmark :is-favored="product.is_favored"
                                :rounded="false"
                                :color="'white'"
                                :className="'header-action-btn'"
                                :favoredIcon="'bookmark'"
                                :unFavoredIcon="'bookmark_border'"
                                :loading="bookmarkLoading"
                                @clicked="handleProductBookmark" />
                      <q-btn icon="share"
                             text-color="black"
                             color="white"
                             class="header-action-btn">
                        <q-tooltip anchor="top middle"
                                   self="bottom middle"
                                   :offset="[10, 10]">
                          اشتراک گزاری
                        </q-tooltip>
                        <q-popup-proxy :offset="[10, 10]"
                                       transition-show="flip-up"
                                       transition-hide="flip-down">
                          <q-banner dense
                                    rounded>
                            <share-network :url="pageUrl"
                                           @on-select="shareGiftCard" />
                          </q-banner>
                        </q-popup-proxy>
                      </q-btn>
                    </div>
                  </div>
                  <div ref="shortDescription"
                       class="short-description-text"
                       :class="{'auto-height': expanded}"
                       v-html="product.description?.short" />
                </div>
              </div>
            </div>
            <div class="product-info-footer">
              <div class="info-footer-action">
                <q-btn v-if="showMore"
                       class="footer-action-btn"
                       flat
                       :icon-right="expanded ? 'expand_less' : 'expand_more'"
                       :label="expanded ? 'توضیحات کمتر' : 'توضیحات بیشتر'"
                       @click="toggleExpanded" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4 space-col" />
      </div>
    </div>
    <div class="product-page-content-container">
      <div class="row content-row q-col-gutter-lg">
        <div class="col-12 col-md-8">
          <div class="product-info-tab-wrapper">
            <product-info-tab v-if="!loading"
                              :options="{product}" />
          </div>
        </div>
        <div class="col-12 col-md-4 intro-box-col">
          <product-intro-box v-if="!loading"
                             ref="productIntroBox"
                             :options="{product}"
                             @update-product="onUpdateProduct($event)"
                             @update-product-loading="updateProductLoading($event)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, nextTick } from 'vue'
import { Product } from 'src/models/Product.js'
import Bookmark from 'src/components/Bookmark.vue'
import { APIGateway } from 'src/api/APIGateway.js'
import ShareNetwork from 'src/components/ShareNetwork.vue'
import { mixinWidget, mixinPrefetchServerData } from 'src/mixin/Mixins.js'
import ProductInfoTab from 'src/components/Widgets/Product/ProductInfoTab/ProductInfoTab.vue'
import ProductIntroBox from 'src/components/Widgets/Product/ProductIntroBox/ProductIntroBox.vue'

let StickySidebar
if (typeof window !== 'undefined') {
  import('sticky-sidebar-v2')
    .then((stickySidebar) => {
      StickySidebar = stickySidebar.default
    })
}
export default defineComponent({
  name: 'ProductPage',
  components: {
    ProductIntroBox,
    ProductInfoTab,
    Bookmark,
    ShareNetwork
  },
  mixins: [mixinWidget, mixinPrefetchServerData],
  data() {
    return {
      defaultOptions: {
        productId: null,
        urlParam: null
      },
      stickySidebar: null,
      product: new Product(),
      loading: false,
      expanded: false,
      bookmarkLoading: false,
      showMore: false
    }
  },
  computed: {
    productId () {
      if (typeof this.localOptions.productId !== 'undefined' && this.localOptions.productId !== null) {
        return this.localOptions.productId
      }
      if (this.localOptions.urlParam && this.$route.params[this.localOptions.urlParam]) {
        return this.$route.params[this.localOptions.urlParam]
      }
      if (this.$route.params.id) {
        return this.$route.params.id
      }
      return this.product.id
    },
    hasInstallment () {
      if (this.product) {
        return this.product.has_instalment_option
      }
      return false
    }
  },
  mounted() {
    this.calculateDescriptionHight()
  },
  methods: {
    getProductRequest() {
      if (!this.productId) {
        return new Promise((resolve, reject) => {
          reject()
        })
      }

      return APIGateway.product.show(this.productId)
    },
    prefetchServerDataPromise () {
      this.loading = true
      return this.getProductRequest()
    },
    prefetchServerDataPromiseThen (product) {
      this.product = product
      this.loading = false
      nextTick(() => {
        this.calculateDescriptionHight()
      })
    },
    prefetchServerDataPromiseCatch () {
      this.loading = false
    },
    handleProductBookmark () {
      this.bookmarkLoading = true
      if (this.product.is_favored) {
        this.$apiGateway.product.unfavored(this.product.id)
          .then(() => {
            this.product.is_favored = !this.product.is_favored
            this.bookmarkLoading = false
          })
          .catch(() => {
            this.bookmarkLoading = false
          })
        return
      }
      this.$apiGateway.product.favored(this.product.id)
        .then(() => {
          this.product.is_favored = !this.product.is_favored
          this.bookmarkLoading = false
        })
        .catch(() => {
          this.bookmarkLoading = false
        })
    },
    shareGiftCard({ name, url }) {
      window.open(url, '_blank')
    },
    toggleExpanded() {
      this.expanded = !this.expanded
    },
    calculateDescriptionHight() {
      let totalHeight = 0
      if (this.$refs && this.$refs.shortDescription && this.$refs.shortDescription.children) {
        for (let index = 0; index < this.$refs.shortDescription.children.length; index++) {
          const element = this.$refs.shortDescription.children[index]
          totalHeight += element.clientHeight
        }
      }
      const minHeight = this.$q.screen.lt.sm ? 300 : 450

      if (totalHeight > minHeight) {
        this.showMore = true
      } else {
        this.showMore = false
      }
    },
    onUpdateProduct(product) {
      this.product = product
    },
    updateProductLoading(loading) {
      this.product.loading = loading
    },
    loadSticky () {
      // console.log('this.$refs.CartInvoice.parentElement', this.$refs.CartInvoice.parentElement.clientHeight)
      const widgetParent = this.$refs.productIntroBox.parentElement
      widgetParent.style.height = '100%'
      // const parent = this.$refs.CartInvoice.parentElement.parentElement
      // const parentClientHeight = parent.clientHeight
      // this.$refs.CartInvoice.style.height = parentClientHeight + 'px'

      this.stickySidebarInstance = new StickySidebar(this.$refs.productIntroBox, {
        topSpacing: 142,
        // bottomSpacing: 20,
        containerSelector: false,
        // containerSelector: '.cart-invoice.main-content',
        innerWrapperSelector: '.product-intro-wrapper'
        // scrollContainer: '#main-viewport'
      })

      // this.stickySidebar = new StickySidebar(this.$refs.CartInvoiceContainer, {
      //   topSpacing: 20,
      //   bottomSpacing: 20,
      //   containerSelector: '.cart-invoice',
      //   innerWrapperSelector: '.invoice-container',
      //   scrollContainer: '.page-builder'
      // })
    }
  }
})
</script>

<style lang="scss" scoped>
.product-page-container {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .product-background {
    position: relative;
    min-height: 450px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    max-width: 100%;
    width: 100%;
    height: auto;
    overflow: hidden;
    .background-image {
      position: absolute;
      top: -50px;
      left: -50px;
      right: -50px;
      bottom: -50px;
      width: calc( 100% + 100px);
      height: calc( 100% + 100px);
      filter: blur(10px);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;

      .background-filter {
        width: 100%;
        height: 100%;
        background: linear-gradient(270deg,  rgba(0, 0, 0, 0.15)0%, rgba(0, 0, 0, 0.60) 47.60%, rgba(0, 0, 0, 0.95) 100%), lightgray 0px 0px / 100% 100% no-repeat;
        mix-blend-mode: multiply;
      }
    }

    .product-info-row {
      width: 1362px;
      max-width: 100%;

      @media screen and (max-width: 1024px){
        .space-col {
          display: none;
        }
      }

      @media screen and (max-width: 600px){
        width: 100%;
      }
    }

    .product-info-wrapper {
      position: relative;
      min-height: 450px;
      max-width: 100%;
      height: auto;
      margin: 70px 0;

      @media screen and (max-width: 1024px){
        padding: 0 30px;
        min-height: 400px;
        margin: 10px 0;
      }

      @media screen and (max-width: 600px){
        padding: 0 20px;
      }

      .product-info-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        .product-title {
          color:#FFF;
          font-size: 22px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: -0.66px;

          @media screen and (max-width: 1024px){
            max-width: 100%;
            font-size: 20px;
            letter-spacing: -0.6px;
          }
        }

        .header-action {
          display: flex;
          justify-content: center;
          align-items: center;

          @media screen and (max-width: 600px){
            display: none;
          }

          .header-action-btn {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            background:#FFF;

            &:not(:last-child) {
              margin-right: 12px;
            }
          }
        }
      }

      .product-info-footer {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        @media screen and (max-width: 1024px){
          flex-direction: column;
          align-items: center;
          width: auto;
        }

        .product-expiration {
          .expiration-title {
            color:#FFF;
            font-size: 16px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            letter-spacing: -0.48px;
            margin-top: 8px;
          }
          .expiration-text {
            color:#FFF;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            letter-spacing: -0.48px;
          }
        }

        .info-footer-action {
          @media screen and (max-width: 1024px){
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
          }

          .footer-action-btn {
            color: #FFFFFF;
            background: transparent;

            @media screen and (max-width: 600px){
              padding: 0;
            }
          }
        }
      }
    }

    .description-expansion-wrapper {
      width: 1200px;
      max-width: 100%;

      @media screen and (max-width: 600px){
        width: 100%;
      }

      .description-expansion {
        width: 800px;
        max-width: 100%;
        margin-top: 10px;

        @media screen and (max-width: 600px){
          width: 100%;
        }

        .product-short-description {
          .short-description-title {
            margin-top: 15px;

            &__text {
              color:#FFF;
              font-size: 16px;
              font-style: normal;
              font-weight: 700;
              line-height: normal;
              letter-spacing: -0.48px;
            }

            &__action {
              display: none;
              justify-content: center;
              align-items: center;

              .header-action-btn {
                width: 40px;
                height: 40px;
                border-radius: 8px;
                background:#FFF;

                &:not(:last-child) {
                  margin-right: 12px;
                }
              }

              @media screen and (max-width: 600px){
                display: flex;
              }
            }

            @media screen and (max-width: 600px){
             display: flex;
             justify-content: space-between;
             align-items: center;
            }

          }

          .short-description-text {
            height: 300px;
            overflow-y: hidden;
            transition: all .3s ease-in-out;
            color:#FFF;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            letter-spacing: -0.48px;
            text-align: justify;
            margin-top: 8px;

            @media screen and (max-width: 600px){
              height: 300px;
            }

            &.auto-height {
              height: auto;
              min-height: 300px;
              transition: all .3s ease-in-out;

              @media screen and (max-width: 600px){
                min-height: 110px;
              }
            }
          }
        }
      }
    }

    .product-pic {
      height: 550px;
      background: linear-gradient(270deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.60) 52.60%, rgba(0, 0, 0, 0.15) 100%), lightgray 0px 0px / 100% 100% no-repeat;
      filter: blur(10px);
    }
  }

  .product-page-content-container {
    width: 1362px;
    max-width: 100%;
    position: relative;
    margin: 30px 0;

    .content-row {

      @media screen and (max-width: 1024px) {
        flex-wrap: wrap-reverse;
      }
    }

    .product-info-tab-wrapper {
      max-width: 100%;

      @media screen and (max-width: 1024px) {
        width: 90%;
        margin: 0 20px;
      }

      &:deep(.q-tab-panels) {
        border-radius: 20px;
      }
    }
    .intro-box-col {
      margin-top: -550px;

      @media screen and (max-width: 1024px) {
        margin-top: 0;
      }
    }
  }

  &.hasInstallment {
    .product-page-content-container {
      margin-bottom: 250px;
    }
  }
}
</style>

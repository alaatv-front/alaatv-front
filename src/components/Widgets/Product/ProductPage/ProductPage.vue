<template>
  <div class="product-page-container new-theme">
    <div class="product-background">
      <div class="background-image"
           :style="{backgroundImage: `url(${product.photo})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', filter: 'blur(10px)'}" />
      <div class="row product-info-row">
        <div class="col-12 col-md-8">
          <div class="product-info-wrapper">
            <div class="product-info-header">
              <div class="product-title">
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
                    معرفی دوره
                  </div>
                  <div class="short-description-text"
                       :class="{'auto-height': expanded, 'ellipsis-3-lines': !expanded}"
                       v-html="product.description?.short" />
                </div>
              </div>
            </div>
            <div class="product-info-footer">
              <div class="info-footer-action">
                <q-btn color="white"
                       class="footer-action-btn"
                       flat
                       :icon-right="expanded ? 'expand_less' : 'expand_more'"
                       :label="expanded ? 'توضیحات کمتر' : 'توضیحات بیشتر'"
                       @click="toggleExpanded" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4" />
      </div>
    </div>
    <div class="product-page-content-container">
      <div class="row content-row q-col-gutter-md">
        <div class="col-12 col-md-8">
          <div class="product-info-tab-wrapper">
            <product-info-tab :options="{product}" />
          </div>
        </div>
        <div class="col-12 col-md-4 intro-box-col">
          <product-intro-box :options="{product}" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Product } from 'src/models/Product.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import ProductInfoTab from 'src/components/Widgets/Product/ProductInfoTab/ProductInfoTab.vue'
import ProductIntroBox from 'src/components/Widgets/Product/ProductIntroBox/ProductIntroBox.vue'
import Bookmark from 'src/components/Bookmark.vue'
import ShareNetwork from 'src/components/ShareNetwork.vue'
export default defineComponent({
  name: 'ProductPage',
  components: {
    ProductIntroBox,
    ProductInfoTab,
    Bookmark,
    ShareNetwork
  },
  mixins: [mixinWidget],
  data() {
    return {
      defaultOptions: {
        productId: null,
        urlParam: null
      },
      product: new Product(),
      loading: false,
      expanded: false,
      bookmarkLoading: false
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
    }
  },
  mounted() {
    this.getProduct()
  },
  methods: {
    getProduct() {
      this.loading = true
      this.$apiGateway.product.show(this.productId)
        .then(product => {
          this.product = product
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
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
    min-height: 200px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    max-width: 100%;
    width: 100%;
    height: auto;
    .background-image {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
    }

    .product-info-row {
      width: 1200px;
      max-width: 100%;

      @media screen and (max-width: 600px){
        width: 100%;
      }
    }

    .product-info-wrapper {
      position: relative;
      min-height: 200px;
      max-width: 100%;
      height: auto;
      margin: 70px 0;

      @media screen and (max-width: 1024px){
        padding: 0 30px;
        min-height: 400px;
        margin: 10px 0;
      }

      .product-info-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;
        .product-title {
          color:#FFF;
          font-size: 22px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: -0.66px;
        }

        .header-action {
          display: flex;
          justify-content: center;
          align-items: center;

          .header-action-btn {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            background:#FFF;

            &:not(:last-child) {
              margin-right: 5px;
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
          @media screen and (max-width: 600px){
            width: 100%;
          }

          .footer-action-btn {
            width: 100%;

            @media screen and (max-width: 600px){
              margin-top: 50px;
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
            color:#FFF;
            font-size: 16px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            letter-spacing: -0.48px;
            margin-top: 15px;
          }

          .short-description-text {
            height: 100px;
            overflow-y: hidden;
            transition: all 3s ease-in-out;
            color:#FFF;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            letter-spacing: -0.48px;
            text-align: justify;

            @media screen and (max-width: 600px){
              height: 110px;
            }

            &.auto-height {
              height: auto;
              min-height: 100px;
              transition: all 3s ease-in-out;

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
      background: linear-gradient(270deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.60) 52.60%, rgba(0, 0, 0, 0.15) 100%), url(<path-to-image>), lightgray 0px 0px / 100% 100% no-repeat;
      filter: blur(10px);
    }
  }

  .product-page-content-container {
    width: 1200px;
    max-width: 100%;
    position: relative;
    margin: 30px 0;

    .content-row {

      @media screen and (max-width: 1024px) {
        flex-wrap: wrap-reverse;
      }
    }

    .product-info-tab-wrapper {
      width: 800px;
      max-width: 100%;
    }
    .intro-box-col {
      margin-top: -350px;

      @media screen and (max-width: 1024px) {
        margin-top: 0;
      }
    }
  }
}
</style>

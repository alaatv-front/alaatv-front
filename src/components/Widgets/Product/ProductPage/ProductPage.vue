<template>
  <div class="product-page-container new-theme"
       :class="{ 'hasInstallment': hasInstallment }">
    <div class="product-background">
      <div v-if="product.photo"
           class="background-image"
           :style="{backgroundImage: `url(${product.photo})`}" />
      <div class="product-info-row">
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-md-9">
            <div class="product-info-wrapper">
              <div class="product-info-header">
                <div class="product-title ellipsis">
                  {{ product.title }}
                </div>
                <div class="header-action">
                  <bookmark :is-favored="product.is_favored"
                            :rounded="false"
                            :flat="false"
                            :className="'header-action-btn'"
                            :favoredIcon="'bookmark'"
                            :unFavoredIcon="'bookmark_border'"
                            :loading="bookmarkLoading"
                            @clicked="handleProductBookmark" />
                  <q-btn icon="ph:share-network"
                         square
                         text-color="black"
                         color="grey">
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
              <div class="description-expansion-wrapper">
                <div class="description-expansion">
                  <div class="product-short-description">
                    <div class="short-description-title">
                      <div class="short-description-title__text">معرفی دوره</div>
                      <div class="short-description-title__action">
                        <bookmark :is-favored="product.is_favored"
                                  :rounded="false"
                                  :flat="false"
                                  :favoredIcon="'bookmark'"
                                  :unFavoredIcon="'bookmark_border'"
                                  :loading="bookmarkLoading"
                                  class="bookmark-btn"
                                  @clicked="handleProductBookmark" />
                        <q-btn icon="ph:share-network"
                               color="grey"
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
                <div v-for="(productAttribute, index) in productAttributes"
                     :key="index"
                     class="attribute-item">
                  <div class="attribute-item-icon">
                    <q-icon :name="productAttribute.icon" />
                  </div>
                  <div class="attribute-item-title"
                       v-text="productAttribute.title" />
                  <q-tooltip>
                    {{ productAttribute.title }}
                  </q-tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="product-page-content-container">
      <div class="row content-row q-col-gutter-lg">
        <div class="col-12 col-md-9">
          <div class="product-info-tab-wrapper">
            <product-info-tab v-if="!loading"
                              :options="{product}" />
          </div>
        </div>
        <div class="col-12 col-md-3 intro-box-col">
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
import { defineComponent } from 'vue'
import { Product } from 'src/models/Product.js'
import Bookmark from 'src/components/Bookmark.vue'
import { APIGateway } from 'src/api/APIGateway.js'
import ShareNetwork from 'src/components/ShareNetwork.vue'
import { mixinWidget, mixinPrefetchServerData } from 'src/mixin/Mixins.js'
import ProductInfoTab from 'src/components/Widgets/Product/ProductInfoTab/ProductInfoTab.vue'
import ProductIntroBox from 'src/components/Widgets/Product/ProductIntroBox/ProductIntroBox.vue'

// let StickySidebar
// if (typeof window !== 'undefined') {
//   import('sticky-sidebar-v2')
//     .then((stickySidebar) => {
//       StickySidebar = stickySidebar.default
//     })
// }

export default defineComponent({
  name: 'ProductPage',
  components: {
    Bookmark,
    ShareNetwork,
    ProductInfoTab,
    ProductIntroBox
  },
  mixins: [mixinWidget, mixinPrefetchServerData],
  data () {
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
      showMore: false,
      productAttributes: [
        {
          name: 'major',
          icon: 'ph:books',
          title: 'رشته ریاضی'
        },
        {
          name: 'grade',
          icon: 'ph:graduation-cap',
          title: 'کنکوری'
        },
        {
          name: 'brand',
          icon: 'ph:chalkboard-teacher',
          title: 'گروه آموزشی آلاء'
        },
        {
          name: 'download_date',
          icon: 'ph:clock',
          title: '24 ساعت'
        }
      ]
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
  mounted () {
    this.calculateDescriptionHight()
  },
  methods: {
    loadProductAttributes () {
      this.productAttributes.forEach(item => {
        if (this.product.attributes.info[item.name]) {
          item.title = this.product.attributes.info[item.name].join(', ')
        }
      })
    },
    prefetchServerDataPromise () {
      this.loading = true
      return APIGateway.product.show(this.productId)
    },
    prefetchServerDataPromiseThen (product) {
      this.product = product
      this.loading = false
      this.loadProductAttributes()
      this.$nextTick(() => {
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
    shareGiftCard ({ name, url }) {
      window.open(url, '_blank')
    },
    toggleExpanded () {
      this.expanded = !this.expanded
    },
    calculateDescriptionHight () {
      // let totalHeight = 0
      // if (this.$refs && this.$refs.shortDescription && this.$refs.shortDescription.children) {
      //   for (let index = 0; index < this.$refs.shortDescription.children.length; index++) {
      //     const element = this.$refs.shortDescription.children[index]
      //     totalHeight += element.clientHeight
      //   }
      // }
      // const minHeight = this.$q.screen.lt.sm ? 623 : 450
      // if (totalHeight > minHeight) {
      //   this.showMore = true
      // } else {
      //   this.showMore = false
      // }
    },
    onUpdateProduct (product) {
      this.product = product
    },
    updateProductLoading (loading) {
      this.product.loading = loading
    },
    loadSticky () {
      // console.log('this.$refs.CartInvoice.parentElement', this.$refs.CartInvoice.parentElement.clientHeight)
      const widgetParent = this.$refs.productIntroBox.parentElement
      widgetParent.style.height = '100%'
      // const parent = this.$refs.CartInvoice.parentElement.parentElement
      // const parentClientHeight = parent.clientHeight
      // this.$refs.CartInvoice.style.height = parentClientHeight + 'px'

      // this.stickySidebarInstance = new StickySidebar(this.$refs.productIntroBox, {
      //   topSpacing: 142,
      //   // bottomSpacing: 20,
      //   containerSelector: false,
      //   // containerSelector: '.cart-invoice.main-content',
      //   innerWrapperSelector: '.product-intro-wrapper'
      //   // scrollContainer: '#main-viewport'
      // })
    }
  }
})
</script>

<style lang="scss" scoped>
@import "src/css/Theme/colors.scss";
@import "src/css/Theme/spacing.scss";
@import "src/css/Theme/Typography/typography.scss";

$background-height-xl: 367px;
$background-height-md: 454px;
$boxed-width-xl: 1362px;
$boxed-width-md: 100%;
$page-size-md: map-get($sizes, "md");
$page-size-sm: map-get($sizes, "sm");
$top-page-padding: $space-7;
$short-decription-height: 150px;

.product-page-container {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .product-background {
    position: relative;
    height: $background-height-xl;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    max-width: 100%;
    width: 100%;
    padding-top: $top-page-padding;
    overflow: hidden;

    @media screen and (width <= #{$page-size-md}) {
      height: $background-height-md;
    }

    $inset-margin: 20px;
    //padding: $inset-margin;
    .background-image {
      position: absolute;
      inset: calc( -1 * #{$inset-margin});
      width: calc( 100% + ( #{$inset-margin} * 2 ));
      height: calc( 100% + ( #{$inset-margin} * 2 ));
      filter: blur(10px);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;

      &:after {
        position: absolute;
        left: 0;
        top: 0;
        content: ' ';
        width: 100%;
        height: 100%;
        background: linear-gradient(270deg,
          rgba(0, 0, 0, 0.26) 97.98%,
          rgba(0, 0, 0, 0.60) 52.49%,
          rgba(0, 0, 0, 0.95) 2%),
        lightgray 0 0 / 100% 100% no-repeat;
        filter: blur(10px);
        mix-blend-mode: multiply;
      }
    }

    .product-info-row {
      width: $boxed-width-xl;
      max-width: 100%;

      @media screen and (width <= #{$page-size-md}){
        width: $boxed-width-md;
        padding-left: $space-7;
        padding-right: $space-7;
      }

      @media screen and (width <= #{$page-size-sm}){
        padding-left: $space-5;
        padding-right: $space-5;
      }

      .product-info-wrapper {
        position: relative;
        max-width: 100%;

        @media screen and (width <= 1023px){
          padding: 0 30px;
          min-height: 400px;
          margin: 10px 0;
        }

        @media screen and (width <= 599px){
          min-height: 623px;
          padding: 20px 20px 0;
        }

        .product-info-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: $space-5;
          margin-bottom: $space-6;
          border-bottom: solid 1px $grey-3;

          .product-title {
            color:#FFF;
            font-size: 22px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            letter-spacing: -0.66px;

            @media screen and (width <= 1023px){
              max-width: 100%;
              font-size: 20px;
              letter-spacing: -0.6px;
            }
          }

          .header-action {
            display: flex;
            justify-content: center;
            align-items: center;

            @media screen and (width <= 599px){
              display: none;
            }

            .header-action-btn {
              width: 40px;
              height: 40px;

              &:not(:last-child) {
                margin-right: 12px;
              }
            }
          }
        }

        .description-expansion-wrapper {
          width: 1200px;
          max-width: 100%;
          max-height: $short-decription-height;
          overflow: hidden;
          margin-bottom: $space-7;

          @media screen and (width <= 599px){
            width: 100%;
          }

          .description-expansion {
            width: 800px;
            max-width: 100%;

            @media screen and (width <= 599px){
              width: 100%;
            }

            .product-short-description {
              .short-description-title {

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

                  .bookmark-btn {
                    margin-right: $space-3;
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

                  @media screen and (width <= 599px){
                    display: flex;
                  }
                }

                @media screen and (width <= 599px){
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

                @media screen and (width <= 599px){
                  height: 623px;
                }

                &.auto-height {
                  height: auto;
                  min-height: 300px;
                  transition: all .3s ease-in-out;

                  @media screen and (width <= 599px){
                    min-height: 623px;
                  }
                }
              }
            }
          }
        }

        .product-info-footer {
          display: flex;
          justify-content: flex-start;
          .attribute-item {
            display: flex;
            align-items: center;
            margin-right: $space-9;
            &:last-child {
              margin-right: 0;
            }
            .attribute-item-icon {
              font-size: 16px;
              color: $primary;
              margin-right: $space-1;
            }
            .attribute-item-title {
              @include body2;
              color: $grey-1;
            }
          }
        }
      }
    }
  }

  .product-page-content-container {
    width: $boxed-width-xl;
    max-width: 100%;
    position: relative;
    margin: 30px 0;

    @media screen and (width <= #{$page-size-md}){
      width: $boxed-width-md;
      padding-left: $space-7;
      padding-right: $space-7;
    }

    @media screen and (width <= #{$page-size-sm}){
      padding-left: $space-5;
      padding-right: $space-5;
    }

    .content-row {
      @media screen and (width <= 1023px) {
        flex-wrap: wrap-reverse;
        padding: 0 30px;
      }

      @media screen and (width <= 599px) {
        padding: 0 20px;
      }
    }

    .product-info-tab-wrapper {
      max-width: 100%;

      @media screen and (width <= 1023px) {
        width: 100%;
      }

      &:deep(.q-tab-panels) {
        border-radius: 20px;
      }
    }

    .intro-box-col {
      margin-top: calc( -1 * $background-height-xl );

      @media screen and (width <= 1023px) {
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

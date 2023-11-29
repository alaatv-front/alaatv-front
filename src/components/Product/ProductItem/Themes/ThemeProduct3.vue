<template>
  <div class="theme-3-container"
       @click.capture="productClicked">
    <div class="img-box"
         :class="localOptions.theme">
      <router-link class="image-link"
                   :to="getRoutingObject"
                   @click="productClicked">
        <lazy-img :src="product.photo"
                  :alt="product.title"
                  :height="'72px'"
                  :width="'72px'"
                  class="img" />
      </router-link>
    </div>
    <product-discount-badge class="product-discount-badge"
                            :options="{price:product.price}" />
    <div class="theme-3-content-wrapper">
      <div class="product-content-box">
        <div @click.capture="productClicked">
          <router-link :to="getRoutingObject"
                       @click="productClicked">
            <div class="title-box">
              <div class="main-title ellipsis">
                {{ product.title }}
                <q-tooltip>
                  {{ product.title }}
                </q-tooltip>
              </div>
            </div>
          </router-link>
        </div>
        <bookmark v-if="localOptions.showBookmark"
                  :is-favored="localOptions.product.is_favored"
                  :loading="bookmarkLoading"
                  :flat="true"
                  @clicked="handleProductBookmark" />
        <div class="info-box">
          <div class="product-session">
            <q-icon name="ph:play-circle" />
            <div class="session-number">
              {{ product.number_of_sessions }} جلسه
            </div>
          </div>
          <div class="product-duration">
            <q-icon name="ph:clock" />
            <div class="duration-time">
              {{ product.duration }}
            </div>
          </div>
        </div>
        <div v-if="localOptions.showPrice"
             class="action-box">
          <div class="more-detail product-more-detail"
               @click.capture="productClicked">
            <router-link class="price-link"
                         :to="getRoutingObject"
                         @click="productClicked">
              <div class="price-container text-center">
                <span class="before-base">
                  از
                </span>
                <span v-if="product.price['discount'] !== 0"
                      class="main-price">
                  {{ basePrice }}
                </span>
                <div class="final-price-box">
                  <h6 class="final-price">
                    {{ finalPrice === 0 ? 'رایگان' : finalPrice }}
                  </h6>
                  <span class="price-Toman">تومان</span>
                </div>
              </div>
            </router-link>
          </div>
          <div class="action-btn">
            <q-btn v-if="localOptions.canAddToCart"
                   label="ثبت نام"
                   :loading="cart.loading"
                   :productId="product.id"
                   :data-product-id="product.id"
                   :square="mobileMode"
                   class="add-to-cart-btn"
                   size="md"
                   color="primary"
                   :class="localOptions.theme"
                   icon-right="ph:plus"
                   @click="addToCart" />
            <q-btn v-if="localOptions.canAddToCart"
                   :loading="cart.loading"
                   :productId="product.id"
                   :data-product-id="product.id"
                   :square="mobileMode"
                   class="add-to-cart-btn responsive"
                   size="md"
                   color="primary"
                   :class="localOptions.theme"
                   icon-right="ph:plus"
                   @click="addToCart" />
          </div>
        </div>
        <div v-if="localOptions.customAction"
             class="action-box">
          <div class="more-detail product-more-detail">
            {{ localOptions.customActionMessage }}
          </div>
          <q-btn color="secondary"
                 @click="customActionClicked">
            <span>
              {{ localOptions.customActionLabel }}
            </span>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Product } from 'src/models/Product.js'
import ProductDiscountBadge from 'components/Widgets/Product/ProductDiscountBadge/ProductDiscountBadge.vue'
import LazyImg from 'components/lazyImg.vue'
import Bookmark from 'components/Bookmark.vue'

export default defineComponent({
  name: 'ThemeProduct3',
  components: {
    ProductDiscountBadge,
    LazyImg,
    Bookmark
  },
  props: {
    localOptions: {
      type: Object,
      default: () => {}
    },
    product: {
      type: Product,
      default: new Product()
    },
    cart: {
      type: Object,
      default: () => {}
    },
    finalPrice: {
      type: String,
      default: ''
    },
    basePrice: {
      type: String,
      default: ''
    },
    bookmarkLoading: {
      type: Boolean,
      default: false
    },
    imageWidth: {
      type: String,
      default: '100%'
    },
    imageHeight: {
      type: String,
      default: '100%'
    },
    getTeacherOfProduct: {
      type: Function,
      default: () => ''
    },
    getRoutingObject: {
      type: [String, Object, Number],
      default: null
    }
  },
  emits: ['addToCart', 'customActionClicked', 'productClicked', 'handleProductBookmark'],
  computed: {
    mobileMode () {
      if (typeof window !== 'undefined') {
        return window.innerWidth <= 350
      }
      return false
    }
  },
  methods: {
    addToCart () {
      this.$emit('addToCart')
    },
    customActionClicked () {
      this.$emit('customActionClicked')
    },
    productClicked (e) {
      e.preventDefault()
      e.stopPropagation()
      this.$emit('productClicked')
    },
    handleProductBookmark () {
      this.$emit('handleProductBookmark')
    }
  }
})
</script>

<style lang="scss" scoped>
@import "src/css/Theme/radius";
@import "src/css/Theme/spacing";
@import "src/css/Theme/colors";
@import "src/css/Theme/Typography/typography";

$page-size-lg: map-get($sizes, "lg");
$page-size-md: map-get($sizes, "md");
$page-size-sm: map-get($sizes, "sm");

.theme-3-container {
  display: flex;
  padding-top: 22px;
  margin: 0 auto;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  max-width: 322px;

  @media screen and (width <= #{$page-size-sm}) {
    max-width: 280px;
  }

  .product-discount-badge {
    position: absolute;
    right: 20px;
    rotate: -16deg;
    transition: all ease-in-out .4s;

    :deep(.discount-badge_percent) {
      right: revert;

      .discount-badge_percent__number {
        color: $grey-1;
        text-align: center;
        font-size: 12px;
        font-style: normal;
        font-weight: 900;
        line-height: normal;
      }

      .discount-badge_percent__text {
        color: $grey-1;
        text-align: center;
        font-size: 5px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }
    }

    :deep(.discount-badge_percent__img)  {
      width: 40px;
    }
  }

  .img-box {
    position: absolute;
    left: 20px;
    top: 0;
    width: 72px;
    height: 72px;

    @media screen and (width <= #{$page-size-sm}) {
      width: 64px;
      height: 64px;
    }

    .image-link {
      box-shadow: none;
      width: 100%;
      height: 100%;
      border-radius: $radius-4;
      border: 0 solid #FFF;

      :deep(.lazy-img) {
        border-radius: inherit;
        width: 72px;

        @media screen and (width <= #{$page-size-sm}) {
          width: 64px;
        }
      }
    }
  }

  .theme-3-content-wrapper {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 64px $space-5 $space-5 $space-5;
    gap: 16px;
    background-color: #fff;
    border-radius: $radius-6;

    @media screen and (width <= #{$page-size-sm}) {
      padding: 56px $space-5 $space-5 $space-5;
    }
    .product-content-box {
      position: relative;

      .title-box {
        .main-title {
          @include subtitle1;
          color: $grey-9;
          width: 100%;
        }
      }

      .action-box {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 8px;
        align-self: stretch;

        @media screen and (width <= #{$page-size-sm}) {
          justify-content: space-between;
        }

        .more-detail {
          .price-link {
            text-decoration: none;
            color: inherit;

            .price-container {
              display: flex;
              justify-content: flex-end;
              align-items: center;
              gap: 6px;
              flex: 1 0 0;

              .before-base {
                @include subtitle1;
                color: $grey-9;
              }
              .main-price {
                color: $grey-6;
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                letter-spacing: -0.28px;
                text-decoration-line: line-through;
              }
              .final-price-box {
                display: flex;
                justify-content: center;
                align-items: center;

                .final-price {
                  color: $secondary-6;
                  margin-right: $space-1;
                }
                .price-Toman {
                  color: $grey-8;
                  @include caption1;
                }
              }
            }
          }
        }

        .action-btn {
          .add-to-cart-btn {
            width: 96px;

            @media screen and (width <= #{$page-size-sm}) {
              display: none;
            }

            &.responsive {
              display: none;
              width: 24px;

              @media screen and (width <= #{$page-size-sm}) {
                display: block;
              }
            }
          }
        }

      }
    }

    .info-box {
      display: flex;
      align-items: center;
      margin: $space-4 $spacing-none;

      .product-session {
        display: flex;
        padding: $space-1 $space-2;
        justify-content: flex-end;
        align-items: center;
        gap: 4px;
        border-radius: $radius-2;
        background: $blue-grey-2;
        margin-right: $space-3;

        .session-number {
          color: $grey-9;
          @include caption1;
        }
      }
      .product-duration {
        display: flex;
        padding: $space-1 $space-2;
        justify-content: flex-end;
        align-items: center;
        gap: 4px;
        border-radius: $radius-2;
        background: $blue-grey-2;
        margin-right: $space-3;

        .duration-time {
          color: $grey-9;
          @include caption1;
        }
      }
    }
  }

}
</style>

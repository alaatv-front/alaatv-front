<template>
  <div class="theme1-container"
       @click.capture="productClicked">
    <div class="img-box">
      <product-discount-badge class="product-discount-badge"
                              :options="{price:product.price}" />
      <router-link :to="getRoutingObject"
                   @click="productClicked">
        <lazy-img :src="product.photo"
                  :alt="product.title"
                  :height="imageHeight"
                  :width="imageWidth"
                  class="img" />
      </router-link>
    </div>
    <div class="product-content-box row">
      <div @click.capture="productClicked">
        <router-link :to="getRoutingObject"
                     @click="productClicked">
          <div class="title-box">
            <div class="main-title ellipsis-2-lines">
              {{ product.title }}
            </div>
          </div>
        </router-link>
      </div>
      <div class="product-action-container">
        <bookmark v-if="localOptions.showBookmark"
                  class="product-item-bookmark"
                  :is-favored="localOptions.product.is_favored"
                  :loading="bookmarkLoading"
                  @clicked="handleProductBookmark" />
      </div>
      <div v-if="product.attributes && localOptions.theme !== 'theme2'"
           class="info-box col-12">
        <div class="teacher-image">
          <q-avatar size="32px"
                    font-size="32px"
                    color="grey"
                    text-color="white"
                    icon="account_circle" />
        </div>
        <div v-if="product.attributes.info"
             class="teacher-name">{{getTeacherOfProduct()}}</div>
      </div>
      <div v-if="localOptions.showPrice"
           class="action-box col-12 row">
        <div class="more-detail product-more-detail col-sm-6 col-xs-9">
          <div @click.capture="productClicked">
            <router-link :to="getRoutingObject"
                         @click="productClicked">
              <div class="price-box">
                <div class="price-info">
                  <div v-if="product.price['final'] !== product.price['base'] && (localOptions.theme === 'default' || !localOptions.theme)"
                       class="discount">
                    <span>
                      %{{
                        (
                          (1 - product.price['final'] / product.price['base']) *
                          100
                        ).toFixed(0)
                      }}
                    </span>
                  </div>
                  <div class="price-container row text-center">
                    <div class="final-price-box col-xs-12 col-sm-6">
                      <div class="final-price">
                        {{ finalPrice }}
                      </div>
                      <div class="price-Toman">تومان</div>
                    </div>
                    <div v-if="product.price['discount'] !== 0"
                         class="main-price col-xs-12 col-sm-6">{{ basePrice }}</div>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <div class="action-btn col-sm-6 col-xs-12">
          <q-btn v-if="localOptions.canAddToCart"
                 unelevated
                 text-color="grey-9"
                 label="ثبت نام"
                 :loading="cart.loading"
                 :productId="product.id"
                 :data-product-id="product.id"
                 :square="mobileMode"
                 class="add-to-cart-btn q-btn-md"
                 :class="localOptions.theme"
                 icon-right="ph:plus"
                 @click="addToCart" />
        </div>
      </div>
      <div v-if="localOptions.customAction"
           class="action-box col-12">
        <div class="more-detail product-more-detail">
          {{ localOptions.customActionMessage }}
        </div>
        <q-btn unelevated
               class="btn-green"
               @click="customActionClicked">
          <span>
            {{ localOptions.customActionLabel }}
          </span>
        </q-btn>
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
  name: 'ThemeProduct1',
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
    mobileMode() {
      if (typeof window !== 'undefined') {
        return window.innerWidth <= 350
      }
      return false
    }
  },
  methods: {
    addToCart() {
      this.$emit('addToCart')
    },
    customActionClicked() {
      this.$emit('customActionClicked')
    },
    productClicked(e) {
      e.preventDefault()
      e.stopPropagation()
      this.$emit('productClicked')
    },
    handleProductBookmark() {
      this.$emit('handleProductBookmark')
    }
  }
})
</script>

<style lang="scss" scoped>
.theme1-container {
  flex-wrap: wrap;
  background-color: #ffffff;
  border-radius: 20px;
  padding-top: 20px;
  margin-top: 55px;

  .img-box {
    position: relative;
    margin: -40px 20px 0;

    .product-discount-badge {
      margin: -30px 10px 0px 0px;
      rotate: -16deg;
      transition: all ease-in-out .4s;
    }

    a {
      box-shadow: none;
      width: 100%;
      height: 100%;
      border-radius: 12px;
      border: 0px solid #FFF;
      .img {
        border-radius: inherit;
        width: inherit;

        @media screen and (max-width: 600px){
          width: 100%;
        }
      }
    }
  }

  &.q-card {
    //min-width: 318px;
  }

  .product-content-box {
    position: relative;
    padding: 10px 20px 20px 20px;

    .title-box {
      min-height: 42px;
      display: flex;
      align-items: center;
    }

    .price-box {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
      margin-top: 0;

      .add-cart-info {
        display: flex;
        justify-content: center;
        align-items: center;

        .add-cart-icon {
          width: 19px;
          order: 1;
        }
      }

      .price-info {
        //display: flex;
        justify-content: center;
        align-items: baseline;

        .final-price-box {
          display: flex;
          justify-content: center;
          align-items: center;

          .final-price {
            font-size: 18px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            letter-spacing: -0.36px;
            color: #009688;
            margin-left: 8px;
          }
        }

        .main-price {
          color: #9E9E9E;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          letter-spacing: -0.28px;
          text-decoration-line: line-through;
        }

        .price-Toman {
          color: #616161;
          font-size: 10px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          letter-spacing: -0.2px;
        }
      }
    }

    .action-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 8px;
      color: #E0E0E0;

      .action-separator {
        margin: 15px 0 5px;
        width: 100%;
      }

      .more-detail {
        font-weight: 500;
        font-size: 12px;
        line-height: 21px;
        color: #666666;
        cursor: pointer;

        a {
          text-decoration: none;
          color: inherit;
        }
      }

      .action-btn {
        text-align: end;
      }

      .btn-style {
        width: 116px;
        height: 40px;
        background-color: #4caf50;
        border-radius: 10px;
        border: none;
        color: white;
        font-size: 14px;
        letter-spacing: -0.03em;

        img {
          width: 15px;
          height: 15px;
          margin-right: 7px;
        }

        .content {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .active {
          border: 2px solid #4caf50;
          color: #4caf50;
          background-color: white;
        }
      }
    }

    .discount {
      width: 36px;
      height: 24px;
      border-radius: 6px;
      background-color: #ef5350;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        color: white;
        font-weight: 500;
        font-size: 14px;
        padding-top: 3px;
      }
    }
    @media screen and(max-width: 600px) {
    }
  }

  .product-action-container{
    position: absolute;
    right: 0;
    top: -2px;
    .product-item-bookmark {
      margin: -10px;
    }
  }

  .info-box {
    display: flex;
    align-items: center;
    margin-top: 8px;
  }

  .total-score {
    display: flex;
  }

  .teacher-image {
    height: 32px;
    width: 32px;
  }

  .star-score {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEjSURBVHgBnVNBToNQEJ35KJtuOEL/ynQl3oAj6AnQxBrjqj2B9Qa6M9EFnMDewHoK027KEf6qixaYDr+B/ob/G9qXAAN58+bNzAfBAfp/7oMofvWLv7lBmSgbT7gEwCte+d7X19ofuWh4pPrS+KTYhbS5EEeqmwhcLg4c0HLExFXE0Y+Fq5g9hsveFOV74wRp/nTLz5iTQtj13AUZi2VA+MECQ4LzoXgGlMK5IEj1DGj+mHA38UnJJaU4+L5vhniiyBSvvu6qYL9GP6/WpDqll964DhsB11G1QOHgM2sJ0GJYrTHoIBDQ4iVsCTBCWzWrRJlHbQHC6JBEb+D3JPcrdWxC4HUdXhgJM5aL+YTNoPAejD4rFxP+wRIQ+URvqij/6rQtVRliQ9SZCLgAAAAASUVORK5CYII=');
    width: 18px;
    height: 18px;
  }

  .teacher-name {
    color: #424242;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.28px;
    margin-left: 4px;
  }

  .price-container {
    //display: flex;
    flex-direction: row-reverse;
    align-items: center;
  }

  .add-to-cart-btn {
    background: $primary;
    height: inherit;

    .btn-text {
      margin-right: 4px;
      @media screen and (max-width: 350px){
        display: none;
      }
    }

    @media screen and (max-width: 600px){
      //margin: 20px;
    }
  }

  @media screen and (max-width: 992px) {
    .img-box {
      .img {
      }
    }

    .product-content-box {
      .main-title {

        a {
        }

        .title-box {
          .title-text {
          }
        }
      }

      .price-box {
        .add-cart-info {
          .add-cart-icon {
          }
        }

        .price-info {
          .final-price-box {
            .final-price {
            }
          }

          .main-price {
          }

          .price-Toman {
          }
        }
      }

      .action-box {
        .more-detail {
          a {
          }
        }

        .btn-style {
          width: 102px;

          img {
            margin-left: 0;
          }

          .content {
          }

          .active {
          }
        }
      }

      .discount {
        span {
        }
      }
    }
  }

  @media screen and (max-width: 700px) {
    .product-content-box {
      .action-box {
        //flex-flow: column;
        justify-content: space-around;
        align-items: stretch;
      }
    }
  }

  @media screen and (max-width: 600px) {
    display: flex;
    border-radius: 18px;
    margin-bottom: 16px;

    .img-box {
      width: 100px;

      .img {
        border-radius: 10px;
      }

      @media screen and (max-width: 600px){
        width: 100%;
      }
    }

    .product-content-box {
      padding: 9px 12px 16px;
      width: 100%;

      .main-title {
        margin-bottom: 0;

        a {
        }

        .title-box {
          height: 44px;
          justify-content: center;

          .title-text {
            -webkit-line-clamp: 2;
          }
        }
      }

      .price-box {
        margin-bottom: 0;

        .add-cart-info {
          .add-cart-icon {
          }
        }

        .price-info {
          .final-price-box {
            .final-price {
              margin-left: 2px;
            }
          }

          .main-price {
            margin-left: 4px;
          }

          .price-Toman {
          }
        }
      }

      .action-box {
        .more-detail {
          .more {
            display: none;
          }
        }
        .action-btn {
          .add-to-cart-btn {
            width: 100%;
          }
        }
        .btn-green{
          margin-left: 20px;
        }

        .btn-style {
          width: 100px;
          height: 25px !important;
          border-radius: 8px;

          img {
            margin-left: 0;
          }

          .content {
          }

          .active {
          }
        }
      }

      .discount {
        height: 20px;
        /* margin-left: 3px; */
      }
    }
  }
}
</style>

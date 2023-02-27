<template>
  <q-card class="product-item-box"
          :style="{minWidth: localOptions.minWidth}">
    <div class="img-box">
      <router-link :to="{
        name: 'Public.Product.Show',
        params: { id: product.id ? product.id : -1 }
      }">
        <lazy-img :src="product.photo"
                  :alt="product.title"
                  width="1"
                  height="1"
                  class="img" />
        <div class="main-title ellipsis-2-lines">
          {{ product.title }}
        </div>
      </router-link>
    </div>
    <div class="product-content-box">
      <div class="info-box">
        <div class="teacher-image" />
        <div class="teacher-name">محمد امین نباخته</div>
        <!-- <div class="teacher-score">
          <div class="total-score">
            <div class="counts-score">(۶۲۵)</div>
            ۳.۸
            <div class="star-score"></div>
          </div>
        </div> -->
      </div>
      <div class="action-box">
        <div class="more-detail product-more-detail">
          <div class="price-box">
            <div class="price-info">
              <div v-if="product.price['final'] !== product.price['base']"
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
              <div class="price-container">
                <div class="final-price-box">
                  <div class="final-price">
                    {{ product.price['final'] }}
                  </div>
                  <div class="price-Toman">تومان</div>
                </div>
                <div class="main-price">{{ product.price['base'] }}</div>
              </div>
            </div>
          </div>
        </div>
        <q-btn v-if="localOptions.canAddToCart"
               unelevated
               :productId="product.id"
               :data-product-id="product.id"
               class="btn-green"
               @click="addToCart">
          <q-icon name="add" />
          <span>افزودن به سبد</span>
        </q-btn>
      </div>
    </div>
  </q-card>
</template>

<script>
import { Product } from 'src/models/Product.js'
import LazyImg from 'src/components/lazyImg.vue'

export default {
  name: 'productItem',
  components: { LazyImg },
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          style: {},
          minWidth: 'auto',
          canAddToCart: true,
          product: new Product()
        }
      }
    }
  },
  data: () => ({
    product: new Product(),
    defaultOptions: {
      style: {},
      minWidth: 'auto',
      canAddToCart: true,
      product: new Product()
    }
  }),
  computed: {
    localOptions () {
      return Object.assign(this.defaultOptions, this.options)
    }
  },
  created () {
    if (!this.options.product) {
      this.product = new Product(this.options)
    } else {
      this.product = new Product(this.options.product)
    }
  },
  methods: {
    addToCart() {
      this.$store.dispatch('Cart/addToCart', [this.product])
        .then(() => {
          this.$store.dispatch('Cart/reviewCart', this.product)
            .then(() => {
              this.$q.notify({
                message: 'با موفقیت به سبد خرید شما افزوده شد',
                color: 'green',
                actions: [{
                  label: 'سبد خرید',
                  icon: 'isax:shopping-cart',
                  color: 'white',
                  class: 'bg-green-3',
                  handler: () => {
                    this.$router.push({ name: 'Public.Checkout.Review' })
                  }
                }]
              })
            })
        }).catch(() => {

        })
    }
  }
}
</script>

<style lang="scss" scoped>
.product-item-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  width: 260px;
  margin-bottom: 10px;
  position: relative;
  border-radius: 20px;
  box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6),
  2px 4px 10px rgba(46, 56, 112, 0.05);
  background-color: #ffffff;
  top: 0;
  transition: all ease 0.5s;

  &:hover {
    box-shadow: -5px -6px 10px rgba(255, 255, 255, 0.6),
    5px 5px 20px rgba(0, 0, 0, 0.1);
    top: -10px;
  }

  .img-box {
    .main-title {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.03em;
      margin: 16px;

      @media screen and (max-width: 600px){
        font-size: 14px;
        line-height: 16px;
      }

      a {
        margin-bottom: 0;
      }

      .title-text {
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        letter-spacing: -0.03em;
        color: #333333;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;

        @media screen and (max-width: 600px){
          font-size: 12px;
          line-height: 14px;
        }
      }
    }

    a {
      border-radius: inherit;
      box-shadow: none;
      width: 100%;
      height: 270px;

      .img {
        width: inherit;
        border-radius: 20px 20px 0 0;

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
    padding: 10px 16px 16px 16px;

    .price-box {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
      margin-top: 21px;

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
        display: flex;
        justify-content: center;
        align-items: baseline;

        .final-price-box {
          display: flex;
          justify-content: center;
          align-items: center;

          .final-price {
            font-style: normal;
            font-weight: 400;
            font-size: 18px;
            line-height: 18px;
            text-align: center;
            letter-spacing: -0.03em;
            color: #656f7b;
            margin-left: 8px;
          }
        }

        .main-price {
          text-decoration: line-through;
          /* margin-left: 12px; */
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 19px;
          color: #656f7b;

          opacity: 0.4;
        }

        .price-Toman {
          font-size: 12px;
          font-weight: 400;
          line-height: 19px;
          margin-left: 3px;
          color: #656f7b;
        }
      }
    }

    .action-box {
      display: flex;
      justify-content: space-between;
      align-items: center;

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
  }

  .info-box {
    display: flex;
    align-items: center;
  }

  .total-score {
    display: flex;
  }

  .teacher-image {
    background-image: url('data:image/png;base64,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');
    height: 32px;
    width: 32px;
  }

  .star-score {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEjSURBVHgBnVNBToNQEJ35KJtuOEL/ynQl3oAj6AnQxBrjqj2B9Qa6M9EFnMDewHoK027KEf6qixaYDr+B/ob/G9qXAAN58+bNzAfBAfp/7oMofvWLv7lBmSgbT7gEwCte+d7X19ofuWh4pPrS+KTYhbS5EEeqmwhcLg4c0HLExFXE0Y+Fq5g9hsveFOV74wRp/nTLz5iTQtj13AUZi2VA+MECQ4LzoXgGlMK5IEj1DGj+mHA38UnJJaU4+L5vhniiyBSvvu6qYL9GP6/WpDqll964DhsB11G1QOHgM2sJ0GJYrTHoIBDQ4iVsCTBCWzWrRJlHbQHC6JBEb+D3JPcrdWxC4HUdXhgJM5aL+YTNoPAejD4rFxP+wRIQ+URvqij/6rQtVRliQ9SZCLgAAAAASUVORK5CYII=');
    width: 18px;
    height: 18px;
  }

  .teacher-name {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    text-align: right;
    letter-spacing: -0.03em;
    color: #656f7b;
    margin-left: 8px;
  }

  .price-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .btn-green {
    background: #4caf50;
    color: white;
    @media screen and (max-width: 600px){
      font-size: 8px;
      margin: 5px;
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

  @media screen and (max-width: 575px) {
    width: 310px;
    min-height: 460px;
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
      padding: 0 0 0 16px;
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
          a {
          }

          .more {
            display: none;
          }
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

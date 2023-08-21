<template>
  <div class="product-item-container"
       :class="localOptions.theme">
    <q-card v-if="localOptions.loading"
            class="product-item-box q-pa-md"
            :style="{minWidth: localOptions.minWidth, ...localOptions.style}">
      <div>
        <q-skeleton height="270px"
                    square
                    animation="fade" />
        <q-skeleton type="text"
                    animation="fade" />
        <q-item>
          <q-item-section avatar>
            <q-skeleton type="QAvatar"
                        animation="fade" />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <q-skeleton type="text"
                          animation="fade" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text"
                          animation="fade" />
            </q-item-label>
          </q-item-section>
        </q-item>

        <div class="row items-start no-wrap q-mt-sm">
          <div class="col q-pr-sm">
            <q-skeleton type="text"
                        square
                        width="30%"
                        animation="fade" />
            <q-skeleton type="text"
                        square
                        height="12px"
                        animation="fade" />
            <q-skeleton type="text"
                        square
                        height="12px"
                        width="75%"
                        animation="fade" />
          </div>
          <q-skeleton width="56px"
                      height="20px"
                      square
                      animation="fade" />
        </div>
      </div>
    </q-card>
    <q-card v-else
            :ref="productRef"
            class="product-item-box"
            :class="'productItem' + product.id"
            :style="{minWidth: localOptions.minWidth, ...localOptions.style}">

      <div class="img-box"
           :class="localOptions.theme">
        <q-badge v-if="product.price['final'] !== product.price['base']"
                 floating
                 class="discount-badge"
                 color="transparent">
          <q-img :src="'https://nodes.alaatv.com/upload/widget_items/dis.png'"
                 class="discount-percent-img"
                 width="64px"
                 spinner-color="primary"
                 spinner-size="64px" />
          <div class="discount-percent">
            <div class="discount-percent_number">
              %{{
                (
                  (1 - product.price['final'] / product.price['base']) *
                  100
                ).toFixed(0)
              }}
            </div>
            <span class="discount-percent_text">
              تخفیف
            </span>
          </div>
        </q-badge>
        <router-link :to="getRoutingObject"
                     @click="productClicked">
          <lazy-img :src="product.photo"
                    :alt="product.title"
                    :height="imageHeight"
                    :width="imageWidth"
                    class="img" />
        </router-link>
      </div>
      <div class="product-content-box"
           :class="[localOptions.theme]">
        <router-link :to="getRoutingObject"
                     @click="productClicked">
          <div class="title-box"
               :class="[localOptions.theme]">
            <div class="main-title ellipsis-2-lines">
              {{ product.title }}
            </div>
          </div>
        </router-link>
        <div class="product-action-container">
          <bookmark v-if="defaultOptions.showBookmark"
                    class="product-item-bookmark"
                    :is-favored="localOptions.product.is_favored"
                    :loading="bookmarkLoading"
                    @clicked="handleProductBookmark" />
        </div>
        <div v-if="product.attributes && localOptions.theme !== 'theme2'"
             class="info-box"
             :class="[localOptions.theme]">
          <div class="teacher-image">
            <q-avatar size="32px"
                      font-size="32px"
                      color="grey"
                      text-color="white"
                      icon="account_circle" />
          </div>
          <div v-if="product.attributes.info"
               class="teacher-name"
               :class="[localOptions.theme]">{{getTeacherOfProduct()}}</div>
        </div>
        <div v-if="localOptions.showPrice"
             class="action-box"
             :class="[localOptions.theme]">
          <div class="more-detail product-more-detail">
            <router-link :to="getRoutingObject"
                         @click="productClicked">
              <div class="price-box"
                   :class="[localOptions.theme]">
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
                  <div class="price-container"
                       :class="[localOptions.theme]">
                    <div class="final-price-box"
                         :class="[localOptions.theme]">
                      <div class="final-price">
                        {{ finalPrice }}
                      </div>
                      <div class="price-Toman"
                           :class="[localOptions.theme]">تومان</div>
                    </div>
                    <div v-if="product.price['discount'] !== 0"
                         class="main-price"
                         :class="[localOptions.theme]">{{ basePrice }}</div>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
          <q-separator v-if="localOptions.theme === 'theme2'"
                       class="action-separator" />
          <q-btn v-if="localOptions.canAddToCart"
                 unelevated
                 :flat="localOptions.theme === 'theme2'"
                 :loading="cart.loading"
                 :productId="product.id"
                 :data-product-id="product.id"
                 class="add-to-cart-btn"
                 :class="localOptions.theme"
                 @click="addToCart">
            <template v-if="localOptions.theme === 'theme1'">
              <span class="btn-text">ثبت نام</span>
              <q-icon name="west" />
            </template>
            <template v-else-if="localOptions.theme === 'theme2'">
              <span class="btn-text">مشاهده دوره</span>
              <q-icon name="west" />
            </template>
            <template v-else>
              <q-icon name="add" />
              <span>افزودن به سبد</span>
            </template>
          </q-btn>
        </div>
        <div v-if="localOptions.customAction"
             class="action-box">
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
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Product } from 'src/models/Product.js'
import LazyImg from 'src/components/lazyImg.vue'
import Bookmark from 'src/components/Bookmark.vue'
import { AEE } from 'src/assets/js/AEE/AnalyticsEnhancedEcommerce.js'
import { mixinWidget, mixinPrefetchServerData } from 'src/mixin/Mixins.js'

export default defineComponent({
  name: 'productItem',
  components: {
    LazyImg,
    Bookmark
  },
  mixins: [mixinWidget, mixinPrefetchServerData],
  emits: ['onBookmarkLoaded', 'onBookmarkClicked'],
  data: () => ({
    productRef: 'product' + Date.now(),
    defaultOptions: {
      theme: 'default',
      style: {},
      minWidth: 'auto',
      canAddToCart: true,
      customAction: false,
      customActionLabel: null,
      customActionMessage: null,
      loading: false,
      showPrice: true,
      product: new Product(),
      routeToProduct: true,
      showBookmark: false
    },
    bookmarkLoading: false,
    bookmarkValue: false
  }),
  computed: {
    imageWidth() {
      return this.localOptions.theme === 'theme1' ? '282px' : '100%'
    },
    imageHeight() {
      return this.localOptions.theme === 'theme1' ? '' : '100%'
    },
    cart () {
      return this.$store.getters['Cart/cart']
    },
    getRoutingObject() {
      if (this.defaultOptions.routeToProduct) {
        return {
          name: 'Public.Product.Show',
          params: { id: this.product.id || -1 }
        }
      }
      return {}
    },
    product: {
      get() {
        if (!this.localOptions.product) {
          return new Product()
        }
        return new Product(this.localOptions.product)
      },
      set(value) {
        this.localOptions.product = value
      }
    },
    finalPrice () {
      return this.product.price.toman('final', false)
    },
    basePrice () {
      return this.product.price.toman('base', false)
    }
  },
  watch: {
    bookmarkValue(newVal) {
      if (newVal) {
        this.bookmarkUpdated()
      }
      this.localOptions.product.is_favored = newVal
    }
  },
  methods: {
    setProductIntersectionObserver () {
      if (!this.$refs[this.productRef]?.$el) {
        return
      }
      const elements = [this.$refs[this.productRef].$el]
      const observer = new IntersectionObserver(this.handleIntersection)

      elements.forEach(obs => {
        observer.observe(obs)
      })
    },
    handleIntersection(entries, observer) {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          this.productIsViewed()
          observer.unobserve(entry.target)
        }
      })
    },
    productIsViewed () {
      AEE.impressionView([this.product.eec.getData()], {
        TTl: 1000,
        key: this.product.id
      })
    },
    productClicked () {
      AEE.impressionClick([this.product.eec.getData()], {
        TTl: 1000,
        key: this.product.id
      })
    },
    getTeacherOfProduct() {
      if (this.product.attributes.info.teacher) {
        return this.product.attributes.info.teacher[0]
      }
      return null
    },
    addToCart() {
      if (this.product.hasChildren()) {
        this.$router.push({ name: 'Public.Product.Show', params: { id: this.product.id } })
        return
      }
      this.$store.dispatch('Cart/addToCart', { product: this.product })
        .then(() => {
          this.$bus.emit('busEvent-refreshCart')
        })
    },
    getProductItemPromise() {
      if (this.options.product) {
        this.product = new Product(this.options.product)
        return new Promise((resolve) => {
          resolve(this.product)
        })
      } else if (this.options.productId || this.options.paramKey || this.$route.params.id) {
        this.loading = true
        const productId = this.options.productId ? this.options.productId : this.options.paramKey ? this.$route.params[this.options.paramKey] : this.$route.params.id
        return this.$apiGateway.product.show(productId)
      } else {
        this.product = new Product(this.options)
        return new Promise((resolve) => {
          resolve(this.product)
        })
      }
    },
    prefetchServerDataPromise () {
      this.loading = true
      return this.getProductItemPromise()
    },
    prefetchServerDataPromiseThen (product) {
      this.product = new Product(product)
      this.updateBookmarkValue()
      this.loading = false
      if (typeof window !== 'undefined') {
        this.$nextTick(() => {
          this.setProductIntersectionObserver()
        })
      }
    },
    prefetchServerDataPromiseCatch () {
      this.loading = false
    },
    updateBookmarkValue () {
      this.bookmarkValue = this.localOptions.product.is_favored
    },
    handleProductBookmark (value) {
      this.bookmarkLoading = true
      if (this.bookmarkValue) {
        this.$apiGateway.product.unfavored(this.localOptions.product.id)
          .then(() => {
            this.bookmarkValue = !this.bookmarkValue
            this.bookmarkClicked(value)
            this.bookmarkLoading = false
          })
          .catch(() => {
            this.bookmarkLoading = false
          })
        return
      }
      this.$apiGateway.product.favored(this.localOptions.product.id)
        .then(() => {
          this.bookmarkValue = !this.bookmarkValue
          this.bookmarkClicked(value)
          this.bookmarkLoading = false
        })
        .catch(() => {
          this.bookmarkLoading = false
        })
    },
    bookmarkUpdated (value) {
      this.$emit('onBookmarkLoaded', value)
    },
    customActionClicked () {
      this.$emit('onCustomActionClicked')
    },
    bookmarkClicked (value) {
      this.$emit('onBookmarkClicked', value)
    }
  }
})
</script>

<style lang="scss" scoped>
.product-item-container {
  &.theme1 {
    padding-top: 30px;
  }

  &:hover{
    .product-item-box {
      box-shadow: -5px -6px 10px rgba(255, 255, 255, 0.6),
      5px 5px 20px rgba(0, 0, 0, 0.1);
      top: -10px;

      .discount-percent {
        transform: rotate(-40deg);
      }
    }
  }
  .product-item-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
    margin: auto auto 10px;
    position: relative;
    border-radius: 20px;
    box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6),
    2px 4px 10px rgba(46, 56, 112, 0.05);
    background-color: #ffffff;
    top: 0;
    transition: all ease 0.5s;

    .img-box {
      position: relative;
      .discount-badge {
        display: none;
      }

      &.theme1, &.theme2 {
        margin: -20px 20px 0;

        .discount-badge {
          display: block;
          margin: -30px 10px 0px 0px;

          .discount-percent {
            position: absolute;
            top: 15px;
            right: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            rotate: -40deg;
            transition: all ease-in-out .4s;

            &_number {
              text-align: center;
              color: #FFF;
              font-size: 20px;
              font-style: normal;
              font-weight: 900;
              line-height: normal;
            }

            &_text {
              margin-top: -8px;
              text-align: center;
              color: #FFF;
              font-size: 8px;
              font-style: normal;
              font-weight: 600;
              line-height: normal;
            }
          }

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

      a {
        box-shadow: none;
        width: 100%;
        height: 270px;
        border-radius: 20px 20px 0 0;

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
      padding: 10px 16px 16px 16px;

      &.theme1, &.theme2 {
        padding: 10px 20px 20px 20px;
      }

      .title-box {
        min-height: 42px;
        display: flex;
        align-items: center;

        &.theme2 {
          text-align: center;
        }
      }

      .price-box {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        margin-top: 21px;

        &.theme1, &.theme2 {
          margin-top: 0;
        }

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

            &.theme1, &.theme2 {

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

            &.theme1, &.theme2 {
              color: #9E9E9E;
              font-size: 14px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
              letter-spacing: -0.28px;
              text-decoration-line: strikethrough;
            }
          }

          .price-Toman {
            font-size: 12px;
            font-weight: 400;
            line-height: 19px;
            margin-left: 3px;
            color: #656f7b;

            &.theme1, &.theme2 {
              color: #616161;
              font-size: 10px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
              letter-spacing: -0.2px;
            }
          }
        }
      }

      .action-box {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &.theme1 {
          margin-top: 8px;
        }
        &.theme2 {
          margin-top: 8px;
          flex-direction: column;
          color: #E0E0E0;
        }

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

      &.theme1 {
        margin-top: 8px;
      }
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
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      text-align: right;
      letter-spacing: -0.03em;
      color: #656f7b;
      margin-left: 8px;

      &.theme1 {
        color: #424242;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.28px;
      }
    }

    .price-container {
      display: flex;
      flex-direction: column;
      align-items: center;

      &.theme1, &.theme2 {
        flex-direction: row-reverse;
      }
    }

    .add-to-cart-btn {
      background: #4caf50;
      color: white;

      &.theme1 {
        background: $primary;
        color: #424242;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: -0.32px;

        .btn-text {
          margin-right: 4px;
        }
      }
      &.theme2 {
        width: 100%;
        background: transparent;
        color: #9e9e9e;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 196.5%;

        &:hover {
          color: #26A69A;
        }

        .btn-text {
          margin-right: 8px;
        }
      }
      @media screen and (max-width: 600px){
        margin: 20px;
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
          flex-flow: column;
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
            .more {
              display: none;
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
}
</style>

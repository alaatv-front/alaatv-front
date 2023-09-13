<template>
  <div class="product-item-container"
       :class="[localOptions.theme, localOptions.mobileTheme]">
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
      <component :is="localOptions.theme"
                 :localOptions="localOptions"
                 :product="product"
                 :cart="cart"
                 :basePrice="basePrice"
                 :finalPrice="finalPrice"
                 :bookmarkLoading="bookmarkLoading"
                 :imageWidth="imageWidth"
                 :imageHeight="imageHeight"
                 :getRoutingObject="getRoutingObject"
                 :getTeacherOfProduct="getTeacherOfProduct"
                 @productClicked="productClicked"
                 @handleProductBookmark="handleProductBookmark"
                 @customActionClicked="customActionClicked"
                 @addToCart="addToCart" />
    </q-card>
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent } from 'vue'
import { Product } from 'src/models/Product.js'
import { AEE } from 'src/assets/js/AEE/AnalyticsEnhancedEcommerce.js'
import { mixinWidget, mixinPrefetchServerData } from 'src/mixin/Mixins.js'

export default defineComponent({
  name: 'productItem',
  components: {
    ThemeDefault: defineAsyncComponent(() =>
      import('src/components/Widgets/Product/ProductItem/themes/ThemeDefault.vue')
    ),
    ThemeProduct1: defineAsyncComponent(() =>
      import('src/components/Widgets/Product/ProductItem/themes/ThemeProduct1.vue')
    ),
    ThemeProduct2: defineAsyncComponent(() =>
      import('components/Widgets/Product/ProductItem/themes/ThemeProduct2.vue')
    )
  },
  mixins: [mixinWidget, mixinPrefetchServerData],
  emits: ['onBookmarkLoaded', 'onBookmarkClicked'],
  data: () => ({
    productRef: 'product' + Date.now(),
    defaultOptions: {
      theme: 'ThemeProduct2',
      mobileTheme: 'vertical',
      style: {},
      borderStyle: {
        borderCssString: '',
        borderRadiusCssString: '20px'
      },
      boxShadows: [
        '-2px -4px 10px rgba(255, 255, 255, 0.6)',
        '2px 4px 10px rgba(46, 56, 112, 0.05)'
      ],
      cssHoverEffects: {
        boxShadows: [
          '-5px -6px 10px rgba(255, 255, 255, 0.6)',
          '5px 5px 20px rgba(0, 0, 0, 0.1)'
        ],
        borderStyle: {
          borderCssString: '',
          borderRadiusCssString: '20px'
        },
        transition: {
          time: 0.4
        },
        transform: {
          rotate: 0,
          scaleX: 1,
          scaleY: 1,
          skewX: 0,
          skewY: 0,
          translateX: 0,
          translateY: -10
        }
      },
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
      if (this.$q.screen.lt.md) {
        return '100%'
      }
      return this.localOptions.theme === 'ThemeProduct1' ? '282px' : '100%'
    },
    imageHeight() {
      if (this.$q.screen.lt.md) {
        return '100%'
      }
      return this.localOptions.theme === 'ThemeProduct1' ? '' : '100%'
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
    },
    shadows () {
      const shadows = []
      this.localOptions.boxShadows.forEach(shadow => {
        shadows.push(shadow.cssString)
      })

      return shadows.join(', ')
    },
    hoverShadows () {
      const shadows = []
      if (!Array.isArray(this.localOptions.cssHoverEffects?.boxShadows)) {
        return ''
      }
      this.localOptions.cssHoverEffects.boxShadows.forEach(shadow => {
        shadows.push(shadow.cssString)
      })

      return shadows.join(', ')
    },
    cssHoverEffectsBorderStyle () {
      const borderCssString = this.localOptions.cssHoverEffects?.borderStyle?.borderCssString ? this.localOptions.cssHoverEffects?.borderStyle?.borderCssString : ''
      const borderRadiusCssString = this.localOptions.cssHoverEffects?.borderStyle?.borderRadiusCssString ? this.localOptions.cssHoverEffects?.borderStyle?.borderRadiusCssString : ''

      return {
        borderCssString,
        borderRadiusCssString
      }
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
$shadows: v-bind('shadows');
$hoverShadows: v-bind('hoverShadows');
$border: v-bind('localOptions.borderStyle.borderCssString');
$borderRadius: v-bind('localOptions.borderStyle.borderRadiusCssString');
$hoverBorder: v-bind('cssHoverEffectsBorderStyle.borderCssString');
$hoverBorderRadius: v-bind('cssHoverEffectsBorderStyle.borderRadiusCssString');
$skewX: v-bind('localOptions.cssHoverEffects.transform.skewX');
$skewY: v-bind('localOptions.cssHoverEffects.transform.skewY');
$rotate: v-bind('localOptions.cssHoverEffects.transform.rotate');
$scaleX: v-bind('localOptions.cssHoverEffects.transform.scaleX');
$scaleY: v-bind('localOptions.cssHoverEffects.transform.scaleY');
$translateX: v-bind('localOptions.cssHoverEffects.transform.translateX');
$translateY: v-bind('localOptions.cssHoverEffects.transform.translateY');
$transitionTime: v-bind('localOptions.cssHoverEffects.transition.time');
.product-item-container {

  @media screen and (max-width: 600px){
    margin-bottom: 24px ;
  }

  &.theme1 {
    padding-top: 30px;
  }

  &.ThemeDefault {
    @media screen and (max-width: 1024px){
      min-width: 304px;
      height: 140px;
      padding: 0 16px;
    }
  }

  &:hover{
    .product-item-box {
      transform: rotate(calc(#{$rotate} * 1deg)) translate(calc(#{$translateX} * 1px), calc(#{$translateY} * 1px)) scale($scaleX, $scaleY) skew(calc(#{$skewX} * 1deg), calc(#{$skewY} * 1deg));
      transition: all calc(#{$transitionTime} * 1s);
      box-shadow: $hoverShadows;
      -webkit-box-shadow: $hoverShadows;
      -moz-box-shadow: $hoverShadows;
      border-radius: $hoverBorderRadius;
      -webkit-border-radius: $hoverBorderRadius;
      -moz-border-radius: $hoverBorderRadius;
      border: $hoverBorder;

      &:deep(.product-discount-badge) {
        transform: rotate(-40deg);
      }
    }
  }

  .product-item-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: inherit;
    justify-content: space-between;
    margin: auto auto 10px;
    position: relative;
    background-color: #ffffff;
    top: 0;
    transition: all ease 0.5s;
    box-shadow: $shadows;
    -webkit-box-shadow: $shadows;
    -moz-box-shadow: $shadows;
    -webkit-border-radius: $borderRadius;
    -moz-border-radius: $borderRadius;
    border: $border;
  }
}
</style>

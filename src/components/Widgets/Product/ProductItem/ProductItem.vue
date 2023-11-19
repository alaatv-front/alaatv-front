<template>
  <div class="product-item-container"
       :style="localOptions.style"
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
    <component :is="localOptions.theme"
               v-else
               :ref="productRef"
               class="product-item-box"
               :class="'productItem' + product.id"
               :style="{minWidth: localOptions.minWidth}"
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
    <product-bottom-sheet v-if="productMounted"
                          :dialog="bottomSheetDialog"
                          :productId="product.id"
                          @toggle-dialog="toggleBottomSheet" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Product } from 'src/models/Product.js'
import { AEE } from 'src/assets/js/AEE/AnalyticsEnhancedEcommerce.js'
import { mixinWidget, mixinPrefetchServerData } from 'src/mixin/Mixins.js'
import ProductBottomSheet from 'src/components/Widgets/Product/ProductItem/components/ProductBottomSheet.vue'
import ThemeDefault from 'components/Product/ProductItem/Themes/ThemeDefault.vue'
import ThemeProduct1 from 'components/Product/ProductItem/Themes/ThemeProduct1.vue'
import ThemeProduct2 from 'components/Product/ProductItem/Themes/ThemeProduct2.vue'

const defaultTypography = {
  fontFamily: 'iranyekan',
  titleColor: '#D1D1D1',
  priceColor: '#9E9E9E',
  finalColor: '#009688',
  simpleTextColor: '#757575',
  separatorColor: '#EEEEEE',
  actionColor: '#9e9e9e',
  actionHoverColor: '#26A69A',
  installmentColor: '#FF8518',
  installmentBadgeBackground: 'linear-gradient(-90deg, #2CB2C5 0.01%, #31B470 99.99%)'
}

export default defineComponent({
  name: 'productItem',
  components: {
    ThemeDefault,
    ThemeProduct1,
    ThemeProduct2,
    ProductBottomSheet
  },
  mixins: [mixinWidget, mixinPrefetchServerData],
  emits: ['onBookmarkLoaded', 'onBookmarkClicked', 'productClicked'],
  data: () => ({
    productRef: 'product' + Date.now(),
    bottomSheetDialog: false,
    productMounted: false,
    defaultOptions: {
      theme: 'ThemeProduct2',
      mobileTheme: 'horizontal',
      productViewType: 'productPage',
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
      responsiveSpacing: {
        xs: {
          marginTop: null,
          marginLeft: null,
          marginRight: null,
          marginBottom: null,
          paddingTop: null,
          paddingLeft: null,
          paddingRight: null,
          paddingBottom: null
        },
        sm: {
          marginTop: null,
          marginLeft: null,
          marginRight: null,
          marginBottom: null,
          paddingTop: null,
          paddingLeft: null,
          paddingRight: null,
          paddingBottom: null
        },
        md: {
          marginTop: null,
          marginLeft: null,
          marginRight: null,
          marginBottom: null,
          paddingTop: null,
          paddingLeft: null,
          paddingRight: null,
          paddingBottom: null
        },
        lg: {
          marginTop: null,
          marginLeft: null,
          marginRight: null,
          marginBottom: null,
          paddingTop: null,
          paddingLeft: null,
          paddingRight: null,
          paddingBottom: null
        },
        xl: {
          marginTop: null,
          marginLeft: null,
          marginRight: null,
          marginBottom: null,
          paddingTop: null,
          paddingLeft: null,
          paddingRight: null,
          paddingBottom: null
        }
      },
      backgrounds: {
        xs: {
          size: null,
          color: 'rgba(255,255,255, 1)',
          image: null,
          repeat: null,
          position: null,
          attachment: null
        },
        sm: {
          size: null,
          color: 'rgba(255,255,255, 1)',
          image: null,
          repeat: null,
          position: null,
          attachment: null
        },
        md: {
          size: null,
          color: 'rgba(255,255,255, 1)',
          image: null,
          repeat: null,
          position: null,
          attachment: null
        },
        lg: {
          size: null,
          color: 'rgba(255,255,255, 1)',
          image: null,
          repeat: null,
          position: null,
          attachment: null
        },
        xl: {
          size: null,
          color: 'rgba(255,255,255, 1)',
          image: null,
          repeat: null,
          position: null,
          attachment: null
        }
      },
      minWidth: 'auto',
      canAddToCart: true,
      customAction: false,
      customActionLabel: null,
      customActionMessage: null,
      typography: defaultTypography,
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
  mounted() {
    this.productMounted = true
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
      this.$emit('productClicked')
      if (this.localOptions.routeToProduct) {
        this.showProduct()
      }
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
    },
    toggleBottomSheet() {
      this.bottomSheetDialog = !this.bottomSheetDialog
    },
    showProduct() {
      if (this.localOptions.productViewType === 'bottomSheet') {
        this.toggleBottomSheet()
      } else if (this.localOptions.productViewType === 'productPage') {
        this.$router.push({ name: 'Public.Product.Show', params: { id: this.product.id } })
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import "quasar-ui-q-page-builder/src/components/Component";

$responsiveSpacing: (
    xs: (
        margintop: v-bind('defaultOptions.responsiveSpacing.xs.marginTop'),
        marginleft: v-bind('defaultOptions.responsiveSpacing.xs.marginLeft'),
        marginright: v-bind('defaultOptions.responsiveSpacing.xs.marginRight'),
        marginbottom: v-bind('defaultOptions.responsiveSpacing.xs.marginBottom'),
        paddingtop: v-bind('defaultOptions.responsiveSpacing.xs.paddingTop'),
        paddingleft: v-bind('defaultOptions.responsiveSpacing.xs.paddingLeft'),
        paddingright: v-bind('defaultOptions.responsiveSpacing.xs.paddingRight'),
        paddingbottom: v-bind('defaultOptions.responsiveSpacing.xs.paddingBottom'),
    ),
    sm: (
        margintop: v-bind('defaultOptions.responsiveSpacing.sm.marginTop'),
        marginleft: v-bind('defaultOptions.responsiveSpacing.sm.marginLeft'),
        marginright: v-bind('defaultOptions.responsiveSpacing.sm.marginRight'),
        marginbottom: v-bind('defaultOptions.responsiveSpacing.sm.marginBottom'),
        paddingtop: v-bind('defaultOptions.responsiveSpacing.sm.paddingTop'),
        paddingleft: v-bind('defaultOptions.responsiveSpacing.sm.paddingLeft'),
        paddingright: v-bind('defaultOptions.responsiveSpacing.sm.paddingRight'),
        paddingbottom: v-bind('defaultOptions.responsiveSpacing.sm.paddingBottom'),
    ),
    md: (
        margintop: v-bind('defaultOptions.responsiveSpacing.md.marginTop'),
        marginleft: v-bind('defaultOptions.responsiveSpacing.md.marginLeft'),
        marginright: v-bind('defaultOptions.responsiveSpacing.md.marginRight'),
        marginbottom: v-bind('defaultOptions.responsiveSpacing.md.marginBottom'),
        paddingtop: v-bind('defaultOptions.responsiveSpacing.md.paddingTop'),
        paddingleft: v-bind('defaultOptions.responsiveSpacing.md.paddingLeft'),
        paddingright: v-bind('defaultOptions.responsiveSpacing.md.paddingRight'),
        paddingbottom: v-bind('defaultOptions.responsiveSpacing.md.paddingBottom'),
    ),
    lg: (
        margintop: v-bind('defaultOptions.responsiveSpacing.lg.marginTop'),
        marginleft: v-bind('defaultOptions.responsiveSpacing.lg.marginLeft'),
        marginright: v-bind('defaultOptions.responsiveSpacing.lg.marginRight'),
        marginbottom: v-bind('defaultOptions.responsiveSpacing.lg.marginBottom'),
        paddingtop: v-bind('defaultOptions.responsiveSpacing.lg.paddingTop'),
        paddingleft: v-bind('defaultOptions.responsiveSpacing.lg.paddingLeft'),
        paddingright: v-bind('defaultOptions.responsiveSpacing.lg.paddingRight'),
        paddingbottom: v-bind('defaultOptions.responsiveSpacing.lg.paddingBottom'),
    ),
    xl: (
        margintop: v-bind('defaultOptions.responsiveSpacing.xl.marginTop'),
        marginleft: v-bind('defaultOptions.responsiveSpacing.xl.marginLeft'),
        marginright: v-bind('defaultOptions.responsiveSpacing.xl.marginRight'),
        marginbottom: v-bind('defaultOptions.responsiveSpacing.xl.marginBottom'),
        paddingtop: v-bind('defaultOptions.responsiveSpacing.xl.paddingTop'),
        paddingleft: v-bind('defaultOptions.responsiveSpacing.xl.paddingLeft'),
        paddingright: v-bind('defaultOptions.responsiveSpacing.xl.paddingRight'),
        paddingbottom: v-bind('defaultOptions.responsiveSpacing.xl.paddingBottom'),
    )
);
$backgrounds: (
    xs: (
        size: v-bind('localOptions.backgrounds.xs.size'),
        color: v-bind('localOptions.backgrounds.xs.color'),
        image: v-bind('localOptions.backgrounds.xs.image'),
        repeat: v-bind('localOptions.backgrounds.xs.repeat'),
        position: v-bind('localOptions.backgrounds.xs.position'),
        attachment: v-bind('localOptions.backgrounds.xs.attachment')
    ),
    sm: (
        size: v-bind('localOptions.backgrounds.sm.size'),
        color: v-bind('localOptions.backgrounds.sm.color'),
        image: v-bind('localOptions.backgrounds.sm.image'),
        repeat: v-bind('localOptions.backgrounds.sm.repeat'),
        position: v-bind('localOptions.backgrounds.sm.position'),
        attachment: v-bind('localOptions.backgrounds.sm.attachment')
    ),
    md: (
        size: v-bind('localOptions.backgrounds.md.size'),
        color: v-bind('localOptions.backgrounds.md.color'),
        image: v-bind('localOptions.backgrounds.md.image'),
        repeat: v-bind('localOptions.backgrounds.md.repeat'),
        position: v-bind('localOptions.backgrounds.md.position'),
        attachment: v-bind('localOptions.backgrounds.md.attachment')
    ),
    lg: (
        size: v-bind('localOptions.backgrounds.lg.size'),
        color: v-bind('localOptions.backgrounds.lg.color'),
        image: v-bind('localOptions.backgrounds.lg.image'),
        repeat: v-bind('localOptions.backgrounds.lg.repeat'),
        position: v-bind('localOptions.backgrounds.lg.position'),
        attachment: v-bind('localOptions.backgrounds.lg.attachment')
    ),
    xl: (
        size: v-bind('localOptions.backgrounds.xl.size'),
        color: v-bind('localOptions.backgrounds.xl.color'),
        // color: red,
        image: v-bind('localOptions.backgrounds.xl.image'),
        repeat: v-bind('localOptions.backgrounds.xl.repeat'),
        position: v-bind('localOptions.backgrounds.xl.position'),
        attachment: v-bind('localOptions.backgrounds.xl.attachment')
    )
);
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
  @include media-query-spacings($responsiveSpacing, $sizes);

  &:hover{
    .product-item-box {
      transform: rotate(calc(#{$rotate} * 1deg)) translate(calc(#{$translateX} * 1px), calc(#{$translateY} * 1px)) scale($scaleX, $scaleY) skew(calc(#{$skewX} * 1deg), calc(#{$skewY} * 1deg));
      transition: all calc(#{$transitionTime} * 1s);
      box-shadow: $hoverShadows;
      border-radius: $hoverBorderRadius;
      border: $hoverBorder;

      &:deep(.product-discount-badge) {
        transform: rotate(-16deg);
      }
    }
  }

  .product-item-box {
    @include media-query-backgrounds($backgrounds, $sizes);

    position: relative;
    transition: all ease 0.5s;
    box-shadow: $shadows;
    border-radius: $borderRadius;
    border: $border;
  }
}
</style>

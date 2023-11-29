<template>
  <q-card v-if="localOptions.product"
          class="product-intro-wrapper">
    <q-card-section v-if="localOptions.product.intro?.photo"
                    class="product-intro-video">
      <video-player :key="playerKey"
                    :poster="localOptions.product.intro?.photo"
                    :source="videoSource" />
    </q-card-section>
    <q-card-section v-else-if="localOptions.product.photo_wide"
                    class="q-pa-none">
      <div class="photo_wide-wrapper">
        <lazy-img :src="localOptions.product.photo_wide"
                  class="product-image"
                  width="300"
                  height="180" />
      </div>
    </q-card-section>
    <q-card-section v-else-if="localOptions.product.photo">
      <div class="photo-wrapper">
        <lazy-img :src="localOptions.product.photo"
                  class="product-image"
                  width="300"
                  height="300" />
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <div class="price-section">
        <product-price-with-popup :options="{product: localOptions.product}"
                                  :show-responsive="true"
                                  :listen-to-update="true"
                                  @update-product="onUpdateProduct($event)"
                                  @update-product-loading="onUpdateProductLoading($event)" />
      </div>
    </q-card-section>
    <!-- <q-card-section>
      <div class="rate-section">
        rate
      </div>
    </q-card-section> -->
    <q-card-section class="attributes-section">

      <div v-if="localOptions.product.attributes?.info"
           class="attributes-list">
        <product-attributes :attributes="localOptions.product.attributes" />
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <div class="price-section installment">
        <product-price-with-popup :options="{product: localOptions.product}"
                                  :paymentMode="'installment'"
                                  @update-product="onUpdateProduct($event)"
                                  @update-product-loading="onUpdateProductLoading($event)" />
      </div>
    </q-card-section>

  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import { Product } from 'src/models/Product.js'
import lazyImg from 'src/components/lazyImg.vue'
import { mixinWidget } from 'src/mixin/Mixins.js'
import VideoPlayer from 'src/components/VideoPlayer.vue'
import { PlayerSourceList } from 'src/models/PlayerSource.js'
import ProductAttributes from 'src/components/Widgets/Product/ProductIntroBox/ProductAttributes.vue'
import ProductPriceWithPopup from 'src/components/Widgets/Product/ProductPriceWithPopup/ProductPriceWithPopup.vue'

export default defineComponent({
  name: 'ProductIntroBox',
  components: {
    lazyImg,
    VideoPlayer,
    ProductAttributes,
    ProductPriceWithPopup
  },
  mixins: [mixinWidget],
  emits: ['updateProduct', 'updateProductLoading'],
  data () {
    return {
      playerKey: Date.now(),
      defaultOptions: {
        product: new Product()
      }
    }
  },
  computed: {
    videoSource () {
      return new PlayerSourceList([{
        default: true,
        res: 1024,
        type: 'video/mp4',
        src: this.localOptions.product.intro?.video,
        label: 'کیفیت عالی'
      }])
    }
  },
  watch: {
    videoSource () {
      this.playerKey = Date.now()
    }
  },
  methods: {
    onUpdateProduct (event) {
      this.$emit('updateProduct', event)
    },
    onUpdateProductLoading (event) {
      this.$emit('updateProductLoading', event)
    }
  }
})
</script>

<style lang="scss" scoped>
.product-intro-wrapper {
  position: sticky;
  top: 88px;
  width: 434px;
  min-width: 307px;
  min-height: 638px;
  max-width: 100%;
  border-radius: 12px;
  background:#FFF;
  box-shadow: 2px 2px 3px 0 rgb(16 24 40 / 6%);
  padding: 24px;

  @media screen and (width <= 1439px){
    padding: 20px;
  }

  @media screen and (width <= 1023px) {
    width: 0;
    padding: 0;
    height: 0;
    min-height: 0;
  }

  .product-intro-video {
    overflow: hidden;
    box-shadow: -2px -4px 10px rgb(255 255 255 / 60%), 2px 4px 10px rgb(112 108 162 / 5%);
    border-radius: 8px;
    padding: 0;

    @media screen and (width <= 1023px){
      display: none;
    }
  }

  .photo_wide-wrapper {
    :deep(.product-image) {
      width: 100%;
      height: 100%;
      border-radius: 12px;
    }

    @media screen and (width <= 1023px){
      display: none;
    }
  }

  .photo-wrapper {
    :deep(.product-image) {
      width: 100%;
      height: 100%;
      border-radius: 12px;
    }
    @media screen and (width <= 1023px){
      display: none;
    }
  }

  .price-section {
    padding: 16px 0 25px;

    &.installment {
      padding: 16px 0 0;
    }

    @media screen and (width <= 1023px){
      padding: 0;
    }
  }

  .attributes-section {
    padding: 0;

    @media screen and (width <= 1023px){
      display: none;
    }

    .attributes-title {
      color: $grey-10;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.48px;
    }
  }
}
</style>

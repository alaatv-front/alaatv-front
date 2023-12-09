<template>
  <q-card v-if="localOptions.product"
          class="product-intro-wrapper">
    <q-card-section v-if="localOptions.product.intro?.photo"
                    class="product-intro-video-section">
      <video-player :key="playerKey"
                    class="product-intro-video"
                    :poster="localOptions.product.intro?.photo"
                    :source="videoSource" />
    </q-card-section>
    <q-card-section v-else-if="localOptions.product.photo_wide">
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
    <q-card-section>
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
    <q-card-section>
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
  border-radius: $radius-4;
  background: $grey-1;
  box-shadow: $shadow-1;

  @media screen and (width <= 1439px){
    padding: $spacing-none;
  }

  @media screen and (width <= 1023px) {
    width: 0;
    padding: $spacing-none;
    height: 0;
    min-height: 0;
  }

  .product-intro-video-section {

    .product-intro-video {
      overflow: hidden;
      border-radius: $radius-3;

      :deep(.video-js ) {
        border-radius: $radius-3;
      }
    }

    @media screen and (width <= 1023px){
      display: none;
    }
  }

  .photo_wide-wrapper {
    :deep(.product-image) {
      width: 100%;
      height: 100%;
      border-radius: $radius-4;
    }

    @media screen and (width <= 1023px){
      display: none;
    }
  }

  .photo-wrapper {
    :deep(.product-image) {
      width: 100%;
      height: 100%;
      border-radius: $radius-4;
    }
    @media screen and (width <= 1023px){
      display: none;
    }
  }

  .price-section {
    padding: $space-4 0 $space-6;

    &.installment {
      padding: $space-4 0 0;
    }

    @media screen and (width <= 1023px){
      padding: $spacing-none;
    }
  }

  .attributes-section {
    padding: $spacing-none;

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

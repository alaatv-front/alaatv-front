<template>
  <q-card v-if="localOptions.product"
          class="product-intro-wrapper custom-card">
    <q-card-section v-if="localOptions.product.intro?.photo"
                    class="product-intro-video">
      <video-player :key="playerKey"
                    :poster="localOptions.product.intro?.photo"
                    :source="videoSource" />
    </q-card-section>
    <q-card-section v-else-if="localOptions.product.photo_wide">
      <div class="photo_wide-wrapper">
        <lazy-img :src="localOptions.product.photo_wide"
                  width="300"
                  height="180" />
      </div>
    </q-card-section>
    <q-card-section v-else-if="localOptions.product.photo">
      <div class="photo-wrapper">
        <lazy-img :src="localOptions.product.photo"
                  width="300"
                  height="300" />
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <div class="price-section">
        <product-price-with-popup :options="{product: localOptions.product}"
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

      <div class="attributes-title">
        ویژگی های دوره
      </div>
      <div v-if="localOptions.product.attributes?.info"
           class="attributes-list">
        <product-attributes :attributes="localOptions.product.attributes" />
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
    VideoPlayer,
    ProductAttributes,
    ProductPriceWithPopup,
    lazyImg
  },
  mixins: [mixinWidget],
  emits: ['updateProduct', 'updateProductLoading'],
  data() {
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
    onUpdateProduct(event) {
      this.$emit('updateProduct', event)
    },
    onUpdateProductLoading(event) {
      this.$emit('updateProductLoading', event)
    }
  }
})
</script>

<style lang="scss" scoped>
.product-intro-wrapper {
  position: sticky;
  top: 60px;
  width: 434px;
  min-height: 754px;
  max-width: 100%;
  border-radius: 12px;
  background:#FFF;
  box-shadow: 2px 2px 3px 0 rgba(16, 24, 40, 0.06);
  padding: 30px;

  @media screen and (max-width: 1300px){
    padding: 15px;
  }
  @media screen and (max-width: 1023px){
    padding: 30px;
  }

  @media screen and (max-width: 1024px) {
    margin: auto;
    width: 586px;
  }

  @media screen and (max-width: 600px) {
    margin: auto;
    width: 90%;
    height: auto;
    min-height: auto;
    padding: 16px;
  }

  .product-intro-video {
    overflow: hidden;
    box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
    border-radius: 20px;
    padding: 0;
  }

  .price-section {
    padding: 22px 0;
  }

  .attributes-section {
    padding: 0;

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

<template>
  <q-card v-if="localOptions.product"
          class="product-intro-wrapper custom-card">
    <q-card-section class="product-intro-video">
      <video-player :poster="localOptions.product.intro?.photo"
                    :source="videoSource()" />
    </q-card-section>
    <q-card-section>
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
    <q-card-section>
      <div class="attributes-section">
        <div class="attributes-title">
          ویژگی های دوره
        </div>
        <div v-if="localOptions.product.attributes?.info"
             class="attributes-list">
          <product-attributes :attributes="localOptions.product.attributes" />
        </div>
      </div>
    </q-card-section>

  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import { Product } from 'src/models/Product.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { PlayerSourceList } from 'src/models/PlayerSource.js'
import VideoPlayer from 'src/components/VideoPlayer.vue'
import ProductAttributes from 'src/components/Widgets/Product/ProductIntroBox/ProductAttributes.vue'
import ProductPriceWithPopup from 'src/components/Widgets/Product/ProductPriceWithPopup/ProductPriceWithPopup.vue'

export default defineComponent({
  name: 'ProductIntroBox',
  components: {
    VideoPlayer,
    ProductAttributes,
    ProductPriceWithPopup
  },
  mixins: [mixinWidget],
  emits: ['updateProduct', 'updateProductLoading'],
  data() {
    return {
      defaultOptions: {
        product: new Product()
      }
    }
  },
  methods: {
    videoSource() {
      return new PlayerSourceList([{
        default: true,
        res: 1024,
        type: 'video/mp4',
        src: this.localOptions.product.intro?.video,
        label: 'کیفیت عالی'
      }])
    },
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
  box-shadow: 2px 2px 3px 0px rgba(16, 24, 40, 0.06);
  padding: 30px;

  @media screen and (max-width: 600px) {
    margin: auto;
  }

  .product-intro-video {
    overflow: hidden;
    box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
    border-radius: 20px;
    padding: 0;
  }
}
</style>

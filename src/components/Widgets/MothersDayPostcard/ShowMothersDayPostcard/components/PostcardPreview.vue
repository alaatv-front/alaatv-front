<template>
  <div class="PostcardPreview"
       @click="onCardClicked">
    <div class="boxed-content">
      <div class="Postcard">
        <postcard :poem-title="postcardPoemTitle"
                  :poem-body="postcardPoemBody"
                  :message-text="postcardMessageText"
                  :message-from="postcardMessageFrom"
                  :backgrounds="postcardBackgrounds" />
        <div class="flower-element">
          <flower :src="flowerImage" />
        </div>
        <div v-if="!surpriseDiscountCode"
             class="flower-element-for-left">
          <flower :src="flowerImage" />
        </div>
      </div>
      <div v-if="surpriseDiscountCode"
           class="SurpriseBox">
        <surprise-box :discount-code="surpriseDiscountCode"
                      :banners="surpriseBanners" />
        <div class="flower-element">
          <flower :src="flowerImage" />
        </div>
      </div>
    </div>
    <div class="soundEqualizer">
      <sound ref="sound" />
    </div>
  </div>
</template>

<script>
import Sound from './Sound.vue'
import Flower from './Flower.vue'
import { defineComponent } from 'vue'
import Postcard from './Postcard.vue'
import SurpriseBox from './SurpriseBox.vue'

export default defineComponent({
  name: 'PostcardPreview',
  components: {
    Sound,
    Flower,
    Postcard,
    SurpriseBox
  },
  props: {
    postcardPoemTitle: {
      type: String,
      default: ''
    },
    postcardPoemBody: {
      type: String,
      default: ''
    },
    postcardMessageText: {
      type: String,
      default: ''
    },
    postcardMessageFrom: {
      type: String,
      default: ''
    },
    postcardBackgrounds: {
      type: Object,
      default: () => {
        return {
          size1920: '',
          size1440: '',
          size1024: '',
          size600: '',
          size360: ''
        }
      }
    },
    patternBackgrounds: {
      type: Object,
      default: () => {
        return {
          size1920: '',
          size1440: '',
          size1024: '',
          size600: '',
          size360: ''
        }
      }
    },
    surpriseDiscountCode: {
      type: String,
      default: null
    },
    surpriseBanners: {
      type: Array,
      default: () => []
    },
    flowerImage: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  computed: {
    backgroundUrls () {
      const items = {}
      Object.keys(this.patternBackgrounds).forEach(key => {
        items[key] = 'url(' + this.patternBackgrounds[key] + ')'
      })

      return items
    }
  },
  methods: {
    onCardClicked () {
      this.$refs.sound.tryAutoplay()
    }
  }
})
</script>

<style lang="scss" scoped>
$backgrounds-size-1920: v-bind('backgroundUrls.size1920');
$backgrounds-size-1440: v-bind('backgroundUrls.size1440');
$backgrounds-size-1024: v-bind('backgroundUrls.size1024');
$backgrounds-size-600: v-bind('backgroundUrls.size600');
$backgrounds-size-360: v-bind('backgroundUrls.size360');

.PostcardPreview {
  /* page > 1920 */
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background-image: $backgrounds-size-1920;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;
  z-index: 0;
  overflow: hidden;
  .boxed-content {
    display: flex;
    flex-wrap: nowrap;
    gap: 24px;
    justify-content: center;
    position: relative;
    z-index: 1;
    .Postcard {
      position: relative;
      .flower-element {
        position: absolute;
        top: 362px;
        right: 694px;
        width: 166px;
      }
      .flower-element-for-left {
        position: absolute;
        top: 115.7px;
        left: 722.57px;
        width: 116px;
      }
    }
    .SurpriseBox {
      position: relative;
      .flower-element {
        position: absolute;
        top: 115.7px;
        left: 289.7px;
        width: 116px;
      }
    }
  }
  .soundEqualizer {
    position: absolute;
    left: 0;
    bottom: -30px;
    z-index: 0;
    width: 100%;
  }
  /* 1440 < page < 1920 */
  @include media-max-width('xl') {
    background-image: $backgrounds-size-1440;
  }
  /* 1024 < page < 1440 */
  @include media-max-width('lg') {
    background-image: $backgrounds-size-1024;
    .boxed-content {
      .Postcard {
        .flower-element {
          top: 266px;
          right: 474.1px;
          width: 116.2px;
        }
        .flower-element-for-left {
          position: absolute;
          top: 157.19px;
          left: 498.39px;
          width: 81.34px;
        }
      }
      .SurpriseBox {
        .flower-element {
          top: 157.19px;
          left: 195.39px;
          width: 81.34px;
        }
      }
    }
  }
  /* 600 < page < 1024 */
  @include media-max-width('md') {
    background-image: $backgrounds-size-600;
    .boxed-content {
      flex-wrap: wrap;
      gap: 20px;
      .Postcard {
        .flower-element {
          top: 306.24px;
          right: 434.76px;
          width: 119.07px;
        }
        .flower-element-for-left {
          display: none;
        }
      }
      .SurpriseBox {
        .flower-element {
          display: none;
        }
      }
    }
  }
  /* 360 < page < 600 */
  @include media-max-width('sm') {
    background-image: $backgrounds-size-360;
    .boxed-content {
      gap: 16px;
      .Postcard {
        .flower-element {
          top: 426.24px;
          right: 236.77px;
          width: 119.07px;
        }
      }
    }
  }
}
</style>

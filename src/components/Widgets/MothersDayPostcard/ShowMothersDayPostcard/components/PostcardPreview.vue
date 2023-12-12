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
      </div>
      <div class="SurpriseBox">
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
      default: 'روزت مبارک مادر عزیزم'
    },
    postcardPoemBody: {
      type: String,
      default: '' +
        '        مادر حضور نام تو در شعر های من\n' +
        '<br>\n' +
        '        لطف خداست شامل حال غزل شده است\n' +
        '<br>\n' +
        '        غیر از تو جای هیچ کسی نیست در دلم\n' +
        '<br>\n' +
        '        این مسأله میان من و عشق حل شده است...'
    },
    postcardMessageText: {
      type: String,
      default: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطر آنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیا'
    },
    postcardMessageFrom: {
      type: String,
      default: 'بهزاد'
    },
    postcardBackgrounds: {
      type: Object,
      default: () => {
        return {
          size1920: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/19201702280797.png',
          size1440: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/14401702280833.png',
          size1024: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/10241702280978.png',
          size600: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/6001702280907.png',
          size360: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/3601702281026.png'
        }
      }
    },
    patternBackgrounds: {
      type: Object,
      default: () => {
        return {
          size1920: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/back1440-19201702374213.png',
          size1440: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/back1440-19201702374213.png',
          size1024: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/back10241702374341.png',
          size600: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/back6001702374421.png',
          size360: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/back3601702374436.png'
        }
      }
    },
    surpriseDiscountCode: {
      type: String,
      default: 'GFDfgkler0'
    },
    surpriseBanners: {
      type: Array,
      default: () => [
        {
          src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/11702373602.png',
          link: ''
        },
        {
          src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/21702373813.png',
          link: ''
        },
        {
          src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/31702373855.png',
          link: ''
        }
      ]
    },
    flowerImage: {
      type: String,
      default: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/object1702374033.png'
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
      debugger
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
  z-index: -1;
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
    bottom: -10px;
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

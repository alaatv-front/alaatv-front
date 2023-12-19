<template>
  <div class="ShowMothersDayPostcard">
    <template v-if="postcard.loading">
      <q-spinner-cube color="orange"
                      size="5.5em" />
    </template>
    <template v-else-if="!postcardHasError">
      <div class="BodyMovin-container"
           :class="{'animateCompleted': animateCompleted}">
        <webm-player :responsive-src="entranceBodyMovin"
                     @complete="onComplete" />
      </div>
      <postcard-preview ref="PostcardPreview"
                        :postcard-backgrounds="postcardBackgrounds"
                        :postcard-message-from="postcardMessageFrom"
                        :postcard-message-text="postcardMessageText"
                        :postcard-poem-body="postcardPoemBody"
                        :postcard-poem-title="postcardPoemTitle"
                        :pattern-backgrounds="patternBackgrounds"
                        :surprise-banners="surpriseBanners"
                        :surprise-discount-code="surpriseDiscountCode"
                        :flower-image="flowerImage"
                        :surprise-box-body-movin="surpriseBoxBodyMovin"
                        :surprise-video-poster="surpriseVideoPoster"
                        :surprise-video-src="surpriseVideoSrc"
                        :audio-source="audioSource" />
    </template>
    <template v-else-if="!postcard.loading && postcardHasError">
      <q-banner>
        مشکلی رخ داده است.
      </q-banner>
    </template>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Postcard } from 'src/models/Postcard.js'
import { APIGateway } from 'src/api/APIGateway.js'
import WebmPlayer from './components/WebmPlayer.vue'
import PostcardPreview from './components/PostcardPreview.vue'

export default defineComponent({
  name: 'ShowMothersDayPostcard',
  components: { PostcardPreview, WebmPlayer },
  data () {
    return {
      animateCompleted: false,

      // dynamic variables
      postcardPoemBody: '',
      postcardMessageText: '',
      postcardMessageFrom: '',
      postcardBackgrounds: {
        size1920: '',
        size1440: '',
        size1024: '',
        size600: '',
        size360: ''
      },
      patternBackgrounds: {
        size1920: '',
        size1440: '',
        size1024: '',
        size600: '',
        size360: ''
      },
      surpriseDiscountCode: null,
      surpriseBanners: [],
      flowerImage: '',

      // hard codes variables
      postcardPoemTitle: 'روزت مبارک مادر عزیزم',
      postcard: new Postcard(),
      surpriseBoxBodyMovin: {
        xs: {
          src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/360-Noise1702977340.webm'
        },
        sm: {
          src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/600-noise1702977391.webm'
        },
        md: {
          src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/1024-Noise1702977421.webm'
        },
        lg: {
          src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/1440-1920-noise1702977478.webm'
        },
        xl: {
          src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/1440-1920-noise1702977478.webm'
        }
      },
      entranceBodyMovin: {
        xs: {
          src: ''
        },
        sm: {
          src: ''
        },
        md: {
          src: ''
        },
        lg: {
          src: ''
        },
        xl: {
          src: ''
        }
      },
      surpriseVideoSrc: 'https://nodes.alaatv.com/media/1042/240p/1042001ssss.mp4',
      surpriseVideoPoster: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/VideoPlayer1702464332.png',
      audioSource: 'https://nodes.alaatv.com/upload/landing/motherday1402/mother-postalcard-music.mp3',
      postcardHasError: false
    }
  },
  computed: {
    postcardUuid () {
      return this.$route.params.id
    }
  },
  mounted () {
    this.getPostcard()
    this.getCoupon()
  },
  methods: {
    onComplete () {
      this.animateCompleted = true
      this.$refs.PostcardPreview.playSound()
    },
    getPostcard () {
      this.postcard.loading = true
      APIGateway.postcard.getPostcard(this.postcardUuid)
        .then((postcard) => {
          this.postcard = postcard
          this.postcardPoemBody = this.postcard.value.postcardPoemBody
          this.postcardMessageText = this.postcard.value.postcardMessageText
          this.postcardBackgrounds = this.postcard.value.postcardBackgrounds
          this.patternBackgrounds = this.postcard.value.patternBackgrounds
          this.entranceBodyMovin = this.postcard.value.entranceBodyMovin
          this.flowerImage = this.postcard.value.flowerImage
          // this.postcardMessageFrom = this.postcard.user.first_name + ' ' + this.postcard.user.last_name
          this.postcardMessageFrom = this.postcard.user.first_name
        })
        .catch(() => {
          this.postcard.loading = false
          this.postcardHasError = true
        })
    },
    getCoupon () {
      APIGateway.postcard.getMetaData(this.postcardUuid)
        .then((data) => {
          this.surpriseDiscountCode = data.coupon.code
          this.surpriseBanners = data.banners
          this.postcard.loading = false
        })
        .catch(() => {
          this.postcard.loading = false
          this.postcardHasError = true
        })
    }
  }
})
</script>

<style lang="scss" scoped>
.ShowMothersDayPostcard {
  /* page > 1920 */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .BodyMovin-container {
    position: absolute;
    left: 0;
    top: 0;
    min-width: 100%;
    height: 100vh;
    z-index: 5;
    &.animateCompleted {
      display: none;
    }
    :deep(.WebmPlayer) {
      position: relative;
      video {
        position: absolute;
        top: 0;
        left: 50%;
        height: 100vh;
        min-width: 100%;
        width: auto !important;
        transform: translateX(-50%);
      }
    }
  }
  /* 1440 < page < 1920 */
  @include media-max-width('xl') {

  }
  /* 1024 < page < 1440 */
  @include media-max-width('lg') {

  }
  /* 600 < page < 1024 */
  @include media-max-width('md') {

  }
  /* 360 < page < 600 */
  @include media-max-width('sm') {

  }
}
</style>

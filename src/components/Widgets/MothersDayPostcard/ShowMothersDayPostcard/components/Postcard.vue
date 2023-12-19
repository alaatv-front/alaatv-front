<template>
  <div class="Postcard">
    <div class="action-area"
         @click="showSurpriseVideo">
      <webm-player :loop="true"
                   :autoplay="true"
                   :responsive-src="actionAreaBodyMovin" />
    </div>
    <div class="poem">
      <div class="poem-title">
        {{ poemTitle }}
      </div>
      <div class="poem-body"
           v-html="computedPoemBody" />
    </div>
    <div class="message">
      <div class="message-text"
           v-html="messageText" />
      <div class="message-from">
        از طرف
        -
        {{ messageFrom }}
      </div>
    </div>
    <q-dialog v-model="surpriseVideoDialog"
              class="surpriseVideoDialog">
      <surprise-video :key="surpriseVideoKey"
                      :src="surpriseVideoSrc"
                      :poster="surpriseVideoPoster" />
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import WebmPlayer from './WebmPlayer.vue'
import SurpriseVideo from './SurpriseVideo.vue'

export default defineComponent({
  name: 'Postcard',
  components: {
    WebmPlayer,
    SurpriseVideo
  },
  props: {
    poemTitle: {
      type: String,
      default: ''
    },
    poemBody: {
      type: String,
      default: ''
    },
    messageText: {
      type: String,
      default: ''
    },
    messageFrom: {
      type: String,
      default: ''
    },
    backgrounds: {
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
    actionAreaBodyMovin: {
      type: Object,
      default: () => {
        return {
          xs: {
            src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/177-55-Dkm1702977635.webm'
          },
          sm: {
            src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/177-55-Dkm1702977635.webm'
          },
          md: {
            src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/177-55-Dkm1702977635.webm'
          },
          lg: {
            src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/239-79-Dkm1702977654.webm'
          },
          xl: {
            src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/239-79-Dkm1702977654.webm'
          }
        }
      }
    },
    surpriseVideoSrc: {
      type: String,
      default: ''
    },
    surpriseVideoPoster: {
      type: String,
      default: ''
    }
  },
  emits: ['onShowSurpriseVideo'],
  data () {
    return {
      surpriseVideoKey: Date.now(),
      surpriseVideoDialog: false
    }
  },
  computed: {
    computedPoemBody () {
      return [
        this.poemBody?.verse1?.hemistich1,
        this.poemBody?.verse1?.hemistich2,
        this.poemBody?.verse2?.hemistich1,
        this.poemBody?.verse2?.hemistich2
      ].join('<br>')
    },
    backgroundUrls () {
      const items = {}
      Object.keys(this.backgrounds).forEach(key => {
        items[key] = 'url(' + this.backgrounds[key] + ')'
      })

      return items
    }
  },
  watch: {
    surpriseVideoDialog () {
      this.surpriseVideoKey = Date.now()
    }
  },
  methods: {
    showSurpriseVideo () {
      this.$emit('onShowSurpriseVideo')
      this.surpriseVideoDialog = true
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

.Postcard {
  /* page > 1920 */
  width: 784px;
  height: 784px;
  position: relative;
  background-size: cover;
  background-image: $backgrounds-size-1920;
  .poem {
    position: absolute;
    width: 272px;
    top: 56px;
    left: 56px;
    padding-top: 16px;
    color: #FFF;
    font-family: IranNastaliq;
    .poem-title {
      text-align: center;
      font-size: 32px;
      font-style: normal;
      font-weight: 400;
      line-height: 48px; /* 150% */
      margin-bottom: 32px;
    }
    .poem-body {
      text-align: center;
      font-size: 24px;
      font-style: normal;
      font-weight: 400;
      line-height: 48px; /* 200% */
    }
  }
  .action-area {
    position: absolute;
    width: max-content;
    height: 79px;
    overflow: hidden;
    top: 56px;
    right: 56px;
    cursor: pointer;
  }
  .message {
    position: absolute;
    width: 250px;
    bottom: 64px;
    left: 56px;
    padding-left: 8px;
    color: #FFF;
    .message-text {
      text-align: justify;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.48px;
      margin-bottom: 12px;
    }
    .message-from {
      text-align: left;
      font-feature-settings: 'clig' off, 'liga' off;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      letter-spacing: -0.48px;
    }
  }
  /* 1440 < page < 1920 */
  @include media-max-width('xl') {
    width: 784px;
    height: 784px;
    background-image: $backgrounds-size-1440;
    .poem {
      width: 272px;
      top: 56px;
      left: 56px;
      padding-top: 16px;
      .poem-title {
        text-align: center;
        font-size: 32px;
        font-style: normal;
        font-weight: 400;
        line-height: 48px; /* 150% */
      }
      .poem-body {
        text-align: center;
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: 48px; /* 200% */
      }
    }
    .action-area {
      height: 79px;
      top: 56px;
      right: 56px;
    }
    .message {
      width: 250px;
      bottom: 64px;
      left: 56px;
      text-align: justify;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.48px;
      .message-text {
        text-align: justify;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.48px;
      }
      .message-from {
        text-align: left;
        font-feature-settings: 'clig' off, 'liga' off;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: -0.48px;
      }
    }
  }
  /* 1024 < page < 1440 */
  @include media-max-width('lg') {
    width: 540px;
    height: 638px;
    background-image: $backgrounds-size-1024;
    .poem {
      width: 227px;
      top: 40px;
      left: 32px;
      .poem-title {
        text-align: center;
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: 48px; /* 200% */
        margin-bottom: 20px;
      }
      .poem-body {
        text-align: center;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 40px; /* 200% */
      }
    }
    .action-area {
      height: 79px;
      top: 48px;
      right: 32px;
    }
    .message {
      width: 190px;
      height: 180px;
      bottom: 48px;
      left: 32px;
      padding-left: 4px;
      .message-text {
        text-align: justify;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.42px;
      }
      .message-from {
        font-feature-settings: 'clig' off, 'liga' off;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: -0.42px;
      }
    }
  }
  /* 600 < page < 1024 */
  @include media-max-width('md') {
    width: 536px;
    height: 654px;
    background-image: $backgrounds-size-600;
    .poem {
      padding-top: 0;
      width: 227px;
      top: 119px;
      left: 50%;
      transform: translateX(-50%);
      .poem-title {
        text-align: center;
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: 48px; /* 200% */
        margin-bottom: 12px;
      }
      .poem-body {
        text-align: center;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px; /* 120% */
      }
    }
    .action-area {
      height: 55px;
      top: 40px;
      right: 50%;
      transform: translateX(50%);
    }
    .message {
      width: 193px;
      height: 159px;
      bottom: 40px;
      left: 40px;
      padding-left: 0;
      .message-text {
        text-align: left;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.42px;
      }
      .message-from {
        text-align: left;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }
    }
  }
  /* 360 < page < 600 */
  @include media-max-width('sm') {
    width: 320px;
    height: 704px;
    background-image: $backgrounds-size-360;
    .poem {
      width: 204px;
      top: 111px;
      left: 50%;
      transform: translateX(-50%);
      .poem-title {
        text-align: center;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 48px; /* 240% */
      }
      .poem-body {
        text-align: center;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px; /* 133.333% */
      }
    }
    .action-area {
      height: 55px;
      top: 32px;
      right: 50%;
      transform: translateX(50%);
    }
    .message {
      width: 256px;
      height: 102px;
      bottom: 275px;
      left: 50%;
      transform: translateX(-50%);
      .message-text {
        text-align: center;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.36px;
      }
      .message-from {
        text-align: center !important;
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }
    }
  }
}
</style>

<style>
.surpriseVideoDialog {
  .q-dialog__inner--minimized > div {
    max-width: none !important;
  }
}
</style>

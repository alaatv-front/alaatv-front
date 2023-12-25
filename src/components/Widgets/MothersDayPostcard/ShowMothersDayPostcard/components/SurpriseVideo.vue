<template>
  <div class="SurpriseVideo">
    <div class="header">
      <q-btn v-close-popup
             color="grey-1"
             flat>
        <q-icon name="ph:x"
                class="q-mr-xs" />
        بستن
      </q-btn>
    </div>
    <div class="player-wrapper">
      <video-player ref="videoPlayer"
                    :source="videoSource"
                    :poster="poster" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import VideoPlayer from 'src/components/VideoPlayer.vue'
export default defineComponent({
  name: 'SurpriseVideo',
  components: {
    VideoPlayer
  },
  props: {
    src: {
      type: String,
      default: ''
    },
    poster: {
      type: String,
      default: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/VideoPlayer1702464332.png'
    }
  },
  computed: {
    videoSource () {
      return {
        src: this.src,
        type: 'video/mp4',
        label: 'کیفیت بالا',
        res: 480
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.SurpriseVideo {
  /* page > 1920 */
  width: 960px;
  box-shadow: 0 2400px 4320px -720px rgba(21, 17, 51, 0.16);
  max-height: max-content !important;
  .header {
    height: 40px;
    display: flex;
    justify-content: flex-start;
    :deep(.q-btn) {

    }
  }

  /* 1440 < page < 1920 */
  @include media-max-width('xl') {
  }
  /* 1024 < page < 1440 */
  @include media-max-width('lg') {
    width: 720px;
  }
  /* 600 < page < 1024 */
  @include media-max-width('md') {
    width: 538px;
    $height: 32px;
    .header {
      height: $height;
      :deep(.q-btn) {
        height: $height;
        min-height: $height;
        max-height: $height;
      }
    }
  }
  /* 360 < page < 600 */
  @include media-max-width('sm') {
    width: 320px;
    $height: 29px;
    .header {
      height: $height;
      :deep(.q-btn) {
        height: $height;
        min-height: $height;
        max-height: $height;
      }
    }
  }
}
</style>

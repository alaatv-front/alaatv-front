<template>
  <div class="video-player-widget-container"
       :style="localOptions.style"
       :class="localOptions.customClass">
    <video-player ref="videoPlayer"
                  :key="playerKey"
                  :source="localOptions.url"
                  :poster="localOptions.poster"
                  :showBtn="localOptions.showBtn" />
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'
import VideoPlayer from 'src/components/VideoPlayer.vue'

export default {
  name: 'VideoPlayerWidget',
  components: { VideoPlayer },
  mixins: [mixinWidget],
  data () {
    return {
      defaultOptions: {
        src: '',
        url: '',
        poster: '',
        srcType: '',
        showBtn: true
      },
      playerKey: Date.now()
    }
  }
}
</script>

<style lang="scss" scoped>
.video-player-widget-container {
  overflow: hidden;
  border-radius: 24px;
  padding: 0 !important;
}
</style>

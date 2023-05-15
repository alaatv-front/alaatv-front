<template>
  <div class="video-player-widget-container"
       :style="options.style"
       :class="options.customClass">
    <video-player ref="videoPlayer"
                  :key="playerKey"
                  :source="options.url" />
  </div>
</template>

<script>
import VideoPlayer from 'src/components/VideoPlayer.vue'
import { mixinWidget } from 'src/mixin/Mixins'

export default {
  name: 'VideoPlayerWidget',
  components: { VideoPlayer },
  mixins: [mixinWidget],
  data() {
    return {
      url: '',
      defaultOptions: {
        src: '',
        url: '',
        poster: ''
      },
      playerKey: Date.now()
    }
  }
}
</script>

<style lang="scss" scoped>
.video-player-widget-container {
}
</style>

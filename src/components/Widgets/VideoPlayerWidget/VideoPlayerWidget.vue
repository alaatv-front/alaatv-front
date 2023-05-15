<template>
  <div class="video-player-widget-container"
       :style="localOptions.style"
       :class="localOptions.customClass">
    <video-player ref="videoPlayer"
                  :key="playerKey"
                  :source="url"
                  :poster="localOptions.poster" />
  </div>
</template>

<script>
import VideoPlayer from 'src/components/VideoPlayer.vue'
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'VideoPlayerWidget',
  components: { VideoPlayer },
  mixins: [mixinWidget],
  data() {
    return {
      url: '',
      playerKey: Date.now()
    }
  },
  mounted() {
    this.setSource()
  },
  methods: {
    setSource() {
      this.url = this.options.url
    }
  }
}
</script>

<style lang="scss" scoped>
.video-player-widget-container {
}
</style>

<template>
  <div class="video-player-widget-container"
       :style="options.style"
       :class="options.customClass">
    <video-player ref="videoPlayer"
                  :key="playerKey"
                  :source="url" />
  </div>
</template>

<script>
import VideoPlayer from 'src/components/VideoPlayer.vue'

export default {
  name: 'VideoPlayerWidget',
  components: { VideoPlayer },
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          playerKey: Date.now()
        }
      }
    }
  },
  data() {
    return {
      url: ''
    }
  },
  watch: {
    options: {
      handler() {
        this.setSource()
      },
      deep: true
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

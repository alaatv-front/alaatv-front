<template>
  <div class="row">
    <div class="col-12">
      <div class="row items-center justify-center">
        <div class="col-6">
          <!--          <video-player :source="source" />-->
          <video ref="videoPlayer"
                 dir="ltr"
                 class="video-js vjs-fluid vjs-big-play-centered vjs-show-big-play-button-on-pause"
                 controls
                 preload="none">
            <p class="vjs-no-js">
              To view this video please enable JavaScript, and consider upgrading to a web browser that
              <a href="https://videojs.com/html5-video-support/"
                 target="_blank">
                supports HTML5 video
              </a>
            </p>
          </video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import videojs from 'video.js'
// import VideoPlayer from 'src/components/DashboardAbrisham/VideoPlayer.vue'

// let VideojsQualitySelector
// if (typeof window !== 'undefined') {
//   // require('@silvermine/videojs-quality-selector')(videojs)
// import('@silvermine/videojs-quality-selector')
//   //   .then((VQS) => {
//   //     // VideojsQualitySelector = VQS
//   //     console.log('VQS', VQS)
//   //   })
// }

export default {
  name: 'debug',
  // components: { VideoPlayer },
  data() {
    return {
      player: null,
      source: [
        {
          src: 'https://nodes.alaatv.com/media/1374/HD_720p/1374002okij.mp4',
          type: 'mp4',
          label: 'کیفیت عالی'
        },
        {
          src: 'https://nodes.alaatv.com/media/1374/hq/1374002okij.mp4',
          type: 'mp4',
          label: 'کیفیت بالا'
        },
        {
          src: 'https://nodes.alaatv.com/media/1374/240p/1374002okij.mp4',
          type: 'mp4',
          label: 'کیفیت متوسط'
        }
      ]
    }
  },
  mounted() {
    this.initPlayer()
  },
  methods: {
    initPlayer () {
      this.player = videojs(this.$refs.videoPlayer)
      // this.player.src = this.source
      this.player.src(this.source[0].src)
    }
  }
}

</script>

<style lang="scss">
//@import "video.js/dist/video-js.css";
</style>

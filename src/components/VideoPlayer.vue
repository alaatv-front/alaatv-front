<template>
  <div class="video-box-container flex justify-center">
    <video id="my-video"
           ref="videoPlayer"
           controls
           preload="auto"
           :height="calcTheHeight"
           :width="calcTheWidth"
           class="video-js vjs-fluid vjs-big-play-centered vjs-show-big-play-button-on-pause"
           @play="playVideo">
           <!-- <source src="https://example.com/index.m3u8"
              type="application/x-mpegURL"> -->
    </video>
  </div>
</template>

<script>
import videojs from 'video.js'
import videojsBrand from 'videojs-brand'
import fa from 'video.js/dist/lang/fa.json'
import { PlayerSourceList } from 'src/models/PlayerSource'
import { mixinWidget } from 'src/mixin/Mixins'

// require('video.js/dist/video-js.css')
// import { VideojsQualitySelector } from '@silvermine/videojs-quality-selector'
// VideojsQualitySelector(videojs)
// require('@silvermine/videojs-quality-selector')(videojs)
// require('@silvermine/videojs-quality-selector/dist/css/quality-selector.css')

export default {
  name: 'VideoPlayer',
  mixins: [mixinWidget],
  props: {
    sources: {
      type: [String, PlayerSourceList],
      default: new PlayerSourceList()
    },
    hlsSource: {
      type: String,
      default: ''
    },
    poster: {
      type: String,
      default: ''
    },
    keepCalculating: {
      type: Boolean,
      default() {
        return true
      }
    },
    currentTimed: {
      type: Number
    }
  },
  emits: ['seeked'],
  data() {
    return {
      videoOptions: {
        controlBar: {
          TimeDivider: true,
          children: [
            'playToggle',
            'PlaybackRateMenuButton',
            'CurrentTimeDisplay',
            'progressControl',
            'TimeDivider',
            'RemainingTimeDisplay',
            'volumePanel',
            'SubtitlesButton',
            'qualitySelector',
            'fullscreenToggle'
          ],
          volumePanel: {
            inline: false,
            vertical: true
          }
        },
        language: 'fa',
        languages: {
          fa
        },
        html5: {
          vhs: {
            withCredentials: true
          }
        },
        autoplay: false,
        controls: true,
        playbackRates: [0.25, 0.5, 1, 1.5, 2],
        nativeControlsForTouch: true,
        sources: [],
        poster: null
      },
      player: null
    }
  },
  computed: {
    calcTheHeight() {
      return '100%'
    },
    calcTheWidth() {
      return '100%'
    },
    currentTime() {
      return this.currentTimed
    }
  },
  watch: {
    sources: function (val) {
      this.reloadPlayerSources()
    },
    currentTime(time) {
      this.player.currentTime(time)
    }
  },
  created() {
    this.setOptions()
  },
  mounted() {
    this.initPlayer()
    this.player.on('seeked', (event) => {
      this.$emit('seeked', this.player.currentTime())
    })
  },
  beforeUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  },
  methods: {
    playVideo() {
      this.$emit('play', this.player.duration())
    },
    initPlayer() {
      videojs.registerPlugin('brand', videojsBrand)
      this.player = videojs(this.$refs.videoPlayer, this.videoOptions, this.onPlayerReady)
      this.player.brand({
        image: 'https://nodes.alaatv.com/upload/alaa-logo-small.png',
        title: 'alaatv',
        destination: 'https://alaatv.com',
        destinationTarget: '_blank'
      })
      if (this.sources.list) {
        this.player.src(this.sources.list)
      } else {
        this.player.src({
          src: this.sources,
          type: 'application/x-mpegURL'
        })
        // this.player.src(this.sources)
      }
    },
    onPlayerReady() {
      // this.player.on('timeupdate', function () {
      //   if (this.keepCalculating) {
      //     this.calcWatchedPercentage(this.player.currentTime(), this.player.duration())
      //   }
      //   document.querySelector('.video-js').focus()
      //   if (!this.player.paused() && !this.player.userActive()) {
      //     this.videoStatus(false)
      //   } else if (!this.player.paused()) {
      //     this.videoStatus(true)
      //   }
      // })
    },
    setOptions() {
      this.setSources()
      this.setPoster()
    },
    setSources() {
      if (this.sources.list) {
        this.videoOptions.sources = this.sources.list
      } else {
        this.videoOptions.sources = this.hlsSource
      }
    },
    setPoster() {
      this.videoOptions.poster = this.poster
    },
    reloadPlayerSources() {
      if (!this.player) {
        return
      }
      this.player.src(this.sources.list)
      this.player.poster(this.poster)
    },
    calcWatchedPercentage(currentTime, duration) {
      const watchedPercentage = ((currentTime / duration) * 100)
      const videoPlayerTimeData = {
        currentTime,
        duration,
        watchedPercentage
      }
      this.$emit('calcTimeData', videoPlayerTimeData)
    },
    videoStatus(val) {
      this.videoIsPlaying = val
    }
  }
}
</script>

<style lang="scss">
@import "video.js/dist/video-js.css";
@import "@silvermine/videojs-quality-selector/dist/css/quality-selector.css";

.video-box-container{
  border-radius: inherit;
  width: 100%;
}
.video-js {
  border-radius: inherit;
  .vjs-tech{
    border-radius: inherit;
  }
  .my-video_html5_api{
    border-radius: inherit;
  }
}
.vjs-poster{
  border-radius: inherit;
}
  #my-video .vjs-big-play-button {
    border: none;
    width: 80px;
    height: 80px;
    line-height: 2em;
    top: 50%;
    margin-left: -1em;
    color: #fff;
    background-color: #FFB74D;
    box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
    font-size: 52px;
    border-radius: 20px;
    -moz-border-radius: 100px;
    -webkit-border-radius: 100px;
    margin-top: -0.817em;
  }

  .video-js .vjs-big-play-button .vjs-icon-placeholder:before {
    content: "\f4cd";
    left: -12px;
    top: -10px;
    font-size: 110px;
    font-family: iconsax;
    border: none !important;
    box-shadow: none !important;
  }

  .vjs-control-bar {
    .vjs-volume-panel {
      .vjs-volume-control {
        right: -45px !important;
      }
    }
  }

  .vjs-brand-container {
    .vjs-brand-container-link {
      img {
        height: 25px;
        padding-top: 3px;
      }
    }
  }

  .vjs-progress-control {
    .vjs-progress-holder {
      .vjs-play-progress::before {
        left: -8px ;
        right: auto ;
      }
    }
  }
</style>

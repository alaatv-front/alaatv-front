<template>
  <div ref="videoPlayerWrapper"
       style="width: 100%;"
       class="vPlayer">
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
    <div v-if="useSideBar"
         ref="toggleTimePointsBtn">
      <q-btn icon-right="isax:menu-1"
             size="sm"
             color="primary"
             @click="toggleSideBar" />
    </div>
    <div ref="sideBar"
         class="over-player-wrapper"
         :class="{'show': localSideBar, 'hide': !localSideBar}">
      <slot name="sideBar" />
    </div>
  </div>
</template>

<script>
import videojs from 'video.js'
import fa from 'video.js/dist/lang/fa.json'
import videoJsResolutionSwitcher from 'src/assets/js/videoJsResolutionSwitcher.js'

import 'videojs-hls-quality-selector'
import 'videojs-contrib-quality-levels'

// https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8 (Live)
// https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8

import { Content } from 'src/models/Content'
import { mixinAbrisham } from 'src/mixin/Mixins'
import { PlayerSourceList } from 'src/models/PlayerSource'
export default {
  name: 'VideoPlayer',
  mixins: [mixinAbrisham],
  props: {
    source: {
      type: [String, PlayerSourceList],
      default: null
    },
    timePoints: {
      type: Array,
      default () {
        return []
      }
    },
    useSideBar: {
      type: Boolean,
      default: false
    },
    poster: {
      type: String,
      default () {
        return ''
      }
    },
    sideBar: {
      type: Boolean,
      default: true
    },
    keepCalculating: {
      type: Boolean,
      default () {
        return true
      }
    },
    bookmarkLoading: {
      type: Boolean,
      default () {
        return false
      }
    },
    currentTimed: {
      type: Number
    }
  },
  emits: ['seeked'],
  data() {
    return {
      drawer: false,
      player: null,
      localSideBar: false,
      favLoading: false,
      options: {
        myItems: [{
          name: 'test'
        }],
        controlBar: {
          // currentTimeDisplay: true,
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
            'QualitySelector',
            'fullscreenToggle',
            'PictureInPictureToggle'
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
        autoplay: false,
        controls: true,
        playbackRates: [0.25, 0.5, 1, 1.5, 2, 2.5, 3, 4],
        nativeControlsForTouch: true,
        sources: [],
        poster: null,
        plugins: {
          // hotkeys: {
          //   enableModifiersForNumbers: false,
          //   seekStep: 5,
          //   enableMute: true,
          //   enableVolumeScroll: true,
          //   enableHoverScroll: true,
          //   enableFullscreen: true
          // }
        }
      },
      videoIsPlaying: false,
      currentContent: new Content(),
      postIsFavored: {}
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
    source: function () {
      this.reInitVideo()
    },
    currentTime(time) {
      this.player.currentTime(time)
    },
    sideBar(newValue) {
      this.localSideBar = newValue
    }
  },
  created() {
    this.setPoster()
    this.setSources()
  },
  mounted() {
    this.initPlayer()
    this.moveSideBarElementIntoVideoPlayerElements()
    if (this.useSideBar) {
      this.moveSideBarToggleBtnIntoVideoPlayerElements()
    }
  },
  beforeUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  },
  methods: {
    initPlayer () {
      if (this.isPlayerSourceList(this.source)) { // old multiple quality type
        videoJsResolutionSwitcher(videojs)
        this.options.plugins.videoJsResolutionSwitcher = {
          default: 'کیفیت بالا',
          dynamicLabel: true
        }
      }
      this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
        // this.on('timeupdate', function () {
        //   if (that.keepCalculating) {
        //     that.calcWatchedPercentage(this.currentTime(), this.duration())
        //   }
        //   // document.querySelector('.video-js').focus()
        //   if (that.$refs.videoPlayer) {
        //     that.$refs.videoPlayer.focus()
        //   }

        //   // this.player.el().focus()

        //   if (!that.player.paused() && !that.player.userActive()) {
        //     that.videoStatus(false)
        //   } else if (!that.player.paused()) {
        //     that.videoStatus(true)
        //   }
        // })
      })

      if (typeof this.source === 'string' && this.source.includes('.m3u8')) { // hls type
        this.player.hlsQualitySelector()
      }

      this.player.on('seeked', (event) => {
        this.$emit('seeked', this.player.currentTime())
      })
    },
    changeCurrentTime (time) {
      if (!this.player) {
        return
      }
      this.player.currentTime(time)
    },
    injectDomeElement (elementClass, refKey) {
      const div = document.createElement('div')
      div.classList = elementClass
      div.appendChild(this.$refs[refKey])
      this.$refs.videoPlayerWrapper.querySelector('.video-js').appendChild(div)
    },
    moveSideBarElementIntoVideoPlayerElements () {
      this.injectDomeElement('over-player-wrapper-div', 'sideBar')
    },
    moveSideBarToggleBtnIntoVideoPlayerElements () {
      this.injectDomeElement('toggleTimePointsBtn-wrapper', 'toggleTimePointsBtn')
    },
    toggleSideBar () {
      this.localSideBar = !this.localSideBar
      this.$emit('update:sideBar', this.localSideBar)
    },
    activate(time) {
      this.player.currentTime(time)
      this.player.play()
      const requiredElement = document.querySelector('.video-js')
      requiredElement.focus()
    },
    setSources() {
      const source = this.isPlayerSourceList() ? this.source.list : this.source
      this.options.sources = source
    },
    setPoster() {
      this.options.poster = this.poster
    },
    reInitVideo() {
      const source = this.isPlayerSourceList() ? this.source.list : this.source
      this.player.src(source)
      this.player.poster(this.poster)
    },
    isPlayerSourceList () {
      return (this.source && this.source.list && Array.isArray(this.source.list))
    },
    toggleFavorite(id, event) {
      const that = this
      let count = -1
      this.timePoints.forEach(function (item, index) {
        count++
        if (parseInt(item.id) === parseInt(id)) {
          item.loading = true
          item.isFavored = !item.isFavored
          that.postIsFavored = {
            id: item.id,
            isFavored: item.isFavored,
            numberOfTimestamp: count
          }
        }
      })
      const requiredElement = document.querySelector('.video-js')
      requiredElement.focus()
      this.$emit('toggleBookmark', this.postIsFavored)
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
.vPlayer {
  overflow: hidden;
  .over-player-wrapper-div {
    .over-player-wrapper {
      position: absolute;
      top: 0;
      right: 2000px;
      width: 100%;
      height: 100%;
      color: initial;
      transition: 0.2s;
      direction: ltr;
      &.show {
        right: 0;
      }
      &.hide {
        right: 2000px;
      }
    }
  }
  .toggleTimePointsBtn-wrapper {
    position: absolute;
    top: 5px;
    left: 5px;
  }
  .video-js {
    .vjs-loading-spinner {
      right: 50%;
      margin: -25px -25px 0 0;
      text-align: right;
    }
    .vjs-volume-panel {
      .vjs-volume-control {
        right: -3.5em;
        margin-right: -1px;
      }
    }
    .vjs-big-play-button {
      color: white;
      width: 80px;
      height: 80px;
      margin-top: -1em;
      margin-left: -1em;
      border-radius: 100%;
      background: var(--alaa-Primary);
      border-color: var(--alaa-Primary);
      .vjs-icon-placeholder:before {
        display: flex;
        font-size: 65px;
        align-items: center;
        justify-content: center;
      }
    }
    .vjs-resolution-button {
      .vjs-menu-button {
        .vjs-icon-placeholder {
          &:before {
            content: "\f114";
            font-style: normal;
            font-weight: normal;
            font-family: VideoJS;
          }
        }
      }
    }
  }
}
</style>

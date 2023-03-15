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
// require('@silvermine/videojs-quality-selector/dist/css/quality-selector.css')
// require('@silvermine/videojs-quality-selector')(videojs)

// let VideojsQualitySelector
// if (typeof window !== 'undefined') {
//   // require('@silvermine/videojs-quality-selector')(videojs)
// import('@silvermine/videojs-quality-selector')
//   //   .then((VQS) => {
//   //     // VideojsQualitySelector = VQS
//   //     console.log('VQS', VQS)
//   //   })
// }

import videoJsResolutionSwitcher from 'src/assets/js/videoJsResolutionSwitcher.js'

// import 'videojs-hls-quality-selector'
// import 'videojs-contrib-quality-levels'

// QualitySelector(videojs)
// eslint-disable-next-line no-unused-vars
// import 'videojs-resolution-switcher'
// import('@silvermine/videojs-quality-selector')
// import hotkeys from 'videojs-hotkeys'
import { Content } from 'src/models/Content'
import { mixinAbrisham } from 'src/mixin/Mixins'
export default {
  name: 'VideoPlayer',
  mixins: [mixinAbrisham],
  props: {
    source: {
      type: [String, Array],
      default () {
        return []
      }
    },
    timePoints: {
      type: Array,
      default () {
        return []
      }
    },
    useSideBar: {
      type: Boolean,
      default: true
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
      // const that = this
      const multpleSources = Array.isArray(this.source)
      if (multpleSources) {
        videoJsResolutionSwitcher(videojs)
        // this.options.plugins.videoJsResolutionSwitcher = {
        //   default: 'high',
        //   dynamicLabel: true
        // }
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

      // this.player.hlsQualitySelector()
      this.player.on('seeked', (event) => {
        this.$emit('seeked', this.player.currentTime())
      })
      // const MenuButton = videojs.getComponent('MenuButton')
      // const MenuItem = videojs.getComponent('MenuItem')
      // const CustomMenuButton = videojs.extend(
      //   MenuButton,
      //   {
      //     createItems: function() {
      //       // Must return an array of `MenuItem`s
      //       // Options passed in `addChild` are available at `this.options_`
      //       return this.options().myItems.map(function(i) {
      //         const item = new MenuItem(player, { label: i.name })
      //         item.handleClick = function() { /* ... */ }
      //         return item
      //       })
      //     }
      //   }
      // )

      // // Register as a component, so it can be added
      // videojs.registerComponent('CustomMenuButton', CustomMenuButton)

      // // Use `addChild` to add an instance of the new component, with options
      // this.player.controlBar.addChild('CustomMenuButton', {
      //   title: 'My menu',
      //   myItems: [{ name: 'Hello' }, { name: 'World' }]
      // })
      // const timeStamp = document.getElementById('videoPlayer-timeStamp')
      // this.player.el().appendChild(timeStamp)
      // this.player.on('timeupdate', function () {
      //     if(that.player.isFullscreen()){
      //                 // var timeStamp = document.getElementById('videoPlayer').requestFullscreen();
      //                 // if(!timeStamp)
      //                 // if (!document.fullscreenElement) {
      //                 //     timeStamp.requestFullscreen().catch(err => {
      //                 //         alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      //                 //     });
      //                 //     }
      //                 //      else {
      //                 //     document.exitFullscreen();
      //                 // }

      //     }
      //     console.log('player.isFullscreen()' , that.player.isFullscreen());
      // })
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
      this.options.sources = this.source
      console.log('this.source', this.source)
      // const multpleSources = Array.isArray(this.source)
      // if (multpleSources) {
      //   this.player.updateSrc(this.source)
      // } else {
      //   this.options.sources = this.source
      // }
    },
    setPoster() {
      this.options.poster = this.poster
    },
    reInitVideo() {
      this.player.src(this.source)
      this.player.poster(this.poster)
    },
    toggleFavorite(id, event) {
      const that = this
      let count = -1
      // let currentTimepointIndex = null
      this.timePoints.forEach(function (item, index) {
        count++
        if (parseInt(item.id) === parseInt(id)) {
          // currentTimepointIndex = index
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
      // setTimeout(function() { that.timePoints[currentTimepointIndex].loading = false }, 200) // vue/no-mutating-props
    },
    // postIsFavored(timeStampData){
    //     var postStatus = 'unfavored'
    //     if (timeStampData.isFavored){
    //         postStatus = 'favored'
    //     }
    //     // /api/v2/timepoint/{timepoint_id}/favored
    //     axios.post('/api/v2/c/timepoint/' + parseInt(timeStampData.id) + '/'+ postStatus)
    //         .then(response => {
    //             if (response.status === 200){
    //                 this.timePoints.forEach( function (item) {
    //                     if (parseInt(item.id) === parseInt(timeStampData.id)) {
    //                         item.loading = false
    //                     }
    //                 })
    //             }
    //         })
    //         .catch(err => console.error(err));
    // },
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
}
</style>

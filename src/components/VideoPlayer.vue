<template>
  <div ref="videoPlayerWrapper"
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

    <div class="VastElements">
      <div ref="VastTimerBtn"
           class="VastElement VastTimerBtn hide" />
      <div ref="VastSkipAdBtn"
           class="VastElement VastSkipAdBtn hide">
        رد کردن
      </div>
      <div ref="VastLinkBtn"
           class="VastElement VastLinkBtn hide">
        اطلاعات بیشتر
      </div>
    </div>

    <div v-if="useOverPlayer && !isInVastMode"
         ref="overPlayer"
         class="over-player-wrapper">
      <q-btn icon-right="isax:menu-1"
             size="sm"
             color="primary"
             class="toggleSideBarBtn"
             @click="toggleSideBar" />
      <div class="over-player-slot"
           :class="{'show': localOverPlayer, 'hide': !localOverPlayer}"
           :style="{width: overPlayerWidth}">
        <slot name="overPlayer" />
      </div>
    </div>
  </div>
</template>

<script>
import 'videojs-contrib-ads'
import videojs from 'video.js'
import 'videojs-hls-quality-selector'
import videojsBrand from 'videojs-brand'
import fa from 'video.js/dist/lang/fa.json'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinAbrisham } from 'src/mixin/Mixins.js'
import { PlayerSourceList } from 'src/models/PlayerSource.js'
import videoJsResolutionSwitcher from 'src/assets/js/videoJsResolutionSwitcher.js'

// https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8 (Live)
// https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8

export default {
  name: 'VideoPlayer',
  mixins: [mixinAbrisham],
  props: {
    hasVast: {
      type: Boolean,
      default: false
    },
    source: {
      type: [String, PlayerSourceList],
      default: null
    },
    useOverPlayer: {
      type: Boolean,
      default: false
    },
    poster: {
      type: String,
      default () {
        return ''
      }
    },
    overPlayer: {
      type: Boolean,
      default: true
    },
    overPlayerWidth: {
      type: String,
      default: '100%'
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
  emits: ['seeked', 'update:sideBar'],
  data() {
    return {
      isInVastMode: false,
      vastSrc: null,
      vastLink: null,
      vastSkipOffset: null,
      vastStartOffset: null,
      vastTimerInterval: null,
      width: '',
      showVastElements: false,
      drawer: false,
      player: null,
      localOverPlayer: false,
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
            inline: true,
            vertical: true
          }
        },
        language: 'fa',
        languages: {
          fa
        },
        responsive: true,
        autoplay: false,
        controls: true,
        playbackRates: [0.5, 1, 1.5, 2, 3, 4],
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
    source: {
      handler () {
        if (typeof window === 'undefined') {
          return
        }
        this.$nextTick(() => {
          this.reInitVideo()
        })
      },
      immediate: true
    },
    currentTime(time) {
      this.player.currentTime(time)
    },
    overPlayer(newValue) {
      this.localOverPlayer = newValue
    },
    useOverPlayer (newValue) {
      if (!newValue) {
        return
      }

      this.$nextTick(() => {
        this.moveSideBarElementIntoVideoPlayerElements()
      })
    }
  },
  created() {
    this.width = this.overPlayerWidth
    this.setPoster()
    this.setSources()
  },
  mounted() {
    // this.initPlayer()
    if (this.useOverPlayer) {
      this.$nextTick(() => {
        this.moveSideBarElementIntoVideoPlayerElements()
      })
    }
  },
  beforeUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  },
  methods: {
    getVast () {
      return APIGateway.vast.getXml()
        .then((vastXml) => {
          this.startVast(vastXml)
        })
        .catch(() => {
        })
    },
    showVastElement (vastClassName) {
      this.removeVastClass(vastClassName, 'hide')
      this.addVastClass(vastClassName, 'show')
    },
    hideVastElement (vastClassName) {
      this.removeVastClass(vastClassName, 'show')
      this.addVastClass(vastClassName, 'hide')
    },
    addVastClass (vastClassName, classValue) {
      const vastElement = this.vastElementExist(vastClassName)
      if (!vastElement) {
        return false
      }

      vastElement.classList.add(classValue)
    },
    removeVastClass (vastClassName, classValue) {
      const vastElement = this.vastElementExist(vastClassName)
      if (!vastElement) {
        return false
      }

      vastElement.classList.remove(classValue)
    },
    vastElementExist (vastClassName) {
      const vastElement = this.$refs.videoPlayerWrapper.getElementsByClassName(vastClassName)[0]
      if (!vastElement) {
        return false
      }

      return vastElement
    },
    loadVastDomElements () {
      this.injectDomeElement(this.$refs.VastTimerBtn)
      this.injectDomeElement(this.$refs.VastSkipAdBtn)
      this.injectDomeElement(this.$refs.VastLinkBtn)
    },
    showVastLinkBtn (link, title = 'اطلاعات بیشتر') {
      this.showVastElement('VastLinkBtn')
      this.updateVastElementInnerHTML('VastLinkBtn', '<a href="' + link + '" target="_blank">' + title + '</a>')
    },
    stopVastTimer () {
      if (this.vastTimerInterval) {
        clearInterval(this.vastTimerInterval)
      }
      this.updateVastTimer(0)
      this.hideVastElement('VastTimerBtn')
    },
    startVastTimer (endTimerCallback) {
      this.showVastElement('VastTimerBtn')
      if (this.vastTimerInterval) {
        clearInterval(this.vastTimerInterval)
      }
      let seconds = this.getVastTimerSeconds()
      if (seconds === 0) {
        this.stopVastTimer()
        return
      }
      this.updateVastTimer(seconds--)
      this.vastTimerInterval = setInterval(() => {
        this.updateVastTimer(seconds--)
        if (seconds < 0) {
          this.stopVastTimer()
          endTimerCallback()
        }
      }, 1000)
    },
    getVastTimerSeconds () {
      if (!this.vastSkipOffset) {
        return 0
      }

      const array = this.vastSkipOffset.split(':')
      return (array[0] * 60 * 60) + (array[1] * 60) + array[2]
    },
    updateVastTimer (timer) {
      this.updateVastElementInnerHTML('VastTimerBtn', timer + ' ثانیه')
    },
    updateVastElementInnerHTML (vastClassName, innerHTML) {
      const vastElement = this.vastElementExist(vastClassName)
      if (!vastElement) {
        return false
      }

      vastElement.innerHTML = innerHTML
    },
    sowVastSkipAdBtn () {
      const vastClassName = 'VastSkipAdBtn'
      this.showVastElement(vastClassName)
      const vastElement = this.vastElementExist(vastClassName)
      if (!vastElement) {
        return false
      }
      vastElement.addEventListener('click', (event) => {
        this.player.ads.endLinearAdMode()
        this.player.controlBar.progressControl.enable()
        this.hideVastElement('VastTimerBtn')
        this.hideVastElement('VastSkipAdBtn')
        this.hideVastElement('VastLinkBtn')
        this.isInVastMode = false
      })
    },
    loadVast () {
      this.player.ads({
        debug: false,
        allowVjsAutoplay: true
        // contentIsLive: false,
        // debug: true,
        // liveCuePoints: false,
        // postrollTimeout: 5000,
        // prerollTimeout: 5000,
        // stitchedAds: false,
        // timeout: 5000
      })

      // request ads whenever there's new video content
      this.player.on('contentchanged', function() {
        // in a real plugin, you might fetch new ad inventory here
        this.player().trigger('adsready')
      })

      this.player.on('readyforpreroll', () => {
        this.isInVastMode = true
        this.player.ads.startLinearAdMode()

        this.loadVastDomElements()

        this.showVastLinkBtn(this.vastLink)
        this.startVastTimer(() => {
          this.sowVastSkipAdBtn()
        })

        // play your linear ad content
        // in this example, we use a static mp4
        // this.player.src('https://nodes.alaatv.com/upload/vast/videos/HD_720p/pre_roll_nahayi.mp4')
        this.player.src(this.vastSrc)
        this.player.controlBar.progressControl.disable()
        this.player.reset()
        this.player.play()

        // send event when ad is playing to remove loading spinner
        this.player.one('adplaying', () => {
          this.player.trigger('ads-ad-started')
          this.$emit('adStarted')
        })

        // resume content when all your linear ads have finished
        this.player.one('adended', () => {
          this.isInVastMode = false
          this.endVast(this.player)
        })

        // this.player.one('adskip', () => {
        //   this.endVast(this.player)
        // })
      })

      if (this.hasVast) {
        this.getVast()
      }
    },
    startVast (vastXml) {
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(vastXml, 'text/xml')
      this.vastSrc = xmlDoc.getElementsByTagName('MediaFile')[0].childNodes[0].nodeValue
      this.vastLink = xmlDoc.getElementsByTagName('ClickThrough')[0].childNodes[0].nodeValue
      this.vastStartOffset = xmlDoc.getElementsByTagName('Linear')[0].getAttribute('startoffset')
      this.vastSkipOffset = xmlDoc.getElementsByTagName('Linear')[0].getAttribute('skipoffset')

      // in a real plugin, you might fetch ad inventory here
      this.player.trigger('adsready')
    },
    endVast (player, withoutReset = true) {
      if (!player) {
        player = this.palyer
      }
      player.ads.endLinearAdMode()
      player.controlBar.progressControl.enable()
      if (withoutReset) {
        player.reset()
        player.play()
      }
      this.hideVastElement('VastTimerBtn')
      this.hideVastElement('VastSkipAdBtn')
      this.hideVastElement('VastLinkBtn')
    },
    focusOnPlayer () {
      this.player.el().focus()
    },
    setPlayerBrand () {
      this.player.brand({
        image: 'https://nodes.alaatv.com/upload/landing/chatr/alaa%20logo.png?w=30&h=30',
        title: 'آلاء',
        destination: '/',
        destinationTarget: '_blank'
      })
    },
    redefineTap () {
      this.player.on('touchend', function() { // tap
        if (this.player().controls()) {
          if (this.player().paused()) {
            this.player().play()
          } else {
            this.player().pause()
          }
        }
      })
    },
    hasPlugin (pluginName) {
      return Object.keys(videojs.getPlugins()).includes(pluginName)
    },
    initPlayer () {
      if (!this.hasPlugin('brand')) {
        videojs.registerPlugin('brand', videojsBrand)
      }
      if (this.isPlayerSourceList(this.source) && !this.hasPlugin('videoJsResolutionSwitcher')) { // old multiple quality type
        videoJsResolutionSwitcher(videojs)
        this.options.plugins.videoJsResolutionSwitcher = {
          default: 'کیفیت بالا',
          dynamicLabel: true
        }
      }

      this.player = videojs(this.$refs.videoPlayer, this.options)
      this.loadVast()
      this.player.ready(() => {
        this.setPlayerBrand()
        this.focusOnPlayer()
        this.redefineTap()
        // this.on('timeupdate', function () {
        //   if (that.keepCalculating) {
        //     that.calcWatchedPercentage(this.currentTime(), this.duration())
        //   }
        //   // document.querySelector('.video-js').focus()
        //   if (that.$refs.videoPlayer) {
        //     that.$refs.videoPlayer.focus()
        //   }

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

      this.player.on('seeked', () => {
        this.$emit('seeked', this.player.currentTime())
      })

      // const events = [
      //   'loadstart',
      //   'progress',
      //   'suspend',
      //   'abort',
      //   'error',
      //   'emptied',
      //   'stalled',
      //   'loadedmetadata',
      //   'loadeddata',
      //   'canplay',
      //   'canplaythrough',
      //   'playing',
      //   'waiting',
      //   'seeking',
      //   'seeked',
      //   'ended',
      //   'durationchange',
      //   'timeupdate',
      //   'play',
      //   'pause',
      //   'ratechange',
      //   'resize',
      //   'volumechange'
      // ]
      //
      // events.forEach(event => {
      //   this.player.on(event, () => {
      //     console.log('event: ', event)
      //     console.log('sources: ', this.player.sources)
      //   })
      // })
    },
    changeCurrentTime (time) {
      if (!this.player) {
        return
      }
      this.player.currentTime(time)
    },
    injectDomeElement (element) {
      this.$refs.videoPlayerWrapper.querySelector('.video-js').appendChild(element)
    },
    createDomeElement (elementClass, refKey) {
      const div = document.createElement('div')
      div.classList = elementClass
      const child = this.$refs[refKey].$el ? this.$refs[refKey].$el : this.$refs[refKey]
      div.appendChild(child)
      this.$refs.videoPlayerWrapper.querySelector('.video-js').appendChild(div)
    },
    moveSideBarElementIntoVideoPlayerElements () {
      this.createDomeElement('over-player-wrapper-div', 'overPlayer')
    },
    toggleSideBar () {
      this.localOverPlayer = !this.localOverPlayer
      // this.$emit('update:sideBar', this.localOverPlayer)
    },
    activate(time) {
      this.player.currentTime(time)
      this.player.play()
      const requiredElement = document.querySelector('.video-js')
      requiredElement.focus()
    },
    setSources() {
      this.options.sources = this.isPlayerSourceList() ? this.source.list : this.source
    },
    setPoster() {
      this.options.poster = this.poster
    },
    reInitVideo() {
      if (this.player?.reset) {
        this.player.reset()
      }
      // this.player.dispose()
      this.setPoster()
      this.setSources()
      this.initPlayer()
      const source = this.isPlayerSourceList() ? this.source.list : this.source
      this.player.src(source)
      this.player.poster(this.poster)
    },
    isPlayerSourceList () {
      return (this.source && this.source.list && Array.isArray(this.source.list))
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
  width: 100%;
  overflow: hidden;
  .VastElements {
    display: none;
  }
  .VastElement {
    position: absolute;
    bottom: 60px;
    height: 50px;
    border: solid 2px $primary;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 1s;
    &.VastTimerBtn {
      $width: 150px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-left: none;
      width: $width;
      cursor: not-allowed;
      &.show {
        left: 0;
      }
      &.hide {
        left: -$width;
      }
    }
    &.VastSkipAdBtn {
      $width: 150px;
      left: 0;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-left: none;
      width: $width;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      &.show {
        left: 0;
      }
      &.hide {
        left: -$width;
      }
    }
    &.VastLinkBtn {
      $width: 150px;
      right: 0;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: none;
      width: $width;
      &.show {
        right: 0;
      }
      &.hide {
        right: -$width;
      }
      a {
        width: 100%;
        height: 100%;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
      }
    }
  }
  .over-player-wrapper-div {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 1;
    .over-player-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      .over-player-slot {
        left: 2000px;
        height: 100%;
        color: initial;
        transition: 0.4s;
        direction: ltr;
        position: relative;
        z-index: 1;
        &.show {
          right: 0;
        }
        &.hide {
          width: 0 !important;
          right: 2500px;
        }
      }
    }
  }
  .toggleSideBarBtn {
    position: absolute;
    top: 5px;
    left: 5px;
    z-index: 2;
  }
  .video-js {
    background-color: transparent;
    .vjs-loading-spinner {
      right: 50%;
      margin: -25px -25px 0 0;
      text-align: right;
    }
    .vjs-big-play-button {
      color: white;
      width: 80px;
      height: 80px;
      border-radius: 100%;
      background: $primary;
      border-color: $primary;

      @media screen and(max-width: 600px) {
        margin-top: -60px;
      }
      .vjs-icon-placeholder:before {
        display: flex;
        font-size: 65px;
        align-items: center;
        justify-content: center;
      }
    }
    .vjs-control-bar {
      z-index: 2;
      .vjs-volume-panel {
        .vjs-volume-control {
          // right: -3.5em;
          // margin-right: -1px;
        }
      }
      .vjs-resolution-button {
        .vjs-menu-button {
          .vjs-icon-placeholder {
            &:before {
              content: "\f114";
              font-style: normal;
              font-weight: normal;
              font-family: VideoJS, Arial, serif;
            }
          }
        }
      }
    }
    .vjs-play-progress {
      &:before {
        /*rtl:ignore*/
        right: -0.5em;
        /*rtl:ignore*/
        left: auto;
      }
    }
    .vjs-volume-tooltip {
      float: right;
    }
    .vjs-volume-level {
      right: 0;
    }
  }
}

.vjs-slider-horizontal .vjs-volume-level:before {
  left: 0;
  right: auto;
}
.video-js .vjs-volume-level {
    /* right: 0; */
}
.video-js .vjs-volume-tooltip {
    /* float: left; */
}
.vPlayer .video-js .vjs-control-bar .vjs-volume-panel .vjs-volume-control {
    /* left: -3.5em; */
    /* margin-left: -1px; */
}
</style>

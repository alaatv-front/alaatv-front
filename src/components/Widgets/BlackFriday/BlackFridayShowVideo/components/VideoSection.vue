<template>
  <div class="VideoSection">
    <div class="title">
      {{ localVideo.title }}
    </div>
    <div class="description"
         v-html="localVideo.description" />
    <div class="video-section">
      <q-btn icon="ph:caret-right"
             square
             class="arrow arrow-right"
             @click="onPrev" />
      <div class="video-box"
           :class="{ 'unlock': localVideo.is_active, 'lock': !localVideo.is_active }">
        <template v-if="!isPlaying">
          <div class="state-layer state-unlock"
               @click="playVideo">
            <svg xmlns="http://www.w3.org/2000/svg"
                 width="64"
                 height="64"
                 viewBox="0 0 64 64"
                 fill="none">
              <g clip-path="url(#clip0_254_2065)">
                <path d="M62 32.0154C62 48.5385 48.5334 62 32 62C15.4666 62 2 48.5385 2 32.0154C2 15.4602 15.4679 2 32 2C48.5322 2 62 15.4602 62 32.0154Z"
                      stroke="#D0CCF4"
                      stroke-width="4" />
                <path d="M44.6666 32.0147C44.6666 32.7785 44.4242 33.5453 43.9393 34.1593C43.8484 34.2797 43.4242 34.7762 43.0908 35.0993L42.909 35.2756C40.3636 37.9519 34.0302 41.9766 30.8181 43.2663C30.8181 43.2957 28.909 44.0625 27.9999 44.0889H27.8787C26.4848 44.0889 25.1817 43.328 24.5151 42.0942C24.1514 41.4155 23.8181 39.4472 23.7878 39.4208C23.5151 37.6552 23.3333 34.9525 23.3333 31.9853C23.3333 28.8742 23.5151 26.051 23.8484 24.3178C23.8484 24.2884 24.1817 22.702 24.3939 22.1732C24.7272 21.4123 25.3333 20.7631 26.0908 20.3518C26.6969 20.0609 27.3333 19.9111 27.9999 19.9111C28.6969 19.9434 29.9999 20.3812 30.5151 20.5868C33.909 21.8794 40.3939 26.1098 42.8787 28.695C43.3029 29.1063 43.7575 29.6087 43.8787 29.7232C44.3939 30.3695 44.6666 31.1627 44.6666 32.0147Z"
                      fill="#D0CCF4" />
              </g>
              <defs>
                <clipPath id="clip0_254_2065">
                  <rect width="64"
                        height="64"
                        fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div class="state-layer state-lock"
               @click="clickOnLockedState">
            <svg xmlns="http://www.w3.org/2000/svg"
                 width="64"
                 height="64"
                 viewBox="0 0 64 64"
                 fill="none">
              <path d="M52 20H44V14C44 10.8174 42.7357 7.76515 40.4853 5.51472C38.2348 3.26428 35.1826 2 32 2C28.8174 2 25.7652 3.26428 23.5147 5.51472C21.2643 7.76515 20 10.8174 20 14V20H12C10.9391 20 9.92172 20.4214 9.17157 21.1716C8.42143 21.9217 8 22.9391 8 24V52C8 53.0609 8.42143 54.0783 9.17157 54.8284C9.92172 55.5786 10.9391 56 12 56H52C53.0609 56 54.0783 55.5786 54.8284 54.8284C55.5786 54.0783 56 53.0609 56 52V24C56 22.9391 55.5786 21.9217 54.8284 21.1716C54.0783 20.4214 53.0609 20 52 20ZM24 14C24 11.8783 24.8429 9.84344 26.3431 8.34315C27.8434 6.84285 29.8783 6 32 6C34.1217 6 36.1566 6.84285 37.6569 8.34315C39.1571 9.84344 40 11.8783 40 14V20H24V14ZM52 52H12V24H52V52ZM35 38C35 38.5933 34.8241 39.1734 34.4944 39.6667C34.1648 40.1601 33.6962 40.5446 33.148 40.7716C32.5999 40.9987 31.9967 41.0581 31.4147 40.9424C30.8328 40.8266 30.2982 40.5409 29.8787 40.1213C29.4591 39.7018 29.1734 39.1672 29.0576 38.5853C28.9419 38.0033 29.0013 37.4001 29.2284 36.852C29.4554 36.3038 29.8399 35.8352 30.3333 35.5056C30.8266 35.1759 31.4067 35 32 35C32.7956 35 33.5587 35.3161 34.1213 35.8787C34.6839 36.4413 35 37.2043 35 38Z"
                    fill="#D0CCF4" />
            </svg>
            <div class="lock-message">هرروز فقط میتونی یه فیلم رو ببینی!</div>
          </div>
        </template>
        <video-player v-if="localVideo.is_active"
                      ref="videoPlayer"
                      :key="videoKey"
                      :has-vast="false"
                      :show-btn="false"
                      :source="localVideoSource"
                      :poster="localVideo.thumbnail"
                      :disable-progress-control="true"
                      :disable-playback-rate-menu-button="true"
                      @timeUpdated="onTimeUpdated"
                      @pause="onPause"
                      @ended="onEnded"
                      @play="onPlay" />
        <lazy-img v-else
                  :src="localVideo.thumbnail"
                  class="full-width"
                  width="16"
                  height="9" />
      </div>
      <q-btn icon="ph:caret-left"
             square
             class="arrow arrow-left"
             @click="onNext" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import LazyImg from 'src/components/lazyImg.vue'
import VideoPlayer from 'src/components/VideoPlayer.vue'
import { PlayerSourceList } from 'src/models/PlayerSource.js'
import { BlackFridayVideo } from 'src/models/BlackFridayVideo.js'

export default defineComponent({
  name: 'VideoSection',
  components: { LazyImg, VideoPlayer },
  props: {
    video: {
      type: BlackFridayVideo,
      default: new BlackFridayVideo()
    }
  },
  emits: ['update:video', 'next', 'prev', 'play', 'watched', 'ended', 'clickOnLockedState'],
  data () {
    return {
      isPlaying: false,
      watched: false,
      videoKey: Date.now()
    }
  },
  computed: {
    localVideo: {
      get () {
        return this.video
      },
      set (newValue) {
        this.$emit('update:video', newValue)
      }
    },
    localVideoSource () {
      return new PlayerSourceList(this.localVideo.file.video)
    }
  },
  watch: {
    video () {
      this.refreshPlayer()
    }
  },
  methods: {
    isCurrent (videoIndex) {
      if (this.localBlackFridayCampaignData.videos.list.length === 0) {
        return false
      }

      const lastActiveIndex = this.getLastActiveIndex()

      return videoIndex === lastActiveIndex
    },
    getLastActiveIndex () {
      let activeIndex = 0
      this.localBlackFridayCampaignData.videos.list.forEach((video, videoIndex) => {
        if (video.is_active && activeIndex < videoIndex) {
          activeIndex = videoIndex
        }
      })

      return activeIndex
    },
    onPlay () {
      this.$emit('play')
      this.isPlaying = true
    },
    onTimeUpdated ({ currentTime, duration }) {
      if (this.watched) {
        return
      }
      const watchedPercent = (currentTime / duration)
      if (watchedPercent > 0.5) {
        this.$emit('watched')
        this.watched = true
      }
    },
    onPause () {
      this.isPlaying = false
    },
    onEnded () {
      this.refreshPlayer()
      this.$emit('ended')
    },
    onPrev () {
      this.refreshPlayer()
      this.$emit('prev')
    },
    onNext () {
      this.refreshPlayer()
      this.$emit('next')
    },
    clickOnLockedState () {
      this.$emit('clickOnLockedState')
    },
    refreshPlayer () {
      this.watched = false
      this.isPlaying = false
      this.videoKey = Date.now()
    },
    playVideo () {
      this.$refs.videoPlayer.player.play()
    }
  }
})

</script>

<style scoped lang="scss">
.VideoSection {
  display: flex;
  flex-wrap: wrap;
  flex-flow: column;
  align-items: center;

  .title {
    color: #FFF;
    text-align: center;
    font-family: ModamFaNumWeb,serif;
    font-size: 32px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    letter-spacing: -0.96px;
    margin-bottom: 20px;
    width: 100%;

    @media screen and (width <= 1023px) {
      font-size: 28px;
      letter-spacing: -0.84px;
    }

    @media screen and (width <= 599px) {
      font-size: 24px;
      letter-spacing: -0.72px;
    }
  }

  .description {
    color: #FFF;
    text-align: center;
    font-family: ModamFaNumWeb,serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.54px;
    margin-bottom: 60px;
    width: 711px;

    @media screen and (width <= 1439px) {
      width: 711px;
    }

    @media screen and (width <= 1023px) {
      width: 540px;
      font-size: 16px;
      letter-spacing: -0.48px;
      margin-bottom: 48px;
    }

    @media screen and (width <= 599px) {
      width: 320px;
      margin-bottom: 32px;
    }
  }

  .video-section {
    position: relative;

    .video-box {
      position: relative;
      width: 668px;
      border-radius: 20px;
      background: #19172E;
      box-shadow: 0 0 32px 0 rgb(51 51 51 / 9%);
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;

      @media screen and (width <= 1439px) {
        width: 472px;
        border-radius: 16px;
      }

      @media screen and (width <= 1023px) {
        border-radius: 16.2px;
        width: 540px;
      }

      @media screen and (width <= 599px) {
        border-radius: 9.58px;
        width: 320px;
      }

      @media screen and (width <= 360px) {
        max-width: 100%;
      }

      &.unlock {
        .state-layer {
          &.state-unlock {
            display: flex;
          }
        }
      }

      &.lock {
        .state-layer {
          &.state-lock {
            display: flex;
          }
        }
      }

      .state-layer {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        display: none;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        border-radius: 20px;

        &.state-unlock {
        }

        &.state-lock {
          background: rgb(20 19 24 / 40%);

          svg {
            margin-bottom: 8px;
          }

          .lock-message {
            color: #D0CCF4;
            text-align: center;
            font-family: ModamFaNumWeb,serif;
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            letter-spacing: -0.6px;
          }
        }

        svg {
          cursor: pointer;

          @media screen and (width <= 1439px) {
            width: 45.222px;
            height: 45.222px;
          }

          @media screen and (width <= 1023px) {
            width: 51.737px;
            height: 51.737px;
          }

          @media screen and (width <= 599px) {
            width: 30.666px;
            height: 30.666px;
          }
        }

        @media screen and (width <= 1439px) {
          border-radius: 16px;
        }

        @media screen and (width <= 1023px) {
          border-radius: 16.168px;
        }

        @media screen and (width <= 599px) {
          border-radius: 9.583px;
        }
      }

      :deep(.vPlayer) {
        .vjs-big-play-button {
          display: none;
        }
      }
    }

    :deep(.arrow) {
      position: absolute;
      z-index: 3;
      width: 40px;
      height: 40px;
      border-radius: 100px;
      background: #2F2A5B;
      box-shadow: 0 3px 2px 0 rgb(16 24 40 / 6%), 0 3px 3px 0 rgb(16 24 40 / 8%);
      top: calc( 50% - 20px );

      @media screen and (width <= 1023px) {
        $target-width: 32.335px;

        width: $target-width;
        height: $target-width;
        top: calc( 50% - ( #{$target-width} / 2 ) );
      }

      @media screen and (width <= 599px) {
        $target-width: 32px;

        width: $target-width;
        height: $target-width;
        top: calc( 50% - ( #{$target-width} / 2 ) );
      }

      .q-btn__content {
        .q-icon {
          font-size: 20px;

          @media screen and (width <= 1023px) {
            font-size: 16.168px;
          }

          @media screen and (width <= 599px) {
            font-size: 16px;
          }

          color: #D0CCF4;
        }
      }

      &.arrow-left {
        right: -20px;

        @media screen and (width <= 1023px) {
          $target-width: 32.335px;

          right: calc( #{$target-width} / -2 );
        }

        @media screen and (width <= 599px) {
          $target-width: 32px;

          right: calc( #{$target-width} / -2 );
        }
      }

      &.arrow-right {
        left: -20px;

        @media screen and (width <= 1023px) {
          $target-width: 32.335px;

          left: calc( #{$target-width} / -2 );
        }

        @media screen and (width <= 599px) {
          $target-width: 32px;

          left: calc( #{$target-width} / -2 );
        }
      }
    }
  }
}
</style>

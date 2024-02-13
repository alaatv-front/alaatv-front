<template>
  <div class="VoiceWaveSurfer">
    <q-linear-progress v-if="loading"
                       :value="loadedValue"
                       :indeterminate="!options.url"
                       color="secondary"
                       class="q-mt-md" />
    <div class="VoiceWaveSurfer__timer-and-element">
      <div ref="WaveSurfer"
           class="VoiceWaveSurfer__element" />
      <div class="VoiceWaveSurfer__timer">
        {{ currentFormat }}/{{ durationFormat }}
      </div>
    </div>
    <q-btn v-show="!loading"
           rounded
           color="secondary"
           :icon="playing ? 'ph:pause' : 'ph:play'"
           class="VoiceWaveSurfer__btn-play size-sm"
           square
           round
           @click="togglePlay" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import WaveSurfer from 'wavesurfer.js'

export default defineComponent({
  name: 'VoiceWaveSurfer',
  props: {
    source: {
      default: null
    }
  },
  data () {
    return {
      options: {
        container: 'body',
        height: 16,
        // width: 200,
        splitChannels: false,
        normalize: false,
        waveColor: '#E0E0E0',
        progressColor: '#26a69a',
        cursorColor: '#ddd5e9',
        cursorWidth: 0,
        barWidth: 5,
        barGap: 2,
        barRadius: 4,
        barHeight: null,
        barAlign: 'bottom',
        minPxPerSec: 1,
        fillParent: true,
        // url: 'https://wavesurfer.xyz/wavesurfer-code/examples/audio/audio.wav',
        // url: 'https://dls.music-fa.com/tagdl/1402/Homayoon%20Shajaryan%20-%20Tire%20Mozhgan%20(320).mp3',
        url: null,
        mediaControls: false,
        autoplay: false,
        interact: true,
        dragToSeek: false,
        hideScrollbar: false,
        audioRate: 1,
        autoScroll: true,
        autoCenter: true
        // sampleRate: 8000
      },
      wavesurfer: null,
      loading: true,
      loadedValue: 0,
      playing: false,
      current: 0,
      duration: 0,
      status: 'blur' // 'blur', 'text-input-focus', 'typing', 'voice-recording', 'voice-recorded
    }
  },
  computed: {
    currentFormat () {
      return this.getFormatted(this.current)
    },
    durationFormat () {
      return this.getFormatted(this.duration)
    }
  },
  mounted () {
    this.initWaveSurfer()
  },
  methods: {
    getFormatted (seconds) {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = Math.floor(seconds) % 60
      const formattedMinutes = String(minutes).padStart(2, '0')
      const formattedSeconds = String(remainingSeconds).padStart(2, '0')
      return `${formattedMinutes}:${formattedSeconds}`
    },
    initWaveSurfer () {
      if (!this.$refs.WaveSurfer) {
        return
      }
      this.options.container = this.$refs.WaveSurfer
      this.wavesurfer = WaveSurfer.create(this.options)
      if (this.source) {
        this.wavesurfer.load(this.source)
      }
      this.wavesurfer.on('loading', (percent) => {
        this.loadedValue = percent / 100
      })
      this.wavesurfer.on('ready', () => {
        this.loading = false
        this.duration = this.wavesurfer.getDuration()
      })
      this.wavesurfer.on('timeupdate', (data) => {
        this.current = data
      })
      this.wavesurfer.on('finish', () => {
        this.playing = false
        this.wavesurfer.pause()
      })
    },
    togglePlay () {
      if (this.playing) {
        this.playing = false
        this.wavesurfer.pause()
      } else {
        this.playing = true
        this.wavesurfer.play()
      }
    }
  }
})
</script>

<style scoped lang="scss">
.VoiceWaveSurfer {
  height: 40px;
  display: flex;
  align-items: center;
  $gap-size: $space-2;
  $play-btn-size: 32px;
  gap: $gap-size;
  align-self: stretch;
  :deep(.VoiceWaveSurfer__timer-and-element) {
    width: calc( 100% - #{$play-btn-size} - #{$gap-size} );
    .VoiceWaveSurfer__element {
      display: block;
      & > div {
        width: 100%;
        display: block;
      }
      ::part(scroll) {
        width: 100%;
      }
      ::part(wrapper) {
        width: 100%;
      }
    }
    .VoiceWaveSurfer__timer {
      @include caption1;
      color: $grey-7;
      text-align: right;
    }
  }
  .VoiceWaveSurfer__btn-play {
    width: $play-btn-size;
  }
}
</style>

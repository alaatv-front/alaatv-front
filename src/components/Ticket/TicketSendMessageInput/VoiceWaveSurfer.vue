<template>
  <div class="VoiceWaveSurfer">
    <q-linear-progress v-if="loading"
                       :value="loadedValue"
                       :indeterminate="!options.url"
                       color="secondary"
                       class="q-mt-md" />
    <div v-show="!loading"
         class="VoiceWaveSurfer__timer">
      {{ duration }}
    </div>
    <div v-show="!loading"
         ref="WaveSurfer"
         class="VoiceWaveSurfer__element" />
    <q-btn v-show="!loading"
           flat
           color="grey-1"
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
    },
    duration: {
      default: '00:00'
    }
  },
  data () {
    return {
      options: {
        container: 'body',
        height: 22,
        // width: 1000,
        splitChannels: false,
        normalize: false,
        waveColor: '#ffffff',
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
        autoCenter: true,
        sampleRate: 8000
      },
      wavesurfer: null,
      loading: true,
      loadedValue: 0,
      playing: false,
      status: 'blur' // 'blur', 'text-input-focus', 'typing', 'voice-recording', 'voice-recorded
    }
  },
  mounted () {
    this.initWaveSurfer()
  },
  methods: {
    initWaveSurfer () {
      if (!this.$refs.WaveSurfer) {
        return
      }
      this.options.container = this.$refs.WaveSurfer
      this.wavesurfer = WaveSurfer.create(this.options)
      if (this.source) {
        this.wavesurfer.loadBlob(this.source)
      }
      this.wavesurfer.on('loading', (percent) => {
        this.loadedValue = percent / 100
      })
      this.wavesurfer.on('ready', () => {
        this.loading = false
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
  display: flex;
  height: 32px;
  padding: 2px 12px 2px 8px;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  flex: 1 0 0;
  border-radius: $radius-5;
  background: $secondary-3;
  .VoiceWaveSurfer__timer {
    width: 30px;
    color: $grey-1;
    @include caption1;
  }
  :deep(.VoiceWaveSurfer__element) {
    width: calc( 100% - 65px );
    display: flex;
    justify-content: center;
    align-items: center;
    & > div {
      width: 100%;
    }
    //:host ::slotted(div) {
    //  color: red;
    //  max-width: 100%;
    //}
  }
  .VoiceWaveSurfer__btn-play {
    width: 35px;
  }
}
</style>

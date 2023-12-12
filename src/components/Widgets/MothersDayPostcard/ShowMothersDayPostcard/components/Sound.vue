<template>
  <div class="Sound">
    <audio ref="audio"
           class="audio"
           controls
           loop>
      <source type="audio/mpeg"
              :src="audioSource">
    </audio>
    <canvas ref="canvas" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      audioSource: '/music/MimMesleMadar.mp3',
      audioContext: null,
      analyser: null,
      canvasContext: null,
      canvasWidth: 0,
      canvasHeight: 0,
      dataArray: null,
      animationFrameId: null
    }
  },
  mounted () {
    setTimeout(() => {
      this.initializeAudio()
    }, 2000)
  },
  beforeUnmount () {
    cancelAnimationFrame(this.animationFrameId)
  },
  methods: {
    initializeAudio () {
      // this.$refs.audio.controls = true
      // this.$refs.audio.loop = true
      // this.$refs.audio.autoplay = true
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
      this.analyser = this.audioContext.createAnalyser()
      const source = this.audioContext.createMediaElementSource(this.$refs.audio)
      source.connect(this.analyser)
      // this.analyser.connect(this.audioContext.destination)
      // this.analyser.fftSize = 256
      // this.bufferLength = this.analyser.frequencyBinCount
      // this.dataArray = new Uint8Array(this.bufferLength)
      // this.canvasContext = this.$refs.canvas.getContext('2d')
      // this.canvasWidth = this.$refs.canvas.width
      // this.canvasHeight = this.$refs.canvas.height
      // this.draw()
      //
      // this.$refs.audio.onplay = () => {
      //   this.onPlay()
      // }
    },
    draw () {
      this.analyser.getByteFrequencyData(this.dataArray)
      this.canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
      const barWidth = (this.canvasWidth / this.bufferLength) * 2.5
      let barHeight
      let x = 0

      for (let i = 0; i < this.bufferLength; i++) {
        barHeight = this.dataArray[i] * 2

        this.canvasContext.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)'
        this.canvasContext.fillRect(x, this.canvasHeight - barHeight / 2, barWidth, barHeight)

        x += barWidth + 1
      }

      this.animationFrameId = requestAnimationFrame(this.draw)
    },
    onPlay () {
      if (!this.animationFrameId) {
        this.draw()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.Sound {
  /* page > 1920 */
  .audio {
    //display: none;
  }
  /* 1440 < page < 1920 */
  @include media-max-width('xl') {
  }
  /* 1024 < page < 1440 */
  @include media-max-width('lg') {
  }
  /* 600 < page < 1024 */
  @include media-max-width('md') {
  }
  /* 360 < page < 600 */
  @include media-max-width('sm') {
  }
}
</style>

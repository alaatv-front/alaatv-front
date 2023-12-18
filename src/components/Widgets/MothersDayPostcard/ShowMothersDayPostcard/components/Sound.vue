<template>
  <div class="Sound">
    <audio ref="audio"
           crossorigin="anonymous"
           class="audio"
           controls
           autoplay
           preload
           loop
           @play="onPlay">
      <source type="audio/mpeg"
              :src="audioSource">
    </audio>
    <canvas ref="canvas"
            width="1920px"
            height="500px" />
  </div>
</template>

<script>
export default {
  props: {
    audioSource: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
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
    // setTimeout(() => {
    //   this.$refs.audio.play()
    //   this.initializeAudio()
    // }, 2000)
    // AudioContext must be created or resumed after user interaction
    // document.addEventListener('click', this.tryAutoplay, { once: true })
  },
  beforeUnmount () {
    cancelAnimationFrame(this.animationFrameId)
    // document.removeEventListener('click', this.tryAutoplay)
  },
  methods: {
    tryAutoplay () {
      if (this.audioContext?.state === 'suspended') {
        this.audioContext.resume()
      } else {
        this.$refs.audio.play()
          .catch(() => {
          })
      }
      this.initializeAudio()
    },
    initializeAudio () {
      // Check if audio context is already running before creating a new one to avoid the "not allowed to start" error
      if (this.audioContext) {
        return
      }
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const source = this.audioContext.createMediaElementSource(this.$refs.audio)
      this.analyser = this.audioContext.createAnalyser()
      source.connect(this.analyser)
      this.analyser.connect(this.audioContext.destination)
      this.analyser.fftSize = 256
      this.bufferLength = this.analyser.frequencyBinCount
      this.dataArray = new Uint8Array(this.bufferLength)
      this.canvasContext = this.$refs.canvas.getContext('2d')
      this.canvasWidth = this.$refs.canvas.width
      this.canvasHeight = this.$refs.canvas.height
      this.draw()
    },
    draw () {
      this.analyser.getByteFrequencyData(this.dataArray)
      this.canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
      const barWidth = (this.canvasWidth / this.bufferLength) * 1.5
      let barHeight
      let x = 0

      // console.log('this.bufferLength', this.bufferLength)
      for (let i = 0; i < this.bufferLength; i++) {
        barHeight = this.dataArray[i] * 2

        // this.canvasContext.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)'
        this.canvasContext.fillStyle = 'rgb(255, 255, 255)'
        // this.canvasContext.fillRect(x, this.canvasHeight - barHeight / 3, barWidth, barHeight)
        drawRoundedRect(this.canvasContext, x, this.canvasHeight - barHeight / 2, barWidth, barHeight, 20)

        x += barWidth + 10
      }
      function drawRoundedRect (ctx, x, y, width, height, radius) {
        if (width < 2 * radius) radius = width / 2
        if (height < 2 * radius) radius = height / 2
        ctx.beginPath()
        ctx.moveTo(x + radius, y)
        ctx.arcTo(x + width, y, x + width, y + height, radius)
        ctx.arcTo(x + width, y + height, x, y + height, radius)
        ctx.arcTo(x, y + height, x, y, radius)
        ctx.arcTo(x, y, x + width, y, radius)
        ctx.closePath()
        ctx.fill()
      }

      this.animationFrameId = requestAnimationFrame(this.draw)
    },
    onPlay () {
      this.initializeAudio()
      // if (!this.animationFrameId) {
      //   this.draw()
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.Sound {
  /* page > 1920 */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .audio {
    display: none;
    position: absolute;
    left: 0;
    top: 0;
  }
  canvas {
    margin: auto;
    width: 100%;
    height: 500px;
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

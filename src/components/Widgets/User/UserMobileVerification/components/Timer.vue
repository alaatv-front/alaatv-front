<template>
  <span>
    {{ timer }}
  </span>
</template>

<script>
export default {
  name: 'Timer',
  props: {
    time: {
      type: Number, // in second
      default: 0
    }
  },
  emits: ['stop'],
  data () {
    return {
      step: 'login',
      localTime: 0,
      interval: null
    }
  },
  computed: {
    timer () {
      const seconds = (this.localTime % 60).toString().padStart(2, '0')
      const minutes = (Math.floor(this.localTime / 60)).toString().padStart(2, '0')

      return minutes + ':' + seconds
    }
  },
  mounted () {
    this.startTimer()
  },
  methods: {
    startTimer () {
      this.localTime = this.time
      this.interval = setInterval(() => {
        if (this.localTime <= 0) {
          this.stopTimer()
        } else {
          this.localTime--
        }
      }, 1000)
    },
    stopTimer () {
      this.localTime = 0
      clearInterval(this.interval)
      this.$emit('stop')
    }
  }
}
</script>

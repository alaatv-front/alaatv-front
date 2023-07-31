<template>
  <div class="event-counter-wrapper">
    <div class="event-counter-item">
      <div class="event-counter-item-number seconds">
        <span v-if="loading || !time">00</span>
        <span v-else>{{seconds}}</span>
      </div>
      <div class="event-counter-item-title">ثانیه</div>
    </div>
    <div class="event-counter-item">
      <div class="event-counter-item-number">
        <span v-if="loading || !time">00</span>
        <span v-else>{{minutes}}</span>
      </div>
      <div class="event-counter-item-title">دقیقه</div>
    </div>
    <div class="event-counter-item">
      <div class="event-counter-item-number">
        <span v-if="loading || !time">00</span>
        <span v-else>{{hour}}</span>
      </div>
      <div class="event-counter-item-title">ساعت</div>
    </div>
    <div class="event-counter-item">
      <div class="event-counter-item-number">
        <span v-if="loading || !time">00</span>
        <span v-else>{{day}}</span>
      </div>
      <div class="event-counter-item-title">روز</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import moment from 'moment-jalaali'

export default defineComponent({
  name: 'TimerBase',
  props: {
    time: {
      type: String,
      default: null
    },
    timerStyle: {
      type: Object,
      default() {
        return {
          timerColor: null,
          timerBackground: null,
          timerSize: null,
          timerLabelColor: null,
          timerLabelBackground: null,
          timerLabelSize: null,
          secondsBackground: null,
          counterWidth: null,
          counterHeight: null,
          counterMargin: null,
          counterPadding: null,
          counterBorderRadius: null
        }
      }
    }
  },
  data() {
    return {
      eventTime: 0,
      seconds: 0,
      minutes: 0,
      hour: 0,
      day: 0,
      loading: false,
      interval: null
    }
  },
  computed: {
    timerColor() {
      return this.timerStyle.timerColor || '#000000'
    },
    timerBackground() {
      return this.timerStyle.timerBackground || 'transparent'
    },
    timerSize() {
      return this.timerStyle.timerSize || '20px'
    },
    timerLabelColor() {
      return this.timerStyle.timerLabelColor || '#000000'
    },
    timerLabelBackground() {
      return this.timerStyle.timerLabelBackground || 'transparent'
    },
    timerLabelSize() {
      return this.timerStyle.timerLabelSize || '20px'
    },
    counterWidth() {
      return this.timerStyle.counterWidth || '40px'
    },
    counterHeight() {
      return this.timerStyle.counterHeight || '40px'
    },
    secondsBackground() {
      return this.timerStyle.secondsBackground || this.timerStyle.timerBackground || 'transparent'
    },
    counterMargin() {
      return this.timerStyle.counterMargin || '8px'
    },
    counterPadding() {
      return this.timerStyle.counterPadding || '0'
    },
    counterBorderRadius() {
      return this.timerStyle.counterBorderRadius + 'px' || '10px'
    }

  },
  watch: {
    time() {
      this.getEventInfo()
      this.updateTimer()
    }
  },
  mounted() {
    this.getEventInfo()
    this.updateTimer()
  },
  unmounted() {
    clearInterval(this.interval)
  },
  methods: {
    updateTimer() {
      this.interval = setInterval(() => {
        this.eventTime--
        this.day = Math.floor(this.eventTime / 86400)
        this.hour = Math.floor(this.eventTime / 3600) % 24
        this.minutes = Math.floor(Math.floor(this.eventTime / 60) % 60)
        this.seconds = Math.floor(this.eventTime % 60)

        this.day = this.day < 10 ? '0' + this.day : this.day
        this.hour = this.hour < 10 ? '0' + this.hour : this.hour
        this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes
        this.seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds
      }, 1000)
    },
    getEventInfo() {
      clearInterval(this.interval)
      this.loading = true
      moment.loadPersian()
      const date1 = new Date(moment(this.time, 'jYYYY-jM-jD HH:mm').format('YYYY-M-D HH:mm:ss'))
      const date2 = new Date()
      this.eventTime = this.getDifference(date2, date1)
      const day = Math.floor(this.eventTime / 86400)
      const hour = Math.floor(this.eventTime / 3600)
      const minutes = Math.floor(this.eventTime / 60)
      const seconds = Math.floor(this.eventTime % 60)

      this.day = day < 10 ? '0' + day : day

      this.hour = hour < 10 ? '0' + hour : hour
      this.minutes = minutes < 10 ? '0' + minutes : minutes
      this.seconds = seconds < 10 ? '0' + seconds : seconds
      this.loading = false
    },
    getDifference(date1, date2) {
      const diffInMs = Math.abs(date2 - date1)
      return diffInMs / 1000
    }
  }
})
</script>

<style lang="scss" scoped>
$timerColor: v-bind('timerColor');
$timerBackground: v-bind('timerBackground');
$timerSize: v-bind('timerSize');
$timerLabelColor: v-bind('timerLabelColor');
$timerLabelBackground: v-bind('timerLabelBackground');
$timerLabelSize: v-bind('timerLabelSize');
$secondsBackground: v-bind('secondsBackground');
$counterWidth: v-bind('counterWidth');
$counterHeight: v-bind('counterHeight');
$counterMargin: v-bind('counterMargin');
$counterPadding: v-bind('counterPadding');
$counterBorderRadius: v-bind('counterBorderRadius');
.event-counter-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 1023px) and (min-width: 350px) {
    width: 100%;
    justify-content: space-evenly;
  }

  .event-counter-item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .event-counter-item-number {
      display: flex;
      justify-content: center;
      align-items: center;
      background: $timerBackground;
      border-radius: $counterBorderRadius;
      margin: $counterMargin;
      padding: $counterPadding;
      width: $counterWidth;
      height: $counterHeight;
      font-style: normal;
      font-weight: 800;
      font-size: $timerSize;
      line-height: 130%;
      display: flex;
      align-items: center;
      text-align: center;
      color: $timerColor;

      &.seconds {
        background: $secondsBackground;
      }
    }

    .event-counter-item-title{
      font-style: normal;
      font-weight: 600;
      font-size: $timerLabelSize;
      line-height: 150%;
      text-align: center;
      letter-spacing: -0.03em;
      color: $timerLabelColor;
      background: $timerLabelBackground;
    }
  }
}
</style>

<template>
  <div class="event-counter-wrapper"
       :class="theme">
    <div v-if="counters.seconds"
         class="event-counter-item">
      <div class="event-counter-item-number seconds">
        <span>{{computedSeconds}}</span>
      </div>
      <div class="event-counter-item-title">ثانیه</div>
    </div>
    <div v-if="counters.minutes"
         class="event-counter-item">
      <div class="event-counter-item-number">
        <span>{{computedMinutes}}</span>
      </div>
      <div class="event-counter-item-title">دقیقه</div>
    </div>
    <div v-if="counters.hours"
         class="event-counter-item">
      <div class="event-counter-item-number">
        <span>{{computedHour}}</span>
      </div>
      <div class="event-counter-item-title">ساعت</div>
    </div>
    <div v-if="counters.days"
         class="event-counter-item">
      <div class="event-counter-item-number">
        <span>{{computedDay}}</span>
      </div>
      <div class="event-counter-item-title">روز</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import moment from 'moment-jalaali'

const defaultTimerStyle = {
  timerColor: '#000000',
  timerBackground: 'transparent',
  timerSize: '20px',
  timerLabelColor: '#000000',
  timerLabelBackground: 'transparent',
  timerLabelSize: '20px',
  secondsBackground: 'transparent',
  counterWidth: '40px',
  counterHeight: '40px',
  counterMargin: '8px',
  counterPadding: '0',
  counterBorderRadius: '10px',
  fontFamily: 'Doran FaNum'
}

export default defineComponent({
  name: 'TimerBase',
  props: {
    time: {
      type: String,
      default: null
    },
    theme: {
      type: String,
      default: null
    },
    timerStyle: {
      type: Object,
      default() {
        return defaultTimerStyle
      }
    },
    counters: {
      type: Object,
      default() {
        return {
          seconds: true,
          minutes: true,
          hours: true,
          days: true
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
    computedTimerStyle() {
      return Object.assign(defaultTimerStyle, this.timerStyle)
    },
    secondsBackground() {
      return this.computedTimerStyle.secondsBackground || this.computedTimerStyle.timerBackground || 'transparent'
    },
    counterBorderRadius() {
      return this.computedTimerStyle.counterBorderRadius + 'px' || '10px'
    },
    computedSeconds() {
      return this.loading || !this.time ? '00' : this.seconds
    },
    computedMinutes() {
      return this.loading || !this.time ? '00' : this.minutes
    },
    computedHour() {
      return this.loading || !this.time ? '00' : this.hour
    },
    computedDay() {
      return this.loading || !this.time ? '00' : this.day
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
$timerColor: v-bind('computedTimerStyle.timerColor');
$timerBackground: v-bind('computedTimerStyle.timerBackground');
$timerSize: v-bind('computedTimerStyle.timerSize');
$timerLabelColor: v-bind('computedTimerStyle.timerLabelColor');
$timerLabelBackground: v-bind('computedTimerStyle.timerLabelBackground');
$timerLabelSize: v-bind('computedTimerStyle.timerLabelSize');
$secondsBackground: v-bind('secondsBackground');
$counterWidth: v-bind('computedTimerStyle.counterWidth');
$counterHeight: v-bind('computedTimerStyle.counterHeight');
$counterMargin: v-bind('computedTimerStyle.counterMargin');
$counterPadding: v-bind('computedTimerStyle.counterPadding');
$fontFamily: v-bind('computedTimerStyle.fontFamily');
$counterBorderRadius: v-bind('counterBorderRadius');
.event-counter-wrapper {
  display: flex;
  align-items: center;
  font-family: $fontFamily;

  @media screen and (max-width: 1023px) and (min-width: 350px) {
    width: 100%;
    justify-content: center;
  }

  &.theme1 {

    .event-counter-item {

      .event-counter-item-title {
        @media screen and (max-width: 600px) {
          display: none;
        }
      }
      &:not(:last-child) {
        flex-direction: row;
        &::after{
          @media screen and (max-width: 600px) {
            content: ':';
            font-size: $timerSize;
            color: $timerColor;
            margin: 0 6px;
          }
        }
      }
    }
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

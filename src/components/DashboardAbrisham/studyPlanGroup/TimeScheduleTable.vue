<template>
  <div id="study-scroll-2-y"
       v-dragscroll.x="true"
       class="timeTable">
    <div class="timeTable-header">
      <div class="timeTable-header-number-boxes">
        <div v-if="canShowTimeTableHeader(startTime)"
             class="timeTableHeader"
             :style="{ flex: ('0 0 ' + customizedHeaderCellWidth() + 'px') }" />
        <div v-for="i in listOfHours"
             :key="i"
             class="timeTableHeader"
             :style="{ flex: ('0 0 ' + headerCellWidth + 'px') }">
          <div class="row">
            <div class="col-12">
              <div class="timeTableHeaderNumber">
                {{ i }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!loading"
           class="timeTable-body">
        <div v-for="i in listOfHours"
             :key="i"
             :style="[{ flex: ('0 0 ' + headerCellWidth + 'px') }]">
          <div class="timeTable-main-line" />
          <div class="timeTable-line" />
        </div>
        <div v-for="plan in filteredPlans"
             :key="plan.id"
             class="plan"
             :style="{
               right: calcPosition(plan.start, plan.end).right
             }"
             @click="selectPlan(plan)">
          <!--              2      calcPosition(p.start, p.end).right-->
          <div class="plan-within-box"
               :style="{
                 width: calcPosition(plan.start, plan.end).width,
                 backgroundColor: plan.backgroundColor,
                 borderColor: plan.borderColor,
                 color: plan.textColor,
                 position : 'absolute'}"
               :class="{ 'planActive': isSelectedPanel(plan.id)}">
            {{ plan.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Major } from 'src/models/Major'
import { PlanList, Plan } from 'src/models/Plan'
import { dragscroll } from 'vue-dragscroll'

export default {
  name: 'TimeScheduleTable',
  directives: {
    dragscroll
  },
  props: {
    headerCellWidth: {
      default: 200,
      type: Number
    },
    startTime: {
      default: '00:00:00',
      type: String
    },
    endTime: {
      default: '24:00:00',
      type: String
    },
    plans: {
      type: PlanList,
      default: new PlanList()
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    selectedMajor: {
      default() {
        return new Major({
          id: 1,
          name: 'ریاضی'
        })
      },
      type: Major
    },
    selectedPlanStyle: {
      type: Object,
      default: () => {
      }
    },
    selectedPanel: {
      type: Plan,
      default: () => new Plan()
    },
    timeGap: {
      type: String,
      default: '00:00:00'
    },
    notTheSamePlan: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      listOfHours: [],
      startPoint: 0,
      selectedPlanId: null,
      spaceBetweenEndingTimes: 0,
      spaceBetweenStartTimes: 0,
      selectedPlan: [],
      planToActivate: null,
      openedPanel: false
    }
  },
  computed: {
    filteredPlans() {
      return this.plans.list.filter(item => parseInt(item.major.id) === parseInt(this.selectedMajor.id))
    }

    // setRightPositionForMediaTags() {
    //   if (this.$store.getters.windowSize.x < 1920) {
    //     return this.calcPosition(p.start, p.end, 0.30).right
    //   } else if (this.$store.getters.windowSize.x > 1920) {
    //     return this.calcPosition(p.start, p.end, 0.25).right
    //   }
    // }

  },
  watch: {
    plans(val) {
      if (val?.list?.length > 0) {
        this.SetSpaceBetweenTimes()
        this.setListOfHours()
      }
    }
  },
  methods: {

    isSelectedPanel(planId) {
      return planId === this.selectedPanel.id
    },

    setListOfHours() {
      // 24  7
      this.setTheStartingPoint()
      const start = this.startPoint
      const end = this.calcTheEndingPoint()
      for (let hour = start; hour <= end; hour++) {
        this.listOfHours.push(hour)
      }
    },

    selectPlan(plan) {
      this.$emit('planClicked', plan)
    },

    canShowTimeTableHeader(time) {
      return (this.parseTheTime(time).minutes !== 0 || this.parseTheTime(time).seconds !== 0)
    },

    customizedHeaderCellWidth() {
      const parsedStartTime = this.parseTheTime(this.startTime)
      if (parsedStartTime.minutes !== 0 || parsedStartTime.seconds !== 0) {
        return (
          this.roundTheTime(parsedStartTime) * 3600 - parsedStartTime.totalSecond) * this.headerCellWidth / 3600
      } else {
        return this.headerCellWidth
      }
    },

    parseTheTime(time) {
      const [hh = '0', mm = '0', ss = '0'] = (time || '0:0:0').split(':')
      const hour = parseInt(hh, 10) || 0
      const minute = parseInt(mm, 10) || 0
      const second = parseInt(ss, 10) || 0
      return {
        totalSeconds: (hour * 3600) + (minute * 60) + (second),
        minutes: minute,
        hour,
        seconds: second
      }
    },

    roundTheTime(timeSeconds) {
      if (timeSeconds.minutes === 0 && timeSeconds.seconds === 0) {
        return timeSeconds.hour
      } else {
        return timeSeconds.hour + 1
      }
    },

    calcPosition(start, end) {
      const rFixed = 990
      const perSecond = this.headerCellWidth / 3600
      const startSeconds = this.parseTheTime(start).totalSeconds
      const endSeconds = this.parseTheTime(end).totalSeconds
      const timeDifference = endSeconds - startSeconds
      const startPointSec = (this.startPoint * 3600) - rFixed
      const right = ((startSeconds - startPointSec) * (this.headerCellWidth / 3600)).toString() + 'px'
      const width = (timeDifference * perSecond).toString() + 'px'
      return { right, width }
    },

    setSpaceBetweenEndingTimes() {
      const parsedEndTime = this.parseTheTime(this.endTime)
      const lastPlanEnd = this.plans.list[this.plans.list.length - 1].end
      if (lastPlanEnd === '24:00:00') {
        this.spaceBetweenEndingTimes = parsedEndTime.hour
        return
      }
      this.spaceBetweenEndingTimes = parsedEndTime.hour - this.parseTheTime(lastPlanEnd).hour
    },

    setSpaceBetweenStartTimes() {
      const parsedStartTime = this.parseTheTime(this.startTime)
      const firstPlanStart = this.plans.list[0].start
      if (firstPlanStart === '00:00:00') {
        this.spaceBetweenStartTimes = parsedStartTime.hour
        return
      }
      this.spaceBetweenStartTimes = this.parseTheTime(firstPlanStart).hour - parsedStartTime.hour
    },

    SetSpaceBetweenTimes() {
      this.setSpaceBetweenStartTimes()
      this.setSpaceBetweenEndingTimes()
    },

    calcTheEndingPoint() {
      return (this.parseTheTime(this.endTime).hour - this.spaceBetweenEndingTimes) + this.parseTheTime(this.timeGap).hour
    },

    setTheStartingPoint() {
      this.startPoint = this.roundTheTime(this.parseTheTime(this.startTime)) + this.spaceBetweenStartTimes - this.parseTheTime(this.timeGap).hour
    },

    calcTheStartingPointSeconds() {
      return this.parseTheTime(this.startTime).hour + this.spaceBetweenStartTimes - this.parseTheTime(this.timeGap).hour
    },

    changePanelStatus(active) {
      this.openedPanel = false
      if (active) {
        this.openedPanel = true
      }
      this.$emit('openPanel', this.openedPanel)
    }
  }
}
</script>
<style lang="scss" scoped>
.timeTable {
  position: relative;
  overflow: scroll hidden;
  background-color: white;
  border: solid 4px #e1f0ff;
  border-radius: 10px;
  top: 3px;

  @media only screen and (width <= 767px) {
    border-radius: 0;
  }

  .timeTable-header {
    position: relative;

    //ggg
    left: 0.4px;

    //border: solid 4px #e1f0ff;
    //border-radius: 10px;

    .timeTable-header-number-boxes {
      display: flex;

      .timeTableHeader {
        padding: 5px 0;
        text-align: center;
        line-height: 48px;
        background-color: rgb(225 240 255 / 100%);

        &:last-child {
          //gggg
          padding-right: 20px;
        }

        .timeTableHeaderNumber {
          position: relative;
          background-color: white;
          width: 30px;
          height: 30px;

          //ggggg
          left: 38px;
          border-radius: 50%;
          padding: 7px 7px 1px;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: normal;
          text-align: center;
          color: #333;

          @media only screen and (width <= 1919px) {
            //gggg
            left: 25px;
          }

          @media screen and (width <= 575px) {
            width: 24px;
            height: 24px;
            padding: 5px 5px 1px;
          }
        }
      }
    }
  }

  .timeTable-body {
    display: flex;
    background-color: white;
    height: 55px;

    @media only screen and (width <= 767px) {
      height: 36px;
    }

    .timeTable-main-line {
      position: relative;

      //gggg
      border-right: solid 2px #e1f0ff;
      height: 70px;

      //gggggg
      left: -146px;

      @media only screen and (width <= 1919px) {
        //ggg
        left: -100px;
      }

      @media only screen and (width <= 767px) {
        height: 37px;
      }
    }

    .timeTable-line {
      display: inline-block;
      position: relative;

      //ggggg
      border-right: solid 1px #e1f0ff;
      height: 70px;

      //gggggg
      left: -46px;
      bottom: 70px;

      @media only screen and (width <= 1919px) {
        //ggggg
        left: 109px;
      }
    }

    .plan {
      position: absolute;
      cursor: pointer;
      border-radius: 10px;
      text-align: center;
      top: 0;
      height: 100%;
      padding-top: 57px;

      @media only screen and (width <= 767px) {
        padding-top: 47px;
      }

      .plan-within-box {
        border-radius: 10px;
        font-size: 14px;
        padding-top: 3px;
        padding-bottom: 3px;

        @media only screen and (width <= 767px) {
          border-radius: 8px;
        }

        &.planActive {
          box-shadow: 0 2px 5px 0 rgb(255 143 0 / 40%) !important;
          background-color: #ff8f00 !important;
        }
      }
    }
  }
}

#study-scroll-2-y {
  &::-webkit-scrollbar-track {
    border-radius: 6px;
    background-color: #F5F5F5;
  }

  &::-webkit-scrollbar {
    width: 6px;
    border-radius: 6px;
    height: 6px;
    background-color: #F5F5F5;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: #f7941d;
  }
}
</style>

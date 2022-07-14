<template>
  <div class="full-calender q-ma-lg ">
    <div class="row no-wrap q-my-sm">
      <div class="col-1">هفته / ساعت</div>
      <div class="col-11">
        <div class="calender-header">
          <q-scroll-area ref="headerRef"
                         class="full-calender"
                         style="height: 50px; max-width:100%;"
                         @scroll="onScrollHours">
            <div class="header flex no-wrap">
              <div
                v-for="hour in listOfHours"
                :key="hour"
                class="timeTableHeader"
                :style="{ width:  headerCellWidth + 'px'}"
              >
                <div class="timeTableHeaderNumber bg-pink-2"
                >
                  <q-avatar color="white"
                            size="30px"
                  >
                    {{ hour-1 }}
                  </q-avatar>
                  <div class="hour">
                    <div class="minutes-line">
                    </div>
                  </div>
                </div>
                <div class="hour-line">
                </div>
              </div>
            </div>
          </q-scroll-area>
        </div>
      </div>
    </div>
    <div class="calender-body  row no-wrap">
      <q-scroll-area
        visible
        class=" col-1"
        style="height: 550px;"
        ref="daysRef"
        @scroll="onScrollDays"
      >
        <div v-for="studyPlan in filterdPlans.list"
             :key="studyPlan.id"
             class="date-style row justify-center items-center "
        >
          <div class="date"> {{ studyPlan.shamsiDate(studyPlan.date).date }} </div>
          <q-separator />
        </div>
      </q-scroll-area>
      <q-scroll-area
        visible
        class="col-11 full-calender"
        style="height: 550px; max-width: 100%"
        ref="plansRef"
        @scroll="onScrollPlans"
      >
        <div
          v-for="studyPlan in filterdPlans.list"
          :key="studyPlan.id"
        >
          <plans :studyPlanData="studyPlan"
                 @updatePlan="updatePlan"
                 @deletePlan="deletePlan"
          />
          <q-separator />
        </div>
      </q-scroll-area>
    </div>
  </div>
</template>

<script>
import Plans from 'components/StudyPlanAdmin/Plans'
import { StudyPlanList } from 'src/models/StudyPlan'

export default {
  name: 'FullCalenderPlans',
  components: {
    Plans
  },
  props: {
    headerCellWidth: {
      default: 200,
      type: Number
    },
    filterdPlans: {
      type: StudyPlanList,
      default: () => new StudyPlanList()
    }
  },
  data: () => ({
    listOfHours: 24,
    ignoreSource: null,
    ignoreSource2: null
  }),
  mounted () {

  },
  created () {
    this.initData()
  },

  methods: {
    initData () {
    },

    deletePlan (planId) {
      this.$emit('deletePlan', planId)
    },

    updatePlan (updatePlan) {
      this.$emit('updatePlan', updatePlan)
    },

    syncVerticalScroll (source, position) {
      if (this.ignoreSource === source) {
        this.ignoreSource = null
        return
      }
      this.ignoreSource = source === 'days' ? 'plans' : 'days'
      const areaRef = source === 'days'
        ? this.$refs.plansRef
        : this.$refs.daysRef
      areaRef.setScrollPosition('vertical', position)
    },

    syncHorizontalScroll (source, position) {
      if (this.ignoreSource2 === source) {
        this.ignoreSource2 = null
        return
      }
      this.ignoreSource2 = source === 'hours' ? 'plans' : 'hours'

      const areaRef = source === 'hours'
        ? this.$refs.plansRef
        : this.$refs.headerRef
      areaRef.setScrollPosition('horizontal', position)
    },

    onScrollHours ({ horizontalPosition }) {
      this.syncHorizontalScroll('hours', horizontalPosition)
    },

    onScrollDays ({ verticalPosition }) {
      this.syncVerticalScroll('days', verticalPosition)
    },

    onScrollPlans ({ verticalPosition, horizontalPosition }) {
      this.syncHorizontalScroll('plans', horizontalPosition)
      this.syncVerticalScroll('plans', verticalPosition)
    }

  }
}
</script>
<style lang="scss">
.q-scrollarea.full-calender {
  .q-scrollarea__container {
    .q-scrollarea__content {
      direction: ltr;
    }
  }
  direction: initial;
}

</style>
<style scoped lang="scss">
.calender-header{
}
.timeTableHeaderNumber{
  margin-right: 1px;
}
.hour{
  position: relative;
  left: -15px;
}
.minutes-line{
  border-left: 1px solid red;
  //position: absolute;
  height: 20px;
  z-index: 100;
}
.hour-line{
  border-left: 2px solid #0095ff;
  position: absolute;
  height: 20px;
  z-index: 100;
}
.date-style{
  margin: 5px 0;

  .date{
    height: 35px;
  }
}
</style>

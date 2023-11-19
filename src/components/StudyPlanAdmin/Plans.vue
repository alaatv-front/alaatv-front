<template>
  <div class="plans  row no-wrap"
       :style="{width : calculateRowWidth() + 'px'}">
    <plan v-for="plan in studyPlanData.plans.list"
          :key="plan.id"
          :style="{
            right :calculateRightSpace(plan) + 'px',
            backgroundColor : plan.backgroundColor,
            width: calculateWidth(plan) + 'px',
          }"
          :planDate='plan'
          @handelPlanEvent="handelPlanEvent" />
  </div>

</template>

<script>
import { StudyPlan } from 'src/models/StudyPlan.js'
import Plan from 'components/StudyPlanAdmin/Plan.vue'

export default {
  name: 'Plans',
  components: { Plan },
  props: {
    studyPlanData: {
      type: StudyPlan,
      default: () => new StudyPlan()
    },
    headerCellWidth: {
      default: 200,
      type: Number
    }

  },
  mounted () {
    // console.log(this.studyPlanData.plans.list)
  },
  methods: {
    handelPlanEvent (data, type) {
      this.$emit('handelPlanEvent', data, type)
    },
    calculateWidth (planDate) {
      const pixelPerMinutes = this.headerCellWidth / 60
      const start = planDate.start
      const end = planDate.end
      const ss = start.split(':')
      const ee = end.split(':')
      const startSeconds = (parseInt(ss[0]) * 60) + parseInt(ss[1])
      const endSeconds = (parseInt(ee[0]) * 60) + parseInt(ee[1])
      return (endSeconds - startSeconds) * pixelPerMinutes
    },

    calculateRightSpace (planDate) {
      const start = planDate.start
      const ss = start.split(':')
      return ss[0] * this.headerCellWidth + ss[1] * (this.headerCellWidth / 60)
    },
    calculateRowWidth () {
      return this.headerCellWidth * 24
    }
  }

}
</script>

<style scoped lang="scss">
.plans {
  background: rgb(150 144 228 / 18%);
  position: relative;
  height: 35px;
  margin: 5px 0;
  display: flex;
  align-items: center;
}
</style>

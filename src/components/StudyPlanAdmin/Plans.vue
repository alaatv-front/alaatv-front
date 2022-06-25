<template>
  <div class="row no-wrap">
    <div v-for="plan in studyPlanData.plans.list">
      <plan  :style="{ width:  headerCellWidth + 'px', 'border-left': '1px solid blue'}"
             :planDate ='plan' />
    </div>
  </div>

</template>

<script>
import { StudyPlan } from 'src/models/StudyPlan'
import Plan from 'components/StudyPlanAdmin/Plan'

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
  updated () {
    console.log('gfhfh', this.dayOfPlan)
  }
}
</script>

<style scoped>

</style>

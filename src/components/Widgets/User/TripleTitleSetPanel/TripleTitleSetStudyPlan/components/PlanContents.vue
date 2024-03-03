<template>
  <div class="plan-contents row q-col-gutter-md">
    <div v-for="content in pamphletContents"
         :key="content.id"
         class="col-md-6 col-xs-12">
      <plan-content :plan="plan"
                    :content="content" />
    </div>
    <div v-for="content in lessonVideoContents"
         :key="content.id"
         class="col-md-6 col-xs-12">
      <plan-content :plan="plan"
                    :content="content" />
    </div>
  </div>
</template>

<script>
import { Plan } from 'src/models/Plan.js'
import PlanContent from './PlanContent.vue'

export default {
  name: 'PlanContents',
  components: { PlanContent },
  props: {
    plan: {
      type: Plan
    }
  },
  computed: {
    pamphletContents () {
      return this.plan.contents.list.filter(content => content.isPamphlet())
    },
    lessonVideoContents () {
      return this.plan.contents.list.filter(content => content.isLessonVideo())
    }
  },
  mounted () {
    console.log('plan', this.plan)
  }
}
</script>

<style lang="scss" scoped>
.plan-contents {

}
</style>

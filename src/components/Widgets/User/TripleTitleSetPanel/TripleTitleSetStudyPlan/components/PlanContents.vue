<template>
  <div class="plan-contents row q-col-gutter-md">
    <div v-for="content in pamphletContents"
         :key="content.id"
         class="col-md-6 col-xs-12">
      <plan-content :plan="plan"
                    :content="content" />
    </div>
    <div v-for="content in videoContents"
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
    videoContents () {
      return this.plan.contents.list.filter(content => content.isVideo())
    }
  }
}
</script>

<style lang="scss" scoped>
.plan-contents {

}
</style>

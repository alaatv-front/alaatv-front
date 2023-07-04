<template>
  <div class="triple-title-set-dashboard-container">
    <dashboard-header />
    <daily-plan />
    <div class="row">
      <div class="col-12">
        status
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import DashboardHeader from 'src/components/DashboardTripleTitleSet/Dashboard/DashboardHeader.vue'
import DailyPlan from 'src/components/DashboardTripleTitleSet/Dashboard/DailyPlan.vue'
export default defineComponent({
  name: 'TripleTitleSetDashboard',
  components: {
    DashboardHeader,
    DailyPlan
  }
})
</script>

<style lang="scss" scoped>
.triple-title-set-dashboard-container {
  padding: 40px 70px;

  @media only screen and (max-width: 600px) {
    padding: 30px 20px;
  }
}
</style>

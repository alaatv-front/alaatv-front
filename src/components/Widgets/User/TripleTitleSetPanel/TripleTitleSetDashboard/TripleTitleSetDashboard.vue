<template>
  <div class="triple-title-set-dashboard-container new-theme">
    <dashboard-header />
    <daily-plan :studyPlanId="studyPlanId" />
    <status-and-review :studyPlanInfo="studyPlanInfo" />
    <study-plan-selection-dialog :dialog="dialog"
                                 @toggle-dialog="onToggleDialog" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import DashboardHeader from 'src/components/DashboardTripleTitleSet/Dashboard/DashboardHeader.vue'
import DailyPlan from 'src/components/DashboardTripleTitleSet/Dashboard/DailyPlan.vue'
import StatusAndReview from 'src/components/DashboardTripleTitleSet/Dashboard/StatusAndReview.vue'
import StudyPlanSelectionDialog from 'src/components/DashboardTripleTitleSet/Dashboard/StudyPlanSelectionDialog.vue'

export default defineComponent({
  name: 'TripleTitleSetDashboard',
  components: {
    DashboardHeader,
    DailyPlan,
    StatusAndReview,
    StudyPlanSelectionDialog
  },
  data() {
    return {
      studyPlanInfo: {
        id: null,
        title: '',
        passed_days: null,
        count_of_watched_sessions: null,
        count_of_remained_sessions: null
      },
      dialog: false
    }
  },
  computed: {
    studyPlanId() {
      return this.studyPlanInfo.id
    }
  },
  created() {
    this.getMyStudyPlan()
  },
  methods: {
    getMyStudyPlan() {
      this.$apiGateway.studyPlan.getMyStudyPlan()
        .then(studyPlanInfo => {
          this.studyPlanInfo = studyPlanInfo
          if (!studyPlanInfo.id) {
            this.dialog = true
          }
        })
        .catch(() => {})
    },
    onToggleDialog() {
      this.dialog = !this.dialog
    }
  }
})
</script>

<style lang="scss" scoped>
.triple-title-set-dashboard-container {
  padding: 40px 70px 0;

  @media only screen and (max-width: 600px) {
    padding: 30px 20px;
  }
}

.q-dialog__backdrop {
  backdrop-filter: blur(7px);
}
</style>

<template>
  <div class="triple-title-set-dashboard-container new-theme">
    <dashboard-header :studyPlanId="studyPlanId" />
    <daily-plan :studyPlanId="studyPlanId" />
    <status-and-review :loading="loading"
                       :studyPlanInfo="studyPlanInfo" />
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
import { mixinAuth } from 'src/mixin/Mixins.js'

export default defineComponent({
  name: 'TripleTitleSetDashboard',
  components: {
    DashboardHeader,
    DailyPlan,
    StatusAndReview,
    StudyPlanSelectionDialog
  },
  mixins: [mixinAuth],
  data() {
    return {
      loading: false,
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
  mounted() {
    if (this.isUserLogin) {
      this.afterAuthenticate()
    }
  },
  methods: {
    afterAuthenticate() {
      this.getMyStudyPlan()
    },
    getMyStudyPlan() {
      this.loading = true
      this.$apiGateway.studyPlan.getMyStudyPlan()
        .then(studyPlanInfo => {
          if (!studyPlanInfo || !studyPlanInfo.id) {
            this.dialog = true
          }
          this.loading = false
        })
        .catch(() => {
          this.$router.push({ name: 'Public.Home' })
          this.$q.notify({
            message: 'بارگذاری داشبورد با مشکل روبرو شده است، لطفا دوباره تلاش کنید',
            color: 'warning',
            position: 'top'
          })
          this.loading = false
        })
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

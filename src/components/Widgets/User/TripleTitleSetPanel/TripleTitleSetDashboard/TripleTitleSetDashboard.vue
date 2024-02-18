<template>
  <div class="triple-title-set-dashboard-container new-theme">
    <dashboard-header :studyPlanId="studyPlanId" />
    <daily-plan :studyPlanId="studyPlanId" />
    <status-and-review :loading="loading"
                       :studyPlanInfo="studyPlanInfo" />
    <study-plan-selection-dialog :dialog="dialog"
                                 @confirm="onConfirmChangeStudyPlan"
                                 @toggle-dialog="onToggleDialog" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinTripleTitleSet, mixinAuth } from 'src/mixin/Mixins.js'
import DailyPlan from 'src/components/DashboardTripleTitleSet/Dashboard/DailyPlan.vue'
import DashboardHeader from 'src/components/DashboardTripleTitleSet/Dashboard/DashboardHeader.vue'
import StatusAndReview from 'src/components/DashboardTripleTitleSet/Dashboard/StatusAndReview.vue'
import StudyPlanSelectionDialog from 'src/components/DashboardTripleTitleSet/Dashboard/StudyPlanSelectionDialog.vue'

export default defineComponent({
  name: 'TripleTitleSetDashboard',
  components: {
    DailyPlan,
    DashboardHeader,
    StatusAndReview,
    StudyPlanSelectionDialog
  },
  mixins: [mixinTripleTitleSet, mixinAuth],
  data () {
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
    studyPlanId () {
      return this.studyPlanInfo.id
    }
  },
  methods: {
    afterAuthenticate () {
      this.getMyStudyPlan()
    },
    getMyStudyPlan () {
      this.loading = true
      APIGateway.studyPlan.getMyStudyPlan()
        .then(studyPlanInfo => {
          if (!studyPlanInfo || !studyPlanInfo.id) {
            this.dialog = true
          }
          this.loading = false
        })
        .catch(() => {
          // this.$router.push({ name: 'Public.Home' })
          this.$q.notify({
            message: 'بارگذاری داشبورد با مشکل روبرو شده است، لطفا دوباره تلاش کنید',
            color: 'warning',
            position: 'top'
          })
          this.loading = false
        })
    },
    onToggleDialog () {
      this.dialog = !this.dialog
    },
    onConfirmChangeStudyPlan () {
      this.getMyStudyPlan()
    }
  }
})
</script>

<style lang="scss" scoped>
.triple-title-set-dashboard-container {
  padding: 40px 70px 0;

  @media only screen and (width <= 600px) {
    padding: 30px 20px;
  }
}

.q-dialog__backdrop {
  backdrop-filter: blur(7px);
}
</style>

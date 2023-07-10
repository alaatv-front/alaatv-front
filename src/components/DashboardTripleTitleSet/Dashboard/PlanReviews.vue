<template>
  <div class="review-wrapper">
    <div class="review-title">گزارش ها</div>
    <div class="review-list">
      <div v-for="(item, index) in reviewList"
           :key="index"
           class="review-item">
        <div class="review-item-title">
          {{ item.message }}
        </div>
        <div class="review">
          <q-btn flat
                 label="مشاهده"
                 :loading="loading"
                 @click="gotoLink(item.date)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Content } from 'src/models/Content'

export default defineComponent({
  name: 'PlanReviews',
  data() {
    return {
      reviewList: [],
      loading: false
    }
  },
  created() {
    this.getReviews()
  },
  methods: {
    getReviews() {
      this.$apiGateway.abrisham.getReports()
        .then(reportList => {
          this.reviewList = reportList
        })
        .catch(() => {})
    },
    gotoLink(date) {
      this.loading = true
      this.$apiGateway.studyPlan.getStudyPlans({
        study_event: 6,
        since_date: date,
        till_date: date
      })
        .then(studyPlanList => {
          // TODO: revert comparison to studyPlanId
          // this.planList = this.studyPlanList.list?.find(x => x.id === this.studyPlanId).plans.list
          if (studyPlanList.list.length === 0) {
            this.loading = false
            this.$q.notify({
              message: 'برنامه ای وجود ندارد',
              color: 'warning',
              position: 'top'
            })
            return
          }
          const planList = studyPlanList.list?.find(x => x.id === 216).plans.list
          if (planList.length === 0) {
            this.loading = false
            this.$q.notify({
              message: 'برنامه ای موردنظر پیدا نشد',
              color: 'warning',
              position: 'top'
            })
            return
          }
          const plan = planList.find(x => x.has_watched === false) || planList[planList.length - 1]
          const content = plan.contents.list.find(x => x.type.id === 4) || new Content()
          this.loading = false
          if (content.id) {
            this.$router.push({ name: 'UserPanel.Asset.TripleTitleSet.Content', params: { productId: plan.product.id, setId: content.set.id, contentId: content.id } })
          } else {
            this.$q.notify({
              message: 'ویدیویی یافت نشد',
              color: 'warning',
              position: 'top'
            })
          }
        })
        .catch(() => {
          this.$q.notify({
            message: 'مشکلی پیش آمده، لطفا دوباره تلاش کنید',
            color: 'warning',
            position: 'top'
          })
          this.loading = false
        })
    }
  }
})
</script>

<style lang="scss" scoped>
.review-wrapper {
  .review-title {
    color:#424242;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.4px;
  }

  .review-list {
    max-height: 270px;
    overflow-y: auto;
    .review-item {
      width: 100%;
      height: 120px;
      border-radius: 12px;
      background:#F5F7FA;
      margin: 10px 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      padding: 30px 20px 20px;

      .review-item-title {
        color: #424242;
        align-self: flex-start;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.32px;
        margin-bottom: 10px;

        @media only screen and (max-width: 600px) {
          font-size: 14px;
          letter-spacing: -0.28px;
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>

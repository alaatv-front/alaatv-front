<template>
  <div v-if="loading || reviewLoading"
       class="review-wrapper">
    <div class="review-title">
      <q-skeleton width="100px" />
    </div>
    <div class="review-list">
      <q-skeleton width="100%"
                  height="100px"
                  class="q-my-md" />
      <q-skeleton width="100%"
                  height="100px" />
    </div>
  </div>
  <div v-else
       class="review-wrapper">
    <div class="review-title">گزارش ها</div>
    <div v-if="reviewList.length > 0"
         class="review-list">
      <div v-for="(item, index) in reviewList"
           :key="index"
           class="review-item">
        <div class="review-item-title">
          {{ item.message }}
        </div>
        <div class="review">
          <q-btn flat
                 label="مشاهده"
                 :loading="linkLoading"
                 @click="markAsRead(item)" />
        </div>
      </div>
    </div>
    <div v-else
         class="review-list">
      <div class="review-item">
        <div class="review-item-title">
          گزارشی وجود ندارد
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PlanReviews',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    studyPlanId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      reviewList: [],
      linkLoading: false,
      reviewLoading: false
    }
  },
  watch: {
    studyPlanId () {
      this.getReviews()
    }
  },
  mounted () {
    this.getReviews()
  },
  methods: {
    getReviews () {
      this.reviewLoading = true
      this.$apiGateway.abrisham.getReports()
        .then(reportList => {
          this.reviewList = reportList
          this.reviewLoading = false
        })
        .catch(() => {
          this.reviewLoading = false
        })
    },
    markAsRead (item) {
      this.linkLoading = true
      this.$apiGateway.studyPlan.markAsRead(item.id)
        .then(() => {
          this.getReviews()
          this.linkLoading = false
        })
        .catch(() => {
          this.$q.notify({
            message: 'مشکلی پیش آمده، لطفا دوباره تلاش کنید',
            color: 'warning',
            position: 'top'
          })
          this.linkLoading = false
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

    @media only screen and (width <= 600px) {
      margin-top: 64px;
    }
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

      &.skeleton {
        background:transparent;
      }

      .review-item-title {
        color: #424242;
        align-self: flex-start;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.32px;
        margin-bottom: 10px;

        @media only screen and (width <= 600px) {
          font-size: 14px;
          letter-spacing: -0.28px;
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>

<template>
  <div class="row">
    <div class="col-12">
      <div class="daily-plan-wrapper">
        <div class="daily-plan-header">
          <div v-if="loading"
               class="plan-title">
            <q-skeleton height="35px"
                        width="130px" />
          </div>
          <div v-else
               class="plan-title">
            برنامه امروز
          </div>
          <div class="navigation">
            <q-btn class="navigation-btn"
                   round
                   icon="chevron_right"
                   @click="scrollToIndex('prev')" />
            <q-btn class="navigation-btn"
                   round
                   icon="chevron_left"
                   @click="scrollToIndex('next')" />
          </div>
        </div>
        <div v-if="loading"
             class="flex justify-evenly">
          <q-skeleton v-for="item in 4"
                      :key="item"
                      height="150px"
                      width="300px"
                      class="q-my-md" />
        </div>
        <div v-else
             class="scroll-wrapper">
          <q-virtual-scroll v-slot="{ item, index }"
                            ref="virtualListRef"
                            :items="planList"
                            virtual-scroll-horizontal
                            @virtual-scroll="onVirtualScroll">
            <div :key="index"
                 class="plan-item-wrapper">
              <plan-item :plan="item" />
            </div>
          </q-virtual-scroll>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mixinTripleTitleSet } from 'src/mixin/Mixins.js'
import PlanItem from 'src/components/DashboardTripleTitleSet/Dashboard/PlanItem.vue'
export default defineComponent({
  name: 'DailyPlan',
  components: {
    PlanItem
  },
  mixins: [mixinTripleTitleSet],
  props: {
    studyPlanId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      studyPlanList: [],
      planList: [],
      targetIndex: 0,
      virtualListIndex: 0,
      baseIndex: 3,
      lastScroll: 'next',
      loading: false
    }
  },
  watch: {
    studyPlanId () {
      this.getPlans()
    }
  },
  mounted () {
    this.getPlans()
  },
  methods: {
    getPlans () {
      const today = this.getToday()
      this.loading = true
      this.$apiGateway.studyPlan.getStudyPlanData({
        study_event: this.studyPlanId,
        since_date: today,
        till_date: today
      })
        .then(studyPlanList => {
          this.studyPlanList = studyPlanList
          this.planList = this.studyPlanList.list?.find(x => x.id === this.studyPlanId).plans.list
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    getToday () {
      const date = new Date()
      const year = {
        year: 'numeric'
      }
      const month = {
        month: '2-digit'
      }
      const day = {
        day: '2-digit'
      }

      return `${date.toLocaleDateString(undefined, year)}-${date.toLocaleDateString(undefined, month)}-${date.toLocaleDateString(undefined, day)}`
    },
    onVirtualScroll ({ index }) {
      if (this.targetIndex === index) {
        this.virtualListIndex = index
      }
    },
    scrollToIndex (dir) {
      this.targetIndex = 0
      if (dir === 'next' && this.virtualListIndex < this.planList.length - 1) {
        this.targetIndex = this.virtualListIndex + 1
      } else if (dir === 'prev' && this.virtualListIndex > 0) {
        this.targetIndex = this.virtualListIndex - 1
      }
      this.$refs.virtualListRef.scrollTo(this.targetIndex, 'start-force')
    }
  }
})
</script>

<style lang="scss" scoped>
.daily-plan-wrapper {
  height: 280px;
  width: 100%;
  margin: 30px 0 10px;

  .daily-plan-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .plan-title {
      color: #424242;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      letter-spacing: -0.4px;
    }

    .navigation-btn {
      color: #757575;
      background: #FFF;
      margin: 0 6px;
      border-radius: 50%;
    }
  }

  .scroll-wrapper {
    ::-webkit-scrollbar{
      width: 0 ;
      height: 0;
      border-radius: 0 ;
      background-color: transparent;
    }

    ::-webkit-scrollbar-track{
      border-radius: 0 ;
      background-color: transparent ;
    }

    ::-webkit-scrollbar-thumb{
      border-radius: 0 ;
      background-color: transparent;
    }

    .plan-item-wrapper {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      &:not(:first-child) {
        margin-left: 30px;

        @media only screen and (width <= 600px) {
          margin-left: 15px;
        }
      }
    }
  }
}
</style>

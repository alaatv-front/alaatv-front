<template>
  <div ref="studyPlan"
       class="study-plan-group">
    <q-card class="study-plan"
            flat>
      <!-- ----------------------------------------------------------------------------------------------------    loading-->
      <div class="study-plan-header-title">
        جدول برنامه مطالعاتی راه ابریشم آلاء
      </div>
      <div class="major-card">
        <span class="major-card-text">
          رشته:
        </span>
        <q-select v-model="selectedMajor"
                  :options="majors.list"
                  :option-value=" (item) => item"
                  option-label="name"
                  filled
                  dense
                  map-options
                  class="transparent"
                  dropdown-icon="mdi-chevron-down"
                  @update:model-value="changeSelectedMajor" />
      </div>
      <div id="study-scroll-1-x"
           class="all-the-expansions">
        <!--        <div class="row">-->
        <!--          <div-->
        <!--            class="study-plan-expansion"-->
        <!--          >-->
        <!--            {{studyPlanList.list.length}}-->
        <!--            <div-->
        <!--              v-for="(item, index) in studyPlanList.list"-->
        <!--              :key="item.date"-->
        <!--              :ref="index"-->
        <!--              :label="item.title"-->
        <!--              @click="planClicked(item,index)"-->
        <!--            >-->
        <!--              <div class="row">-->
        <!--                <div class="col-4 ">-->
        <!--                  <div class="study-plan-expansion-header-text bg-red"> {{ item.title }}</div>-->
        <!--                </div>-->
        <!--                <div class="col-4">-->
        <!--                  <div class="study-plan-expansion-header-text bg-green">-->
        <!--                    {{ item.convertDate().dayOfWeek }}-->
        <!--                  </div>-->
        <!--                </div>-->
        <!--                <div class="col-4">-->
        <!--                  <div class="study-plan-expansion-header-text">-->
        <!--                    {{ item.convertDate().dateOfMonth }}-->
        <!--                  </div>-->
        <!--                </div>-->
        <!--                <study-plan-->
        <!--                  :study-plan="item"-->
        <!--                  :selected-major="selectedMajor"-->
        <!--                  :study-plan-loading="studyPlanList.loading"-->
        <!--                  @contentClicked="contentClicked"-->
        <!--                />-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
        <study-plan v-for="(item, index) in studyPlanList.list"
                    :key="index"
                    :ref="index"
                    class="full-width"
                    :study-plan="item"
                    :selected-major="selectedMajor"
                    :study-plan-loading="studyPlanList.loading"
                    @contentClicked="contentClicked"
                    @click="planClicked(item,index)" />
      </div>
    </q-card>
  </div>
</template>

<script>
import StudyPlan from './StudyPlan.vue'
import { PlanList } from 'src/models/Plan.js'
import { Major, MajorList } from 'src/models/Major.js'
import { StudyPlanList } from 'src/models/StudyPlan.js'

export default {
  components: { StudyPlan },
  props: {
    value: { // majorId
      type: Number,
      default: 1
    },
    majors: {
      type: MajorList,
      default: () => new MajorList()
    },
    currentDate: {
      type: String,
      default: () => ''
    }
  },
  emits: ['update:value'],
  data() {
    return {
      openPlanIndexes: [],
      selectedMajor: new Major(),
      studyPlans: new StudyPlanList(),
      canReq: false,
      planList: new PlanList(),
      studyPlanList: new StudyPlanList()
    }
  },
  watch: {
    value: {
      handler(newValue) {
        if (!newValue) {
          return
        }
        this.setSelectedMajor()
        this.restPageData()
      }
    },
    currentDate: {
      handler(newValue) {
        if (!newValue) {
          return
        }
        this.loadCurrentDatePlan(newValue)
      }
    }
  },
  created() {
    this.initData()
  },
  updated() {
  },
  methods: {
    initData() {
      this.setSelectedMajor()
      this.loadStudyEvents()
    },

    async loadTodayPlan() {
      const todayPlan = this.studyPlanList.list.find(plan => plan.is_current)
      if (!todayPlan) {
        return
      }
      await this.openPlanExpansion(todayPlan.studyPlan_id)
    },

    async showStudyPlans(studyPlanIndex) {
      const studyPlan = this.studyPlanList.list[studyPlanIndex]
      const studyPlanId = studyPlan.studyPlan_id
      this.loadPlans(studyPlanId)
    },

    async openPlanExpansion(studyPlanId) {
      const target = this.getPlan(studyPlanId)
      const studyPlanIndex = target.index
      if (studyPlanIndex === -1) {
        return
      }
      const studyPlan = target.studyPlan

      await this.loadPlans(studyPlan.studyPlan_id)
      this.openPlanIndexes.push(studyPlanIndex)
    },

    async loadStudyEvents() {
      this.studyPlanList.loading = true
      const studyPlanNumber = 5
      try {
        this.studyPlanList = await this.$apiGateway.studyPlan.getStudyEvents(studyPlanNumber)
        this.studyPlanList.loading = false
        if (!this.currentDate) {
          await this.loadTodayPlan()
        }
      } catch {
        this.studyPlanList.loading = false
      }
    },

    async loadCurrentDatePlan(studyPlanDate) {
      const date = this.convertDateFormat(studyPlanDate)
      const target = this.getPlan(date, 'date')

      if (!target.studyPlan) {
        return
      }

      const currentPlanId = target.studyPlan.studyPlan_id
      await this.loadPlans(currentPlanId)
      this.openPlanIndexes.push(target.index)
      this.scrollTo(target.index)
    },

    async loadPlans(planId) {
      this.studyPlanList.loading = true
      if (!planId) return
      try {
        const studyPlans = await this.$apiGateway.studyPlan.getPlans(planId)
        this.setPlan(planId, studyPlans)
        this.studyPlanList.loading = false
      } catch (e) {
        this.studyPlanList.loading = false
      }
    },

    // async getStudyPlan () {
    //   const cacheKey = 'user-schedule-study-plan-group-getStudyPlan'
    //   const response = await this.getData(cacheKey, this.getStudyPlanData)
    //   if (response.status === 200) {
    //     return new StudyPlanList(response.data.data)
    //   }
    //   return new StudyPlanList()
    // },

    // async getPlanData(planId) {
    //   const cacheKey = 'user-schedule-study-plan-group-get-' + planId + '-plan'
    //   const response = await this.getData(cacheKey, this.getPlanDataReq, { planId })
    //   if (response.status === 200) {
    //     return new StudyPlanList(response.data.data)
    //   }
    //   return new StudyPlanList()
    // },

    // getStudyPlanData() {
    //   const studyPlanNumber = 5
    //   return axios.get('/api/v2/studyEvent/' + studyPlanNumber + '/studyPlans')
    // },

    getMajor(id) {
      return this.majors.list.find(major => major.id === id)
    },

    getFirstMajor() {
      return this.majors.list[0]
    },

    getTodayDate() {
      let todayDate = new Date()
      const date = String(todayDate.getDate()).padStart(2, '0')
      const month = String(todayDate.getMonth() + 1).padStart(2, '0') // January is 0!
      const year = todayDate.getFullYear()
      todayDate = String(year + '-' + month + '-' + date)
      return todayDate
    },

    getPlan(planKey, key) {
      let planIndex = -1
      let target
      if (!key) {
        key = 'studyPlan_id'
      }
      this.studyPlanList.list.find((studyPlan, index) => {
        if (studyPlan[key] === planKey) {
          planIndex = index
          target = studyPlan
          return true
        }
        return false
      })

      return {
        studyPlan: target,
        index: planIndex
      }
    },

    // getPlanDataReq(params) {
    //   return axios.get('/api/v2/studyPlan/' + params.planId + '/plans')
    // },

    setSelectedMajor() {
      const majorId = this.value
      let major = this.getFirstMajor()
      if (majorId) {
        major = this.getMajor(majorId)
      }

      this.selectedMajor = major
    },

    setPlan(planId, planData) {
      const studyPlan = this.getPlan(planId).studyPlan
      if (!studyPlan) {
        return
      }
      studyPlan.plans = new PlanList(planData)
    },

    restPageData() {
      this.resetAllPlans()
      this.closeAllPlans()
      if (this.currentDate) {
        this.loadCurrentDatePlan(this.currentDate)
      }
    },

    resetAllPlans() {
      this.studyPlanList.list.forEach(studyPlan => {
        studyPlan.plans = new PlanList()
      })
    },

    changeSelectedMajor() {
      this.$emit('update:value', this.selectedMajor.id)
    },

    closeAllPlans() {
      this.openPlanIndexes = []
    },

    planClicked(studyPlan, index) {
      const studyPlanId = studyPlan.studyPlan_id
      const isPlanOpen = this.isPlanOpen(index)
      isPlanOpen ? this.closePlan(studyPlanId) : this.loadPlans(studyPlanId)
    },

    isPlanOpen(studyPlanIndex) {
      return this.openPlanIndexes.includes(studyPlanIndex)
    },

    closePlan(planId) {
      // this.openingPlanId = this.openingPlanId.filter(id => id !== planId )
    },

    convertDateFormat(date) {
      if (date.includes('/')) {
        return date.split('/').join('-')
      }
      return date
    },

    closePlan2(planId) {
      this.studyPlanList.list[planId].plans = new PlanList()
    },

    contentClicked(content) {
      this.$emit('contentClicked', content)
    },

    scrollTo(id) {
      if (this.$refs[id] && this.$refs[id][0]) {
        this.$refs[id][0].$el.scrollIntoView()
      }
      const scrollIsMoved = true
      this.$emit('scrollIsMoved', scrollIsMoved)
    }
  }
}
</script>

<style lang="scss" scoped>
.study-plan-group {
  .study-plan {
    background-color: #ffe2bc;
    color: #3e5480;
    padding: 40px 60px 51px;
    border-radius: 30px;
    position: relative;

    @media screen and (width <= 1919px) {
      padding: 40px 45px 50px;
    }

    @media screen and (width <= 1200px) {
      border-radius: 20px;
      padding: 30px 35px 78px;
    }

    @media screen and (width <= 767px) {
      padding: 25px 23px 48px;
    }

    @media screen and (width <= 575px) {
      padding: 25px 7px 18px;
    }

    .study-plan-header-title {
      font-size: 20px;
      font-weight: 500;
      text-align: center;
      margin-bottom: 56px;

      @media screen and (width <= 1919px) {
      }

      @media screen and (width <= 1200px) {
        margin-bottom: 20px;
      }

      @media screen and (width <= 767px) {
      }

      @media screen and (width <= 575px) {
        margin-bottom: 25px;
      }
    }

    .major-card {
      display: flex;
      flex-direction: row;
      text-align: center;
      align-items: center;
      position: absolute;
      top: 42px;

      //margin-top: -57px;
      margin-left: 15px !important;

      @media only screen and (width <= 1200px) {
        //margin-top: -32px;
        position: static;
        margin-bottom: 30px;
      }

      @media only screen and (width <= 768px) {
        justify-content: center;
        margin-bottom: 25px;
      }

      :deep(.q-field ) {
        width: 195px;

        @media only screen and (width <= 1904px) {
          width: 177px;
        }

        @media only screen and (width <= 1200px) {
          width: 136px;
        }

        @media only screen and (width <= 990px) {
          width: 136px;
        }
      }

      :deep(.q-field__control)::after {
        height: 0;
      }

      .v-text-field {
        &.v-text-field--enclosed {
          padding-top: 15px;
          margin-right: 15px !important;

          @media only screen and (width <= 1200px) {
            padding-top: 35px;
          }
        }
      }

      .major-card-text {
        margin-right: 4%;
        font-size: 16px;

        @media only screen and (width <= 768px) {
          margin-right: 10px;
        }

      }
    }

    .all-the-expansions {
      height: 540px;
      overflow: hidden scroll;

      @media only screen and (width <= 1200px) {
        height: 527px;
      }

      @media only screen and (width <= 990px) {
        height: 547px;
      }

      @media only screen and (width <= 768px) {
        height: 466px;
      }

      @media only screen and (width <= 350px) {
        height: 446px;
      }

      .study-plan-expansion {
        padding: 0 80px;

        @media only screen and (width <= 1904px) {
          padding: 0 60px;
        }

        @media only screen and (width <= 1200px) {
          padding: 0 48px;
        }

        @media only screen and (width <= 768px) {
          padding: 0 37px;
        }

        @media only screen and (width <= 576px) {
          padding: 0 20px;
        }

        &.theme--light {
          &.v-expansion-panels {
            .v-expansion-panel {
              margin-top: 15px;
              border-radius: 20px !important;
            }
          }
        }

        .study-plan-expansion-header {
          font-size: 18px;
          font-weight: normal;
          line-height: normal;
          text-align: right;
          color: #3e5480;

          @media only screen and (width <= 768px) {
            font-size: 14px;
          }

          .q-card__subtitle, .q-card__text {
            font-size: 0.875rem;
            font-weight: 400;
            line-height: 1.375rem;
            letter-spacing: 0.0071428571em;
            margin-right: 38px;
          }
        }
      }
    }
  }
}

#study-scroll-1-x {
  &::-webkit-scrollbar-track {
    border-radius: 6px;
    background-color: #F5F5F5;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: #f7941d;
  }
}

@media only screen and (width <= 1200px) {
  .q-card > :first-child:not(.v-btn, .v-chip, .v-avatar), .q-card > .q-card__progress + :not(.v-btn, .v-chip, .v-avatar) {
    border-radius: 20px;
  }
}

@media only screen and (width <= 768px) {
  .v-text-field.v-text-field--solo .v-input__control {
    min-height: 40px;
  }
}
</style>
<style lang="scss">
.v-text-field fieldset, .v-text-field .v-input__control, .v-text-field .v-input__slot {
  border-radius: 10px !important;
}

.v-expansion-panel-content__wrap {
  box-shadow: 0 0 0 0;
}

.study-plan-expansion {
  .v-expansion-panel {
    .v-expansion-panel-content__wrap {
      box-shadow: 0 0 0 0;
      padding: 0 20px 16px !important;

      @media screen and (width <= 990px) {
        padding: 0 15px 16px !important;
      }

      @media screen and (width <= 768px) {
        padding: 0 5px 10px !important;
      }

      @media screen and (width <= 576px) {
        padding: 0 5px 9px !important;
      }
    }
  }
}

@media only screen and (width <= 768px) {
  .study-plan-group .v-text-field.v-text-field--solo .v-input__control {
    min-height: 40px;
  }
}
</style>

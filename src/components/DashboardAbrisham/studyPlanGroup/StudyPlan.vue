<template>
  <q-expansion-item class="bg-white test">
    <template v-slot:header>
      <div class="row full-width">
        <div class="col-3 header-text-style">{{studyPlan.title}}</div>
        <div class="col-4 header-text-style"> {{ studyPlan.convertDate().dayOfWeek }}</div>
        <div class="col-4 header-text-style"> {{ studyPlan.convertDate().dateOfMonth }}</div>
      </div>
    </template>

    <q-card class="content"
            flat>
      <div class="study-plan-card">
        <time-schedule-table :selectedPanel="selectedPlan"
                             :plans="studyPlan.plans"
                             :selected-major="selectedMajor"
                             :loading="studyPlanLoading"
                             :header-width="setHeaderWidthForMediaTags"
                             :not-the-same-plan="notTheSamePlan"
                             @planClicked="loadSelectedPlan" />
      </div>
      <individual-plan-details :selected-plan="selectedPlan"
                               :showPanelDetail="showDetail"
                               @contentClicked="contentClicked" />
    </q-card>
  </q-expansion-item>
</template>

<script>
import { Major } from 'src/models/Major.js'
import { StudyPlan } from 'src/models/StudyPlan.js'
import { Plan, PlanList } from 'src/models/Plan.js'
import timeScheduleTable from './TimeScheduleTable.vue'
import IndividualPlanDetails from './IndividualPlanDetails.vue'

export default {
  components: {
    timeScheduleTable,
    IndividualPlanDetails
  },
  props: {
    studyPlan: {
      type: StudyPlan,
      default () {
        return new StudyPlan({
          studyPlan_id: 175,
          id: 144,
          date: '2021-03-22',
          voice: null,
          body: null,
          title: null,
          contents: null
        })
      }
    },
    selectedMajor: {
      default () {
        return new Major({
          id: 1,
          name: 'ریاضی'
        })
      },
      type: Major
    },
    studyPlanLoading: {
      type: Boolean,
      default: () => false
    },
    openedPanel: {
      default () {
        return false
      },
      type: Boolean
    }
  },
  data () {
    return {
      planList: new PlanList(),
      selectedPlan: new Plan(),
      openedStudyPanel: [],
      notTheSamePlan: false,
      showDetail: false
    }
  },
  computed: {
    setHeaderWidthForMediaTags () {
      return 200
      // if (this.$store.getters.windowSize.x < 1920) {
      //   return 140
      // } else if (this.$store.getters.windowSize.x < 768) {
      //   return 100
      // } else if (this.$store.getters.windowSize.x > 1920) {
      //   return 200
      // }
    }
  },
  methods: {
    contentClicked (content) {
      this.$emit('contentClicked', content)
    },
    loadSelectedPlan (plan) {
      if (this.selectedPlan.id !== plan.id) {
        this.selectedPlan = plan
        this.showDetail = true
        return
      }
      this.showDetail = false
      this.selectedPlan = new Plan()
    }
  }
}
</script>

<style lang="scss" scoped>
.test{
  margin-bottom: 15px;
  border-radius: 20px;

  :deep(.q-item){
    height: 60px;

    @media screen and (width <= 1200px){
      height: 50px;
    }
  }

  .content{
    border-radius:20px ;

    .study-plan-card{
      padding:0 40px 32px;

      @media screen and (width <= 990px ) {
        padding:0 30px 32px;
      }

      @media screen and (width <= 767px ) {
        padding:0 10px 21px;
      }
    }
  }

  .header-text-style{
    font-size: 18px;
    font-weight: normal;
    line-height: normal;
    color: #3e5480;
    display: flex;
    align-items: center;

    @media only screen and (width <= 768px) {
      font-size: 14px;
    }
  }
}

.study-plan-boxes{
    color:  #3e5480;
    margin-bottom: 1px;
    border-radius: 0 0 10px 10px;
    width: 99.6%;
    padding-top: 20px;

    @media only screen and (width <= 768px){
        padding-top: 0;
    }

    .study-plan-card{
        background-color: #e1f0ff;
        color: #3e5480;
        margin-top: 10px;
        margin-right: 0;
    }
}

.v-card{
    padding-top: 0 !important;

    .v-card__text{
        padding: 4px 0 !important;

        @media  screen and (width <= 768px){
            padding: 0 !important;
        }

    }
}

.theme--light.v-sheet .study-plan-sheet {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    background-color: #eff3ff;
    color:  #3e5480;
    border-color: #FFF;
    padding-top: 7px;
    padding-bottom: 5px;
    border-radius: 10px;
}

.v-expansion-panels:not(.v-expansion-panels--accordion, .v-expansion-panels--tile) > .v-expansion-panel--active {
    border-radius: 20px !important;
}

.v-expansion-panels:not(.v-expansion-panels--accordion, .v-expansion-panels--tile) > .v-expansion-panel--active {
    box-shadow: 0 3px 10px 0 rgb(0 0 0 / 10%);
}

.study-plan-card .theme--light.v-card > .v-card__text, .theme--light.v-card > .v-card__subtitle {
    color: rgb(0 0 0 / 60%);
    background-color: #e1f0ff;
}

</style>
<style lang="scss">
.v-text-field fieldset, .v-text-field .v-input__control, .v-text-field .v-input__slot {
    border-radius: 10px !important;
}
</style>

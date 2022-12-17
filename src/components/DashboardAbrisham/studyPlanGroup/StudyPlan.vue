<template>
  <!--  <div>-->

  <!--        <q-card-->
  <!--          class="study-plan-boxes"-->
  <!--          elevation="0"-->
  <!--        >-->
  <!--          <v-expansion-panel-content>-->
  <!--            &lt;!&ndash;        <v-progress-linear&ndash;&gt;-->
  <!--            &lt;!&ndash;          indeterminate&ndash;&gt;-->
  <!--            &lt;!&ndash;          background-color="blue lighten-4"&ndash;&gt;-->
  <!--            &lt;!&ndash;          color="blue accent-2"&ndash;&gt;-->
  <!--            &lt;!&ndash;          :active="studyPlanLoading"&ndash;&gt;-->
  <!--            &lt;!&ndash;        />&ndash;&gt;-->

  <!--            &lt;!&ndash;                    <v-sheet&ndash;&gt;-->
  <!--            &lt;!&ndash;                        class="study-plan-sheet"&ndash;&gt;-->
  <!--            &lt;!&ndash;                    >&ndash;&gt;-->
  <!--            &lt;!&ndash;                        فردا دیره، دیروز هم دیشب تموم شد، الان دقیقا لحظه ای هست که باید شروع&ndash;&gt;-->
  <!--            &lt;!&ndash;                        کنی!&ndash;&gt;-->
  <!--            &lt;!&ndash;                    </v-sheet>&ndash;&gt;-->
  <!--            <v-card-->
  <!--              class="study-plan-card"-->
  <!--              elevation="0"-->
  <!--            >-->
  <!--              <v-card-text>-->
  <!--                <time-schedule-table-->
  <!--                  v-if="!studyPlanLoading"-->
  <!--                  :selectedPanel="selectedPlan"-->
  <!--                  :plans="studyPlan.plans"-->
  <!--                  :selected-major="selectedMajor"-->
  <!--                  :loading="studyPlanLoading"-->
  <!--                  :header-width="setHeaderWidthForMediaTags"-->
  <!--                  :not-the-same-plan="notTheSamePlan"-->
  <!--                  @planClicked="loadSelectedPlan"-->
  <!--                />-->
  <!--              </v-card-text>-->
  <!--            </v-card>-->
  <!--          </v-expansion-panel-content>-->
  <!--          <individual-plan-details-->
  <!--            :selected-plan="selectedPlan"-->
  <!--            :showPanelDetail="showDetail"-->
  <!--            @contentClicked="contentClicked"-->
  <!--          />-->
  <!--        </q-card>-->

  <!--  </div>-->
  <q-expansion-item class="bg-white test">
    <template v-slot:header>
      <div class="row full-width">
        <div class="col-4 header-text-style">{{studyPlan.title}}</div>
        <div class="col-4 header-text-style"> {{ studyPlan.convertDate().dayOfWeek }}</div>
        <div class="col-4 header-text-style"> {{ studyPlan.convertDate().dateOfMonth }}</div>
      </div>
    </template>

    <q-card class="content"
            flat>
      <q-card-section class="study-plan-card">
        <time-schedule-table
          :selectedPanel="selectedPlan"
          :plans="studyPlan.plans"
          :selected-major="selectedMajor"
          :loading="studyPlanLoading"
          :header-width="setHeaderWidthForMediaTags"
          :not-the-same-plan="notTheSamePlan"
          @planClicked="loadSelectedPlan"
        />
      </q-card-section>
      <individual-plan-details
        :selected-plan="selectedPlan"
        :showPanelDetail="showDetail"
        @contentClicked="contentClicked"
      />
    </q-card>
  </q-expansion-item>
</template>

<script>

import { StudyPlan } from 'src/models/StudyPlan'
import { Plan, PlanList } from 'src/models/Plan'
import { Major } from 'src/models/Major'
import IndividualPlanDetails from './IndividualPlanDetails'
import timeScheduleTable from './TimeScheduleTable'

export default {
  components: {
    timeScheduleTable,
    IndividualPlanDetails
  },
  props: {
    studyPlan: {
      type: StudyPlan,
      default() {
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
      default() {
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
      default() {
        return false
      },
      type: Boolean
    }
  },
  data() {
    return {
      planList: new PlanList(),
      selectedPlan: new Plan(),
      openedStudyPanel: [],
      notTheSamePlan: false,
      showDetail: false
    }
  },
  computed: {
    setHeaderWidthForMediaTags() {
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
  watch: {
    studyPlan(val) {
      console.log('hhhhhhhhhhhhhhhhhhh', val)
    }
  },
  methods: {
    contentClicked(content) {
      this.$emit('contentClicked', content)
    },
    loadSelectedPlan(plan) {
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
  }
  .content{
    border-radius:20px ;
  }
  .header-text-style{
    font-size: 18px;
    font-weight: normal;
    line-height: normal;
    color: var(--abrishamMain);
    display: flex;
    align-items: center;
    @media only screen and (max-width: 768px) {
      font-size: 14px;
    }
  }
}
.study-plan-boxes{
    color: #3e5480;
    margin-bottom: 1px;
    border-radius: 0 0 10px 10px;
    width: 99.6%;
    padding-top: 20px;
    @media only screen and (max-width: 768px){
        padding-top: 0px;
    }
    .study-plan-card{
        background-color: #e1f0ff;
        color: #3e5480;
        margin-top: 10px;
        margin-right: 0;
        padding: 0 5px 6px;
    }
}
.v-card{
    padding-top: 0 !important;
    .v-card__text{
        padding: 4px 0 !important;
        @media  screen and (max-width: 768px){
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
    color: #3e5480;
    border-color: #FFFFFF;
    padding-top: 7px;
    padding-bottom: 5px;
    border-radius: 10px;
}
.v-expansion-panels:not(.v-expansion-panels--accordion):not(.v-expansion-panels--tile) > .v-expansion-panel--active {
    border-radius: 20px !important;
}
.v-expansion-panels:not(.v-expansion-panels--accordion):not(.v-expansion-panels--tile) > .v-expansion-panel--active {
    box-shadow: 0 3px 10px 0 rgb(0 0 0 / 10%);
}
.study-plan-card .theme--light.v-card > .v-card__text, .theme--light.v-card > .v-card__subtitle {
    color: rgba(0, 0, 0, 0.6);
    background-color: #e1f0ff;
}

</style>
<style lang="scss">
.v-text-field fieldset, .v-text-field .v-input__control, .v-text-field .v-input__slot {
    border-radius: 10px !important;
}
</style>

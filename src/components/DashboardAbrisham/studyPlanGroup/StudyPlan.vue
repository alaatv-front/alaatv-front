<template>
    <v-expansion-panel-content>
    <v-card
        class="study-plan-boxes"
        elevation="0"
    >
        <v-expansion-panel-content>
            <v-progress-linear
                indeterminate
                background-color="blue lighten-4"
                color="blue accent-2"
                :active="studyPlanLoading"
            />
<!--                    <v-sheet-->
<!--                        class="study-plan-sheet"-->
<!--                    >-->
<!--                        فردا دیره، دیروز هم دیشب تموم شد، الان دقیقا لحظه ای هست که باید شروع-->
<!--                        کنی!-->
<!--                    </v-sheet>-->
            <v-card
                class="study-plan-card"
                elevation="0"
            >
                <v-card-text>
                    <time-schedule-table
                        v-if="!studyPlanLoading"
                        :selectedPanel="selectedPlan"
                        :plans="studyPlan.plans"
                        :selected-major="selectedMajor"
                        :loading="studyPlanLoading"
                        :header-width="setHeaderWidthForMediaTags"
                        :not-the-same-plan="notTheSamePlan"
                        @planClicked="loadSelectedPlan"
                    />
                </v-card-text>
            </v-card>
        </v-expansion-panel-content>
        <individual-plan-details
            :selected-plan="selectedPlan"
            :showPanelDetail="showDetail"
            @contentClicked="contentClicked"
        />
    </v-card>
    </v-expansion-panel-content>
</template>

<script>
import timeScheduleTable from './TimeScheduleTable'
import { StudyPlan } from '../../../../../Model/StudyPlan'
import {Plan, PlanList} from '../../../../../Model/Plan'
import {Major} from '../../../../../Model/Major'
import IndividualPlanDetails from './IndividualPlanDetails'

export default {
    props: {
        studyPlan: {
            type: StudyPlan,
            default() {
                return new StudyPlan({
                    'studyPlan_id': 175,
                    'id': 144,
                    'date': '2021-03-22',
                    'voice': null,
                    'body': null,
                    'title': null,
                    'contents': null
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
        studyPlanLoading : {
            type: Boolean,
            default: () => false
        },
        openedPanel : {
            default() {
                return false
            },
            type: Boolean
        }
    },
    components :{
        timeScheduleTable
        ,IndividualPlanDetails,
    },
    created() {

    },
    data() {
        return {
            planList : new PlanList(),
            selectedPlan: new Plan(),
            openedStudyPanel : [],
            notTheSamePlan : false,
            showDetail: false
        }
    },
    computed :{
        setHeaderWidthForMediaTags() {
            if (this.$store.getters.windowSize.x < 1920){
                return 140
            }
            else if (this.$store.getters.windowSize.x < 768){
                return 100
            }
            else if (this.$store.getters.windowSize.x > 1920){
                return 200

            }
        }
    },
    methods: {
        contentClicked(content){
            this.$emit('contentClicked' , content )
        },
        loadSelectedPlan(plan){
            if (this.selectedPlan.id !== plan.id){
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

<template>
  <p class="text-center q-pa-lg">:) the study plan say hi </p>
  <div class="row justify-center">
    <div class="col-2 text-center">
      <q-btn @click="openEmptyForm"
             color="green"
      >
        ایجاد برنامه جدید
      </q-btn>
    </div>
    <div class="col-12">
      <filter-plans
        :majors="majors"
        :lessonList="lessons"
        :selected-major-id="selectedMajorId"
        @changeSelectedLesson="updateSelectedLesson"
        @changeMajorId="setSelectedMajorId"
      />
    </div>
    <div class="col-12">
      <full-calender-plans
        :filterdPlans="filterPlanByLesson"
        @handelPlanEvent="handelPlanEvent"
      />
    </div>
  </div>
  <q-dialog
    full-width
    v-model="showPlanDetail">
    <q-card>
      <q-card-section>
        <form-builder
          ref="studyPlanForm"
          :value="inputs"
        />
        <q-btn
          color="green"
          @click="updatePlan"
        >
          ذخیره
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="deletePlanDialog"
            persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="trash"
                  color="primary"
                  text-color="white" />
        <span class="q-ml-sm">
          ?! You are sure
        </span>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat
               label="Cancel"
               color="primary"
               text
               v-close-popup  />
        <q-btn flat
               label="yes"
               text
               color="green"
               v-close-popup
               @click="deletePlan"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import FilterPlans from 'components/StudyPlanAdmin/FilterPlans'
import FullCalenderPlans from 'components/StudyPlanAdmin/FullCalenderPlans'
import StudyPlansData from 'assets/js/StudyPlansData'
import { StudyPlanList } from 'src/models/StudyPlan'
import { PlanList } from 'src/models/Plan'
import ContentsType from 'components/StudyPlanAdmin/ContentsType'
import PlanStylePreview from 'components/StudyPlanAdmin/planStylePreview'
import { FormBuilder, inputMixin } from 'quasar-form-builder'
import Addresses from 'src/api/Addresses'

export default {
  name: 'StudyPlan',
  mixins: [inputMixin],
  components: {
    FilterPlans,
    FullCalenderPlans,
    FormBuilder,
    ContentsType,
    PlanStylePreview
  },
  props: {},
  data: () => ({
    currentPlanId: null,
    showPlanDetail: false,
    deletePlanDialog: false,
    selectedMajorId: 1,
    selectedLesson: [],
    lessons: [],
    majors: [
      {
        title: ' ریاضی',
        id: 1
      },
      {
        title: 'تجربی',
        id: 2
      },
      {
        title: 'انسانی',
        id: 3
      }],
    plans: [],
    studyPlansData: null,
    riaziPlans: new StudyPlanList(),
    tajrobiPlans: new StudyPlanList(),
    ensaniPlans: new StudyPlanList(),
    studyPlans: new StudyPlanList(),
    inputs: [
      { type: 'input', value: '', name: 'title', responseKey: 'title', label: 'عنوان', col: 'col-md-4' },
      { type: 'input', value: '', name: 'tooltip', responseKey: 'tooltip', label: 'تولتیپ', col: 'col-md-4' },
      {
        type: 'select',
        name: 'major',
        value: 'major.id',
        responseKey: 'major',
        optionLabel: 'title',
        optionValue: 'id',
        options: [{ title: 'ریاضی', id: 1 }, { title: 'تجربی', id: 2 }, { title: 'انسانی', id: 3 }],
        label: 'رشته',
        col: 'col-md-4'
      },
      {
        type: 'tiptapEditor',
        responseKey: 'description',
        name: 'description',
        label: 'توضیحات',
        value: '',
        options: {
          bubbleMenu: false,
          floatingMenu: false,
          poem: false,
          reading: false,
          persianKeyboard: true,
          mathliveOptions: { smartFence: false },
          uploadServer: {
            url: 'imageUrl',
            instantUpload: true,
            headers: { Authorization: 'Bearer ' + '65465' }
          }
        },
        col: 'col-md-12'
      },
      { type: ContentsType, props: { name: 'mitra' }, value: [], name: 'ContentsType', label: 'ssss', col: 'col-md-12' },
      { type: 'date', name: 'date', responseKey: 'date', value: '2021-08-27', label: 'تاریخ', col: 'col-md-4' },
      { type: 'time', responseKey: 'start', name: 'start', value: '', label: 'از :', col: 'col-md-4' },
      { type: 'time', responseKey: 'end', name: 'end', value: '', label: 'تا:', col: 'col-md-4' },
      {
        type: PlanStylePreview,
        props: {
          title: 'ff'
        },
        value: {
          backgroundColor: '',
          borderColor: '',
          textColor: ''
        },
        name: 'PlanStylePreview',
        label: 'ssss',
        col: 'col-12'
      },
      {
        type: 'color',
        responseKey: 'backgroundColor',
        name: 'backgroundColor',
        value: '',
        label: 'رنگ پس زمینه',
        col: 'col-md-4'
      },
      { type: 'color', responseKey: 'borderColor', name: 'borderColor', value: '', label: 'رنگ کادر', col: 'col-md-4' },
      { type: 'color', responseKey: 'textColor', name: 'textColor', value: '', label: 'رنگ متن', col: 'col-md-4' }
    ]
  }),
  computed: {
    filterPlanByLesson () {
      let filteredPlanBySelectedMajor = this.filterPlanByMajor()
      if (this.selectedLesson.length > 0) {
        filteredPlanBySelectedMajor = this.filterPlansByLessons(filteredPlanBySelectedMajor)
      }
      return filteredPlanBySelectedMajor
    },
    planBackgroundColor () {
      return this.inputs.find(item => item.name === 'backgroundColor').value
    },
    planTextColor () {
      return this.inputs.find(item => item.name === 'textColor').value
    },
    planBorderColor () {
      return this.inputs.find(item => item.name === 'borderColor').value
    }
  },
  watch: {
    selectedMajorId: {
      handler (newValue) {
        if (!newValue) {
          return
        }
        this.selectedLesson = []
        this.setLessons()
      }
    },
    planBackgroundColor: {
      handler (newValue) {
        if (!newValue) {
          return
        }
        this.setPlanPreviewBackground(newValue)
      }
    },
    planTextColor: {
      handler (newValue) {
        if (!newValue) {
          return
        }
        this.setPlanPreviewTextColor(newValue)
      }
    },
    planBorderColor: {
      handler (newValue) {
        if (!newValue) {
          return
        }
        this.setPlanPreviewBorder(newValue)
      }
    }
  },
  created () {
    this.setDates(StudyPlansData)
    this.initPageData()
  },
  methods: {
    handelPlanEvent (data, type) {
      switch (type) {
        case 'edit':
          this.editPlanEvent(data)
          break
        case 'delete':
          this.deletePlanEvent(data)
          break
        case 'copy':
          this.copyPlanEvent(data)
          break
      }
    },

    async creatNewPlan (submitData) {
      console.log('creat plan')
      return this.$axios.post(Addresses.studyPlan.edit, submitData)
    },

    async deletePlanEvent (planId) {
      console.log('delete plan ', planId)
      this.deletePlanDialog = true
      await this.deletePlan()
    },

    deletePlan () {
      // return axios.delete new event modal 580
    },

    copyPlanEvent (planData) {
      console.log('copy plan event')
    },

    editPlanEvent (planData) {
      this.showPlanDetail = true
      this.currentPlanId = planData.id
      console.log('currentPlanId :', this.currentPlanId)
      this.$nextTick(() => {
        this.$refs.studyPlanForm.setInputValues(planData)
        this.setCustomComponentData(planData)
      })
    },

    async updatePlan () {
      // creat or edit
      const submitData = this.getNewPlanData()
      console.log('submitData :', submitData)
      if (this.currentPlanId) {
        await this.senNewPlanData(submitData)
      } else {
        await this.creatNewPlan(submitData)
      }
    },

    openEmptyForm () {
      console.log(this.inputs)
      this.clearCurrentPlan()
      this.showPlanDetail = !this.showPlanDetail
    },

    clearCurrentPlan () {
      this.inputs.forEach(item => {
        item.value = ''
      })
      this.currentPlanId = null
    },

    filterPlanByMajor () {
      if (this.selectedMajorId === 1) {
        return this.riaziPlans
      } else if (this.selectedMajorId === 2) {
        return this.tajrobiPlans
      }
      return this.ensaniPlans
    },

    filterPlansByLessons (studyPlans) {
      const filterdStudyPlan = new StudyPlanList()
      studyPlans.list.forEach(studyPlan => {
        const planList = this.FilterBySelectedLessons(studyPlan.plans)
        filterdStudyPlan.addItem({
          id: studyPlan.id,
          title: studyPlan.title,
          date: studyPlan.date,
          plans: planList
        })
      })
      return filterdStudyPlan
    },

    FilterBySelectedLessons (plans) {
      let planList = []
      this.selectedLesson.forEach(lesson => {
        const filteredPlan = plans.list.filter(plan => {
          return plan.title === lesson
        })
        planList = planList.concat(filteredPlan)
      })
      return new PlanList(planList)
    },

    updateSelectedLesson (lessons) {
      this.selectedLesson = lessons
    },

    initPageData () {
      const userData = this.getUserData()
      if (!userData) {
        this.setSelectedMajorId(1)
        return
      }
      const majorId = userData.major.id
      this.setSelectedMajorId(majorId)
      this.classificationPlans()
      this.setLessons()
    },

    classificationPlans () {
      // this.studyPlans.list.forEach(studyPlan => {
      //   studyPlan.plans.list.forEach(plan => {
      //     const plansMajorId = plan.major.id
      //     if (plansMajorId === 1) {
      //
      //     } else if (plansMajorId === 2) {
      //       this.tajrobiPlans.list.plans.list.push(plan)
      //     } else {
      //       this.ensaniPlans.list.plans.list.push(plan)
      //     }
      //   })
      // })
      this.studyPlans.list.forEach(studyPlan => {
        this.riaziPlans.addItem({
          id: studyPlan.id,
          title: studyPlan.title,
          date: studyPlan.date,
          plans: studyPlan.plans.list.filter(plan => plan.major.id === 1)
        })
        this.tajrobiPlans.addItem({
          id: studyPlan.id,
          title: studyPlan.title,
          date: studyPlan.date,
          plans: studyPlan.plans.list.filter(plan => plan.major.id === 2)
        })
        this.ensaniPlans.addItem({
          id: studyPlan.id,
          title: studyPlan.title,
          date: studyPlan.date,
          plans: studyPlan.plans.list.filter(plan => plan.major.id === 3)
        })
      })
    },

    // ----------------------------------------- getters  ----------------------------------------------
    getUserData () {
      return this.$store.getters['Auth/user']
    },

    getPlanInput (planName) {
      return this.inputs.find(item => item.name === planName)
    },

    getNewPlanData () {
      return {
        date: this.getPlanInput('date').value,
        major_id: this.getPlanInput('major').value,
        title: this.getPlanInput('title').value,
        description: this.getPlanInput('tooltip').value,
        long_description: this.getPlanInput('description').value,
        start: this.getPlanInput('start').value,
        end: this.getPlanInput('end').value,
        background_color: this.getPlanInput('backgroundColor').value,
        border_color: this.getPlanInput('borderColor').value,
        text_color: this.getPlanInput('textColor').value,
        contents: this.getPlanInput('ContentsType').value,
        event_id: this.getPlanInput('backgroundColor').value
      }
    },

    // ----------------------------------------- set   ----------------------------------------------
    setDates (days) {
      if (days.length === 0) {
        return
      }
      const firstDate = days[0].date
      const newDays = days.filter(plan => plan.date !== firstDate)
      const filteredDays = days.filter(plan => plan.date === firstDate)
      this.studyPlans.addItem({
        id: firstDate,
        title: firstDate,
        date: firstDate,
        plans: filteredDays
      })
      this.setDates(newDays)
    },

    setLessons () {
      const studyPlans = this.filterPlanByMajor()
      let plans = []
      studyPlans.list.forEach(studyPlan => {
        plans = plans.concat(studyPlan.plans.list)
      })

      this.lessons = plans.filter((studyPlan, studyPlanIndex, studyPlansArray) => studyPlansArray.findIndex(item => item.title === studyPlan.title) === studyPlanIndex)
        .map(item => {
          return {
            title: item.title,
            active: false
          }
        })
    },

    setSelectedMajorId (majorId) {
      this.selectedMajorId = majorId
    },

    setPlanPreviewBackground (value) {
      const planData = this.getPlanInput('PlanStylePreview')
      if (!planData) {
        return
      }
      planData.value.backgroundColor = value
    },

    setPlanPreviewTextColor (value) {
      const planData = this.getPlanInput('PlanStylePreview')
      if (!planData) {
        return
      }
      planData.value.textColor = value
    },

    setPlanPreviewBorder (value) {
      const planData = this.getPlanInput('PlanStylePreview')
      if (!planData) {
        return
      }
      planData.value.borderColor = value
    },

    setCustomComponentData (planData) {
      this.setPlanPreviewData(planData)
      this.setContentsType(planData)
    },

    setPlanPreviewData (planData) {
      const customComponentIndex = this.getPlanInput('PlanStylePreview')
      customComponentIndex.props.title = planData.title
    },

    setContentsType (planData) {
      const contentList = planData.contents.list
      if (contentList.length === 0) {
        return
      }
      const customComponent = this.getPlanInput('ContentsType')
      contentList.forEach(content => {
        customComponent.value.push({
          title: content.title,
          id: content.id,
          type_id: content.type.id
        })
      })
    },

    senNewPlanData (submitData) {
      console.log('edit plan')
      // return this.$axios.post(Addresses.studyPlan.edit + '/' + this.currentPlanId, submitData)
      return submitData
    }

    // ----------------------------------------- public ------------------------------------------------
  }
}
</script>

<style scoped>
p {
  margin-bottom: 0 !important;
}

</style>

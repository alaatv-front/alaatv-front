<template>
  <div class="row q-pa-xl new-theme">
    <div class="col-12 q-mb-md">
      <h5>
        برنامه مطالعاتی
      </h5>
    </div>
    <div class="col-6 body1">
      برنامه مطالعاتی شماره 1 - فارغ التحصیلان رشته ریاضی
    </div>
    <div class="col-6 text-right">
      <q-img src="https://nodes.alaatv.com/upload/TripleTitleSet-Nut.png"
             width="24px" />
      <q-btn flat
             label="تغییر برنامه مطالعاتی"
             @click="changeStudyPlan" />
    </div>
    <div class="col-12 q-mt-md"
         style="width: 100%;">
      <full-calendar :events="studyPlanList" />
    </div>
    <q-dialog v-model="planSettings">
      <q-card class="plan-setting new-theme">
        <q-card-section>
          <div class="row items-center justify-between">
            <div>
              <q-img src="https://nodes.alaatv.com/upload/TripleTitleSet-CalendarCheck.png"
                     width="24px" />
              تنظیمات برنامه مطالعاتی
            </div>
            <q-btn flat
                   icon="close"
                   @click="changeStudyPlan" />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          برای شروع دوره باید برنامه مطالعاتی خودتو انتخاب کنی
        </q-card-section>
        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <div class="outsideLabel">برنامه</div>
              <q-select v-model="planType"
                        label="انتخاب کنید"
                        :options="planOptions"
                        @update:model-value="setFlagTrue" />
            </div>
            <div class="col-6">
              <div class="outsideLabel">مقطع</div>
              <q-select v-model="grade"
                        label="انتخاب کنید"
                        option-label="title"
                        :options="gradeOptions"
                        @update:model-value="setFlagTrue" />
            </div>
            <div class="col-6">
              <div class="outsideLabel">رشته</div>
              <q-select v-model="major"
                        label="انتخاب کنید"
                        option-label="title"
                        :options="majorOptions"
                        @update:model-value="setFlagTrue" />
            </div>
            <div class="col-12">
              <div class="outsideLabel">درس مورد نمایش</div>
              <q-select v-model="lesson"
                        label="انتخاب کنید"
                        option-label="lesson_name"
                        :options="lessonOptions" />
            </div>
            <div class="col-12 caption1 text-grey-6">
              میتونید انتخاب کنید توی برنامه مطالعاتی شما یک یا چند درس خاص و یا همه دروس راه ابریشم نمایش داده بشن
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="text-right new-theme-btn">
            <q-btn class="btn cancel q-mx-sm text-grey-9"
                   size="md"
                   outline
                   label="لغو"
                   @click="planSettings = false" />
            <q-btn class="btn q-mx-sm"
                   label="تایید"
                   size="md"
                   color="positive"
                   @click="acceptSettings" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="warning">
      <q-card class="accept-plan-card new-theme">
        <q-card-section>
          <div class="row items-center justify-between">
            <div>
              <q-img src="https://nodes.alaatv.com/upload/TripleTitleSet-CalendarCheck.png"
                     width="24px" />
              تغییر برنامه مطالعاتی
            </div>
            <q-btn flat
                   icon="close"
                   @click="changeStudyPlan" />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-img src="public/img/pic.png" />
        </q-card-section>
        <q-card-section>
          آیا از تغییر برنامه مطالعاتی مطمئنی؟
          تمام پیشروی‌های صورت گرفته تا به الان به حالت اول برمیگرده و برنامه مطالعاتی از اول شروع میشه.
        </q-card-section>
        <q-card-section>
          <div class="text-right new-theme-btn">
            <q-btn class="btn cancel q-mx-sm text-grey-9"
                   size="md"
                   outline
                   label="انصراف"
                   @click="warning = false" />
            <q-btn class="btn q-mx-sm"
                   label="تایید"
                   size="md"
                   color="warning"
                   @click="acceptChangePlan" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="successChangePlan">
      <q-card class="accept-plan-card new-theme">
        <q-card-section>
          <div class="row items-center justify-between">
            <div>
              <q-img src="https://nodes.alaatv.com/upload/TripleTitleSet-CalendarCheck.png"
                     width="24px" />
              تغییر برنامه مطالعاتی
            </div>
            <q-btn flat
                   icon="close"
                   @click="changeStudyPlan" />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-img src="public/img/pic2.png" />
        </q-card-section>
        <q-card-section>
          برنامه شما با موفقیت تنظیم شد؛ همچنین بعدا میتونید از قسمت برنامه مطالعاتی، اونو تنظیم کنید و یا تغییر بدین.
        </q-card-section>
        <q-card-section>
          <div class="text-right new-theme-btn">
            <q-btn class="btn q-mx-sm"
                   label="متوجه شدم"
                   size="md"
                   color="positive"
                   @click="successChangePlan = false" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import FullCalendar from './FullCalendar.vue'
import { StudyPlanList } from 'src/models/StudyPlan'

export default {
  name: 'TripleTitleSetStudyPlan',
  components: {
    FullCalendar
  },
  beforeRouteUpdate () {
    clearInterval(this.intervalId)
  },
  data() {
    return {
      isPlanChanged: false,
      selectedDate: '',
      studyPlanList: new StudyPlanList(),
      planSettings: false,
      acceptPlan: false,
      warning: false,
      successChangePlan: false,
      planType: '',
      planOptions: [],
      major: '',
      majorOptions: [],
      grade: '',
      gradeOptions: [],
      lesson: '',
      lessonOptions: [],
      currentDate: undefined,
      currentTime: undefined,
      intervalId: null,
      timeStartPos: 0
    }
  },
  computed: {
    style() {
      return {
        top: this.timeStartPos + 'px'
      }
    }
  },
  watch: {
    planSettings(newVal) {
      if (newVal) {
        this.isPlanChanged = false
      }
    }
  },
  mounted() {
    this.getFilterLesson()
    this.getMyStudyPlan()
    this.getChangePlanOptions()
  },
  methods: {
    filterByLesson() {
      this.$apiGateway.studyPlan.storeSetting({ setting: { abrisham2_calender_default_lesson: this.lesson.id } })
        .then(res => {
          console.log(res)
        })
        .catch()
    },
    getFilterLesson() {
      this.$apiGateway.studyPlan.getSetting()
        .then(res => {
          console.log(res)
        })
        .catch()
    },
    setFlagTrue() {
      this.isPlanChanged = true
    },
    getMyStudyPlan() {
      this.$apiGateway.studyPlan.getMyStudyPlan()
        .then(studyPlan => {
          console.log(studyPlan)
          this.planType = studyPlan.title
        })
        .catch()
    },
    getChangePlanOptions() {
      this.$apiGateway.studyPlan.getChangePlanOptions()
        .then(options => {
          // debugger
          this.majorOptions = options.majors
          this.gradeOptions = options.grades
          this.planOptions = options.studyPlans
          this.lessonOptions = options.products
        })
        .catch(() => {})
    },
    changeStudyPlan() {
      this.planSettings = !this.planSettings
    },
    acceptSettings() {
      this.planSettings = false
      if (this.isPlanChanged) {
        this.warning = true
      } else {
        this.filterByLesson()
      }
    },
    acceptChangePlan() {
      this.warning = false
      this.$apiGateway.studyPlan.storeMyStudyPlan({
        study_method_id: 1,
        major_id: this.major.id,
        grade_id: this.grade.id
      })
        .then(response => {
          this.successChangePlan = true
          console.log(response)
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped lang="scss">
.plan-setting {
  width: 488px;
}
.new-theme-btn {
  .btn {
    width: 104px;
  }
}
.accept-plan-card {
  width: 500px;
}
.day-view-current-time-indicator {
  position: absolute;
  height: 10px;
  width: 10px;
  margin-top: -4px;
  background-color: rgba(0, 0, 255, .5);
  border-radius: 50%;
}
.day-view-current-time-line {
  position: absolute;
  border-top: rgba(0, 0, 255, .5) 2px solid;
  width: 100%
}

.body--dark {
  .day-view-current-time-indicator {
    background-color: #EF5350
  }
}

.day-view-current-time-line {
  border-top: #EF5350 2px solid
}
</style>

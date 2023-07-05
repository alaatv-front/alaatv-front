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
      <q-img src="img/studyPlan/Nut.png"
             width="24px" />
      <q-btn flat
             label="تغییر برنامه مطالعاتی"
             @click="changeStudyPlan" />
    </div>
    <div class="col-12 q-mt-md"
         style="width: 100%;">
      <q-calendar v-model="selectedDate"
                  view="week"
                  locale="fa-ir"
                  style="height: 614px;" />
    </div>
    <q-dialog v-model="planSetting">
      <q-card class="plan-setting">
        <q-card-section>
          <div class="row items-center justify-between">
            <div>
              <q-img src="img/studyPlan/CalendarCheck.png"
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
                        :options="planOptions" />
            </div>
            <div class="col-6">
              <div class="outsideLabel">مقطع</div>
              <q-select v-model="grade"
                        label="انتخاب کنید"
                        option-label="title"
                        :options="gradeOptions" />
            </div>
            <div class="col-6">
              <div class="outsideLabel">رشته</div>
              <q-select v-model="major"
                        label="انتخاب کنید"
                        option-label="title"
                        :options="majorOptions" />
            </div>
            <div class="col-12">
              <div class="outsideLabel">درس مورد نمایش</div>
              <q-select v-model="lesson"
                        label="انتخاب کنید"
                        option-label="title"
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
                   label="لغو" />
            <q-btn class="btn q-mx-sm"
                   label="تایید"
                   size="md"
                   color="positive"
                   @click="acceptChangePlan" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="warning">
      <q-card class="accept-plan-card">
        <q-card-section>
          <div class="row items-center justify-between">
            <div>
              هشدار
            </div>
            <q-btn flat
                   icon="close"
                   @click="acceptPlan = false" />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          آیا از تغییر برنامه مطالعاتی مطمئنی؟
          تمام پیشروی‌های صورت گرفته تا به الان به حالت اول برمیگرده و برنامه مطالعاتی از اول شروع میشه.
        </q-card-section>
        <q-card-section>
          <div class="btn text-right">
            <q-btn label="بازگشت"
                   flat
                   @click="acceptPlan = false" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="acceptPlan">
      <q-card class="accept-plan-card">
        <q-card-section>
          <div class="row items-center justify-between">
            <div>
              تغییر برنامه مطالعاتی
            </div>
            <q-btn flat
                   icon="close"
                   @click="acceptPlan = false" />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          برنامه مطالعاتی شما با موفقیت تغییر کرد.
        </q-card-section>
        <q-card-section>
          <div class="btn text-right">
            <q-btn label="بازگشت"
                   flat
                   @click="acceptPlan = false" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import '@quasar/quasar-ui-qcalendar/dist/index.css'
import { QCalendar } from '@quasar/quasar-ui-qcalendar'

export default {
  name: 'TripleTitleSetStudyPlan',
  components: {
    QCalendar
  },
  data() {
    return {
      selectedDate: '',
      planSetting: false,
      acceptPlan: false,
      warning: false,
      planType: '',
      planOptions: [],
      major: '',
      majorOptions: [],
      grade: '',
      gradeOptions: [],
      lesson: '',
      lessonOptions: []
    }
  },
  mounted() {
    this.getMyStudyPlan()
    this.getChangePlanOptions()
  },
  methods: {
    getMyStudyPlan() {
      this.$apiGateway.studyPlan.getMyStudyPlan()
        .then(response => {
          this.planType = response.data.data.title
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
        })
        .catch(() => {})
    },
    changeStudyPlan() {
      this.planSetting = !this.planSetting
    },
    acceptChangePlan() {
      this.planSetting = false
      this.acceptPlan = true
    }
  }
}
</script>

<style scoped lang="scss">
.plan-setting {
  width: 488px;
  .new-theme-btn {
    .btn {
      width: 104px;
    }
  }
}
.accept-plan-card {
  width: 500px;
}
</style>

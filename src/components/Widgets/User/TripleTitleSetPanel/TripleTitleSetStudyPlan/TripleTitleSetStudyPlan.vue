<template>
  <div class="row q-pa-xl new-theme">
    <div class="col-12 q-mb-md">
      <h5>
        برنامه مطالعاتی
      </h5>
    </div>
    <div class="col-6 body1">
      برنامه مطالعاتی - رشته {{ major.title }}
    </div>
    <div class="col-6 text-right action-btns">
      <q-img src="https://nodes.alaatv.com/upload/TripleTitleSet-Nut.png"
             width="24px" />
      <q-btn flat
             label="تغییر برنامه مطالعاتی"
             @click="changeStudyPlan" />
      <q-btn v-if="isAdmin"
             icon="add"
             size="md"
             class="newPlan-btn"
             color="primary"
             label="زنگ جدید"
             @click="newPlanDialog = true" />
    </div>
    <div class="col-12 q-mt-md"
         style="width: 100%;">
      <full-calendar ref="fullCalendar"
                     :study-event="studyEvent"
                     :events="studyPlanList"
                     @edit-plan="editPlan"
                     @remove-plan="openRemovePlanWarning" />
    </div>
    <q-dialog v-model="newPlanDialog">
      <q-card class="new-theme">
        <q-card-section>
          <div class="row items-center justify-between">
            <div>
              <q-img src="https://nodes.alaatv.com/upload/TripleTitleSet-CalendarCheck.png"
                     width="24px" />
              زنگ جدید
            </div>
            <q-btn flat
                   icon="close"
                   color="grey-6"
                   @click="newPlanDialog = false" />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <entity-create ref="entityCreate"
                         v-model:value="inputs"
                         :defaultLayout="false"
                         :after-send-data="afterSendData"
                         :api="api">
            <template #after-form-builder>
              <div class="text-right q-mt-md new-theme-btn">
                <q-btn class="btn cancel q-mx-sm text-grey-9"
                       size="md"
                       outline
                       label="لغو"
                       @click="newPlanDialog = false" />
                <q-btn class="btn q-mx-sm"
                       label="تایید"
                       size="md"
                       color="positive"
                       @click="acceptNewPlan" />
              </div>
            </template>
          </entity-create>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="editPlanDialog">
      <q-card class="new-theme">
        <q-card-section>
          <div class="row items-center justify-between">
            <div>
              <q-img src="https://nodes.alaatv.com/upload/TripleTitleSet-CalendarCheck.png"
                     width="24px" />
              ویرایش زنگ
            </div>
            <q-btn v-close-popup
                   flat
                   icon="close"
                   color="grey-6" />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <entity-edit ref="entityEdit"
                       v-model:value="editInputs"
                       :defaultLayout="false"
                       :after-send-data="afterSendData"
                       :api="editApi">
            <template #after-form-builder>
              <div class="text-right q-mt-md new-theme-btn">
                <q-btn v-close-popup
                       class="btn cancel q-mx-sm text-grey-9"
                       size="md"
                       outline
                       label="لغو" />
                <q-btn class="btn q-mx-sm"
                       label="تایید"
                       size="md"
                       color="positive"
                       @click="updatePlan()" />
              </div>
            </template>
          </entity-edit>
        </q-card-section>
      </q-card>
    </q-dialog>
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
                        option-label="display_name"
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
          <q-img src="https://nodes.alaatv.com/upload/TripleTitleSet-warning.png" />
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
                   @click="updateMyStudyPlan" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="removePlanWarning">
      <q-card class="accept-plan-card new-theme">
        <q-card-section>
          <div class="row items-center justify-between">
            <div>
              <q-img src="https://nodes.alaatv.com/upload/TripleTitleSet-Warning.png"
                     width="24px" />
              هشدار
            </div>
            <q-btn v-close-popup
                   flat
                   icon="close" />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          آیا از حذف این زنگ مطمئن هستید؟
        </q-card-section>
        <q-card-section>
          <div class="text-right new-theme-btn">
            <q-btn v-close-popup
                   class="btn cancel q-mx-sm text-grey-9"
                   size="md"
                   outline
                   label="انصراف" />
            <q-btn class="btn q-mx-sm"
                   label="بله، مطمئنم"
                   size="md"
                   color="red"
                   @click="removePlan" />
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
          <q-img src="https://nodes.alaatv.com/upload/TripleTitleSet-confirm.png" />
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
import { shallowRef } from 'vue'
import { EntityCreate, EntityEdit } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway.js'
import { StudyPlanList } from 'src/models/StudyPlan.js'
import FullCalendar from './components/FullCalendar.vue'
import SessionInfo from 'src/components/Widgets/User/TripleTitleSetPanel/TripleTitleSetStudyPlan/components/SessionInfo.vue'
import ContentsComponent from 'src/components/Widgets/User/TripleTitleSetPanel/TripleTitleSetStudyPlan/components/Contents.vue'
import TextComponent from 'src/components/Widgets/User/TripleTitleSetPanel/TripleTitleSetStudyPlan/components/TextComponent.vue'

const ContentsComponentComp = shallowRef(ContentsComponent)
const TextComponentComp = shallowRef(TextComponent)

export default {
  name: 'TripleTitleSetStudyPlan',
  components: {
    FullCalendar,
    EntityCreate,
    EntityEdit
  },
  beforeRouteUpdate () {
    clearInterval(this.intervalId)
  },
  data() {
    return {
      api: APIGateway.studyPlan.APIAdresses.plan,
      editapi: APIGateway.studyPlan.APIAdresses.editPlan,
      selectedPlanId: null,
      newPlanDialog: false,
      editPlanDialog: false,
      isPlanChanged: false,
      removePlanWarning: false,
      isAdmin: false,
      selectedDate: '',
      studyPlanList: new StudyPlanList(),
      planSettings: false,
      acceptPlan: false,
      warning: false,
      successChangePlan: false,
      planType: null,
      studyEvent: null,
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
      timeStartPos: 0,
      filteredLesson: null,
      eventId: null,
      editApi: null,
      inputs: [
        {
          type: TextComponentComp,
          name: 'customComponent',
          text: 'برنامه و درس موردنظر رو انتخاب کن و بعدش میتونی زنگ جدید رو اضافه کنی.',
          col: 'col-12'
        },
        {
          type: 'hidden',
          name: 'event_id',
          value: null
        },
        {
          type: 'select',
          name: 'study_method_id',
          label: 'برنامه',
          placeholder: 'انتخاب کنید',
          options: [],
          optionLabel: 'display_name',
          optionValue: 'id',
          value: null,
          col: 'col-4'
        },
        {
          type: 'select',
          name: 'major_id',
          label: 'رشته',
          options: [],
          placeholder: 'انتخاب کنید',
          optionLabel: 'title',
          optionValue: 'id',
          value: null,
          col: 'col-4'
        },
        {
          type: 'select',
          name: 'grade_id',
          label: 'مقطع',
          options: [],
          placeholder: 'انتخاب کنید',
          optionLabel: 'title',
          optionValue: 'id',
          value: null,
          col: 'col-4'
        },
        {
          type: TextComponentComp,
          name: 'customComponent',
          text: 'اطلاعات محتوای موردنظر برای نمایش رو وارد کنید.',
          col: 'col-12'
        },
        {
          type: ContentsComponentComp,
          name: 'contents',
          col: 'col-12'
        },
        {
          type: SessionInfo,
          data: [],
          col: 'col-12'
        },
        {
          type: 'date',
          name: 'date',
          label: 'تاریخ',
          value: '',
          placeholder: 'انتخاب کنید',
          calendarIcon: ' ',
          optionLabel: 'title',
          col: 'col-4'
        },
        {
          type: 'time',
          name: 'start',
          label: 'از ساعت',
          value: '',
          placeholder: 'انتخاب کنید',
          optionLabel: 'title',
          col: 'col-4'
        },
        {
          type: 'time',
          name: 'end',
          label: 'تا ساعت',
          value: '',
          placeholder: 'انتخاب کنید',
          optionLabel: 'title',
          col: 'col-4'
        },
        {
          type: 'input',
          name: 'description',
          label: 'توضیحات',
          value: '',
          placeholder: 'وارد کنید',
          col: 'col-12'
        }
      ],
      editInputs: [
        {
          type: TextComponentComp,
          name: 'customComponent',
          text: 'برنامه و درس موردنظر رو انتخاب کن و بعدش میتونی زنگ جدید رو اضافه کنی.',
          col: 'col-12'
        },
        {
          type: 'hidden',
          name: 'event_id',
          value: null
        },
        {
          type: 'select',
          name: 'study_method_id',
          label: 'برنامه',
          placeholder: 'انتخاب کنید',
          options: [],
          optionLabel: 'display_name',
          optionValue: 'id',
          value: null,
          col: 'col-4'
        },
        {
          type: 'select',
          name: 'major_id',
          label: 'رشته',
          options: [],
          placeholder: 'انتخاب کنید',
          optionLabel: 'title',
          optionValue: 'id',
          value: null,
          responseKey: 'data.major.id',
          col: 'col-4'
        },
        {
          type: 'select',
          name: 'grade_id',
          label: 'مقطع',
          options: [],
          placeholder: 'انتخاب کنید',
          optionLabel: 'title',
          optionValue: 'id',
          value: null,
          responseKey: 'data.grade.id',
          col: 'col-4'
        },
        {
          type: TextComponentComp,
          name: 'customComponent',
          text: 'اطلاعات محتوای موردنظر برای نمایش رو وارد کنید.',
          col: 'col-12'
        },
        {
          type: ContentsComponentComp,
          name: 'contents',
          responseKey: 'data.contents',
          col: 'col-12'
        },
        {
          type: SessionInfo,
          data: [],
          col: 'col-12'
        },
        {
          type: 'date',
          name: 'date',
          label: 'تاریخ',
          value: '',
          placeholder: 'انتخاب کنید',
          calendarIcon: ' ',
          optionLabel: 'title',
          responseKey: 'data.date',
          col: 'col-4'
        },
        {
          type: 'time',
          name: 'start',
          label: 'از ساعت',
          value: '',
          placeholder: 'انتخاب کنید',
          optionLabel: 'title',
          responseKey: 'data.start',
          col: 'col-4'
        },
        {
          type: 'time',
          name: 'end',
          label: 'تا ساعت',
          value: '',
          placeholder: 'انتخاب کنید',
          optionLabel: 'title',
          responseKey: 'data.end',
          col: 'col-4'
        },
        {
          type: 'input',
          name: 'description',
          label: 'توضیحات',
          value: '',
          placeholder: 'وارد کنید',
          responseKey: 'data.description',
          col: 'col-12'
        }
      ]
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
    const user = this.$store.getters['Auth/user']
    this.isAdmin = user.hasPermission('insertStudyPlan') || user.hasPermission('updateStudyPlan') || user.hasPermission('deleteStudyPlan')
    this.getFilterLesson()
    this.getMyStudyPlan()
    this.getChangePlanOptions()
  },
  methods: {
    updatePlan() {
      this.loading = true
      const data = {
        major_id: this.$refs.entityEdit.getInputsByName('major_id').value,
        grade_id: this.$refs.entityEdit.getInputsByName('grade_id').value,
        study_method_id: this.$refs.entityEdit.getInputsByName('study_method_id').value
      }
      APIGateway.abrisham.findMyStudyPlan(data)
        .then(studyPlan => {
          this.$refs.entityEdit.setInputByName('event_id', studyPlan.id)
          this.studyEvent = studyPlan.id
          this.$refs.entityEdit.editEntity()
          this.loading = false
          this.editPlanDialog = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    editPlan(event) {
      this.selectedPlanId = event.id
      this.editApi = APIGateway.studyPlan.APIAdresses.editPlan(this.selectedPlanId)
      this.editPlanDialog = true
    },
    openRemovePlanWarning(event) {
      this.removePlanWarning = true
      this.selectedPlanId = event.id
    },
    removePlan() {
      this.loading = true
      APIGateway.studyPlan.removePlan(this.selectedPlanId)
        .then(() => {
          this.$refs.fullCalendar.getStudyPlanData(this.studyEvent)
          this.removePlanWarning = false
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    acceptNewPlan() {
      this.loading = true
      const data = {
        major_id: this.$refs.entityCreate.getInputsByName('major_id').value,
        grade_id: this.$refs.entityCreate.getInputsByName('grade_id').value,
        study_method_id: this.$refs.entityCreate.getInputsByName('study_method_id').value
      }
      APIGateway.abrisham.findMyStudyPlan(data)
        .then(studyPlan => {
          this.$refs.entityCreate.setInputByName('event_id', studyPlan.id)
          this.studyEvent = studyPlan.id
          this.$refs.entityCreate.createEntity()
          this.loading = false
          this.newPlanDialog = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    afterSendData() {
      this.$refs.fullCalendar.getStudyPlanData(this.studyEvent)
    },
    filterByLesson() {
      this.loading = true
      this.$apiGateway.studyPlan.storeSetting({ setting: { abrisham2_calender_default_lesson: this.lesson.id } })
        .then(() => {
          this.loading = false
          this.updateMyStudyPlan()
        })
        .catch(() => {
          this.loading = false
        })
    },
    getFilterLesson() {
      this.loading = true
      this.$apiGateway.studyPlan.getSetting()
        .then(setting => {
          this.loading = false
          this.filteredLesson = setting.setting.abrisham2_calender_default_lesson
        })
        .catch(() => {
          this.loading = false
        })
    },
    setFlagTrue() {
      this.isPlanChanged = true
    },
    getMyStudyPlan() {
      this.loading = true
      this.$apiGateway.studyPlan.getMyStudyPlan()
        .then(studyPlan => {
          this.planType = studyPlan.title
          this.studyEvent = studyPlan.id
          this.$refs.fullCalendar.getStudyPlanData(studyPlan.id)
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    getChangePlanOptions() {
      this.loading = true
      this.$apiGateway.studyPlan.getChangePlanOptions()
        .then(options => {
          this.loading = false
          this.majorOptions = options.majors
          this.gradeOptions = options.grades
          this.planOptions = options.studyPlans
          this.lessonOptions = options.products
          this.setInputAttrByName(this.inputs, 'major_id', 'options', options.majors)
          this.setInputAttrByName(this.inputs, 'grade_id', 'options', options.grades)
          this.setInputAttrByName(this.inputs, 'study_method_id', 'options', options.studyPlans)
          this.setInputAttrByName(this.editInputs, 'major_id', 'options', options.majors)
          this.setInputAttrByName(this.editInputs, 'grade_id', 'options', options.grades)
          this.setInputAttrByName(this.editInputs, 'study_method_id', 'options', options.studyPlans)
        })
        .catch(() => {
          this.loading = false
        })
    },
    setInputAttrByName (inputs, name, attribute, value) {
      const normalizeInput = (input) => {
        const ignoreValueTypes = [
          'separator',
          'formBuilder',
          'button'
        ]
        if (ignoreValueTypes.includes(input.type) && typeof input.ignoreValue === 'undefined') {
          input.ignoreValue = true
        }
        return input
      }
      inputs.forEach(input => {
        input = normalizeInput(input)
        if (input.type === 'formBuilder') {
          this.setInputAttrByName(input.value)
        } else {
          if (input.name === name) {
            input[attribute] = value
          }
        }
      })
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
    updateMyStudyPlan() {
      this.loading = true
      this.warning = false
      this.$apiGateway.studyPlan.updateMyStudyPlan({
        study_method_id: this.planType.id,
        major_id: this.major.id,
        grade_id: this.grade.id,
        setting: this.lesson.id
      })
        .then(() => {
          this.loading = false
          this.successChangePlan = true
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.action-btns {
  .newPlan-btn {
    margin-left: 40px;
  }
}
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

<template>
  <div class="triple-title-set-study-plan">
    <div class="row">
      <div class="col-12 q-mb-md">
        <h5>
          برنامه مطالعاتی
        </h5>
      </div>
      <div class="col-md-6 col-12 body1">
        <q-breadcrumbs class="text-grey-9"
                       active-color="grey-6">
          <q-breadcrumbs-el label="برنامه مطالعاتی" />
          <template v-slot:separator>
            <q-icon size="xs"
                    name="ph:caret-right"
                    color="grey-6" />
          </template>
          <q-breadcrumbs-el v-if="currentStudyPlan.major"
                            :label="currentStudyPlan.major" />
          <q-breadcrumbs-el v-if="currentStudyPlan.grade"
                            :label="currentStudyPlan.grade" />
          <q-breadcrumbs-el v-if="currentStudyPlan.title"
                            :label="currentStudyPlan.title" />
        </q-breadcrumbs>
      </div>
      <div class="col-md-6 col-12 text-right action-btns">
        <q-btn flat
               label="تغییر برنامه مطالعاتی"
               icon="ph:nut"
               class="q-btn-md"
               @click="changeStudyPlan" />
        <q-btn v-if="isAdmin"
               icon="add"
               class="newPlan-btn q-btn-md"
               text-color="grey-9"
               color="primary"
               label="زنگ جدید"
               @click="newPlanDialog = true" />
      </div>
      <q-linear-progress v-if="loading"
                         class="q-mt-md"
                         indeterminate />
      <div class="col-12 calendar">
        <full-calendar v-if="studyPlanListLoaded"
                       ref="fullCalendar"
                       :hour-start="firstStartTime"
                       :hour-end="lastEndTime"
                       :study-event="studyEvent"
                       :events="studyPlanList"
                       :current-day="currentDay"
                       :filtered-lesson="filteredLesson"
                       @edit-plan="editPlan"
                       @copy-plan="copyPlan"
                       @change-date="onChangeDateOfFullcalendar"
                       @remove-plan="openRemovePlanWarning" />
        <q-inner-loading :showing="!studyPlanListLoaded">
          <q-spinner-grid size="50px"
                          color="primary" />
        </q-inner-loading>
      </div>
      <q-dialog v-model="newPlanDialog">
        <inside-dialog>
          <template #header>
            <q-icon name="ph:calendar-check"
                    color="secondary"
                    size="24px" />
            زنگ جدید
          </template>
          <template #body>
            <form-builder ref="formBuilder"
                          v-model:value="inputs" />
          </template>
          <template #action>
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
          </template>
        </inside-dialog>
      </q-dialog>
      <q-dialog v-model="editPlanDialog">
        <inside-dialog>
          <template #header>
            <q-icon name="ph:calendar-check"
                    color="secondary"
                    size="24px" />
            ویرایش زنگ
          </template>
          <template #body>
            <entity-edit ref="entityEdit"
                         v-model:value="editInputs"
                         :defaultLayout="false"
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
                         @click="updatePlan" />
                </div>
              </template>
            </entity-edit>
          </template>
        </inside-dialog>
      </q-dialog>
      <q-dialog v-model="planSettings">
        <inside-dialog>
          <template #header-icon>
            <badge-icon icon="ph:warning"
                        color="orange" />
          </template>
          <template #header>
            تنظیمات برنامه مطالعاتی
          </template>
          <template #body>
            <div>
              برای شروع دوره باید برنامه مطالعاتی خودتو انتخاب کنی
            </div>
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <q-select v-model="planType"
                          label="برنامه"
                          option-label="display_name"
                          :options="planOptions"
                          @update:model-value="setFlagTrue" />
              </div>
              <div class="col-6">
                <q-select v-model="grade"
                          label="مقطع"
                          option-label="title"
                          :options="gradeOptions"
                          @update:model-value="setFlagTrue" />
              </div>
              <div class="col-6">
                <q-select v-model="major"
                          label="رشته"
                          option-label="title"
                          :options="majorOptions"
                          @update:model-value="setFlagTrue" />
              </div>
              <div class="col-12">
                <q-select v-model="lesson"
                          label="درس مورد نمایش"
                          option-value="id"
                          option-label="lesson_name"
                          :options="lessonOptions" />
              </div>
              <div class="col-12 caption1 text-grey-6">
                میتونید انتخاب کنید توی برنامه مطالعاتی شما یک یا چند درس خاص و یا همه دروس راه ابریشم نمایش داده بشن
              </div>
            </div>
          </template>
          <template #action>
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
          </template>
        </inside-dialog>
      </q-dialog>
      <q-dialog v-model="warning">
        <inside-dialog>
          <template #header-icon>
            <badge-icon icon="ph:warning"
                        color="orange" />
          </template>
          <template #header>
            تغییر برنامه مطالعاتی
          </template>
          <template #body>
            <div class="flex justify-center items-center">
              <div class="lazy-image-wrapper q-mb-md">
                <lazy-img src="https://nodes.alaatv.com/upload/TripleTitleSet-warning.png" />
              </div>
              <div>
                آیا از تغییر برنامه مطالعاتی مطمئنی؟
                تمام پیشروی‌های صورت گرفته تا به الان به حالت اول برمیگرده و برنامه مطالعاتی از اول شروع میشه.
              </div>
            </div>
          </template>
          <template #action>
            <q-btn class="btn cancel q-mx-sm text-grey-9"
                   size="md"
                   outline
                   label="انصراف"
                   @click="warning = false" />
            <q-btn class="btn q-mx-sm"
                   label="تایید"
                   size="md"
                   color="warning"
                   @click="filterByLesson" />
          </template>
        </inside-dialog>
      </q-dialog>
      <q-dialog v-model="removePlanWarning">
        <inside-dialog>
          <template #header-icon>
            <badge-icon icon="ph:warning"
                        color="orange" />
          </template>
          <template #header>
            هشدار
          </template>
          <template #body>
            آیا از حذف این زنگ مطمئن هستید؟
          </template>
          <template #action>
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
          </template>
        </inside-dialog>
      </q-dialog>
      <q-dialog v-model="successChangePlan">
        <inside-dialog>
          <template #header>
            <q-img src="https://nodes.alaatv.com/upload/TripleTitleSet-CalendarCheck.png"
                   width="24px" />
            تغییر برنامه مطالعاتی
          </template>
          <template #body>
            <div class="flex justify-center items-center">
              <div class="lazy-image-wrapper q-mb-md">
                <lazy-img src="https://nodes.alaatv.com/upload/TripleTitleSet-check.png" />
              </div>
            </div>
            <div>
              برنامه شما با موفقیت تنظیم شد؛ همچنین بعدا میتونید از قسمت برنامه مطالعاتی، اونو تنظیم کنید و یا تغییر بدین.
            </div>
          </template>
          <template #action>
            <q-btn class="btn q-mx-sm"
                   label="متوجه شدم"
                   size="md"
                   color="positive"
                   @click="successChangePlan = false" />
          </template>
        </inside-dialog>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import moment from 'moment-jalaali'
import Time from 'src/plugins/time.js'
import { Set } from 'src/models/Set.js'
import { EntityEdit } from 'quasar-crud'
import { Major } from 'src/models/Major.js'
import { Product } from 'src/models/Product.js'
import LazyImg from 'src/components/lazyImg.vue'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import { StudyPlanList } from 'src/models/StudyPlan.js'
import FullCalendar from './components/FullCalendar.vue'
import BadgeIcon from 'src/components/Utils/BadgeIcon.vue'
import InsideDialog from 'src/components/Utils/InsideDialog.vue'
import FormBuilder from 'quasar-form-builder/src/FormBuilder.vue'
import { mixinAuth, mixinTripleTitleSet } from 'src/mixin/Mixins.js'
import SessionInfoComponent
  from 'src/components/Widgets/User/TripleTitleSetPanel/TripleTitleSetStudyPlan/components/SessionInfo.vue'
import FormBuilderInputStudyPlanContentsSelector
  from 'src/components/Widgets/User/TripleTitleSetPanel/TripleTitleSetStudyPlan/components/FormBuilderInputStudyPlanContentsSelector.vue'

const SessionInfoComponentComp = shallowRef(SessionInfoComponent)
const ContentsComponentComp = shallowRef(FormBuilderInputStudyPlanContentsSelector)

moment.loadPersian()

export default {
  name: 'TripleTitleSetStudyPlan',
  components: {
    LazyImg,
    BadgeIcon,
    EntityEdit,
    FormBuilder,
    FullCalendar,
    InsideDialog
  },
  mixins: [mixinTripleTitleSet, mixinAuth],
  data () {
    return {
      loading: false,
      currentDay: null,
      api: APIGateway.studyPlan.APIAdresses.plan,
      firstStartTime: 23,
      lastEndTime: 0,
      selectedPlanId: null,
      newPlanDialog: false,
      editPlanDialog: false,
      isPlanChanged: false,
      removePlanWarning: false,
      isAdmin: false,
      needToUpdatePlan: false,
      studyPlanList: new StudyPlanList(),
      studyPlanListLoaded: false,
      selectedContentList: [],
      planSettings: false,
      acceptPlan: false,
      warning: false,
      successChangePlan: false,
      selectedDate: null,
      planType: {
        id: null,
        title: null,
        display_name: null
      },
      studyEvent: null,
      planOptions: [],
      major: {},
      majorOptions: [],
      grade: {},
      gradeOptions: [],
      lesson: { lesson_name: 'همه', id: null },
      lessonOptions: [],
      filteredLesson: null,
      editApi: null,
      inputs: [
        {
          type: 'separator',
          name: 'separator-1',
          size: '0px',
          class: 'q-pt-md',
          label: 'برنامه و درس موردنظر رو انتخاب کن و بعدش میتونی زنگ جدید رو اضافه کنی.',
          col: 'col-12'
        },
        {
          type: 'hidden',
          name: 'event_id',
          value: []
        },
        {
          type: 'input',
          name: 'title',
          label: 'عنوان',
          value: '',
          placeholder: 'وارد کنید',
          col: 'col-12'
        },
        {
          type: 'select',
          name: 'study_method_id',
          label: 'برنامه',
          options: [],
          multiple: true,
          optionLabel: 'display_name',
          optionValue: 'id',
          value: null,
          col: 'col-12'
        },
        {
          type: 'select',
          name: 'major_id',
          label: 'رشته',
          options: [],
          multiple: true,
          optionLabel: 'title',
          optionValue: 'id',
          value: null,
          col: 'col-12'
        },
        {
          type: 'select',
          name: 'grade_id',
          label: 'مقطع',
          options: [],
          multiple: true,
          optionLabel: 'title',
          optionValue: 'id',
          value: null,
          col: 'col-12'
        },
        {
          type: ContentsComponentComp,
          name: 'contents',
          topic: null,
          set: new Set(),
          major: new Major(),
          product: new Product(),
          col: 'col-12'
        },
        {
          type: SessionInfoComponentComp,
          name: 'SessionInfo',
          data: [],
          col: 'col-12'
        },
        {
          type: 'date',
          name: 'date',
          label: 'تاریخ',
          value: '',
          calendarIcon: ' ',
          optionLabel: 'title',
          col: 'col-4'
        },
        {
          type: 'time',
          name: 'start',
          label: 'از ساعت',
          value: '',
          optionLabel: 'title',
          col: 'col-4'
        },
        {
          type: 'time',
          name: 'end',
          label: 'تا ساعت',
          value: '',
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
          type: 'separator',
          name: 'separator-1',
          size: '0px',
          class: 'q-pt-md',
          label: 'برنامه و درس موردنظر رو انتخاب کن و بعدش میتونی زنگ جدید رو اضافه کنی.',
          col: 'col-12'
        },
        {
          type: 'hidden',
          name: 'event_id',
          value: null
        },
        {
          type: 'input',
          name: 'title',
          label: 'عنوان',
          value: '',
          placeholder: 'وارد کنید',
          col: 'col-12'
        },
        {
          type: 'select',
          name: 'study_method_id',
          label: 'برنامه',
          options: [],
          optionLabel: 'display_name',
          optionValue: 'id',
          responseKey: 'data.study_method.id',
          value: null,
          col: 'col-12'
        },
        {
          type: 'select',
          name: 'major_id',
          label: 'رشته',
          options: [],
          optionLabel: 'title',
          optionValue: 'id',
          value: null,
          responseKey: 'data.major.id',
          col: 'col-12'
        },
        {
          type: 'select',
          name: 'grade_id',
          label: 'مقطع',
          options: [],
          optionLabel: 'title',
          optionValue: 'id',
          value: null,
          responseKey: 'data.grade.id',
          col: 'col-12'
        },
        {
          type: ContentsComponentComp,
          name: 'contents',
          topic: null,
          set: new Set(),
          major: new Major(),
          product: new Product(),
          responseKey: 'data.contents',
          col: 'col-12'
        },
        {
          type: SessionInfoComponentComp,
          name: 'SessionInfo',
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
      ],
      currentStudyPlan: {}
    }
  },
  watch: {
    planSettings (newVal) {
      if (newVal) {
        this.isPlanChanged = false
      }
    },
    newPlanDialog (newVal) {
      if (newVal) {
        return
      }
      FormBuilderAssist.setAttributeByName(this.inputs, 'contents', 'set', null)
      FormBuilderAssist.setAttributeByName(this.inputs, 'contents', 'value', [])
      FormBuilderAssist.setAttributeByName(this.inputs, 'description', 'value', null)
    }
  },
  mounted () {
    this.currentDay = Time.now()
    this.$bus.on('FormBuilderInputStudyPlanContentsSelector-update:major', (newValue) => {
      FormBuilderAssist.setAttributeByName(this.inputs, 'contents', 'major', newValue)
      FormBuilderAssist.setAttributeByName(this.editInputs, 'contents', 'major', newValue)
    })
    this.$bus.on('FormBuilderInputStudyPlanContentsSelector-update:product', (newValue) => {
      FormBuilderAssist.setAttributeByName(this.inputs, 'contents', 'product', newValue)
      FormBuilderAssist.setAttributeByName(this.editInputs, 'contents', 'product', newValue)
    })
    this.$bus.on('FormBuilderInputStudyPlanContentsSelector-update:topic', (newValue) => {
      FormBuilderAssist.setAttributeByName(this.inputs, 'contents', 'topic', newValue)
      FormBuilderAssist.setAttributeByName(this.editInputs, 'contents', 'topic', newValue)
    })
    this.$bus.on('FormBuilderInputStudyPlanContentsSelector-update:set', (newValue) => {
      FormBuilderAssist.setAttributeByName(this.inputs, 'contents', 'set', newValue)
      FormBuilderAssist.setAttributeByName(this.editInputs, 'contents', 'set', newValue)
    })
  },
  methods: {
    afterSetEvent () {
      this.grade = this.user.grade.id ? this.user.grade : { title: '', id: null }
      this.major = this.user.major.id ? this.user.major : { title: '', id: null }
      this.isAdmin = this.user.hasPermission('insertStudyPlan') || this.user.hasPermission('updateStudyPlan') || this.user.hasPermission('deleteStudyPlan')
      this.getFilterLesson()
      this.getChangePlanOptions()
    },
    updatePlan () {
      this.loading = true
      const data = {
        major_id: this.$refs.entityEdit.getInputsByName('major_id').value,
        grade_id: this.$refs.entityEdit.getInputsByName('grade_id').value,
        study_method_id: this.$refs.entityEdit.getInputsByName('study_method_id').value
      }
      this.selectedDate = this.$refs.entityEdit.getInputsByName('date').value
      this.findStudyPlan(data)
        .then(studyPlan => {
          FormBuilderAssist.setAttributeByName(this.editInputs, 'event_id', 'value', studyPlan.id)
          if (this.studyEvent !== studyPlan.id) {
            this.studyEvent = studyPlan.id
            this.needToUpdatePlan = true
          }
          const contents = FormBuilderAssist.getInputsByName(this.editInputs, 'contents')?.value
          const newContents = []
          contents.forEach(content => {
            if (typeof content === 'object') {
              newContents.push({
                content_id: content.id,
                type_id: 4
              })
            } else {
              newContents.push({
                content_id: content,
                type_id: 4
              })
            }
          })
          FormBuilderAssist.setAttributeByName(this.editInputs, 'contents', 'value', newContents)
          this.$refs.entityEdit.editEntity(false)
            .finally(() => {
              this.getMyStudyPlan()
              this.loading = false
              this.editPlanDialog = false
            })
        })
        .catch(() => {
          this.loading = false
        })
    },
    editPlan (event) {
      this.selectedPlanId = event.id
      this.editApi = APIGateway.studyPlan.APIAdresses.editPlan(this.selectedPlanId)
      // FormBuilderAssist.setAttributeByName(this.editInputs, 'major_id', 'value', event.major_id)
      // FormBuilderAssist.setAttributeByName(this.editInputs, 'contents', 'value', event.contents.list.map(item => item.id))
      // FormBuilderAssist.setAttributeByName(this.editInputs, 'date', 'value', event.date)
      // FormBuilderAssist.setAttributeByName(this.editInputs, 'start', 'value', event.start)
      // FormBuilderAssist.setAttributeByName(this.editInputs, 'end', 'value', event.end)
      // FormBuilderAssist.setAttributeByName(this.editInputs, 'description', 'value', event.description)
      this.editPlanDialog = true
    },
    copyPlan (event) {
      this.selectedPlanId = event.id
      this.editApi = APIGateway.studyPlan.APIAdresses.editPlan(this.selectedPlanId)
      FormBuilderAssist.setAttributeByName(this.inputs, 'title', 'value', event.title)
      FormBuilderAssist.setAttributeByName(this.inputs, 'study_method_id', 'value', [event.study_method_id])
      FormBuilderAssist.setAttributeByName(this.inputs, 'major_id', 'value', [event.major_id])
      FormBuilderAssist.setAttributeByName(this.inputs, 'grade_id', 'value', [event.grade_id])
      FormBuilderAssist.setAttributeByName(this.inputs, 'contents', 'value', event.contents.list.map(item => {
        return {
          content_id: item.id,
          type_id: 4
        }
      }))
      FormBuilderAssist.setAttributeByName(this.inputs, 'date', 'value', event.date)
      FormBuilderAssist.setAttributeByName(this.inputs, 'start', 'value', event.start)
      FormBuilderAssist.setAttributeByName(this.inputs, 'end', 'value', event.end)
      FormBuilderAssist.setAttributeByName(this.inputs, 'description', 'value', event.description)
      this.newPlanDialog = true
    },
    onChangeDateOfFullcalendar (newDate) {
      this.getStudyPlanData(newDate)
    },
    openRemovePlanWarning (event) {
      this.removePlanWarning = true
      this.selectedPlanId = event.id
    },
    removePlan () {
      this.loading = true
      APIGateway.studyPlan.removePlan(this.selectedPlanId)
        .then(() => {
          this.getStudyPlanData()
          this.removePlanWarning = false
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    getPlanPromise (majorId, gradeId, methodId) {
      return new Promise((resolve, reject) => {
        const data = {
          major_id: majorId,
          grade_id: gradeId,
          study_method_id: methodId
        }
        this.findStudyPlan(data)
          .then(studtPlan => {
            this.createPlan(studtPlan, majorId, gradeId)
              .then((plan) => {
                resolve(plan)
              })
              .catch(() => {
                reject()
              })
          })
          .catch(() => {
            reject()
          })
      })
    },
    findStudyPlan (data) {
      return new Promise((resolve, reject) => {
        APIGateway.studyPlan.findStudyPlan(data)
          .then(studtPlan => {
            resolve(studtPlan)
          })
          .catch(() => {
            reject()
          })
      })
    },
    createPlan (studtPlan, majorId, gradeId) {
      return new Promise((resolve, reject) => {
        const formData = this.$refs.formBuilder.getFormData()
        formData.major_id = majorId
        formData.grade_id = gradeId
        formData.event_id = studtPlan.id
        formData.contents.forEach((content, index) => {
          if (content.id) {
            formData.contents[index] = {
              content_id: content.id,
              type_id: 4
            }
            // type_id: [1, 2, 3, 4, 5]
            // [
            //    ویس مشاوره
            //    فیلم مشاوره
            //    متن مشاوره
            //    فیلم درس
            //    تستها
            // ]
          }
        })
        APIGateway.studyPlan.createPlan(formData)
          .then((plan) => {
            resolve(plan)
          })
          .catch(() => {
            reject()
          })
      })
    },
    acceptNewPlan () {
      this.loading = true
      const eventPromises = []
      const majorIds = FormBuilderAssist.getInputsByName(this.inputs, 'major_id')?.value || []
      const gradeIds = FormBuilderAssist.getInputsByName(this.inputs, 'grade_id')?.value || []
      const methodIds = FormBuilderAssist.getInputsByName(this.inputs, 'study_method_id').value || []
      methodIds.forEach(methodId => {
        majorIds.forEach(majorId => {
          gradeIds.forEach(gradeId => {
            eventPromises.push(this.getPlanPromise(majorId, gradeId, methodId))
          })
        })
      })
      Promise.all(eventPromises)
        .then(() => {
          FormBuilderAssist.setAttributeByName(this.inputs, 'contents', 'value', [])
          const data = {
            major_id: FormBuilderAssist.getInputsByName(this.inputs, 'major_id').value[0],
            grade_id: FormBuilderAssist.getInputsByName(this.inputs, 'grade_id').value[0],
            study_method_id: FormBuilderAssist.getInputsByName(this.inputs, 'study_method_id').value[0]
          }
          this.findStudyPlan(data)
            .then(studtPlan => {
              if (studtPlan.id !== this.studyEvent) {
                this.updateMyStudyPlan(FormBuilderAssist.getInputsByName(this.inputs, 'date').value)
              } else {
                this.getStudyPlanData(FormBuilderAssist.getInputsByName(this.inputs, 'date').value)
              }
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
          this.newPlanDialog = false
        })
        .catch(() => {
          this.newPlanDialog = false
          this.loading = false
        })
    },
    filterByLesson () {
      this.loading = true
      APIGateway.studyPlan.storeSetting({
        setting: {
          abrisham2_calender_default_lesson: this.lesson.id,
          event_category_id: this.event.study_plan.category_id
        }
      })
        .then(() => {
          this.loading = false
          this.filteredLesson = this.lesson.id
          if (this.isPlanChanged) {
            this.updateMyStudyPlan()
          } else {
            this.getStudyPlanData()
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    getFilterLesson () {
      return new Promise((resolve, reject) => {
        APIGateway.studyPlan.getSetting(this.event.study_plan.category_id)
          .then(setting => {
            this.filteredLesson = setting?.setting?.abrisham2_calender_default_lesson // lessonId
            this.lesson = this.lessonOptions.find(lesson => lesson.id === this.filteredLesson)
            if (!this.lesson) {
              this.lesson = { lesson_name: 'همه', id: null }
            }
            this.getMyStudyPlan()
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    setFlagTrue () {
      this.isPlanChanged = true
    },
    getMyStudyPlan () {
      this.loading = true
      APIGateway.studyPlan.getMyStudyPlan({ category_id: this.event.study_plan.category_id })
        .then(studyPlan => {
          this.currentStudyPlan = studyPlan
          this.studyEvent = studyPlan.id
          this.getStudyPlanData()
          this.loading = false
        })
        .catch(() => {
          this.changeStudyPlan()
          this.loading = false
        })
    },
    getChangePlanOptions () {
      this.loading = true
      APIGateway.studyPlan.getSelectPlanOptions({ category_id: this.event.study_plan.category_id })
        .then(options => {
          this.loading = false
          this.majorOptions = options.majors
          this.gradeOptions = options.grades
          this.planOptions = options.studyPlans
          this.lessonOptions = options.products
          this.lessonOptions.push({
            lesson_name: 'همه',
            id: null
          })
          this.planType = options.studyPlans.find(studyPlan => studyPlan.display_name === this.currentStudyPlan.display_name) || {
            id: null,
            title: null,
            display_name: null
          }
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
    changeStudyPlan () {
      this.planSettings = !this.planSettings
    },
    acceptSettings () {
      this.planSettings = false
      if (this.isPlanChanged) {
        this.warning = true
      } else {
        this.filterByLesson()
      }
    },
    updateMyStudyPlan (data, date) {
      this.loading = true
      this.warning = false
      const studyPlanData = {
        category_id: this.event.study_plan.category_id,
        major_id: data && data.major_id ? data.major_id : this.major.id,
        grade_id: data && data.grade_id ? data.grade_id : this.grade.id,
        study_method_id: data && data.study_method_id ? data.study_method_id : this.planType.id
      }
      APIGateway.studyPlan.updateMyStudyPlan(studyPlanData)
        .then(studyPlan => {
          this.getMyStudyPlan()
          this.studyEvent = studyPlan.id
          this.getStudyPlanData(date)
          this.loading = false
          this.successChangePlan = true
        })
        .catch(() => {
          this.changeStudyPlan()
          this.loading = false
        })
    },
    getStudyPlanData (date) {
      this.studyPlanListLoaded = false
      this.studyPlanList.loading = true
      const now = moment(date) || moment(Time.now())
      const day0 = now.clone().weekday(0).format('YYYY/MM/DD')
      const day6 = now.clone().weekday(6).format('YYYY/MM/DD')
      this.currentDay = now.clone().weekday(0).format('YYYY-MM-DD HH:mm:ss')
      APIGateway.studyPlan.getStudyPlanData({
        study_event: this.studyEvent,
        product_id: this.filteredLesson,
        till_date: day6,
        since_date: day0
      })
        .then(studyPlanList => {
          const minAndMaxStartHour = this.getMinAndMaxStartHour(studyPlanList)

          this.lastEndTime = minAndMaxStartHour.lastEndTime < 23 ? minAndMaxStartHour.lastEndTime + 1 : minAndMaxStartHour.lastEndTime
          this.firstStartTime = minAndMaxStartHour.firstStartTime > 0 ? minAndMaxStartHour.firstStartTime - 1 : minAndMaxStartHour.firstStartTime

          this.studyPlanList.loading = false
          this.studyPlanList = studyPlanList
          this.studyPlanListLoaded = true
        })
        .catch(() => {
          this.studyPlanList.loading = false
          this.studyPlanListLoaded = false
        })
    },
    getMinAndMaxStartHour (studyPlanList) {
      let firstStartTime = 23
      let lastEndTime = 0
      studyPlanList.list.forEach(studyPlan => {
        studyPlan.plans.list.forEach(plan => {
          if (firstStartTime > moment(plan.start, 'HH:mm:ss').hours()) {
            firstStartTime = moment(plan.start, 'HH:mm:ss').hours()
          }
          if (lastEndTime < moment(plan.end, 'HH:mm:ss').hours()) {
            lastEndTime = moment(plan.end, 'HH:mm:ss').hours()
          }
        })
      })

      return {
        lastEndTime,
        firstStartTime
      }
    }
  }
}
</script>

<style scoped lang="scss">
.triple-title-set-study-plan {
  padding: $space-8;
  @include media-max-width('md') {
    padding: $space-4;
  }
  @include media-max-width('sm') {
    padding: $space-1;
  }
}
.content-selection {
  padding-left: 5px;
  margin-top: 95px;
}
.action-btns {
  .newPlan-btn {
    margin-left: 24px;
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

  .lazy-image-wrapper {
    place-content: center;

    .lazy-image {
      width: 140px;
      height: 140px;
    }
  }
}

.day-view-current-time-indicator {
  position: absolute;
  height: 10px;
  width: 10px;
  margin-top: -4px;
  background-color: rgb(0 0 255 / 50%);
  border-radius: 50%;
}

.day-view-current-time-line {
  position: absolute;
  border-top: rgb(0 0 255 / 50%) 2px solid;
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

<template>
  <div class="AdminEntekhabReshte">
    <q-skeleton v-if="konkurKarnameLoading"
                type="rect"
                width="100%"
                height="200px" />
    <entity-show v-else
                 ref="entityShow"
                 v-model:value="konkurKarnameInputs"
                 title="کارنامه دانش آموز"
                 :show-reload-button="false"
                 :show-expand-button="false"
                 :show-edit-button="false"
                 :show-index-button="false"
                 :copy-on-click="true"
                 :loaded-data="konkurRankForm"
                 :after-load-input-data="afterLoadKonkurKarnameInputs"
                 @onCopyToClipboard="onCopyToClipboard" />

    <q-separator class="q-my-lg" />

    <q-skeleton v-if="entekhabReshteLoading"
                type="rect"
                width="100%"
                height="200px" />
    <entity-show v-else
                 ref="entityShow"
                 v-model:value="entekhabReshteInputs"
                 title="فرم انتخاب رشته دانش آموز"
                 :show-reload-button="false"
                 :show-expand-button="false"
                 :show-edit-button="false"
                 :show-index-button="false"
                 :loaded-data="fieldSelectionForm"
                 :copy-on-click="true"
                 :after-load-input-data="afterLoadEntekhabReshteInputs"
                 @onCopyToClipboard="onCopyToClipboard" />
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityShow } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import { EventResult } from 'src/models/EventResult.js'
import { FieldSelectionForm } from 'src/models/FieldSelectionForm.js'
import FormBuilderCustomComponentShahrOrderViewer from 'src/components/Widgets/Admin/User/AdminEntekhabReshte/components/FormBuilderCustomComponentShahrOrderViewer.vue'

const FormBuilderCustomComponentShahrOrderViewerComp = shallowRef(FormBuilderCustomComponentShahrOrderViewer)

export default {
  name: 'AdminEntekhabReshte',
  components: { EntityShow },
  mixins: [mixinWidget],
  data () {
    return {
      konkurKarnameLoading: true,
      entekhabReshteLoading: true,
      konkurRankForm: new EventResult(),
      fieldSelectionForm: new FieldSelectionForm(),
      provinces: [],
      cities: [],
      karnameApi: null,
      entekhabReshteApi: null,
      fieldSelectionFormData: {
        majors: [],
        regions: [],
        universityTypes: []
      },
      konkurKarnameInputs: [
        { type: 'separator', name: 'separator', label: 'کنکور', size: '0', ignoreValue: true, col: 'col-12' },
        { type: 'select', name: 'major_id', label: 'رشته', responseKey: 'major.id', placeholder: ' ', col: 'col-6' },
        { type: 'select', name: 'region_id', responseKey: 'region.id', label: 'سهمیه', placeholder: ' ', col: 'col-6' },
        { type: 'separator', name: 'separator', label: 'تراز کنکور', size: '0', ignoreValue: true, col: 'col-12' },
        { type: 'input', name: 'nomre_taraz_dey', label: 'نمره تراز دی (اختیاری)', responseKey: 'nomre_taraz_dey', placeholder: ' ', col: 'col-6' },
        { type: 'input', name: 'nomre_taraz_tir', label: 'نمره تراز تیر (اختیاری)', responseKey: 'nomre_taraz_tir', placeholder: ' ', col: 'col-6' },
        { type: 'input', name: 'nomre_taraz_moadel', label: 'نمره تراز معدل', responseKey: 'nomre_taraz_moadel', placeholder: ' ', col: 'col-6' },
        { type: 'input', name: 'nomre_taraz_kol', label: 'نمره تراز کل', responseKey: 'nomre_taraz_kol', placeholder: ' ', col: 'col-6' },
        { type: 'separator', name: 'separator', label: 'رتبه کنکور', size: '0', ignoreValue: true, col: 'col-12' },
        { type: 'input', name: 'rank', responseKey: 'nomre_taraz_kol', label: 'رتبه کشوری', placeholder: ' ', col: 'col-6' },
        { type: 'input', name: 'participationCode', responseKey: 'participationCode', label: 'کد داوطلبی (اختیاری)', placeholder: ' ', col: 'col-6' },
        { type: 'input', name: 'rank_in_district', responseKey: 'rank_in_district', label: 'رتبه در منطقه', placeholder: ' ', col: 'col-6' },
        { type: 'input', name: 'rank_in_region', responseKey: 'rank_in_region', label: 'رتبه در سهمیه', placeholder: ' ', col: 'col-6' },
        { type: 'separator', name: 'separator', label: 'محل سکونت', size: '0', ignoreValue: true, col: 'col-12' },
        { type: 'select', name: 'province', responseKey: 'province', label: 'استان', optionLabel: 'title', optionValue: 'id', placeholder: ' ', col: 'col-6' },
        { type: 'select', name: 'shahr_id', responseKey: 'shahr_id', label: 'شهر', optionLabel: 'title', optionValue: 'id', placeholder: ' ', col: 'col-6' },
        { type: 'input', name: 'postalCode', responseKey: 'postalCode', label: 'کد پستی', placeholder: ' ', col: 'col-12' },
        { type: 'separator', name: 'separator', label: 'بارگزاری کارنامه', size: '0', ignoreValue: true, col: 'col-12' },
        { type: 'file', name: 'report_file_link', responseKey: 'report_file_link', label: 'اسکن یا تصویر با کیفیت کارنامه خودتو بارگذاری کن.', placeholder: ' ', col: 'col-6' },
        { type: 'separator', name: 'separator', label: 'اطلاعات بیشتر', size: '0', ignoreValue: true, col: 'col-12' },
        { type: 'input', name: 'comment', responseKey: 'comment', label: 'توضیحات بیشتر', inputType: 'textarea', placeholder: ' ', col: 'col-12' },
        { type: 'checkbox', name: 'enableReportPublish', responseKey: 'enableReportPublish', trueValue: 1, falseValue: 0, value: 1, label: 'اجازه انتشار رتبه خودمو تو سایت آلاء میدم.', col: 'col-12' }
      ],
      entekhabReshteInputs: [
        { type: 'separator', name: 'separator', label: 'آپلود فایل انتخاب رشته', size: '0', ignoreValue: true, col: 'col-12' },
        { type: 'optionGroupRadio', name: 'hasFile', responseKey: 'hasFile', options: [{ label: 'انتخاب رشته کردم', value: true }, { label: 'انتخاب رشته نکردم', value: false }], value: true, col: 'col-12' },
        { type: 'file', name: 'file', responseKey: 'file', label: 'یه فایل ترجیحا PDF که شامل رشته های منتخب شما باشه.', placeholder: ' ', value: null, col: 'col-md-4 col-12' },
        { type: 'separator', name: 'separator', label: '', size: '0', ignoreValue: true, col: 'col-12' },
        { type: 'input', name: 'comment', responseKey: 'comment', label: 'توضیحات تکمیلی', inputType: 'textarea', placeholder: ' ', value: null, col: 'col-12' },
        { type: 'separator', name: 'separator', label: 'اطلاعات تماس', size: '0', ignoreValue: true, col: 'col-12' },
        { type: 'input', name: 'mobile', responseKey: 'mobile', label: 'شماره همراه', placeholder: ' ', col: 'col-6' },
        { type: 'input', name: 'phone', responseKey: 'user.phone', label: 'تلفن ثابت (با کد شهر)', placeholder: ' ', value: null, col: 'col-6' },
        { type: 'separator', name: 'separator', label: 'اولویت محل و نوع دانشگاه', size: '0', ignoreValue: true, col: 'col-12' },
        { type: FormBuilderCustomComponentShahrOrderViewerComp, name: 'shahrha', responseKey: 'enableReportPublish', optionLabel: 'title', optionValue: 'id', placeholder: ' ', provinces: [], cities: [], value: null, col: 'col-12' },
        { type: 'optionGroupCheckbox', name: 'university_types', responseKey: 'university_types', label: 'نوع دانشگاه', typeOfInput: 'checkbox', inline: false, options: [], value: [], col: 'col-12' },
        { type: 'separator', name: 'separator', label: 'اولویت رشته ها', size: '0', ignoreValue: true, col: 'col-12' },
        { type: 'select', name: 'majors', responseKey: 'majors', label: 'رشته ها', multiple: true, showNoOption: false, createNewValue: true, newValueMode: 'add-unique', useChips: true, hideDropdownIcon: true, placeholder: ' ', value: [], col: 'col-12' },
        { type: 'separator', name: 'separator', label: 'مشاور', size: '0', ignoreValue: true, col: 'col-12' },
        { type: 'input', name: 'consultant_firstname', responseKey: 'consultant_firstname', label: 'نام', placeholder: ' ', value: null, col: 'col-6' },
        { type: 'input', name: 'consultant_lastname', responseKey: 'consultant_lastname', label: 'نام خانوادگی', placeholder: ' ', value: null, col: 'col-6' },
        { type: 'input', name: 'consultant_mobile', responseKey: 'consultant_mobile', label: 'شماره تماس', placeholder: ' ', value: null, col: 'col-12' }
      ]
    }
  },
  computed: {
    shahrValues () {
      return this.cities.filter(city => city.province.id === FormBuilderAssist.getInputsByName(this.konkurKarnameInputs, 'province')?.value)
    },
    selectedRegion () {
      return FormBuilderAssist.getInputsByName(this.konkurKarnameInputs, 'region_id')?.value
    }
  },
  mounted () {
    this.getFormData()
  },
  methods: {
    getKonkurResultFormData () {
      const userId = this.$route.params.id
      const eventId = this.$route.params.event_id
      return new Promise((resolve, reject) => {
        this.konkurRankForm.loading = true
        APIGateway.events.getKonkurResultByEvent({
          eventId,
          user_id: userId
        })
          .then((eventResult) => {
            this.konkurRankForm = new EventResult(eventResult)
            this.konkurRankForm.loading = false
            resolve(this.konkurRankForm)
          })
          .catch(() => {
            this.konkurRankForm.loading = false
            reject()
          })
      })
    },
    getEntekhabReshte () {
      const userId = this.$route.params.id
      return new Promise((resolve, reject) => {
        this.fieldSelectionForm.loading = true
        APIGateway.user.getEntekhabReshteByUserId(userId)
          .then((fieldSelectionForm) => {
            this.fieldSelectionForm = new FieldSelectionForm(fieldSelectionForm)
            this.fieldSelectionForm.loading = false
            resolve(this.fieldSelectionForm)
          })
          .catch(() => {
            this.fieldSelectionForm.loading = false
            reject()
          })
      })
    },
    afterLoadKonkurKarnameInputs () {
      this.loadProvinceAndCityValue()
    },
    afterLoadEntekhabReshteInputs () {
      const hasFile = !!this.fieldSelectionForm.file
      const user = this.$store.getters['Auth/user']
      FormBuilderAssist.setAttributeByName(this.entekhabReshteInputs, 'hasFile', 'value', hasFile)
      FormBuilderAssist.setAttributeByName(this.entekhabReshteInputs, 'mobile', 'value', user.mobile)
      FormBuilderAssist.setAttributeByName(this.entekhabReshteInputs, 'university_types', 'value', this.fieldSelectionForm.university_types.map(item => item.id))
      FormBuilderAssist.setAttributeByName(this.entekhabReshteInputs, 'shahrha', 'value', this.fieldSelectionForm.shahrha)
      if (this.fieldSelectionForm.consultants[0]) {
        FormBuilderAssist.setAttributeByName(this.entekhabReshteInputs, 'consultant_firstname', 'value', this.fieldSelectionForm.consultants[0].first_name)
        FormBuilderAssist.setAttributeByName(this.entekhabReshteInputs, 'consultant_lastname', 'value', this.fieldSelectionForm.consultants[0].last_name)
        FormBuilderAssist.setAttributeByName(this.entekhabReshteInputs, 'consultant_mobile', 'value', this.fieldSelectionForm.consultants[0].mobile)
      }
    },
    onCopyToClipboard () {
      this.$q.notify({
        message: 'کپی شد',
        type: 'positive'
      })
    },
    loadProvinceAndCityValue () {
      const cityId = this.konkurRankForm.shahr?.id || this.konkurRankForm.shahr_id
      if (!cityId) {
        return
      }
      const selectedCity = this.cities.find(city => city.id === parseInt(cityId))
      if (!selectedCity) {
        return
      }
      const provinceId = selectedCity.province?.id
      if (!provinceId) {
        return
      }

      FormBuilderAssist.setAttributeByName(this.konkurKarnameInputs, 'province', 'value', provinceId)
      FormBuilderAssist.setAttributeByName(this.konkurKarnameInputs, 'shahr_id', 'value', cityId)
    },
    loadProvinceAndCityOptions () {
      FormBuilderAssist.setAttributeByName(this.konkurKarnameInputs, 'province', 'options', this.provinces)
      FormBuilderAssist.setAttributeByName(this.konkurKarnameInputs, 'shahr_id', 'options', this.cities)
    },
    loadFieldSelectionFormOptions () {
      FormBuilderAssist.setAttributeByName(this.entekhabReshteInputs, 'university_types', 'options', this.fieldSelectionFormData.universityTypes.map(item => {
        return {
          label: item.display_name,
          value: item.id
        }
      }))
      FormBuilderAssist.setAttributeByName(this.entekhabReshteInputs, 'shahrha', 'cities', this.cities)
      FormBuilderAssist.setAttributeByName(this.entekhabReshteInputs, 'shahrha', 'provinces', this.provinces)
    },
    getFieldSelectionFormData () {
      return new Promise((resolve, reject) => {
        APIGateway.events.formBuilder({ params: ['majors', 'regions', 'universityTypes'] })
          .then((formBuilder) => {
            this.fieldSelectionFormData = formBuilder
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    getFormData () {
      this.konkurKarnameLoading = true
      FormBuilderAssist.setAttributeByName(this.konkurKarnameInputs, 'event_id', 'value', this.eventId)
      const promise1 = this.getMajorsAndRegions()
      const promise2 = this.getProvincesAndCities()
      const promise3 = this.getKonkurResultFormData()
      const promise4 = this.getFieldSelectionFormData()
      const promise5 = this.getEntekhabReshte()

      Promise.all([
        promise1,
        promise2,
        promise3,
        promise4,
        promise5
      ])
        .then(() => {
          this.loadProvinceAndCityOptions()
          this.loadFieldSelectionFormOptions()
          this.konkurKarnameLoading = false
          this.entekhabReshteLoading = false
        })
        .catch(() => {
          this.konkurKarnameLoading = false
          this.entekhabReshteLoading = false
        })
    },
    getMajorsAndRegions () {
      return new Promise((resolve, reject) => {
        APIGateway.events.formBuilder({ params: ['majors', 'regions', 'universityTypes'] })
          .then((formBuilder) => {
            this.formBuilder = formBuilder
            FormBuilderAssist.setAttributeByName(this.konkurKarnameInputs, 'major_id', 'options', this.formBuilder.majors.map(item => {
              return {
                label: item.title,
                value: item.id
              }
            }))
            FormBuilderAssist.setAttributeByName(this.konkurKarnameInputs, 'region_id', 'options', this.formBuilder.regions.map(item => {
              return {
                label: item.title,
                value: item.id
              }
            }))
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    getProvincesAndCities () {
      return new Promise((resolve, reject) => {
        APIGateway.user.formData()
          .then((formData) => {
            FormBuilderAssist.setAttributeByName(this.konkurKarnameInputs, 'province', 'options', formData.provinces)
            this.provinces = formData.provinces
            this.cities = formData.cities
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    }
  }
}
</script>

<style  lang="scss" scoped>
.AdminEntekhabReshte {

}
</style>

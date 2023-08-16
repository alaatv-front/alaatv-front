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
                 :api="karnameApi"
                 :after-load-input-data="afterLoadKonkurKarnameInputData" />
    <q-skeleton v-if="konkurKarnameLoading"
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
                 :copy-on-click="true"
                 :api="entekhabReshteApi"
                 :after-load-input-data="afterLoadEntekhabReshteInputData" />
  </div>
</template>

<script>
import { EntityShow } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import { EventResult } from 'src/models/EventResult.js'

export default {
  name: 'AdminEntekhabReshte',
  components: { EntityShow },
  mixins: [mixinWidget],
  data () {
    return {
      konkurKarnameLoading: true,
      entekhabReshteLoading: true,
      konkurRankForm: new EventResult(),
      provinces: [],
      cities: [],
      karnameApi: null,
      entekhabReshteApi: null,
      formBuilder: {
        majors: [],
        regions: [],
        universityTypes: []
      },
      konkurKarnameInputs: [
        { type: 'hidden', name: 'event_id', value: null },
        { type: 'separator', name: 'separator', label: 'کنکور', size: '0', ignoreValue: true, col: 'col-12' },
        { type: 'select', name: 'major_id', label: 'رشته', placeholder: ' ', col: 'col-6' },
        { type: 'select', name: 'region_id', label: 'سهمیه', placeholder: ' ', col: 'col-6' },
        { type: 'separator', name: 'separator', label: 'تراز کنکور', size: '0', ignoreValue: true, col: 'col-12' },
        { type: 'input', name: 'nomre_taraz_dey', label: 'نمره تراز دی (اختیاری)', placeholder: ' ', col: 'col-6' },
        { type: 'input', name: 'nomre_taraz_tir', label: 'نمره تراز تیر (اختیاری)', placeholder: ' ', col: 'col-6' },
        { type: 'input', name: 'nomre_taraz_moadel', label: 'نمره تراز معدل', placeholder: ' ', col: 'col-6' },
        { type: 'input', name: 'nomre_taraz_kol', label: 'نمره تراز کل', placeholder: ' ', col: 'col-6' },
        { type: 'separator', name: 'separator', label: 'رتبه کنکور', size: '0', ignoreValue: true, col: 'col-12' },
        { type: 'input', name: 'rank', label: 'رتبه کشوری', placeholder: ' ', col: 'col-6' },
        { type: 'input', name: 'participationCode', label: 'کد داوطلبی (اختیاری)', placeholder: ' ', col: 'col-6' },
        { type: 'input', name: 'rank_in_district', label: 'رتبه در منطقه', placeholder: ' ', col: 'col-6' },
        { type: 'input', name: 'rank_in_region', label: 'رتبه در سهمیه', placeholder: ' ', col: 'col-6' },
        { type: 'separator', name: 'separator', label: 'محل سکونت', size: '0', ignoreValue: true, col: 'col-12' },
        { type: 'select', name: 'province', label: 'استان', optionLabel: 'title', optionValue: 'id', placeholder: ' ', col: 'col-6' },
        { type: 'select', name: 'shahr_id', label: 'شهر', optionLabel: 'title', optionValue: 'id', placeholder: ' ', col: 'col-6' },
        { type: 'input', name: 'postalCode', label: 'کد پستی', placeholder: ' ', col: 'col-12' },
        { type: 'separator', name: 'separator', label: 'بارگزاری کارنامه', size: '0', ignoreValue: true, col: 'col-12' },
        { type: 'file', name: 'reportFile', label: 'اسکن یا تصویر با کیفیت کارنامه خودتو بارگذاری کن.', placeholder: ' ', col: 'col-6' },
        { type: 'separator', name: 'separator', label: 'اطلاعات بیشتر', size: '0', ignoreValue: true, col: 'col-12' },
        { type: 'input', name: 'comment', label: 'توضیحات بیشتر', inputType: 'textarea', placeholder: ' ', col: 'col-12' },
        { type: 'checkbox', name: 'enableReportPublish', trueValue: 1, falseValue: 0, value: 1, label: 'اجازه انتشار رتبه خودمو تو سایت آلاء میدم.', col: 'col-12' }
      ],
      entekhabReshteInputs: [
        { type: 'hidden', name: 'event_id', value: null },
        { type: 'separator', name: 'separator', label: 'کنکور', size: '0', ignoreValue: true, col: 'col-12' },
        { type: 'select', name: 'major_id', label: 'رشته', placeholder: ' ', col: 'col-6' },
        { type: 'select', name: 'region_id', label: 'سهمیه', placeholder: ' ', col: 'col-6' },
        { type: 'separator', name: 'separator', label: 'تراز کنکور', size: '0', ignoreValue: true, col: 'col-12' },
        { type: 'input', name: 'nomre_taraz_dey', label: 'نمره تراز دی (اختیاری)', placeholder: ' ', col: 'col-6' },
        { type: 'input', name: 'nomre_taraz_tir', label: 'نمره تراز تیر (اختیاری)', placeholder: ' ', col: 'col-6' },
        { type: 'input', name: 'nomre_taraz_moadel', label: 'نمره تراز معدل', placeholder: ' ', col: 'col-6' },
        { type: 'input', name: 'nomre_taraz_kol', label: 'نمره تراز کل', placeholder: ' ', col: 'col-6' },
        { type: 'separator', name: 'separator', label: 'رتبه کنکور', size: '0', ignoreValue: true, col: 'col-12' },
        { type: 'input', name: 'rank', label: 'رتبه کشوری', placeholder: ' ', col: 'col-6' },
        { type: 'input', name: 'participationCode', label: 'کد داوطلبی (اختیاری)', placeholder: ' ', col: 'col-6' },
        { type: 'input', name: 'rank_in_district', label: 'رتبه در منطقه', placeholder: ' ', col: 'col-6' },
        { type: 'input', name: 'rank_in_region', label: 'رتبه در سهمیه', placeholder: ' ', col: 'col-6' },
        { type: 'separator', name: 'separator', label: 'محل سکونت', size: '0', ignoreValue: true, col: 'col-12' },
        { type: 'select', name: 'province', label: 'استان', optionLabel: 'title', optionValue: 'id', placeholder: ' ', col: 'col-6' },
        { type: 'select', name: 'shahr_id', label: 'شهر', optionLabel: 'title', optionValue: 'id', placeholder: ' ', col: 'col-6' },
        { type: 'input', name: 'postalCode', label: 'کد پستی', placeholder: ' ', col: 'col-12' },
        { type: 'separator', name: 'separator', label: 'بارگزاری کارنامه', size: '0', ignoreValue: true, col: 'col-12' },
        { type: 'file', name: 'reportFile', label: 'اسکن یا تصویر با کیفیت کارنامه خودتو بارگذاری کن.', placeholder: ' ', col: 'col-6' },
        { type: 'separator', name: 'separator', label: 'اطلاعات بیشتر', size: '0', ignoreValue: true, col: 'col-12' },
        { type: 'input', name: 'comment', label: 'توضیحات بیشتر', inputType: 'textarea', placeholder: ' ', col: 'col-12' },
        { type: 'checkbox', name: 'enableReportPublish', trueValue: 1, falseValue: 0, value: 1, label: 'اجازه انتشار رتبه خودمو تو سایت آلاء میدم.', col: 'col-12' }
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
  created () {
    // const userId = this.$route.params.id
    const userId = 155
    const eventId = this.$route.params.event_id
    this.karnameApi = APIGateway.events.APIAdresses.getInfoByEvent(eventId) + '?user_id=' + userId
    this.entekhabReshteApi = APIGateway.user.APIAdresses.getEntekhabReshteByUserId(userId)
  },
  mounted () {
    this.getFormData()
  },
  methods: {
    afterLoadKonkurKarnameInputData (data) {
      this.konkurRankForm = new EventResult(data)
      this.loadProvinceAndCity()
    },
    afterLoadEntekhabReshteInputData () {
    },
    loadProvinceAndCity () {
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
    getFormData () {
      this.konkurKarnameLoading = true
      FormBuilderAssist.setAttributeByName(this.konkurKarnameInputs, 'event_id', 'value', this.eventId)
      const promise1 = this.getMajorsAndRegions()
      const promise2 = this.getProvincesAndCities()

      Promise.all([promise1, promise2])
        .then(() => {
          this.loadForm()
          this.konkurKarnameLoading = false
        })
        .catch(() => {
          this.konkurKarnameLoading = false
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

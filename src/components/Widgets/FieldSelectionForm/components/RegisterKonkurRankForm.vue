<template>
  <div class="RegisterKonkurRankForm">
    <div class="title-text q-mb-sm">
      رتبه کنکورتو ثبت کن!
    </div>
    <div class="content-text q-mb-lg">
      بعد از ثبت رتبه، فیلم های مشاوره انتخاب رشته آلاء در دسترست قرار میگیرن.
    </div>
    <q-skeleton v-if="formDataLoading"
                type="rect"
                width="100%"
                height="200px" />
    <entity-create v-else
                   ref="entityCreate"
                   v-model:value="inputs"
                   :api="api"
                   :default-layout="false" />
    <div class="row q-col-gutter-md q-mt-lg">
      <div class="col-6" />
      <div class="col-6 q-mt-sm">
        <q-btn color="primary"
               class="full-width"
               :loading="registerLoading || formDataLoading"
               @click="register">
          ثبت کارنامه
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { EntityCreate } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import { EventResult } from 'src/models/EventResult.js'
import FormBuilderCustomComponentHint from './FormBuilderCustomComponentHint.vue'

const FormBuilderCustomComponentHintComp = shallowRef(FormBuilderCustomComponentHint)

export default {
  name: 'RegisterKonkurRankForm',
  components: { EntityCreate },
  props: {
    konkurRankForm: {
      type: EventResult,
      default: new EventResult()
    },
    eventId: {
      type: Number,
      default: null
    }
  },
  emits: ['onComplete'],
  data () {
    return {
      formDataLoading: false,
      registerLoading: false,
      provinces: [],
      cities: [],
      api: APIGateway.user.APIAdresses.eventResult,
      formBuilder: {
        majors: [],
        regions: [],
        universityTypes: []
      },
      inputs: [
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
        { type: FormBuilderCustomComponentHintComp, name: 'hintPostalCode', label: 'کد پستی باید ده رقمی باشه.', ignoreValue: true, col: 'col-12' },
        { type: 'separator', name: 'separator', label: 'بارگزاری کارنامه', size: '0', ignoreValue: true, col: 'col-12' },
        { type: 'file', name: 'reportFile', label: 'اسکن یا تصویر با کیفیت کارنامه خودتو بارگذاری کن.', placeholder: ' ', col: 'col-6' },
        { type: FormBuilderCustomComponentHintComp, name: 'hintFile', label: 'بعدا قابل ویرایش نیست، پس حتما فایل درست رو انتخاب کن', ignoreValue: true, col: 'col-12' },
        { type: 'separator', name: 'separator', label: 'اطلاعات بیشتر', size: '0', ignoreValue: true, col: 'col-12' },
        { type: 'input', name: 'comment', label: 'توضیحات بیشتر', inputType: 'textarea', placeholder: ' ', col: 'col-12' },
        { type: 'checkbox', name: 'enableReportPublish', trueValue: 1, falseValue: 0, value: 1, label: 'اجازه انتشار رتبه خودمو تو سایت آلاء میدم.', col: 'col-12' }
      ]
    }
  },
  computed: {
    konkurRankFormId () {
      return this.konkurRankForm.id
    },
    shahrValues () {
      return this.cities.filter(city => city.province.id === FormBuilderAssist.getInputsByName(this.inputs, 'province')?.value)
    },
    selectedRegion () {
      return FormBuilderAssist.getInputsByName(this.inputs, 'region_id')?.value
    }
  },
  watch: {
    shahrValues (newValue) {
      if (FormBuilderAssist.getInputsByName(this.inputs, 'shahr_id')) {
        FormBuilderAssist.getInputsByName(this.inputs, 'shahr_id').options = newValue
      }
    },
    selectedRegion: {
      handler (newValue) {
        if (newValue === 6 || newValue === 7) {
          FormBuilderAssist.setAttributeByName(this.inputs, 'rank_in_region', 'className', '')
        } else {
          FormBuilderAssist.setAttributeByName(this.inputs, 'rank_in_region', 'className', 'hidden')
          FormBuilderAssist.setAttributeByName(this.inputs, 'rank_in_region', 'value', null)
        }
      },
      immediate: true
    },
    konkurRankFormId: {
      handler (newValue) {
        this.loadForm()
      },
      immediate: true
    }
  },
  mounted () {
    this.getFormData()
  },
  methods: {
    loadForm () {
      if (!this.konkurRankFormId) {
        return
      }
      this.inputs.forEach(input => {
        const key = input.name
        const valueFromServer = this.konkurRankForm[key]
        if (typeof valueFromServer !== 'undefined' && key !== 'separator') {
          FormBuilderAssist.setAttributeByName(this.inputs, key, 'value', valueFromServer)
        }
      })
      FormBuilderAssist.setAttributeByName(this.inputs, 'major_id', 'value', this.konkurRankForm.major?.id || this.konkurRankForm.major_id)
      FormBuilderAssist.setAttributeByName(this.inputs, 'event_id', 'value', this.konkurRankForm.event.id)
      FormBuilderAssist.setAttributeByName(this.inputs, 'region_id', 'value', this.konkurRankForm.region.id)
      this.loadProvinceAndCity()
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

      FormBuilderAssist.setAttributeByName(this.inputs, 'province', 'value', provinceId)
      FormBuilderAssist.setAttributeByName(this.inputs, 'shahr_id', 'value', cityId)
    },
    getFormData () {
      this.formDataLoading = true
      FormBuilderAssist.setAttributeByName(this.inputs, 'event_id', 'value', this.eventId)
      const promise1 = this.getMajorsAndRegions()
      const promise2 = this.getProvincesAndCities()

      Promise.all([promise1, promise2])
        .then(() => {
          this.loadForm()
          this.formDataLoading = false
        })
        .catch(() => {
          this.formDataLoading = false
        })
    },
    getMajorsAndRegions () {
      return new Promise((resolve, reject) => {
        APIGateway.events.formBuilder({ params: ['majors', 'regions', 'universityTypes'] })
          .then((formBuilder) => {
            this.formBuilder = formBuilder
            FormBuilderAssist.setAttributeByName(this.inputs, 'major_id', 'options', this.formBuilder.majors.map(item => {
              return {
                label: item.title,
                value: item.id
              }
            }))
            FormBuilderAssist.setAttributeByName(this.inputs, 'region_id', 'options', this.formBuilder.regions.map(item => {
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
            FormBuilderAssist.setAttributeByName(this.inputs, 'province', 'options', formData.provinces)
            this.provinces = formData.provinces
            this.cities = formData.cities
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    register () {
      this.registerLoading = true
      this.$refs.entityCreate.createEntity(false)
        .then((response) => {
          this.onComplete(response.data)
          this.registerLoading = false
        })
        .catch(() => {
          this.registerLoading = false
        })
    },
    onComplete (responseData) {
      this.$emit('onComplete', responseData)
    }
  }
}
</script>

<style lang="scss" scoped>
.RegisterKonkurRankForm {
}
</style>

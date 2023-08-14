<template>
  <div class="RegisterKonkurRankForm">
    <div class="title-text q-mb-sm">
      رتبه کنکورتو ثبت کن!
    </div>
    <div class="content-text q-mb-lg">
      بعد از ثبت رتبه، فیلم های مشاوره انتخاب رشته آلاء در دسترست قرار میگیرن.
    </div>
    <entity-create ref="entityCreate"
                   v-model:value="inputs"
                   :api="api"
                   :default-layout="false" />
    <div class="row q-col-gutter-md q-mt-lg">
      <div class="col-6" />
      <div class="col-6 q-mt-sm">
        <q-btn color="primary"
               class="full-width"
               @click="register">
          ثبت کارنامه
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { EntityCreate } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import { EventResult } from 'src/models/EventResult.js'

export default {
  name: 'RegisterKonkurRankForm',
  components: { EntityCreate },
  props: {
    konkurRankForm: {
      type: EventResult,
      default: new EventResult()
    }
  },
  emits: ['onComplete'],
  data () {
    return {
      cities: [],
      api: APIGateway.user.APIAdresses.eventResult,
      inputs: [
        { type: 'separator', name: 'separator', label: 'کنکور', size: '0', col: 'col-12' },
        { type: 'select', name: 'major_id', label: 'رشته', placeholder: ' ', col: 'col-6' },
        { type: 'select', name: 'name', label: 'سهمیه', placeholder: ' ', col: 'col-6' }, // ???????????????????????????
        { type: 'separator', name: 'separator', label: 'تراز کنکور', size: '0', col: 'col-12' },
        { type: 'input', name: 'small_name', label: 'نمره تراز دی', placeholder: ' ', col: 'col-6' }, // ???????????????????????????
        { type: 'input', name: 'small_name', label: 'نمره تراز تیر', placeholder: ' ', col: 'col-6' }, // ???????????????????????????
        { type: 'input', name: 'small_name', label: 'نمره تراز معدل', placeholder: ' ', col: 'col-6' }, // ???????????????????????????
        { type: 'input', name: 'small_name', label: 'نمره تراز کل', placeholder: ' ', col: 'col-6' }, // ???????????????????????????
        { type: 'separator', name: 'separator', label: 'رتبه کنکور', size: '0', col: 'col-12' }, // ???????????????????????????
        { type: 'input', name: 'rank', label: 'رتبه کشوری', placeholder: ' ', col: 'col-6' },
        { type: 'input', name: 'participationCode', label: 'کد داوطلبی (اختیاری)', placeholder: ' ', col: 'col-6' },
        { type: 'input', name: 'small_name', label: 'رتبه در منطقه', placeholder: ' ', col: 'col-6' }, // ???????????????????????????
        { type: 'input', name: 'small_name', label: 'رتبه در سهمیه', placeholder: ' ', col: 'col-6' }, // ???????????????????????????
        { type: 'separator', name: 'separator', label: 'محل سکونت', size: '0', col: 'col-12' },
        { type: 'select', name: 'province', label: 'استان', optionLabel: 'title', optionValue: 'id', placeholder: ' ', col: 'col-6' }, // ???????????????????????????
        { type: 'select', name: 'shahr_id', label: 'شهر', optionLabel: 'title', optionValue: 'id', placeholder: ' ', col: 'col-6' }, // ???????????????????????????
        { type: 'input', name: 'small_name', label: 'کد پستی', placeholder: ' ', col: 'col-12' }, // ???????????????????????????
        { type: 'separator', name: 'separator', label: 'بارگزاری کارنامه', size: '0', col: 'col-12' },
        { type: 'file', name: 'reportFile', label: 'اسکن یا تصویر با کیفیت کارنامه خودتو بارگذاری کن.', placeholder: ' ', col: 'col-6' },
        { type: 'separator', name: 'separator', label: 'اطلاعات بیشتر', size: '0', col: 'col-12' },
        { type: 'input', name: 'comment', label: 'توضیحات بیشتر', inputType: 'textarea', placeholder: ' ', col: 'col-12' },
        { type: 'checkbox', name: 'enableReportPublish', trueValue: 1, falseValue: 0, value: 1, label: 'اجازه انتشار رتبه خودمو تو سایت آلاء میدم.', col: 'col-12' }
      ]
    }
  },
  computed: {
    shahrValues () {
      return this.cities.filter(city => city.province.id === FormBuilderAssist.getInputsByName(this.inputs, 'province')?.value)
    }
  },
  watch: {
    shahrValues (newValue) {
      if (FormBuilderAssist.getInputsByName(this.inputs, 'shahr_id')) {
        FormBuilderAssist.getInputsByName(this.inputs, 'shahr_id').options = newValue
      }
    }
  },
  mounted () {
    this.getFormData()
  },
  methods: {
    loadForm () {
      this.inputs.forEach(input => {
        const key = input.name
        if (typeof this.konkurRankForm[key] !== 'undefined') {
          FormBuilderAssist.setAttributeByName(this.inputs, key, 'value', this.konkurRankForm[key])
        }
      })
    },
    getFormData () {
      this.getProvincesAndCities()
    },
    getProvincesAndCities () {
      APIGateway.user.formData()
        .then((formData) => {
          FormBuilderAssist.setAttributeByName(this.inputs, 'province', 'options', formData.provinces)
          this.cities = formData.cities
        })
        .catch(() => {
        })
    },
    register () {
      this.$refs.entityCreate.createEntity()
        .then((response) => {
          this.onComplete(response.data)
        })
        .catch(() => {
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

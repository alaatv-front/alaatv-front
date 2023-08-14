<template>
  <div class="RegisterKonkurFieldSelectionForm">
    <div class="title-text q-mb-sm">
      ثبت نام در انتخاب رشته آلاء
    </div>
    <div class="content-text q-mb-xl">
      فرم زیر رو پر کن تا تیم آلاء کارشو شروع کنه
    </div>
    <entity-create ref="entityCreate"
                   v-model:value="inputs"
                   :api="api"
                   :default-layout="false" />
    <div class="caption-text q-mt-sm">
      - اطلاعات مشاور طول سال ترجیحا مشاوری که تو انتخاب رشته بهت کمک کرده.
    </div>
    <div class="content-text q-mt-md">
      در صورت نیاز برای هماهنگی با مشاورت تماس میگیریم. اگه خودت به تنهایی انتخاب رشته رو انجام دادی و در طول سال هم مشاور نداشتی این فیلد رو خالی بذار.
    </div>
    <div class="row q-col-gutter-md q-mt-lg">
      <div class="col-6">
        <q-btn color="white"
               class="full-width"
               @click="register">
          <q-icon name="arrow_forward" />
          بازگشت
        </q-btn>
      </div>
      <div class="col-6">
        <q-btn color="primary"
               class="full-width"
               @click="register">
          ثبت نام
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { EntityCreate } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'

export default {
  name: 'RegisterKonkurFieldSelectionForm',
  components: { EntityCreate },
  props: {
    konkurRankFormData: {
      type: Object,
      default: null
    }
  },
  emits: ['end'],
  data () {
    return {
      cities: [],
      api: APIGateway.set.APIAdresses.adminBase,
      inputs: [
        { type: 'separator', name: 'separator', label: 'آپلود فایل انتخاب رشته', size: '0', col: 'col-12' },
        { type: 'optionGroupRadio', name: 'hasFile', options: [{ label: 'انتخاب رشته کردم', value: true }, { label: 'انتخاب رشته نکردم', value: false }], value: true, col: 'col-12' },
        { type: 'file', name: 'file', label: 'یه فایل ترجیحا PDF که شامل رشته های منتخب شما باشه.', placeholder: ' ', col: 'col-12' },
        { type: 'input', name: 'comment', label: 'توضیحات تکمیلی', inputType: 'textarea', placeholder: ' ', col: 'col-12' },
        { type: 'separator', name: 'separator', label: 'اطلاعات تماس', size: '0', col: 'col-12' },
        { type: 'input', name: 'small_name', label: 'شماره همراه', placeholder: ' ', col: 'col-6' }, // ??????????????????????????
        { type: 'input', name: 'phone', label: 'تلفن ثابت', placeholder: ' ', col: 'col-6' },
        { type: 'separator', name: 'separator', label: 'اولویت محل و نوع دانشگاه', size: '0', col: 'col-12' },
        { type: 'select', name: 'shahrha', label: 'استان و شهر', optionLabel: 'title', optionValue: 'id', placeholder: ' ', col: 'col-12' },
        { type: 'optionGroupCheckbox', name: 'university_types', label: 'نوع دانشگاه', typeOfInput: 'checkbox', inline: false, options: [{ label: 'انتخاب رشته کردم', value: 1 }, { label: 'انتخاب رشته نکردم', value: 0 }], value: [], col: 'col-12' },
        { type: 'separator', name: 'separator', label: 'اولویت رشته ها', size: '0', col: 'col-12' },
        { type: 'optionGroupRadio', name: 'hasMajors', options: [{ label: 'فرقی نداره، فقط برم دانشگاه', value: false }, { label: 'اولویت بندی دارم', value: true }], value: false, col: 'col-12' },
        { type: 'select', name: 'majors', label: 'رشته ها', multiple: true, showNoOption: false, createNewValue: true, newValueMode: 'add-unique', useChips: true, hideDropdownIcon: true, placeholder: ' ', className: 'hidden', col: 'col-12' },
        { type: 'separator', name: 'separator', label: 'مشاور', size: '0', col: 'col-12' },
        { type: 'input', name: 'consultant_firstname', label: 'نام', placeholder: ' ', col: 'col-6' },
        { type: 'input', name: 'consultant_lastname', label: 'نام خانوادگی', placeholder: ' ', col: 'col-6' },
        { type: 'input', name: 'consultant_mobile', label: 'تلفن ثابت', placeholder: ' ', col: 'col-12' }
      ]
    }
  },
  computed: {
    hasFile () {
      return FormBuilderAssist.getInputsByName(this.inputs, 'hasFile')?.value
    },
    hasMajors () {
      return FormBuilderAssist.getInputsByName(this.inputs, 'hasMajors')?.value
    }
  },
  watch: {
    hasFile (newValue) {
      if (newValue) {
        FormBuilderAssist.setAttributeByName(this.inputs, 'file', 'className', '')
      } else {
        FormBuilderAssist.setAttributeByName(this.inputs, 'file', 'className', 'hidden')
        FormBuilderAssist.setAttributeByName(this.inputs, 'file', 'value', null)
      }
    },
    hasMajors (newValue) {
      if (newValue) {
        FormBuilderAssist.setAttributeByName(this.inputs, 'majors', 'className', '')
      } else {
        FormBuilderAssist.setAttributeByName(this.inputs, 'majors', 'className', 'hidden')
        FormBuilderAssist.setAttributeByName(this.inputs, 'majors', 'value', [])
      }
    }
  },
  mounted () {
    // this.getFormData()
  },
  methods: {
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
.RegisterKonkurFieldSelectionForm {
}
</style>

<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row">
          <div class="col-md-4">
            <q-checkbox v-model="accountInfo"
                        left-label
                        label="مشخصات حساب" />
          </div>
          <div class="col-md-4">
            <q-checkbox v-model="personalInfo"
                        left-label
                        label="مشخصات فردی" />
          </div>
          <div class="col-md-4">
            <q-checkbox v-model="educationalInfo"
                        left-label
                        label="مشخصات تحصیلی" />
          </div>
          <div class="col-md-4">
            <q-checkbox v-model="contactInfo"
                        left-label
                        label="اطلاعات تماس" />
          </div>
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel, OptionPanelTabs } from 'quasar-ui-q-page-builder'
// import mixinOptionPanel from 'quasar-ui-q-page-builder/src/mixin/OptionPanel.js'
// import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs },
  mixins: [mixinOptionPanel],
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      accountInfo: true,
      personalInfo: true,
      educationalInfo: true,
      contactInfo: true,
      localInputs: [
        {
          type: 'formBuilder',
          name: 'accountInfo',
          col: 'col-md-12 q-card custom-card q-px-md q-pb-sm',
          value: [
            {
              type: 'separator',
              size: '0',
              label: 'مشخصات حساب',
              col: 'col-md-12 title'
            },
            {
              type: 'input',
              name: 'id',
              responseKey: 'data.id',
              label: 'شناسه',
              outlined: true,
              placeholder: 'وارد نمایید',
              col: 'col-md-6'
            },
            {
              type: 'input',
              name: 'mobile',
              responseKey: 'data.mobile',
              label: 'شماره موبایل',
              outlined: true,
              placeholder: 'وارد نمایید',
              col: 'col-md-6'
            }
          ]
        },
        {
          type: 'formBuilder',
          name: 'personalInfo',
          col: 'col-md-12 q-card custom-card q-mt-md q-px-md q-pb-sm',
          value: [
            {
              type: 'separator',
              size: '0',
              label: 'مشخصات فردی',
              col: 'col-md-12 title'
            },

            {
              type: 'input',
              name: 'first_name',
              responseKey: 'data.first_name',
              label: 'نام',
              outlined: true,
              placeholder: 'وارد نمایید',
              col: 'col-md-6'
            },
            {
              type: 'input',
              name: 'last_name',
              responseKey: 'data.last_name',
              label: 'نام خانوادگی',
              outlined: true,
              placeholder: 'وارد نمایید',
              col: 'col-md-6'
            },
            {
              type: 'date',
              name: 'birthdate',
              responseKey: 'data.birthdate',
              label: 'تاریخ تولد',
              outlined: true,
              placeholder: 'وارد نمایید',
              col: 'col-md-6'
            },
            {
              type: 'select',
              name: 'gender',
              label: 'جنسیت',
              responseKey: 'data.gender',
              placeholder: 'انتخاب نمایید',
              optionLabel: 'name',
              outlined: true,
              multiple: false,
              col: 'col-md-6'
            },
            {
              type: 'input',
              name: 'national_code',
              responseKey: 'data.national_code',
              label: 'کد ملی',
              outlined: true,
              placeholder: 'وارد نمایید',
              col: 'col-md-6'
            }
          ]
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-12 q-card custom-card  q-mt-md q-px-md q-pb-sm',
          value: [
            {
              type: 'separator',
              size: '0',
              label: 'مشخصات تحصیلی',
              col: 'col-md-12 title'
            },
            {
              type: 'select',
              name: 'grade',
              label: 'مقطع تحصیلی',
              placeholder: 'انتخاب نمایید',
              responseKey: 'data.grade',
              optionLabel: 'name',
              outlined: true,
              multiple: false,
              col: 'col-md-6'
            },
            {
              type: 'select',
              name: 'major',
              label: 'رشته تحصیلی',
              placeholder: 'انتخاب نمایید',
              responseKey: 'data.major',
              optionLabel: 'name',
              outlined: true,
              multiple: false,
              col: 'col-md-6'
            }
          ]
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-12 q-card custom-card  q-mt-md q-px-md q-pb-sm',
          value: [
            {
              type: 'separator',
              size: '0',
              label: 'اطلاعات تماس',
              col: 'col-md-12 title'
            },

            {
              type: 'input',
              name: 'postal_code',
              responseKey: 'data.postal_code',
              label: 'کدپستی',
              outlined: true,
              placeholder: 'وارد نمایید',
              col: 'col-md-6'
            },
            {
              type: 'input',
              name: 'email',
              responseKey: 'data.email',
              label: 'ایمیل',
              outlined: true,
              placeholder: 'وارد نمایید',
              col: 'col-md-6'
            },
            {
              type: 'input',
              name: 'address',
              responseKey: 'data.address',
              label: 'آدرس محل سکونت',
              outlined: true,
              placeholder: 'وارد نمایید',
              col: 'col-md-12'
            }
          ]
        }
      ],
      defaultOptions: {
        className: '',
        height: 'auto',
        boxed: false,
        boxedWidth: 1200,
        style: {}
      }
    }
  },
  watch: {
    localOptions: {
      handler(newVal) {
        this.$emit('update:options', newVal)
      },
      deep: true
    },
    accountInfo(newVal) {
      if (!newVal) {
        this.removeBox('accountInfo')
      } else {
        this.addBox('accountInfo')
      }
    },
    personalInfo(newVal) {
      if (!newVal) {
        this.removeBox('personalInfo')
      } else {
        this.addBox('personalInfo')
      }
    },
    educationalInfo(newVal) {
      if (!newVal) {
        this.removeBox('educationalInfo')
      } else {
        this.addBox('educationalInfo')
      }
    },
    contactInfo(newVal) {
      if (!newVal) {
        this.removeBox('contactInfo')
      } else {
        this.addBox('contactInfo')
      }
    }
  },
  methods: {
    removeBox(name) {
      const index = this.localOptions.inputs.findIndex(input => input.name === name)
      this.localOptions.inputs.splice(index, 1)
    },
    addBox(name) {
      const index = this.localInputs.findIndex(input => input.name === name)
      this.localOptions.inputs.splice(index, 0, this.localInputs[index])
    }
  }
})
</script>

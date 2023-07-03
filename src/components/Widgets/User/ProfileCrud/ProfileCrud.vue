<template>
  <div :class="options.className"
       :style="options.style">
    <div class="lt-sm flex justify-end">
      <q-btn flat
             color="grey"
             :to="{name: 'UserPanel.Dashboard'}">
        <q-icon name="isax:layer"
                class="q-mr-sm" />
        >
      </q-btn>
    </div>
    <entity-edit ref="entityEdit"
                 v-model:value="inputs"
                 :api="api"
                 :entity-id-key="entityIdKey"
                 :entity-param-key="entityParamKey"
                 :show-route-name="showRouteName"
                 :defaultLayout="defaultLayout"
                 :before-get-data="beforeGetData"
                 :before-send-data="beforeSendData"
                 :after-get-data="afterGetData"
                 :after-send-data="afterSendData">
      <template #after-form-builder>
        <div class="col-12 q-my-md flex justify-end">
          <q-btn class="submitBtn"
                 label="ثبت تغییرات"
                 @click="submit" />
        </div>
      </template>
    </entity-edit>
  </div>
</template>

<script>
import { Notify } from 'quasar'
import { EntityEdit } from 'quasar-crud'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'ProfileCrud',
  components: {
    EntityEdit
  },
  mixins: [mixinWidget],
  data() {
    return {
      api: APIGateway.user.APIAdresses.base + '/' + this.$store.getters['Auth/user'].id,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'UserPanel.Profile',
      inputs: [
        {
          type: 'formBuilder',
          name: 'accountInfo',
          col: 'col-12 custom-card q-mt-md',
          value: [{
            type: 'separator',
            size: '0',
            label: 'مشخصات حساب',
            col: 'col-12 title',
            ignoreValue: true
          }, {
            type: 'input',
            name: 'id',
            responseKey: 'data.id',
            label: 'شناسه',
            outlined: true,
            placeholder: 'وارد نمایید',
            col: 'col-xs-6',
            value: null,
            readonly: true
          }, {
            type: 'input',
            name: 'mobile',
            responseKey: 'data.mobile',
            label: 'شماره موبایل',
            outlined: true,
            placeholder: 'وارد نمایید',
            col: 'col-xs-6 q-pr-md q-mb-md',
            value: '09999999999',
            readonly: true
          }],
          ignoreValue: true
        },
        {
          type: 'formBuilder',
          name: 'personalInfo',
          col: 'col-xs-12 custom-card q-mt-md',
          value: [
            {
              type: 'separator',
              size: '0',
              label: 'مشخصات فردی',
              col: 'col-xs-12 title',
              ignoreValue: true
            },
            {
              type: 'input',
              name: 'first_name',
              responseKey: 'data.first_name',
              label: 'نام',
              outlined: true,
              placeholder: 'وارد نمایید',
              col: 'col-xs-6 q-mb-md',
              value: null
            }, {
              type: 'input',
              name: 'last_name',
              responseKey: 'data.last_name',
              label: 'نام خانوادگی',
              outlined: true,
              placeholder: 'وارد نمایید',
              col: 'col-xs-6 q-pr-md',
              value: null
            }, {
              type: 'date',
              name: 'birthdate',
              responseKey: 'data.birthdate',
              label: 'تاریخ تولد',
              outlined: true,
              calendarIcon: ' ',
              placeholder: 'وارد نمایید',
              col: 'col-xs-6 q-mb-md',
              value: null
            }, {
              type: 'select',
              name: 'gender',
              label: 'جنسیت',
              responseKey: 'data.gender',
              placeholder: 'انتخاب نمایید',
              optionLabel: 'name',
              outlined: true,
              multiple: false,
              col: 'col-xs-6 q-pr-md',
              value: null
            }, {
              type: 'select',
              name: 'city',
              label: 'شهر',
              responseKey: 'data.city',
              placeholder: 'انتخاب نمایید',
              optionLabel: 'title',
              outlined: true,
              multiple: false,
              col: 'col-xs-6 q-mb-md',
              value: null
            }, {
              type: 'select',
              name: 'province',
              label: 'استان',
              responseKey: 'data.province',
              placeholder: 'انتخاب نمایید',
              optionLabel: 'title',
              outlined: true,
              multiple: false,
              col: 'col-xs-6 q-pr-md',
              value: null
            }, {
              type: 'input',
              name: 'national_code',
              responseKey: 'data.national_code',
              label: 'کد ملی',
              outlined: true,
              placeholder: 'وارد نمایید',
              col: 'col-xs-6 q-mb-md',
              value: '',
              readonly: true
            }],
          ignoreValue: true
        },
        {
          type: 'formBuilder',
          name: 'educationalInfo',
          col: 'col-xs-12 custom-card q-mt-md',
          value: [{
            type: 'separator',
            size: '0',
            label: 'مشخصات تحصیلی',
            col: 'col-xs-12 title',
            ignoreValue: true
          }, {
            type: 'select',
            name: 'grade',
            label: 'مقطع تحصیلی',
            placeholder: 'انتخاب نمایید',
            responseKey: 'data.grade',
            optionLabel: 'name',
            outlined: true,
            multiple: false,
            col: 'col-xs-6',
            value: null
          }, {
            type: 'select',
            name: 'major',
            label: 'رشته تحصیلی',
            placeholder: 'انتخاب نمایید',
            responseKey: 'data.major',
            optionLabel: 'name',
            outlined: true,
            multiple: false,
            col: 'col-xs-6 q-pr-md q-mb-md',
            value: null
          }],
          ignoreValue: true
        },
        {
          type: 'formBuilder',
          name: 'contactInfo',
          col: 'col-xs-12 custom-card q-mt-md',
          value: [{
            type: 'separator',
            size: '0',
            label: 'اطلاعات تماس',
            col: 'col-xs-12 title',
            ignoreValue: true
          }, {
            type: 'input',
            name: 'postal_code',
            responseKey: 'data.postal_code',
            label: 'کدپستی',
            outlined: true,
            placeholder: 'وارد نمایید',
            col: 'col-xs-6 q-mb-md',
            value: null
          }, {
            type: 'input',
            name: 'email',
            responseKey: 'data.email',
            label: 'ایمیل',
            outlined: true,
            placeholder: 'وارد نمایید',
            col: 'col-xs-6 q-pr-md',
            value: 'kparia@gmail.com',
            readonly: true
          }, {
            type: 'input',
            name: 'address',
            responseKey: 'data.address',
            label: 'آدرس محل سکونت',
            outlined: true,
            placeholder: 'وارد نمایید',
            col: 'col-xs-12 q-mb-md q-pr-md',
            value: null
          }],
          ignoreValue: true
        }
      ],
      localInputs: [
        {
          type: 'formBuilder',
          name: 'accountInfo',
          col: 'col-12 custom-card q-mt-md',
          value: [{
            type: 'separator',
            size: '0',
            label: 'مشخصات حساب',
            col: 'col-12 title',
            ignoreValue: true
          }, {
            type: 'input',
            name: 'id',
            responseKey: 'data.id',
            label: 'شناسه',
            outlined: true,
            placeholder: 'وارد نمایید',
            col: 'col-xs-6',
            value: 1,
            readonly: true
          }, {
            type: 'input',
            name: 'mobile',
            responseKey: 'data.mobile',
            label: 'شماره موبایل',
            outlined: true,
            placeholder: 'وارد نمایید',
            col: 'col-xs-6 q-pr-md q-mb-md',
            value: '09999999999',
            readonly: true
          }],
          ignoreValue: true
        },
        {
          type: 'formBuilder',
          name: 'personalInfo',
          col: 'col-xs-12 custom-card q-mt-md',
          value: [
            {
              type: 'separator',
              size: '0',
              label: 'مشخصات فردی',
              col: 'col-xs-12 title',
              ignoreValue: true
            },
            {
              type: 'input',
              name: 'first_name',
              responseKey: 'data.first_name',
              label: 'نام',
              outlined: true,
              placeholder: 'وارد نمایید',
              col: 'col-xs-6 q-mb-md',
              value: 'راستاک',
              readonly: true
            }, {
              type: 'input',
              name: 'last_name',
              responseKey: 'data.last_name',
              label: 'نام خانوادگی',
              outlined: true,
              placeholder: 'وارد نمایید',
              col: 'col-xs-6 q-pr-md',
              value: 'مددی',
              readonly: true
            }, {
              type: 'date',
              name: 'birthdate',
              responseKey: 'data.birthdate',
              label: 'تاریخ تولد',
              outlined: true,
              calendarIcon: ' ',
              placeholder: 'وارد نمایید',
              col: 'col-xs-6 q-mb-md',
              value: null
            }, {
              type: 'select',
              name: 'gender',
              label: 'جنسیت',
              responseKey: 'data.gender',
              placeholder: 'انتخاب نمایید',
              optionLabel: 'name',
              outlined: true,
              multiple: false,
              col: 'col-xs-6 q-pr-md',
              value: null
            }, {
              type: 'select',
              name: 'city',
              label: 'شهر',
              responseKey: 'data.city',
              placeholder: 'انتخاب نمایید',
              optionLabel: 'title',
              outlined: true,
              multiple: false,
              col: 'col-xs-6 q-mb-md',
              value: null
            }, {
              type: 'select',
              name: 'province',
              label: 'استان',
              responseKey: 'data.province',
              placeholder: 'انتخاب نمایید',
              optionLabel: 'title',
              outlined: true,
              multiple: false,
              col: 'col-xs-6 q-pr-md',
              value: null
            }, {
              type: 'input',
              name: 'national_code',
              responseKey: 'data.national_code',
              label: 'کد ملی',
              outlined: true,
              placeholder: 'وارد نمایید',
              col: 'col-xs-6 q-mb-md',
              value: '0000000000',
              readonly: true
            }],
          ignoreValue: true
        },
        {
          type: 'formBuilder',
          name: 'educationalInfo',
          col: 'col-xs-12 custom-card q-mt-md',
          value: [{
            type: 'separator',
            size: '0',
            label: 'مشخصات تحصیلی',
            col: 'col-xs-12 title',
            ignoreValue: true
          }, {
            type: 'select',
            name: 'grade',
            label: 'مقطع تحصیلی',
            placeholder: 'انتخاب نمایید',
            responseKey: 'data.grade',
            optionLabel: 'name',
            outlined: true,
            multiple: false,
            col: 'col-xs-6',
            value: null
          }, {
            type: 'select',
            name: 'major',
            label: 'رشته تحصیلی',
            placeholder: 'انتخاب نمایید',
            responseKey: 'data.major',
            optionLabel: 'name',
            outlined: true,
            multiple: false,
            col: 'col-xs-6 q-pr-md q-mb-md',
            value: null
          }],
          ignoreValue: true
        },
        {
          type: 'formBuilder',
          name: 'contactInfo',
          col: 'col-xs-12 custom-card q-mt-md',
          value: [{
            type: 'separator',
            size: '0',
            label: 'اطلاعات تماس',
            col: 'col-xs-12 title',
            ignoreValue: true
          }, {
            type: 'input',
            name: 'postal_code',
            responseKey: 'data.postal_code',
            label: 'کدپستی',
            outlined: true,
            placeholder: 'وارد نمایید',
            col: 'col-xs-6 q-mb-md',
            value: null
          }, {
            type: 'input',
            name: 'email',
            responseKey: 'data.email',
            label: 'ایمیل',
            outlined: true,
            placeholder: 'وارد نمایید',
            col: 'col-xs-6 q-pr-md',
            value: 'kparia@gmail.com',
            readonly: true
          }, {
            type: 'input',
            name: 'address',
            responseKey: 'data.address',
            label: 'آدرس محل سکونت',
            outlined: true,
            placeholder: 'وارد نمایید',
            col: 'col-xs-12 q-mb-md q-pr-md',
            value: null
          }],
          ignoreValue: true
        }
      ],
      cities: [],
      defaultLayout: false,
      defaultOptions: {
        accountInfo: true,
        personalInfo: true,
        educationalInfo: true,
        contactInfo: true,
        className: '',
        height: 'auto',
        boxed: false,
        boxedWidth: 1200,
        style: {}
      }
    }
  },
  computed: {
    shahrValues() {
      return this.cities.filter(city => city.province.id === this.$refs.entityEdit.getInputsByName('province')?.value?.id)
    }
  },
  watch: {
    'localOptions.accountInfo': function (newVal) {
      if (!newVal) {
        this.removeBox('accountInfo')
      } else {
        this.addBox('accountInfo')
      }
    },
    'localOptions.personalInfo': function (newVal) {
      if (!newVal) {
        this.removeBox('personalInfo')
      } else {
        this.addBox('personalInfo')
      }
    },
    'localOptions.educationalInfo': function (newVal) {
      if (!newVal) {
        this.removeBox('educationalInfo')
      } else {
        this.addBox('educationalInfo')
      }
    },
    'localOptions.contactInfo': function (newVal) {
      if (!newVal) {
        this.removeBox('contactInfo')
      } else {
        this.addBox('contactInfo')
      }
    },
    shahrValues(newValue) {
      if (this.$refs.entityEdit.getInputsByName('city')) {
        this.$refs.entityEdit.getInputsByName('city').options = newValue
      }
    }
  },
  mounted() {
    if (this.$store.getters['Auth/incompleteProfile']) {
      Notify.create({
        message: 'لطفا ابتدا اطلاعات کاربری را کامل نمایید.',
        color: 'warning'
      })
    }
  },
  methods: {
    beforeGetData() {
      APIGateway.user.formData()
        .then((formData) => {
          // edit entity
          this.$refs.entityEdit.setInputAttributeByName('gender', 'options', formData.genders)
          this.$refs.entityEdit.setInputAttributeByName('province', 'options', formData.provinces)
          this.$refs.entityEdit.setInputAttributeByName('grade', 'options', formData.grades)
          this.$refs.entityEdit.setInputAttributeByName('major', 'options', formData.majors)
          this.cities = formData.cities
          // this.selectedProvinceId = this.localInputs[1].value[6].value?.id
        })
        .catch(() => {
        })
    },
    afterGetData() {
      this.inputs.forEach(input => {
        input.value.forEach(val => {
          if (val.value) {
            val.readonly = true
          }
        })
      })
      this.$store.commit('loading/loading', false)
    },
    beforeSendData(d) {
      d.postal_code = Number(d.postal_code)
      d.grade_id = d.grade ? d.grade.id : null
      d.major_id = d.major ? d.major.id : null
      if (!this.$refs.entityEdit.getInputsByName('gender').disable) {
        d.gender_id = d.gender.id
      }
    },
    afterSendData(d) {
      this.$store.commit('Auth/updateUser', d.data.data)
      this.$store.commit('loading/loading', false)
    },
    submit() {
      this.$store.commit('loading/loading', true)

      this.$refs.entityEdit.editEntity()
    },
    removeBox(name) {
      const index = this.inputs.findIndex(input => input.name === name)
      this.inputs.splice(index, 1)
    },
    addBox(name) {
      const index = this.localInputs.findIndex(input => input.name === name)
      this.inputs.splice(index, 0, this.localInputs[index])
    }
  }
}
</script>

<style lang="scss" scoped>
:deep(.title) {
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -0.03em;
  color: #333333;
  margin-top: 20px;
}

.submitBtn {
  width: 189px;
  background: #ffc107;
  box-shadow: 3px 3px 6px rgba(52, 54, 55, 0.04);
  border-radius: 8px;
  color: white;
}

:deep(.outsideLabel) {
  font-size: 16px;
  font-weight: 400;
  line-height: 25px;
  letter-spacing: 0em;
  margin-bottom: 11px;
}

:deep(.q-field--labeled .q-field__native) {
  padding-top: 0;
  padding-bottom: 0;
  color: #aeaeae;

  &:focus {
    color: black;
  }
}

:deep(.q-field__inner) {
  background: #f6f7f9;
  border-radius: 8px;
}

:deep(.q-field--auto-height.q-field--labeled .q-field__control-container) {
  padding-top: 0;
  color: #aeaeae;

  &:focus {
    color: black;
  }
}

:deep(.q-field__control) {
  color: #ffc107;
  height: 48px;
}

:deep(.q-input) {
  border: 0px solid #f6f7f9;
  border-radius: 8px;
}

:deep(.q-field--outlined .q-field__control:before) {
  border: 0px;
  height: 48px !important;
}

:deep(.q-field) {
  height: 48px !important;
}

:deep(.q-field__append) {
  height: 48px !important;
}
</style>

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
    <q-banner v-if="needToCompleteInfo"
              class="bg-orange text-white q-mb-md q-pa-lg text-center">
      <div class="text-h4">
        لطفا اطلاعات خود را کامل کنید.
      </div>
    </q-banner>
    <entity-edit v-if="mounted"
                 ref="entityEdit"
                 v-model:value="inputs"
                 :api="api"
                 :entity-id-key="entityIdKey"
                 :entity-param-key="entityParamKey"
                 :show-route-name="showRouteName"
                 :defaultLayout="defaultLayout"
                 :after-load-input-data="afterLoadInputData"
                 :before-send-data="beforeSendData"
                 :after-send-data="afterSendData">
      <template #after-form-builder>
        <div class="col-12 q-my-md flex justify-end">
          <q-btn label="ثبت تغییرات"
                 color="primary"
                 size="lg"
                 @click="submit" />
        </div>
      </template>
    </entity-edit>
  </div>
</template>

<script>
import { Notify } from 'quasar'
import { EntityEdit } from 'quasar-crud'
import { User } from 'src/models/User.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'

export default {
  name: 'ProfileCrud',
  components: {
    EntityEdit
  },
  mixins: [mixinWidget],
  data () {
    return {
      mounted: false,
      user: new User(),
      api: APIGateway.user.APIAdresses.base + '/' + this.$store.getters['Auth/user'].id,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'UserPanel.Profile',
      inputs: [
        {
          type: 'formBuilder',
          name: 'accountInfo',
          col: 'col-12 custom-card q-mt-md',
          value: [
            {
              type: 'separator',
              size: '0',
              label: 'مشخصات حساب',
              col: 'col-12 title',
              ignoreValue: true
            },
            {
              type: 'input',
              name: 'id',
              responseKey: 'data.id',
              label: 'شناسه',
              outlined: true,
              placeholder: ' ',
              col: 'col-xs-6',
              value: null,
              readonly: true
            },
            {
              type: 'input',
              name: 'mobile',
              responseKey: 'data.mobile',
              label: 'شماره موبایل',
              outlined: true,
              placeholder: ' ',
              col: 'col-xs-6 q-pr-md q-mb-md',
              value: '09999999999',
              readonly: true
            }
          ],
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
              placeholder: ' ',
              col: 'col-xs-6 q-mb-md',
              value: null
            },
            {
              type: 'input',
              name: 'last_name',
              responseKey: 'data.last_name',
              label: 'نام خانوادگی',
              outlined: true,
              placeholder: ' ',
              col: 'col-xs-6 q-pr-md',
              value: null
            },
            {
              type: 'dateTime',
              name: 'birthdate',
              responseKey: 'data.birthdate',
              label: 'تاریخ تولد',
              outlined: true,
              col: 'col-xs-6 q-mb-md',
              value: null
            },
            {
              type: 'select',
              name: 'gender',
              label: 'جنسیت',
              responseKey: 'data.gender',
              placeholder: ' ',
              optionLabel: 'name',
              outlined: true,
              multiple: false,
              col: 'col-xs-6 q-pr-md',
              value: null
            },
            {
              type: 'select',
              name: 'province',
              label: 'استان',
              responseKey: 'data.province(read_from_city)',
              placeholder: ' ',
              optionLabel: 'title',
              optionValue: 'id',
              outlined: true,
              multiple: false,
              col: 'col-xs-6 q-mb-md',
              value: null
            },
            {
              type: 'select',
              name: 'shahr_id',
              label: 'شهر',
              responseKey: 'data.shahr.id',
              placeholder: ' ',
              optionLabel: 'title',
              optionValue: 'id',
              outlined: true,
              multiple: false,
              col: 'col-xs-6 q-pr-md',
              value: null
            },
            {
              type: 'input',
              name: 'national_code',
              responseKey: 'data.national_code',
              label: 'کد ملی',
              outlined: true,
              placeholder: ' ',
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
          value: [
            {
              type: 'separator',
              size: '0',
              label: 'مشخصات تحصیلی',
              col: 'col-xs-12 title',
              ignoreValue: true
            },
            {
              type: 'select',
              name: 'major',
              label: 'رشته تحصیلی',
              placeholder: ' ',
              responseKey: 'data.major',
              optionLabel: 'name',
              outlined: true,
              multiple: false,
              col: 'col-xs-6',
              value: null
            },
            {
              type: 'select',
              name: 'grade',
              label: 'مقطع تحصیلی',
              placeholder: ' ',
              responseKey: 'data.grade',
              optionLabel: 'name',
              outlined: true,
              multiple: false,
              col: 'col-xs-6 q-pr-md q-mb-md',
              value: null
            }
          ],
          ignoreValue: true
        },
        {
          type: 'formBuilder',
          name: 'contactInfo',
          col: 'col-xs-12 custom-card q-mt-md',
          value: [
            {
              type: 'separator',
              size: '0',
              label: 'اطلاعات تماس',
              col: 'col-xs-12 title',
              ignoreValue: true
            },
            {
              type: 'input',
              name: 'postal_code',
              responseKey: 'data.postal_code',
              label: 'کدپستی',
              outlined: true,
              placeholder: ' ',
              col: 'col-xs-6 q-mb-md',
              value: null
            },
            {
              type: 'input',
              name: 'email',
              responseKey: 'data.email',
              label: 'ایمیل',
              outlined: true,
              placeholder: ' ',
              col: 'col-xs-6 q-pr-md',
              value: 'kparia@gmail.com',
              readonly: true
            },
            {
              type: 'input',
              name: 'address',
              responseKey: 'data.address',
              label: 'آدرس محل سکونت',
              outlined: true,
              placeholder: ' ',
              col: 'col-xs-12 q-mb-md q-pr-md',
              value: null
            }
          ],
          ignoreValue: true
        }
      ],
      localInputs: [
        {
          type: 'formBuilder',
          name: 'accountInfo',
          col: 'col-12 custom-card q-mt-md',
          value: [
            {
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
              placeholder: ' ',
              col: 'col-xs-6',
              value: 1,
              readonly: true
            }, {
              type: 'input',
              name: 'mobile',
              responseKey: 'data.mobile',
              label: 'شماره موبایل',
              outlined: true,
              placeholder: ' ',
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
              placeholder: ' ',
              col: 'col-xs-6 q-mb-md',
              value: 'راستاک',
              readonly: true
            }, {
              type: 'input',
              name: 'last_name',
              responseKey: 'data.last_name',
              label: 'نام خانوادگی',
              outlined: true,
              placeholder: ' ',
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
              placeholder: ' ',
              col: 'col-xs-6 q-mb-md',
              value: null
            }, {
              type: 'select',
              name: 'gender',
              label: 'جنسیت',
              responseKey: 'data.gender',
              placeholder: ' ',
              optionLabel: 'name',
              outlined: true,
              multiple: false,
              col: 'col-xs-6 q-pr-md',
              value: null
            }, {
              type: 'select',
              name: 'shahr_id',
              label: 'شهر',
              responseKey: 'data.shahr.id',
              placeholder: ' ',
              optionLabel: 'title',
              optionValue: 'id',
              outlined: true,
              multiple: false,
              col: 'col-xs-6 q-pr-md',
              value: null
            }, {
              type: 'select',
              name: 'province',
              label: 'استان',
              responseKey: 'data.province',
              placeholder: ' ',
              optionLabel: 'title',
              optionValue: 'id',
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
              placeholder: ' ',
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
          value: [
            {
              type: 'separator',
              size: '0',
              label: 'مشخصات تحصیلی',
              col: 'col-xs-12 title',
              ignoreValue: true
            }, {
              type: 'select',
              name: 'grade',
              label: 'مقطع تحصیلی',
              placeholder: ' ',
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
              placeholder: ' ',
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
          value: [
            {
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
              placeholder: ' ',
              col: 'col-xs-6 q-mb-md',
              value: null
            }, {
              type: 'input',
              name: 'email',
              responseKey: 'data.email',
              label: 'ایمیل',
              outlined: true,
              placeholder: ' ',
              col: 'col-xs-6 q-pr-md',
              value: 'kparia@gmail.com',
              readonly: true
            }, {
              type: 'input',
              name: 'address',
              responseKey: 'data.address',
              label: 'آدرس محل سکونت',
              outlined: true,
              placeholder: ' ',
              col: 'col-xs-12 q-mb-md q-pr-md',
              value: null
            }],
          ignoreValue: true
        }
      ],
      hasOldShahr: false,
      hasNewShahr: false,
      provinces: [],
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
    needToCompleteInfo () {
      return this.user.needToCompleteInfo()
    },
    selectedProvinceId () {
      return FormBuilderAssist.getInputsByName(this.inputs, 'province')?.value
    },
    selectedShahrId () {
      return FormBuilderAssist.getInputsByName(this.inputs, 'shahr_id')?.value
    },
    shahrValues () {
      return this.cities.filter(city => city.province.id === this.selectedProvinceId)
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
    selectedProvinceId (newValue) {
      if (this.hasOldShahr && !this.hasNewShahr) {
        this.hasNewShahr = true
        return
      }
      if (newValue && FormBuilderAssist.getInputsByName(this.inputs, 'shahr_id')) {
        FormBuilderAssist.setAttributeByName(this.inputs, 'shahr_id', 'options', this.shahrValues)
      } else {
        FormBuilderAssist.setAttributeByName(this.inputs, 'shahr_id', 'options', [])
      }
      FormBuilderAssist.setAttributeByName(this.inputs, 'shahr_id', 'value', null)
    }
  },
  mounted () {
    this.getFormData()
    if (this.$store.getters['Auth/incompleteProfile']) {
      Notify.create({
        message: 'لطفا ابتدا اطلاعات کاربری را کامل نمایید.',
        color: 'warning'
      })
    }
  },
  methods: {
    loadAuthData () {
      this.user = this.$store.getters['Auth/user']
    },
    afterLoadInputData (response) {
      this.user = new User(response.data)
      const targetShahr = this.cities.find(item => item.id === this.user.shahr.id)
      if (targetShahr) {
        this.hasOldShahr = true
        FormBuilderAssist.setAttributeByName(this.inputs, 'province', 'value', targetShahr.province.id)
        FormBuilderAssist.setAttributeByName(this.inputs, 'shahr_id', 'options', this.shahrValues)
        FormBuilderAssist.setAttributeByName(this.inputs, 'shahr_id', 'value', this.user.shahr.id)
      }
    },
    getFormData () {
      APIGateway.user.formData()
        .then((formData) => {
          // edit entity

          FormBuilderAssist.setAttributeByName(this.inputs, 'grade', 'options', formData.grades)
          FormBuilderAssist.setAttributeByName(this.inputs, 'major', 'options', formData.majors)
          FormBuilderAssist.setAttributeByName(this.inputs, 'gender', 'options', formData.genders)
          FormBuilderAssist.setAttributeByName(this.inputs, 'province', 'options', formData.provinces)
          FormBuilderAssist.setAttributeByName(this.inputs, 'shahr_id', 'options', formData.cities)

          this.provinces = formData.provinces
          this.cities = formData.cities
          this.mounted = true
        })
        .catch(() => {
          this.mounted = true
        })
    },
    beforeSendData (d) {
      d.postal_code = Number(d.postal_code)
      d.grade_id = d.grade ? d.grade.id : null
      d.major_id = d.major ? d.major.id : null
      // if (!this.$refs.entityEdit.getInputsByName('gender').disable) {
      if (!FormBuilderAssist.getInputsByName(this.inputs, 'gender').disable) {
        d.gender_id = d.gender.id
      }
    },
    afterSendData (d) {
      this.$store.commit('Auth/updateUser', d.data.data)
      this.$store.commit('loading/loading', false)
    },
    submit () {
      this.$store.commit('loading/loading', true)

      this.$refs.entityEdit.editEntity(false)
        .then(() => {
          this.$store.dispatch('Auth/updateUser')
            .then(() => {
              this.loadAuthData()
              if (!this.user.needToCompleteInfo()) {
                this.redirectTo()
              } else {
                if (!this.user.mobile_verified_at) {
                  this.$q.notify({
                    message: 'لطفا شماره همراه خود را تایید کنید.',
                    type: 'warning'
                  })
                }
              }
              this.$store.commit('loading/loading', false)
            })
            .catch(() => {
              this.$store.commit('loading/loading', false)
            })
        })
        .catch(() => {
          this.$store.commit('loading/loading', false)
        })
    },
    redirectTo () {
      const redirectTo = this.$store.getters['Auth/redirectTo']
      if (redirectTo && typeof redirectTo === 'object') {
        this.$router.push(redirectTo)
        this.$store.commit('Auth/updateRedirectTo', null)
      }
    },
    removeBox (name) {
      const index = this.inputs.findIndex(input => input.name === name)
      this.inputs.splice(index, 1)
    },
    addBox (name) {
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
}
</style>

<template>
  <entity-edit
    ref="entityEdit"
    v-model:value="inputs"
    :api="api"
    :entity-id-key="entityIdKey"
    :entity-param-key="entityParamKey"
    :show-route-name="showRouteName"
    :defaultLayout="defaultLayout"
    :before-send-data="beforeSendData"
    :before-get-data="beforeGetData"
    :after-get-data="afterGetData"
    :after-send-data="afterSendData"
  >
    <template #after-form-builder>
      <div
        class="col-12 q-my-md"
        dir="ltr"
      >
        <q-btn
          class="submitBtn"
          @click="submit"
        >ثبت تغییرات
        </q-btn
        >
      </div>
    </template>
  </entity-edit>
  <entity-action
    ref="entityAction"
    v-model:value="actionInput"
    :action-method="'post'"
    :action-api="actionApi"
    :beforeDoAction="beforeDoAction"
    :defaultLayout="false"
    @onActionSuccess="onActionSuccess"
    @onActionError="onActionError"
  >
    <template #after-form-builder>
      <div
        class="col-12 q-my-md"
        dir="ltr"
      >
        <q-btn
          class="submitBtn"
          @click="submitAction"
        >ثبت رتبه کنکور
        </q-btn
        >
      </div>
    </template>
  </entity-action>
</template>

<script>
import { EntityEdit, EntityAction } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses'
import axios from 'axios'

export default {
  name: 'ProfileCrud',
  components: {
    EntityEdit,
    EntityAction
  },
  data() {
    return {
      api: API_ADDRESS.user.base + '/' + this.$store.getters['Auth/user'].id,
      actionApi: API_ADDRESS.user.eventresult,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'UserPanel.Profile',
      inputs: [
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
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
          name: 'formBuilderCol',
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
      actionInput: [
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-12 q-card custom-card  q-mt-md q-px-md q-pb-sm',
          value: [
            {
              type: 'separator',
              size: '0',
              label: 'ثبت رتبه کنکور',
              col: 'col-md-12 title'
            },
            {
              type: 'select',
              name: 'major',
              label: 'رشته شما',
              placeholder: 'انتخاب نمایید',
              responseKey: 'data.major',
              optionLabel: 'name',
              outlined: true,
              multiple: false,
              col: 'col-md-6'
            },
            {
              type: 'select',
              name: 'region',
              label: 'منطقه یا سهمیه',
              placeholder: 'انتخاب نمایید',
              responseKey: 'data.region',
              optionLabel: 'name',
              options: [
                {
                  id: 1,
                  name: 'منطقه ۱',
                  title: 'منطقه ۱'
                },
                {
                  id: 2,
                  name: 'منطقه ۲',
                  title: 'منطقه ۲'
                },
                {
                  id: 3,
                  name: 'منطقه ۳',
                  title: 'منطقه ۳'
                },
                {
                  id: 4,
                  name: 'شاهد',
                  title: 'شاهد'
                },
                {
                  id: 5,
                  name: 'هیئت علمی',
                  title: 'هیئت علمی'
                }
              ],
              outlined: true,
              multiple: false,
              col: 'col-md-6'
            },
            {
              type: 'input',
              name: 'rank',
              responseKey: 'data.rank',
              label: 'رتبه شما در منطقه',
              outlined: true,
              placeholder: 'وارد نمایید',
              col: 'col-md-6'
            },
            {
              type: 'input',
              name: 'participationCode',
              responseKey: 'data.participationCode',
              label: 'شماره داوطلبی شما',
              outlined: true,
              placeholder: 'وارد نمایید',
              col: 'col-md-6'
            },
            {
              type: 'file',
              name: 'reportFile',
              responseKey: 'data.reportFile',
              label: 'آپلود فایل کارنامه',
              outlined: true,
              placeholder: 'وارد نمایید',
              col: 'col-md-6'
            },
            {
              type: 'checkbox',
              name: 'enableReportPublish',
              responseKey: 'data.enableReportPublish',
              label: 'اجازه انتشار رتبه خود را در سایت میدهم',
              outlined: true,
              placeholder: 'وارد نمایید',
              value: false,
              col: 'col-md-12'
            }
          ]
        }
      ],
      defaultLayout: false
    }
  },
  computed: {},
  mounted() {
    this.$store.commit('loading/loading', true)
    this.$refs.entityAction
      .getAxiosPromise('get', this.actionApi)
      .then((d) => {
        this.$store.commit('loading/loading', false)
      })
      .catch((e) => {
        this.$store.commit('loading/loading', false)
      })
  },
  methods: {
    beforeGetData() {
      axios
        .get(API_ADDRESS.user.formData)
        .then((response) => {
          // edit entity
          this.inputs[2].value[1].options = response.data.data.grades
          this.inputs[2].value[2].options = response.data.data.majors
          this.inputs[1].value[4].options = response.data.data.genders
          // action entity
          this.actionInput[0].value[1].options = response.data.data.majors
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
      d.grade_id = d.grade.id
      d.major_id = d.major.id
      if (!this.inputs[1].value[4].disable) {
        d.gender_id = d.gender.id
      }
    },
    afterSendData(d) {
      this.$store.commit('Auth/updateUser', d.data.data)
      this.$store.commit('loading/loading', false)
    },
    beforeDoAction(d) {
      if (d.major) {
        d.major_id = d.major.id
      }
      if (d.region) {
        d.region_id = d.region.id
      }
      axios
        .get(API_ADDRESS.user.eventresult)
        .then((response) => {
          // TODO: Since  eventresult has not been implemented,
          // completing this part will be done after getting this from BackEnd
        })
    },
    onActionSuccess() {
      this.$store.commit('loading/loading', false)
    },
    onActionError() {
      this.$store.commit('loading/loading', false)
    },
    submit() {
      this.$store.commit('loading/loading', true)

      this.$refs.entityEdit.editEntity()
    },
    submitAction() {
      this.$store.commit('loading/loading', true)

      this.$refs.entityAction.doAction()
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

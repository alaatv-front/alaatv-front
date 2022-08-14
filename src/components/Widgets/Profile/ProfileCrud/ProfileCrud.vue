<template>
  <entity-edit
    v-model:value="inputs"
    ref="entityEdit"
    title="ویرایش اطلاعات کاربر"
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
          @click="editEntity"
          >ثبت تغییرات</q-btn
        >
      </div>
    </template>
  </entity-edit>
</template>

<script>
import { EntityEdit } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses'
import { Notify } from 'quasar'

export default {
  name: 'ProfileCrud',
  components: { EntityEdit },
  data() {
    return {
      api: API_ADDRESS.user.base + '/' + this.$store.getters['Auth/user'].id,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Profile',
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
              col: 'col-md-6',
              disable: true
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
              options: [
                {
                  id: 1,
                  name: 'آقا',
                  title: 'آقا'
                },
                {
                  id: 2,
                  name: 'خانم',
                  title: 'خانم'
                }
              ],
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
              name: 'major',
              label: 'مقطع تحصیلی',
              placeholder: 'انتخاب نمایید',
              responseKey: 'data.major',
              optionLabel: 'name',
              outlined: true,
              multiple: false,
              options: [
                {
                  id: 1,
                  name: 'آقا',
                  title: 'آقا'
                },
                {
                  id: 2,
                  name: 'خانم',
                  title: 'خانم'
                }
              ],
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
              options: [
                {
                  id: 1,
                  name: 'آقا',
                  title: 'آقا'
                },
                {
                  id: 2,
                  name: 'خانم',
                  title: 'خانم'
                }
              ],
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
              col: 'col-md-6',
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
      defaultLayout: false
    }
  },
  methods: {
    beforeGetData(){
      Notify.create({
        message: 'در حال دریافت اطلاعات',
        color: 'warning'
      })
    },
    afterGetData(){
      Notify.create({
        message: 'داده با موفقیت بارگیری شد',
        color: 'success'
      })
    },
    beforeSendData(d){
      d.postal_code = Number(d.postal_code)
      console.log(d);
    },
    afterSendData(d){

    },
    editEntity() {
      this.$refs.entityEdit.editEntity()
    },
  },
}
</script>

<style
  lang="scss"
  scoped
>
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
:deep(.q-field--outlined .q-field__control:before){
  border: 0px;
  height: 48px !important;
}
</style>

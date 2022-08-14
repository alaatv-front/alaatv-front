<template>
  <entity-edit
    v-model:value="inputs"
    title="ویرایش اطلاعات کاربر"
    :api="api"
    :entity-id-key="entityIdKey"
    :entity-param-key="entityParamKey"
    :show-route-name="showRouteName"
    :before-send-data="beforeSendData"
    :defaultLayout="defaultLayout"
  >
    <template #after-form-builder>
      <div
        class="col-12 q-my-md"
        dir="ltr"
      >
        <q-btn
          class="submitBtn"
          @click="runNeededMethod(onSaveButton, editEntity)"
          >ثبت تغییرات</q-btn
        >
      </div>
    </template>
  </entity-edit>
</template>

<script>
import { EntityEdit } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses'




export default {
  name: 'ProfileCrud',
  components: { EntityEdit },
  data() {
    return {
      api: API_ADDRESS.user.base + '/' + this.$store.getters['Auth/user'].id,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'User.Show',
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
              name: 'gender',
              label: 'مقطع تحصیلی',
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
              type: 'select',
              name: 'gender',
              label: 'رشته تحصیلی',
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
              disable: true
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
      beforeFormBuilder: false,
      afterFormBuilder: true,
      defaultLayout: false
    }
  },
  methods: {
    editEntity() {
      const formData = this.getFormData();
      this.beforeSendData(formData, this.setNewInputData);
      this.$axios
        .put(this.api, formData, { headers: this.getHeaders() })
        .then(() => {
          this.goToShowView();
        })
        .catch(() => {
          this.getData();
        });
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

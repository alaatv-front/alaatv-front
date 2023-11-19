<template>
  dflskgmfldkm
  <q-card v-for="c in cards"
          :key="c"
          class="q-mt-none q-mx-sm q-mb-md custom-card">
    <div class="custom-card-title">{{ c.title }}</div>
    <form-builder :value="c.inputs" />
  </q-card>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins'
// import { inputMixin, FormBuilder } from 'quasar-form-builder'
import FormBuilder from 'quasar-form-builder/src/FormBuilder.vue'
import inputMixin from 'quasar-form-builder/src/mixins/inputMixin.js'

export default {
  name: 'Profile',
  components: { FormBuilder },
  mixins: [mixinWidget, inputMixin],
  data() {
    return {
      cards: [
        {
          title: 'مشخصات حساب',
          inputs: [
            {
              type: 'input',
              responseKey: 'mobile',
              name: 'mobile',
              label: 'شماره موبایل',
              placeholder: 'مثال: ۰۹۱۲۵۵۵۸۸۴۴',
              col: 'col-md-6',
              outline: true
            }
            // {
            //   type: 'input',
            //   responseKey: 'username',
            //   name: 'username',
            //   label: 'نام کاربری',
            //   placeholder: 'وارد کنید',
            //   disabled: true,
            //   col: 'col-md-6'
            // }
          ]
        },
        {
          title: 'مشخصات فردی',
          inputs: [
            {
              type: 'input',
              responseKey: 'first_name',
              name: 'first_name',
              label: 'نام',
              placeholder: 'وارد کنید',
              col: 'col-md-6'
            },
            {
              type: 'input',
              responseKey: 'last_name',
              name: 'last_name',
              label: 'نام خانوادگی',
              placeholder: 'وارد کنید',
              col: 'col-md-6'
            },
            {
              type: 'date',
              responseKey: 'birthdate',
              name: 'birthdate',
              label: 'تاریخ تولدdhfdhf',
              placeholder: ' ',
              calendarIcon: ' ',
              col: 'col-md-6'
            },
            {
              type: 'select',
              responseKey: 'gender',
              name: 'gender',
              label: 'جنسیت',
              placeholder: 'جنسیت',
              optionLabel: 'label',
              optionValue: 'value',
              col: 'col-md-6',
              options: [
                { label: 'آقا', value: { id: 1, name: 'آقا', title: 'آقا' } },
                {
                  label: 'خانم',
                  value: { id: 2, name: 'خانم', title: 'خانم' }
                }
              ]
            },
            {
              type: 'input',
              responseKey: 'national_code',
              name: 'national_code',
              label: 'کدملی',
              placeholder: 'وارد کنید',
              col: 'col-md-6'
            }
          ]
        },
        {
          title: 'مشخصات تحصیلی',
          inputs: [
            // TODO: Complete this part
            {
              type: 'select',
              responseKey: 'grade',
              name: 'grade',
              label: 'مقطع تحصیلی',
              placeholder: 'وارد کنید',
              optionLabel: 'label',
              optionValue: 'value',
              col: 'col-md-6',
              options: [
                {
                  label: 'هفتم',
                  value: { id: 1, name: 'هفتم', title: 'هفتم' }
                },
                {
                  label: 'هشتم',
                  value: { id: 1, name: 'هشتم', title: 'هشتم' }
                },
                { label: 'نهم', value: { id: 1, name: 'نهم', title: 'نهم' } },
                { label: 'دهم', value: { id: 1, name: 'دهم', title: 'دهم' } },
                {
                  label: 'یازدهم',
                  value: { id: 1, name: 'یازدهم', title: 'یازدهم' }
                }
              ]
            },
            // TODO: Complete this part
            {
              type: 'select',
              responseKey: 'major',
              name: 'major',
              label: 'رشته تحصیلی',
              placeholder: 'وارد کنید',
              optionLabel: 'label',
              optionValue: 'value',
              col: 'col-md-6',
              options: [
                {
                  label: 'ریاضی',
                  value: { id: 1, name: 'ریاضی', title: 'ریاضی' }
                },
                {
                  label: 'تجربی',
                  value: { id: 1, name: 'تجربی', title: 'تجربی' }
                },
                {
                  label: 'انسانی',
                  value: { id: 1, name: 'انسانی', title: 'انسانی' }
                },
                { label: 'هنر', value: { id: 1, name: 'هنر', title: 'هنر' } }
              ]
            }
          ]
        },
        {
          title: 'اطلاعات تماس',
          inputs: [
            {
              type: 'input',
              responseKey: 'postal_code',
              name: 'postal_code',
              label: 'کدپستی',
              placeholder: 'وارد کنید',
              col: 'col-md-6'
            },
            {
              type: 'input',
              responseKey: 'email',
              name: 'email',
              label: 'ایمیل',
              placeholder: 'وارد کنید',
              col: 'col-md-6'
            },
            {
              type: 'input',
              responseKey: 'address',
              name: 'address',
              label: 'آدرس محل سکونت',
              placeholder: 'وارد کنید',
              col: 'col-md-12'
            }
          ]
        },
        {
          title: 'ثبت رتبه کنکور',
          inputs: [
            // TODO: Complete this part
            {
              type: 'select',
              responseKey: 'konkoor_grade',
              name: 'konkoor_grade',
              label: 'رشته شما',
              placeholder: 'انتخاب کنید',
              optionLabel: 'label',
              optionValue: 'value',
              col: 'col-md-6',
              options: [
                {
                  label: 'ریاضی',
                  value: { id: 1, name: 'ریاضی', title: 'ریاضی' }
                },
                {
                  label: 'تجربی',
                  value: { id: 1, name: 'تجربی', title: 'تجربی' }
                },
                {
                  label: 'انسانی',
                  value: { id: 1, name: 'انسانی', title: 'انسانی' }
                },
                { label: 'هنر', value: { id: 1, name: 'هنر', title: 'هنر' } }
              ]
            },
            // TODO: Complete this part
            {
              type: 'select',
              responseKey: 'konkoor_quota',
              name: 'konkoor_quota',
              label: 'منطقه یا سهمیه',
              placeholder: 'انتخاب کنید',
              optionLabel: 'label',
              optionValue: 'value',
              col: 'col-md-6',
              options: [
                {
                  label: 'ریاضی',
                  value: { id: 1, name: 'ریاضی', title: 'ریاضی' }
                },
                {
                  label: 'تجربی',
                  value: { id: 1, name: 'تجربی', title: 'تجربی' }
                },
                {
                  label: 'انسانی',
                  value: { id: 1, name: 'انسانی', title: 'انسانی' }
                },
                { label: 'هنر', value: { id: 1, name: 'هنر', title: 'هنر' } }
              ]
            },
            {
              type: 'input',
              responseKey: 'konkoor_rank',
              name: 'konkoor_rank',
              label: 'رتبه شما در منطقه',
              placeholder: 'وارد کنید',
              col: 'col-md-6'
            },
            {
              type: 'input',
              responseKey: 'konkoor_tender_number',
              name: 'konkoor_tender_number',
              label: 'شماره داوطلبی شما',
              placeholder: 'وارد کنید',
              col: 'col-md-6'
            },
            {
              type: 'input',
              responseKey: 'konkoor_tender_number',
              name: 'konkoor_tender_number',
              label: 'شماره داوطلبی شما',
              placeholder: 'وارد کنید',
              col: 'col-md-6'
            },
            {
              type: 'file',
              name: 'konkoor_karname',
              label: 'آپلود فایل کارنامه',
              col: 'col-md-12'
            },
            {
              type: 'checkbox',
              name: 'konkoor_karname_permission',
              label: 'اجازه انتشار رتبه خود را در سایت میدهم'
            },
            {
              type: 'separator',
              size: '0',
              label: '۱۲۰۰ امتیاز دریافت می کنید',
              col: 'col-md-12'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.custom-card-title {
  padding-top: 20px;
  padding-left: 30px;
  font-size: 18px;
}

.outsideLabel {
  font-size: 16px;
}
</style>

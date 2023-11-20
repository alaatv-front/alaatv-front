<template>
  <!--  v-model:index-inputs="indexInputs"-->
  <entity-crud v-model:default-inputs="defaultInputs"
               v-model:index-inputs="indexInputs"
               v-bind="allProps">
    <template v-slot:entity-crud-table-cell="{inputData, showConfirmRemoveDialog}">
      <q-td :props="inputData.props">
        <template v-if="inputData.props.col.name === 'actions'">
          <q-btn round
                 flat
                 dense
                 size="md"
                 color="info"
                 icon="info"
                 :to="{name:'Admin.SMSAdmin.Edit', params: {id: inputData.props.row.id}}">
            <q-tooltip>
              اصلاح
            </q-tooltip>
          </q-btn>
          <q-btn round
                 flat
                 dense
                 size="md"
                 color="negative"
                 icon="delete"
                 class="q-ml-md"
                 @click="showConfirmRemoveDialog(inputData.props.row, 'id', getRemoveMessage(inputData.props.row))">
            <q-tooltip>
              حذف
            </q-tooltip>
          </q-btn>
        </template>
        <template v-else-if="inputData.props.col.name === 'description'">
          <div v-html="inputData.props.value" />
        </template>
        <template v-else>
          {{ inputData.props.value }}
        </template>
      </q-td>
    </template>
  </entity-crud>
</template>

<script>
import EntityCrud from 'src/components/EntityCrud.vue'
import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'SMSAdmin',
  components: {
    EntityCrud
  },
  data () {
    return {
      model: null,
      tags: [],
      expanded: true,
      allProps: {
        config: {
          // toDo : temp, 'Content' should be replaced with 'order'
          api: {
            show: APIGateway.sms.APIAdresses.smsAdmin.show.base,
            edit: APIGateway.sms.APIAdresses.smsAdmin.edit.base,
            create: APIGateway.sms.APIAdresses.smsAdmin.create.base,
            index: APIGateway.sms.APIAdresses.smsAdmin.index.base
          },
          title: {
            show: 'اطلاعات پیامک ها',
            edit: 'اطلاعات پیامک ها',
            create: 'ثبت پیامک جدید',
            index: 'لیست پیامک ها'
          },
          // toDo : temp, 'Content' should be replaced with 'order'
          showRouteName: 'Admin.SMSAdmin.Show',
          editRouteName: 'Admin.SMSAdmin.Edit',
          indexRouteName: 'Admin.SMSAdmin.Index',
          createRouteName: 'Admin.SMSAdmin.Create',
          tableKeys: {
            data: 'data',
            total: 'meta.total',
            currentPage: 'meta.current_page',
            perPage: 'meta.per_page',
            pageKey: 'productPage'
          },
          table: {
            columns: [
              {
                name: 'id',
                required: true,
                label: 'id',
                align: 'left',
                field: row => row.id
              },
              {
                name: 'photo',
                required: true,
                label: 'سامانه',
                align: 'left',
                field: row => row.photo
              },
              {
                name: 'first_name',
                required: true,
                label: 'پیام',
                align: 'left',
                field: row => row.first_name
              },
              {
                name: 'last_name',
                required: true,
                label: 'زمان',
                align: 'left',
                field: row => row.last_name
              },
              {
                name: 'phone_number',
                required: true,
                label: 'کاربر',
                align: 'left',
                field: row => row.mobile
              },
              {
                name: 'phone_number',
                required: true,
                label: 'شماره کاربر',
                align: 'left',
                field: row => row.mobile
              },
              {
                name: 'phone_number',
                required: true,
                label: 'شماره گیرنده ها',
                align: 'left',
                field: row => row.mobile
              },
              {
                name: 'national_code',
                required: true,
                label: 'مدیر',
                align: 'left',
                field: row => row.national_code
              },
              {
                name: 'phone_number',
                required: true,
                label: 'کد سامانه',
                align: 'left',
                field: row => row.mobile
              },
              {
                name: 'phone_number',
                required: true,
                label: 'وضعیت',
                align: 'left',
                field: row => row.mobile
              },
              {
                name: 'actions',
                required: true,
                label: '',
                align: 'left',
                field: ''
              }
            ],
            data: []
          }
        }
      },
      defaultInputs: [
        // no data available for this, therefore it's indexInputs
        { type: 'input', name: 'id', value: null, label: 'شماره مبدا', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'شماره مقصد', col: 'col-md-3' },
        { type: 'select', name: 'content_type_id', label: 'شماره سامانه', col: 'col-md-3', multiple: true, value: null, options: [{ label: 'تاریخ ایجاد اولیه', value: 0 }, { label: 'توضیحات مشتری', value: 8 }, { label: 'عملیات', value: 3 }] },
        { type: 'select', name: 'content_type_id', label: 'دریافت / ارسال', col: 'col-md-3', value: null, options: [{ label: 'دریافت', value: 0 }, { label: 'دریافت / ارسال', value: 8 }, { label: 'ارسال', value: 3 }] },
        { type: 'select', name: 'content_type_id', label: 'ارسال نوتیف / ارسال دسته ای', col: 'col-md-3', value: null, options: [{ label: 'ارسال نوتیف', value: 0 }, { label: 'ارسال نوتیف / ارسال دسته ای', value: 8 }, { label: 'ارسال دسته ای', value: 3 }] },
        { type: 'select', name: 'content_type_id', label: 'وضعیت بن', col: 'col-md-6', value: null, options: [{ label: 'تاریخ ایجاد اولیه', value: 0 }, { label: 'توضیحات مشتری', value: 8 }, { label: 'عملیات', value: 3 }] },
        { type: 'input', name: 'description', value: null, label: ' شماره موبایل', col: 'col-md-3' },
        { type: 'input', name: 'description', value: null, label: 'کد ملی', col: 'col-md-3' },
        { type: 'date', name: 'created_at_range', value: null, label: 'تاریخ پرداخت از', col: 'col-md-6' },
        { type: 'date', name: 'created_at_range', value: null, label: 'تا', col: 'col-md-6' },
        { type: 'select', name: 'content_type_id', label: 'انتخاب ستون های اصلی', col: 'col-md-6', multiple: true, value: null, options: [{ label: 'تاریخ ایجاد اولیه', value: 0 }, { label: 'توضیحات مشتری', value: 8 }, { label: 'عملیات', value: 3 }] }
      ],
      createInputs: [],
      editInputs: [],
      showInputs: [],
      indexInputs: [
        { type: 'input', name: 'id', value: null, label: 'شماره مبدا', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'شماره مقصد', col: 'col-md-3' },
        { type: 'select', name: 'content_type_id', label: 'شماره سامانه', col: 'col-md-3', multiple: true, value: null, options: [{ label: 'تاریخ ایجاد اولیه', value: 0 }, { label: 'توضیحات مشتری', value: 8 }, { label: 'عملیات', value: 3 }] },
        { type: 'select', name: 'content_type_id', label: 'دریافت / ارسال', col: 'col-md-3', value: null, options: [{ label: 'دریافت', value: 0 }, { label: 'دریافت / ارسال', value: 8 }, { label: 'ارسال', value: 3 }] },
        { type: 'select', name: 'content_type_id', label: 'ارسال نوتیف / ارسال دسته ای', col: 'col-md-3', value: null, options: [{ label: 'ارسال نوتیف', value: 0 }, { label: 'ارسال نوتیف / ارسال دسته ای', value: 8 }, { label: 'ارسال دسته ای', value: 3 }] },
        { type: 'select', name: 'content_type_id', label: 'وضعیت بن', col: 'col-md-6', value: null, options: [{ label: 'تاریخ ایجاد اولیه', value: 0 }, { label: 'توضیحات مشتری', value: 8 }, { label: 'عملیات', value: 3 }] },
        { type: 'input', name: 'description', value: null, label: ' شماره موبایل', col: 'col-md-3' },
        { type: 'input', name: 'description', value: null, label: 'کد ملی', col: 'col-md-3' },
        { type: 'date', name: 'created_at_range', value: null, label: 'تاریخ پرداخت از', col: 'col-md-6' },
        { type: 'date', name: 'created_at_range', value: null, label: 'تا', col: 'col-md-6' },
        { type: 'select', name: 'content_type_id', label: 'انتخاب ستون های اصلی', col: 'col-md-6', multiple: true, value: null, options: [{ label: 'تاریخ ایجاد اولیه', value: 0 }, { label: 'توضیحات مشتری', value: 8 }, { label: 'عملیات', value: 3 }] }
      ]
    }
  },
  watch: {
    // editInputs: {
    //   handler (newValue, oldValue) {
    //     console.log('inputs', newValue)
    //   },
    //   deep: true
    // }
  },
  created () {},
  methods: {
    // for index.vue
    getRemoveMessage (row) {
      const firstName = row.first_name
      const lastName = row.last_name
      return 'آیا از حذف ' + firstName + ' ' + lastName + ' اطمینان دارید؟'
    },
    createValue (val, done) {
      // Calling done(var) when new-value-mode is not set or "add", or done(var, "add") adds "var" content to the model
      // and it resets the input textbox to empty string
      // ----
      // Calling done(var) when new-value-mode is "add-unique", or done(var, "add-unique") adds "var" content to the model
      // only if is not already set
      // and it resets the input textbox to empty string
      // ----
      // Calling done(var) when new-value-mode is "toggle", or done(var, "toggle") toggles the model with "var" content
      // (adds to model if not already in the model, removes from model if already has it)
      // and it resets the input textbox to empty string
      // ----
      // If "var" content is undefined/null, then it doesn't tampers with the model
      // and only resets the input textbox to empty string

      if (val.length > 0) {
        if (!this.tags.includes(val)) {
          this.tags.push(val)
        }
        done(val, 'toggle')
      }
    }
  }
}
</script>

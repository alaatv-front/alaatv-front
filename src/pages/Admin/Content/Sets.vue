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
                 :to="{name:'Admin.Sets.Edit', params: {id: inputData.props.row.id}}">
            <q-tooltip>
              ویرایش
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
  name: 'Sets',
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
          api: APIGateway.set.APIAdresses.adminBase,
          title: {
            show: 'اطلاعات  دسته محتوا',
            edit: 'ویرایش  دسته محتوا',
            create: 'ایجاد دسته جدید',
            index: ' مدیریت دسته های محتوا'
          },
          showRouteName: 'Admin.Sets.Show',
          editRouteName: 'Admin.Sets.Edit',
          indexRouteName: 'Admin.Sets.Index',
          createRouteName: 'Admin.Sets.Create',
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
                label: '#',
                align: 'left',
                field: row => row.id
              },
              {
                name: 'mobile',
                required: true,
                label: 'تصویر',
                align: 'left',
                field: row => row.id
              },
              {
                name: 'national_code',
                required: true,
                label: 'نام',
                align: 'left',
                field: row => row.id
              },
              {
                name: 'phone_number',
                required: true,
                label: 'نام کوتاه',
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
                name: 'phone_number',
                required: true,
                label: 'نمایش',
                align: 'left',
                field: row => row.mobile
              },
              {
                name: 'actions',
                required: true,
                label: 'عملیات',
                align: 'left',
                field: ''
              }
            ],
            data: []
          }
        }
      },
      defaultInputs: [
        { type: 'input', name: 'name', value: null, label: 'نام', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'نام خانوادگی', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'شماره موبایل', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'کدملی', col: 'col-md-3' },
        { type: 'space', col: 'col-md-12' },
        { type: 'select', name: 'content_type_id', label: 'انتخاب ستون های اصلی', col: 'col-md-3', multiple: true, value: null, options: [{ label: 'تاریخ ایجاد اولیه', value: 0 }, { label: 'توضیحات مشتری', value: 8 }, { label: 'عملیات', value: 3 }] },
        { type: 'select', name: 'content_type_id', label: 'مرتب سازی بر اساس', col: 'col-md-3', value: null, options: [{ label: 'تاریخ ایجاد اولیه', value: 0 }, { label: 'توضیحات مشتری', value: 8 }, { label: 'عملیات', value: 3 }] },
        { type: 'optionGroupRadio', name: 'is_free', responseKey: 'data.is_free', label: '', col: 'col-md-3', options: [{ label: 'نزولی', value: 1 }, { label: 'صعودی', value: 0 }] },
        { type: 'select', name: 'content_type_id', label: 'انتخاب کپن', col: 'col-md-3', multiple: true, value: null, options: [{ label: 'تاریخ ایجاد اولیه', value: 0 }, { label: 'توضیحات مشتری', value: 8 }, { label: 'عملیات', value: 3 }] },
        { type: 'space', col: 'col-md-12' },
        { type: 'select', name: 'content_type_id', label: 'انتخاب محصول سفارش داده شده', col: 'col-md-4', multiple: true, value: null, options: [{ label: 'تاریخ ایجاد اولیه', value: 0 }, { label: 'توضیحات مشتری', value: 8 }, { label: 'عملیات', value: 3 }] },
        { type: 'select', name: 'content_type_id', label: 'انتخاب ویژگی افزوده', col: 'col-md-4', value: null, options: [{ label: 'تاریخ ایجاد اولیه', value: 0 }, { label: 'توضیحات مشتری', value: 8 }, { label: 'عملیات', value: 3 }] },
        { type: 'select', name: 'content_type_id', label: 'انتخاب محصول سفارش', col: 'col-md-4', value: null, options: [{ label: 'تاریخ ایجاد اولیه', value: 0 }, { label: 'توضیحات مشتری', value: 8 }, { label: 'عملیات', value: 3 }] },
        { type: 'space', col: 'col-md-12' },
        { type: 'select', name: 'content_type_id', label: 'وضعیت تراکنش', col: 'col-md-4', multiple: true, value: null, options: [{ label: 'تاریخ ایجاد اولیه', value: 0 }, { label: 'توضیحات مشتری', value: 8 }, { label: 'عملیات', value: 3 }] },
        { type: 'select', name: 'content_type_id', label: 'وضعیت تسویه', col: 'col-md-4', multiple: true, value: null, options: [{ label: 'تاریخ ایجاد اولیه', value: 0 }, { label: 'توضیحات مشتری', value: 8 }, { label: 'عملیات', value: 3 }] },
        { type: 'space', col: 'col-md-12' },
        { type: 'input', name: 'name', value: null, label: 'کد پستی', col: 'col-md-4' },
        { type: 'input', name: 'name', value: null, label: 'استان', col: 'col-md-4' },
        { type: 'input', name: 'name', value: null, label: 'شهر', col: 'col-md-4' },
        { type: 'input', name: 'name', value: null, label: 'آدرس', col: 'col-md-6' },
        { type: 'input', name: 'name', value: null, label: 'مدرسه', col: 'col-md-3' },
        { type: 'select', name: 'content_type_id', label: 'رشته ها', col: 'col-md-3', value: null, options: [{ label: 'تاریخ ایجاد اولیه', value: 0 }, { label: 'توضیحات مشتری', value: 8 }, { label: 'عملیات', value: 3 }] },
        { type: 'space', col: 'col-md-12' },
        { type: 'input', name: 'name', value: null, label: 'توضیحات مشتری', col: 'col-md-6' },
        { type: 'input', name: 'name', value: null, label: 'توضیحات مدیر', col: 'col-md-6' },
        { type: 'space', col: 'col-md-12' },
        { type: 'date', name: 'created_at_range', value: null, label: 'تاریخ ثبت اولیه از', col: 'col-md-6' },
        { type: 'date', name: 'created_at_range', value: null, label: 'تا', col: 'col-md-6' },
        { type: 'date', name: 'created_at_range', value: null, label: 'تاریخ اصلاح مدیریتی از', col: 'col-md-6' },
        { type: 'date', name: 'created_at_range', value: null, label: 'تا', col: 'col-md-6' },
        { type: 'date', name: 'created_at_range', value: null, label: 'تاریخ تاریخ نهایی از', col: 'col-md-6' },
        { type: 'date', name: 'created_at_range', value: null, label: 'تا', col: 'col-md-6' }
      ],
      createInputs: [],
      editInputs: [],
      showInputs: [],
      indexInputs: [
        { type: 'input', name: 'name', value: null, label: 'نام', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'نام کوتاه', col: 'col-md-3' },
        { type: 'select', name: 'content_type_id', label: 'فعال/غیر فعال', col: 'col-md-3', value: null, options: [{ label: 'محدود', value: 8 }, { label: 'نامحدود', value: 3 }] },
        { type: 'select', name: 'content_type_id', label: 'نمایش/عدم نمایش', col: 'col-md-3', value: null, options: [{ label: 'نمایش', value: 8 }, { label: 'عدم نمایش', value: 3 }] }
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

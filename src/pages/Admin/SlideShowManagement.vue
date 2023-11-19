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
                 :to="{name:'Admin.BlockManagement.Edit', params: {id: inputData.props.row.id}}">
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
        <template v-else-if="inputData.props.col.name === 'links'">
          <q-btn round
                 flat
                 dense
                 size="md"
                 color="info"
                 icon="info"
                 :to="{name:'Admin.BlockManagement.Show', params: {id: inputData.props.row.id}}">
            <q-tooltip>
              مشاهده
            </q-tooltip>
          </q-btn>
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
  name: 'SlideShowManagement',
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
          api: {
            show: APIGateway.slideShow.APIAdresses.slideShowManagement.show.base,
            edit: APIGateway.slideShow.APIAdresses.slideShowManagement.edit.base,
            create: APIGateway.slideShow.APIAdresses.slideShowManagement.create.base,
            index: APIGateway.slideShow.APIAdresses.slideShowManagement.index.base
          },
          title: {
            show: 'اطلاعات اسلایدشو ها',
            edit: 'ویرایش اطلاعات',
            create: 'ثبت اسلایدشو جدید',
            index: 'مدیریت اسلایدشو ها'
          },
          showRouteName: 'Admin.SlideShowManagement.Show',
          editRouteName: 'Admin.SlideShowManagement.Edit',
          indexRouteName: 'Admin.SlideShowManagement.Index',
          createRouteName: 'Admin.SlideShowManagement.Create',
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
                name: 'first_name',
                required: true,
                label: 'عنوان',
                align: 'left',
                field: row => row.first_name
              },
              {
                name: 'last_name',
                required: true,
                label: 'بلاک',
                align: 'left',
                field: row => row.last_name
              },
              {
                name: 'description',
                required: true,
                label: 'متن',
                align: 'left',
                field: row => row.mobile
              },
              {
                name: 'links',
                required: true,
                label: 'لینک',
                align: 'left',
                field: ''
              },
              {
                name: 'phone_number',
                required: true,
                label: 'در تب جدید',
                align: 'left',
                field: row => row.mobile
              },
              {
                name: 'phone_number',
                required: true,
                label: 'عکس',
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
                label: 'کارنامه',
                align: 'left',
                field: ''
              }
            ],
            data: []
          }
        }
      },
      defaultInputs: [
        { type: 'input', name: 'id', value: null, label: 'تیتر اسلاید', col: 'col-md-3' },
        { type: 'input', name: 'id', value: null, label: 'متن اسلاید', col: 'col-md-3' },
        { type: 'input', name: 'id', value: null, label: 'لینک اسلاید', col: 'col-md-3' },
        { type: 'select', name: 'content_type_id', label: 'بلاک ها', col: 'col-md-3', multiple: true, value: null, options: [{ label: 'تاریخ ایجاد اولیه', value: 0 }, { label: 'توضیحات مشتری', value: 8 }, { label: 'عملیات', value: 3 }] },
        { type: 'input', name: 'id', value: null, label: 'ترتیب', col: 'col-md-3' },
        { type: 'file', name: 'photo', label: 'عکس اسلاید', responseKey: 'data.photo', size: '250px', col: 'col-md-3' },
        { type: 'checkbox', name: 'id', value: false, label: 'در تب جدید باز شود', col: 'col-md-3' },
        { type: 'space', col: 'col-12' },
        { type: 'input', name: 'id', value: null, label: 'عرض عکس', col: 'col-md-3' },
        { type: 'input', name: 'id', value: null, label: 'ارتفاع عکس', col: 'col-md-3' },
        { type: 'space', col: 'col-12' },
        { type: 'date', name: 'created_at_range', value: null, label: 'معتبر از', col: 'col-md-3' },
        { type: 'date', name: 'created_at_range', value: null, label: 'تا', col: 'col-md-3' },
        { type: 'input', name: 'id', value: null, label: 'توجه! تاریخ های درست در کادرهای بالا نمایش داده شده اند. اگر قصد تغییر یا ثبت تاریخ ها را دارید، از بخش زیر استفاده کنید', col: 'col-12' },
        { type: 'date', name: 'created_at_range', value: null, label: 'از تاریخ', col: 'col-md-3' },
        { type: 'date', name: 'created_at_range', value: null, label: 'تا تاریخ', col: 'col-md-3' }
      ],
      createInputs: [],
      editInputs: [],
      showInputs: [],
      indexInputs: [
        { type: 'input', name: 'id', value: null, label: 'عنوان', col: 'col-md-3' },
        { type: 'select', name: 'content_type_id', label: 'بلاک ها', col: 'col-md-3', multiple: true, value: null, options: [{ label: 'تاریخ ایجاد اولیه', value: 0 }, { label: 'توضیحات مشتری', value: 8 }, { label: 'عملیات', value: 3 }] }
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

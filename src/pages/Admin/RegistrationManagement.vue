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
  name: 'RegistrationManagement',
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
            show: APIGateway.block.APIAdresses.blockManagement.show.base,
            edit: APIGateway.block.APIAdresses.blockManagement.edit.base,
            create: APIGateway.block.APIAdresses.blockManagement.create.base,
            index: APIGateway.block.APIAdresses.blockManagement.index.base
          },
          title: {
            show: 'اطلاعات لیست ها',
            edit: 'ویرایش لیست ها',
            create: 'ثبت لیست جدید',
            index: 'مدیریت لیست ها'
          },
          showRouteName: 'Admin.RegistrationManagement.Show',
          editRouteName: 'Admin.RegistrationManagement.Edit',
          indexRouteName: 'Admin.RegistrationManagement.Index',
          createRouteName: 'Admin.RegistrationManagement.Create',
          tableKeys: {
            data: 'data',
            total: 'meta.total',
            currentPage: 'meta.current_page',
            perPage: 'meta.per_page',
            pageKey: 'productPage'
          },
          table: {
            columns: [
              // {
              //   name: 'id',
              //   required: true,
              //   label: 'id',
              //   align: 'left',
              //   field: row => row.id
              // },
              {
                name: 'first_name',
                required: true,
                label: 'نام',
                align: 'left',
                field: row => row.first_name
              },
              {
                name: 'last_name',
                required: true,
                label: 'نام خانوادگی',
                align: 'left',
                field: row => row.last_name
              },
              {
                name: 'phone_number',
                required: true,
                label: 'شماره همراه',
                align: 'left',
                field: row => row.mobile
              },
              {
                name: 'phone_number',
                required: true,
                label: 'رشته',
                align: 'left',
                field: row => row.mobile
              },
              {
                name: 'phone_number',
                required: true,
                label: 'ترتیب',
                align: 'left',
                field: row => row.mobile
              },
              {
                name: 'phone_number',
                required: true,
                label: 'منطقه',
                align: 'left',
                field: row => row.mobile
              },
              {
                name: 'phone_number',
                required: true,
                label: 'رتبه',
                align: 'left',
                field: row => row.mobile
              },
              {
                name: 'phone_number',
                required: true,
                label: 'توضیحات',
                align: 'left',
                field: row => row.mobile
              },
              {
                name: 'phone_number',
                required: true,
                label: 'اجازه انتشار',
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
        // Todo : entity-crud needs new features for other panels of this
        { type: 'select', name: 'content_type_id', label: 'نام کالایی که از خرید آن بن دریافت کرده است', col: 'col-md-6', multiple: true, value: null, options: [{ label: 'تاریخ ایجاد اولیه', value: 0 }, { label: 'توضیحات مشتری', value: 8 }, { label: 'عملیات', value: 3 }] },
        { type: 'select', name: 'content_type_id', label: 'وضعیت بن', col: 'col-md-6', value: null, options: [{ label: 'تاریخ ایجاد اولیه', value: 0 }, { label: 'توضیحات مشتری', value: 8 }, { label: 'عملیات', value: 3 }] },
        { type: 'input', name: 'id', value: null, label: 'نام', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'نام خانوادگی', col: 'col-md-3' },
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
        { type: 'select', name: 'content_type_id', label: 'سال کنکور', col: 'col-md-3', value: null, options: [{ label: 'فعال / غیر فعال', value: 0 }, { label: 'فعال', value: 8 }, { label: 'غیر فعال', value: 3 }] }
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

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
                 :to="{name:'Admin.Tags.Edit', params: {id: inputData.props.row.id}}">
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
  name: 'Tags',
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
            show: APIGateway.tag.APIAdresses.show.base,
            edit: APIGateway.tag.APIAdresses.edit.base,
            create: APIGateway.tag.APIAdresses.create.base,
            index: APIGateway.tag.APIAdresses.index.base
          },
          title: {
            show: 'اطلاعات تگ ها',
            edit: 'اطلاعات تگ ها',
            create: 'ثبت تگ جدید',
            index: 'لیست تگ ها'
          },
          showRouteName: 'Admin.Tags.Show',
          editRouteName: 'Admin.Tags.Edit',
          indexRouteName: 'Admin.Tags.Index',
          createRouteName: 'Admin.Tags.Create',
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
                label: 'نام نمایشی',
                align: 'left',
                field: row => row.first_name
              },
              {
                name: 'phone_number',
                required: true,
                label: 'مقدار تگ',
                align: 'left',
                field: row => row.mobile
              },
              {
                name: 'phone_number',
                required: true,
                label: 'گروه',
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
                label: 'توضیحات',
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
        { type: 'input', name: 'name', value: null, label: 'نام نمایشی', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'مقدار تگ', col: 'col-md-3' },
        { type: 'space', col: 'col-md-12' },
        { type: 'select', name: 'content_type_id', label: 'گروه تگ', col: 'col-md-3', value: null, options: [{ label: 'تاریخ ایجاد اولیه', value: 0 }, { label: 'توضیحات مشتری', value: 8 }, { label: 'عملیات', value: 3 }] },
        { type: 'optionGroupRadio', name: 'enable', options: [{ label: 'غیرفعال', value: 0 }, { label: 'فعال', value: 1 }], responseKey: 'data.enable', label: 'وضعیت', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'توضیحات', col: 'col-md-3' }
      ],
      createInputs: [],
      editInputs: [],
      showInputs: [],
      indexInputs: [
        { type: 'input', name: 'name', value: null, label: 'نام نمایشی', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'مقدار تگ', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'گروه', col: 'col-md-3' },
        { type: 'select', name: 'content_type_id', label: 'وضعیت', col: 'col-md-3', multiple: true, value: null, options: [{ label: 'فعال', value: 8 }, { label: 'غیر فعال', value: 3 }] }
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

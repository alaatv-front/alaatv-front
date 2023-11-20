<template>
  <!--  v-model:index-inputs="indexInputs"-->
  <entity-crud v-model:default-inputs="defaultInputs"
               v-model:create-inputs="createInputs"
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
                 :to="{name:'Admin.Gateway.Edit', params: {id: inputData.props.row.id}}">
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
  name: 'Gateway',
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
            show: APIGateway.gateway.APIAdresses.gateway.show.base,
            edit: APIGateway.gateway.APIAdresses.gateway.edit.base,
            create: APIGateway.gateway.APIAdresses.gateway.create.base,
            index: APIGateway.gateway.APIAdresses.gateway.index.base
          },
          title: {
            show: 'اطلاعات درگاه ها',
            edit: 'ویرایش درگاه ها',
            create: 'ثبت درگاه جدید',
            index: 'مدیریت درگاه ها'
          },
          showRouteName: 'Admin.Gateway.Show',
          editRouteName: 'Admin.Gateway.Edit',
          indexRouteName: 'Admin.Gateway.Index',
          createRouteName: 'Admin.Gateway.Create',
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
        { type: 'input', name: 'id', value: null, label: 'نشانی', col: 'col-md-3' },
        { type: 'select', name: 'content_type_id', label: 'وضعیت', col: 'col-md-3', value: null, options: [{ label: 'غیر فعال', value: 8 }, { label: 'فعال', value: 3 }] }
      ],
      createInputs: [
        { type: 'input', name: 'id', value: null, label: 'نام', col: 'col-md-3' },
        { type: 'input', name: 'id', value: null, label: 'نام نمایشی', col: 'col-md-3' },
        { type: 'input', name: 'id', value: null, label: 'نشانی', col: 'col-md-3' },
        { type: 'select', name: 'content_type_id', label: 'وضعیت', col: 'col-md-3', value: null, options: [{ label: 'غیر فعال', value: 8 }, { label: 'فعال', value: 3 }] }
      ],
      editInputs: [],
      showInputs: [],
      indexInputs: []
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

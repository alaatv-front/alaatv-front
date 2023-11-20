<template>
  <!--  v-model:index-inputs="indexInputs"-->
  <entity-crud v-model:default-inputs="defaultInputs"
               v-model:index-inputs="indexInputs"
               v-bind="allProps">
    <template v-slot:before-entity-create>
      <q-select v-model="model"
                use-input
                use-chips
                multiple
                input-debounce="0"
                :options="tags"
                @new-value="createValue" />
    </template>
    <template v-slot:entity-crud-table-cell="{inputData, showConfirmRemoveDialog}">
      <q-td :props="inputData.props">
        <template v-if="inputData.props.col.name === 'actions'">
          <q-btn round
                 flat
                 dense
                 size="md"
                 color="info"
                 icon="info"
                 :to="{name:'Admin.LiveDescription.Edit', params: {id: inputData.props.row.id}}">
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
  name: 'LiveDescription',
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
            show: APIGateway.liveDescription.APIAdresses.show,
            edit: APIGateway.liveDescription.APIAdresses.edit,
            create: APIGateway.liveDescription.APIAdresses.create,
            index: APIGateway.liveDescription.APIAdresses.index
          },
          title: {
            show: 'اطلاعات  خبر ها',
            edit: 'اطلاعات  خبر ها',
            create: 'ایجاد خبر جدید',
            index: 'لیست  خبر ها'
          },
          showRouteName: 'Admin.LiveDescription.Show',
          editRouteName: 'Admin.LiveDescription.Edit',
          indexRouteName: 'Admin.LiveDescription.Index',
          createRouteName: 'Admin.LiveDescription.Create',
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
                name: 'mobile',
                required: true,
                label: 'عنوان',
                align: 'left',
                field: row => row.id
              },
              {
                name: 'national_code',
                required: true,
                label: 'متن خبر',
                align: 'left',
                field: row => row.id
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
        { type: 'input', name: 'name', value: null, label: 'عنوان', col: 'col-md-3' },
        { type: 'input-editor', name: 'short_description', responseKey: 'data.description.short', label: 'توضیحات', col: 'col-md-12' },
        { type: 'select', name: 'content_type_id', label: 'محصولات', col: 'col-md-3', value: null, options: [{ label: 'ادبیات', value: 8 }, { label: 'عربی', value: 3 }] },
        { type: 'select', name: 'content_type_id', label: 'دسته', col: 'col-md-3', value: null, options: [{ label: 'محدود', value: 8 }, { label: 'نامحدود', value: 3 }] },
        { type: 'checkbox', name: 'id', value: false, label: 'پین نشده', col: 'col-md-3' }
      ],
      createInputs: [],
      editInputs: [],
      showInputs: [],
      indexInputs: [
        { type: 'select', name: 'content_type_id', label: 'فیلتر بر اساس', col: 'col-md-3', value: null, options: [{ label: 'جدید ترین ها', value: 8 }, { label: 'پر بازدید ترین ها', value: 3 }, { label: 'قدیمی ترین ها', value: 4 }] },
        { type: 'select', name: 'content_type_id', label: 'محصولات', col: 'col-md-3', value: null, options: [{ label: 'ادبیات', value: 8 }, { label: 'عربی', value: 3 }] },
        { type: 'select', name: 'content_type_id', label: 'دسته بندی', col: 'col-md-3', value: null, options: [{ label: 'محدود', value: 8 }, { label: 'نامحدود', value: 3 }] }
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

<template>
  <div>
    <q-select
      v-model="model"
      use-input
      use-chips
      multiple
      input-debounce="0"
      @new-value="createValue"
      :options="tags"
    />
    <entity-index
      v-model:value="inputs"
      title="لیست محتوا"
      :api="api"
      :table="table"
      :table-keys="tableKeys"
      :create-route-name="'Admin.Content.Create'"
    >
      <template v-slot:table-cell="{inputData, showConfirmRemoveDialog}">
        <q-td :props="inputData.props">
          <template v-if="inputData.props.col.name === 'actions'">
            <q-btn round flat dense size="md" color="info" icon="info" :to="{name:'Admin.Content.Show', params: {id: inputData.props.row.id}}">
              <q-tooltip>
                مشاهده
              </q-tooltip>
            </q-btn>
            <q-btn round flat dense size="md" color="negative" icon="delete" class="q-ml-md"
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
    </entity-index>
  </div>
</template>

<script>
import { EntityIndex } from 'quasar-crud'

export default {
  name: 'Index',
  components: { EntityIndex },
  data () {
    return {
      model: null,
      tags: [],
      expanded: true,
      api: '/alaa/api/v2/admin/c',
      tableKeys: {
        data: 'data',
        total: 'meta.total',
        currentPage: 'meta.current_page',
        perPage: 'meta.per_page',
        pageKey: 'contentPage'
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
            name: 'name',
            required: true,
            label: 'عنوان',
            align: 'left',
            field: row => row.name
          },
          {
            name: 'type',
            required: true,
            label: 'نوع',
            align: 'left',
            field: row => (row.content_type.name === 'video') ? 'ویدئو' : 'جزوه'
          },
          {
            name: 'enable',
            required: true,
            label: 'فعال',
            align: 'left',
            field: row => (row.enable) ? 'فعال' : 'غیرفعال'
          },
          {
            name: 'is_free',
            required: true,
            label: 'قیمت گذاری',
            align: 'left',
            field: row => (row.is_free) ? 'رایگان' : 'پولی'
          },
          {
            name: 'description',
            required: true,
            label: 'توضیحات',
            align: 'left',
            field: row => row.description
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
      },
      inputs: [
        { type: 'input', name: 'id', value: null, label: 'شناسه', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'نام', col: 'col-md-3' },
        { type: 'input', name: 'description', value: null, label: 'توضیحات', col: 'col-md-3' },
        { type: 'select', name: 'content_type_id', value: null, options: [{ label: 'جزوه', value: 1 }, { label: 'ویدئو', value: 8 }], label: 'نوع محتوا', col: 'col-md-3' },
        { type: 'select', name: 'is_free', value: null, options: [{ label: 'رایگان', value: 1 }, { label: 'غیر رایگان', value: 0 }], label: 'وضعیت رایگان / غیر رایگان', col: 'col-md-3' },
        { type: 'select', name: 'enable', value: null, options: [{ label: 'فعال', value: 1 }, { label: 'غیرفعال', value: 0 }], label: 'وضعیت فعال / غیرفعال', col: 'col-md-3' },
        { type: 'select', name: 'display', value: null, options: [{ label: 'نمایش', value: 1 }, { label: 'عدم نمایش', value: 0 }], label: 'وضعیت نمایش / عدم نمایش', col: 'col-md-3' },
        { type: 'dateRange', name: 'created_at_range', value: [], label: 'بازه تاریخ ایجاد', col: 'col-md-4' }
      ]
    }
  },
  methods: {
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
    },
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.name + ' اطمینان دارید؟'
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
    <entity-index
      v-model:value="inputs"
      title="لیست تراکنش ها"
      :api="api"
      :table="table"
      :table-keys="tableKeys"
      :create-route-name="'Admin.User.Create'"
    >
      <template v-slot:table-cell="{inputData, showConfirmRemoveDialog}">
        <q-td :props="inputData.props">
          <template v-if="inputData.props.col.name === 'photo'">
            <q-img
              :src="inputData.props.value"
              placeholder-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="
              spinner-color="white"
              style="height: 50px; max-width: 50px"
            />
          </template>
          <template v-else-if="inputData.props.col.name === 'actions'">
            <q-btn round flat dense size="md" color="info" icon="info" :to="{name:'Admin.Product.Show', params: {id: inputData.props.row.id}}">
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
      api: '/alaa/api/v2/admin/transaction',
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
            name: 'photo',
            required: true,
            label: 'تصویر',
            align: 'left',
            field: row => row.photo
          },
          {
            name: 'title',
            required: true,
            label: 'عنوان',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'product_type',
            required: true,
            label: 'نوع',
            align: 'left',
            field: row => {
              if (row.product_type) {
                return row.product_type.display_name
              } else {
                return ''
              }
            }
          },
          {
            name: 'attribute_set',
            required: true,
            label: 'دسته',
            align: 'left',
            field: row => {
              if (row.attribute_set) {
                return row.attribute_set.name
              } else {
                return ''
              }
            }
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
            label: 'فعال',
            align: 'left',
            field: row => (row.is_free) ? 'رایگان' : 'پولی'
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
      },
      inputs: [
        { type: 'input', name: 'id', value: null, label: 'شناسه', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'نام', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'نام خانوادگی', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'شماره موبایل', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'کدملی', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'استان', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'شهر', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'کد پستی', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'آدرس', col: 'col-md-9' },
        { type: 'input', name: 'name', value: null, label: 'مدرسه', col: 'col-md-3' },
        { type: 'date', name: 'created_at_range', value: null, label: 'تاریخ ثبت اولیه', col: 'col-md-4' },
        { type: 'date', name: 'created_at_range', value: null, label: 'تاریخ اصلاح مدیریتی', col: 'col-md-4' },
        { type: 'date', name: 'created_at_range', value: null, label: 'تاریخ نهایی', col: 'col-md-4' }
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
      const firstName = row.first_name
      const lastName = row.last_name
      return 'آیا از حذف ' + firstName + ' ' + lastName + ' اطمینان دارید؟'
    }
  }
}
</script>

<style scoped>

</style>

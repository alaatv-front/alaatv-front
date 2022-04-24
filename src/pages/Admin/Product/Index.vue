<template>
  <div>
    <entity-index
      v-model:value="inputs"
      title="لیست محصولات"
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
      api: '/alaa/api/v2/admin/product',
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
            field: row => row.product_type.display_name
          },
          {
            name: 'attribute_set',
            required: true,
            label: 'دسته',
            align: 'left',
            field: row => row.attribute_set.name
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
        { type: 'input', name: 'short_description', value: null, label: 'توضیحات کوتاه', col: 'col-md-3' },
        { type: 'input', name: 'long_description', value: null, label: 'توضیحات اجمالی', col: 'col-md-3' },
        { type: 'select', name: 'product_type_id', value: null, options: [{ label: 'ساده', value: 1 }, { label: 'قابل پیکربندی', value: 2 }, { label: 'قابل انتخاب', value: 3 }, { label: 'اشتراک', value: 4 }], label: 'نوع محصول', col: 'col-md-3' },
        { type: 'select', name: 'is_free', value: null, options: [{ label: 'رایگان', value: 1 }, { label: 'غیر رایگان', value: 0 }], label: 'وضعیت رایگان / غیر رایگان', col: 'col-md-3' },
        { type: 'select', name: 'enable', value: null, options: [{ label: 'فعال', value: 1 }, { label: 'غیرفعال', value: 0 }], label: 'وضعیت فعال / غیرفعال', col: 'col-md-3' },
        { type: 'select', name: 'display', value: null, options: [{ label: 'نمایش', value: 1 }, { label: 'عدم نمایش', value: 0 }], label: 'وضعیت نمایش / عدم نمایش', col: 'col-md-3' },
        { type: 'input', name: 'name', value: null, label: 'نام', col: 'col-md-4' },
        { type: 'input', name: 'attribute_set_id', value: null, label: 'کد دسته', col: 'col-md-4' },
        { type: 'dateRange', name: 'created_at_range', value: [], label: 'بازه تاریخ ایجاد', col: 'col-md-4' }
      ]
    }
  },
  methods: {
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

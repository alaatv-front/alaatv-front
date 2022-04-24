<template>
  <div>
    <entity-index
      v-model:value="inputs"
      title="لیست کاربران"
      :api="api"
      :table="table"
      :table-keys="tableKeys"
      :create-route-name="'Admin.User.Create'"
    >
      <template v-slot:table-cell="{inputData, showConfirmRemoveDialog}">
        <q-td :props="inputData.props">
          <template v-if="inputData.props.col.name === 'photo'">
            <q-avatar>
              <q-img
                :src="inputData.props.value"
                placeholder-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="
                spinner-color="white"
                style="height: 50px; max-width: 50px"
              />
            </q-avatar>
          </template>
          <template v-else-if="inputData.props.col.name === 'actions'">
            <q-btn round flat dense size="md" color="info" icon="info" :to="{name:'Admin.User.Show', params: {id: inputData.props.row.id}}">
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
      expanded: true,
      // api: '/alaa/api/v2/admin/user',
      api: '/alaa/api/v2/admin/user',
      tableKeys: {
        data: 'data',
        total: 'total',
        currentPage: 'page',
        perPage: 'per_page',
        pageKey: 'page'
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
            label: 'تصویر',
            align: 'left',
            field: row => row.photo
          },
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
            name: 'national_code',
            required: true,
            label: 'کد ملی',
            align: 'left',
            field: row => row.national_code
          },
          {
            name: 'email',
            required: true,
            label: 'ایمیل',
            align: 'left',
            field: row => row.email
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
        { type: 'input', name: 'name', value: null, label: 'کدملی', col: 'col-md-3' },
        { type: 'select', name: 'gender', value: null, options: ['پسر', 'دختر'], label: 'جنسیت', col: 'col-md-4' },
        { type: 'select', name: 'status', value: null, options: ['فعال', 'غیر فعال'], label: 'وضعیت', col: 'col-md-4' },
        { type: 'dateRange', name: 'created_at_range', value: [], label: 'بازه تاریخ عضویت', col: 'col-md-4' }
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

<template>
  <!--  Todo : user.vue is also a demo for entity-crud; please do not delete unnecessary stuff -->
  <entity-crud v-model:edit-inputs="editInputs"
               v-model:index-inputs="indexInputs"
               v-model:show-inputs="showInputs"
               v-model:create-inputs="createInputs"
               v-model:default-inputs="defaultInputs"
               :before-get-edit-data="testMethod1"
               :before-load-edit-input-data="testMethod2"
               :after-load-edit-input-data="testMethod3"
               v-bind="allProps">
    <template v-slot:entity-crud-table-cell="{inputData, showConfirmRemoveDialog}">
      <q-td :props="inputData.props">
        <template v-if="inputData.props.col.name === 'photo'">
          <q-avatar>
            <q-img :src="inputData.props.value"
                   placeholder-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="
                   spinner-color="white"
                   style="height: 50px; max-width: 50px" />
          </q-avatar>
        </template>
        <template v-else-if="inputData.props.col.name === 'actions'">
          <q-btn round
                 flat
                 dense
                 size="md"
                 color="info"
                 icon="info"
                 :to="{name:'Admin.User.Show', params: {id: inputData.props.row.id}}">
            <q-tooltip>
              مشاهده
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
  name: 'User',
  components: {
    EntityCrud
  },
  data () {
    return {
      allProps: {
        config: {
          api: APIGateway.user.APIAdresses.admin.show.base,
          // or
          // api: {
          //   show: API_ADDRESS.users.show.base,
          //   edit: API_ADDRESS.users.edit.base,
          //   create: API_ADDRESS.users.create.base,
          //   index: API_ADDRESS.users.index.base
          // },
          title: {
            show: 'اطلاعات کاربر',
            edit: 'اطلاعات کاربر',
            create: 'ثبت کاربر جدید',
            index: 'لیست کاربران'
          },
          // or
          // title: 'اطلاعات کاربر',
          showRouteName: 'Admin.OldUser.Show',
          editRouteName: 'Admin.OldUser.Edit',
          indexRouteName: 'Admin.OldUser.Index',
          createRouteName: 'Admin.OldUser.Create',
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
          }
        }
      },
      defaultInputs: [
        { type: 'file', name: 'photo', responseKey: 'data.photo', size: '250px', col: 'col-md-3' },
        { type: 'space', col: 'col-md-12' },
        { type: 'input', name: 'id', responseKey: 'data.id', value: 'null', label: 'شناسه', col: 'col-md-3', disable: true },
        { type: 'input', name: 'first_name', responseKey: 'data.first_name', value: 'null', label: 'نام', col: 'col-md-3' },
        { type: 'input', name: 'last_name', responseKey: 'data.last_name', value: 'null', label: 'نام خانوادگی', col: 'col-md-3' },
        { type: 'input', name: 'national_code', responseKey: 'data.national_code', value: 'null', label: 'کد ملی', col: 'col-md-3' },
        { type: 'input', name: 'email', responseKey: 'data.email', value: 'null', label: 'ایمیل', col: 'col-md-3' },
        { type: 'input', name: 'mobile', responseKey: 'data.mobile', value: 'null', label: 'شماره همراه', col: 'col-md-3' },
        { type: 'input', name: 'address', responseKey: 'data.address', value: 'null', label: 'آدرس', col: 'col-md-3' },
        { type: 'input', name: 'postal_code', responseKey: 'data.postal_code', value: 'null', label: 'کد پستی', col: 'col-md-3' }
      ],
      createInputs: [],
      editInputs: [],
      showInputs: [],
      indexInputs: [
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
    testMethod () {},
    testMethod1 () {},
    testMethod2 () {},
    testMethod3 () {}
  }
}
</script>

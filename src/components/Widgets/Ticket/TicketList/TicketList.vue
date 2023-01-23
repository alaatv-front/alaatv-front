<template>
  <div class="ticket-index">
    <entity-index v-model:value="inputs"
                  title="لیست تیکت ها"
                  :api="api"
                  :table="table"
                  :table-keys="tableKeys"
                  :create-route-name="options.createRouteName"
                  @onPageChanged="filterInputs">
      <template v-slot:before-index-table>
        <p class="q-ma-lg">
          تعداد کل یافته ها: {{ totalTickets}}
        </p>
      </template>
      <template v-slot:table-cell="{inputData, showConfirmRemoveDialog}">
        <q-td :props="inputData.props">
          <template v-if="inputData.props.col.name === 'status'">
            <div v-if="inputData.props.expand">
              <q-select v-model="inputData.props.row.status"
                        outlined
                        dense
                        :options="ticketStatuses"
                        option-label="title" />
            </div>
            <template v-else>
              <q-chip :color="checkStatusColor(inputData.props.row.status.id)"
                      :style="{color: '#FFF', height: '26px'}">
                {{ inputData.props.row.status.title }}
              </q-chip>
            </template>
          </template>
          <template v-if="inputData.props.col.name === 'title'">
            <div class="title-class ellipsis">
              {{inputData.props.row.title}}
            </div>
          </template>
          <template v-if="inputData.props.col.name === 'score'">
            <q-img :src="rateImg(inputData.props.row.rate)"
                   class="rate-img" />
          </template>
          <template v-if="inputData.props.col.name === 'department'">
            <q-select v-if="inputData.props.expand"
                      v-model="inputData.props.row.department"
                      outlined
                      dense
                      :options="departmentList.list"
                      option-label="title" />
            <p v-else>{{inputData.props.row.department.title}}</p>

          </template>
          <template v-if="inputData.props.col.name === 'actions'">
            <div v-if="inputData.props.expand">
              <q-btn round
                     flat
                     dense
                     color="green"
                     icon="check"
                     :loading="loading"
                     class="q-mr-md"
                     @click="updateTicket(inputData.props)" />
              <q-btn round
                     flat
                     dense
                     color="red"

                     icon="close"
                     @click="inputData.props.expand = false" />

            </div>
            <template v-else>
              <q-btn round
                     flat
                     dense
                     size="md"
                     color="info"
                     icon="info"
                     :to="{name:options.showRouteName, params: {id: inputData.props.row.id}}">
                <q-tooltip>
                  مشاهده
                </q-tooltip>
              </q-btn>
              <q-btn round
                     flat
                     dense
                     size="md"
                     color="amber-14"
                     icon="edit"
                     class="q-ml-xs"
                     @click="setEditMode(inputData.props)">
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
                     :loading="loading"
                     class="q-ml-md"
                     @click="showConfirmRemoveDialog(inputData.props.row, 'id', 'آیا از حذف تیکت اطمینان دارید ؟')">
                <q-tooltip>
                  حذف
                </q-tooltip>
              </q-btn>
            </template>
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
import API_ADDRESS from 'src/api/Addresses.js'
import { mixinTicket, mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'TicketList',
  components: { EntityIndex },
  mixins: [mixinTicket, mixinWidget],
  props: {
    options: {
      type: Object,
      default() {
        return {
          showRouteName: '',
          createRouteName: ''
        }
      }
    }
  },
  data () {
    return {
      totalTickets: 0,
      api: API_ADDRESS.ticket.index.base,
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
            name: 'first_name',
            required: true,
            label: 'نام',
            align: 'left',
            field: row => row.user.first_name
          },
          {
            name: 'last_name',
            required: true,
            label: 'نام خانوادگی',
            align: 'left',
            field: row => row.user.last_name
          },
          {
            name: 'title',
            required: true,
            label: 'عنوان',
            align: 'left',
            field: ''
          },
          {
            name: 'status',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: ''
          },
          {
            name: 'created_at',
            required: true,
            label: 'تاریخ ایجاد',
            align: 'left',
            field: row => row.created_at
          },
          {
            name: 'updated_at',
            required: true,
            label: 'آخرین بروزرسانی',
            align: 'left',
            field: row => row.updated_at
          },
          {
            name: 'department',
            required: true,
            label: 'گروه',
            align: 'left',
            field: ''
          },
          {
            name: 'answerd_by',
            required: true,
            label: 'اخرین پاسخگو',
            align: 'left',
            field: ''
          },
          {
            name: 'priority',
            required: true,
            label: 'اولویت',
            align: 'left',
            field: row => row.priority.title
          },
          {
            name: 'score',
            required: true,
            label: 'امتیاز',
            align: 'left',
            field: ''
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
        { type: 'input', name: 'has_user_mobile', label: 'شماره همراه', col: 'col-md-3' },
        { type: 'input', name: 'has_user_nationalcode', label: 'کد ملی', col: 'col-md-3' },
        { type: 'input', name: 'has_user_firstname', label: 'نام', col: 'col-md-3' },
        { type: 'input', name: 'has_user_lastname', label: 'نام خانوادگی', col: 'col-md-3' },
        { type: 'select', options: [], name: 'department_id', optionLabel: 'title', label: 'گروه', col: 'col-md-3' },
        { type: 'select', options: [], name: 'pirority_id', label: 'اولویت', col: 'col-md-3' },
        { type: 'select', options: [], name: 'status_id', label: 'وضعیت', optionLabel: 'title', col: 'col-md-3' },
        { type: 'input', name: 'order_id', label: 'شماره سفارش', col: 'col-md-3' },
        { type: 'input', name: 'id', label: 'شماره تیکت', col: 'col-md-3' },
        { type: 'input', name: 'title', label: 'عنوان', col: 'col-md-3' },
        { type: 'date', name: 'created_at_since', responseKey: 'data.from', label: 'از:', col: 'col-md-3' },
        { type: 'date', name: 'created_at_till', label: 'تا:', col: 'col-md-3' },
        { type: 'date', name: 'hasMessageFromDate', label: 'تاریخ پاسخ اپراتور از:', col: 'col-md-6' },
        { type: 'date', name: 'hasMessageToDate', label: 'تاریخ پاسخ اپراتور تا:', col: 'col-md-6' },
        {
          type: 'entity',
          name: 'hasAssignees',
          selectionMode: 'multiple',
          label: 'مسؤل',
          buttonColor: 'primary',
          buttonTextColor: 'white',
          buttonBadgeColor: 'secondary',
          indexConfig: {
            apiAddress: 'https://reqres.in/api/users',
            tableTitle: 'لیست مسؤلین',
            showTableItemsRouteName: 'Admin.BlockManagement.Show',
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
                  label: '#',
                  align: 'left',
                  field: row => row.id
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
                  name: 'role',
                  required: true,
                  label: 'نقش',
                  align: 'left',
                  field: row => row.email
                }
              ],
              data: []
            },
            inputs: [
              { type: 'input', name: 'id', value: null, label: 'شناسه', col: 'col-md-3' },
              { type: 'input', name: 'first_name', value: null, label: 'نام', col: 'col-md-3' },
              { type: 'input', name: 'last_name', value: null, label: 'نام خانوادگی', col: 'col-md-3' },
              { type: 'hidden', name: 'role', value: 123, label: 'نقش', col: 'col-md-3' }
            ],
            itemIdentifyKey: 'id',
            itemIndicatorKey: 'first_name'
          },
          value: [],
          responseKey: '',
          selected: [],
          col: 'col-md-3'
        },
        {
          type: 'entity',
          name: 'ticketMessage',
          selectionMode: 'single',
          label: 'پاسخگو',
          buttonColor: 'primary',
          buttonTextColor: 'white',
          buttonBadgeColor: 'secondary',
          indexConfig: {
            apiAddress: 'https://reqres.in/api/users',
            tableTitle: 'لیست مسؤلین',
            showTableItemsRouteName: 'Admin.BlockManagement.Show',
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
                  label: '#',
                  align: 'left',
                  field: row => row.id
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
                  name: 'role',
                  required: true,
                  label: 'نقش',
                  align: 'left',
                  field: row => row.email
                }
              ],
              data: []
            },
            inputs: [
              { type: 'input', name: 'id', value: null, label: 'شناسه', col: 'col-md-3' },
              { type: 'input', name: 'first_name', value: null, label: 'نام', col: 'col-md-3' },
              { type: 'input', name: 'last_name', value: null, label: 'نام خانوادگی', col: 'col-md-3' },
              { type: 'hidden', name: 'role', value: 123, label: 'نقش', col: 'col-md-3' }
            ],
            itemIdentifyKey: 'id',
            itemIndicatorKey: 'first_name'
          },
          value: [],
          responseKey: '',
          selected: [],
          col: 'col-md-3'
        },
        {
          type: 'entity',
          name: 'product',
          selectionMode: 'multiple',
          label: 'انتخاب محصول',
          buttonColor: 'primary',
          buttonTextColor: 'white',
          buttonBadgeColor: 'secondary',
          indexConfig: {
            apiAddress: API_ADDRESS.product.index.base,
            tableTitle: 'لیست محصولات',
            showTableItemsRouteName: 'Admin.Product.Show',
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
                  label: 'رایگان/ غیر رایگان',
                  align: 'left',
                  field: row => (row.is_free) ? 'رایگان' : 'پولی'
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
            ],
            itemIdentifyKey: 'id',
            itemIndicatorKey: 'name'
          },
          value: [],
          responseKey: '',
          selected: [],
          col: 'col-md-3'
        },
        { type: 'Checkbox', name: 'hasReported', value: 0, trueValue: 1, falseValue: 0, label: 'مشاهده موارد گزارش شده', col: 'col-md-3' }
      ]
    }
  },
  computed: {
    userCanFilterSupporter() {
      return true
    },
    userCanFilterAssignees() {
      return true
    },
    userSupporters() {
      // پاسخگو
      return []
    },
    userAssignees() {
      return []
    }
  },
  created() {
    this.setData()
  },
  methods: {
    filterInputs(res) {
      this.totalTickets = res.data?.meta?.total
      if (!this.userCanFilterSupporter) {
        this.inputs = this.inputs.filter(item => !((item.label === 'پاسخگو') || (item.name === 'hasMessageFromDate') || (item.name === 'hasMessageToDate')))
      }
      if (!this.userCanFilterAssignees) {
        this.inputs = this.inputs.filter(item => item.name !== 'hasAssignees')
      }
    },
    updateTicket(data) {
      const ticketId = data.row.id
      const payload = {
        department_id: data.row.department.id,
        status_id: data.row.status.id
      }
      this.updateTicketData(ticketId, payload)
    },
    setData() {
      this.getInput('department_id').options = this.departmentList.list
      this.getInput('pirority_id').options = this.ticketPriorityOption
      this.getInput('status_id').options = this.ticketStatuses
    },
    setEditMode(data) {
      data.expand = true
    },
    rateImg (id) {
      if (id) {
        return 'https://nodes.alaatv.com/upload/ticket-rate-' + id + '-on.png'
      }
      return null
    },
    checkStatusColor (id) {
      if (id === 1) {
        return 'red'
      } else if (id === 2) {
        return 'primary'
      } else if (id === 3) {
        return 'green'
      } else {
        return 'blue'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.ticket-index{
  padding:30px 70px;
  @media screen and (max-width: 1450px){
    padding: 10px;
  }
}
.title-class{
  max-width: 200px;
}
.rate-img {
  width: 30px;
  height: 30px
}
</style>

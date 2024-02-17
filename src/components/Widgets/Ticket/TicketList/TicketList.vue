<template>
  <div class="ticket-index">
    <div v-if="!isInAdminPage"
         class="lt-sm flex justify-end">
      <q-btn flat
             color="grey"
             icon="ph:stack"
             :to="{name: 'UserPanel.Dashboard'}" />
    </div>
    <div v-if="isEntityReady">
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
        <template v-slot:entity-index-table-cell="{inputData,showConfirmRemoveDialog}">
          <template v-if="inputData.col.name === 'status'">
            <div v-if="inputData.props.expand">
              <q-select v-model="inputData.props.row.status"
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
          <template v-if="inputData.col.name === 'title'">
            <div class="title-class ellipsis">
              {{inputData.props.row.title}}
            </div>
          </template>
          <template v-if="inputData.col.name === 'score'">
            <q-img :src="rateImg(inputData.props.row.rate)"
                   class="rate-img" />
          </template>
          <template v-if="inputData.col.name === 'department'">
            <q-select v-if="inputData.props.expand"
                      v-model="inputData.props.row.department"
                      :options="departmentList.list"
                      option-label="title" />
            <p v-else>{{inputData.props.row.department.title}}</p>

          </template>
          <template v-if="inputData.col.name === 'actions'">
            <div v-if="!isInAdminPage">
              <q-btn flat
                     square
                     size="md"
                     color="info"
                     icon="ph:info"
                     :to="{name:options.showRouteName, params: {id: inputData.props.row.id}}">
                <q-tooltip>
                  مشاهده
                </q-tooltip>
              </q-btn>
            </div>
            <div v-else>
              <div v-if="inputData.props.expand">
                <q-btn square
                       flat
                       color="green"
                       icon="check"
                       :loading="loading"
                       class="q-mr-md"
                       @click="updateTicket(inputData.props)" />
                <q-btn flat
                       square
                       color="red"
                       icon="close"
                       @click="inputData.props.expand = false" />

              </div>
              <template v-else>
                <q-btn flat
                       square
                       size="md"
                       color="grey"
                       icon="ph:info"
                       :to="{name:options.showRouteName, params: {id: inputData.props.row.id}}">
                  <q-tooltip>
                    مشاهده
                  </q-tooltip>
                </q-btn>
                <q-btn flat
                       square
                       size="md"
                       color="amber-14"
                       icon="ph:pencil-simple"
                       class="q-ml-xs"
                       @click="setEditMode(inputData.props)">
                  <q-tooltip>
                    ویرایش
                  </q-tooltip>
                </q-btn>
                <q-btn flat
                       square
                       size="md"
                       color="negative"
                       icon="ph:trash-simple"
                       :loading="loading"
                       class="q-ml-md"
                       @click="showConfirmRemoveDialog(inputData.props.row, 'id', 'آیا از حذف تیکت اطمینان دارید ؟')">
                  <q-tooltip>
                    حذف
                  </q-tooltip>
                </q-btn>
              </template>
            </div>
          </template>
          <template v-else>
            {{ inputData.col.value }}
          </template>
        </template>
      </entity-index>
    </div>
  </div>
</template>

<script>
import moment from 'moment-jalaali'
import { EntityIndex } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinTicket, mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'TicketList',
  components: { EntityIndex },
  mixins: [mixinTicket, mixinWidget],
  props: {
    options: {
      type: Object,
      default () {
        return {
          showRouteName: '',
          createRouteName: ''
        }
      }
    }
  },
  data () {
    return {
      isEntityReady: false,
      totalTickets: 0,
      api: APIGateway.ticket.APIAdresses.base,
      tableKeys: {
        data: 'data',
        total: 'meta.total',
        currentPage: 'meta.current_page',
        perPage: 'meta.per_page',
        pageKey: 'ticketPage'
      },
      userTable: {
        columns: [
          {
            name: 'id',
            required: true,
            label: 'شناسه',
            align: 'left',
            field: row => row.id
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
            field: row => this.getShamsiDate(row.created_at)
          },
          {
            name: 'updated_at',
            required: true,
            label: 'آخرین بروزرسانی',
            align: 'left',
            field: row => this.getShamsiDate(row.updated_at)
          },
          {
            name: 'priority',
            required: true,
            label: 'اولویت',
            align: 'left',
            field: row => row.priority.title
          },
          {
            name: 'actions',
            required: true,
            label: 'مشاهده',
            align: 'left',
            field: ''
          }
        ],
        data: []
      },
      adminTable: {
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
            label: 'عملیات',
            align: 'left',
            field: ''
          }
        ],
        data: []
      },
      userInputs: [
        { type: 'hidden', options: [], name: 'department_id' },
        { type: 'select', options: [], name: 'pirority_id', label: 'اولویت', optionLabel: 'title', col: 'col-md-4 col-sm-6 col-xs-12' },
        { type: 'select', options: [], name: 'status_id', multiple: true, label: 'وضعیت', optionLabel: 'title', optionValue: 'id', col: 'col-md-4 col-sm-6 col-xs-12' },
        { type: 'input', name: 'id', label: 'شماره تیکت', col: 'col-md-4 col-sm-6 col-xs-12' },
        { type: 'input', name: 'title', label: 'عنوان', col: 'col-md-4 col-sm-6 col-xs-12' },
        { type: 'date', name: 'created_at_since', calendarIcon: ' ', label: 'از تاریخ : ', responseKey: 'data.from', col: 'col-md-4 col-sm-6 col-xs-12' },
        { type: 'date', name: 'created_at_till', calendarIcon: ' ', label: 'تا تاریخ : ', col: 'col-md-4 col-sm-6 col-xs-12' }
      ],
      adminInputs: [
        { type: 'input', name: 'has_user_mobile', label: 'شماره همراه', col: 'col-md-3' },
        { type: 'input', name: 'has_user_nationalcode', label: 'کد ملی', col: 'col-md-3' },
        { type: 'input', name: 'has_user_firstname', label: 'نام', col: 'col-md-3' },
        { type: 'input', name: 'has_user_lastname', label: 'نام خانوادگی', col: 'col-md-3' },
        { type: 'select', options: [], name: 'department_id', multiple: true, optionLabel: 'title', optionValue: 'id', label: 'گروه', col: 'col-md-3' },
        { type: 'select', options: [], name: 'pirority_id', label: 'اولویت', col: 'col-md-3' },
        { type: 'select', options: [], name: 'status_id', multiple: true, label: 'وضعیت', optionLabel: 'title', optionValue: 'id', col: 'col-md-3' },
        { type: 'input', name: 'order_id', label: 'شماره سفارش', col: 'col-md-3' },
        { type: 'input', name: 'id', label: 'شماره تیکت', col: 'col-md-3' },
        { type: 'input', name: 'title', label: 'عنوان', col: 'col-md-3' },
        { type: 'date', name: 'created_at_since', calendarIcon: ' ', label: 'از تاریخ : ', responseKey: 'data.from', col: 'col-md-3' },
        { type: 'date', name: 'created_at_till', calendarIcon: ' ', label: 'تا تاریخ : ', col: 'col-md-3' },
        { type: 'date', name: 'hasMessageFromDate', calendarIcon: ' ', placeholder: 'تاریخ پاسخ اپراتور از:', col: 'col-md-6' },
        { type: 'date', name: 'hasMessageToDate', calendarIcon: ' ', placeholder: 'تاریخ پاسخ اپراتور تا:', col: 'col-md-6' },
        // {
        //   type: 'entity',
        //   name: 'hasAssignees',
        //   selectionMode: 'multiple',
        //   popUpButtonConfig: {
        //     unelevated: true,
        //     color: 'primary',
        //     textColor: 'white',
        //     badgeColor: 'secondary',
        //     label: 'مسؤل'
        //   },
        //   indexConfig: {
        //     apiAddress: 'https://reqres.in/api/users',
        //     tableTitle: 'لیست مسؤلین',
        //     showTableItemsRouteName: 'Admin.BlockManagement.Show',
        //     tableKeys: {
        //       data: 'data',
        //       total: 'total',
        //       currentPage: 'page',
        //       perPage: 'per_page',
        //       pageKey: 'page'
        //     },
        //     table: {
        //       columns: [
        //         {
        //           name: 'id',
        //           required: true,
        //           label: '#',
        //           align: 'left',
        //           field: row => row.id
        //         },
        //         {
        //           name: 'first_name',
        //           required: true,
        //           label: 'نام',
        //           align: 'left',
        //           field: row => row.first_name
        //         },
        //         {
        //           name: 'last_name',
        //           required: true,
        //           label: 'نام خانوادگی',
        //           align: 'left',
        //           field: row => row.last_name
        //         },
        //         {
        //           name: 'role',
        //           required: true,
        //           label: 'نقش',
        //           align: 'left',
        //           field: row => row.email
        //         }
        //       ],
        //       data: []
        //     },
        //     inputs: [
        //       { type: 'input', name: 'id', value: null, placeholder: 'شناسه', col: 'col-md-3' },
        //       { type: 'input', name: 'first_name', value: null, placeholder: 'نام', col: 'col-md-3' },
        //       { type: 'input', name: 'last_name', value: null, placeholder: 'نام خانوادگی', col: 'col-md-3' },
        //       { type: 'hidden', name: 'role', value: 123, placeholder: 'نقش', col: 'col-md-3' }
        //     ],
        //     itemIdentifyKey: 'id',
        //     itemIndicatorKey: 'first_name'
        //   },
        //   value: [],
        //   responseKey: '',
        //   selected: [],
        //   col: 'col-md-3'
        // },
        // {
        //   type: 'entity',
        //   name: 'ticketMessage',
        //   selectionMode: 'single',
        //   popUpButtonConfig: {
        //     unelevated: true,
        //     color: 'primary',
        //     textColor: 'white',
        //     badgeColor: 'secondary',
        //     label: 'پاسخگو'
        //   },
        //   indexConfig: {
        //     apiAddress: 'https://reqres.in/api/users',
        //     tableTitle: 'لیست مسؤلین',
        //     showTableItemsRouteName: 'Admin.BlockManagement.Show',
        //     tableKeys: {
        //       data: 'data',
        //       total: 'total',
        //       currentPage: 'page',
        //       perPage: 'per_page',
        //       pageKey: 'page'
        //     },
        //     table: {
        //       columns: [
        //         {
        //           name: 'id',
        //           required: true,
        //           label: '#',
        //           align: 'left',
        //           field: row => row.id
        //         },
        //         {
        //           name: 'first_name',
        //           required: true,
        //           label: 'نام',
        //           align: 'left',
        //           field: row => row.first_name
        //         },
        //         {
        //           name: 'last_name',
        //           required: true,
        //           label: 'نام خانوادگی',
        //           align: 'left',
        //           field: row => row.last_name
        //         },
        //         {
        //           name: 'role',
        //           required: true,
        //           label: 'نقش',
        //           align: 'left',
        //           field: row => row.email
        //         }
        //       ],
        //       data: []
        //     },
        //     inputs: [
        //       { type: 'input', name: 'id', value: null, placeholder: 'شناسه', col: 'col-md-3' },
        //       { type: 'input', name: 'first_name', value: null, placeholder: 'نام', col: 'col-md-3' },
        //       { type: 'input', name: 'last_name', value: null, placeholder: 'نام خانوادگی', col: 'col-md-3' },
        //       { type: 'hidden', name: 'role', value: 123, placeholder: 'نقش', col: 'col-md-3' }
        //     ],
        //     itemIdentifyKey: 'id',
        //     itemIndicatorKey: 'first_name'
        //   },
        //   value: [],
        //   responseKey: '',
        //   selected: [],
        //   col: 'col-md-3'
        // },
        {
          type: 'entity',
          name: 'product',
          selectionMode: 'multiple',
          popUpButtonConfig: {
            unelevated: true,
            color: 'primary',
            textColor: 'white',
            badgeColor: 'secondary',
            label: 'انتخاب محصول'
          },
          indexConfig: {
            apiAddress: APIGateway.product.APIAdresses.base,
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
              { type: 'input', name: 'id', value: null, placeholder: 'شناسه', col: 'col-md-3' },
              { type: 'input', name: 'name', value: null, placeholder: 'نام', col: 'col-md-3' },
              { type: 'input', name: 'short_description', value: null, placeholder: 'توضیحات کوتاه', col: 'col-md-3' },
              { type: 'input', name: 'long_description', value: null, placeholder: 'توضیحات اجمالی', col: 'col-md-3' },
              { type: 'select', name: 'product_type_id', value: null, options: [{ label: 'ساده', value: 1 }, { label: 'قابل پیکربندی', value: 2 }, { label: 'قابل انتخاب', value: 3 }, { label: 'اشتراک', value: 4 }], placeholder: 'نوع محصول', col: 'col-md-3' },
              { type: 'select', name: 'is_free', value: null, options: [{ label: 'رایگان', value: 1 }, { label: 'غیر رایگان', value: 0 }], placeholder: 'وضعیت رایگان / غیر رایگان', col: 'col-md-3' },
              { type: 'select', name: 'enable', value: null, options: [{ label: 'فعال', value: 1 }, { label: 'غیرفعال', value: 0 }], placeholder: 'وضعیت فعال / غیرفعال', col: 'col-md-3' },
              { type: 'select', name: 'display', value: null, options: [{ label: 'نمایش', value: 1 }, { label: 'عدم نمایش', value: 0 }], placeholder: 'وضعیت نمایش / عدم نمایش', col: 'col-md-3' },
              { type: 'input', name: 'name', value: null, placeholder: 'نام', col: 'col-md-4' },
              { type: 'input', name: 'attribute_set_id', value: null, placeholder: 'کد دسته', col: 'col-md-4' },
              { type: 'dateRange', calendarIcon: ' ', name: 'created_at_range', value: [], placeholder: 'بازه تاریخ ایجاد', col: 'col-md-4' }
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
      ],
      inputs: [],
      table: {}
    }
  },
  computed: {
    isInAdminPage () {
      return !!this.$route.name.includes('Admin')
    },
    userCanFilterSupporter () {
      return true
    },
    userCanFilterAssignees () {
      return true
    },
    userSupporters () {
      // پاسخگو
      return []
    },
    userAssignees () {
      return []
    }
  },
  mounted () {
    this.checkQueryParams()
  },
  methods: {
    checkQueryParams () {
      const departmentId = this.$route.query.d
      if (departmentId) {
        this.$router.push({
          name: 'UserPanel.Ticket.Create',
          query: {
            d: departmentId
          }
        })
      }
    },
    async initTicket () {
      this.setEntityValues()
      await this.setInputs()
      this.isEntityReady = true
    },
    getShamsiDate (date) {
      return moment(date, 'YYYY-M-D').format('jYYYY/jMM/jDD')
    },
    setEntityValues () {
      if (this.$route.name.includes('Admin')) {
        this.table = this.adminTable
        this.inputs = this.adminInputs
        return
      }
      this.table = this.userTable
      this.inputs = this.userInputs
    },
    filterInputs (res) {
      this.totalTickets = res.data?.meta?.total
      if (!this.userCanFilterSupporter) {
        this.inputs = this.inputs.filter(item => !((item.label === 'پاسخگو') || (item.name === 'hasMessageFromDate') || (item.name === 'hasMessageToDate')))
      }
      if (!this.userCanFilterAssignees) {
        this.inputs = this.inputs.filter(item => item.name !== 'hasAssignees')
      }
    },
    updateTicket (data) {
      const ticketId = data.row.id
      const payload = {
        department_id: data.row.department.id,
        status_id: data.row.status.id
      }
      this.updateTicketData(ticketId, payload)
    },
    async setInputs () {
      const ticketFields = await this.getTicketData()
      this.getInput('department_id').options = ticketFields.departments.list
      this.getInput('pirority_id').options = ticketFields.priorities.list
      this.getInput('status_id').options = ticketFields.statuses.list
    },
    setEditMode (data) {
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
  @media screen and (width <= 1450px){
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

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
      <entity-index ref="ticketEntityIndex"
                    v-model:value="inputs"
                    :api="api"
                    :table="table"
                    :table-keys="tableKeys"
                    :create-route-name="options.createRouteName"
                    :default-layout="false"
                    :table-grid-size="true"
                    :show-expand-button="false"
                    :show-table-top="false"
                    @onPageChanged="filterInputs">
        <template #toolbar>
          <span>
            لیست تیکت ها
          </span>
          <q-btn color="primary"
                 :to="{name: localOptions.asAdmin ? 'Admin.Ticket.Create' : 'UserPanel.Ticket.Create'}">
            تیکت جدید
          </q-btn>
        </template>
        <template v-slot:before-index-table>
          <p class="q-ma-lg">
            تعداد کل یافته ها: {{ totalTickets}}
          </p>
        </template>
        <template #entity-index-table-item-cell="{inputData,showConfirmRemoveDialog}">
          <div class="ticket-list-item-container">
            <div class="ticket-list-item-header">
              <div class="ticket-list-item-header__info-side">
                <div class="ticket-list-item-header__info-side--status">
                  <div v-if="inputData.props.expand">
                    <q-select v-model="inputData.props.row.status"
                              :options="ticketStatuses"
                              option-label="title"
                              class="no-title" />
                  </div>
                  <template v-else>
                    <q-chip square
                            :style="{background: checkStatusColor(inputData.props.row.status.id), color: checkStatusTextColor(inputData.props.row.status.id)}">
                      {{ inputData.props.row.status.title }}
                    </q-chip>
                  </template>
                </div>
                <div class="ticket-list-item-header__info-side--ticket-id">
                  تیکت: {{ inputData.props.row.id }}
                </div>
                <div class="ticket-list-item-header__info-side--priority">
                  اولویت : {{ inputData.props.row.priority.title }}
                </div>
                <div class="ticket-list-item-header__info-side--department">
                  <q-select v-if="inputData.props.expand"
                            v-model="inputData.props.row.department"
                            :options="departmentList.list"
                            option-label="title"
                            class="no-title" />
                  <template v-else>
                    <q-icon name="ph:tag"
                            color="gery-8" />
                    {{ inputData.props.row.department.title }}
                  </template>
                </div>
              </div>
              <div class="ticket-list-item-header__action-side">
                <div class="ticket-list-item-header__action-side--update">
                  آخرین به‌روزرسانی {{ getTicket(inputData.props.row).shamsiDate('updated_at').dateTime }}
                </div>
                <div class="ticket-list-item-header__action-side--action">
                  <q-btn icon="ph:info"
                         color="primary"
                         label="مشاهده"
                         class="size-md"
                         :to="{ name: ticketShowRouteName, params: { id: inputData.props.row.id } }">
                    <q-tooltip>
                      مشاهده
                    </q-tooltip>
                  </q-btn>
                  <template v-if="localOptions.asAdmin">
                    <template v-if="inputData.props.expand">
                      <q-btn icon="ph:check"
                             color="positive"
                             square
                             class="size-md"
                             @click="updateTicket(inputData.props)">
                        <q-tooltip>
                          ثبت
                        </q-tooltip>
                      </q-btn>
                      <q-btn icon="ph:x"
                             color="negative"
                             square
                             class="size-md"
                             @click="inputData.props.expand = false">
                        <q-tooltip>
                          انصراف
                        </q-tooltip>
                      </q-btn>
                    </template>
                    <template v-else>
                      <q-btn icon="ph:pencil-simple"
                             color="grey"
                             square
                             class="size-md"
                             flat
                             @click="setEditMode(inputData.props)">
                        <q-tooltip>
                          ویرایش
                        </q-tooltip>
                      </q-btn>
                      <q-btn icon="ph:trash"
                             color="grey"
                             square
                             class="size-md"
                             flat
                             @click="showConfirmRemoveDialog(inputData.props.row, 'id', 'آیا از حذف تیکت اطمینان دارید ؟')">
                        <q-tooltip>
                          حذف
                        </q-tooltip>
                      </q-btn>
                    </template>
                  </template>
                </div>
              </div>
            </div>
            <div class="ticket-list-item-body">
              <h6 class="ellipsis-2-lines">
                {{inputData.props.row.title}}
              </h6>
            </div>
            <div class="ticket-list-item-footer">
              <div class="ticket-list-item-footer__info-side">
                <div class="ticket-list-item-footer__info-side--user">
                  <div class="ticket-user-avatar">
                    <q-avatar size="32px">
                      <lazy-img :src="inputData.props.row.user.photo"
                                width="100%"
                                height="100%" /></q-avatar>
                  </div>
                  <div class="ticket-user-name">
                    {{ getTicket(inputData.props.row).user.full_name }}
                  </div>
                </div>
                <div class="ticket-list-item-footer__info-side--messages">
                  <q-icon name="ph:chats" />
                  <div class="messages-count">
                    {{ inputData.props.row.totalMessages }}
                  </div>
                </div>
              </div>
              <div class="ticket-list-item-footer__update-side">
                <div class="ticket-list-item-footer__update-side--title">
                  ایجاد شده در
                </div>
                <div class="ticket-list-item-footer__update-side--date">
                  {{ getTicket(inputData.props.row).shamsiDate('created_at').dateTime }}
                </div>
              </div>
            </div>
          </div>
        </template>
      </entity-index>
    </div>
    {{ count }}
    <q-btn color="primary"
           icon="check"
           label="OK"
           @click="add" />
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import moment from 'moment-jalaali'
import { EntityIndex } from 'quasar-crud'
import { Ticket } from 'src/models/Ticket.js'
import LazyImg from 'src/components/lazyImg.vue'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinTicket, mixinWidget } from 'src/mixin/Mixins.js'
import SubmitButton from 'src/components/FormBuilderCustumComponents/SubmitButton.vue'
import KeepAliveComponents from 'src/assets/js/KeepAliveComponents.js'

const SubmitButtonComp = shallowRef(SubmitButton)
export default {
  name: 'TicketListWidget',
  components: {
    LazyImg,
    EntityIndex
  },
  mixins: [mixinTicket, mixinWidget],
  props: {
    options: {
      type: Object,
      default () {
        return {
          showRouteName: '',
          createRouteName: '',
          keepAliveComponents: KeepAliveComponents
        }
      }
    }
  },
  data () {
    return {
      count: 0,
      defaultOptions: {
        asAdmin: false
      },
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
        { type: 'select', options: [], name: 'status_id', multiple: true, label: 'وضعیت', optionLabel: 'title', optionValue: 'id', col: 'col-md-3 col-12' },
        { type: 'select', options: [], name: 'pirority_id', label: 'اولویت', optionLabel: 'title', col: 'col-md-3 col-12' },
        { type: 'date', name: 'created_at_since', calendarIcon: ' ', label: 'از تاریخ : ', responseKey: 'data.from', col: 'col-md-3 col-12' },
        { type: 'date', name: 'created_at_till', calendarIcon: ' ', label: 'تا تاریخ : ', col: 'col-md-3 col-12' },
        { type: 'input', name: 'title', label: 'عنوان', col: 'col-md-6 col-12' },
        { type: 'input', name: 'id', label: 'شماره تیکت', col: 'col-md-3 col-12' },
        {
          type: SubmitButtonComp,
          name: 'SubmitButtonComp',
          label: 'جستجو',
          icon: 'ph:magnifying-glass',
          customClass: 'full-width',
          atClick: () => {
            this.filterTickets()
          },
          col: 'col-md-3 col-12'
        }
      ],
      adminInputs: [
        { type: 'input', name: 'has_user_mobile', label: 'شماره همراه', col: 'col-md-3 col-12' },
        { type: 'input', name: 'has_user_nationalcode', label: 'کد ملی', col: 'col-md-3 col-12' },
        { type: 'input', name: 'has_user_firstname', label: 'نام', col: 'col-md-3 col-12' },
        { type: 'input', name: 'has_user_lastname', label: 'نام خانوادگی', col: 'col-md-3 col-12' },
        { type: 'select', options: [], name: 'department_id', multiple: true, optionLabel: 'title', optionValue: 'id', label: 'گروه', col: 'col-md-3 col-12' },
        { type: 'select', options: [], name: 'pirority_id', label: 'اولویت', col: 'col-md-3 col-12' },
        { type: 'select', options: [], name: 'status_id', multiple: true, label: 'وضعیت', optionLabel: 'title', optionValue: 'id', col: 'col-md-3 col-12' },
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
          col: 'q-mt-lg col-md-3 col-12'
        },
        { type: 'input', name: 'title', label: 'عنوان', col: 'col-md-6 col-12' },
        { type: 'input', name: 'id', label: 'شماره تیکت', col: 'col-md-3 col-12' },
        { type: 'input', name: 'order_id', label: 'شماره سفارش', col: 'col-md-3 col-12' },
        { type: 'date', name: 'created_at_since', calendarIcon: ' ', label: 'از تاریخ : ', responseKey: 'data.from', col: 'col-md-3 col-12' },
        { type: 'date', name: 'created_at_till', calendarIcon: ' ', label: 'تا تاریخ : ', col: 'col-md-3 col-12' },
        { type: 'date', name: 'hasMessageFromDate', calendarIcon: ' ', label: 'تاریخ پاسخ اپراتور از:', col: 'col-md-3 col-12' },
        { type: 'date', name: 'hasMessageToDate', calendarIcon: ' ', label: 'تاریخ پاسخ اپراتور تا:', col: 'col-md-3 col-12' },
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
        { type: 'Checkbox', name: 'hasReported', value: 0, trueValue: 1, falseValue: 0, label: 'مشاهده موارد گزارش شده', col: 'q-mt-lg col-md-9 col-12' },
        {
          type: SubmitButtonComp,
          name: 'SubmitButtonComp',
          label: 'جستجو',
          icon: 'ph:magnifying-glass',
          customClass: 'full-width',
          atClick: () => {
            this.filterTickets()
          },
          col: 'col-md-3 col-12'
        }
      ],
      inputs: [],
      table: {}
    }
  },
  computed: {
    ticketShowRouteName () {
      if (this.localOptions.asAdmin) {
        return 'Admin.Ticket.Show'
      }

      return 'UserPanel.Ticket.Show'
    },
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
    add () {
      this.count++
    },
    filterTickets () {
      this.$refs.ticketEntityIndex.search()
    },
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
    getTicket (ticket) {
      return new Ticket(ticket)
    },
    checkStatusColor (id) {
      if (id === 1) {
        return '#FDEEEE'
      } else if (id === 2) {
        return '#FFF8E1'
      } else if (id === 3) {
        return '#E6F7F1'
      } else {
        return '#EAF8FE'
      }
    },
    checkStatusTextColor (id) {
      if (id === 1) {
        return '#B33E3C'
      } else if (id === 2) {
        return '#FFB300'
      } else if (id === 3) {
        return '#078156'
      } else {
        return '#1F89B9'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.ticket-index {
  :deep(.entity-index) {
    .portlet-toolbar {
      @include body1;
      color: $grey-9;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: $space-2;
      margin-bottom: $space-4;
      border-bottom: solid 1px $grey-4;
    }
    .portlet-content {
      .slot-wrapper {
        p {
          margin: $space-1 $spacing-none;
        }
      }
      .quasar-crud-index-table {
        padding: $spacing-none;
        .q-table__container {
          .q-table__top {
            display: none;
          }
          .q-table__middle {
            display: none;
          }
        }
      }
    }
  }
}
.ticket-list-item {
  &-container {
    display: flex;
    padding: $space-6;
    flex-direction: column;
    align-items: flex-start;
    gap: $space-6;
    align-self: stretch;
    width: 100%;
    box-shadow: $shadow-1;
    background: $grey-1;
    border-radius: $radius-3;

    &:not(:last-child) {
      margin-bottom: $space-4;
    }
  }

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    @include media-max-width (lg) {
      flex-direction: column;
      align-items: flex-start;
    }

    &__info-side {
      display: flex;
      align-items: flex-start;
      align-items: center;
      gap: $space-6;

      &--ticket-id {
        color: $grey-8;
        @include body2;
      }

       &--priority{
        color: $grey-8;
        @include body2;
      }

      &--department {
        display: flex;
        align-items: center;
        gap: $space-2;
        color: $grey-8;
        @include body2;
      }
    }

    &__action-side {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: $space-4;

      &--update {
        color: $grey-8;
        @include body2;
      }

      &--action {
        display: flex;
        align-items: center;
        gap: $space-2;
      }
    }
  }

  &-body {
    width: 100%;
    color: $grey-9;

    h6 {
      width: 100%;
    }
  }

  &-footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;

    @include media-max-width (sm) {
      flex-direction: column;
      align-items: flex-start;
    }

    &__info-side {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: $space-7;

      &--user {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: $space-2;

        .ticket-user-name {
          color: $grey-8;
          @include body2;
        }
      }

      &--messages {
        display: flex;
        align-items: center;
        gap: 8px;
        color: $grey-8;

        .messages-count {
          @include body2;
        }
      }
    }
    &__update-side {
      display: flex;
      align-items: flex-start;
      gap: $space-2;
      color: $grey-8;
      @include body2;
    }
  }
}

.ticket-index{
  padding: $space-6;

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

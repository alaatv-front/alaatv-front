<template>
  <div class="row  justify-center">
    <div class="col-8 q-mb-xl">
      <entity-edit
        ref="entityEdit"
        v-model:value="inputs"
        :show-save-button="false"
        :title="'شماره تیکت ' + getInputsValue('id') + ' در ' + getInputsValue('department_title')"
        :api="api"
        entity-id-key="id"
        entity-param-key="id"
        show-route-name="Admin.Ticket.Index"
        :after-load-input-data="checkLoadInputData"
      >
        <template #before-form-builder>
          <div class="flex justify-around">
            <q-btn rounded
                   color="blue"
                   icon="isax:archive-book"
                   @click="openCloseLogDrawer">
              <q-tooltip>
                باز شدن لیست اتفاقات
              </q-tooltip>
            </q-btn>
            <q-btn v-if="isAdmin"
                   rounded
                   color="blue"
                   icon="isax:shopping-cart"
                   @click="openShopLogList">
              <q-tooltip>
                باز شدن لیست خرید
              </q-tooltip>
            </q-btn>
          </div>
          <div v-if="isAdmin"
               class="row q-mt-lg">
            <div class="col-4 q-px-lg">
              <q-btn unelevated
                     class="full-width"
                     icon="isax:user"
                     :to="'/user/'+this.getInputsValue('userId')+'/edit'"
                     target="_blank"
                     color="blue">
                <q-tooltip>ویرایش اطلاعات کاربر</q-tooltip>
              </q-btn>
            </div>
            <div class="col-4 q-px-lg">
              <q-btn unelevated
                     class="full-width"
                     icon="isax:edit"
                     color="blue"
                     @click="updateTicketData">
                <q-tooltip>ویرایش اطلاعات تیکت</q-tooltip>
              </q-btn>
            </div>
            <div class="col-4 q-px-lg">
              <q-btn unelevated
                     class="full-width"
                     icon="isax:sms"
                     color="blue"
                     @click="sendTicketStatusNotice(this.getInputsValue('id'))"
              >
                <q-tooltip>ارسال پیامک اگاه سازی تغییر وضعیت</q-tooltip>
              </q-btn>
            </div>
          </div>
        </template>
        <template #after-form-builder>
          <div v-if="isAdmin">
            <q-btn unelevated
                   color="blue"
                   @click="editAssignedSupporters"
            >ویرایش اپراتورها
            </q-btn>
          </div>
          <ticket-rate
            v-if="!isAdmin"
            :rate="getInputsValue('rate')"
            :ticket-id="getInputsValue('id')"
            class="q-ml-lg q-mt-lg" />
        </template>
      </entity-edit>
      <messages v-for="(item, index) in userMessageArray"
                :key="index"
                :is-user-admin="isAdmin"
                :data="item" />
      <SendMessageInput
        ref="SendMessageInput"
        class="q-my-lg"
        :isAdmin="isAdmin"
        :send-loading="sendLoading"
        @creatTicket="sendTicketMessage"
      />
      <drawer
        :is-open="logDrawer"
        max-width="310px"
        side="left"
      >
        <q-scroll-area class="fit">
          <q-btn icon="mdi-close"
                 unelevated
                 class="close-btn"
                 @click="logDrawer = false" />
          <div class="q-my-md flex content-between">
            <q-tabs
              v-model="panel"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
            >
              <q-tab name="events"
                     label="رویداد ها" />
              <q-tab v-if="isAdmin"
                     name="otherTickets"
                     label="تیکت های دیگر کاربر" />
            </q-tabs>
          </div>
          <q-tab-panels v-model="panel"
                        class="tab-panels"
                        animated>
            <q-tab-panel name="events">
              <log-list :log-array="getInputsValue('logs')" />
            </q-tab-panel>
            <q-tab-panel name="otherTickets">
              <template v-for="ticket in getInputsValue('otherTickets')"
                        :key="ticket">
                <div class="other-ticket">
                  <div class="right-side-squere"></div>
                  <div>
                    <q-btn class="link-btn"
                           :href="'/ticket/' + ticket.id"
                           dense
                           flat>{{ ticket.title }}
                    </q-btn>
                    <div class="time">{{ convertToShamsi(ticket.created_at, 'time') }}</div>
                  </div>
                </div>
              </template>
            </q-tab-panel>
          </q-tab-panels>
        </q-scroll-area>
      </drawer>
      <drawer
        :is-open="orderDrawer"
        max-width="1016px"
      >
        <q-scroll-area class="fit">
          <q-btn icon="mdi-close"
                 class="close-btn"
                 unelevated
                 @click="orderDrawer = false" />
          <user-order-list :user-orders-list="userOrderData?.list"
                           :loading="orderLoading" />
        </q-scroll-area>
      </drawer>
    </div>
  </div>
</template>

<script>
import { EntityEdit } from 'quasar-crud'
import Messages from 'components/Ticket/Messages'
import TicketRate from 'components/Ticket/TicketRate'
import LogList from 'components/Ticket/LogList'
import Drawer from 'components/CustomDrawer'
import UserOrderList from 'components/Ticket/userOrderList'
import API_ADDRESS from 'src/api/Addresses'
import { CartItemList } from 'src/models/CartItem'
import SendMessageInput from 'components/Ticket/SendMessageInput'
import { mixinDateOptions, mixinTicket } from 'src/mixin/Mixins'

export default {
  name: 'Show',
  mixins: [mixinDateOptions, mixinTicket],
  components: {
    EntityEdit,
    // EntityAction,
    Messages,
    LogList,
    UserOrderList,
    TicketRate,
    SendMessageInput,
    Drawer
  },
  data() {
    return {
      sendMessageLoading: false,
      renderComponent: true,
      logDrawer: false,
      orderDrawer: false,
      orderLoading: false,
      panel: 'events',
      userOrderData: null,
      isDataLoaded: false,
      userId: null,
      userMessageArray: [],
      expanded: true,
      api: API_ADDRESS.ticket.show.base,
      departments: [
        {
          title: 'آموزش',
          id: 1
        }, {
          title: 'مالی',
          id: 2
        }, {
          title: 'استخدام',
          id: 3
        }, {
          title: 'پرچم',
          id: 4
        }, {
          title: 'راه ابریشم',
          id: 5
        }, {
          title: 'فنی',
          id: 6
        }, {
          title: 'مشاوره خرید',
          id: 7
        }, {
          title: 'حمایت مردمی',
          id: 8
        }, {
          title: 'تفتان',
          id: 9
        }, {
          title: 'آرش',
          id: 10
        }, {
          title: 'تتا',
          id: 11
        }, {
          title: 'سه آ',
          id: 12
        }, {
          title: 'طرح حکمت',
          id: 13
        }
      ],
      status: [
        {
          title: 'پاسخ داده نشده',
          id: 1
        },
        {
          title: 'در حال بررسی',
          id: 2
        },
        {
          title: 'پاسخ داده شده',
          id: 3
        },
        {
          title: 'بسته شده',
          id: 4
        }
      ],
      inputs: [
        { type: 'input', name: 'title', responseKey: 'ticket.title', label: 'عنوان', col: 'col-md-4', disable: true },
        {
          type: 'input',
          name: 'first_name',
          responseKey: 'ticket.user.first_name',
          label: 'نام',
          col: 'col-md-4',
          disable: true
        },
        {
          type: 'input',
          name: 'last_name',
          responseKey: 'ticket.user.last_name',
          label: 'نام خانوادگی',
          col: 'col-md-4',
          disable: true
        },
        {
          type: 'input',
          name: 'priority',
          responseKey: 'ticket.priority.title',
          label: 'اولویت',
          col: 'col-md-4',
          disable: true
        },
        {
          type: 'select',
          name: 'department',
          options: [],
          optionLabel: 'title',
          optionValue: 'id',
          responseKey: 'ticket.department.id',
          label: 'گروه',
          col: 'col-md-4'
        },
        {
          type: 'select',
          name: 'status',
          options: [],
          optionLabel: 'title',
          optionValue: 'id',
          responseKey: 'ticket.status.id',
          label: 'وضعیت',
          col: 'col-md-4'
        },
        {
          type: 'dateTime',
          name: 'created_at',
          responseKey: 'ticket.created_at',
          label: 'تاریخ ایجاد',
          col: 'col-md-4',
          disable: true
        },
        {
          type: 'input',
          name: 'national_code',
          responseKey: 'ticket.user.national_code',
          label: 'کد ملی',
          col: 'col-md-4',
          disable: true
        },
        {
          type: 'input',
          name: 'major',
          responseKey: 'ticket.user.major.name',
          label: 'رشته',
          col: 'col-md-4',
          disable: true
        },
        {
          type: 'dateTime',
          name: 'created_at',
          responseKey: 'ticket.updated_at',
          abc: true,
          label: 'تاریخ بروز آوری:',
          col: 'col-md-4',
          disable: true
        },
        { type: 'hidden', name: 'id', responseKey: 'ticket.id', label: 'id' },
        { type: 'hidden', name: 'department_title', responseKey: 'ticket.department.title' },
        { type: 'hidden', name: 'messages', responseKey: 'ticket.messages', label: '' },
        { type: 'hidden', name: 'img', responseKey: 'ticket.user.photo', label: '' },
        { type: 'hidden', name: 'logs', responseKey: 'ticket.logs', label: '' },
        { type: 'hidden', name: 'userId', responseKey: 'ticket.user.id', label: '' },
        { type: 'hidden', name: 'otherTickets', responseKey: 'other_tickets', label: '' },
        { type: 'hidden', name: 'priority-id', responseKey: 'ticket.priority.id' },
        { type: 'hidden', name: 'rate', responseKey: 'ticket.rate' },
        {
          isAdmin: true,
          type: 'entity',
          name: 'management',
          selectionMode: 'single',
          label: 'انتخاب کاربر',
          buttonColor: 'blue',
          buttonTextColor: 'white',
          buttonBadgeColor: 'primary',
          indexConfig: {
            apiAddress: 'https://reqres.in/api/users',
            tableTitle: 'لیست کاربران',
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
              { type: 'input', name: 'mobile', value: null, label: 'شماره تلفن', col: 'col-md-6' },
              { type: 'input', name: 'national_code', value: null, label: 'کدملی', col: 'col-md-6' },
              { type: 'hidden', name: 'role', value: 123, label: 'نقش', col: 'col-md-3' }
            ],
            itemIdentifyKey: 'mobile',
            itemIndicatorKey: 'mobile'
          },
          value: [],
          responseKey: '',
          selected: [],
          col: 'col-md-4'
        },
        {
          type: 'entity',
          name: 'editOperator',
          selectionMode: 'multiple',
          label: 'انتخاب اپراتورها',
          buttonColor: 'blue',
          buttonTextColor: 'white',
          buttonBadgeColor: 'primary',
          indexConfig: {
            apiAddress: 'https://reqres.in/api/users',
            tableTitle: 'لیست کاربران',
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
              { type: 'input', name: 'mobile', value: null, label: 'شماره تلفن', col: 'col-md-6' },
              { type: 'input', name: 'national_code', value: null, label: 'کدملی', col: 'col-md-6' },
              { type: 'hidden', name: 'role', value: 123, label: 'نقش', col: 'col-md-3' }
            ],
            itemIdentifyKey: 'id',
            itemIndicatorKey: 'id'
          },
          itemIdentifyKey: 'id',
          itemIndicatorKey: 'id',
          value: [],
          responseKey: '',
          selected: [],
          col: 'col-md-6'
        }
      ]
    }
  },
  created() {
    this.initPageData()
  },
  computed: {
    editAssignInput() {
      return this.inputs.find(item => item.name === 'editOperator')
    }
  },
  methods: {
    async editAssignedSupporters() {
      const usersId = []
      this.editAssignInput.selected.forEach(item => {
        usersId.push(item.id)
      })
      try {
        await this.$axios.post(API_ADDRESS.ticket.show.editAssign(this.getInputsValue('id')), {
          assign: usersId
        })
      } catch (e) {

      }
      console.log(this.editAssignInput.selected)
    },
    initPageData() {
      this.api += '/' + this.$route.params.id
      this.getInput('department').options = this.departments
      this.getInput('status').options = this.status
    },

    filterDataForUserRole() {
      this.inputs = this.inputs.filter(input => !input.isAdmin)
    },

    updateTicketData() {
      this.$axios.put(API_ADDRESS.ticket.show.base + '/' + this.getInputsValue('id'), {
        department_id: this.getInputsValue('department'),
        id: this.getInputsValue('id'),
        priority_id: this.getInputsValue('priority-id'),
        status_id: this.getInputsValue('status'),
        title: this.getInputsValue('title'),
        user_id: this.getInputsValue('userId')
      })
        .then((res) => {
          this.$q.notify({
            message: 'تغییرات با موفقیت اعمال شد.',
            type: 'positive'
          })
        })
    },
    openShopLogList() {
      this.orderDrawer = this.orderDrawer === false
      this.orderLoading = true
      this.$axios.get(API_ADDRESS.user.orders.ordersById(this.userId)).then(
        response => {
          // this.userOrderData = new CartItemList(response.data.data)
          this.userOrderData = new CartItemList([
            {
              id: 1843919,
              discount: 0,
              customer_description: null,
              price: 5950000,
              paid_price: 5950000,
              refund_price: 0,
              debt: 0,
              orderstatus: {
                id: 2,
                name: 'ثبت نهایی'
              },
              paymentstatus: {
                id: 3,
                name: 'پرداخت شده'
              },
              orderproducts: [
                {
                  id: 2309418,
                  quantity: 1,
                  type: 1,
                  product: {
                    id: 756,
                    redirect_url: null,
                    type: 1,
                    category: 'VIP',
                    title: 'پک اختصاصی تجربی راه ابریشم پرو آلاء',
                    is_free: 0,
                    url: {
                      web: 'http://127.0.0.1/product/756',
                      api: 'http://127.0.0.1/api/v2/product/756'
                    },
                    photo: 'https://nodes.alaatv.com/upload/images/product/12_20220709141847.jpg',
                    attributes: {
                      info: {
                        teacher: [
                          'گروه آموزشی'
                        ],
                        shipping_method: [
                          'دانلودی'
                        ],
                        major: [
                          'تجربی'
                        ],
                        services: [
                          '7 نوع کلاس کنکوری',
                          '3 نوع آزمون',
                          '3 خدمت منتورینگ و مشاوره'
                        ],
                        download_date: [
                          'از لحظه خرید'
                        ],
                        educational_system: [
                          'نظام جدید'
                        ],
                        duration: [],
                        production_year: [
                          'ویژه کنکور 1402'
                        ]
                      },
                      extra: null,
                      subscription: null
                    },
                    redirect_code: null
                  },
                  grand: null,
                  price: {
                    discountDetail: {
                      productDiscount: 30,
                      bonDiscount: 0,
                      productDiscountAmount: 0
                    },
                    extraCost: 0,
                    base: 8500000,
                    discount: 2550000,
                    final: 5950000
                  },
                  photo: 'https://nodes.alaatv.com/upload/images/product/12_20220709141847.jpg',
                  extra_attributes: null
                },
                {
                  id: 2309419,
                  quantity: 1,
                  type: 3,
                  product: {
                    id: 746,
                    redirect_url: null,
                    type: 1,
                    category: 'VIP',
                    title: 'راه ابریشم پرو ریاضی تجربی آلاء',
                    is_free: 0,
                    url: {
                      web: 'http://127.0.0.1/product/746',
                      api: 'http://127.0.0.1/api/v2/product/746'
                    },
                    photo: 'https://nodes.alaatv.com/upload/images/product/2 (2)_20220709142023.jpg',
                    attributes: {
                      info: {
                        teacher: [
                          'محمد صادق ثابتی'
                        ],
                        shipping_method: [
                          'دانلودی'
                        ],
                        major: [
                          'تجربی'
                        ],
                        services: [
                          '7 نوع کلاس کنکوری',
                          '3 نوع آزمون',
                          '3 خدمت منتورینگ و مشاوره'
                        ],
                        download_date: [
                          'از لحظه خرید'
                        ],
                        educational_system: [
                          'نظام جدید'
                        ],
                        duration: [],
                        production_year: [
                          'ویژه کنکور 1402'
                        ]
                      },
                      extra: null,
                      subscription: null
                    },
                    redirect_code: null
                  },
                  grand: null,
                  price: {
                    discountDetail: {
                      productDiscount: 0,
                      bonDiscount: 0,
                      productDiscountAmount: 0
                    },
                    extraCost: 0,
                    base: 2000000,
                    discount: 0,
                    final: 2000000
                  },
                  photo: 'https://nodes.alaatv.com/upload/images/product/2 (2)_20220709142023.jpg',
                  extra_attributes: null
                },
                {
                  id: 2309420,
                  quantity: 1,
                  type: 3,
                  product: {
                    id: 750,
                    redirect_url: null,
                    type: 1,
                    category: 'VIP',
                    title: 'راه ابریشم پرو زیست شناسی آلاء',
                    is_free: 0,
                    url: {
                      web: 'http://127.0.0.1/product/750',
                      api: 'http://127.0.0.1/api/v2/product/750'
                    },
                    photo: 'https://nodes.alaatv.com/upload/images/product/1 (4)_20220709141937.jpg',
                    attributes: {
                      info: {
                        teacher: [
                          'جلال موقاری'
                        ],
                        shipping_method: [
                          'دانلودی'
                        ],
                        major: [
                          'تجربی'
                        ],
                        services: [
                          '7 نوع کلاس کنکوری',
                          '3 نوع آزمون',
                          '3 خدمت منتورینگ و مشاوره'
                        ],
                        download_date: [
                          'از لحظه خرید'
                        ],
                        educational_system: [
                          'نظام جدید'
                        ],
                        duration: [],
                        production_year: [
                          'ویژه کنکور 1402'
                        ]
                      },
                      extra: null,
                      subscription: null
                    },
                    redirect_code: null
                  },
                  grand: null,
                  price: {
                    discountDetail: {
                      productDiscount: 0,
                      bonDiscount: 0,
                      productDiscountAmount: 0
                    },
                    extraCost: 0,
                    base: 2500000,
                    discount: 0,
                    final: 2500000
                  },
                  photo: 'https://nodes.alaatv.com/upload/images/product/1 (4)_20220709141937.jpg',
                  extra_attributes: null
                },
                {
                  id: 2309421,
                  quantity: 1,
                  type: 3,
                  product: {
                    id: 751,
                    redirect_url: null,
                    type: 1,
                    category: 'VIP',
                    title: 'راه ابریشم پرو شیمی آلاء',
                    is_free: 0,
                    url: {
                      web: 'http://127.0.0.1/product/751',
                      api: 'http://127.0.0.1/api/v2/product/751'
                    },
                    photo: 'https://nodes.alaatv.com/upload/images/product/6 (2)_20220709141928.jpg',
                    attributes: {
                      info: {
                        teacher: [
                          'حامد پویان نظر'
                        ],
                        shipping_method: [
                          'دانلودی'
                        ],
                        major: [
                          'ریاضی',
                          'تجربی'
                        ],
                        services: [
                          '7 نوع کلاس کنکوری',
                          '3 نوع آزمون',
                          '3 خدمت منتورینگ و مشاوره'
                        ],
                        download_date: [
                          'از لحظه خرید'
                        ],
                        educational_system: [
                          'نظام جدید'
                        ],
                        duration: [],
                        production_year: [
                          'ویژه کنکور 1402'
                        ]
                      },
                      extra: null,
                      subscription: null
                    },
                    redirect_code: null
                  },
                  grand: null,
                  price: {
                    discountDetail: {
                      productDiscount: 0,
                      bonDiscount: 0,
                      productDiscountAmount: 0
                    },
                    extraCost: 0,
                    base: 2000000,
                    discount: 0,
                    final: 2000000
                  },
                  photo: 'https://nodes.alaatv.com/upload/images/product/6 (2)_20220709141928.jpg',
                  extra_attributes: null
                }
              ],
              coupon_info: null,
              successful_transactions: [
                {
                  wallet_id: 289876,
                  order_id: 1843919,
                  cost: 5950000,
                  transactionID: null,
                  trace_number: null,
                  refrence_number: null,
                  paycheck_number: null,
                  paymentmethod: {
                    name: 'wallet',
                    display_name: 'کیف پول',
                    id: 5
                  },
                  transactiongateway: null,
                  transactionstatus: {
                    name: 'موفق',
                    id: 3
                  },
                  created_at: '2022-10-23 09:54:41',
                  completed_at: '2022-10-23 13:24:41',
                  deadline_at: null
                }
              ],
              pending_transactions: null,
              unpaid_transaction: null,
              posting_info: null,
              user: {
                id: 2,
                first_name: 'mitra',
                last_name: 'zolfi',
                mobile: '09388131193',
                national_code: '4900443050',
                profile_completion: 66
              },
              created_at: '2022-10-23 09:53:29',
              completed_at: '2022-10-23 13:24:41'
            },
            {
              id: 1843918,
              discount: 0,
              customer_description: null,
              price: 5460000,
              paid_price: 5460000,
              refund_price: 0,
              debt: 0,
              orderstatus: {
                id: 2,
                name: 'ثبت نهایی'
              },
              paymentstatus: {
                id: 3,
                name: 'پرداخت شده'
              },
              orderproducts: [
                {
                  id: 2309417,
                  quantity: 1,
                  type: 1,
                  product: {
                    id: 793,
                    redirect_url: null,
                    type: 1,
                    category: 'همایش',
                    title: 'پک انسانی فوریت کنکور 110 آلاء',
                    is_free: 0,
                    url: {
                      web: 'http://127.0.0.1/product/793',
                      api: 'http://127.0.0.1/api/v2/product/793'
                    },
                    photo: 'https://nodes.alaatv.com/upload/images/product/11_20220818095509.jpg',
                    attributes: {
                      info: {
                        teacher: [
                          'گروه آموزشی'
                        ],
                        shipping_method: [
                          'دانلودی'
                        ],
                        major: [
                          'انسانی'
                        ],
                        services: [
                          'فیلم',
                          'جزوه'
                        ],
                        download_date: [
                          'پیش فروش'
                        ],
                        educational_system: [
                          'نظام جدید'
                        ],
                        duration: [
                          'در حال تولید'
                        ],
                        production_year: [
                          'کنکور 1401'
                        ]
                      },
                      extra: null,
                      subscription: null
                    },
                    redirect_code: null
                  },
                  grand: null,
                  price: {
                    discountDetail: {
                      productDiscount: 35,
                      bonDiscount: 0,
                      productDiscountAmount: 0
                    },
                    extraCost: 0,
                    base: 8400000,
                    discount: 2940000,
                    final: 5460000
                  },
                  photo: 'https://nodes.alaatv.com/upload/images/product/11_20220818095509.jpg',
                  extra_attributes: null
                }
              ],
              coupon_info: null,
              successful_transactions: [
                {
                  wallet_id: 289876,
                  order_id: 1843918,
                  cost: 5460000,
                  transactionID: null,
                  trace_number: null,
                  refrence_number: null,
                  paycheck_number: null,
                  paymentmethod: {
                    name: 'wallet',
                    display_name: 'کیف پول',
                    id: 5
                  },
                  transactiongateway: null,
                  transactionstatus: {
                    name: 'موفق',
                    id: 3
                  },
                  created_at: '2022-10-23 09:53:29',
                  completed_at: '2022-10-23 13:23:29',
                  deadline_at: null
                }
              ],
              pending_transactions: null,
              unpaid_transaction: null,
              posting_info: null,
              user: {
                id: 2,
                first_name: 'mitra',
                last_name: 'zolfi',
                mobile: '09388131193',
                national_code: '4900443050',
                profile_completion: 66
              },
              created_at: '2022-10-23 09:53:07',
              completed_at: '2022-10-23 13:23:29'
            },
            {
              id: 1843917,
              discount: 0,
              customer_description: null,
              price: 3705000,
              paid_price: 3705000,
              refund_price: 0,
              debt: 0,
              orderstatus: {
                id: 2,
                name: 'ثبت نهایی'
              },
              paymentstatus: {
                id: 3,
                name: 'پرداخت شده'
              },
              orderproducts: [
                {
                  id: 2309416,
                  quantity: 1,
                  type: 1,
                  product: {
                    id: 794,
                    redirect_url: null,
                    type: 1,
                    category: 'همایش',
                    title: 'پک تجربی فوریت کنکور 110 آلاء',
                    is_free: 0,
                    url: {
                      web: 'http://127.0.0.1/product/794',
                      api: 'http://127.0.0.1/api/v2/product/794'
                    },
                    photo: 'https://nodes.alaatv.com/upload/images/product/12_20220818095500.jpg',
                    attributes: {
                      info: {
                        teacher: [
                          'گروه آموزشی'
                        ],
                        shipping_method: [
                          'دانلودی'
                        ],
                        major: [
                          'تجربی'
                        ],
                        services: [
                          'فیلم',
                          'جزوه'
                        ],
                        download_date: [
                          'پیش فروش'
                        ],
                        educational_system: [
                          'نظام جدید'
                        ],
                        duration: [
                          'در حال تولید'
                        ],
                        production_year: [
                          'کنکور 1401'
                        ]
                      },
                      extra: null,
                      subscription: null
                    },
                    redirect_code: null
                  },
                  grand: null,
                  price: {
                    discountDetail: {
                      productDiscount: 35,
                      bonDiscount: 0,
                      productDiscountAmount: 0
                    },
                    extraCost: 0,
                    base: 5700000,
                    discount: 1995000,
                    final: 3705000
                  },
                  photo: 'https://nodes.alaatv.com/upload/images/product/12_20220818095500.jpg',
                  extra_attributes: null
                }
              ],
              coupon_info: null,
              successful_transactions: [
                {
                  wallet_id: 289876,
                  order_id: 1843917,
                  cost: 3705000,
                  transactionID: null,
                  trace_number: null,
                  refrence_number: null,
                  paycheck_number: null,
                  paymentmethod: {
                    name: 'wallet',
                    display_name: 'کیف پول',
                    id: 5
                  },
                  transactiongateway: null,
                  transactionstatus: {
                    name: 'موفق',
                    id: 3
                  },
                  created_at: '2022-10-23 09:53:07',
                  completed_at: '2022-10-23 13:23:07',
                  deadline_at: null
                }
              ],
              pending_transactions: null,
              unpaid_transaction: null,
              posting_info: null,
              user: {
                id: 2,
                first_name: 'mitra',
                last_name: 'zolfi',
                mobile: '09388131193',
                national_code: '4900443050',
                profile_completion: 66
              },
              created_at: '2022-10-23 09:52:24',
              completed_at: '2022-10-23 13:23:07'
            },
            {
              id: 1843916,
              discount: 0,
              customer_description: null,
              price: 4550000,
              paid_price: 4550000,
              refund_price: 0,
              debt: 0,
              orderstatus: {
                id: 2,
                name: 'ثبت نهایی'
              },
              paymentstatus: {
                id: 3,
                name: 'پرداخت شده'
              },
              orderproducts: [
                {
                  id: 2309412,
                  quantity: 1,
                  type: 1,
                  product: {
                    id: 445,
                    redirect_url: null,
                    type: 1,
                    category: 'VIP',
                    title: 'پک اختصاصی راه ابریشم رشته تجربی آلاء',
                    is_free: 0,
                    url: {
                      web: 'http://127.0.0.1/product/445',
                      api: 'http://127.0.0.1/api/v2/product/445'
                    },
                    photo: 'https://nodes.alaatv.com/upload/images/product/11_20220709061521.jpg',
                    attributes: {
                      info: {
                        teacher: [
                          'گروه آموزشی'
                        ],
                        shipping_method: [
                          'دانلودی'
                        ],
                        major: [
                          'تجربی'
                        ],
                        services: null,
                        download_date: [
                          'از لحظه خرید'
                        ],
                        educational_system: [
                          'نظام جدید'
                        ],
                        duration: [],
                        production_year: [
                          'ویژه کنکور 1402'
                        ]
                      },
                      extra: null,
                      subscription: null
                    },
                    redirect_code: null
                  },
                  grand: null,
                  price: {
                    discountDetail: {
                      productDiscount: 30,
                      bonDiscount: 0,
                      productDiscountAmount: 0
                    },
                    extraCost: 0,
                    base: 6500000,
                    discount: 1950000,
                    final: 4550000
                  },
                  photo: 'https://nodes.alaatv.com/upload/images/product/11_20220709061521.jpg',
                  extra_attributes: null
                },
                {
                  id: 2309413,
                  quantity: 1,
                  type: 3,
                  product: {
                    id: 347,
                    redirect_url: null,
                    type: 1,
                    category: 'VIP',
                    title: 'راه ابریشم ریاضی تجربی آلاء',
                    is_free: 0,
                    url: {
                      web: 'http://127.0.0.1/product/347',
                      api: 'http://127.0.0.1/api/v2/product/347'
                    },
                    photo: 'https://nodes.alaatv.com/upload/images/product/2_20220709061554.jpg',
                    attributes: {
                      info: {
                        teacher: [
                          'محمد صادق ثابتی'
                        ],
                        shipping_method: [
                          'دانلودی'
                        ],
                        major: [
                          'تجربی'
                        ],
                        services: [
                          'کلاس پیش نیاز',
                          'کلاس جامع کنکور',
                          'کلاس تست جامع کنکور',
                          'برنامه مطالعاتی'
                        ],
                        download_date: [
                          'از لحظه خرید'
                        ],
                        educational_system: [
                          'نظام جدید'
                        ],
                        duration: [],
                        production_year: [
                          'ویژه کنکور 1402'
                        ]
                      },
                      extra: null,
                      subscription: null
                    },
                    redirect_code: null
                  },
                  grand: null,
                  price: {
                    discountDetail: {
                      productDiscount: 0,
                      bonDiscount: 0,
                      productDiscountAmount: 0
                    },
                    extraCost: 0,
                    base: 1500000,
                    discount: 0,
                    final: 1500000
                  },
                  photo: 'https://nodes.alaatv.com/upload/images/product/2_20220709061554.jpg',
                  extra_attributes: null
                },
                {
                  id: 2309414,
                  quantity: 1,
                  type: 3,
                  product: {
                    id: 442,
                    redirect_url: null,
                    type: 1,
                    category: 'VIP',
                    title: 'راه ابریشم زیست شناسی آلاء',
                    is_free: 0,
                    url: {
                      web: 'http://127.0.0.1/product/442',
                      api: 'http://127.0.0.1/api/v2/product/442'
                    },
                    photo: 'https://nodes.alaatv.com/upload/images/product/6_20220709061743.jpg',
                    attributes: {
                      info: {
                        teacher: [
                          'جلال موقاری'
                        ],
                        shipping_method: [
                          'دانلودی'
                        ],
                        major: [
                          'تجربی'
                        ],
                        services: [
                          'کلاس پیش نیاز',
                          'کلاس جامع کنکور',
                          'کلاس تست جامع کنکور',
                          'برنامه مطالعاتی'
                        ],
                        download_date: [
                          'از لحظه خرید'
                        ],
                        educational_system: [
                          'نظام جدید'
                        ],
                        duration: [],
                        production_year: [
                          'ویژه کنکور 1402'
                        ]
                      },
                      extra: null,
                      subscription: null
                    },
                    redirect_code: null
                  },
                  grand: null,
                  price: {
                    discountDetail: {
                      productDiscount: 0,
                      bonDiscount: 0,
                      productDiscountAmount: 0
                    },
                    extraCost: 0,
                    base: 2000000,
                    discount: 0,
                    final: 2000000
                  },
                  photo: 'https://nodes.alaatv.com/upload/images/product/6_20220709061743.jpg',
                  extra_attributes: null
                },
                {
                  id: 2309415,
                  quantity: 1,
                  type: 3,
                  product: {
                    id: 443,
                    redirect_url: null,
                    type: 1,
                    category: 'VIP',
                    title: 'راه ابریشم شیمی آلاء',
                    is_free: 0,
                    url: {
                      web: 'http://127.0.0.1/product/443',
                      api: 'http://127.0.0.1/api/v2/product/443'
                    },
                    photo: 'https://nodes.alaatv.com/upload/images/product/5_20220709061529.jpg',
                    attributes: {
                      info: {
                        teacher: [
                          'حامد پویان نظر'
                        ],
                        shipping_method: [
                          'دانلودی'
                        ],
                        major: [
                          'ریاضی',
                          'تجربی'
                        ],
                        services: [
                          'فیلم',
                          'جزوه',
                          'درسنامه',
                          'تست',
                          'کنکورچه',
                          'پیش آزمون و پس آزمون گزینه دو',
                          'پیش آزمون و پس آزمون قلمچی',
                          'چاپار'
                        ],
                        download_date: [
                          'از لحظه خرید'
                        ],
                        educational_system: [
                          'نظام جدید'
                        ],
                        duration: [],
                        production_year: [
                          '00-01'
                        ]
                      },
                      extra: null,
                      subscription: null
                    },
                    redirect_code: null
                  },
                  grand: null,
                  price: {
                    discountDetail: {
                      productDiscount: 0,
                      bonDiscount: 0,
                      productDiscountAmount: 0
                    },
                    extraCost: 0,
                    base: 1500000,
                    discount: 0,
                    final: 1500000
                  },
                  photo: 'https://nodes.alaatv.com/upload/images/product/5_20220709061529.jpg',
                  extra_attributes: null
                }
              ],
              coupon_info: null,
              successful_transactions: [
                {
                  wallet_id: 289876,
                  order_id: 1843916,
                  cost: 4550000,
                  transactionID: null,
                  trace_number: null,
                  refrence_number: null,
                  paycheck_number: null,
                  paymentmethod: {
                    name: 'wallet',
                    display_name: 'کیف پول',
                    id: 5
                  },
                  transactiongateway: null,
                  transactionstatus: {
                    name: 'موفق',
                    id: 3
                  },
                  created_at: '2022-10-23 09:52:23',
                  completed_at: '2022-10-23 13:22:23',
                  deadline_at: null
                }
              ],
              pending_transactions: null,
              unpaid_transaction: null,
              posting_info: null,
              user: {
                id: 2,
                first_name: 'mitra',
                last_name: 'zolfi',
                mobile: '09388131193',
                national_code: '4900443050',
                profile_completion: 66
              },
              created_at: '2022-10-23 09:47:55',
              completed_at: '2022-10-23 13:22:23'
            }
          ])
          this.orderLoading = false
        }
      )
    },
    checkLoadInputData() {
      this.userMessageArray = this.getInputsValue('messages')
      // for test
      // this.userMessageArray = [
      //   {
      //     id: 258407,
      //     user: {
      //       id: 1597775,
      //       first_name: null,
      //       last_name: null,
      //       mobile: '09394646357',
      //       national_code: '0169295869',
      //       photo: 'https://nodes.alaatv.com/upload/images/profile/default_avatar.jpg',
      //       role: 'کاربر',
      //       major: null
      //     },
      //     ticket_id: 91105,
      //     body: 'فرمودید که بالاترین کدی که گرفتیم تو سایت ذخیره شده حالا میگید امکان بررسی نیست؟<br/>یه کلمه بگید سرکارمون گزاشتید و بیش از این به شعور بنده توهین نکنید',
      //     files: {
      //       photo: null,
      //       voice: null
      //     },
      //     is_private: 0,
      //     report: {
      //       has_reported: 0,
      //       report_description: null
      //     },
      //     created_at: '2022-01-21 02:07:49'
      //   },
      //   {
      //     id: 255832,
      //     user: {
      //       id: 947310,
      //       first_name: 'مریم',
      //       last_name: 'بسامی',
      //       mobile: '09362905164',
      //       national_code: '3341725423',
      //       photo: 'https://nodes.alaatv.com/upload/images/profile/IMG_20210602_234125_115_4480832.jpg',
      //       role: 'پشتیبان',
      //       major: {
      //         id: 1,
      //         name: 'ریاضی',
      //         title: 'ریاضی',
      //         selected: false
      //       }
      //     },
      //     ticket_id: 91105,
      //     body: 'سلام دوست عزیز<br/>ما امکان بررسی مجدد کدها رو نداریم . حال حاضر فقط یک کد دیگه داریم که ۵۰ درصده برای تک درس و پک راه ابریشم و تا ۵ بهمن مهلت استفاده داره <br/>Z5050',
      //     files: {
      //       photo: null,
      //       voice: null
      //     },
      //     is_private: 0,
      //     report: {
      //       has_reported: 0,
      //       report_description: null
      //     },
      //     created_at: '2022-01-15 14:25:40'
      //   },
      //   {
      //     id: 255212,
      //     user: {
      //       id: 1597775,
      //       first_name: null,
      //       last_name: null,
      //       mobile: '09394646357',
      //       national_code: '0169295869',
      //       photo: 'https://nodes.alaatv.com/upload/images/profile/default_avatar.jpg',
      //       role: 'کاربر',
      //       major: null
      //     },
      //     ticket_id: 91105,
      //     body: 'بله فرمودید منم عرض کردم این کد بردن پیامک شده<br/>ولی وقتی میزنم سایت اعمال نمیکنه<br/>اکانتمم همینه و با همین کد گرفتم و برام پیامک شده',
      //     files: {
      //       photo: null,
      //       voice: null
      //     },
      //     is_private: 0,
      //     report: {
      //       has_reported: 0,
      //       report_description: null
      //     },
      //     created_at: '2022-01-14 02:23:47'
      //   },
      //   {
      //     id: 254284,
      //     user: {
      //       id: 792218,
      //       first_name: 'علیرضا',
      //       last_name: 'برومند',
      //       mobile: '09913605740',
      //       national_code: '0024206881',
      //       photo: 'https://nodes.alaatv.com/upload/images/profile/default_avatar.jpg',
      //       role: 'پشتیبان',
      //       major: {
      //         id: 2,
      //         name: 'تجربی',
      //         title: 'تجربی',
      //         selected: true
      //       }
      //     },
      //     ticket_id: 91105,
      //     body: 'بالاترین کد تخفیفی که در سیستم ثبت شده به شماره ای که کد گرفتی پیامک شده و مجدد قابل بررسی نیست . برای استفاده از کد جدید باید حتما با همون اکانتی وارد بشی که باهاش کد گرفتی.',
      //     files: {
      //       photo: null,
      //       voice: null
      //     },
      //     is_private: 0,
      //     report: {
      //       has_reported: 0,
      //       report_description: null
      //     },
      //     created_at: '2022-01-12 08:30:29'
      //   },
      //   {
      //     id: 254108,
      //     user: {
      //       id: 1597775,
      //       first_name: null,
      //       last_name: null,
      //       mobile: '09394646357',
      //       national_code: '0169295869',
      //       photo: 'https://nodes.alaatv.com/upload/images/profile/default_avatar.jpg',
      //       role: 'کاربر',
      //       major: null
      //     },
      //     ticket_id: 91105,
      //     body: 'ببخشید متوجه نمیشم<br/>این کد فکر میکنم هفته پیش برام پیامک شد.<br/>و قرار شد که از این کدی که تو شب چله برنده شدیم بتونیم استفاده کنیم.',
      //     files: {
      //       photo: null,
      //       voice: null
      //     },
      //     is_private: 0,
      //     report: {
      //       has_reported: 0,
      //       report_description: null
      //     },
      //     created_at: '2022-01-11 16:20:04'
      //   },
      //   {
      //     id: 254039,
      //     user: {
      //       id: 792218,
      //       first_name: 'علیرضا',
      //       last_name: 'برومند',
      //       mobile: '09913605740',
      //       national_code: '0024206881',
      //       photo: 'https://nodes.alaatv.com/upload/images/profile/default_avatar.jpg',
      //       role: 'پشتیبان',
      //       major: {
      //         id: 2,
      //         name: 'تجربی',
      //         title: 'تجربی',
      //         selected: true
      //       }
      //     },
      //     ticket_id: 91105,
      //     body: 'کد های قبلی قابل بررسی نیستن می تونین از کد جدید استفاده کنین',
      //     files: {
      //       photo: null,
      //       voice: null
      //     },
      //     is_private: 0,
      //     report: {
      //       has_reported: 0,
      //       report_description: null
      //     },
      //     created_at: '2022-01-11 14:50:12'
      //   },
      //   {
      //     id: 254032,
      //     user: {
      //       id: 1597775,
      //       first_name: null,
      //       last_name: null,
      //       mobile: '09394646357',
      //       national_code: '0169295869',
      //       photo: 'https://nodes.alaatv.com/upload/images/profile/default_avatar.jpg',
      //       role: 'کاربر',
      //       major: null
      //     },
      //     ticket_id: 91105,
      //     body: 'c4y7kz<br/>این کد برام پیامک شده',
      //     files: {
      //       photo: null,
      //       voice: null
      //     },
      //     is_private: 0,
      //     report: {
      //       has_reported: 0,
      //       report_description: null
      //     },
      //     created_at: '2022-01-11 14:44:28'
      //   },
      //   {
      //     id: 254031,
      //     user: {
      //       id: 1597775,
      //       first_name: null,
      //       last_name: null,
      //       mobile: '09394646357',
      //       national_code: '0169295869',
      //       photo: 'https://nodes.alaatv.com/upload/images/profile/default_avatar.jpg',
      //       role: 'کاربر',
      //       major: null
      //     },
      //     ticket_id: 91105,
      //     body: 'بله پیامک شده ولی وقتی میزنمش قبول نمیکنه',
      //     files: {
      //       photo: null,
      //       voice: null
      //     },
      //     is_private: 0,
      //     report: {
      //       has_reported: 0,
      //       report_description: null
      //     },
      //     created_at: '2022-01-11 14:43:46'
      //   },
      //   {
      //     id: 253952,
      //     user: {
      //       id: 792218,
      //       first_name: 'علیرضا',
      //       last_name: 'برومند',
      //       mobile: '09913605740',
      //       national_code: '0024206881',
      //       photo: 'https://nodes.alaatv.com/upload/images/profile/default_avatar.jpg',
      //       role: 'پشتیبان',
      //       major: {
      //         id: 2,
      //         name: 'تجربی',
      //         title: 'تجربی',
      //         selected: true
      //       }
      //     },
      //     ticket_id: 91105,
      //     body: 'سلام دوست عزیز<br/>بالاترین کد تخفیفی که در سیستم ثبت شده به شماره ای که کد گرفتی پیامک شده و مجدد قابل بررسی نیست . برای استفاده از کد جدید باید حتما با همون اکانتی وارد بشی که باهاش کد گرفتی. <br/>در حال حاضر فقط یک کد دیگه داریم که ۵۰ درصده برای تک درس و پک راه ابریشم و تا ۵ بهمن مهلت استفاده داره <br/>Z5050',
      //     files: {
      //       photo: null,
      //       voice: null
      //     },
      //     is_private: 0,
      //     report: {
      //       has_reported: 0,
      //       report_description: null
      //     },
      //     created_at: '2022-01-11 13:02:17'
      //   },
      //   {
      //     id: 253928,
      //     user: {
      //       id: 1597775,
      //       first_name: null,
      //       last_name: null,
      //       mobile: '09394646357',
      //       national_code: '0169295869',
      //       photo: 'https://nodes.alaatv.com/upload/images/profile/default_avatar.jpg',
      //       role: 'کاربر',
      //       major: null
      //     },
      //     ticket_id: 91105,
      //     body: 'کد تخفیف شب چله بود <br/>c4y7kz',
      //     files: {
      //       photo: null,
      //       voice: null
      //     },
      //     is_private: 0,
      //     report: {
      //       has_reported: 0,
      //       report_description: null
      //     },
      //     created_at: '2022-01-11 12:43:33'
      //   },
      //   {
      //     id: 253661,
      //     user: {
      //       id: 792218,
      //       first_name: 'علیرضا',
      //       last_name: 'برومند',
      //       mobile: '09913605740',
      //       national_code: '0024206881',
      //       photo: 'https://nodes.alaatv.com/upload/images/profile/default_avatar.jpg',
      //       role: 'پشتیبان',
      //       major: {
      //         id: 2,
      //         name: 'تجربی',
      //         title: 'تجربی',
      //         selected: true
      //       }
      //     },
      //     ticket_id: 91105,
      //     body: 'سلام وقتتون بخیر <br/>چه کد تخفیفی ؟',
      //     files: {
      //       photo: null,
      //       voice: null
      //     },
      //     is_private: 0,
      //     report: {
      //       has_reported: 0,
      //       report_description: null
      //     },
      //     created_at: '2022-01-11 08:06:45'
      //   },
      //   {
      //     id: 253462,
      //     user: {
      //       id: 1597775,
      //       first_name: null,
      //       last_name: null,
      //       mobile: '09394646357',
      //       national_code: '0169295869',
      //       photo: 'https://nodes.alaatv.com/upload/images/profile/default_avatar.jpg',
      //       role: 'کاربر',
      //       major: null
      //     },
      //     ticket_id: 91105,
      //     body: 'سلام<br/>ببخشید کد تخفیفم رو وارد میکنم سایت لحاظ نمیکنه',
      //     files: {
      //       photo: null,
      //       voice: null
      //     },
      //     is_private: 0,
      //     report: {
      //       has_reported: 0,
      //       report_description: null
      //     },
      //     created_at: '2022-01-10 16:38:09'
      //   }
      // ]

      this.userId = this.getInputsValue('userId')
      if (!this.isAdmin) {
        return
      }
      this.filterDataForUserRole()
    },
    openCloseLogDrawer() {
      this.logDrawer = this.logDrawer === false
    },
    sendTicketStatusNotice(ticketId) {
      this.$axios.post(API_ADDRESS.ticket.show.statusNotice(ticketId))
        .then((res) => {
          this.$q.notify({
            message: res.data.message,
            type: 'positive'
          })
        })
    }
  }
}
</script>

<style scoped>
.tab-panels {
  background: rgb(250, 250, 250);
}

.close-btn {
  width: 100%;
  border-radius: 0;
  color: #212529;
  background: #fbaa00;
}

.other-ticket {
  display: flex;
}

.other-ticket .right-side-squere {
  border: solid 3px #34bfa3;
  border-radius: 100px;
  margin-right: 16px;
}

.other-ticket .link-btn {
  color: #333;
}

.other-ticket .time {
  color: #a6a7c1;
  opacity: 0.5;
}
</style>

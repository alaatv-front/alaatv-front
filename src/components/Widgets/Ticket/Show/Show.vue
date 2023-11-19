<template>
  <div class="row  justify-center">
    <div class="col-12 q-mb-xl">
      <entity-edit v-if="isEntityReady"
                   ref="entityEdit"
                   v-model:value="inputs"
                   :show-save-button="false"
                   :show-close-button="false"
                   :title="'شماره تیکت ' + getInputsValue('id') + ' در ' + getInputsValue('department_title')"
                   :api="api"
                   entity-id-key="id"
                   entity-param-key="id"
                   :show-route-name="options.indexRouteName"
                   :after-load-input-data="checkLoadInputData">
        <template #before-form-builder>
          <div class="flex justify-around q-mb-md">
            <q-btn rounded
                   color="blue"
                   icon="isax:archive-book"
                   @click="openCloseLogDrawer">
              <q-tooltip>
                باز شدن لیست اتفاقات
              </q-tooltip>
            </q-btn>
            <q-btn v-if="isInAdminPage"
                   rounded
                   color="blue"
                   :loading="loading"
                   icon="isax:shopping-cart"
                   @click="openShopLogList">
              <q-tooltip>
                باز شدن لیست خرید
              </q-tooltip>
            </q-btn>
            <q-btn rounded
                   color="blue"
                   :loading="loading"
                   icon="isax:document4"
                   :to="ticketListRoute">
              <q-tooltip>
                بازگشت به صفحه لیست تیکت ها
              </q-tooltip>
            </q-btn>
          </div>
          <div v-if="isInAdminPage"
               class="row q-my-lg q-col-gutter-md">
            <div class="col-4">
              <q-btn unelevated
                     class="full-width"
                     icon="isax:user"
                     :loading="loading"
                     :to="'/user/'+getInputsValue('userId')+'/edit'"
                     target="_blank"
                     color="blue">
                <q-tooltip>ویرایش اطلاعات کاربر</q-tooltip>
              </q-btn>
            </div>
            <div class="col-4">
              <q-btn unelevated
                     class="full-width"
                     :loading="loading"
                     icon="isax:edit"
                     color="blue"
                     @click="updateTicketData(getInputsValue('id'))">
                <q-tooltip>ویرایش اطلاعات تیکت</q-tooltip>
              </q-btn>
            </div>
            <div class="col-4">
              <q-btn unelevated
                     class="full-width"
                     icon="isax:sms"
                     color="blue"
                     :loading="loading"
                     @click="sendTicketStatusNotice(getInputsValue('id'))">
                <q-tooltip>ارسال پیامک اگاه سازی تغییر وضعیت</q-tooltip>
              </q-btn>
            </div>
          </div>
        </template>
        <template #after-form-builder>
          <q-expansion-item v-if="isInAdminPage"
                            v-model="updateUserTem"
                            label="تغییر کاربر"
                            class="q-my-lg rounded-borders">
            <q-card>
              <q-card-section>
                <div class="row q-col-gutter-md">
                  <div class="col-5">
                    <q-input v-model="phoneNumber"
                             outlined
                             label="شماره تلفن" />
                  </div>
                  <div class="col-5">
                    <q-input v-model="nationalCode"
                             outlined
                             label="کد ملی" />
                  </div>
                  <div class="col-2">
                    <q-btn color="primary"
                           unelevated
                           :loading="loading"
                           padding="5px 20px"
                           label="برسی"
                           @click="getUserInfo" />
                  </div>
                  <template v-if="user.id">
                    <div class="col-3 flex">
                      <span class="q-mr-sm">  کد :</span>
                      {{user.id}}
                    </div>
                    <div class="col-3 flex">
                      <span class="q-mr-sm">  نام :</span>
                      {{user.first_name}}
                    </div>
                    <div class="col-4 flex">
                      <span class="q-mr-sm">  نام خانوادگی :</span>
                      {{user.last_name}}
                    </div>
                    <div class="col-2">
                      <q-btn unelevated
                             color="positive"
                             label="تغییر کاربر"
                             @click="changeUser" />
                    </div>
                  </template>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <!--          <change-user @changeUser="ChangeUser" />-->
          <div v-if="isInAdminPage">
            <!--            <q-btn unelevated-->
            <!--                   color="blue"-->
            <!--                   :loading="loading"-->
            <!--                   @click="editAssignedSupporters">ویرایش اپراتورها-->
            <!--            </q-btn>-->
          </div>
          <ticket-rate v-if="!isInAdminPage"
                       :rate="getInputsValue('rate')"
                       :ticket-id="getInputsValue('id')"
                       class="q-ml-lg q-mt-lg" />
        </template>
      </entity-edit>
      <messages v-for="(item, index) in userMessageArray"
                :key="index"
                :is-user-admin="isInAdminPage"
                :data="item" />
      <send-message-input ref="SendMessageInput"
                          class="q-my-lg"
                          :isAdmin="isInAdminPage"
                          :send-loading="loading"
                          @creatTicket="sendTicketMessage" />
      <drawer :is-open="logDrawer"
              max-width="310px"
              side="left">
        <q-scroll-area class="fit">
          <q-btn icon="close"
                 unelevated
                 class="close-btn"
                 @click="logDrawer = false" />
          <div class="q-my-md flex content-between">
            <q-tabs v-model="panel"
                    dense
                    class="text-grey"
                    active-color="primary"
                    indicator-color="primary"
                    align="justify"
                    narrow-indicator>
              <q-tab name="events"
                     label="رویداد ها" />
              <q-tab v-if="isInAdminPage"
                     name="otherTickets"
                     label="تیکت های دیگر کاربر" />
            </q-tabs>
          </div>
          <q-tab-panels v-model="panel"
                        class="tab-panels"
                        animated>
            <q-tab-panel name="events">
              <log-list :log-array="logList" />
            </q-tab-panel>
            <q-tab-panel name="otherTickets">
              <template v-for="ticket in getInputsValue('otherTickets')"
                        :key="ticket">
                <div class="other-ticket">
                  <div class="right-side-squere" />
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
      <drawer :is-open="orderDrawer"
              max-width="1016px">
        <q-scroll-area class="fit">
          <q-btn icon="close"
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
import { User } from 'src/models/User.js'
import { APIGateway } from 'src/api/APIGateway'
import Drawer from 'src/components/CustomDrawer.vue'
import LogList from 'src/components/Ticket/LogList.vue'
import Messages from 'src/components/Ticket/Messages.vue'
import TicketRate from 'src/components/Ticket/TicketRate.vue'
import UserOrderList from 'src/components/Ticket/userOrderList.vue'
import { mixinTicket, mixinWidget } from 'src/mixin/Mixins.js'
import SendMessageInput from 'src/components/Ticket/SendMessageInput.vue'

export default {
  name: 'Show',
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
  mixins: [mixinTicket, mixinWidget],
  props: {
    options: {
      type: Object,
      default () {
        return {
          indexRouteName: ''
        }
      }
    }
  },
  data () {
    return {
      logList: [],
      isEntityReady: false,
      sendLoading: false,
      updateUserTem: false,
      phoneNumber: null,
      nationalCode: null,
      user: new User(),
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
      api: APIGateway.ticket.APIAdresses.base,
      inputs: [],
      userInputs: [
        { type: 'input', name: 'title', responseKey: 'ticket.title', label: 'عنوان', col: 'col-md-4 col-sm-6 col-xs-12', disable: true },
        {
          type: 'input',
          name: 'first_name',
          responseKey: 'ticket.user.first_name',
          label: 'نام',
          col: 'col-md-4 col-sm-6 col-xs-12',
          disable: true
        },
        {
          type: 'input',
          name: 'last_name',
          responseKey: 'ticket.user.last_name',
          label: 'نام خانوادگی',
          col: 'col-md-4 col-sm-6 col-xs-12',
          disable: true
        },
        {
          type: 'input',
          name: 'priority',
          responseKey: 'ticket.priority.title',
          label: 'اولویت',
          col: 'col-md-4 col-sm-6 col-xs-12',
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
          disable: true,
          col: 'col-md-4 col-sm-6 col-xs-12'
        },
        {
          type: 'select',
          name: 'status',
          options: [],
          optionLabel: 'title',
          optionValue: 'id',
          responseKey: 'ticket.status.id',
          label: 'وضعیت',
          disable: true,
          col: 'col-md-4 col-sm-6 col-xs-12'
        },
        {
          type: 'dateTime',
          name: 'created_at',
          responseKey: 'ticket.created_at',
          calendarIcon: ' ',
          label: 'تاریخ ایجاد',
          col: 'col-md-4 col-sm-6 col-xs-12',
          disable: true
        },
        {
          type: 'dateTime',
          name: 'created_at',
          responseKey: 'ticket.updated_at',
          calendarIcon: ' ',
          label: 'تاریخ بروز آوری:',
          col: 'col-md-4 col-sm-6 col-xs-12',
          disable: true
        },
        { type: 'hidden', name: 'id', responseKey: 'ticket.id', placeholder: 'id' },
        { type: 'hidden', name: 'department_title', responseKey: 'ticket.department.title' },
        { type: 'hidden', name: 'messages', responseKey: 'ticket.messages' },
        { type: 'hidden', name: 'img', responseKey: 'ticket.user.photo' },
        { type: 'hidden', name: 'logs', responseKey: 'ticket.logs' },
        { type: 'hidden', name: 'userId', responseKey: 'ticket.user.id' },
        { type: 'hidden', name: 'otherTickets', responseKey: 'other_tickets' },
        { type: 'hidden', name: 'priority-id', responseKey: 'ticket.priority.id' },
        { type: 'hidden', name: 'rate', responseKey: 'ticket.rate' }
      ],
      adminInputs: [
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
          calendarIcon: ' ',
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
          calendarIcon: ' ',
          label: 'تاریخ بروز آوری:',
          col: 'col-md-4',
          disable: true
        },
        { type: 'hidden', name: 'id', responseKey: 'ticket.id', placeholder: 'id' },
        { type: 'hidden', name: 'department_title', responseKey: 'ticket.department.title' },
        { type: 'hidden', name: 'messages', responseKey: 'ticket.messages' },
        { type: 'hidden', name: 'img', responseKey: 'ticket.user.photo' },
        { type: 'hidden', name: 'logs', responseKey: 'ticket.logs' },
        { type: 'hidden', name: 'userId', responseKey: 'ticket.user.id' },
        { type: 'hidden', name: 'otherTickets', responseKey: 'other_tickets' },
        { type: 'hidden', name: 'priority-id', responseKey: 'ticket.priority.id' },
        { type: 'hidden', name: 'rate', responseKey: 'ticket.rate' },
        {
          isInAdminPage: true,
          type: 'entity',
          name: 'management',
          selectionMode: 'single',
          popUpButtonConfig: {
            unelevated: true,
            color: 'blue',
            textColor: 'white',
            badgeColor: 'primary',
            label: 'انتخاب کاربر'
          },
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
          value: null,
          responseKey: 'ticket.user',
          itemIdentifyKey: 'mobile',
          selected: null,
          col: 'col-md-4'
        }
        // {
        //   type: 'entity',
        //   name: 'editOperator', // assignees
        //   selectionMode: 'multiple',
        //   popUpButtonConfig: {
        //     unelevated: true,
        //     color: 'blue',
        //     textColor: 'white',
        //     badgeColor: 'primary',
        //     label: 'انتخاب اپراتورها'
        //   },
        //   indexConfig: {
        //     apiAddress: 'https://reqres.in/api/users',
        //     tableTitle: 'لیست کاربران',
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
        //       { type: 'input', name: 'mobile', value: null, placeholder: 'شماره تلفن', col: 'col-md-6' },
        //       { type: 'input', name: 'national_code', value: null, placeholder: 'کدملی', col: 'col-md-6' },
        //       { type: 'hidden', name: 'role', value: 123, placeholder: 'نقش', col: 'col-md-3' }
        //     ],
        //     itemIdentifyKey: 'id',
        //     itemIndicatorKey: 'id'
        //   },
        //   itemIdentifyKey: 'id',
        //   itemIndicatorKey: 'id',
        //   value: [],
        //   responseKey: 'ticket.assignees',
        //   selected: [],
        //   col: 'col-md-6'
        // }
      ]
    }
  },
  computed: {
    isInAdminPage () {
      return !!this.$route.name.includes('Admin')
    },
    editAssignInput () {
      return this.inputs.find(item => item.name === 'editOperator')
    },
    ticketListRoute () {
      if (this.$route.name.includes('Admin')) {
        return { name: 'Admin.Ticket.Index' }
      }
      return { name: 'UserPanel.Ticket.Index' }
    }
  },
  watch: {
    departmentList (newVal) {
      this.getInput('department').options = newVal.list
    },
    ticketStatuses (newVal) {
      this.getInput('status').options = newVal
    }
  },
  created () {
    this.api += '/' + this.$route.params.id
  },
  methods: {
    async setInputs () {
      const ticketFields = await this.getTicketData()
      this.getInput('department').options = ticketFields.departments.list
      this.getInput('status').options = ticketFields.statuses.list
    },
    async initTicket () {
      this.setEntityValues()
      await this.setInputs()
      this.isEntityReady = true
    },
    setEntityValues () {
      if (this.$route.name.includes('Admin')) {
        this.inputs = this.adminInputs
        return
      }
      this.inputs = this.userInputs
    },
    async editAssignedSupporters () {
      const usersId = []
      this.editAssignInput.selected.forEach(item => {
        usersId.push(item.id)
      })
      try {
        this.loading = true
        await this.$apiGateway.ticket.editTicketAssignedSupporters(this.getInputsValue('id'), { assign: usersId })
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    },

    filterDataForUserRole () {
      this.inputs = this.inputs.filter(input => !input.isInAdminPage)
    },

    getLogsInputValue () {
      return this.getInputsValue('logs')
    },
    openShopLogList () {
      this.orderDrawer = this.orderDrawer === false
      this.orderLoading = true
      this.$apiGateway.user.ordersById({
        data: {
          userId: this.userId
        }
      })
        .then(response => {
          this.userOrderData = response.cartItemList
          this.orderLoading = false
        }
        )
        .catch(() => {
          this.orderLoading = false
        })
    },
    checkLoadInputData () {
      this.logList = this.getLogsInputValue()
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
      if (!this.isInAdminPage) {
        return
      }
      this.filterDataForUserRole()
    },
    openCloseLogDrawer () {
      this.logDrawer = this.logDrawer === false
    },
    async sendTicketStatusNotice (ticketId) {
      const res = await this.$apiGateway.ticket.sendTicketStatusNotice(ticketId)
      this.$q.notify({
        message: res.data.message,
        type: 'positive'
      })
    }
  }
}
</script>

<style scoped>
.tab-panels {
  background: rgb(250 250 250);
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

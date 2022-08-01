<template>
  <div class="row  justify-center">
    <div class="col-8"
         style="margin-bottom: 50px;">
      <entity-edit
        v-model:value="inputs"
        :title="'شماره تیکت ' + this.searchForInputVal('id') + ' در ' + this.searchForInputVal('department')"
        :api="api"
        :entity-id-key="entityIdKey"
        :entity-param-key="entityParamKey"
        :show-route-name="editRouteName"
        :after-load-input-data="checkLoadInputData"
      >
        <template #before-form-builder>
          <div style="display: flex; justify-content: center">
            <div style="justify-content: space-between; display: flex; width: 70%;">
              <q-btn rounded
                     color="blue"
                     icon="isax:archive-book"
                     @click="logDrawer = true">
                <q-tooltip>
                  باز شدن لیست اتفاقات
                </q-tooltip>
              </q-btn>
              <q-btn rounded
                     color="blue"
                     icon="isax:shopping-cart"
                     @click="openShopLogList">
                <q-tooltip>
                  باز شدن لیست خرید
                </q-tooltip>
              </q-btn>
            </div>
          </div>
        </template>
        <template #after-form-builder>
          <q-btn unelevated
                 color="blue">ویرایش اپراتورها</q-btn>
        </template>
      </entity-edit>
      <messages v-for="item in userMessageArray"
                :key="item"
                :data="item" />
      <q-drawer
        v-model="orderDrawer"
        side="right"
        width="1016"
        overlay
        bordered
        class="z-top"
      >
        <q-scroll-area class="fit">
          <q-btn icon="mdi-close"
                 class="close-btn"
                 unelevated
                 @click="orderDrawer = false" />
          <user-order-list :user-orders-list="userOrderData?.list"
                           :loading="orderLoading" />
        </q-scroll-area>
      </q-drawer>
      <q-drawer
        v-model="logDrawer"
        width="300"
        overlay
        bordered
        elevated
        class="z-top"
      >
        <q-scroll-area class="fit">
          <q-btn icon="mdi-close"
                 unelevated
                 class="close-btn"
                 @click="logDrawer = false" />
          <div style="display: flex; justify-content: center;"
               class="q-my-md">
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
              <q-tab name="otherTickets"
                     label="تیکت های دیگر کاربر" />
            </q-tabs>
          </div>
          <q-tab-panels v-model="panel"
                        animated>
            <q-tab-panel name="events">
              <log-list :log-array="searchForInputVal('logs')" />
            </q-tab-panel>
            <q-tab-panel name="otherTickets">
              <div v-for="ticket in searchForInputVal('otherTickets')"
                   class="other-ticket"
                   :key="ticket">
                <div class="right-side-squere"></div>
                <q-btn :to="'/ticket/'+ticket.id"
                       class="link-btn"
                       dense
                       flat>{{ticket.title}}</q-btn>
                <div>{{makeDateShamsi(ticket.created_at, 'time')}}</div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-scroll-area>
      </q-drawer>
    </div>
  </div>
</template>

<script>
import { EntityEdit, EntityAction } from 'quasar-crud'
import Messages from 'src/components/Messages'
import LogList from 'components/LogList'
import UserOrderList from 'components/userOrderList'
import API_ADDRESS from 'src/api/Addresses'
import { CartItemList } from 'src/models/CartItem'
import axios from 'axios'
import moment from 'moment-jalaali'

export default {
  name: 'Show',
  components: { EntityEdit, EntityAction, Messages, LogList, UserOrderList },
  data () {
    return {
      logDrawer: false,
      orderDrawer: false,
      orderLoading: false,
      panel: 'events',
      userOrderData: null,
      isDataLoaded: false,
      userFirstName: null,
      userLastName: null,
      userId: null,
      userMessageArray: null,
      userPhoto: null,
      expanded: true,
      api: API_ADDRESS.ticket.edit.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      editRouteName: 'Admin.Ticket.Index',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'ticket.title', label: 'عنوان', col: 'col-md-4', disable: true },
        { type: 'input', name: 'first_name', responseKey: 'ticket.user.first_name', label: 'نام', col: 'col-md-4', disable: true },
        { type: 'input', name: 'last_name', responseKey: 'ticket.user.last_name', label: 'نام خانوادگی', col: 'col-md-4', disable: true },
        { type: 'select', name: 'priority', responseKey: 'ticket.priority.title', label: 'اولویت', col: 'col-md-4', disable: true },
        { type: 'select', name: 'department', responseKey: 'ticket.department.title', label: 'گروه', col: 'col-md-4' },
        { type: 'select', name: 'status', responseKey: 'ticket.status.title', label: 'وضعیت', col: 'col-md-4' },
        { type: 'dateTime', name: 'created_at', responseKey: 'ticket.created_at', label: 'تاریخ ایجاد', col: 'col-md-4', disable: true },
        { type: 'input', name: 'national_code', responseKey: 'ticket.user.national_code', label: 'کد ملی', col: 'col-md-4', disable: true },
        { type: 'input', name: 'major', responseKey: 'ticket.user.major.name', label: 'رشته', col: 'col-md-4', disable: true },
        { type: 'dateTime', name: 'created_at', responseKey: 'ticket.updated_at', label: 'تاریخ بروز آوری:', col: 'col-md-4', disable: true },
        { type: 'hidden', name: 'id', responseKey: 'ticket.id', label: 'id' },
        { type: 'hidden', name: 'department', responseKey: 'ticket.department.title', label: 'department' },
        { type: 'hidden', name: 'messages', responseKey: 'ticket.messages', label: '' },
        { type: 'hidden', name: 'img', responseKey: 'ticket.user.photo', label: '' },
        { type: 'hidden', name: 'logs', responseKey: 'ticket.logs', label: '' },
        { type: 'hidden', name: 'userId', responseKey: 'ticket.user.id', label: '' },
        { type: 'hidden', name: 'otherTickets', responseKey: 'other_tickets', label: '' },
        {
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
            itemIdentifyKey: 'id',
            itemIndicatorKey: 'first_name'
          },
          value: [],
          responseKey: '',
          selected: [],
          col: 'col-md-4'
        },
        {
          type: 'entity',
          name: 'management',
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
            itemIndicatorKey: 'first_name'
          },
          value: [],
          responseKey: '',
          selected: [],
          col: 'col-md-12'
        }
      ]
    }
  },
  methods: {
    makeDateShamsi (date, mode) {
      if (mode === 'time') {
        return moment(date, 'HH:mm:ss').format('HH:mm:ss')
      } else {
        return moment(date, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss')
      }
    },
    searchForInputVal (name) {
      let value = null
      this.inputs.forEach((e) => {
        if (name === e.name) {
          if (e.value === undefined) {
            return false
          }
          value = e.value
        }
      })
      return value
    },
    openShopLogList () {
      this.orderDrawer = true
      this.orderLoading = true
      axios.get(API_ADDRESS.user.orders(this.userId)).then(
        response => {
          this.userOrderData = new CartItemList(response.data.data)
          console.log('orderData: ', this.userOrderData)
          this.orderLoading = false
        }
      )
        .catch(e => {
          console.log(e)
        })
    },
    checkLoadInputData () {
      this.isDataLoaded = true
    }
  },
  computed: {
  },
  watch: {
    isDataLoaded (newData, OldData) {
      if (this.isDataLoaded === true) {
        this.userFirstName = this.searchForInputVal('first_name')
        this.userLastName = this.searchForInputVal('last_name')
        this.userMessageArray = this.searchForInputVal('messages')
        this.userPhoto = this.searchForInputVal('img')
        this.userId = this.searchForInputVal('userId')
      }
    }
  },
  created () {
    this.api += '/' + this.$route.params.id
  }
}
</script>

<style scoped>
.close-btn {
  width: 100%;
  border-radius: 0;
  color: #212529;
  background: #fbaa00;
}
.other-ticket {
  height: 100%;
  border: solid 5px #34bfa3;
  border-radius: 100px;
}
.other-ticket .link-btn {
  color: #333;
}
</style>

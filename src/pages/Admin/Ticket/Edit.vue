<template>
  <div class="row">
    <div class="col-2"></div>
    <div class="col-8"
         style="margin-bottom: 50px;">
      <entity-edit
        v-model:value="inputs"
        :title="'شماره تیکت ' + this.ticketNumber"
        :api="api"
        :entity-id-key="entityIdKey"
        :entity-param-key="entityParamKey"
        :show-route-name="editRouteName"
        :after-load-input-data="checkLoadInputData"
      />
      <q-separator class="q-my-md" />
      <entity-action
        v-model:value="changeOperatorInputs"
        :form-title="'اپراتورهای تخصیص داده شده'"
        action-title="ویرایش اپراتورها"
        :action-method="'post'"
        action-api=""
      />
      <messages v-for="item in userMessageArray"
                :key="item"
                :data="item" />
    </div>
    <div class="col-2"></div>
  </div>
</template>

<script>
import { EntityEdit, EntityAction } from 'quasar-crud'
import Messages from 'src/components/Messages'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'Show',
  components: { EntityEdit, EntityAction, Messages },
  data () {
    return {
      isDataLoaded: false,
      userFirstName: null,
      userLastName: null,
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
        { type: 'input', name: 'created_at', responseKey: 'ticket.created_at', label: 'تاریخ ایجاد', col: 'col-md-4', disable: true },
        { type: 'input', name: 'national_code', responseKey: 'ticket.user.national_code', label: 'کد ملی', col: 'col-md-4', disable: true },
        { type: 'input', name: 'major', responseKey: 'ticket.user.major.name', label: 'رشته', col: 'col-md-4', disable: true },
        { type: 'input', name: 'created_at', responseKey: 'ticket.updated_at', label: 'تاریخ بروز آوری:', col: 'col-md-4', disable: true },
        { type: 'hidden', name: 'id', responseKey: 'ticket.id', label: 'id' },
        { type: 'hidden', name: 'messages', responseKey: 'ticket.messages', label: '' },
        { type: 'hidden', name: 'img', responseKey: 'ticket.user.photo', label: '' },
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
        }
      ],
      changeOperatorInputs: [
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
    checkLoadInputData () {
      this.isDataLoaded = true
    }
  },
  computed: {
    ticketNumber () {
      return this.inputs[10].value
    }
  },
  watch: {
    isDataLoaded (newData, OldData) {
      if (this.isDataLoaded === true) {
        this.userFirstName = this.searchForInputVal('first_name')
        this.userLastName = this.searchForInputVal('last_name')
        this.userMessageArray = this.searchForInputVal('messages')
        this.userPhoto = this.searchForInputVal('img')
      }
    }
  },
  created () {
    this.api += '/' + this.$route.params.id
  }
}
</script>

<style scoped>

</style>

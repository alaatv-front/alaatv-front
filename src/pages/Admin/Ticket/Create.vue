<template>
  <div class="page-content">
    <entity-create
      ref="EntityCreate"
      v-model:value="inputs"
      :title=selectedDepartment.title
      :api="api"
      entity-id-key-in-response="id"
      show-route-param-key="id"
      index-route-name="Admin.Ticket.Index"
      show-route-name="Admin.Ticket.Show"
      :show-save-button="false"
    >
      <template #before-form-builder>
        <q-dialog
          v-model="showDialog"
          no-backdrop-dismiss
        >
          <q-card
            class="row justify-center q-pa-md">
            <q-btn
              v-for="department in departments.list"
              :key="department.id"
              v-close-popup
              unelevated
              class="departmentActionBtn col-3 q-ma-md"
              icon="isax:search-status .path4:before"
              @click="selectDepartment(department)"
            >
              <span class="full-width q-pt-sm">
                {{department.title}}
              </span>
            </q-btn>
          </q-card>
        </q-dialog>
      </template>
    </entity-create>
    <q-separator class="q-my-md" />
    <send-message-input
      ref="SendMessageInput"
      :role="userRole"
      :canFilter-supporter="canFilterSupporter"
      :canFilter-assignees="canFilterAssignees"
      :canAssign-ticket="canAssignTicket"
      :send-loading="sendLoading"
      :isAdmin="isAdmin"
      @creatTicket="sendTicket"

    />
  </div>

</template>

<script>
import SendMessageInput from 'components/Ticket/SendMessageInput'
import { EntityCreate } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses'
import { TicketDepartment, TicketDepartmentList } from 'src/models/TicketDepartment'
import { mixinTicket } from 'src/mixin/Mixins'

export default {
  name: 'Create',
  components: {
    EntityCreate,
    SendMessageInput
  },
  mixins: [mixinTicket],
  data () {
    return {
      showDialog: true,
      api: API_ADDRESS.ticket.create.base,
      selectedDepartment: new TicketDepartment(),
      departments: new TicketDepartmentList(),
      inputs: [
        {
          type: 'input',
          name: 'title',
          responseKey: 'data.title',
          value: '',
          label: 'عنوان',
          col: 'col-md-6'
        },
        {
          type: 'toggleButton',
          name: 'priority_id',
          responseKey: 'data.priority',
          label: 'اولویت',
          placeHolder: '',
          value: '',
          options: this.getPriorityOption(),
          toggleColor: 'blue',
          textColor: 'black',
          toggleTextColor: 'white',
          col: 'col-md-4',
          size: '22px'
        }
      ],
      userRole: '',
      canFilterSupporter: false,
      canFilterAssignees: false,
      canAssignTicket: false
    }
  },

  created() {
    this.initPageData()
  },

  methods: {
    initPageData() {
      this.getDepartments()
      this.setRoleAndPermissions()
    },
    setRoleAndPermissions() {
      this.userRole = 'user'
      this.canFilterSupporter = false
      this.canFilterAssignees = false
      this.canAssignTicket = false
    },

    getPriorityOption() {
      return [{
        label: 'کم',
        value: '1'
      },
      {
        label: 'متوسط',
        value: '2'
      },
      {
        label: 'فوری',
        value: '3'
      },
      {
        label: 'بحرانی',
        value: '4'
      }]
    },
    getDepartments() {
      const list = [
        {
          id: 20,
          parent_id: null,
          order: 0,
          enable: 0,
          display: 0,
          title: 'درخواست تمدید سفارش',
          ticket_form: null,
          responders_employees: null,
          created_at: '2022-07-09 07:55:21',
          updated_at: '2022-07-09 07:55:23',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/20/edit'
        },
        {
          id: 22,
          parent_id: null,
          order: 0,
          enable: 1,
          display: 0,
          title: 'درآمد زایی',
          ticket_form: null,
          responders_employees: null,
          created_at: '2022-08-04 10:22:35',
          updated_at: '2022-08-04 10:22:37',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/22/edit'
        },
        {
          id: 21,
          parent_id: null,
          order: 1,
          enable: 0,
          display: 0,
          title: 'اعتراض به انقضای مادام العمر سفارش',
          ticket_form: null,
          responders_employees: null,
          created_at: '2022-07-09 07:55:21',
          updated_at: '2022-07-09 07:55:23',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/21/edit'
        },
        {
          id: 1,
          parent_id: null,
          order: 2,
          enable: 1,
          display: 1,
          title: 'آموزش',
          ticket_form: null,
          responders_employees: null,
          created_at: '2020-08-25 11:10:48',
          updated_at: '2020-08-25 11:10:48',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/1/edit'
        },
        {
          id: 2,
          parent_id: null,
          order: 3,
          enable: 1,
          display: 1,
          title: 'مالی',
          ticket_form: null,
          responders_employees: null,
          created_at: '2020-08-25 11:10:46',
          updated_at: '2020-08-25 11:10:46',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [
            'showOrdersInTicketCreation'
          ],
          edit_link: 'http://alaatv.test/ticketDepartment/2/edit'
        },
        {
          id: 3,
          parent_id: null,
          order: 4,
          enable: 1,
          display: 1,
          title: 'استخدام',
          ticket_form: null,
          responders_employees: null,
          created_at: '2020-08-25 11:10:44',
          updated_at: '2020-08-25 11:10:45',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/3/edit'
        },
        {
          id: 4,
          parent_id: null,
          order: 5,
          enable: 1,
          display: 1,
          title: 'پرچم',
          ticket_form: null,
          responders_employees: null,
          created_at: '2020-09-17 11:27:12',
          updated_at: '2020-09-17 11:27:14',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/4/edit'
        },
        {
          id: 5,
          parent_id: null,
          order: 6,
          enable: 1,
          display: 1,
          title: 'راه ابریشم',
          ticket_form: null,
          responders_employees: null,
          created_at: '2020-10-26 17:18:44',
          updated_at: '2020-10-26 17:59:45',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/5/edit'
        },
        {
          id: 6,
          parent_id: null,
          order: 7,
          enable: 1,
          display: 1,
          title: 'فنی',
          ticket_form: null,
          responders_employees: null,
          created_at: '2020-10-26 17:59:05',
          updated_at: '2020-10-26 17:59:05',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/6/edit'
        },
        {
          id: 7,
          parent_id: null,
          order: 8,
          enable: 1,
          display: 1,
          title: 'مشاوره خرید',
          ticket_form: null,
          responders_employees: null,
          created_at: '2020-10-26 18:12:04',
          updated_at: '2020-10-26 18:12:04',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/7/edit'
        },
        {
          id: 8,
          parent_id: null,
          order: 9,
          enable: 1,
          display: 0,
          title: 'مشکلات محتوایی رایگان',
          ticket_form: null,
          responders_employees: null,
          created_at: '2020-10-31 05:50:42',
          updated_at: '2020-10-31 05:50:42',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/8/edit'
        },
        {
          id: 9,
          parent_id: null,
          order: 10,
          enable: 1,
          display: 0,
          title: 'مشکلات محتوایی غیر رایگان',
          ticket_form: null,
          responders_employees: null,
          created_at: '2020-10-31 05:50:42',
          updated_at: '2020-10-31 05:50:42',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/9/edit'
        },
        {
          id: 10,
          parent_id: null,
          order: 11,
          enable: 1,
          display: 0,
          title: 'ارتباط با ما',
          ticket_form: null,
          responders_employees: null,
          created_at: '2020-11-04 10:08:56',
          updated_at: '2020-11-04 10:08:55',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/10/edit'
        },
        {
          id: 11,
          parent_id: null,
          order: 12,
          enable: 1,
          display: 1,
          title: 'حمایت های مردمی',
          ticket_form: null,
          responders_employees: null,
          created_at: '2020-11-04 10:13:05',
          updated_at: '2020-11-04 10:13:06',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/11/edit'
        },
        {
          id: 12,
          parent_id: null,
          order: 13,
          enable: 1,
          display: 0,
          title: 'درخواست انتقال حساب کاربری',
          ticket_form: null,
          responders_employees: null,
          created_at: '2020-12-13 13:42:07',
          updated_at: '2020-12-13 13:42:09',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/12/edit'
        },
        {
          id: 13,
          parent_id: null,
          order: 14,
          enable: 1,
          display: 1,
          title: 'تفتان',
          ticket_form: null,
          responders_employees: null,
          created_at: '2021-03-22 12:47:10',
          updated_at: '2021-03-22 12:47:08',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/13/edit'
        },
        {
          id: 14,
          parent_id: null,
          order: 15,
          enable: 1,
          display: 1,
          title: 'آرش',
          ticket_form: null,
          responders_employees: null,
          created_at: '2021-03-22 12:47:10',
          updated_at: '2021-03-22 12:47:10',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/14/edit'
        },
        {
          id: 15,
          parent_id: null,
          order: 16,
          enable: 1,
          display: 1,
          title: 'تتا',
          ticket_form: null,
          responders_employees: null,
          created_at: '2021-03-22 12:47:10',
          updated_at: '2021-03-22 12:47:10',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/15/edit'
        },
        {
          id: 16,
          parent_id: null,
          order: 17,
          enable: 1,
          display: 1,
          title: 'سه آ',
          ticket_form: null,
          responders_employees: null,
          created_at: '2021-03-22 12:47:10',
          updated_at: '2021-03-22 12:47:10',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/16/edit'
        },
        {
          id: 17,
          parent_id: null,
          order: 18,
          enable: 1,
          display: 1,
          title: 'طرح حکمت',
          ticket_form: null,
          responders_employees: null,
          created_at: '2021-03-22 12:47:10',
          updated_at: '2021-03-22 12:47:10',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/17/edit'
        },
        {
          id: 18,
          parent_id: null,
          order: 19,
          enable: 0,
          display: 0,
          title: 'فنی داخلی',
          ticket_form: null,
          responders_employees: '["27244","1"]',
          created_at: '2021-04-06 08:19:35',
          updated_at: '2021-06-24 13:18:28',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/18/edit'
        },
        {
          id: 19,
          parent_id: null,
          order: 20,
          enable: 0,
          display: 0,
          title: 'مالی داخلی',
          ticket_form: null,
          responders_employees: null,
          created_at: '2021-04-08 06:28:44',
          updated_at: '2021-04-08 06:28:46',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/19/edit'
        }
      ].filter(item => item.display === 1)
      this.departments = new TicketDepartmentList(list)
    },
    selectDepartment (department) {
      this.selectedDepartment = department
    }
  }
}
</script>

<style scoped lang="scss">
.page-content{
  margin: 30px;

  :deep(.departmentActionBtn) {
    border-radius: 8px;
    width: 100px;
    height: 100px;
    padding: 0;
    &:hover {
      background-color: var(--alaa-Primary);
      color: white;
    }
    .q-focus-helper {
      display: none;
    }
  }

}

:deep(.form-builder-separator-col) {
  display: flex;
  align-items: center;
}

:deep(.q-btn-group) {
  box-shadow: none;

  .q-btn-item:last-child {
  }
}

</style>

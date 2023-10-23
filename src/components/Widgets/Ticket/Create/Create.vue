<template>
  <div class="page-content">
    <entity-create v-if="mounted"
                   ref="EntityCreate"
                   v-model:value="inputs"
                   :title="selectedDepartment.title"
                   :api="api"
                   entity-id-key-in-response="id"
                   show-route-param-key="id"
                   :index-route-name="options.indexRouteName"
                   :show-route-name="options.showRouteName"
                   :show-save-button="false">
      <template #before-form-builder>
        <q-dialog v-model="showDialog"
                  no-backdrop-dismiss>
          <div>
            <q-card class="q-pa-md">
              <div class="row justify-end">
                <q-btn v-close-popup
                       flat
                       icon="close"
                       text
                       @click="goBackToList" />
              </div>
              <div class="row justify-center">
                <q-btn v-for="department in departmentList.list"
                       :key="department.id"
                       v-close-popup
                       unelevated
                       class="departmentActionBtn col-3 q-ma-md"
                       icon="isax:search-status .path4:before"
                       @click="selectDepartment(department)">
                  <span class="full-width q-pt-sm">
                    {{department.title}}
                  </span>
                </q-btn>
              </div>
            </q-card>
          </div>
        </q-dialog>
      </template>
    </entity-create>
    <q-separator class="q-my-md" />
    <send-message-input v-if="mounted"
                        ref="SendMessageInput"
                        :role="userRole"
                        :canChoseOrder="canChoseOrder"
                        :canAssign-ticket="canAssignTicket"
                        :send-loading="loading"
                        :isAdmin="isInAdminPage"
                        @creatTicket="sendTicket" />
  </div>
</template>

<script>
import { EntityCreate } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinTicket, mixinWidget } from 'src/mixin/Mixins.js'
import { TicketDepartment } from 'src/models/TicketDepartment.js'
import SendMessageInput from 'src/components/Ticket/SendMessageInput.vue'

export default {
  name: 'Create',
  components: {
    EntityCreate,
    SendMessageInput
  },
  mixins: [mixinTicket, mixinWidget],
  props: {
    options: {
      type: Object,
      default() {
        return {
          showRouteName: '',
          indexRouteName: ''
        }
      }
    }
  },
  data () {
    return {
      mounted: false,
      showDialog: true,
      api: APIGateway.ticket.APIAdresses.base,
      selectedDepartment: new TicketDepartment(),
      inputs: [
        {
          type: 'input',
          name: 'title',
          responseKey: 'data.title',
          value: '',
          label: 'عنوان',
          placeholder: '',
          col: 'col-sm-6 col-xs-12'
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
          col: 'col-sm-6 col-xs-12',
          size: '14px'
        }
      ],
      userRole: '',
      canAssignTicket: false
    }
  },
  computed: {
    canChoseOrder() {
      return [2].includes(this.selectedDepartment.id)
    },
    getRoutingObject() {
      if (this.$route.name.includes('Admin')) {
        return { name: 'Admin.Ticket.Index' }
      }
      return { name: 'UserPanel.Ticket' }
    }
  },
  created() {
    this.initPageData()
  },
  mounted () {
  },
  methods: {
    afterGetAllPageData () {
      this.mounted = true
      this.$nextTick(() => {
        this.checkQueryParams()
      })
    },
    async initTicket () {
      await this.setInputs()
    },
    async setInputs () {
      const ticketFields = await this.getTicketData()
      this.departmentList.list = ticketFields.departments.list
      this.getInput('priority_id').options = ticketFields.priorities.list.map(item => {
        return {
          label: item.title,
          value: item.id
        }
      })
    },
    checkQueryParams () {
      const title = this.$route.query.t
      const message = this.$route.query.m
      const priorityId = this.$route.query.p
      const departmentId = this.$route.query.d
      const targetDepartmentIndex = this.departmentList.list.findIndex(dep => parseInt(dep.id) === parseInt(departmentId))
      if (targetDepartmentIndex !== -1) {
        this.selectDepartment(this.departmentList.list[targetDepartmentIndex])
        this.showDialog = false
        this.$refs.EntityCreate.setInputByName('title', title)
      }

      if (title) {
        this.$refs.EntityCreate.setInputByName('title', title)
      }

      if (message) {
        this.$refs.SendMessageInput.newMessage.text = message
      }

      if (priorityId) {
        this.$refs.EntityCreate.setInputByName('priority_id', parseInt(priorityId))
      }
    },
    goBackToList() {
      const ticketRouteObj = { name: 'Admin.Ticket.Index' }
      if (this.$route.name.includes('Admin')) {
        this.$router.push(ticketRouteObj)
        return
      }
      ticketRouteObj.name = 'UserPanel.Ticket.Index'
      this.$router.push(ticketRouteObj)
    },
    initPageData() {
      this.setRoleAndPermissions()
    },
    setRoleAndPermissions() {
      this.userRole = 'user'
      this.canAssignTicket = false
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
      background-color: #FFCA28;
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

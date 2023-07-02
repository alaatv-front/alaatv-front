<template>
  <div class="page-content">
    <entity-create ref="EntityCreate"
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
    <send-message-input ref="SendMessageInput"
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
import { mixinTicket, mixinWidget } from 'src/mixin/Mixins.js'
import { TicketDepartment } from 'src/models/TicketDepartment.js'
import SendMessageInput from 'components/Ticket/SendMessageInput.vue'
import { APIGateway } from 'src/api/APIGateway'

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
          placeholder: ' ',
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

  methods: {
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

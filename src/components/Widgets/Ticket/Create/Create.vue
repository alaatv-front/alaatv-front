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
          <q-card class="row justify-center q-pa-md">
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
          </q-card>
        </q-dialog>
      </template>
    </entity-create>
    <q-separator class="q-my-md" />
    <send-message-input ref="SendMessageInput"
                        :role="userRole"
                        :canChoseOrder="canChoseOrder"
                        :canAssign-ticket="canAssignTicket"
                        :send-loading="loading"
                        :isAdmin="isAdmin"
                        @creatTicket="sendTicket" />
  </div>

</template>

<script>
import { EntityCreate } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses.js'
import { mixinTicket, mixinWidget } from 'src/mixin/Mixins.js'
import { TicketDepartment } from 'src/models/TicketDepartment.js'
import SendMessageInput from 'components/Ticket/SendMessageInput.vue'

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
      api: API_ADDRESS.ticket.create.base,
      selectedDepartment: new TicketDepartment(),
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
      canAssignTicket: false
    }
  },
  computed: {
    canChoseOrder() {
      return [2].includes(this.selectedDepartment.id)
    }
  },

  created() {
    this.initPageData()
  },

  methods: {
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

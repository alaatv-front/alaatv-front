<template>
  <entity-create
    v-model:value="inputs"
    :title=this.depart.title
    :api="api"
    :entity-id-key-in-response="entityIdKeyInResponse"
    :show-route-param-key="showRouteParamKey"
    :index-route-name="indexRouteName"
    :show-route-name="showRouteName"
  >
    <template #before-form-builder>
      <div
        v-if="beforeFormBuilder"
      >
        <q-dialog
          no-backdrop-dismiss
          v-model="showDialog"
        >
          <q-card
            class="flex justify-center">
            <div v-for="(item, index) in departments"
                 :key="index"
                 @click="selectDepartment(item)"
                 class="departmentForSelect col-2 q-my-md ">
              <q-btn
                flat
                class="departmentActionBtn"
                icon="isax:search-status .path4:before"
              />
              <div class="departmentTitle flex justify-center"
                   v-html="item.title"></div>
            </div>
          </q-card>

        </q-dialog>
      </div>
    </template>
  </entity-create>
  <q-separator class="q-my-md" />
  <div>
    <SendMessageInput />
  </div>

</template>

<script>
import SendMessageInput from 'components/SendMessageInput'
import { EntityCreate } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses'
// import { TicketDepartmentList } from 'src/models/TicketDepartment'
// import { Ticket } from 'src/models/Ticket'

export default {
  name: 'Create',
  components: {
    EntityCreate,
    SendMessageInput
  },
  data () {
    return {
      showDialog: true,
      expanded: true,
      api: API_ADDRESS.ticket.create.base,
      entityIdKeyInResponse: 'id',
      showRouteParamKey: 'id',
      showRouteName: 'Admin.Ticket.Show',
      indexRouteName: 'Admin.Ticket.Index',
      depart: [],
      departments: [
        {
          id: '1',
          title: 'مالی'
        }, {
          id: '2',
          title: 'استخدام'
        }, {
          id: '3',
          title: 'ابریشم'
        }, {
          id: '4',
          title: 'پرچم'
        }, {
          id: '5',
          title: 'تفتان'
        }, {
          id: '6',
          title: 'فنی'
        }, {
          id: '7',
          title: 'آموزش'
        }, {
          id: '8',
          title: 'مشاوره خرید'
        }
      ],
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
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-6',
          value: [
            {
              type: 'separator',
              label: 'اولویت:',
              vertical: 'false',
              col: 'col-md-1'
            },
            {
              type: 'toggleButton',
              name: 'priority',
              responseKey: 'data.priority',
              options: [
                {
                  label: 'کم',
                  id: '1'
                },
                {
                  label: 'متوسط',
                  id: '2'
                },
                {
                  label: 'فوری',
                  id: '3'
                },
                {
                  label: 'بحرانی',
                  id: '4'
                }
              ],
              col: 'col-md-4',
              textColor: 'black',
              size: '20px'
            }

          ]

        },
        { name: 'department', type: 'hidden', responseKey: 'data.department' }

      ],
      beforeFormBuilder: true,
      afterFormBuilder: true
    }
  },
  created () {
    // this.backPage()
  },
  methods: {
    backPage () {
      if (
        this.ticketData.editMode &&
        this.departmentForSelect.list.length > 0 &&
        this.departments.list.length > 0 &&
        this.departmentForSelect.list[0].id !== this.departments.list[0].id
      ) {
        this.ticketData.department.id = null
        this.departmentForSelect = this.departments
      } else {
        const that = this
        this.$store.commit('updateAppProps', function (appProps) {
          appProps.editedTicket = that.ticketData
        })
        this.$router.push({ name: 'Menu' }).catch(() => {
        })
      }
    },
    selectDepartment (item) {
      this.depart = item
      this.showDialog = false
    }
  }
}
</script>

<style scoped lang="scss">

:deep(.departmentForSelect) {
  cursor: pointer;
  border-radius: 0;
  &:hover {
    background-color: var(--alaa-Primary);
    color: white;
  }
  .departmentActionBtn {
    border-radius: 0;
    width: 100px;
    height: 100px;
    padding: 0;
    .q-focus-helper{
      display: none;
    }
  }

}

</style>

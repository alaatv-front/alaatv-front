<template>
  <inside-dialog :action="false">
    <template #header-icon>
      <badge-icon icon="ph:ticket"
                  color="primary" />
    </template>
    <template #header>
      تیکت های دیگر کاربر
    </template>
    <template v-if="computedFilter.button"
              #headerAction>
      <q-btn flat
             icon="ph:faders-horizontal"
             square
             color="grey"
             class="size-xs"
             @click="toggleFilter" />
      <q-btn v-close-popup
             flat
             icon="ph:x"
             square
             color="grey"
             class="size-xs" />
    </template>
    <template #body>
      <div class="filter-container"
           :class="{'expand': filterExpand}">
        <div class="row">
          <div v-if="computedFilter.department"
               class="col-12 filter-col">
            <q-select v-model="department"
                      :options="computedTicketDepartmentList.list"
                      option-label="title"
                      option-value="id"
                      label="گروه"
                      @update:model-value="filterTickets()" />
          </div>
          <div v-if="computedFilter.priority"
               class="col-12 filter-col">
            <q-select v-model="priority"
                      :options="computedTicketPriorityList.list"
                      option-label="title"
                      option-value="id"
                      label="اولویت"
                      @update:model-value="filterTickets()" />
          </div>
          <div v-if="computedFilter.status"
               class="col-12 filter-col">
            <q-select v-model="status"
                      :options="computedTicketStatusList.list"
                      option-label="title"
                      option-value="id"
                      label="وضعیت"
                      @update:model-value="filterTickets()" />
          </div>
        </div>
      </div>
      <div id="scroll-target-id"
           class="other-ticket-list">
        <q-infinite-scroll v-if="tickets.list.length > 0"
                           ref="infiniteTicketList"
                           :offset="500"
                           :initial-index="1"
                           scroll-target="#scroll-target-id"
                           @load="getOtherTickets">
          <ticket-item v-for="(ticket, index) in tickets.list"
                       :key="index"
                       class="other-ticket-item"
                       :ticket="ticket" />
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary"
                              size="40px" />
            </div>
          </template>
        </q-infinite-scroll>
        <div v-else
             class="no-item">
          تیکتی وجود ندارد
        </div>
      </div>
    </template>
  </inside-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import { APIGateway } from 'src/api/APIGateway.js'
import TicketItem from './components/TicketItem.vue'
import { TicketList, Ticket } from 'src/models/Ticket.js'
import BadgeIcon from 'src/components/Utils/BadgeIcon.vue'
import InsideDialog from 'src/components/Utils/InsideDialog.vue'
import { TicketStatus, TicketStatusList } from 'src/models/TicketStatus.js'
import { TicketPriority, TicketPriorityList } from 'src/models/TicketPriority.js'
import { TicketDepartment, TicketDepartmentList } from 'src/models/TicketDepartment.js'

const defaultFilter = {
  status: false,
  priority: false,
  department: false,
  button: false
}
export default defineComponent({
  name: 'OtherTicket',
  components: {
    BadgeIcon,
    TicketItem,
    InsideDialog
  },
  props: {
    ticket: {
      type: Ticket,
      default: new Ticket()
    },
    loadData: {
      type: Boolean,
      default: true
    },
    expand: {
      type: Boolean,
      default: true
    },
    filter: {
      type: Object,
      default: defaultFilter
    },
    statusList: {
      type: TicketStatusList,
      default: new TicketStatusList()
    },
    priorityList: {
      type: TicketPriorityList,
      default: new TicketPriorityList()
    },
    departmentList: {
      type: TicketDepartmentList,
      default: new TicketDepartmentList()
    }
  },
  data () {
    return {
      status: new TicketStatus(),
      priority: new TicketPriority(),
      department: new TicketDepartment(),
      filterExpand: false,
      tickets: new TicketList(),
      ticketStatusList: new TicketStatusList(),
      ticketPriorityList: new TicketPriorityList(),
      ticketDepartmentList: new TicketDepartmentList(),
      links: {
        first: null,
        last: null,
        prev: null,
        next: null
      },
      meta: {
        current_page: 0,
        from: null,
        last_page: 1,
        path: null,
        per_page: null,
        to: null,
        total: 0,
        count: 0
      }
    }
  },
  computed: {
    ticketId () {
      if (this.$route.params.id) {
        return this.$route.params.id
      }
      return this.ticket.id
    },
    computedFilter () {
      return Object.assign(defaultFilter, this.filter)
    },
    computedTicketStatusList () {
      if (!this.loadData && this.statusList.list.length > 0) {
        return this.statusList
      }
      return this.ticketStatusList
    },
    computedTicketPriorityList () {
      if (!this.loadData && this.priorityList.list.length > 0) {
        return this.priorityList
      }
      return this.ticketPriorityList
    },
    computedTicketDepartmentList () {
      if (!this.loadData && this.departmentList.list.length > 0) {
        return this.departmentList
      }
      return this.ticketDepartmentList
    }
  },
  mounted () {
    this.loadTicketData()
    this.filterExpand = this.expand
  },
  methods: {
    loadTicketData () {
      this.getOtherTickets()
      if (this.loadData) {
        this.getNeededDataForTicket()
      }
    },
    filterTickets () {
      this.tickets = new TicketList()
      this.$refs.infiniteTicketList.reset()
      this.getOtherTickets()
    },
    getOtherTickets (index, done) {
      this.tickets.loading = true
      APIGateway.ticket.getOtherTickets({
        ticketId: this.ticketId,
        params: {
          page: index,
          ...(this.department.id !== null && { department_id: this.department.id }),
          ...(this.priority.id !== null && { priority_id: this.priority.id }),
          ...(this.status.id !== null && { status_id: this.status.id })
        }
      })
        .then((otherTicketResponse) => {
          this.tickets.loading = false
          const ticketList = new TicketList(otherTicketResponse.ticketList)
          this.tickets.list.push(...ticketList.list)

          this.links = otherTicketResponse.links
          this.meta = otherTicketResponse.meta
          done()
        })
        .catch(() => {
          this.tickets.loading = false
        })
    },
    getNeededDataForTicket () {
      this.ticketStatusList.loading = true
      this.ticketPriorityList.loading = true
      this.ticketDepartmentList.loading = true
      APIGateway.ticket.getNeededDataToCreateTicket()
        .then(({ departments, priorities, statuses }) => {
          this.ticketStatusList = new TicketStatusList(statuses)
          this.ticketPriorityList = new TicketPriorityList(priorities)
          this.ticketDepartmentList = new TicketDepartmentList(departments)
        })
        .catch(() => {
          this.ticketStatusList.loading = false
          this.ticketPriorityList.loading = false
          this.ticketDepartmentList.loading = false
        })
    },
    toggleFilter () {
      this.filterExpand = !this.filterExpand
    }
  }
})
</script>

<style lang="scss" scoped>
.other-ticket-item {
  &:not(:last-child) {
    margin-bottom: $space-3;
  }
}

.other-ticket-list {
  max-height: 664px;
  overflow: auto;
}

.no-item {
  display: flex;
  justify-content: center;
  align-items: center;
  color: $grey-6;
  @include body1;
}

.filter-container {
  margin-bottom: $space-6;
  height: 0;
  display: none;
  transition: all ease-in-out .4s;

  &.expand {
    height: auto;
    display: block;
    transition: all ease-in-out .4s;
  }

  .filter-col {
    margin-bottom: $space-3;
  }
}
</style>

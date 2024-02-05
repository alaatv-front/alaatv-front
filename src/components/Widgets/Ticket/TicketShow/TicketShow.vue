<template>
  <div class="TicketShow">
    <div class="TicketShow__breadcrumbs">
      <q-breadcrumbs class="text-grey-9"
                     active-color="grey-6">
        <template v-slot:separator>
          <q-icon size="xs"
                  name="isax:arrow-right-3"
                  color="grey-6" />
        </template>
        <q-breadcrumbs-el to="/"
                          label="صفحه اصلی" />
        <q-breadcrumbs-el :to="{ name: 'UserPanel.Ticket.Index' }"
                          label="تیکت پشتیبانی" />
        <q-breadcrumbs-el>
          <q-skeleton v-if="!ticket.id"
                      type="text"
                      width="100px" />
          <template v-else>
            {{ 'تیکت ' + ticket.id }}
          </template>
        </q-breadcrumbs-el>
      </q-breadcrumbs>
    </div>
    <div class="TicketShow__template row">
      <div class="col-lg-2 col-md-3 gt-sm">
        <div ref="MyOpenTickets"
             class="TicketShow__my-open-tickets">
          <my-open-tickets :tickets="pendingTickets" />
        </div>
      </div>
      <div class="col-lg-10 col-md-9 col-12">
        <div class="row">
          <div class="col-12">
            <div class="TicketShow__header">
              <ticket-header :ticket="ticket"
                             @openTickets="openMyOpenTicketDrawer"
                             @openInfoForm="openTicketInfoFormDrawer" />
            </div>
          </div>
          <div class="col-lg-8 col-md-6 col-12">
            <div class="TicketShow__messages">
              <ticket-message-list :ticket="ticket" />
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-12 gt-sm">
            <div class="TicketShow__ticket-info">
              <ticket-info-form :ticket="ticket"
                                :supporters="supporterList"
                                :statuses="ticketStatusList"
                                :priorities="ticketPriorityList"
                                :departments="ticketDepartmentList" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="TicketShow__logs">
          <ticket-logs />
        </div>
      </div>
    </div>
    <q-layout v-if="mounted && $q.screen.lt.md">
      <q-drawer ref="actionDrawer"
                v-model="myOpenTicketDrawer"
                overlay>
        <div class="TicketShow__drawer-my-open-tickets">
          <div class="TicketShow__drawer-my-open-tickets-top-action">
            <q-btn flat
                   square
                   icon="ph:x"
                   class="TicketShow__drawer-my-open-tickets-close-btn"
                   @click="closeMyOpenTicketDrawer" />
          </div>
          <my-open-tickets :tickets="pendingTickets" />
        </div>
      </q-drawer>
      <q-drawer ref="actionDrawer"
                v-model="ticketInfoFormDrawer"
                behavior="mobile"
                side="right"
                overlay>
        <div class="TicketShow__drawer-ticket-info">
          <div class="TicketShow__drawer-ticket-info-top-action">
            <q-btn flat
                   square
                   icon="ph:x"
                   class="TicketShow__drawer-ticket-info-close-btn"
                   @click="closeTicketInfoFormDrawer" />
          </div>
          <ticket-info-form :ticket="ticket"
                            :supporters="supporterList"
                            :statuses="ticketStatusList"
                            :priorities="ticketPriorityList"
                            :departments="ticketDepartmentList" />
        </div>
      </q-drawer>
    </q-layout>
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { SupporterList } from 'src/models/supporter.js'
import { Ticket, TicketList } from 'src/models/Ticket.js'
import { TicketMessage } from 'src/models/TicketMessage.js'
import { TicketStatusList } from 'src/models/TicketStatus.js'
import { TicketPriorityList } from 'src/models/TicketPriority.js'
import { TicketDepartmentList } from 'src/models/TicketDepartment.js'
import TicketLogs from 'src/components/Ticket/TicketLogs/TicketLogs.vue'
import TicketHeader from 'src/components/Ticket/TicketHeader/TicketHeader.vue'
import MyOpenTickets from 'src/components/Ticket/MyOpenTickets/MyOpenTickets.vue'
import TicketInfoForm from 'src/components/Ticket/TicketInfoForm/TicketInfoForm.vue'
import TicketMessageList from 'src/components/Ticket/TicketMessageList/TicketMessageList.vue'

export default {
  name: 'TicketShow',
  components: {
    TicketLogs,
    TicketHeader,
    MyOpenTickets,
    TicketInfoForm,
    TicketMessageList
  },
  mixins: [mixinWidget],
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
      myOpenTicketDrawer: false,
      ticketInfoFormDrawer: false,
      mounted: false,
      ticket: new Ticket(),
      pendingTickets: new TicketList(),
      supporterList: new SupporterList(),
      ticketStatusList: new TicketStatusList(),
      ticketPriorityList: new TicketPriorityList(),
      ticketDepartmentList: new TicketDepartmentList()
    }
  },
  computed: {
    ticketId () {
      if (typeof this.localOptions.ticketId !== 'undefined' && this.localOptions.ticketId !== null) {
        return this.localOptions.ticketId
      }
      if (this.localOptions.urlParam && this.$route.params[this.localOptions.urlParam]) {
        return this.$route.params[this.localOptions.urlParam]
      }
      if (this.$route.params.id) {
        return this.$route.params.id
      }
      return this.ticket.id
    }
  },
  mounted () {
    this.getTicket()
    this.getNeededDataForTicket()
    this.getPendingTickets()
    this.getSupporterList()
    this.mounted = true
  },
  methods: {
    openMyOpenTicketDrawer () {
      this.myOpenTicketDrawer = true
    },
    openTicketInfoFormDrawer () {
      this.ticketInfoFormDrawer = true
    },
    closeMyOpenTicketDrawer () {
      this.myOpenTicketDrawer = false
    },
    closeTicketInfoFormDrawer () {
      this.ticketInfoFormDrawer = false
    },
    getTicket () {
      this.ticket.loading = true
      APIGateway.ticket.getTicket(this.ticketId)
        .then((ticket) => {
          this.ticket.loading = false
          this.ticket = new Ticket(ticket)
        })
        .catch(() => {
          this.ticket.loading = false
        })
    },
    getSupporterList () {
      this.supporterList.loading = true
      APIGateway.ticket.getSupporterList()
        .then((supporterList) => {
          this.supporterList.loading = false
          this.supporterList = new SupporterList(supporterList)
        })
        .catch(() => {
          this.supporterList.loading = false
        })
    },
    getPendingTickets (ticketId) {
      this.pendingTickets.loading = true
      APIGateway.ticket.getPendingTickets()
        .then((ticketList) => {
          this.pendingTickets.loading = false
          this.pendingTickets = new TicketList(ticketList)
        })
        .catch(() => {
          this.pendingTickets.loading = false
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
    sendTicketMessage (ticketMessage) {
      ticketMessage.body = ticketMessage.body.replace(/\r?\n/g, '<br/>')
      this.ticket.loading = true
      APIGateway.ticket.sendTicketMessage(ticketMessage)
        .then((ticketMessage) => {
          this.ticket.loading = false
          this.ticket.messages.list.push(new TicketMessage(ticketMessage))
        })
        .catch(() => {
          this.ticket.loading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.TicketShow {
  .TicketShow__breadcrumbs {
    margin-bottom: $space-6;
  }
  .TicketShow__template {
    /* 1440 < page < 1920 */
    @include media-max-width('xl') {
    }
    /* 1024 < page < 1440 */
    @include media-max-width('lg') {
    }
    /* 600 < page < 1024 */
    @include media-max-width('md') {
    }
    /* 360 < page < 600 */
    @include media-max-width('sm') {
    }
    .TicketShow__header {
      display: flex;
      padding: $space-3 $space-4;
      justify-content: space-between;
      width: 100%;
      align-items: center;
      align-self: stretch;
      border-bottom: 1px solid $blue-grey-3;
      border-radius: $radius-none $radius-4 $radius-none $radius-none;
      background: $grey-1;
      /* 600 < page < 1024 */
      @include media-max-width('md') {
        border-radius: $radius-none !important;
      }
    }
    .TicketShow__my-open-tickets {
      display: flex;
      height: 100%;
      padding: $space-5 $space-3;
      flex-direction: column;
      align-items: center;
      align-self: stretch;
      border-radius: $radius-4 $radius-none $radius-none $radius-4;
      border-right: 1px solid $blue-grey-3;
      background: $grey-1;
    }
    .TicketShow__ticket-info {
      display: flex;
      height: 100%;
      padding: $space-6;
      flex-direction: column;
      align-items: center;
      gap: $space-5;
      align-self: stretch;
      background: $grey-1;
      border-left: 1px solid $blue-grey-3;
      border-radius: $radius-none $radius-none $radius-4 $radius-none;
    }
    .TicketShow__messages {
      height: 100%;
      min-height: 100%;
      max-height: calc( 100vh - 300px);
      /* 600 < page < 1024 */
      @include media-max-width('md') {
        max-height: calc( 100vh - 194px);
      }
    }
  }
  .TicketShow__drawer-my-open-tickets {
    height: 100%;
    background: $grey-1;
    padding: $space-5;
    .TicketShow__drawer-my-open-tickets-top-action {
      display: flex;
      justify-content: flex-start;
      margin-bottom: $space-4;
    }
  }

  &__logs {
    padding: $space-6;
    border-radius: $radius-4;
    background: $grey-1;
  }
  .TicketShow__drawer-ticket-info {
    height: 100%;
    background: $grey-1;
    padding: $space-5;
    .TicketShow__drawer-ticket-info-top-action {
      display: flex;
      justify-content: flex-start;
      margin-bottom: $space-4;
    }
  }
  &:deep(.q-layout) {
    min-height: 0 !important;
  }
}
</style>

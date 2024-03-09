<template>
  <div class="ticket-item-container"
       @click="openTicketDialog">
    <q-linear-progress v-if="localTicket.loading"
                       indeterminate />
    <div class="ticket-item-info">
      <div class="ticket-item-info__header">
        <div class="ticket-item-info__header--title">
          {{ ticket.department.title }}
        </div>
        <div class="ticket-item-info__header--date">
          {{ ticket.shamsiDate('created_at').dateTime }}
        </div>
        <div class="ticket-item-info__header--status">
          <q-chip outline
                  :color="ticket.status.getStatusColor()">
            {{ ticket.status.title }}
          </q-chip>
        </div>
      </div>
      <div class="ticket-item-info__body">
        {{ ticket.title }}
      </div>
    </div>
    <div class="ticket-item-user">
      <div class="ticket-item-user__avatar">
        <q-avatar v-if="ticket.user.photo"
                  size="24px">
          <lazy-img :src="ticket.user.photo"
                    width="24px"
                    height="24px" />
        </q-avatar>
        <q-avatar v-else
                  size="24px"
                  font-size="24px"
                  color="grey"
                  text-color="white"
                  icon="ph:user" />
      </div>
      <div class="ticket-item-user__full-name">
        {{ ticket.user.full_name }}
      </div>
    </div>
    <q-dialog v-model="ticketDialog">
      <div class="ticket-dialog-wrapper">
        <inside-dialog :close-button-icon="'ph:arrow-left'">
          <template #header-icon>
            <badge-icon icon="ph:ticket"
                        color="primary" />
          </template>
          <template #header>
            تیکت های دیگر کاربر - {{ ticket.department.title }}
          </template>
          <template #body>
            <div class="ticket-messages-wrapper">
              <ticket-message-list :readonly="true"
                                   :ticket="localTicket" />
            </div>
          </template>
        </inside-dialog>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Ticket } from 'src/models/Ticket.js'
import LazyImg from 'src/components/lazyImg.vue'
import BadgeIcon from 'src/components/Utils/BadgeIcon.vue'
import InsideDialog from 'src/components/Utils/InsideDialog.vue'
import TicketMessageList from 'src/components/Ticket/TicketMessageList/TicketMessageList.vue'
import { APIGateway } from 'src/api/APIGateway'
export default defineComponent({
  name: 'TicketItem',
  components: {
    LazyImg,
    BadgeIcon,
    InsideDialog,
    TicketMessageList
  },
  props: {
    ticket: {
      type: Ticket,
      default: new Ticket()
    }
  },
  data () {
    return {
      ticketDialog: false,
      localTicket: new Ticket()
    }
  },
  mounted () {
    this.localTicket = this.ticket
  },
  methods: {
    openTicketDialog () {
      this.getTicket(this.ticket.id)
    },
    getTicket (ticketId) {
      this.localTicket.loading = true
      APIGateway.ticket.getTicket(ticketId)
        .then((ticket) => {
          this.localTicket = new Ticket(ticket)
          this.ticketDialog = true
        })
        .catch(() => {
          this.localTicket.loading = false
        })
    }
  }
})
</script>

<style lang="scss" scoped>
.ticket-dialog-wrapper {
  width: 600px;
  max-width: 600px;
  @include  media-max-width('md') {
    width: 100%;
    max-width: 100%;
  }

  .ticket-messages-wrapper {
    height: 70vh;
  }
}

.ticket-item {
  &-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
    padding: $space-2 $space-4;
    gap: $space-3;
    border-radius: $radius-3;
    background: $blue-grey-1;
    cursor: pointer;
  }

  &-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
    gap: $space-2;

    &__header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: $space-7;
      flex: 1 0 0;

      &--title {
        color: $grey-9;
        @include subtitle1;
      }

      &--date {
        color: $grey-8;
        @include body2;
      }
    }

    &__body {
      color: $grey-9;
      @include body2;
    }
  }

  &-user {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: $space-3;
  }
}
</style>

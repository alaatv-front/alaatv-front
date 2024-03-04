<template>
  <div class="my-tickets-container">
    <div class="my-tickets-toolbar">
      <q-input v-model="search"
               debounce="500"
               class="no-title"
               type="text"
               placeholder="جست و جو">
        <template #prepend>
          <q-icon color="grey-6"
                  name="ph:magnifying-glass" />
        </template>
      </q-input>
    </div>
    <q-separator class="my-tickets__separator" />
    <div v-if="tickets.list.length > 0"
         class="my-tickets-list">
      <ticket-item v-for="(ticket, index) in computedTickets"
                   :key="index"
                   :ticket="ticket" />
    </div>
  </div>
</template>

<script>
import TicketItem from './components/TicketItem.vue'
import { TicketList } from 'src/models/Ticket.js'

export default {
  name: 'MyOpenTickets',
  components: {
    TicketItem
  },
  props: {
    tickets: {
      type: TicketList,
      default: new TicketList()
    }
  },
  emits: ['updateList'],
  data () {
    return {
      search: ''
    }
  },
  computed: {
    computedTickets () {
      if (this.tickets.list.length === 0) {
        return []
      }
      return this.tickets.list
        .filter(ticket => ticket.user.first_name.includes(this.search))
    }
  }
}
</script>

<style lang="scss" scoped>
.my-tickets{
  &-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: stretch;
    gap: $space-3;
  }
  &-toolbar {
    width: 100%;
  }
  &__separator {
    width: 100%;
  }
  &-list {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    align-self: stretch;
    gap: $space-3;
    width: 100%;
    max-height: 100%;
    overflow-y: auto;
  }
}
</style>

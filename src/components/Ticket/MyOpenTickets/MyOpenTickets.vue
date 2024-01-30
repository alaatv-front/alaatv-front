<template>
  <div class="my-tickets-container">
    <div class="my-tickets-toolbar">
      <q-input v-model="search"
               class="no-title"
               type="text"
               placeholder="جست و جو"
               @keyup.enter="updateList">
        <template #prepend>
          <q-icon color="grey-6"
                  name="ph:magnifying-glass" />
        </template>
      </q-input>
    </div>
    <q-separator class="my-tickets__separator" />
    <div class="my-tickets-list">
      <ticket-item v-for="(ticket, index) in computedTickets"
                   :key="index"
                   :ticket="ticket" />
    </div>
  </div>
</template>

<script>
import TicketItem from './components/TicketItem.vue'
const fakeTickets = [
  {
    user: {
      fullName: 'بهزاد آشفته',
      image: 'https://nodes.alaatv.com/upload/alaaPages/2024-01/Avatar1706441404.png'
    },
    messages: 8
  },
  {
    user: {
      fullName: 'بهزاد آشفته',
      image: 'https://nodes.alaatv.com/upload/alaaPages/2024-01/Avatar1706441404.png'
    },
    messages: 8
  },
  {
    user: {
      fullName: 'بهزاد آشفته',
      image: 'https://nodes.alaatv.com/upload/alaaPages/2024-01/Avatar1706441404.png'
    },
    messages: 8
  }
]
export default {
  name: 'MyOpenTickets',
  components: {
    TicketItem
  },
  props: {
    tickets: {
      type: Object,
      default: fakeTickets
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
      return this.tickets
    }
  },
  methods: {
    updateList () {
      this.$emit('updateList', this.search)
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
    gap: $space-4;
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
    width: 100%;
    gap: $space-3;
    align-self: stretch;
  }
}
</style>

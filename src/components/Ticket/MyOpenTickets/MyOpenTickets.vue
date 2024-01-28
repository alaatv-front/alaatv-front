<template>
  <div class="my-tickets-container">
    <div class="my-tickets-toolbar">
      <q-input v-model="search"
               type="text"
               placeholder="جست و جو"
               @keyup.enter="updateList">
        <template #prepend>
          <q-icon color="grey-6"
                  name="ph:magnifying-glass" />
        </template>
      </q-input>
      <q-separator class="my-tickets-toolbar__separator" />
    </div>
    <div class="my-tickets-list">
      <ticket-item v-for="(ticket, index) in tickets"
                   :key="index"
                   :ticket="ticket" />
    </div>
  </div>
</template>

<script>
import TicketItem from './components/TicketItem.vue'

export default {
  name: 'MyOpenTickets',
  components: {
    TicketItem
  },
  emits: ['updateList'],
  data () {
    return {
      search: '',
      tickets: [
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
    padding: $space-5 $spacing-none;
  }
  &-toolbar {
    padding: $spacing-none $space-4;
    &__separator {
      margin: $space-3 $spacing-none;
    }
  }
  &-list {
    padding: $spacing-none $space-3;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: $space-3;
    align-self: stretch;
  }
}
</style>

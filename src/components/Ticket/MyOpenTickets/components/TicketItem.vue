<template>
  <div class="ticket-item-container"
       :class="{'exact-ticket': isExactTicket}"
       @click="gotoTicket">
    <div class="ticket-item-avatar">
      <q-avatar size="40px">
        <lazy-img :src="ticket.user.photo"
                  width="40px"
                  height="40px" /></q-avatar>
      <div v-if="ticket.totalMessages > 0"
           class="ticket-item-avatar__badge">
        {{ticket.totalMessages}}
      </div>
    </div>
    <div class="ticket-item-description">
      <div class="ticket-item-description__user">
        {{ticket.user.first_name + ' ' + ticket.user.last_name}}
      </div>
      <div class="ticket-item-description__title ellipsis">
        {{ticket.title}}
        <q-tooltip>
          {{ticket.title}}
        </q-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Ticket } from 'src/models/Ticket.js'
import LazyImg from 'src/components/lazyImg.vue'
export default defineComponent({
  name: 'TicketItem',
  components: {
    LazyImg
  },
  props: {
    ticket: {
      type: Ticket,
      default: new Ticket()
    }
  },
  computed: {
    isExactTicket () {
      return this.$route.params.id === this.ticket.id
    }
  },
  methods: {
    gotoTicket () {
      this.$router.push({ name: 'Admin.Ticket.Show', params: { id: this.ticket.id } })
    }
  }
})
</script>

<style lang="scss" scoped>
  .ticket-item {
    &-container {
      padding: $space-1;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: $space-2;
      align-self: stretch;

      &:hover {
        border-radius: $radius-3;
        background: $grey-2;
      }

      &.exact-ticket {
        border-radius: $radius-3;
        background: $grey-2;
      }
    }

    &-avatar {
      position: relative;
      &__badge {
        display: flex;
        height: 16px;
        min-width: 16px;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: $spacing-none;
        right: $spacing-none;
        border-radius: $radius-5;
        background: $secondary;

        color: $grey-1;
        text-align: center;

        @include caption2;
      }
    }

    &-description {
      width: calc(100% - 48px);

      &__user {
        color: $grey-9;
        @include body2;
      }

      &__title {
        color: $grey-7;
        @include caption2;
        max-width: 100%;
      }
    }
  }
</style>

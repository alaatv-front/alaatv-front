<template>
  <div class="TicketMessageList">
    <div class="TicketMessageList__first-message">
      <div class="TicketMessageList__first-message-title">
        <q-icon name="ph:push-pin" />
        تیکت اصلی
      </div>
      <div class="TicketMessageList__first-message-body ellipsis">
        ellipsis
        {{ firstMessage?.body }}
      </div>
    </div>
    <div class="TicketMessageList__scroll-area">
      <ticket-message v-for="(message, messageIndex) in messageListExceptFirst"
                      :key="messageIndex"
                      :message="message"
                      :sent="user.id === message.user.id" />
    </div>
    <div class="TicketMessageList__send-input-area">
      <ticket-send-message-input />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Ticket } from 'src/models/Ticket.js'
import { mixinAuth } from 'src/mixin/Mixins.js'
import TicketMessage from 'src/components/Ticket/TicketMessage/TicketMessage.vue'
import TicketSendMessageInput from 'src/components/Ticket/TicketSendMessageInput/TicketSendMessageInput.vue'
export default defineComponent({
  name: 'TicketMessageList',
  components: { TicketMessage, TicketSendMessageInput },
  mixins: [mixinAuth],
  props: {
    ticket: {
      type: Ticket,
      default: new Ticket()
    }
  },
  computed: {
    firstMessage () {
      return this.ticket.messages.list[0]
    },
    messageListExceptFirst () {
      return this.ticket.messages.list.slice(1)
    }
  }
})
</script>

<style scoped lang="scss">
.TicketMessageList {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  min-height: 100%;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  .TicketMessageList__first-message {
    display: flex;
    padding: $space-2 $space-6;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: $space-1;
    align-self: stretch;
    border-bottom: $blue-grey-3;
    background: $grey-1;
    position: sticky;
    top: 0;
    .TicketMessageList__first-message-title {
      color: $secondary-7;
      @include caption1;
    }
    .TicketMessageList__first-message-body {
      color: $grey-9;
      @include caption1;
      width: 100%;
    }
  }
  .TicketMessageList__scroll-area {
    display: flex;
    padding: 0 $space-6 $space-5 $space-6;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    gap: $space-4;
    flex: 1 0 0;
    align-self: stretch;
    background: $blue-grey-1;
    height: 100%;
  }
  .TicketMessageList__send-input-area {
    position: sticky;
    bottom: 0;
  }
}
</style>

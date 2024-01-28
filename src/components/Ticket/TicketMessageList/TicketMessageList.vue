<template>
  <div class="TicketMessageList">
    <ticket-message v-for="(message, messageIndex) in messageList"
                    :key="messageIndex"
                    :message="message" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import TicketMessage from 'src/components/Ticket/TicketMessage/TicketMessage.vue'
export default defineComponent({
  name: 'TicketMessageList',
  components: { TicketMessage },
  props: {
    messageList: {
      type: Array,
      default: () => []
    }
  }
})
</script>

<style scoped lang="scss">
.TicketMessageList {
  padding: $space-6 0;
}
</style>

<template>
  <div class="ticket-log-container">
    <div class="ticket-log-header">
      سالقه مکالمه
    </div>
    <div class="ticket-log-list">
      <ticket-log-item />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import TicketLogItem from './components/TicketLogItem.vue'

export default defineComponent({
  name: 'TicketLogs',
  components: {
    TicketLogItem
  }
})
</script>
<style lang="scss" scoped>
.ticket-log {

  &-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    gap: $space-3;
  }
}
</style>

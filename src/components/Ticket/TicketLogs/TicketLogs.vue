<template>
  <div class="ticket-log-container">
    <div class="ticket-log-header">
      سابقه مکالمه
    </div>
    <div v-if="!logs.loading"
         class="ticket-log-list">
      <ticket-log-item v-for="(log, index) in logs.list"
                       :key="index"
                       :log="log" />
    </div>
    <div v-else
         class="ticket-log-list">
      <q-skeleton v-for="item in 4"
                  :key="item"
                  height="48px"
                  class="q-my-sm" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { TicketLogList } from 'src/models/TicketLog.js'
import TicketLogItem from './components/TicketLogItem.vue'

export default defineComponent({
  name: 'TicketLogs',
  components: {
    TicketLogItem
  },
  props: {
    logs: {
      type: TicketLogList,
      default: new TicketLogList()
    }
  }
})
</script>
<style lang="scss" scoped>
.ticket-log {

  &-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-self: stretch;
    gap: $space-3;
  }

  &-header {
    color: $grey-9;
    @include subtitle1;
  }

  &-list {
    width: 100%;
  }
}
</style>

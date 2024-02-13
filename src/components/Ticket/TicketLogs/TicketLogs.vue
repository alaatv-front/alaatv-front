<template>
  <div class="ticket-log-container">
    <div class="ticket-log-header">
      سابقه مکالمه
    </div>
    <div class="ticket-log-list">

      <entity-index v-if="loadEntity"
                    ref="logList"
                    class="log-list-entity-index"
                    :api="api"
                    :table-selection-mode="selectionMode"
                    :item-indicator-key="'id'"
                    :identifyKey="'id'"
                    :table-keys="tableKeys"
                    :show-search-button="false"
                    :show-reload-button="false"
                    :show-expand-button="false"
                    :default-layout="false"
                    :table-grid-size="true">
        <template #entity-index-table-item-cell="{inputData}">
          <ticket-log-item :log="getTicketLog(inputData.props.row)" />
        </template>
      </entity-index>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { EntityIndex } from 'quasar-crud'
import { Ticket } from 'src/models/Ticket.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { TicketLog } from 'src/models/TicketLog.js'
import TicketLogItem from './components/TicketLogItem.vue'

export default defineComponent({
  name: 'TicketLogs',
  components: {
    EntityIndex,
    TicketLogItem
  },
  props: {
    ticket: {
      type: Ticket,
      default: new Ticket()
    }
  },
  data () {
    return {
      api: '',
      mounted: false,
      selectionMode: 'single',
      tableGridSize: true,
      tableKeys: {
        data: 'data',
        total: 'meta.total',
        currentPage: 'meta.current_page',
        perPage: 'meta.per_page',
        pageKey: 'page'
      }
    }
  },
  computed: {
    loadEntity () {
      return this.mounted && this.ticket.id
    }
  },
  watch: {
    ticket () {
      this.api = APIGateway.ticket.APIAdresses.logs(this.ticket.id)
      if (this.$refs.logList) {
        this.$refs.logList.search()
      }
    }
  },
  mounted () {
    this.mounted = true
  },
  methods: {
    getTicketLog (log) {
      return new TicketLog(log)
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

    :deep(.quasar-crud-index-table) {
      padding: 0 !important;

      .q-table__top {
        display: none;
      }
    }

    :deep(.q-expansion-item) {
      box-shadow: none !important;
      padding: 0 !important;

      .q-expansion-item__content  {
        padding: 0;
      }
    }
  }
}
</style>

<template>
  <q-item class="ticket-log-item">
    <q-item-section top
                    class="ticket-log-item__photo"
                    avatar>
      <q-avatar v-if="log.user.photo"
                size="32px">
        <lazy-img :src="log.user.photo"
                  width="32px"
                  height="32px" />
      </q-avatar>
      <q-avatar v-else
                size="32px"
                font-size="32px"
                color="grey"
                text-color="white"
                icon="ph:user" />
    </q-item-section>
    <q-item-section>
      <q-item-label class="ticket-log-item__info">
        <div class="ticket-log-item__user">
          {{ log.user.full_name }}
        </div>
        <div class="ticket-log-item__action">
          {{ log.action }}
        </div>
        <div class="ticket-log-item__date">
          {{ log.shamsiDate('created_at').dateTime }}
        </div>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'
import LazyImg from 'src/components/lazyImg.vue'
import { TicketLog } from 'src/models/TicketLog.js'

export default defineComponent({
  name: 'TicketLogItem',
  components: {
    LazyImg
  },
  props: {
    log: {
      type: TicketLog,
      default: new TicketLog()
    }
  }
})
</script>
<style lang="scss" scoped>
.ticket-log-item {
  padding: $space-4 $spacing-none;
  width: 100%;

  &__photo {
    justify-content: center;
    min-width: fit-content;
    padding-right: $space-2 !important;
  }

  &__info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  &__action {
    margin-left: $space-2;
  }

  &__date {
    margin-left: $space-5;
  }

  &:not(:last-child) {
    border-bottom: 1px solid $blue-grey-3;
  }
}
</style>

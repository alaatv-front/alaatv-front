<template>
  <q-item class="ticket-log-item">
    <q-item-section top
                    avatar>
      <q-avatar color="primary"
                text-color="white"
                icon="bluetooth" />
    </q-item-section>
    <q-item-section>
      <q-item-label>Single line item</q-item-label>
      <q-item-label caption
                    lines="2">Secondary line text.</q-item-label>
    </q-item-section>
    <q-item-section side
                    top>
      <q-item-label caption>5 min ago</q-item-label>
      <q-icon name="star"
              color="yellow" />
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TicketLogItem'
})
</script>
<style lang="scss" scoped>
.ticket-log-item {

}
</style>

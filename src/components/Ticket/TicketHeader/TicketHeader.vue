<template>
  <div class="ticket-header-container">
    <div class="ticket-header-base">
      <div class="ticket-header-back">
        <q-btn icon="ph:arrow-right"
               color="grey"
               square
               class="size-md"
               flat />
      </div>
      <div class="ticket-header__user">
        <q-avatar size="40px">
          <lazy-img :src="ticket.user.photo"
                    width="40px"
                    height="40px" /></q-avatar>
        <div class="ticket-header__user--name">{{ ticket.user.full_name }}</div>
      </div>
      <q-btn icon="ph:caret-down"
             color="grey"
             square
             class="size-md"
             flat>
        <q-menu anchor="bottom left"
                self="top left">
          <q-item clickable>
            <q-item-section>ویرایش پروفایل</q-item-section>
          </q-item>
        </q-menu>
      </q-btn>
    </div>
    <div class="ticket-header-action">
      <q-btn icon="ph:shopping-cart-simple"
             color="grey"
             square
             class="size-md"
             flat
             @click="openMyOrderDialog" />
      <q-btn icon="ph:user-list"
             color="grey"
             square
             class="size-md"
             flat
             @click="openTicketListDialog" />
    </div>

    <q-dialog v-model="myOrderDialog">
      <div class="my-order-dialog-wrapper">
        <inside-dialog>
          <template #header-icon>
            <badge-icon icon="ph:shopping-cart-simple"
                        color="primary" />
          </template>
          <template #header>
            سفارش های کاربر
          </template>
          <template #body>
            <my-orders :is-admin-orders="true"
                       :ticket-user="ticket.user"
                       :show-title="false" />
          </template>
        </inside-dialog>
      </div>
    </q-dialog>
    <q-dialog v-model="ticketListDialog">
      <div class="ticket-list-dialog-wrapper">
        <inside-dialog>
          <template #header-icon>
            <badge-icon icon="ph:ticket"
                        color="primary" />
          </template>
          <template #header>
            تیکت های دیگر کاربر
          </template>
          <template #body>
            <ticket-item :ticket="ticket" />
          </template>
        </inside-dialog>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Ticket } from 'src/models/Ticket.js'
import LazyImg from 'src/components/lazyImg.vue'
import BadgeIcon from 'src/components/Utils/BadgeIcon.vue'
import TicketItem from './components/TicketItem/TicketItem.vue'
import InsideDialog from 'src/components/Utils/InsideDialog.vue'
import MyOrders from 'src/components/Widgets/User/MyOrders/MyOrders.vue'

export default defineComponent({
  name: 'TicketHeader',
  components: {
    LazyImg,
    MyOrders,
    BadgeIcon,
    TicketItem,
    InsideDialog
  },
  props: {
    ticket: {
      type: Ticket,
      default: new Ticket()
    }
  },
  data () {
    return {
      myOrderDialog: false,
      ticketListDialog: false
    }
  },
  methods: {
    openMyOrderDialog () {
      this.myOrderDialog = true
    },
    openTicketListDialog () {
      this.ticketListDialog = true
    }
  }
})
</script>

<style lang="scss" scoped>
.my-order-dialog-wrapper {
  width: 830px;
  max-width: 830px;
  @include  media-max-width('md') {
    width: 100%;
  max-width: 100%;
  }
}
.ticket-list-dialog-wrapper {
  width: 600px;
  max-width: 600px;
  @include  media-max-width('md') {
    width: 100%;
  max-width: 100%;
  }
}
.ticket-header {
  &-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    width: 100%;
  }

  &-base {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 1 0 0;
  }

  &__user {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 12px;
  }
}
</style>

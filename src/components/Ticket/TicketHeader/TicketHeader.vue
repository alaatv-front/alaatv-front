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
             class="size-md ticket-header__user-action"
             flat>
        <q-menu anchor="bottom left"
                self="top left">
          <q-item clickable
                  @click="openProfileDialog">
            <q-item-section>ویرایش پروفایل</q-item-section>
          </q-item>
        </q-menu>
      </q-btn>
    </div>
    <div class="ticket-header-action--desktop">
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
    <div class="ticket-header-action--mobile">
      <q-btn icon="ph:users"
             color="grey"
             square
             class="size-md"
             flat
             @click="openTickets" />
      <q-btn icon="ph:dots-three-vertical"
             color="grey"
             square
             class="size-md"
             flat>
        <q-menu anchor="bottom left"
                self="top left">
          <q-item clickable
                  @click="openProfileDialog">
            <q-item-section>ویرایش پروفایل</q-item-section>
          </q-item>
          <q-item clickable
                  @click="callUser">
            <q-item-section>تماس با کاربر</q-item-section>
          </q-item>
          <q-item clickable
                  @click="openMyOrderDialog">
            <q-item-section>سفارش ها</q-item-section>
          </q-item>
          <q-item clickable
                  @click="openTicketListDialog">
            <q-item-section>تیکت‌های کاربر</q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>وضعیت</q-item-section>
            <q-item-section side>
              <q-icon name="ph:caret-left"
                      size="xs" />
            </q-item-section>

            <q-menu anchor="top end"
                    self="top start">
              <q-list>
                <q-item dense
                        clickable>
                  <q-item-section>پاسخ داده شده</q-item-section>
                </q-item>
                <q-item dense
                        clickable>
                  <q-item-section>بسته شده</q-item-section>
                </q-item>
                <q-item dense
                        clickable>
                  <q-item-section>در حال بررسی</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>
          <q-item clickable
                  @click="openInfoForm">
            <q-item-section>بیشتر</q-item-section>
          </q-item>
        </q-menu>
      </q-btn>
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
    <q-dialog v-model="profileDialog">
      <div class="ticket-list-dialog-wrapper">
        <inside-dialog :action="false">
          <template #header-icon>
            <badge-icon icon="ph:ticket"
                        color="primary" />
          </template>
          <template #header>
            تیکت های دیگر کاربر
          </template>
          <template #body>
            <profile-edit :ticket="ticket" />
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
import TicketItem from './components/TicketItem.vue'
import ProfileEdit from './components/ProfileEdit.vue'
import BadgeIcon from 'src/components/Utils/BadgeIcon.vue'
import InsideDialog from 'src/components/Utils/InsideDialog.vue'
import MyOrders from 'src/components/Widgets/User/MyOrders/MyOrders.vue'

export default defineComponent({
  name: 'TicketHeader',
  components: {
    LazyImg,
    MyOrders,
    BadgeIcon,
    TicketItem,
    ProfileEdit,
    InsideDialog
  },
  props: {
    ticket: {
      type: Ticket,
      default: new Ticket()
    }
  },
  emits: ['openTickets', 'openInfoForm'],
  data () {
    return {
      myOrderDialog: false,
      profileDialog: false,
      ticketListDialog: false
    }
  },
  methods: {
    openMyOrderDialog () {
      this.myOrderDialog = true
    },
    openProfileDialog () {
      this.profileDialog = true
    },
    openTicketListDialog () {
      this.ticketListDialog = true
    },
    openTickets () {
      this.$emit('openTickets')
    },
    openInfoForm () {
      this.$emit('openInfoForm')
    },
    callUser () {
      alert('calling ...')
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

  &__user-action {
    @include media-max-width ('sm') {
      display: none;
    }
  }

  &-action {

    &--desktop {
      @include media-max-width ('sm') {
        display: none;
      }
    }

    &--mobile {
      @include media-min-width ('sm') {
        display: none;
      }
    }
  }
}
</style>

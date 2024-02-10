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
             @click="openOtherTicketListDialog" />
    </div>
    <div class="ticket-header-action--mobile">
      <q-btn icon="ph:clock-counter-clockwise"
             color="grey"
             square
             class="size-md"
             flat
             @click="showTicketLogs" />
      <q-btn icon="ph:users"
             color="grey"
             square
             class="size-md"
             flat
             @click="showTickets" />
      <q-btn icon="ph:dots-three-vertical"
             color="grey"
             square
             class="size-md"
             flat>
        <q-menu anchor="bottom left"
                self="top left">
          <q-item v-close-popup
                  clickable
                  @click="openProfileDialog">
            <q-item-section>ویرایش پروفایل</q-item-section>
          </q-item>
          <q-item v-close-popup
                  clickable
                  @click="callUser">
            <q-item-section>تماس با کاربر</q-item-section>
          </q-item>
          <q-item v-close-popup
                  clickable
                  @click="openMyOrderDialog">
            <q-item-section>سفارش ها</q-item-section>
          </q-item>
          <q-item v-close-popup
                  clickable
                  @click="openOtherTicketListDialog">
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
                <q-item v-for="(status, index) in statuses.list"
                        :key="index"
                        v-close-popup
                        dense
                        clickable
                        @click="updateTicket(status.id)">
                  <q-item-section>{{ status.title }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>
          <q-item v-close-popup
                  clickable
                  @click="showInfoForm">
            <q-item-section>بیشتر</q-item-section>
          </q-item>
        </q-menu>
      </q-btn>
    </div>

    <q-dialog v-model="myOrderDialog">
      <div class="my-order-dialog-wrapper">
        <inside-dialog :action="false">
          <template #header-icon>
            <badge-icon icon="ph:shopping-cart-simple"
                        color="primary" />
          </template>
          <template #header>
            سفارش های کاربر
          </template>
          <template #body>
            <div class="my-order-component">
              <my-orders :is-admin="true"
                         :user-id="ticket.user.id"
                         :show-title="false" />
            </div>
          </template>
        </inside-dialog>
      </div>
    </q-dialog>
    <q-dialog v-model="otherTicketListDialog">
      <div class="ticket-list-dialog-wrapper">
        <other-ticket :ticket="ticket"
                      :filter="otherTicketFilter"
                      :load-data="false"
                      :department-list="departmentList" />
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
            ویرایش حساب کاربری
          </template>
          <template #body>
            <user-profile-edit :user-id="ticket.user.id" />
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
import { TicketStatusList } from 'src/models/TicketStatus.js'
import InsideDialog from 'src/components/Utils/InsideDialog.vue'
import { TicketDepartmentList } from 'src/models/TicketDepartment.js'
import MyOrders from 'src/components/Widgets/User/MyOrders/MyOrders.vue'
import OtherTicket from 'src/components/Ticket/OtherTicket/OtherTicket.vue'
import UserProfileEdit from 'src/components/UserProfileEdit/UserProfileEdit.vue'
import { APIGateway } from 'src/api/APIGateway'

export default defineComponent({
  name: 'TicketHeader',
  components: {
    LazyImg,
    MyOrders,
    BadgeIcon,
    OtherTicket,
    InsideDialog,
    UserProfileEdit
  },
  props: {
    ticket: {
      type: Ticket,
      default: new Ticket()
    },
    statuses: {
      type: TicketStatusList,
      default: new TicketStatusList()
    },
    departmentList: {
      type: TicketDepartmentList,
      default: new TicketDepartmentList()
    }
  },
  emits: ['showTickets', 'showInfoForm', 'showTicketLogs', 'updateTicket'],
  data () {
    return {
      myOrderDialog: false,
      profileDialog: false,
      otherTicketListDialog: false,
      otherTicketFilter: {
        status: false,
        priority: false,
        department: true,
        button: false
      }
    }
  },
  methods: {
    updateTicket (statusId) {
      APIGateway.ticket.updateTicket(this.ticket.id, {
        status_id: statusId
      })
        .then(ticket => {
          this.$emit('updateTicket', ticket)
          this.$q.notify({
            type: 'positive',
            message: 'وضعیت کاربر با موفقیت تغییر داده شد',
            position: 'top'
          })
        })
    },
    openMyOrderDialog () {
      this.myOrderDialog = true
    },
    openProfileDialog () {
      this.profileDialog = true
    },
    openOtherTicketListDialog () {
      this.otherTicketListDialog = true
    },
    showTickets () {
      this.$emit('showTickets')
    },
    showInfoForm () {
      this.$emit('showInfoForm')
    },
    showTicketLogs () {
      this.$emit('showTicketLogs')
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
  overflow-y: hidden;
  @include  media-max-width('md') {
    width: 100%;
    max-width: 100%;
  }

  :deep(.empty-order-list) {
    height: auto;
  }

  :deep(.quasar-crud-index-table .q-table__container .q-table__middle table th ) {
    padding: $space-5 $space-6;
  }
  :deep(.my-orders-list[data-v-bce2898a] .quasar-crud-index-table .q-table__container .q-table__middle table tr td  ) {
    padding: $space-1 $space-7;
  }
  :deep(.q-expansion-item .q-expansion-item__content ) {
    padding: $spacing-none $spacing-none $space-1;
  }

  .my-order-component {
    overflow-y: auto;
    max-height: 700px;
  }
}
.ticket-list-dialog-wrapper {
  overflow-y: hidden;
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
    gap: $space-3;
  }

  &__user-action {
    @include media-max-width ('md') {
      display: none;
    }
  }

  &-action {

    &--desktop {
      @include media-max-width ('md') {
        display: none;
      }
    }

    &--mobile {
      @include media-min-width ('md') {
        display: none;
      }
    }
  }
}
</style>

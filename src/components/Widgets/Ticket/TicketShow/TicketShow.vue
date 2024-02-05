<template>
  <div class="TicketShow">
    <div class="TicketShow__breadcrumbs">
      <q-breadcrumbs class="text-grey-9"
                     active-color="grey-6">
        <template v-slot:separator>
          <q-icon size="xs"
                  name="isax:arrow-right-3"
                  color="grey-6" />
        </template>
        <q-breadcrumbs-el to="/"
                          label="صفحه اصلی" />
        <q-breadcrumbs-el :to="{ name: 'UserPanel.Ticket.Index' }"
                          label="تیکت پشتیبانی" />
        <q-breadcrumbs-el>
          <q-skeleton v-if="!ticket.id"
                      type="text"
                      width="100px" />
          <template v-else>
            {{ 'تیکت ' + ticket.id }}
          </template>
        </q-breadcrumbs-el>
      </q-breadcrumbs>
    </div>
    <div class="TicketShow__template row">
      <div class="col-lg-2 col-md-3 gt-sm">
        <div ref="MyOpenTickets"
             class="TicketShow__my-open-tickets">
          <my-open-tickets :tickets="pendingTickets" />
        </div>
      </div>
      <div class="col-lg-10 col-md-9 col-12">
        <div class="row">
          <div class="col-12">
            <div class="TicketShow__header">
              <ticket-header :ticket="ticket"
                             @openTickets="openMyOpenTicketDrawer"
                             @openInfoForm="openTicketInfoFormDrawer" />
            </div>
          </div>
          <div class="col-lg-8 col-md-6 col-12">
            <div class="TicketShow__messages">
              <ticket-message-list :ticket="ticket"
                                   @cancelUpload="onCancelUploadFile"
                                   @sendingMessage="onSendingMessage" />
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-12 gt-sm">
            <div class="TicketShow__ticket-info">
              <ticket-info-form :ticket="ticket"
                                :statuses="ticketStatuses"
                                :priorities="ticketPriorities"
                                :departments="ticketDepartments" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <q-layout v-if="$q.screen.lt.md">
      <q-drawer ref="actionDrawer"
                v-model="myOpenTicketDrawer"
                overlay>
        <div class="TicketShow__drawer-my-open-tickets">
          <div class="TicketShow__drawer-my-open-tickets-top-action">
            <q-btn flat
                   square
                   icon="ph:x"
                   class="TicketShow__drawer-my-open-tickets-close-btn"
                   @click="closeMyOpenTicketDrawer" />
          </div>
          <my-open-tickets :tickets="pendingTickets" />
        </div>
      </q-drawer>
      <q-drawer ref="actionDrawer"
                v-model="ticketInfoFormDrawer"
                behavior="mobile"
                side="right"
                overlay>
        <div class="TicketShow__drawer-ticket-info">
          <div class="TicketShow__drawer-ticket-info-top-action">
            <q-btn flat
                   square
                   icon="ph:x"
                   class="TicketShow__drawer-ticket-info-close-btn"
                   @click="closeTicketInfoFormDrawer" />
          </div>
          <ticket-info-form :ticket="ticket"
                            :statuses="ticketStatuses"
                            :priorities="ticketPriorities"
                            :departments="ticketDepartments" />
        </div>
      </q-drawer>
    </q-layout>
  </div>
</template>

<script>
import { APIGateway } from 'src/api/APIGateway.js'
import { Ticket, TicketList } from 'src/models/Ticket.js'
import { TicketMessage } from 'src/models/TicketMessage.js'
import { TicketStatusList } from 'src/models/TicketStatus.js'
import { mixinTicket, mixinWidget } from 'src/mixin/Mixins.js'
import { TicketPriorityList } from 'src/models/TicketPriority.js'
import { TicketDepartmentList } from 'src/models/TicketDepartment.js'
import TicketHeader from 'src/components/Ticket/TicketHeader/TicketHeader.vue'
import MyOpenTickets from 'src/components/Ticket/MyOpenTickets/MyOpenTickets.vue'
import TicketInfoForm from 'src/components/Ticket/TicketInfoForm/TicketInfoForm.vue'
import TicketMessageList from 'src/components/Ticket/TicketMessageList/TicketMessageList.vue'

export default {
  name: 'TicketShow',
  components: {
    TicketHeader,
    MyOpenTickets,
    TicketInfoForm,
    TicketMessageList
  },
  mixins: [mixinTicket, mixinWidget],
  props: {
    options: {
      type: Object,
      default () {
        return {
          indexRouteName: ''
        }
      }
    }
  },
  data () {
    return {
      myOpenTicketDrawer: false,
      ticketInfoFormDrawer: false,
      ticket: new Ticket({
        id: 191163,
        title: 'قلم قرمز برای آقا یک ساعت.',
        user: {
          id: 2,
          first_name: 'ویراف',
          last_name: 'داور',
          mobile: '09544659813',
          national_code: '0000000000',
          photo: 'https://nodes.alaatv.com/upload/images/profile/default_avatar.jpg',
          role: 'پشتیبان',
          major: null
        },
        priority: {
          id: 3,
          title: 'فوری'
        },
        status: {
          id: 1,
          title: 'پاسخ داده نشده',
          name: 'unanswered'
        },
        department: {
          id: 23,
          title: 'ابریشم پرو'
        },
        orderproduct: null,
        order: null,
        messages: [
          {
            id: 578122,
            user: {
              id: 2,
              first_name: 'ویراف',
              last_name: 'داور',
              mobile: '09544659813',
              national_code: '0000000000',
              photo: 'https://nodes.alaatv.com/upload/images/profile/default_avatar.jpg',
              role: 'پشتیبان',
              major: null
            },
            ticket_id: 191163,
            body: 'این ته، دم در زندان قدم زدم و در دفتر بازرسی تصدیق کرد که این صدا را پای تخته سیاه خراب خواهد کرد. و گفتم: - این بازرسی تصدیق کرد که این صدا را پای تخته سیاه خراب خواهد کرد. و گفتم: - این بازرسی تصدیق کرد که این صدا را پای تخته سیاه خراب خواهد کرد. و گفتم: - این بازرسی تصدیق کرد که این صدا را پای تخته سیاه خراب خواهد کرد. و گفتم: - این.',
            files: {
              photo: null,
              voice: null,
              file: null
            },
            is_private: 0,
            report: {
              has_reported: 0,
              report_description: null
            },
            created_at: '2024-01-28 04:57:27'
          },
          {
            id: 578122,
            user: {
              id: 1,
              first_name: 'رجاء',
              last_name: 'همدانی',
              mobile: '09544659813',
              national_code: '0000000000',
              photo: 'https://nodes.alaatv.com/upload/images/profile/default_avatar.jpg',
              role: 'پشتیبان',
              major: null
            },
            ticket_id: 191163,
            body: 'این ته، دم در زندان قدم زدم و در دفتر بازرسی تصدیق کرد که این صدا را پای تخته سیاه خراب خواهد کرد. و گفتم: - این.',
            files: {
              photo: null,
              voice: null,
              file: null
            },
            is_private: 0,
            report: {
              has_reported: 0,
              report_description: null
            },
            created_at: '2024-01-28 04:57:27'
          },
          {
            id: 578123,
            user: {
              id: 2,
              first_name: 'آفاق',
              last_name: 'کاشی',
              mobile: '09999999999',
              national_code: '0000000000',
              photo: 'https://nodes.alaatv.com/upload/images/profile/default_avatar.jpg',
              role: 'پشتیبان فنی',
              major: null
            },
            ticket_id: 191163,
            body: 'به دستش دادم و موقع آن رسیده بود که چنین اهمیتی پیدا می‌کردم. این هم یک مزیت دیگر مدیری مدرسه بود! سی صد تومان.',
            files: {
              photo: null,
              voice: null,
              file: null
            },
            is_private: 0,
            report: {
              has_reported: 0,
              report_description: null
            },
            created_at: '2024-01-28 04:57:27'
          },
          {
            id: 578122,
            user: {
              id: 1,
              first_name: 'رجاء',
              last_name: 'همدانی',
              mobile: '09544659813',
              national_code: '0000000000',
              photo: 'https://nodes.alaatv.com/upload/images/profile/default_avatar.jpg',
              role: 'پشتیبان',
              major: null
            },
            ticket_id: 191163,
            body: 'این ته، دم در زندان قدم زدم و در دفتر بازرسی تصدیق کرد که این صدا را پای تخته سیاه خراب خواهد کرد. و گفتم: - این.',
            files: {
              photo: null,
              voice: null,
              file: null
            },
            is_private: 0,
            report: {
              has_reported: 0,
              report_description: null
            },
            created_at: '2024-01-28 04:57:27'
          },
          {
            id: 578122,
            user: {
              id: 1,
              first_name: 'رجاء',
              last_name: 'همدانی',
              mobile: '09544659813',
              national_code: '0000000000',
              photo: 'https://nodes.alaatv.com/upload/images/profile/default_avatar.jpg',
              role: 'پشتیبان',
              major: null
            },
            ticket_id: 191163,
            body: 'این ته، دم در زندان قدم زدم و در دفتر بازرسی تصدیق کرد که این صدا را پای تخته سیاه خراب خواهد کرد. و گفتم: - این.',
            files: {
              photo: null,
              voice: null,
              file: null
            },
            is_private: 0,
            report: {
              has_reported: 0,
              report_description: null
            },
            created_at: '2024-01-28 04:57:27'
          },
          {
            id: 578122,
            user: {
              id: 1,
              first_name: 'رجاء',
              last_name: 'همدانی',
              mobile: '09544659813',
              national_code: '0000000000',
              photo: 'https://nodes.alaatv.com/upload/images/profile/default_avatar.jpg',
              role: 'پشتیبان',
              major: null
            },
            ticket_id: 191163,
            body: 'این ته، دم در زندان قدم زدم و در دفتر بازرسی تصدیق کرد که این صدا را پای تخته سیاه خراب خواهد کرد. و گفتم: - این.',
            files: {
              photo: null,
              voice: null,
              file: null
            },
            is_private: 0,
            report: {
              has_reported: 0,
              report_description: null
            },
            created_at: '2024-01-28 04:57:27'
          }
        ],
        logs: [
          {
            user: {
              id: 2,
              first_name: 'ویراف',
              last_name: 'داور',
              mobile: '09544659813',
              national_code: '0000000000',
              photo: 'https://nodes.alaatv.com/upload/images/profile/default_avatar.jpg',
              role: 'پشتیبان',
              major: null
            },
            action: 'ثبت تیکت',
            before: null,
            after: null,
            created_at: '2024-01-28 04:57:27'
          },
          {
            user: {
              id: 2,
              first_name: 'ویراف',
              last_name: 'داور',
              mobile: '09544659813',
              national_code: '0000000000',
              photo: 'https://nodes.alaatv.com/upload/images/profile/default_avatar.jpg',
              role: 'پشتیبان',
              major: null
            },
            action: 'ثبت پیام برای تیکت',
            before: null,
            after: null,
            created_at: '2024-01-28 04:57:27'
          },
          {
            user: {
              id: 1,
              first_name: 'آفاق',
              last_name: 'کاشی',
              mobile: '09999999999',
              national_code: '0000000000',
              photo: 'https://nodes.alaatv.com/upload/images/profile/default_avatar.jpg',
              role: 'پشتیبان فنی',
              major: null
            },
            action: 'ثبت پیام برای تیکت',
            before: null,
            after: null,
            created_at: '2024-01-28 04:57:27'
          },
          {
            user: {
              id: 1,
              first_name: 'آفاق',
              last_name: 'کاشی',
              mobile: '09999999999',
              national_code: '0000000000',
              photo: 'https://nodes.alaatv.com/upload/images/profile/default_avatar.jpg',
              role: 'پشتیبان فنی',
              major: null
            },
            action: 'تغییر وضعیت تیکت',
            before: 'پاسخ داده نشده',
            after: 'پاسخ داده شده',
            created_at: '2024-01-28 04:57:27'
          }
        ],
        tags: null,
        ticket_form: null,
        assignees: [],
        rate: null,
        updated_at: '2024-01-28 04:57:27',
        created_at: '2024-01-28 04:57:27'
      }),
      pendingTickets: new TicketList(),
      ticketStatuses: new TicketStatusList(),
      ticketPriorities: new TicketPriorityList(),
      ticketDepartments: new TicketDepartmentList()
    }
  },
  mounted () {
    this.getNeededDataForTicket()
  },
  methods: {
    openMyOpenTicketDrawer () {
      this.myOpenTicketDrawer = true
    },
    openTicketInfoFormDrawer () {
      this.ticketInfoFormDrawer = true
    },
    closeMyOpenTicketDrawer () {
      this.myOpenTicketDrawer = false
    },
    closeTicketInfoFormDrawer () {
      this.ticketInfoFormDrawer = false
    },
    getTicket (ticketId) {
      this.ticket.loading = true
      APIGateway.ticket.get({ data: { id: ticketId } })
        .then((ticket) => {
          this.ticket.loading = false
          this.ticket = new Ticket(ticket)
        })
        .catch(() => {
          this.ticket.loading = false
        })
    },
    getSupporterList (ticketId) {
      this.ticket.loading = true
      APIGateway.ticket.get({ data: { id: ticketId } })
        .then((ticket) => {
          this.ticket.loading = false
          this.ticket = new Ticket(ticket)
        })
        .catch(() => {
          this.ticket.loading = false
        })
    },
    getPendingTickets (ticketId) {
      this.pendingTickets.loading = true
      APIGateway.ticket.get({ data: { id: ticketId } })
        .then((ticket) => {
          this.pendingTickets.loading = false
          this.pendingTickets = new Ticket(ticket)
        })
        .catch(() => {
          this.pendingTickets.loading = false
        })
    },
    getNeededDataForTicket () {
      this.ticketStatuses.loading = true
      this.ticketPriorities.loading = true
      this.ticketDepartments.loading = true
      APIGateway.ticket.getNeededDataToCreateTicket()
        .then(({ departments, priorities, statuses }) => {
          this.ticketStatuses = new TicketStatusList(statuses)
          this.ticketPriorities = new TicketPriorityList(priorities)
          this.ticketDepartments = new TicketDepartmentList(departments)
        })
        .catch(() => {
          this.ticketStatuses.loading = false
          this.ticketPriorities.loading = false
          this.ticketDepartments.loading = false
        })
    },
    sendTicketMessage (ticketMessage) {
      ticketMessage.body = ticketMessage.body.replace(/\r?\n/g, '<br/>')
      this.ticket.loading = true
      APIGateway.ticket.sendTicketMessage(ticketMessage)
        .then((ticketMessage) => {
          this.ticket.loading = false
          this.ticket.messages.list.push(new TicketMessage(ticketMessage))
        })
        .catch(() => {
          this.ticket.loading = false
        })
    },
    onSendingMessage (data) {
      this.createSendingMessage(data.body, data.files.map(file => {
        file.progress = 58
        return file
      }))
    },
    deleteMessage (messageId) {
      const targetIndex = this.ticket.messages.list.findIndex(message => message.id === messageId)
      if (targetIndex === -1) {
        return
      }

      this.ticket.messages.list.splice(targetIndex, 1)
    },
    onCancelUploadFile (data) {
      const oldSendingMessage = this.ticket.messages.list[data.messageIndex]
      oldSendingMessage.files[data.fileIndex].progress = 25
      this.deleteMessage(oldSendingMessage.id)
      this.createSendingMessage(oldSendingMessage.body, oldSendingMessage.files)
    },
    createSendingMessage (body, files) {
      APIGateway.ticket.presignedUrl(files[0].name)
        .then((url) => {

        })
        .catch(() => {

        })
      this.ticket.messages.list.push(new TicketMessage({
        id: 'temp-message-' + Date.now(),
        body,
        files
      }))
    },
    getAllFilesPresignedUrl (files) {
      const promisses = []
      files.forEach((file) => {
        promisses.push(APIGateway.ticket.presignedUrl(file.name))
      })

      Promise.all(promisses)
        .then((urls) => {

        })
        .catch(() => {

        })
    }
  }
}
</script>

<style scoped lang="scss">
.TicketShow {
  .TicketShow__breadcrumbs {
    margin-bottom: $space-6;
  }
  .TicketShow__template {
    /* 1440 < page < 1920 */
    @include media-max-width('xl') {
    }
    /* 1024 < page < 1440 */
    @include media-max-width('lg') {
    }
    /* 600 < page < 1024 */
    @include media-max-width('md') {
    }
    /* 360 < page < 600 */
    @include media-max-width('sm') {
    }
    .TicketShow__header {
      display: flex;
      padding: $space-3 $space-4;
      justify-content: space-between;
      width: 100%;
      align-items: center;
      align-self: stretch;
      border-bottom: 1px solid $blue-grey-3;
      border-radius: $radius-none $radius-4 $radius-none $radius-none;
      background: $grey-1;
      /* 600 < page < 1024 */
      @include media-max-width('md') {
        border-radius: $radius-none !important;
      }
    }
    .TicketShow__my-open-tickets {
      display: flex;
      height: 100%;
      padding: $space-5 $space-3;
      flex-direction: column;
      align-items: center;
      align-self: stretch;
      border-radius: $radius-4 $radius-none $radius-none $radius-4;
      border-right: 1px solid $blue-grey-3;
      background: $grey-1;
    }
    .TicketShow__ticket-info {
      display: flex;
      height: 100%;
      padding: $space-6;
      flex-direction: column;
      align-items: center;
      gap: $space-5;
      align-self: stretch;
      background: $grey-1;
      border-left: 1px solid $blue-grey-3;
      border-radius: $radius-none $radius-none $radius-4 $radius-none;
    }
    .TicketShow__messages {
      height: 100%;
      min-height: 100%;
      max-height: calc( 100vh - 300px);
      /* 600 < page < 1024 */
      @include media-max-width('md') {
        max-height: calc( 100vh - 194px);
      }
    }
  }
  .TicketShow__drawer-my-open-tickets {
    height: 100%;
    background: $grey-1;
    padding: $space-5;
    .TicketShow__drawer-my-open-tickets-top-action {
      display: flex;
      justify-content: flex-start;
      margin-bottom: $space-4;
    }
  }
  .TicketShow__drawer-ticket-info {
    height: 100%;
    background: $grey-1;
    padding: $space-5;
    .TicketShow__drawer-ticket-info-top-action {
      display: flex;
      justify-content: flex-start;
      margin-bottom: $space-4;
    }
  }
  &:deep(.q-layout) {
    min-height: 0 !important;
  }
}
</style>

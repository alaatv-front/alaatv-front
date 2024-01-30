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
    <div class="TicketShow__template">
      <div class="TicketShow__header">
        TicketShow__header
      </div>
      <div class="TicketShow__my-open-tickets">
        TicketShow__my-open-tickets
      </div>
      <div class="TicketShow__ticket-info">
        TicketShow__ticket-info
      </div>
      <div class="TicketShow__messages">
        <ticket-message-list :ticket="ticket" />
      </div>
    </div>
  </div>
</template>

<script>
import { Ticket } from 'src/models/Ticket.js'
// import { APIGateway } from 'src/api/APIGateway.js'
import { mixinTicket, mixinWidget } from 'src/mixin/Mixins.js'
import TicketMessageList from 'src/components/Ticket/TicketMessageList/TicketMessageList.vue'

export default {
  name: 'TicketShow',
  components: {
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
              id: 1,
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
      })
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.TicketShow {
  .TicketShow__breadcrumbs {
    margin-bottom: $space-6;
  }
  .TicketShow__template {
    display: grid;
    grid-template-columns: 184px auto 288px;
    grid-template-rows: 72px auto;
    grid-column-gap: 0;
    grid-row-gap: 0;
    /* 1440 < page < 1920 */
    @include media-max-width('xl') {
      grid-template-columns: 152px auto 240px;
    }
    /* 1024 < page < 1440 */
    @include media-max-width('lg') {
      grid-template-columns: 161px auto 220px;
    }
    /* 600 < page < 1024 */
    @include media-max-width('md') {
      .clickBodyMovin {
        width: 160px;
        bottom: 240px;
      }
    }
    /* 360 < page < 600 */
    @include media-max-width('sm') {
      .clickBodyMovin {
        width: 128px;
        bottom: 240px;
      }
    }
    .TicketShow__header {
      grid-area: 1 / 2 / 2 / 4;
      display: flex;
      padding: $space-3 $space-4;
      justify-content: space-between;
      align-items: center;
      align-self: stretch;
      border-bottom: 1px solid $blue-grey-3;
      border-radius: $radius-none $radius-4 $radius-none $radius-none;
      background: $grey-1;
    }
    .TicketShow__my-open-tickets {
      grid-area: 1 / 1 / 3 / 2;
      display: flex;
      padding: $space-5 $spacing-none;
      flex-direction: column;
      align-items: center;
      align-self: stretch;
      border-radius: $radius-4 $radius-none $radius-none $radius-4;
      border-right: 1px solid $blue-grey-3;
      background: $grey-1;
    }
    .TicketShow__ticket-info {
      grid-area: 2 / 3 / 3 / 4;
      display: flex;
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
      grid-area: 2 / 2 / 3 / 3;
    }
  }
}
</style>

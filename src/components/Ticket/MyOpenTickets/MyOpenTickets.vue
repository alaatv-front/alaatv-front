<template>
  <div class="my-tickets-container">
    <div class="my-tickets-toolbar">
      <q-input v-model="search"
               debounce="500"
               class="no-title"
               type="text"
               placeholder="جست و جو">
        <template #prepend>
          <q-icon color="grey-6"
                  name="ph:magnifying-glass" />
        </template>
      </q-input>
    </div>
    <q-separator class="my-tickets__separator" />
    <div v-if="tickets.list.length > 0"
         class="my-tickets-list">
      <ticket-item v-for="(ticket, index) in computedTickets"
                   :key="index"
                   :ticket="ticket" />
    </div>
  </div>
</template>

<script>
import TicketItem from './components/TicketItem.vue'
import { TicketList } from 'src/models/Ticket.js'

const fakeTickets = [{ id: 191309, title: 'و چشم به او چه جوابی بدهم؟.', user: { id: 2, first_name: 'پدرام', last_name: 'خسروپناه', mobile: '09363511973', national_code: '0000000000', photo: 'https://stage-minio.alaatv.com/upload/images/profile/default_avatar.jpg', role: 'پشتیبان', major: null }, priority: { id: 2, title: 'متوسط' }, status: { id: 1, title: 'پاسخ داده نشده', name: 'unanswered' }, department: { id: 13, title: 'تفتان' }, orderproduct: null, totalMessages: 7, tags: null, rate: null, updated_at: '2024-02-04 04:59:49', created_at: '2024-02-04 04:59:49', last_responder: { id: 2, first_name: 'پدرام', last_name: 'خسروپناه', mobile: '09363511973', national_code: '0000000000', photo: 'https://stage-minio.alaatv.com/upload/images/profile/default_avatar.jpg', role: 'پشتیبان', major: null } }, { id: 191315, title: 'که این گوشه‌ی از زندگی را.', user: { id: 2, first_name: 'پدرام', last_name: 'خسروپناه', mobile: '09363511973', national_code: '0000000000', photo: 'https://stage-minio.alaatv.com/upload/images/profile/default_avatar.jpg', role: 'پشتیبان', major: null }, priority: { id: 4, title: 'بحرانی' }, status: { id: 1, title: 'پاسخ داده نشده', name: 'unanswered' }, department: { id: 13, title: 'تفتان' }, orderproduct: null, totalMessages: 3, tags: null, rate: null, updated_at: '2024-02-04 04:59:49', created_at: '2024-02-04 04:59:49', last_responder: { id: 2, first_name: 'پدرام', last_name: 'خسروپناه', mobile: '09363511973', national_code: '0000000000', photo: 'https://stage-minio.alaatv.com/upload/images/profile/default_avatar.jpg', role: 'پشتیبان', major: null } }, { id: 191310, title: 'که با همه‌ی چرندی هر وزیر.', user: { id: 2, first_name: 'پدرام', last_name: 'خسروپناه', mobile: '09363511973', national_code: '0000000000', photo: 'https://stage-minio.alaatv.com/upload/images/profile/default_avatar.jpg', role: 'پشتیبان', major: null }, priority: { id: 1, title: 'کم' }, status: { id: 2, title: 'در حال بررسی', name: 'pending' }, department: { id: 11, title: 'حمایت های مردمی' }, orderproduct: null, totalMessages: 8, tags: null, rate: null, updated_at: '2024-02-04 04:59:49', created_at: '2024-02-04 04:59:49', last_responder: { id: 2, first_name: 'پدرام', last_name: 'خسروپناه', mobile: '09363511973', national_code: '0000000000', photo: 'https://stage-minio.alaatv.com/upload/images/profile/default_avatar.jpg', role: 'پشتیبان', major: null } }, { id: 191313, title: 'به این فکر افتادم که اقلاً.', user: { id: 2, first_name: 'پدرام', last_name: 'خسروپناه', mobile: '09363511973', national_code: '0000000000', photo: 'https://stage-minio.alaatv.com/upload/images/profile/default_avatar.jpg', role: 'پشتیبان', major: null }, priority: { id: 4, title: 'بحرانی' }, status: { id: 2, title: 'در حال بررسی', name: 'pending' }, department: { id: 11, title: 'حمایت های مردمی' }, orderproduct: null, totalMessages: 2, tags: null, rate: null, updated_at: '2024-02-04 04:59:49', created_at: '2024-02-04 04:59:49', last_responder: { id: 2, first_name: 'پدرام', last_name: 'خسروپناه', mobile: '09363511973', national_code: '0000000000', photo: 'https://stage-minio.alaatv.com/upload/images/profile/default_avatar.jpg', role: 'پشتیبان', major: null } }, { id: 191314, title: 'هم، همین جورها هم باشد..', user: { id: 2, first_name: 'پدرام', last_name: 'خسروپناه', mobile: '09363511973', national_code: '0000000000', photo: 'https://stage-minio.alaatv.com/upload/images/profile/default_avatar.jpg', role: 'پشتیبان', major: null }, priority: { id: 4, title: 'بحرانی' }, status: { id: 2, title: 'در حال بررسی', name: 'pending' }, department: { id: 16, title: 'سه آ' }, orderproduct: null, totalMessages: 10, tags: null, rate: null, updated_at: '2024-02-04 04:59:49', created_at: '2024-02-04 04:59:49', last_responder: { id: 2, first_name: 'پدرام', last_name: 'خسروپناه', mobile: '09363511973', national_code: '0000000000', photo: 'https://stage-minio.alaatv.com/upload/images/profile/default_avatar.jpg', role: 'پشتیبان', major: null } }, { id: 191307, title: 'درد گود زورخانه می‌خورد.', user: { id: 2, first_name: 'پدرام', last_name: 'خسروپناه', mobile: '09363511973', national_code: '0000000000', photo: 'https://stage-minio.alaatv.com/upload/images/profile/default_avatar.jpg', role: 'پشتیبان', major: null }, priority: { id: 4, title: 'بحرانی' }, status: { id: 3, title: 'پاسخ داده شده', name: 'answered' }, department: { id: 24, title: 'مشکلات انقضای محصول' }, orderproduct: null, totalMessages: 8, tags: null, rate: null, updated_at: '2024-02-04 04:59:49', created_at: '2024-02-04 04:59:49', last_responder: { id: 2, first_name: 'پدرام', last_name: 'خسروپناه', mobile: '09363511973', national_code: '0000000000', photo: 'https://stage-minio.alaatv.com/upload/images/profile/default_avatar.jpg', role: 'پشتیبان', major: null } }, { id: 191312, title: 'آورد که روی تخت بود و از.', user: { id: 2, first_name: 'پدرام', last_name: 'خسروپناه', mobile: '09363511973', national_code: '0000000000', photo: 'https://stage-minio.alaatv.com/upload/images/profile/default_avatar.jpg', role: 'پشتیبان', major: null }, priority: { id: 4, title: 'بحرانی' }, status: { id: 3, title: 'پاسخ داده شده', name: 'answered' }, department: { id: 14, title: 'آرش' }, orderproduct: null, totalMessages: 7, tags: null, rate: null, updated_at: '2024-02-04 04:59:49', created_at: '2024-02-04 04:59:49', last_responder: { id: 2, first_name: 'پدرام', last_name: 'خسروپناه', mobile: '09363511973', national_code: '0000000000', photo: 'https://stage-minio.alaatv.com/upload/images/profile/default_avatar.jpg', role: 'پشتیبان', major: null } }, { id: 191316, title: 'ناظم سرحال بود و به نوبت به.', user: { id: 2, first_name: 'پدرام', last_name: 'خسروپناه', mobile: '09363511973', national_code: '0000000000', photo: 'https://stage-minio.alaatv.com/upload/images/profile/default_avatar.jpg', role: 'پشتیبان', major: null }, priority: { id: 3, title: 'فوری' }, status: { id: 3, title: 'پاسخ داده شده', name: 'answered' }, department: { id: 3, title: 'استخدام' }, orderproduct: null, totalMessages: 6, tags: null, rate: null, updated_at: '2024-02-04 04:59:49', created_at: '2024-02-04 04:59:49', last_responder: { id: 2, first_name: 'پدرام', last_name: 'خسروپناه', mobile: '09363511973', national_code: '0000000000', photo: 'https://stage-minio.alaatv.com/upload/images/profile/default_avatar.jpg', role: 'پشتیبان', major: null } }, { id: 191308, title: 'و او جوان بود و توی دفتر.', user: { id: 2, first_name: 'پدرام', last_name: 'خسروپناه', mobile: '09363511973', national_code: '0000000000', photo: 'https://stage-minio.alaatv.com/upload/images/profile/default_avatar.jpg', role: 'پشتیبان', major: null }, priority: { id: 2, title: 'متوسط' }, status: { id: 4, title: 'بسته شده', name: 'closed' }, department: { id: 5, title: 'راه ابریشم' }, orderproduct: null, totalMessages: 2, tags: null, rate: null, updated_at: '2024-02-04 04:59:49', created_at: '2024-02-04 04:59:49', last_responder: { id: 2, first_name: 'پدرام', last_name: 'خسروپناه', mobile: '09363511973', national_code: '0000000000', photo: 'https://stage-minio.alaatv.com/upload/images/profile/default_avatar.jpg', role: 'پشتیبان', major: null } }, { id: 191311, title: 'در برای همه، پاشنه‌هایش.', user: { id: 2, first_name: 'پدرام', last_name: 'خسروپناه', mobile: '09363511973', national_code: '0000000000', photo: 'https://stage-minio.alaatv.com/upload/images/profile/default_avatar.jpg', role: 'پشتیبان', major: null }, priority: { id: 2, title: 'متوسط' }, status: { id: 4, title: 'بسته شده', name: 'closed' }, department: { id: 14, title: 'آرش' }, orderproduct: null, totalMessages: 5, tags: null, rate: null, updated_at: '2024-02-04 04:59:49', created_at: '2024-02-04 04:59:49', last_responder: { id: 2, first_name: 'پدرام', last_name: 'خسروپناه', mobile: '09363511973', national_code: '0000000000', photo: 'https://stage-minio.alaatv.com/upload/images/profile/default_avatar.jpg', role: 'پشتیبان', major: null } }]

export default {
  name: 'MyOpenTickets',
  components: {
    TicketItem
  },
  props: {
    tickets: {
      type: TicketList,
      default: new TicketList(fakeTickets)
    }
  },
  emits: ['updateList'],
  data () {
    return {
      search: ''
    }
  },
  computed: {
    computedTickets () {
      if (this.tickets.list.length === 0) {
        return []
      }
      return this.tickets.list
        .filter(ticket => ticket.user.first_name.includes(this.search))
    }
  }
}
</script>

<style lang="scss" scoped>
.my-tickets{
  &-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: stretch;
    gap: $space-3;
  }
  &-toolbar {
    width: 100%;
  }
  &__separator {
    width: 100%;
  }
  &-list {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
    gap: $space-3;
    align-self: stretch;
  }
}
</style>

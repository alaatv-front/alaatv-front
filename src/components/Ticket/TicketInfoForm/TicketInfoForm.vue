<template>
  <div class="ticket-info-container">
    <template v-if="asAdmin">
      <div class="ticket-info-header">
        <div class="ticket-info-header__title">
          عنوان :
        </div>
        <div class="ticket-info-header__text ellipsis-3-lines">
          {{ ticket.title}}
          <q-tooltip>
            {{ ticket.title}}
          </q-tooltip>
        </div>
      </div>
      <q-separator class="ticket-info__separator" />
    </template>
    <div class="ticket-info-details">
      <div class="ticket-info-details__item">
        <div class="ticket-info-details__ticket-id__title">
          شماره تیکت :
        </div>
        <div class="ticket-info-details__item__value">
          {{ ticket.id}}
        </div>
      </div>
      <div v-if="asAdmin"
           class="ticket-info-details__item">
        <div class="ticket-info-details__item__title">
          اولویت :
        </div>
        <div class="ticket-info-details__item__value">
          {{ ticket.priority.title }}
        </div>
      </div>
      <div class="ticket-info-details__item">
        <div class="ticket-info-details__item__title">
          ایجاد شده در :
        </div>
        <div class="ticket-info-details__item__value">
          {{ ticket.shamsiDate('created_at').date }}
        </div>
      </div>
      <div class="ticket-info-details__item">
        <div class="ticket-info-details__item__title">
          آخرین به روز رسانی :
        </div>
        <div class="ticket-info-details__item__value">
          {{ ticket.shamsiDate('updated_at').date }}
        </div>
      </div>
    </div>
    <div v-if="asAdmin"
         class="ticket-info-form">
      <template v-if="isTicketReady && isDependenciesDataReady">
        <entity-edit ref="entityEditTicket"
                     v-model:value="ticketInputs"
                     :api="ticketApi"
                     :loading="ticketLoading"
                     :show-save-button="false"
                     :show-close-button="false"
                     :defaultLayout="false"
                     :loaded-data="ticket"
                     :entity-id-key="entityIdKey" />
        <entity-create ref="entityCreateSupport"
                       v-model:value="supportInputs"
                       class="support-entity"
                       :api="supportApi"
                       :loading="supportLoading"
                       :show-save-button="false"
                       :show-close-button="false"
                       :defaultLayout="false"
                       :entity-id-key="entityIdKey" />
      </template>

      <div v-else
           class="ticket-info-form--loading">
        <q-skeleton height="42px" />
        <q-skeleton height="42px" />
        <q-skeleton height="42px" />
        <q-skeleton height="40px" />
      </div>
    </div>
    <div v-else
         class="ticket-info-details">
      <q-separator class="ticket-info-details__separator" />
      <div class="ticket-info-details__item">
        <div class="ticket-info-details__ticket-id__title">
          وضعیت :
        </div>
        <div class="ticket-info-details__item__value">
          {{ ticket.status.title}}
        </div>
      </div>
      <div class="ticket-info-details__item">
        <div class="ticket-info-details__item__title">
          اولویت :
        </div>
        <div class="ticket-info-details__item__value">
          {{ ticket.priority.title }}
        </div>
      </div>
      <div class="ticket-info-details__item">
        <div class="ticket-info-details__item__title">
          گروه :
        </div>
        <div class="ticket-info-details__item__value">
          {{ ticket.department.title }}
        </div>
      </div>
    </div>
    <template v-if="asAdmin">
      <div class="ticket-info-action">
        <q-btn color="primary"
               class="full-width"
               icon="ph:phone-outgoing"
               label="تماس با کاربر"
               @click="callUser" />
        <q-btn outline
               color="grey"
               class="full-width"
               label="ارسال پیامک"
               @click="openSmsDialog" />
      </div>
      <q-dialog v-model="smsDialog">
        <div class="sms-dialog-wrapper">
          <ticket-sms-pattern :ticket="ticket"
                              @sms-sent="closeSmsDialog" />
        </div>
      </q-dialog>
      <q-dialog v-model="confirmDialog">
        <div class="sms-dialog-wrapper">
          <confirm-dialog :confirmation="confirmation"
                          @confirm="onConfirm"
                          @deny="onDeny" />
        </div>
      </q-dialog>
    </template>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Ticket } from 'src/models/Ticket.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { EntityEdit, EntityCreate } from 'quasar-crud'
import { FormBuilderAssist } from 'quasar-form-builder'
import { SupporterList } from 'src/models/Supporter.js'
import ConfirmDialog from './components/ConfirmDialog.vue'
import { TicketStatusList } from 'src/models/TicketStatus.js'
import { TicketPriorityList } from 'src/models/TicketPriority.js'
import { TicketDepartmentList } from 'src/models/TicketDepartment.js'
import TicketSmsPattern from 'src/components/Ticket/TicketSmsPattern/TicketSmsPattern.vue'

export default defineComponent({
  name: 'TicketInfoForm',
  components: {
    EntityEdit,
    EntityCreate,
    ConfirmDialog,
    TicketSmsPattern
  },
  props: {
    asAdmin: {
      type: Boolean,
      default: false
    },
    ticket: {
      type: Ticket,
      default: new Ticket()
    },
    supporters: {
      type: SupporterList,
      default: new SupporterList()
    },
    statuses: {
      type: TicketStatusList,
      default: new TicketStatusList()
    },
    priorities: {
      type: TicketPriorityList,
      default: new TicketPriorityList()
    },
    departments: {
      type: TicketDepartmentList,
      default: new TicketDepartmentList()
    }

  },
  emits: ['updateTicket'],
  data () {
    return {
      ticketApi: '',
      supportApi: '',
      smsDialog: false,
      entityIdKey: 'id',
      entityParamKey: 'id',
      confirmDialog: false,
      ticketLoading: false,
      supportLoading: false,
      isStatusesReady: false,
      isDepartmentReady: false,
      isSupportersReady: false,
      confirmation: {
        title: '',
        message: '',
        icon: 'ph:ticket',
        name: '',
        oldValue: null
      },
      ticketInputs: [
        {
          type: 'select',
          name: 'department_id',
          options: [],
          optionLabel: 'title',
          optionValue: 'id',
          clearable: false,
          responseKey: 'department.id',
          label: 'گروه',
          disable: false,
          col: 'col-12'
        },
        {
          type: 'select',
          name: 'status_id',
          // multiple: true,
          clearable: false,
          options: [],
          optionLabel: 'title',
          optionValue: 'id',
          responseKey: 'status.id',
          label: 'وضعیت',
          disable: false,
          col: 'col-12'
        }
      ],
      supportInputs: [
        {
          type: 'select',
          name: 'responsible_user',
          options: [],
          clearable: false,
          optionLabel: 'fullName',
          optionValue: 'userId',
          label: 'پشتیبان',
          disable: false,
          col: 'col-12'
        }
      ],
      responsibleUserChangeFrom: null
    }
  },
  computed: {
    isTicketReady () {
      return this.ticket.id !== null
    },
    isDependenciesDataReady () {
      return this.isDepartmentReady && this.isStatusesReady && this.isSupportersReady
    },
    ticketAssignedUserId () {
      return this.ticket.assign.id
    },
    statusValue () {
      return FormBuilderAssist.getInputsByName(this.ticketInputs, 'status_id').value
    },
    departmentValue () {
      return FormBuilderAssist.getInputsByName(this.ticketInputs, 'department_id').value
    },
    supporterValue () {
      return FormBuilderAssist.getInputsByName(this.supportInputs, 'responsible_user').value
    }
  },
  watch: {
    isTicketReady (newValue) {
      if (!newValue) {
        return
      }

      this.loadApi()
      FormBuilderAssist.setAttributeByName(this.supportInputs, 'responsible_user', 'value', this.ticket.assign.id)
    },
    ticketAssignedUserId (newValue) {
      this.responsibleUserChangeFrom = 'from-parent'
      FormBuilderAssist.setAttributeByName(this.supportInputs, 'responsible_user', 'value', newValue)
    },
    departments () {
      this.setDepartmentOptions()
    },
    statuses () {
      this.setStatusOptions()
    },
    supporters () {
      this.setSupportOptions()
    },
    departmentValue (newValue, oldValue) {
      if (typeof newValue !== 'number' || oldValue === undefined) {
        return
      }
      this.confirmation.title = 'تغییر گروه تیکت'
      this.confirmation.message = `آیا می‌خواهید گروه تیکت را به ${this.departments.list.find(dep => dep.id === newValue).title} تغییر دهید؟`
      this.confirmation.name = 'department_id'
      this.confirmation.oldValue = oldValue
      this.openConfirm()
    },
    supporterValue (newValue, oldValue) {
      if (typeof newValue !== 'number' || oldValue === undefined || this.responsibleUserChangeFrom === 'from-parent') {
        this.responsibleUserChangeFrom = null
        return
      }
      this.confirmation.title = 'تغییر پشتیبان تیکت'
      this.confirmation.message = `آیا می‌خواهید تیکت را به ${this.supporters.list.find(sup => sup?.userId === newValue).fullName} ارجاع دهید؟`
      this.confirmation.name = 'responsible_user'
      this.confirmation.oldValue = oldValue
      this.openConfirm(oldValue)
    },
    statusValue (newValue, oldValue) {
      if (typeof newValue !== 'number' || oldValue === undefined) {
        return
      }
      this.confirmation.title = 'تغییر وضعیت تیکت'
      this.confirmation.message = `آیا می‌خواهید وضعیت تیکت را به ${this.statuses.list.find(status => status.id === newValue).title} تغییر دهید؟`
      this.confirmation.name = 'status_id'
      this.confirmation.oldValue = oldValue
      this.openConfirm()
    }
  },
  methods: {
    loadApi () {
      this.supportApi = APIGateway.ticket.APIAdresses.assign(this.ticket.id)
      this.ticketApi = APIGateway.ticket.APIAdresses.updateTicketApi(this.ticket.id)
    },
    setDepartmentOptions () {
      this.getInput('department_id', this.ticketInputs).options = this.departments.list
      this.isDepartmentReady = true
    },
    setStatusOptions () {
      this.getInput('status_id', this.ticketInputs).options = this.statuses.list
      this.isStatusesReady = true
    },
    setSupportOptions () {
      this.getInput('responsible_user', this.supportInputs).options = this.supporters.list
      this.isSupportersReady = true
    },
    getInput (inputName, source) {
      const srcFilter = source
      return srcFilter.find(input => input.name === inputName)
    },
    openSmsDialog () {
      this.smsDialog = true
    },
    closeSmsDialog () {
      this.smsDialog = false
    },
    callUser () {
      alert('calling ...')
    },
    openConfirm () {
      this.confirmDialog = true
    },
    editTicket () {
      this.ticketLoading = true

      this.$refs.entityEditTicket.editEntity(false)
        .then(() => {
          this.ticketLoading = false
          this.$emit('updateTicket')
          this.$q.notify({
            type: 'positive',
            message: 'ویرایش تیکت با موفقیت انجام شد',
            position: 'top'
          })
        })
        .catch(() => {
          this.ticketLoading = false
        })
    },
    editSupport () {
      this.supportLoading = false

      this.$refs.entityCreateSupport.createEntity(false)
        .then(() => {
          this.supportLoading = false
          this.$emit('updateTicket')
          this.$q.notify({
            type: 'positive',
            message: 'ویرایش پشتیبان با موفقیت انجام شد',
            position: 'top'
          })
        })
        .catch(() => {
          this.supportLoading = false
        })
    },
    onConfirm () {
      this.confirmDialog = false
      switch (this.confirmation.name) {
        case 'status_id':
        case 'department_id':
          this.editTicket()
          break
        case 'responsible_user':
          this.editSupport()
          break

        default:
          break
      }
    },
    onDeny () {
      this.confirmDialog = false
      FormBuilderAssist.setAttributeByName(this.confirmation.name === 'responsible_user' ? this.supportInputs : this.ticketInputs, this.confirmation.name, 'value', this.confirmation.oldValue)

      this.confirmation.name = null
      this.confirmation.oldValue = null
    }
  }
})
</script>

<style lang="scss" scoped>
.sms-dialog-wrapper {
  width: 544px;
  max-width: 544px;
  min-height: 668px;
  @include  media-max-width('md') {
    width: 100%;
    max-width: 100%;
  }
}
.ticket-info {
  &-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-5;
    align-self: stretch;
  }

  &-header {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    color: $grey-9;
    text-align: left;
    @include body1;

    &__text {
      width: calc(100% - 64px);
      margin-left: $space-1;
    }
  }

  &__separator {
    width: 100%;
  }

  &-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-4;
    align-self: stretch;

    &__separator {
      width: 100%;
    }

    &__item{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      align-self: stretch;

      &__title {
        color: $grey-9;
        @include body1;
      }

      &__value {
        color: $grey-9;
        @include body1;
      }
    }
  }

  &-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: $space-4;

    &--loading {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: $space-5;
    }
  }

  &-action {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-4;
    align-self: stretch;
  }
}
</style>

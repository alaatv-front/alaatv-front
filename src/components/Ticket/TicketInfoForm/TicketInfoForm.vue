<template>
  <div class="ticket-info-container">
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
    <div class="ticket-info-details">
      <div class="ticket-info-details__item">
        <div class="ticket-info-details__ticket-id__title">
          شماره تیکت :
        </div>
        <div class="ticket-info-details__item__value">
          {{ ticket.id}}
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
    <div class="ticket-info-form">
      <template v-if="isEntityReady">
        <entity-edit ref="entityEditTicket"
                     v-model:value="ticketInputs"
                     :api="ticketApi"
                     :show-save-button="false"
                     :show-close-button="false"
                     :defaultLayout="false"
                     :loaded-data="ticket"
                     :entity-id-key="entityIdKey">
          <template #after-form-builder>
            <q-btn color="secondary"
                   icon="ph:pencil-simple"
                   class="full-width q-my-md"
                   label="ویرایش"
                   @click="editTicket" />
          </template>
        </entity-edit>
        <entity-create ref="entityCreateSupport"
                       v-model:value="supportInputs"
                       :api="supportApi"
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
        <inside-dialog>
          <template #header-icon>
            <badge-icon icon="ph:chat-circle-text"
                        color="primary" />
          </template>
          <template #header>
            ارسال پیامک به سید مرتضی صحیح النسب
          </template>
          <template #body>
            <q-select v-model="model"
                      :options="options"
                      label="نوع پیامک"
                      outlined />
            <q-input v-model="input1"
                     class="smsTextarea"
                     label="ارسال پیام متنی"
                     placeholder="متن پیامک"
                     type="textarea" />
          </template>
          <template #action>
            <q-btn v-close-popup
                   class="q-btn-md"
                   color="grey"
                   size="md"
                   outline>
              انصراف
            </q-btn>
            <q-btn class="q-btn-md keep-min-width"
                   color="primary">
              ارسال
            </q-btn>
          </template>
        </inside-dialog>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import { EntityEdit, EntityCreate } from 'quasar-crud'
import { Ticket } from 'src/models/Ticket.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import { SupporterList } from 'src/models/supporter.js'
import BadgeIcon from 'src/components/Utils/BadgeIcon.vue'
import { TicketStatusList } from 'src/models/TicketStatus.js'
import InsideDialog from 'src/components/Utils/InsideDialog.vue'
import { TicketPriorityList } from 'src/models/TicketPriority.js'
import { TicketDepartmentList } from 'src/models/TicketDepartment.js'
export default {
  name: 'TicketInfoForm',
  components: {
    BadgeIcon,
    EntityEdit,
    EntityCreate,
    InsideDialog
  },
  props: {
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
  data () {
    return {
      smsDialog: false,
      entityIdKey: 'id',
      entityParamKey: 'id',
      isStatusesReady: false,
      isDepartmentReady: false,
      isSupportersReady: false,
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
          value: null,
          label: 'پشتیبان',
          disable: false,
          col: 'col-12'
        }
      ]
    }
  },
  computed: {
    ticketApi () {
      return APIGateway.ticket.APIAdresses.updateTicketApi(this.ticket.id)
    },
    supportApi () {
      return APIGateway.ticket.APIAdresses.assign(this.ticket.id)
    },
    isEntityReady () {
      return this.isDepartmentReady && this.isStatusesReady && this.isSupportersReady
    },
    supporterValue () {
      return FormBuilderAssist.getInputsByName(this.supportInputs, 'responsible_user').value
    }
  },
  watch: {
    ticket () {
      FormBuilderAssist.setAttributeByName(this.supportInputs, 'responsible_user', 'value', this.ticket.responsibleUser.id)
    },
    departments () {
      this.getInput('department_id', this.ticketInputs).options = this.departments.list
      this.isDepartmentReady = true
    },
    statuses () {
      this.getInput('status_id', this.ticketInputs).options = this.statuses.list
      this.isStatusesReady = true
    },
    supporters () {
      this.getInput('responsible_user', this.supportInputs).options = this.supporters.list
      this.isSupportersReady = true
    },
    supporterValue (newValue, oldValue) {
      if (typeof newValue !== 'number' || !oldValue) {
        return
      }
      this.editSupport()
    }
  },
  methods: {
    getInput (inputName, source) {
      const srcFilter = source
      return srcFilter.find(input => input.name === inputName)
    },
    openSmsDialog () {
      this.smsDialog = true
    },
    callUser () {
      alert('calling ...')
    },
    editTicket () {
      this.$store.commit('loading/loading', true)

      this.$refs.entityEditTicket.editEntity(false)
        .then(() => {
          this.$store.commit('loading/loading', false)
        })
        .catch(() => {
          this.$store.commit('loading/loading', false)
        })
    },
    editSupport () {
      this.$store.commit('loading/loading', true)

      this.$refs.entityCreateSupport.createEntity(false)
        .then(() => {
          this.$store.commit('loading/loading', false)
        })
        .catch(() => {
          this.$store.commit('loading/loading', false)
        })
    }
  }
}
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

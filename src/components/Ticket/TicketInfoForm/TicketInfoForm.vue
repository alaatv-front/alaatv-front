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
      <entity-edit v-if="isEntityReady"
                   ref="entityEdit"
                   v-model:value="inputs"
                   :show-save-button="false"
                   :show-close-button="false"
                   :defaultLayout="false"
                   :loaded-data="ticket"
                   :entity-id-key="entityIdKey">
        <template #after-form-builder>
          <q-btn color="secondary"
                 icon="ph:pencil-simple"
                 class="full-width q-mt-md"
                 label="ویرایش"
                 @click="onClick" />
        </template>
      </entity-edit>
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
import { EntityEdit } from 'quasar-crud'
import { Ticket } from 'src/models/Ticket.js'
import { mixinTicket } from 'src/mixin/Mixins.js'
import BadgeIcon from 'src/components/Utils/BadgeIcon.vue'
import InsideDialog from 'src/components/Utils/InsideDialog.vue'

export default {
  name: 'TicketInfoForm',
  components: {
    EntityEdit,
    BadgeIcon,
    InsideDialog
  },
  mixins: [mixinTicket],
  props: {
    ticket: {
      type: Ticket,
      default: new Ticket()
    }
  },
  data () {
    return {
      isEntityReady: false,
      smsDialog: false,
      inputs: [
        {
          type: 'select',
          name: 'department_id',
          options: [],
          optionLabel: 'title',
          optionValue: 'id',
          responseKey: 'department.id',
          label: 'گروه',
          disable: false,
          col: 'col-12'
        },
        {
          type: 'select',
          name: 'status_id',
          // multiple: true,
          options: [],
          optionLabel: 'title',
          optionValue: 'id',
          responseKey: 'status.id',
          label: 'وضعیت',
          disable: false,
          col: 'col-12'
        },
        {
          type: 'select',
          name: 'status',
          options: [],
          optionLabel: 'title',
          optionValue: 'id',
          responseKey: 'ticket.status.id',
          label: 'پشتیبان',
          disable: false,
          col: 'col-12'
        }
      ],
      entityIdKey: 'id',
      entityParamKey: 'id'
    }
  },
  methods: {
    async setInputs () {
      const ticketFields = await this.getTicketData()
      this.getInput('department_id').options = ticketFields.departments.list
      this.getInput('status_id').options = ticketFields.statuses.list
    },
    async initTicket () {
      // this.setEntityValues()
      await this.setInputs()
      this.isEntityReady = true
    },
    openSmsDialog () {
      this.smsDialog = true
    },
    callUser () {
      alert('calling ...')
    }
  }
}
</script>

<style lang="scss" scoped>
.sms-dialog-wrapper {
  width: 544px;
  max-width: 544px;
  min-height: 448px;
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

<template>
  <inside-dialog>
    <template #header-icon>
      <badge-icon icon="ph:chat-circle-text"
                  color="primary" />
    </template>
    <template #header>
      ارسال پیامک به سید مرتضی صحیح النسب
    </template>
    <template #body>
      <q-select v-model="pattern"
                :options="patternList.list"
                option-label="title"
                option-value="patternId"
                :loading="patternList.loading || this.pattern.loading"
                label="نوع پیامک"
                outlined
                @update:model-value="fillPatternMessage" />
      <q-input v-model="smsMessage"
               class="smsTextarea"
               label="ارسال پیام متنی"
               placeholder="متن پیامک"
               :readonly="!isSimplePattern"
               :counter="isSimplePattern"
               :maxlength="64"
               :hint="`هزینه پیامک (ریال) : ${(smsMessage?.length ? smsMessage.length : 0) * 100}`"
               :hide-hint="!isSimplePattern"
               type="textarea" />
    </template>
    <template #action>
      <q-btn v-close-popup
             class="q-btn-md"
             color="grey"
             :loading="this.pattern.loading"
             size="md"
             outline>
        انصراف
      </q-btn>
      <q-btn class="q-btn-md keep-min-width"
             color="primary"
             :loading="this.pattern.loading"
             @click="sendTicketMessage">
        ارسال
      </q-btn>
    </template>
  </inside-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import { Ticket } from 'src/models/Ticket.js'
import { APIGateway } from 'src/api/APIGateway.js'
import BadgeIcon from 'src/components/Utils/BadgeIcon.vue'
import { Pattern, PatternList } from 'src/models/Pattern.js'
import InsideDialog from 'src/components/Utils/InsideDialog.vue'

export default defineComponent({
  name: 'TicketSmsPattern',
  components: {
    BadgeIcon,
    InsideDialog
  },
  props: {
    ticket: {
      type: Ticket,
      default: new Ticket()
    }
  },
  emits: ['smsSent'],
  data () {
    return {
      pattern: new Pattern({
        title: 'پیامک متنی',
        patternId: 'thisIsSimpleTicketSms',
        text: ''
      }),
      smsMessage: '',
      patternList: new PatternList()
    }
  },
  computed: {
    isSimplePattern () {
      return this.pattern.patternId === 'thisIsSimpleTicketSms'
    }
  },
  mounted () {
    this.getSmsPatterns()
  },
  methods: {
    getSmsPatterns () {
      this.patternList.loading = true
      APIGateway.ticket.getSmsPatterns({
        id: this.ticket.id
      })
        .then(patternList => {
          this.patternList = new PatternList(patternList)
          const samplePattern = new Pattern({
            title: 'پیامک متنی',
            patternId: 'thisIsSimpleTicketSms',
            text: ''
          })
          this.patternList.list.unshift(samplePattern)
        })
        .catch(() => {
          this.patternList.loading = false
        })
    },
    fillPatternMessage () {
      this.smsMessage = this.pattern.text
    },
    sendTicketMessage () {
      if (this.isSimplePattern) {
        this.sendTicketMessageSms()
      } else {
        this.sendTicketPattern()
      }
    },
    sendTicketPattern () {
      this.pattern.loading = true
      APIGateway.ticket.sendTicketPattern({
        users_id: [this.ticket.user.id],
        pattern_id: this.pattern.patternId,
        pattern_values: this.pattern.patternValues
      })
        .then(message => {
          this.pattern.loading = false
          this.$emit('smsSent')
          this.$q.notify({
            type: 'positive',
            message,
            position: 'top'
          })
        })
        .catch(() => {
          this.pattern.loading = false
        })
    },
    sendTicketSms () {
      this.pattern.loading = true
      APIGateway.ticket.sendTicketSms({
        user_id: [this.ticket.user.id],
        message: this.smsMessage
      })
        .then(message => {
          this.pattern.loading = false
          this.$emit('smsSent')
          this.$q.notify({
            type: 'positive',
            message: 'پیام با موفقیت ارسال شد',
            position: 'top'
          })
        })
        .catch(() => {
          this.pattern.loading = false
        })
    }

  }
})
</script>

<style lang="scss" scoped>
.smsTextarea {
  margin-top: $space-6;
}

:deep(.smsTextarea .q-field__control) {
  min-height: 100px;
}

:deep(.q-textarea .q-field__inner .q-field__control .q-field__control-container .q-field__native) {
  min-height: 100px;
  height: 100%;
}
</style>

<template>
  <div class="TicketSendMessageInput"
       :class="{
         'TicketSendMessageInput__blur': status === 'blur',
         'TicketSendMessageInput__recording': status === 'voice-recording',
         'TicketSendMessageInput__voice-recorded': status === 'voice-recorded',
       }">
    <template v-if="!loading">
      <div v-if="ticket.status.name === 'closed'"
           class="TicketSendMessageInput__status-closed">
        تیکت بسته شده است
      </div>
      <div v-else-if="ticket.hasResponsibleUser"
           class="TicketSendMessageInput__accept-ticket">
        <div class="TicketSendMessageInput__accept-ticket-message">
          <q-icon name="ph:lock"
                  size="16px" />
          برای شروع ، ابتدا باید مکالمه را قبول کنید.
        </div>
        <div class="TicketSendMessageInput__accept-ticket-action">
          <q-btn label="قبول مکالمه"
                 class="size-sm"
                 outline
                 color="secondary"
                 :loading="ticket.loading"
                 @click="acceptTicket" />
        </div>
      </div>
      <div v-else-if="ticket.seenBefore"
           class="TicketSendMessageInput__start-ticket">
        <div class="TicketSendMessageInput__start-ticket-message">
          <span class="TicketSendMessageInput__assign-full-name">
            {{ ticket.assign.first_name }}
            {{ ticket.assign.last_name }}
          </span>
          مسئول این تیکت میباشد.
        </div>
        <div class="TicketSendMessageInput__accept-ticket-action">
          <q-btn label="ورود به مکالمه"
                 class="size-sm"
                 outline
                 color="grey"
                 :loading="ticket.loading"
                 @click="acceptTicket" />
        </div>
      </div>
      <q-input v-else-if="hasStatus(['blur', 'text-input-focus', 'typing', 'voice-recording', 'voice-recorded'])"
               v-model="textInput"
               class="no-title"
               autogrow
               @blur="onBlurTextInput"
               @focus="onFocusTextInput">
        <template #append>
          <template v-if="hasStatus(['text-input-focus', 'typing'])">
            <q-btn v-if="asAdmin"
                   flat
                   square
                   icon="ph:paper-plane-right"
                   class="TicketSendMessageInput__btn-send-private-message size-lg"
                   @click="onSendText(true)" />
            <q-btn flat
                   square
                   icon="ph:paper-plane-right"
                   class="TicketSendMessageInput__btn-send-message size-lg"
                   @click="onSendText(false)" />
          </template>
          <template v-if="hasStatus(['blur', 'voice-recording', 'voice-recorded'])">
            <div class="TicketSendMessageInput__recording-area"
                 :class="{'TicketSendMessageInput__recording-area--no-recording': status !== 'voice-recording','TicketSendMessageInput__recording-area--recording': status === 'voice-recording'}">
              <div v-if="hasStatus(['voice-recording'])"
                   class="TicketSendMessageInput__recording-timer">
                <div class="TicketSendMessageInput__recording-sign" />
                {{ recordedVoiceDurationInTimerFormat }}
              </div>
              <div class="TicketSendMessageInput__recording-action-area">
                <div v-if="hasStatus(['voice-recording'])"
                     class="TicketSendMessageInput__recording-cancel-label">
                  <q-icon name="ph:caret-right" />
                  لغو کردن پیام صوتی
                </div>
                <q-btn v-if="hasStatus(['voice-recording', 'blur'])"
                       ref="btnStartRecording"
                       v-touch-swipe.mouse="handleSwipeBtnStartRecording"
                       :flat="status !== 'voice-recording'"
                       :color="status === 'voice-recording' ? 'secondary' : undefined"
                       square
                       round
                       icon="ph:microphone"
                       class="TicketSendMessageInput__btn-recording size-md"
                       @blur="onBlurBtnRecordingVoice"
                       @mouseup="onMouseupBtnRecordingVoice"
                       @mousedown="onMousedownBtnRecordingVoice" />
                <div v-if="hasStatus(['voice-recorded'])"
                     class="TicketSendMessageInput__voice-recorded-area">
                  <q-btn flat
                         square
                         icon="ph:trash"
                         class="TicketSendMessageInput__btn-delete-voice size-lg"
                         @click="removeRecordeVoice" />
                  <div class="TicketSendMessageInput__preview-recorded-voice">
                    <voice-wave-surfer v-if="recordedVoiceAsBlob"
                                       :source="recordedVoiceAsBlob"
                                       :duration="recordedVoiceDurationInTimerFormat" />
                  </div>
                  <q-btn v-if="asAdmin"
                         flat
                         square
                         icon="ph:paper-plane-right"
                         class="TicketSendMessageInput__btn-send-private-voice-message size-lg"
                         @click="onSendVoice(true)" />
                  <q-btn flat
                         square
                         icon="ph:paper-plane-right"
                         class="TicketSendMessageInput__btn-send-voice-message size-lg"
                         @click="onSendVoice(false)" />
                </div>
              </div>
            </div>
          </template>
        </template>
        <template #prepend>
          <template v-if="hasStatus(['blur', 'text-input-focus', 'typing'])">
            <q-btn v-if="showReservedMessageList"
                   ref="btnToggleCustomMessages"
                   flat
                   square
                   icon="ph:chat-dots"
                   class="TicketSendMessageInput__btn-select-file size-lg"
                   @click="togglePreparedTextsMenu" />
            <q-btn ref="btnSelectFile"
                   flat
                   square
                   icon="ph:paperclip"
                   class="TicketSendMessageInput__btn-toggle-custom-messages-list size-lg"
                   @click="showSelectFilesDialog" />
          </template>
        </template>
        <q-menu v-if="showReservedMessageList"
                ref="preparedTextsMenu"
                fit
                no-parent-event
                anchor="top start"
                self="bottom right"
                class="preparedTextsMenu">
          <prepared-texts :list="reservedMessageList"
                          :loading="reservedMessageLoading"
                          @select="onSelectPreparedText" />
        </q-menu>
        <q-dialog v-model="selectFilesDialog">
          <select-files @send="onSendFiles" />
        </q-dialog>
      </q-input>
    </template>
    <q-linear-progress v-else
                       indeterminate />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import SelectFiles from './SelectFiles.vue'
import { Ticket } from 'src/models/Ticket.js'
import PreparedTexts from './PreparedTexts.vue'
import VoiceWaveSurfer from './VoiceWaveSurfer.vue'

export default defineComponent({
  name: 'TicketMessage',
  components: {
    SelectFiles,
    PreparedTexts,
    VoiceWaveSurfer
  },
  props: {
    ticket: {
      type: Ticket,
      default: new Ticket()
    },
    loading: {
      type: Boolean,
      default: false
    },
    asAdmin: {
      type: Boolean,
      default: false
    },
    showReservedMessageList: {
      type: Boolean,
      default: true
    },
    reservedMessageList: {
      type: Array,
      default: () => []
    },
    reservedMessageLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['sendMessage', 'acceptTicket'],
  data () {
    return {
      textInput: null,
      recordInterval: null,
      recordedVoiceAsBlob: null,
      recordedVoiceDurationInSeconds: 0,
      mediaRecorder: null,
      selectFilesDialog: false,
      status: 'blur' // 'blur', 'text-input-focus', 'typing', 'voice-recording', 'voice-recorded
    }
  },
  computed: {
    hasStatus () {
      return (statuses) => {
        if (Array.isArray(statuses)) {
          return statuses.includes(this.status)
        }

        return this.status === statuses
      }
    },
    recordedVoiceDurationInTimerFormat () {
      const minutes = Math.floor(this.recordedVoiceDurationInSeconds / 60)
      const remainingSeconds = Math.floor(this.recordedVoiceDurationInSeconds % 60)
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    }
  },
  mounted () {
    // setTimeout(() => {
    //   this.status = 'voice-recording'
    // }, 5000)
  },
  methods: {
    acceptTicket () {
      this.$emit('acceptTicket')
    },
    handleSwipeBtnStartRecording (event) {
      if (event.direction !== 'right' || this.status !== 'voice-recording') {
        return
      }
      this.recordStop()
      this.removeRecordeVoice()
    },
    onFocusTextInput (event) {
      if (
        this.status === 'voice-recording' ||
        this.status === 'voice-recorded' ||
        this.$refs.btnStartRecording?.$el === event.srcElement ||
        this.$refs.btnSelectFile?.$el === event.srcElement ||
        (this.showReservedMessageList && this.$refs.btnToggleCustomMessages?.$el === event.srcElement)
      ) {
        return
      }
      if (this.textInput) {
        this.status = 'typing'
      } else {
        this.status = 'text-input-focus'
      }
    },
    onBlurTextInput (event) {
      if (
        this.status === 'voice-recorded' ||
        this.$refs.btnStartRecording?.$el === event.srcElement ||
        this.$refs.btnSelectFile?.$el === event.srcElement ||
        (this.showReservedMessageList && this.$refs.btnToggleCustomMessages?.$el === event.srcElement)
      ) {
        return
      }
      if (this.status === 'voice-recording') {
        this.onStopRecordingVoice()
      } else if (this.textInput) {
        this.status = 'typing'
      } else {
        this.status = 'blur'
      }
    },
    onStartRecordingVoice () {
      this.status = 'voice-recording'
      this.recordStart()
    },
    onStopRecordingVoice () {
      this.status = 'voice-recorded'
      this.recordStop()
    },
    onBlurBtnRecordingVoice () {
      if (this.status === 'voice-recorded' || this.status === 'blur') {
        return
      }
      this.onStopRecordingVoice()
    },
    onMouseupBtnRecordingVoice () {
      if (this.status !== 'voice-recording') {
        return
      }
      this.onStopRecordingVoice()
    },
    onMousedownBtnRecordingVoice () {
      this.onStartRecordingVoice()
    },
    removeRecordeVoice () {
      this.status = 'blur'
      this.recordedVoiceAsBlob = null
    },

    recordStart () {
      if (!navigator.mediaDevices) {
        this.$q.notify({
          message: 'مرورگر شما ضبط صدا را پشتیبانی نمی کند.'
        })
        return
      }

      const constraints = { audio: true }
      let chunks = []
      this.recordedVoiceAsBlob = null

      const onSuccess = (stream) => {
        this.mediaRecorder = new MediaRecorder(stream)
        this.mediaRecorder.start()

        this.mediaRecorder.onstop = (e) => {
          const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' })
          chunks = []
          this.recordedVoiceAsBlob = blob
          // this.recordedVoice = window.URL.createObjectURL(blob)

          stream.getTracks().forEach((track) => {
            track.stop()
          })
        }

        this.mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data)
        }
      }

      const onError = () => {
        this.status = 'blur'
        this.recordStop()
        this.$q.notify({
          type: 'negative',
          message: 'مرورگر شما اجازه دسترسی به میکروفون را ندارد'
        })
      }

      navigator.mediaDevices.getUserMedia(constraints)
        .then(onSuccess, onError)

      this.recordedVoiceDurationInSeconds = 0
      this.recordInterval = setInterval(() => {
        this.recordedVoiceDurationInSeconds++
      }, 1000)
    },
    recordStop () {
      if (this.mediaRecorder) {
        this.mediaRecorder.stop()
      }
      if (this.recordInterval) {
        clearInterval(this.recordInterval)
      }
    },
    togglePreparedTextsMenu () {
      if (this.showReservedMessageList) {
        this.$refs.preparedTextsMenu.toggle()
      }
    },
    onSelectPreparedText (item) {
      this.textInput = item
      if (this.showReservedMessageList) {
        this.$refs.preparedTextsMenu.hide()
      }
    },
    showSelectFilesDialog () {
      this.selectFilesDialog = true
    },
    hideSelectFilesDialog () {
      this.selectFilesDialog = false
    },

    cleaInput () {
      this.status = 'blur'
      this.textInput = null
      this.recordStop()
      this.removeRecordeVoice()
      this.hideSelectFilesDialog()
      this.$refs.preparedTextsMenu.hide()
    },
    onSendText (isPrivate) {
      this.sendMessage(this.textInput, [], isPrivate)
    },
    onSendVoice (isPrivate) {
      const recordFile = new File([this.recordedVoiceAsBlob], 'recorded-voice.ogg', { type: this.recordedVoiceAsBlob.type })
      this.sendMessage(null, [recordFile], isPrivate)
    },
    onSendFiles ({ files, description }) {
      this.hideSelectFilesDialog()
      this.sendMessage(description, files, false)
    },
    sendMessage (body, files = [], isPrivate = false) {
      this.$emit('sendMessage', {
        body,
        is_private: isPrivate,
        files
      })
      this.cleaInput()
    }
  }
})
</script>

<style scoped lang="scss">
.TicketSendMessageInput {
  .TicketSendMessageInput__status-closed {
    display: flex;
    width: 100%;
    height: 48px;
    min-width: 100%;
    max-width: 100%;
    padding: $spacing-none $space-5;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-top: 1px solid $grey-4;
    background: $grey-1;
    @include body2;
    color: $grey-6;
  }
  .TicketSendMessageInput__accept-ticket {
    display: flex;
    width: 100%;
    height: 48px;
    min-width: 100%;
    max-width: 100%;
    padding: $spacing-none $space-5;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    border-top: 1px solid $grey-4;
    background: $grey-1;
    &-message {
      @include body2;
      color: $grey-9;
      .q-icon {
        margin-right: $space-2;
      }
    }
    &-action {
    }
  }
  .TicketSendMessageInput__start-ticket {
    display: flex;
    width: 100%;
    height: 48px;
    min-width: 100%;
    max-width: 100%;
    padding: $spacing-none $space-5;
    justify-content: space-between;
    align-items: center;
    gap: $space-4;
    flex-shrink: 0;
    border-top: 1px solid $grey-4;
    background: $grey-1;
    &-message {
      @include body2;
      color: $grey-9;
      .TicketSendMessageInput__assign-full-name {
        @include subtitle2;
        color: $secondary-5;
        margin-right: $space-1;
      }
    }
  }
  :deep(.q-field) {
    position: relative;
    .q-field__control {
      align-items: flex-end;
      .q-field__prepend,
      .q-field__append {
        padding-bottom: 2px;
      }
    }
    .TicketSendMessageInput__recording-area {
      &.TicketSendMessageInput__recording-area--recording {
        display: flex;
        padding: $spacing-none $space-5;
        justify-content: space-between;
        align-items: center;
        gap: $space-2;
        flex-shrink: 0;
        border-top: 1px solid $grey-3;
        background: $grey-1;
        position: absolute;
        z-index: 3;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        .TicketSendMessageInput__recording-timer {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: $space-2;
          color: $grey-9;
          @include body2;
          .TicketSendMessageInput__recording-sign {
            display: flex;
            width: 8px;
            height: 8px;
            justify-content: space-between;
            align-items: center;
            border-radius: $radius-6;
            background: $negative-5;
          }
        }
        .TicketSendMessageInput__recording-action-area {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          height: 100%;
          .TicketSendMessageInput__recording-cancel-label {
            color: $negative-5;
            @include body2;
            margin-right: $space-6;
          }
          .TicketSendMessageInput__btn-recording {
            $btn-size: 38px;
            max-width: $btn-size !important;
            min-width: $btn-size !important;
            max-height: $btn-size !important;
            min-height: $btn-size !important;
          }
        }
      }
    }
    .TicketSendMessageInput__voice-recorded-area {
      display: flex;
      padding: $spacing-none $space-5;
      justify-content: space-between;
      align-items: center;
      gap: $space-1;
      flex-shrink: 0;
      border-top: 1px solid $grey-3;
      background: $grey-1;
      position: absolute;
      z-index: 3;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      .TicketSendMessageInput__btn-delete-voice {}
      .TicketSendMessageInput__preview-recorded-voice {
        width: inherit;
      }
      .TicketSendMessageInput__btn-send-private-voice-message {
        color: $warning;
        transform: rotate(180deg);
      }
      .TicketSendMessageInput__btn-send-voice-message {
        color: $secondary-6;
        transform: rotate(180deg);
      }
    }
    .TicketSendMessageInput__btn-send-private-message {
      color: $warning;
      transform: rotate(180deg);
    }
    .TicketSendMessageInput__btn-send-message {
      color: $secondary-6;
      transform: rotate(180deg);
    }
  }
  &.TicketSendMessageInput__recording {
    :deep(.q-field) {
      .q-field__inner {
        .q-field__control {
          .q-field__control-container {
            display: none;
          }
        }
      }
    }
  }
  &.TicketSendMessageInput__voice-recorded {
    :deep(.q-field) {
      .q-field__inner {
        .q-field__control {
          .q-field__control-container {
            display: none;
          }
        }
      }
    }
  }
}

:global(.q-menu.preparedTextsMenu) {
  padding: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}
</style>

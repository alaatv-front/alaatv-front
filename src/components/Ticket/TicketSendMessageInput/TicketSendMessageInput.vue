<template>
  <div class="TicketSendMessageInput"
       :class="{
         'TicketSendMessageInput__blur': status === 'blur',
         'TicketSendMessageInput__recording': status === 'voice-recording',
         'TicketSendMessageInput__voice-recorded': status === 'voice-recorded',
       }">
    <select-files />
    {{ preparedTextsMenu }}
    <div v-if="hasStatus(['voice-recordingsss'])"
         class="TicketSendMessageInput__recording-areaaaa">
      voice-recordingsss
    </div>
    <q-input v-if="hasStatus(['blur', 'text-input-focus', 'typing', 'voice-recording', 'voice-recorded'])"
             v-model="textInput"
             class="no-title"
             autogrow
             @blur="onBlurTextInput"
             @focus="onFocusTextInput">
      <template #append>
        <template v-if="hasStatus(['text-input-focus', 'typing'])">
          <q-btn flat
                 square
                 icon="ph:paper-plane-right"
                 class="TicketSendMessageInput__btn-send-message size-lg" />
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
                     class="TicketSendMessageInput__btn-recording size-lg"
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
                <q-btn flat
                       square
                       icon="ph:paper-plane-right"
                       class="TicketSendMessageInput__btn-send-voice-message size-lg" />
              </div>
            </div>
          </div>
        </template>
      </template>
      <template #prepend>
        <template v-if="hasStatus(['blur', 'text-input-focus', 'typing'])">
          <q-btn ref="btnToggleCustomMessages"
                 flat
                 square
                 icon="ph:chat-dots"
                 class="TicketSendMessageInput__btn-select-file size-lg"
                 @click="togglePreparedTextsMenu" />
          <q-btn ref="btnSelectFile"
                 flat
                 square
                 icon="ph:paperclip"
                 class="TicketSendMessageInput__btn-toggle-custom-messages-list size-lg" />
        </template>
      </template>
      <q-menu ref="preparedTextsMenu"
              fit
              no-parent-event
              anchor="top start"
              self="bottom right"
              class="preparedTextsMenu">
        <prepared-texts :list="preparedTextList"
                        @select="onSelectPreparedText" />
      </q-menu>
    </q-input>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import SelectFiles from './SelectFiles.vue'
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
  },
  data () {
    return {
      textInput: null,
      recordInterval: null,
      recordedVoiceAsBlob: null,
      recordedVoiceDurationInSeconds: 0,
      mediaRecorder: null,
      preparedTextsMenu: true,
      preparedTextList: [
        {
          title: '/عنوان آماده 1',
          text: 'لورم ایپسوم متنی ساختگی...'
        },
        {
          title: '/عنوان آماده 2',
          text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم...'
        },
        {
          title: '/عنوان آماده 3',
          text: 'لورم ایپسوم متن ساختگی با تولید...'
        },
        {
          title: '/عنوان آماده 4',
          text: 'لورم ایپسوم...'
        }
      ],
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
  methods: {
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
        this.$refs.btnToggleCustomMessages?.$el === event.srcElement
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
        this.$refs.btnToggleCustomMessages?.$el === event.srcElement
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
      if (this.status === 'voice-recorded') {
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

      const onError = (err) => {
        console.error(err.name + ': ' + err.message)
        document.write('مرورگر شما اجازه دسترسی به میکروفون را ندارد')
      }

      navigator.mediaDevices.getUserMedia(constraints)
        .then(onSuccess, onError)

      this.recordedVoiceDurationInSeconds = 0
      console.trace('setInterval')
      this.recordInterval = setInterval(() => {
        this.recordedVoiceDurationInSeconds++
      }, 1000)
    },
    recordStop () {
      if (this.mediaRecorder) {
        this.mediaRecorder.stop()
      }
      if (this.recordInterval) {
        console.trace('clearInterval')
        clearInterval(this.recordInterval)
      }
    },
    togglePreparedTextsMenu () {
      // this.preparedTextsMenu = !this.preparedTextsMenu
      this.$refs.preparedTextsMenu.toggle()
    },
    onSelectPreparedText (item) {
      this.textInput = item.text
      this.$refs.preparedTextsMenu.hide()
    }
  }
})
</script>

<style scoped lang="scss">
.TicketSendMessageInput {
  :deep(.q-field) {
    position: relative;
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
            //max-height: 100%;
            //min-height: 100%;
            //height: 100% !important;
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
      .TicketSendMessageInput__btn-send-voice-message {
        color: $secondary-6;
        transform: rotate(180deg);
      }
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

:global(.q-menu) {
  &.preparedTextsMenu {
    padding: 0;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
  }
}
</style>

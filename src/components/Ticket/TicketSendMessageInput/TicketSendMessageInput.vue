<template>
  <div class="TicketSendMessageInput"
       :class="{
         'TicketSendMessageInput__blur': status === 'blur',
         'TicketSendMessageInput__recording': status === 'recording-voice',
         'TicketSendMessageInput__voice-recorded': status === 'voice-recorded',
       }">
    {{ status }}
    <div v-if="hasStatus(['recording-voicesss'])"
         class="TicketSendMessageInput__recording-areaaaa">
      recording-voicesss
    </div>
    <q-input v-if="hasStatus(['blur', 'text-input-focus', 'typing', 'recording-voice', 'voice-recorded'])"
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
        <template v-if="hasStatus(['blur', 'recording-voice', 'voice-recorded'])">
          <div class="TicketSendMessageInput__recording-area"
               :class="{'TicketSendMessageInput__recording-area--no-recording': status !== 'recording-voice','TicketSendMessageInput__recording-area--recording': status === 'recording-voice'}">
            <div v-if="hasStatus(['recording-voice'])"
                 class="TicketSendMessageInput__recording-timer">
              <div class="TicketSendMessageInput__recording-sign" />
              14:25
            </div>
            <div class="TicketSendMessageInput__recording-action-area">
              <div v-if="hasStatus(['recording-voice'])"
                   class="TicketSendMessageInput__recording-cancel-label">
                <q-icon name="ph:caret-right" />
                لغو کردن پیام صوتی
              </div>
              <q-btn v-if="hasStatus(['recording-voice', 'blur'])"
                     ref="btnStartRecording"
                     v-touch-swipe.mouse="handleSwipeBtnStartRecording"
                     :flat="status !== 'recording-voice'"
                     :color="status === 'recording-voice' ? 'secondary' : undefined"
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
                       class="TicketSendMessageInput__btn-delete-voice size-lg" />
                <div class="TicketSendMessageInput__preview-recorded-voice" />
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
          <q-btn ref="btnSelectFile"
                 flat
                 square
                 icon="ph:chat-dots"
                 class="TicketSendMessageInput__btn-select-file size-lg" />
          <q-btn ref="btnToggleCustomMessages"
                 flat
                 square
                 icon="ph:paperclip"
                 class="TicketSendMessageInput__btn-toggle-custom-messages-list size-lg" />
        </template>
      </template>
    </q-input>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TicketMessage',
  props: {
  },
  data () {
    return {
      textInput: null,
      status: 'blur' // 'blur', 'text-input-focus', 'typing', 'recording-voice', 'voice-recorded
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
    }
  },
  methods: {
    handleSwipeBtnStartRecording (event) {
      if (event.direction !== 'right' || this.status !== 'recording-voice') {
        return
      }
      this.onStopRecordingVoice()
    },
    onFocusTextInput (event) {
      if (
        this.status === 'recording-voice' ||
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
      if (this.status === 'recording-voice') {
        this.onStopRecordingVoice()
      } else if (this.textInput) {
        this.status = 'typing'
      } else {
        this.status = 'blur'
      }
    },
    onStartRecordingVoice () {
      this.status = 'recording-voice'
    },
    onStopRecordingVoice () {
      this.status = 'voice-recorded'
    },
    onBlurBtnRecordingVoice () {
      this.onStopRecordingVoice()
    },
    onMouseupBtnRecordingVoice () {
      this.onStopRecordingVoice()
    },
    onMousedownBtnRecordingVoice () {
      this.onStartRecordingVoice()
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
        border-radius: $radius-5;
        background: $secondary-3;
        height: 32px;
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
</style>

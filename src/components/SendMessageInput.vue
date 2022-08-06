<template>
  <div class="SendMessageInput">

    <div class="input-group"
    >
      <div v-show="canShowMic"
           class="input-group-prepend">
        <q-btn
          class="btn  actionBtn btnRecordVoiceForUpload"
          v-longpress="recordVoice"
          color="positive"
          icon="isax:microphone"
        >
        </q-btn>
      </div>
      <div v-show="canShowSelectPic"
           class="input-group-append">
        <q-btn
          class="btn  actionBtn"
          color="positive"
          @click="getFile"
          icon="isax:image"
        >
          <input
            ref="myFileInput"
            style="display:none"
            type="file"
            @change="loadImage($event)"
            accept="image/*"
          />
        </q-btn>

        <q-dialog
          persistent
          class="imageModal"
          v-model="showModalStatus"
          @close="clearMessage"
        >
          <q-card>
            <div>
              <cropper
                ref="cropper"
                class="cropper"
                :src="imgURL"
                :canvas="{
                  minHeight: 0,
                  minWidth: 0,
                  maxHeight: 2048,
                  maxWidth: 2048,
                }"
                @change="change"
              />

              <div class="slider_box">
                <q-btn
                  class="cancel-pic"
                  @click="clearMessage"
                  label="حذف"
                />
                <div class="angle-slider">
                  <p class="title">میزان چرخش:</p>
                  <input
                    id="slider"
                    class="angle_slider"
                    type="range"
                    min="0"
                    max="360"
                    v-model="rotateAngle"
                    @change="rotate"
                  />
                </div>
              </div>

              <q-input
                class="imageInput"
                placeholder="متن پیام ..."
                v-model="newMessageTextInModal" />

            </div>
            <div
              :class="[(true) ? 'adminSendPic' : '']"
            >
              <q-btn
                class="imageBtn BtnSuccess"
                @click="getResult(false)"
                :loading="sendLoading"
                icon="isax:tick-square"
              />
              <q-btn
                v-if="true"
                class="imageBtn BtnWarning"
                @click="getResult(true)"
                :loading="sendLoading"
                icon="isax:card-send"
              />
            </div>
          </q-card>

        </q-dialog>
      </div>

      <div
        v-show="canShowSendBtn"
        class="input-group-append"
        :class="[(true) ? 'adminSend' : '']">
        <q-btn
          size="12px"
          class="btn  actionBtn sendBtn BtnSuccess"
          :loading="sendLoading"
          @click="sendMessage(false)"
          icon="isax:send-1"
        />
        <q-btn
          size="12px"
          v-if="true"
          class="btn  actionBtn sendBtn BtnWarning"
          :loading="sendLoading"
          icon="isax:directbox-send"
          @click="sendMessage(true)"
        />
      </div>

      <av-waveform
        class="av-waveform"
        v-if="recordedVoice !== null"
        v-show="showVoicePlayer"
        :audio-src="recordedVoice"
        :playtime-font-family="'IRANSans'"
        :audio-controls="false"
        ref="playAudio"
        :canv-width="1285"
        :canv-height="64"
      ></av-waveform>

      <av-media
        v-show="showVoiceVisualizer"
        class="voiceVisualizer"
        type="wform"
        :media="streamVoice"
        line-color="#ff9000"
        :canv-width="1285"
        :canv-height="64"
      />

      <q-input
        v-show="canShowTextarea"
        class="newMessageText"
        placeholder="متن پیام ..."
        v-model="newMessage.text">
      </q-input>

      <div
        v-if="recordedVoice !== null"
        v-show="showVoicePlayer"
        class="input-group-prepend">
        <q-btn
          v-if="!showVoicePlayerIsPlaying"
          color="primary"
          class="btn  actionBtn"
          @click="playRecordedVoice"
          icon="isax:play"
        />
        <q-btn
          v-else
          color="primary"
          class="btn  actionBtn"
          @click="pauseRecordedVoice"
          icon="isax:pause" />
      </div>

      <div
        v-if="recordedVoice !== null"
        v-show="showVoicePlayer"
        class="input-group-prepend">
        <q-btn
          color="primary"
          class="btn  actionBtn"
          icon="isax:play-remove"
          @click="clearMessage"
        />
      </div>
    </div>
  </div>
</template>

<script>

import AvWaveform from 'vue-audio-visual/src/components/AvWaveform'
import AvMedia from 'vue-audio-visual/src/components/AvMedia'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

const longpress = {
  created (el, binding, vNode) {
    if (typeof binding.value !== 'function') {
      const compName = vNode.context.name
      let warn = `[longpress:] provided expression '${binding.expression}' is not a function, but has to be`
      if (compName) {
        warn += `Found in component '${compName}' `
      }

      console.warn(warn)
    }

    // Define variable
    let pressTimer = null

    const start = (e) => {
      if (e.type === 'click' && e.button !== 0) {
        return
      }

      handler('longpress-start')

      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          // Run function
          handler('longpress-holding')
        }, 1)
      }
    }

    const cancel = (e) => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer)
        pressTimer = null
        handler('longpress-left')
      }
    }

    // Run
    const handler = (e) => {
      binding.value(e)
    }

    // Add Event listeners
    el.addEventListener('mousedown', start)
    el.addEventListener('touchstart', start)
    // Cancel timeouts if these events happen
    el.addEventListener('click', cancel)
    el.addEventListener('mouseout', cancel)
    el.addEventListener('touchend', cancel)
    el.addEventListener('touchcancel', cancel)
  }
}

export default {
  name: 'SendMessageInput',
  props: {
    sendLoading: {
      type: Boolean,
      default: false
    }
  },
  components: {
    AvWaveform,
    Cropper,
    AvMedia
  },
  data () {
    return {
      imgURL: '',
      resultURL: '',
      userPicSelected: false,
      userPicClipped: false,
      picRotate: 0,
      rotateAngle: 0,
      oldRotateAngle: 0,
      showModalStatus: false,

      newMessageTextInModal: '',

      streamVoice: null,
      recordedVoice: null,
      recordedVoiceBlob: null,
      showVoicePlayer: false,
      showVoicePlayerIsPlaying: false,
      audioPlayerLastPlayedTime: 0,
      showVoiceVisualizer: false,
      duration: null,
      mediaRecorder: null,
      audioCtx: null,
      canvasCtx: null,

      newMessage: {
        text: '',
        pic: '',
        voice: ''
      }
    }
  },
  watch: {
    imgURL: {
      handler (newValue) {
        if (newValue) {
          this.showModalStatus = true
          this.userPicClipped = false
          this.userPicSelected = true
        }
      }
    },
    resultURL: {
      handler (val) {
        this.userPicClipped = true
        if (val) this.userPicSelected = true
      }
    },
    sendLoading: {
      handler (newVal) {
        this.Loading = newVal
      }
    }
  },
  computed: {
    isAdmin () {
      return this.$store.getters.appProps.isAdmin
    },
    canShowSendBtn () {
      return (this.newMessage.text.length > 0 || this.showVoicePlayer)
    },
    canShowTextarea () {
      return (this.newMessage.text.length > 0) || (this.canShowMic && this.canShowSelectPic)
    },
    canShowMic () {
      return (this.newMessage.text.length === 0 && !this.userPicSelected && !this.recordedVoice)
    },
    canShowSelectPic () {
      return (this.newMessage.text.length === 0 && this.mediaRecorder === null)
    },
    canShowPlayerForRecordedVoice () {
      return (this.newMessage.text.length === 0 && !this.userPicSelected && this.mediaRecorder !== null && this.mediaRecorder.state === 'inactive')
    },
    canShowImageTools () {
      return !this.userPicClipped && this.userPicSelected
    }
  },
  methods: {

    recordVoice (status) {
      if (status === 'longpress-start') {
        this.recordStart()
      } else if (status === 'longpress-left') {
        this.recordStop()
      }
    },

    recordStart () {
      if (!navigator.mediaDevices) {
        this.$q.notify({
          message: 'مرورگر شما ضبط صدا را پشتیبانی نمی کند.'
        })
        return
      }

      const that = this

      const constraints = { audio: true }
      let chunks = []
      this.recordedVoice = null

      const onSuccess = function (stream) {
        that.showVoicePlayer = false
        that.showVoiceVisualizer = true

        that.streamVoice = stream

        that.mediaRecorder = new MediaRecorder(stream)
        that.mediaRecorder.start()

        that.mediaRecorder.onstop = function (e) {
          const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' })
          chunks = []
          that.recordedVoiceBlob = blob
          that.recordedVoice = window.URL.createObjectURL(blob)

          stream.getTracks().forEach(function (track) {
            track.stop()
          })
        }

        that.mediaRecorder.ondataavailable = function (e) {
          chunks.push(e.data)
        }
      }

      const onError = function (err) {
        console.log(err.name + ': ' + err.message)
        document.write('مرورگر شما اجازه دسترسی به میکروفون را ندارد')
      }

      navigator.mediaDevices.getUserMedia(constraints)
        .then(onSuccess, onError)
    },

    recordStop () {
      if (this.mediaRecorder) {
        this.mediaRecorder.stop()
      }
      this.canShowMic = false
      this.showVoicePlayer = true
      this.showVoiceVisualizer = false
      this.audioPlayerLastPlayedTime = 0
    },

    playRecordedVoice () {
      const audioPlayer = this.$refs.playAudio.audio,
        that = this
      audioPlayer.src = this.recordedVoice
      audioPlayer.currentTime = this.audioPlayerLastPlayedTime
      audioPlayer.onended = function () {
        audioPlayer.currentTime = 0
        that.audioPlayerLastPlayedTime = 0
        that.showVoicePlayerIsPlaying = false
      }
      audioPlayer.play()
      this.showVoicePlayerIsPlaying = true
    },

    pauseRecordedVoice () {
      const audioPlayer = this.$refs.playAudio.audio
      audioPlayer.pause()
      this.audioPlayerLastPlayedTime = audioPlayer.currentTime
      this.showVoicePlayerIsPlaying = false
    },

    getFile () {
      this.$refs.myFileInput.click()
    },

    loadImage (event) {
      const { files } = event.target
      if (files && files[0]) {
        if (this.imgURL) {
          URL.revokeObjectURL(this.imgURL)
        }
        const blob = URL.createObjectURL(files[0])
        const reader = new FileReader()
        reader.onload = (e) => {
          this.imgURL = blob
        }
        reader.readAsArrayBuffer(files[0])
      }
    },

    change ({ canvas }) {
      this.resultURL = canvas.toDataURL('image/jpeg', 0.3)
    },

    rotate () {
      this.$refs.cropper.rotate(this.rotateAngle - this.oldRotateAngle)
      this.oldRotateAngle = this.rotateAngle
    },

    clearMessage () {
      this.newMessage.text = ''
      this.imgURL = ''
      this.resultURL = ''
      this.showVoicePlayer = false
      this.userPicSelected = false
      this.userPicClipped = false
      this.showModalStatus = false
      this.mediaRecorder = null

      this.recordedVoice = null
      this.recordedVoiceBlob = null
    },

    getResult (isPrivate) {
      this.$emit('sendImage', {
        resultURL: this.resultURL,
        caption: this.newMessageTextInModal,
        isPrivate
      })
      // this.clearMessage()
    },

    sendMessage (isPrivate) {
      if (this.recordedVoice === null) {
        this.$emit('sendText', {
          body: this.newMessage.text,
          isPrivate
        })
      } else {
        this.$emit('sendVoice', {
          voice: this.recordedVoiceBlob,
          isPrivate
        })
      }
      // this.clearMessage()
    }
  },
  directives: {
    longpress
  }
}
</script>

<style scoped>

.BtnSuccess {
  color: #fff;
  background-color: #34bfa3;
  border-color: #34bfa3;
}

.BtnWarning {
  color: #212529;
  background-color: #ffb822;
  border-color: #ffb822;
}
</style>

<style scoped lang="scss">
.imageModal {
  .slider_box {
    display: flex;
    justify-content: center;
    margin: 10px;
    align-items: center;
    @media screen and (max-width: 350px) {
      flex-direction: column;
    }

    .cancel-pic {
      border-radius: 10px;
      background: transparent;
      border: 1px #ff4545 solid;
      color: #ff4545;
      margin-left: 10px;

      span {
        font-size: 14px;
        padding: 5px
      }

    }

    .angle-slider {
      display: flex;

      .title {
        margin: 0 5px 0 10px;
        font-size: 14px;
        display: flex;
        align-items: center;
      }

      .angle_slider {
        direction: rtl;
        opacity: 0.8;
        outline: none !important;
        border-radius: 50px;
        -webkit-transition: 0.2s;
        transition: opacity 0.2s;

        &:hover {
          opacity: 1;
        }
      }
    }
  }

  .cropper {
    height: 400px;
    background: #DDD;

    &:deep(.vue-rectangle-stencil) {
      direction: rtl;
      right: 0;
    }

    &:deep(.vue-handler-wrapper) {
      transform: translate(50%, -50%);
    }
  }

  .imageInput {
    border: 1px solid #ced4da;
    color: #575962;

    &:deep(.q-field__native) {
      margin-left: 3px;
    }
  }

  .imageBtn {
    border-radius: 0;
  }

  .adminSendPic {
    display: flex;
  }

  .adminSendPic .imageBtn {
    width: 50%;
    min-width: 50%;
    max-width: 50%;
    margin: 0;
  }
}

.SendMessageInput {
  .input-group {
    display: flex;

    .input-group-prepend {
      .btn {
        width: 64px;
        height: 64px;
        padding: 0;
        border-radius: 0;
      }
    }

    .input-group-append {
      .btn {
        width: 64px;
        height: 64px;
        padding: 0;
        border-radius: 0;
      }

      &.adminSend {
        display: flex;
        flex-direction: column;

        .btn {
          height: 32px;
          margin: 0;
        }
      }
    }

    .newMessageText {
      width: 1080px;
      border: 1px solid #ced4da;
      color: #575962;
      border-radius: 0 15px 15px 0;

      &:deep(.q-field__control) {
        height: 64px;
      }

      &:deep(.q-field__native) {
        margin-left: 3px;
      }
    }

    .av-waveform {
      display: flex;
    }
  }

  .voiceVisualizer, .voicePlayer {
    width: calc(100% - 64px);
    height: 64px;
  }

  .vue-audio-recorder {
    width: 100%;
    height: 100%;
    background: transparent;
  }

  .vue-audio-recorder:hover {
    background: transparent;
  }

}

</style>

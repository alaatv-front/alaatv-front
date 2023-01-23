<template>
  <q-no-ssr>
    <q-card class="msg-input-box">
      <div v-if="canChoseOrder">
        <q-btn unelevated
               class="q-mb-lg"
               color="primary"
               @click="onOpenOrderList">انتخاب سفارش مورد نظر
        </q-btn>
        <drawer :is-open="orderDrawer"
                max-width="1016px">
          <q-scroll-area class="fit">
            <q-btn icon="mdi-close"
                   class="close-btn"
                   unelevated
                   @click="orderDrawer = false" />
            <user-order-list :user-orders-list="userOrderData?.list"
                             :loading="orderLoading" />
          </q-scroll-area>
        </drawer>
      </div>

      <div v-if="canAssignTicket"
           class="q-py-lg">
        <p>
          اپراتورهای تخصیص داده شده:
        </p>

        <q-select v-model="assignTo"
                  outlined
                  :options="userAssignees.list">
          <template v-slot:selected>
            {{ assignTo ? assignTo.full_name : '-' }}
            {{ assignTo ? '(' + assignTo.role + ')' : '' }}
          </template>
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                {{ scope.opt.full_name }} ({{ scope.opt.role }})
              </q-item-section>
            </q-item>
          </template>
        <!--        <template v-slot:option="scope">-->
        <!--          Company: {{scope.full_name }}-->
        <!--          {{scope.role}}-->
        <!--        </template>-->
        </q-select>
      </div>
      <div class=" SendMessageInput ">
        <div v-show="canShowMic"
             class="input-group-prepend">
          <q-btn v-longpress="recordVoice"
                 unelevated
                 class="btn  actionBtn btnRecordVoiceForUpload"
                 color="positive"
                 icon="isax:microphone" />
        </div>
        <div v-show="canShowSelectPic"
             class="input-group-append">
          <q-btn unelevated
                 class="btn  actionBtn"
                 color="primary"
                 icon="isax:image"
                 @click="getFile">
            <input ref="myFileInput"
                   style="display:none"
                   type="file"
                   accept="image/*"
                   @change="loadImage($event)">
          </q-btn>

          <q-dialog v-model="showModalStatus"
                    persistent
                    class="imageModal"
                    @close="clearMessage">
            <q-card>
              <div>
                <!--                <cropper-->
                <!--                  ref="cropper"-->
                <!--                  class="cropper"-->
                <!--                  :src="imgURL"-->
                <!--                  :canvas="{-->
                <!--                    minHeight: 0,-->
                <!--                    minWidth: 0,-->
                <!--                    maxHeight: 2048,-->
                <!--                    maxWidth: 2048,-->
                <!--                  }"-->
                <!--                  @change="change"-->
                <!--                />-->

                <div class="slider_box">
                  <q-btn unelevated
                         class="delete-pic-btn"
                         label="حذف"
                         @click="clearMessage" />
                  <div class="angle-slider">
                    <p class="title">میزان چرخش :</p>
                    <input id="slider"
                           v-model="rotateAngle"
                           class="angle_slider"
                           type="range"
                           min="0"
                           max="360"
                           @change="rotate">
                  </div>
                </div>

                <q-input v-model="newMessageTextInModal"
                         borderless
                         class="imageInput"
                         placeholder="متن پیام ..." />

              </div>
              <div class="adminSendPic">
                <q-btn unelevated
                       class="imageBtn BtnSuccess"
                       :loading="sendLoading"
                       icon="isax:tick-square"
                       @click="emitData(false)" />
                <q-btn v-if="isAdmin"
                       unelevated
                       class="imageBtn BtnWarning"
                       :loading="sendLoading"
                       icon="isax:card-send"
                       @click="emitData(true)" />
              </div>
            </q-card>

          </q-dialog>
        </div>
        <div v-if="canShowSelectFile">
          <q-btn unelevated
                 square
                 color="teal-7"
                 icon="attach_file"
                 class="actionBtn full-height attach-file"
                 @click="$refs.fileInput.click()" />
          <input ref="fileInput"
                 type="file"
                 style="display: none;"
                 @change="loadFile($event)">
        </div>

        <div v-show="canShowSendBtn"
             class="input-group-append adminSend">
          <q-btn size="12px"
                 class="btn  actionBtn sendBtn BtnSuccess "
                 :loading="sendLoading"
                 icon="isax:send-1"
                 @click="emitData(false)" />
          <q-btn v-if="isAdmin"
                 size="12px"
                 class="btn  actionBtn sendBtn BtnWarning"
                 :loading="sendLoading"
                 icon="isax:directbox-send"
                 @click="emitData(true)">
            <q-tooltip>
              ارسال به صورت خصوصی
            </q-tooltip>
          </q-btn>
        </div>
        <!--        <q-no-ssr>-->
        <!--          <av-waveform-->
        <!--            v-if="recordedVoice !== null"-->
        <!--            v-show="showVoicePlayer"-->
        <!--            ref="playAudio"-->
        <!--            class="av-waveform"-->
        <!--            :audio-src="recordedVoice"-->
        <!--            :playtime-font-family="'IRANSans'"-->
        <!--            :audio-controls="false"-->
        <!--            :canv-width="1285"-->
        <!--            :canv-height="64"-->
        <!--          />-->
        <!--        </q-no-ssr>-->
        <!--        <q-no-ssr>-->
        <!--          <av-media-->
        <!--            v-show="showVoiceVisualizer"-->
        <!--            class="voiceVisualizer"-->
        <!--            type="wform"-->
        <!--            :media="streamVoice"-->
        <!--            line-color="#ff9000"-->
        <!--            :canv-width="1285"-->
        <!--            :canv-height="64"-->
        <!--          />-->
        <!--        </q-no-ssr>-->
        <q-input v-show="canShowTextarea"
                 v-model="newMessage.text"
                 borderless
                 class="newMessageText"
                 placeholder="متن پیام ..." />

        <div v-if="recordedVoice !== null"
             v-show="showVoicePlayer"
             class="input-group-prepend">
          <q-btn v-if="!showVoicePlayerIsPlaying"
                 unelevated
                 color="primary"
                 class="btn  actionBtn"
                 icon="isax:play"
                 @click="playRecordedVoice" />
          <q-btn v-else
                 unelevated
                 color="primary"
                 class="btn  actionBtn"
                 icon="isax:pause"
                 @click="pauseRecordedVoice" />
        </div>
        <div v-if="recordedVoice !== null"
             v-show="showVoicePlayer"
             class="input-group-prepend">
          <q-btn unelevated
                 color="primary"
                 class="btn  actionBtn"
                 icon="isax:play-remove"
                 @click="clearMessage" />
        </div>
      </div>
    </q-card>
  </q-no-ssr>
</template>

<script>
// ToDo: index.js?dd82:556 [webpack-dev-server] WARNING
// chunk vendor [mini-css-extract-plugin]
// Conflicting order. Following module has been added:
//   * css ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-50.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-50.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-50.use[3]!./node_modules/@quasar/app-webpack/lib/webpack/loader.quasar-sass-variables.js!./node_modules/@quasar/app-webpack/lib/webpack/loader.vue.auto-import-quasar.js??ruleSet[0].use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[1]!./node_modules/quasar-crud/src/components/Entity/EntityAction.vue?vue&type=style&index=0&id=f9dd49ae&lang=sass
//   despite it was not able to fulfill desired ordering with these modules:
//   * css ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-38.use[1]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-38.use[2]!./node_modules/vue-advanced-cropper/dist/style.css
// - couldn't fulfill desired order of chunk group(s) ,
// - while fulfilling desired order of chunk group(s) ,

import { UserList } from 'src/models/User.js'
import Drawer from 'components/CustomDrawer.vue'
// import { Cropper } from 'vue-advanced-cropper'
import { CartItemList } from 'src/models/CartItem.js'
import UserOrderList from 'components/Ticket/userOrderList.vue'
// import AvMedia from '@kerasus/vue-audio-visual/src/components/AvMedia.js'
// import AvWaveform from '@kerasus/vue-audio-visual/src/components/AvWaveform.js'
// import 'vue-advanced-cropper/dist/style.css'

const longpress = {
  // created(el, binding) { /*, vNode */
  //   if (typeof binding.value !== 'function') {
  //     // const compName = vNode.context.name
  //     // let warn = `[longpress:] provided expression '${binding.expression}' is not a function, but has to be`
  //     // if (compName) {
  //     //   warn += `Found in component '${compName}' `
  //     // }
  //   }
  //
  //   // Define variable
  //   let pressTimer = null
  //
  //   const start = (e) => {
  //     if (e.type === 'click' && e.button !== 0) {
  //       return
  //     }
  //
  //     handler('longpress-start')
  //
  //     if (pressTimer === null) {
  //       pressTimer = setTimeout(() => {
  //         // Run function
  //         handler('longpress-holding')
  //       }, 1)
  //     }
  //   }
  //
  //   const cancel = (e) => {
  //     if (pressTimer !== null) {
  //       clearTimeout(pressTimer)
  //       pressTimer = null
  //       handler('longpress-left')
  //     }
  //   }
  //
  //   // Run
  //   const handler = (e) => {
  //     binding.value(e)
  //   }
  //
  //   // Add Event listeners
  //   el.addEventListener('mousedown', start)
  //   el.addEventListener('touchstart', start)
  //   // Cancel timeouts if these events happen
  //   el.addEventListener('click', cancel)
  //   el.addEventListener('mouseout', cancel)
  //   el.addEventListener('touchend', cancel)
  //   el.addEventListener('touchcancel', cancel)
  // }
}

export default {
  name: 'SendMessageInput',
  components: {
    // AvWaveform,
    // Cropper,
    // AvMedia,
    Drawer,
    UserOrderList
  },
  directives: {
    longpress
  },
  props: {
    sendLoading: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      default: 'user'
    },
    canAssignTicket: {
      type: Boolean,
      default: false
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    canChoseOrder: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    fileInput: '',
    assignTo: null,
    imgURL: '',
    orderDrawer: false,
    orderLoading: false,
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
  }),
  computed: {
    canShowSendBtn() {
      return (this.newMessage.text.length > 0 || this.showVoicePlayer)
    },
    canShowSelectFile() {
      return (this.newMessage.text.length === 0)
    },
    canShowTextarea() {
      return (this.newMessage.text.length > 0) || (this.canShowMic && this.canShowSelectPic)
    },
    canShowMic() {
      return (this.newMessage.text.length === 0 && !this.userPicSelected && !this.recordedVoice)
    },
    canShowSelectPic() {
      return (this.newMessage.text.length === 0 && this.mediaRecorder === null)
    },
    canShowPlayerForRecordedVoice() {
      return (this.newMessage.text.length === 0 && !this.userPicSelected && this.mediaRecorder !== null && this.mediaRecorder.state === 'inactive')
    },
    canShowImageTools() {
      return !this.userPicClipped && this.userPicSelected
    },
    userAssignees() {
      return new UserList([
        {
          inputData: {
            id: 2,
            first_name: 'mitra',
            last_name: 'zolfi',
            mobile: '09388131193',
            national_code: '4900443050',
            photo: 'https://nodes.alaatv.com/upload/images/profile/default_avatar.jpg',
            role: 'پشتیبان',
            major: { id: 1, name: 'ریاضی', title: 'ریاضی', selected: true }
          },
          url_key: 'user',
          id: 2,
          first_name: 'mitra',
          last_name: 'zolfi',
          full_name: 'mitra zolfi',
          mobile_verified_at: null,
          mobile: '09388131193',
          phone: null,
          national_code: '4900443050',
          nationalCode: null,
          email: null,
          province: { id: null, title: '' },
          city: { id: null, title: '' },
          school: null,
          address: null,
          role: 'پشتیبان',
          photo: 'https://nodes.alaatv.com/upload/images/profile/default_avatar.jpg',
          photoOfKartemeli: null,
          birthdate: null,
          postalCode: null,
          completion: null,
          created_at: null,
          updated_at: null,
          major_id: 1,
          grade_id: null,

          educational_base_id: null,
          gender_id: null,
          shahr: { id: null },
          shahr_id: null
        },
        {
          inputData: {
            id: 1,
            first_name: 'mitra',
            last_name: 'zolfi',
            mobile: '09388131193',
            national_code: '4900443050',
            photo: 'https://nodes.alaatv.com/upload/images/profile/default_avatar.jpg',
            role: 'ادمین',
            major: { id: 1, name: 'ریاضی', title: 'ریاضی', selected: true }
          },
          url_key: 'user',
          id: 3,
          first_name: 'mitra',
          last_name: 'khorram',
          full_name: 'mitra khorram',
          mobile_verified_at: null,
          mobile: '09388131193',
          phone: null,
          national_code: '4900443050',
          nationalCode: null,
          email: null,
          province: { id: null, title: '' },
          city: { id: null, title: '' },
          school: null,
          address: null,
          role: 'ادمین',
          photo: 'https://nodes.alaatv.com/upload/images/profile/default_avatar.jpg',
          photoOfKartemeli: null,
          birthdate: null,
          postalCode: null,
          completion: null,
          created_at: null,
          updated_at: null,
          major_id: 1,
          grade_id: null,

          educational_base_id: null,
          gender_id: null,
          shahr: { id: null },
          shahr_id: null
        }
      ])
    }

  },
  watch: {
    imgURL: {
      handler(newValue) {
        if (newValue) {
          this.showModalStatus = true
          this.userPicClipped = false
          this.userPicSelected = true
        }
      }
    },
    resultURL: {
      handler(val) {
        this.userPicClipped = true
        if (val) this.userPicSelected = true
      }
    },
    sendLoading: {
      handler(newVal) {
        this.Loading = newVal
      }
    }
  },
  methods: {
    async onOpenOrderList() {
      this.orderDrawer = true
      this.orderLoading = true

      try {
        const response = await this.callGetOrderApi()
        this.userOrderData = new CartItemList(response.data.data)
        this.orderLoading = false
      } catch {
        this.orderLoading = false
      }
    },
    callGetOrderApi() {
      const userId = this.$store.getters['Auth/user'].id
      return this.$apiGateway.user.ordersById(userId)
      // return this.$axios.get(API_ADDRESS.user.orders.ordersById(userId))
    },
    loadFile(event) {
      const { files } = event.target
      if (files && files[0]) {
        this.fileInput = files
        this.emitData(false)
      }
    },
    deleteFile(event) {
      event.stopPropagation()
      this.fileInput = null
    },

    sendData(isPrivate) {
      this.emitData(isPrivate)
      // this.showModalStatus = false
    },

    recordVoice(status) {
      if (status === 'longpress-start') {
        this.recordStart()
      } else if (status === 'longpress-left') {
        this.recordStop()
      }
    },

    recordStart() {
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
        console.error(err.name + ': ' + err.message)
        document.write('مرورگر شما اجازه دسترسی به میکروفون را ندارد')
      }

      navigator.mediaDevices.getUserMedia(constraints)
        .then(onSuccess, onError)
    },

    recordStop() {
      if (this.mediaRecorder) {
        this.mediaRecorder.stop()
      }
      this.canShowMic = false
      this.showVoicePlayer = true
      this.showVoiceVisualizer = false
      this.audioPlayerLastPlayedTime = 0
    },

    playRecordedVoice() {
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

    pauseRecordedVoice() {
      const audioPlayer = this.$refs.playAudio.audio
      audioPlayer.pause()
      this.audioPlayerLastPlayedTime = audioPlayer.currentTime
      this.showVoicePlayerIsPlaying = false
    },

    getFile() {
      this.$refs.myFileInput.click()
    },

    loadImage(event) {
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

    change({ canvas }) {
      this.resultURL = canvas.toDataURL('image/jpeg', 0.3)
    },

    rotate() {
      // this.$refs.cropper.rotate(this.rotateAngle - this.oldRotateAngle)
      this.oldRotateAngle = this.rotateAngle
    },

    clearMessage() {
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

    emitData(isPrivate) {
      this.$emit('creatTicket', {
        isPrivate,
        ...(this.resultURL && { resultURL: this.resultURL }),
        ...(this.resultURL && { caption: this.newMessageTextInModal }),
        ...(this.newMessage.text && { body: this.newMessage.text }),
        ...(this.recordedVoiceBlob && { voice: this.recordedVoiceBlob }),
        ...(this.fileInput && { file: this.fileInput })
      })
    }

  }
}
</script>

<style lang="scss" scoped>
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
.attach-file {
  width: 64px;
  border-radius: 0;
}

.msg-input-box {
  padding: 30px;
  border-radius: 15px;
  box-shadow: 2px -4px 10px rgba(255, 255, 255, 0.6), -2px 4px 10px rgba(46, 56, 112, 0.05);
}

.imageModal {
  .slider_box {
    display: flex;
    justify-content: center;
    margin: 10px;
    align-items: center;
    @media screen and (max-width: 350px) {
      flex-direction: column;
    }

    .delete-pic-btn {
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
      margin-left: 10px;
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
  display: flex;

  .input-group-prepend {
    .btn {
      width: 64px;
      padding: 0;
      border-radius: 0;
    }
  }

  .btn {
    height: 100%;
    box-shadow: none;
  }

  .input-group-append {
    .btn {
      width: 64px;
      padding: 0;
      border-radius: 0;
    }

    &.adminSend {
      display: flex;
      flex-direction: column;
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
      margin-left: 10px;
    }
  }

  .av-waveform {
    display: flex;
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

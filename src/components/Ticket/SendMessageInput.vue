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
            <q-btn icon="isax:close-circle"
                   color="primary"
                   class="close-btn q-ma-sm"
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
      <div class="SendMessageInput-container">
        <div class="SendMessageInput row">
          <div v-show="canShowMic"
               class="row">
            <div class="input-group-prepend">
              <q-btn unelevated
                     class="btn  actionBtn btnRecordVoiceForUpload"
                     color="positive"
                     icon="ph:microphone"
                     :loading="microphoneBtnLoading"
                     @click="recordVoice(true)" />
            </div>
            <div v-if="recordCurrentStatus"
                 class="input-group-prepend">
              <q-btn unelevated
                     class="btn  actionBtn btnRecordVoiceForUpload"
                     color="negative"
                     icon="ph:pause-circle"
                     @click="recordVoice(false)" />
            </div>
          </div>
          <div v-show="canShowSelectPic"
               class="input-group-append">
            <q-btn unelevated
                   class="btn  actionBtn"
                   color="primary"
                   icon="ph:image"
                   :loading="sendLoading"
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
              <q-card class="imageModal-card">
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
                  <q-img :src="imgURL" />

                  <div class="slider_box">
                    <q-btn unelevated
                           class="delete-pic-btn"
                           label="حذف"
                           @click="clearMessage" />
                  <!--                  <div class="angle-slider">-->
                  <!--                    <p class="title">میزان چرخش :</p>-->
                  <!--                    <input id="slider"-->
                  <!--                           v-model="rotateAngle"-->
                  <!--                           class="angle_slider"-->
                  <!--                           type="range"-->
                  <!--                           min="0"-->
                  <!--                           max="360"-->
                  <!--                           @change="rotate">-->
                  <!--                  </div>-->
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
                         icon="ph:check"
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
          <div v-if="canShowSelectFile && !recordCurrentStatus">
            <q-btn unelevated
                   square
                   color="teal-7"
                   icon="ph:paperclip"
                   class="actionBtn full-height attach-file"
                   :loading="sendLoading"
                   @click="$refs.fileInput.click()" />
            <input ref="fileInput"
                   type="file"
                   style="display: none;"
                   @change="loadFile($event)">
          </div>

          <div v-show="canShowSendBtn"
               class="input-group-append adminSend">
            <q-btn size="12px"
                   unelevated
                   class="btn  actionBtn sendBtn BtnSuccess "
                   :loading="sendLoading"
                   icon="ph:paper-plane-right"
                   @click="emitData(false)" />
            <q-btn v-if="isAdmin"
                   size="12px"
                   unelevated
                   class="btn  actionBtn sendBtn BtnWarning"
                   :loading="sendLoading"
                   icon="ph:paper-plane-tilt"
                   @click="emitData(true)">
              <q-tooltip>
                ارسال به صورت خصوصی
              </q-tooltip>
            </q-btn>
          </div>
          <div v-if="recordedVoice !== null"
               v-show="showVoicePlayer"
               class="input-group-prepend">
            <q-btn unelevated
                   color="negative"
                   class="btn  actionBtn"
                   icon="ph:trash"
                   @click="clearMessage">
              <q-tooltip>
                حذف ویس
              </q-tooltip>
            </q-btn>
          </div>
        </div>
        <q-input v-show="canShowTextarea"
                 v-model="newMessage.text"
                 borderless
                 class="newMessageText"
                 autogrow
                 placeholder="متن پیام ..." />
      </div>
      <div v-if="recordedVoice !== null"
           v-show="showVoicePlayer"
           class="audio-wrapper q-pt-lg">
        <audio :src="recordedVoice"
               controls
               class="js-audio audio" />
      </div>
    </q-card>
  </q-no-ssr>
</template>

<script>

import { UserList } from 'src/models/User.js'
import Drawer from 'components/CustomDrawer.vue'
import { CartItemList } from 'src/models/CartItem.js'
import UserOrderList from 'components/Ticket/userOrderList.vue'

export default {
  name: 'SendMessageInput',
  components: {
    Drawer,
    UserOrderList
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
    recordCurrentStatus: false,
    microphoneBtnLoading: false,
    fileInput: null,
    assignTo: null,
    imgURL: '',
    imgBlob: '',
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
    canShowSendBtn () {
      return (this.newMessage.text.length > 0 || this.showVoicePlayer)
    },
    canShowSelectFile () {
      return (this.newMessage.text.length === 0)
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
    },
    userAssignees () {
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
  methods: {
    async onOpenOrderList () {
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
    callGetOrderApi () {
      const userId = this.$store.getters['Auth/user'].id
      return this.$apiGateway.user.ordersById(userId)
    },
    loadFile (event) {
      const { files } = event.target
      if (files && files[0]) {
        this.fileInput = files
        this.emitData(false)
      }
    },
    deleteFile (event) {
      event.stopPropagation()
      this.fileInput = null
    },

    sendData (isPrivate) {
      this.emitData(isPrivate)
      // this.showModalStatus = false
    },

    recordVoice (status) {
      this.recordCurrentStatus = status
      if (this.recordCurrentStatus) {
        this.recordStart()
        return
      }
      this.recordStop()
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
        that.microphoneBtnLoading = true
        that.mediaRecorder.start()

        that.mediaRecorder.onstop = function (e) {
          const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' })
          chunks = []
          that.recordedVoiceBlob = blob
          that.recordedVoice = window.URL.createObjectURL(blob)

          stream.getTracks().forEach(function (track) {
            track.stop()
          })

          that.microphoneBtnLoading = false
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

    recordStop () {
      if (this.mediaRecorder) {
        this.mediaRecorder.stop()
      }
      this.showVoicePlayer = true
      this.showVoiceVisualizer = false
      this.audioPlayerLastPlayedTime = 0
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
        this.imgBlob = files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
          this.imgURL = blob
          this.resultURL = blob
        }
        reader.readAsArrayBuffer(files[0])
      }
    },

    change ({ canvas }) {
      this.resultURL = canvas.toDataURL('image/jpeg', 0.3)
    },

    rotate () {
      // this.$refs.cropper.rotate(this.rotateAngle - this.oldRotateAngle)
      this.oldRotateAngle = this.rotateAngle
    },

    clearMessage () {
      this.newMessage.text = ''
      this.imgURL = null
      this.imgBlob = null
      this.resultURL = ''
      this.showVoicePlayer = false
      this.userPicSelected = false
      this.userPicClipped = false
      this.showModalStatus = false
      this.mediaRecorder = null

      this.recordedVoice = null
      this.recordedVoiceBlob = null
    },

    emitData (isPrivate) {
      this.$emit('creatTicket', {
        isPrivate,
        ...(this.resultURL && { resultURL: this.imgBlob }),
        ...(this.resultURL && { caption: this.newMessageTextInModal }),
        ...(this.newMessage.text && { body: this.newMessage.text }),
        ...(this.recordedVoiceBlob && { voice: this.recordedVoiceBlob }),
        ...(this.fileInput && { file: this.fileInput[0] })
      })
      this.clearMessage()
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

.audio-wrapper {
  margin: 0 0 2rem;
}

.audio {
  width: 100%;

  &::-webkit-media-controls-panel {
    background: white;
  }
}

</style>

<style scoped lang="scss">
@import 'src/css/Theme/spacing';

.imageModal {
  .imageModal-card {
    width: 320px;
  }

  .slider_box {
    display: flex;
    justify-content: center;
    margin: 10px;
    align-items: center;

    @media screen and (width <= 350px) {
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
        transition: 0.2s;
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
    margin-left: 16px;

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

.attach-file {
  border-radius: 0;
}

.msg-input-box {
  padding: 30px;
  border-radius: 15px;
  box-shadow: 2px -4px 10px rgb(255 255 255 / 60%), -2px 4px 10px rgb(46 56 112 / 5%);
}

.SendMessageInput-container {
  display: grid;
  grid-template-columns: auto 1fr;

  @media screen and (width <= 450px) {
    display: block;
  }
}

.SendMessageInput {
  display: flex;
  min-height: 40px;
  margin-right: $space-4;

  .input-group-prepend {
    height: 100%;

    .btn {
      border-radius: 0;
    }
  }

  .btn {
    height: 100%;
    box-shadow: none;
  }

  .input-group-append {
    .btn {
      border-radius: 0;
    }

    &.adminSend {
      display: flex;
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

<template>
  <div class="m-portlet m-portlet--creative m-portlet--bordered-semi ticketMessageItem"
       :class="[messageUserIsCustomer ? 'user' : '', data.is_private ? 'm-portlet--skin-dark m--bg-warning' : '']">
    <div class="m-portlet__head">
      <div class="m-portlet__head-caption">
        <div class="m-portlet__head-title">
          <span class="m-portlet__head-icon m--padding-right-5">
            <i v-if="messageUserIsCustomer"
               class="fa fa-user m--margin-left-5"></i>
            <img v-else
                 src="https://nodes.alaatv.com/upload/favicon.ico">
          </span>
          <h3 class="m-portlet__head-text">

            <span v-if="isAdmin && false"
                  class="btn btn-danger m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill m-btn--air"
                  @click="remove($event)">
              <i class="fa fa-times"></i>
            </span>

            <span v-if="messageUserIsCustomer">
              ماه
              :
              {{data.user.full_name}}
            </span>
            <span v-else>
              {{data.user.role}}
              :
              {{data.user.full_name}}
            </span>
          </h3>
          <h2 class="m-portlet__head-label m-portlet__head-label--accent">
            <img :src="data.user.photo"
                 width="41"
                 height="41">
          </h2>
        </div>
      </div>
      <div class="m-portlet__head-tools">
        <ul class="m-portlet__nav">
          <li class="m-portlet__nav-item"></li>
          <li class="m-portlet__nav-item"></li>
          <li class="m-portlet__nav-item">
            <a href=""
               class="m-portlet__nav-link m-portlet__nav-link--icon"><i class="la la-share-alt-square"></i></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="m-portlet__body">

      <vue-content-loading v-if="data.loading"
                           :width="130"
                           :height="10"
                           :rtl="true"
                           :speed="0.5"
                           :secondary="'#ffd196'"
      >
        <rect x="0"
              y="0"
              rx="4"
              ry="4"
              width="100%"
              height="10" />
      </vue-content-loading>

      <div v-if="data.photo !== null && !data.loading">
        <span v-if="isAdmin && false"
              class="btn btn-danger m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill m-btn--air"
              @click="remove($event, 'photo')">
          <i class="fa fa-times"></i>
        </span>
        <img :src="data.photo"
             class="a--full-width">
      </div>
      <div v-if="data.body !== null && !data.loading">
        <span v-if="isAdmin && false"
              @click="editMode(data)"
              class="btn btn-warning m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill m-btn--air">
          <i class="fa fa-edit"></i>
        </span>

        <span v-if="data.editMode && !data.loading"
              class="btn btn-success m-btn m-btn--icon btn-lg m-btn--icon-only"
              @click="edit(data)">
          <i class="fa fa-check"></i>
        </span>
        <span v-if="data.editMode && !data.loading"
              class="btn btn-danger m-btn m-btn--icon btn-lg m-btn--icon-only"
              @click="cancelEditMode(data)">
          <i class="fa fa-times"></i>
        </span>
        <div v-if="!data.editMode"
             v-html="data.body"
             v-linkified></div>

        <div v-if="data.editMode">
          <div class="form-group m-form__group">
            <textarea class="form-control m-input m-input--air"
                      rows="3"
                      v-model="data.body_buffer"></textarea>
          </div>
        </div>
      </div>
      <div v-if="data.voice !== null && !data.loading"
           class="ticketMessageItem-voice">
        <span v-if="isAdmin && false"
              class="btn btn-danger m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill m-btn--air btnRemoveVoice"
              @click="remove($event, 'voice')">
          <i class="fa fa-times"></i>
        </span>
        <!--                <av-circle class="av-waveform"-->
        <!--                             :audio-src="data.voice"-->
        <!--                             :audio-controls="true"-->
        <!--                ></av-circle>-->

        <av-waveform class="av-waveform"
                     ref="waveform"
                     :audio-src="data.voice"
                     :playtime-font-family="'IRANSans'"
                     :audio-controls="false"
                     :canv-width="1080"
                     :canv-height="64"
        ></av-waveform>

        <button v-if="!showVoicePlayerIsPlaying"
                class="btn btn-success actionBtn"
                @click="playRecordedVoice">
          <i class="fa fa-play"></i>
        </button>
        <button v-else
                class="btn btn-success actionBtn"
                @click="pauseRecordedVoice">
          <i class="fa fa-pause"></i>
        </button>

      </div>
    </div>
    <div class="m-portlet__foot">
      <div class="row">
        <div class="col-md-3">
          <span class="m-badge m-badge--info m-badge--wide m-badge--rounded"
                v-html="data.shamsiDate('created_at').dateTime"></span>
        </div>
        <div class="col-md-9 ReportTicket">

          <div
            v-if="!messageUserIsCustomer"
            :id="'m_accordion_message_' + data.id"
            role="tablist"
            class="m-accordion m-accordion--default m-accordion--solid m-accordion--section  m-accordion--toggle-arrow"
          >
            <!--begin::Item-->
            <div class="m-accordion__item">
              <div class="m-accordion__item-head collapsed"
                   role="tab"
                   :id="'m_accordion_message_' + data.id + '_item_1_head'"
                   data-toggle="collapse"
                   :href="'#m_accordion_message_' + data.id + '_item_1_body'"
                   aria-expanded="false">
                <span class="m-accordion__item-icon"><i class="fa fa-ticket"></i></span>
                <span class="m-accordion__item-title">
                  گزارش پاسخ نامناسب
                  <span v-if="data.report.has_reported === 1"
                        class="m-badge m-badge--warning m-badge--wide m-badge--rounded">
                    پیش از این گزارش ارسال شده
                  </span>
                </span>
                <span class="m-accordion__item-mode"></span>
              </div>
              <div class="m-accordion__item-body collapse"
                   :id="'m_accordion_message_' + data.id + '_item_1_body'"
                   role="tabpanel"
                   :aria-labelledby="'m_accordion_message_' + data.id + '_item_1_head'"
                   :data-parent="'#m_accordion_message_' + data.id"
                   style="">
                <textarea class="form-control m-input m-input--air"
                          rows="2"
                          v-model="data.report.report_description"></textarea>
                <button
                  v-if="loginUserIsCustomer"
                  class="btn m-btn--air btn-warning btn-block btnEditAssignedSupporters"
                  @click="report"
                >
                  ارسال گزارش
                </button>
              </div>
            </div>
            <!--end::Item-->
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueContentLoading } from 'vue-content-loading'
import Assist from '../../util/Assist'
import linkify from 'vue-linkify'

export default {
  name: 'Message',
  props: ['data'],
  data () {
    return {
      showVoicePlayerIsPlaying: false,
      audioPlayerLasrPlayedTime: 0
    }
  },
  directives: {
    linkified: linkify
  },
  components: {
    VueContentLoading
  },
  computed: {
    userData () {
      return this.$store.getters.appProps.userData
    },
    messageUserIsCustomer () {
      return (this.data.user.role === 'کاربر')
    },
    loginUserIsCustomer () {
      return (this.$store.getters.appProps.userData.role === 'کاربر')
    },
    isAdmin () {
      return this.$store.getters.appProps.isAdmin
    }
  },
  methods: {
    loadReport () {

    },
    report () {
      mApp.block('.ReportTicket', {
        type: 'loader',
        state: 'success'
      })
      this.data.sendReport(this.data.report.report_description)
        .then((response) => {
          // this.loadExrtraInfo();
          toastr.success('نظر شما با موفقطت ثبت شد')
          mApp.unblock('.ReportTicket')
        })
        .catch((error) => {
          // this.loadRate(null);
          Assist.handleErrorMessage(error)
          mApp.unblock('.ReportTicket')
        })
    },
    editMode (item) {
      item.buffer()
      item.editMode = true
    },
    cancelEditMode (item) {
      item.editMode = false
    },
    edit (item) {
      item.apply()
      item.loading = true
      item.update()
        .then(function (response) {
          item.editMode = false
          item.loading = false
        })
        .catch(function (error) {
          toastr.error('مشکلی رخ داده است.')
          Assist.handleErrorMessage(error)
          item.revertToOldData()
          item.editMode = false
          item.loading = false
        })
    },
    playRecordedVoice () {
      const audioPlayer = this.$refs.waveform.$el.children[0].children[0],
        that = this
      audioPlayer.src = this.data.voice
      audioPlayer.currentTime = this.audioPlayerLasrPlayedTime
      audioPlayer.onended = function () {
        // console.log('audioPlayer.onended');
        audioPlayer.pause()
        audioPlayer.currentTime = 0
        that.audioPlayerLasrPlayedTime = 0
        that.showVoicePlayerIsPlaying = false
      }
      audioPlayer.play()
      this.showVoicePlayerIsPlaying = true
    },
    pauseRecordedVoice () {
      const audioPlayer = this.$refs.waveform.$el.children[0].children[0]
      audioPlayer.pause()
      this.audioPlayerLasrPlayedTime = audioPlayer.currentTime
      this.showVoicePlayerIsPlaying = false
    },
    remove (event, type) {
      const that = this
      this.data.loading = true
      if (typeof type === 'undefined') {
        this.$emit('delete', this.data)
        return
      }
      this.data.buffer()
      this.data[type] = null
      this.data.update()
        .then(function (response) {
          that.data.apply()
          that.data.loading = false
        })
        .catch(function (error) {
          Assist.handleErrorMessage(error)
          that.data.revertToOldData()
          that.data.loading = false
        })
    }
  },
  created () {
  }
}
</script>

<style>
.ticketMessageItem .av-waveform {
  width: calc( 100% - 76px);
}
</style>

<style scoped>
.m-portlet.m-portlet--creative {
  margin-top: 2rem;
}
.ticketMessageItem-voice {
  position: relative;
  display: flex;
}
.ticketMessageItem-voice .btnRemoveVoice {
  position: absolute;
  top: -10px;
  right: -5px;
}
.ticketMessageItem-voice .btnRemoveVoice {
  position: absolute;
  top: -10px;
  right: -5px;
}
.ticketMessageItem-voice .actionBtn {
  width: 76px;
}
.m-portlet.user.m-portlet--creative .m-portlet__head .m-portlet__head-caption .m-portlet__head-label {
  right: auto;
  left: 0;
}
.m-portlet.user.m-portlet--creative .m-portlet__head .m-portlet__head-caption {
  width: 100%;
  justify-content: flex-end;
  order: 2;
  padding-left: 0;
}
.m-portlet.user.m-portlet--creative .m-portlet__head .m-portlet__head-tools {
  order: 1;
}
.m-portlet.user.m-portlet--creative .m-portlet__head .m-portlet__head-caption .m-portlet__head-title .m-portlet__head-icon {
  order: 2;
}
.m-portlet.user.m-portlet--creative .m-portlet__head .m-portlet__head-caption .m-portlet__head-title .m-portlet__head-text {
  order: 1;
}
.m-portlet.m-portlet--creative .m-portlet__head .m-portlet__head-caption .m-portlet__head-label {
  padding: 0;
}
.m-portlet.m-portlet--creative .m-portlet__head .m-portlet__head-caption .m-portlet__head-label,
.m-portlet.m-portlet--creative .m-portlet__head .m-portlet__head-caption .m-portlet__head-label img {
  border-radius: 100px;
  width: 70px;
  height: 70px;
}
</style>

<template>
  <div class="TicketShow"
       :class="{ 'TicketShow--asAdmin': localOptions.asAdmin, 'TicketShow--isNotAdmin': !localOptions.asAdmin }">
    <div class="TicketShow__breadcrumbs">
      <q-breadcrumbs class="text-grey-9"
                     active-color="grey-6">
        <template v-slot:separator>
          <q-icon size="xs"
                  name="isax:arrow-right-3"
                  color="grey-6" />
        </template>
        <q-breadcrumbs-el to="/"
                          label="صفحه اصلی" />
        <q-breadcrumbs-el :to="{ name: localOptions.asAdmin ? 'Admin.Ticket.Index' : 'UserPanel.Ticket.Index' }"
                          label="تیکت پشتیبانی" />
        <q-breadcrumbs-el>
          <q-skeleton v-if="!ticket.id"
                      type="text"
                      width="100px" />
          <template v-else>
            {{ 'تیکت ' + ticket.id }}
          </template>
        </q-breadcrumbs-el>
      </q-breadcrumbs>
    </div>
    <div class="TicketShow__template row">
      <div v-if="localOptions.asAdmin"
           class="col-lg-2 col-md-3 gt-sm">
        <div ref="MyOpenTickets"
             class="TicketShow__my-open-tickets">
          <my-open-tickets :tickets="pendingTickets"
                           :as-admin="localOptions.asAdmin" />
        </div>
      </div>
      <div class="col-12"
           :class="{ 'col-lg-10 col-md-9': localOptions.asAdmin }">
        <div class="row">
          <div class="col-12">
            <div class="TicketShow__header">
              <ticket-header :ticket="ticket"
                             :statuses="ticketStatusList"
                             :as-admin="localOptions.asAdmin"
                             :priority-list="ticketPriorityList"
                             :department-list="ticketDepartmentList"
                             @update-ticket="onUpdateTicket"
                             @show-ticket-logs="openTicketLogsBottomSheet"
                             @show-tickets="openMyOpenTicketDrawer"
                             @show-info-form="openTicketInfoFormDrawer" />
            </div>
          </div>
          <div class="col-lg-8 col-md-6 col-12">
            <div class="TicketShow__messages">
              <ticket-message-list ref="TicketMessageList"
                                   :ticket="ticket"
                                   :as-admin="localOptions.asAdmin"
                                   :reserved-message-list="reservedMessageList"
                                   :reserved-message-loading="reservedMessageLoading"
                                   @acceptTicket="acceptTicket"
                                   @sendMessage="onSendMessage"
                                   @cancelUpload="onCancelUploadFile" />
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-12 gt-sm">
            <div class="TicketShow__ticket-info">
              <ticket-info-form :ticket="ticket"
                                :as-admin="localOptions.asAdmin"
                                :supporters="supporterList"
                                :statuses="ticketStatusList"
                                :priorities="ticketPriorityList"
                                :departments="ticketDepartmentList"
                                @update-ticket="onUpdateTicket" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 TicketShow__logs-col">
        <div class="TicketShow__logs">
          <ticket-logs :ticket="ticket" />
        </div>
        <q-dialog v-model="bottomSheet"
                  position="bottom">
          <div class="ticket-log-dialog-wrapper">
            <inside-bottom-sheet :header="false"
                                 :action="false"
                                 @close-bottom-sheet="onCloseTicketLogsBottomSheet">
              <template #body>
                <ticket-logs :ticket="ticket" />
              </template>
            </inside-bottom-sheet>
          </div>
        </q-dialog>
      </div>
    </div>
    <q-layout v-if="mounted && $q.screen.lt.md">
      <q-drawer ref="actionDrawer"
                v-model="myOpenTicketDrawer"
                overlay>
        <div class="TicketShow__drawer-my-open-tickets">
          <div class="TicketShow__drawer-my-open-tickets-top-action">
            <q-btn flat
                   square
                   icon="ph:x"
                   class="TicketShow__drawer-my-open-tickets-close-btn"
                   @click="closeMyOpenTicketDrawer" />
          </div>
          <my-open-tickets :tickets="pendingTickets" />
        </div>
      </q-drawer>
      <q-drawer ref="actionDrawer"
                v-model="ticketInfoFormDrawer"
                behavior="mobile"
                side="right"
                overlay>
        <div class="TicketShow__drawer-ticket-info">
          <div class="TicketShow__drawer-ticket-info-top-action">
            <q-btn flat
                   square
                   icon="ph:x"
                   class="TicketShow__drawer-ticket-info-close-btn"
                   @click="closeTicketInfoFormDrawer" />
          </div>
          <ticket-info-form :ticket="ticket"
                            :supporters="supporterList"
                            :statuses="ticketStatusList"
                            :priorities="ticketPriorityList"
                            :departments="ticketDepartmentList"
                            @update-ticket="onUpdateTicket" />
        </div>
      </q-drawer>
    </q-layout>
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { SupporterList } from 'src/models/Supporter.js'
import { TicketLogList } from 'src/models/TicketLog.js'
import { Ticket, TicketList } from 'src/models/Ticket.js'
import { TicketMessage } from 'src/models/TicketMessage.js'
import { TicketStatusList } from 'src/models/TicketStatus.js'
import { TicketPriorityList } from 'src/models/TicketPriority.js'
import { TicketDepartmentList } from 'src/models/TicketDepartment.js'
import TicketLogs from 'src/components/Ticket/TicketLogs/TicketLogs.vue'
import InsideBottomSheet from 'src/components/Utils/InsideBottomSheet.vue'
import TicketHeader from 'src/components/Ticket/TicketHeader/TicketHeader.vue'
import MyOpenTickets from 'src/components/Ticket/MyOpenTickets/MyOpenTickets.vue'
import TicketInfoForm from 'src/components/Ticket/TicketInfoForm/TicketInfoForm.vue'
import TicketMessageList from 'src/components/Ticket/TicketMessageList/TicketMessageList.vue'

export default {
  name: 'TicketShow',
  components: {
    TicketLogs,
    TicketHeader,
    MyOpenTickets,
    TicketInfoForm,
    InsideBottomSheet,
    TicketMessageList
  },
  mixins: [mixinWidget],
  props: {
    options: {
      type: Object,
      default () {
        return {
          indexRouteName: ''
        }
      }
    }
  },
  data () {
    return {
      mounted: false,
      bottomSheet: false,
      myOpenTicketDrawer: false,
      ticketInfoFormDrawer: false,
      defaultOptions: {
        asAdmin: false
      },
      reservedMessageList: [],
      reservedMessageLoading: false,
      ticket: new Ticket(),
      otherTickets: new TicketList(),
      ticketLogs: new TicketLogList(),
      pendingTickets: new TicketList(),
      supporterList: new SupporterList(),
      ticketStatusList: new TicketStatusList(),
      ticketPriorityList: new TicketPriorityList(),
      ticketDepartmentList: new TicketDepartmentList()
    }
  },
  computed: {
    ticketId () {
      if (typeof this.localOptions.ticketId !== 'undefined' && this.localOptions.ticketId !== null) {
        return this.localOptions.ticketId
      }
      if (this.localOptions.urlParam && this.$route.params[this.localOptions.urlParam]) {
        return this.$route.params[this.localOptions.urlParam]
      }
      if (this.$route.params.id) {
        return this.$route.params.id
      }
      return this.ticket.id
    }
  },
  mounted () {
    this.loadData()
    this.mounted = true
  },
  methods: {
    loadData () {
      this.getTicket()
      this.getNeededDataForTicket()
      this.getSupporterList()
      if (this.localOptions.asAdmin) {
        this.getPendingTickets()
        this.getReservedMessage()
      }
    },
    openMyOpenTicketDrawer () {
      this.myOpenTicketDrawer = true
    },
    openTicketInfoFormDrawer () {
      this.ticketInfoFormDrawer = true
    },
    closeMyOpenTicketDrawer () {
      this.myOpenTicketDrawer = false
    },
    closeTicketInfoFormDrawer () {
      this.ticketInfoFormDrawer = false
    },
    openTicketLogsBottomSheet () {
      this.bottomSheet = true
    },
    onCloseTicketLogsBottomSheet () {
      this.bottomSheet = false
    },
    getTicket () {
      this.ticket.loading = true
      APIGateway.ticket.getTicket(this.ticketId)
        .then((ticket) => {
          this.ticket = new Ticket(ticket)
        })
        .catch(() => {
          this.ticket.loading = false
        })
    },
    getSupporterList () {
      this.supporterList.loading = true
      APIGateway.ticket.getSupporterList()
        .then((supporterList) => {
          this.supporterList.loading = false
          this.supporterList = new SupporterList(supporterList)
        })
        .catch(() => {
          this.supporterList.loading = false
        })
    },
    getReservedMessage () {
      this.reservedMessageLoading = true
      APIGateway.ticket.getReservedMessage()
        .then((reservedMessageList) => {
          this.reservedMessageList = reservedMessageList
          this.reservedMessageLoading = false
        })
        .catch(() => {
          this.reservedMessageLoading = false
        })
    },
    getPendingTickets () {
      this.pendingTickets.loading = true
      APIGateway.ticket.getPendingTickets()
        .then((ticketList) => {
          this.pendingTickets.loading = false
          this.pendingTickets = new TicketList(ticketList)
        })
        .catch(() => {
          this.pendingTickets.loading = false
        })
    },
    getTicketsLogs () {
      this.ticketLogs.loading = true
      APIGateway.ticket.getTicketsLogs(this.ticketId)
        .then((ticketLogList) => {
          this.ticketLogs.loading = false
          this.ticketLogs = new TicketLogList(ticketLogList)
        })
        .catch(() => {
          this.ticketLogs.loading = false
        })
    },
    getNeededDataForTicket () {
      this.ticketStatusList.loading = true
      this.ticketPriorityList.loading = true
      this.ticketDepartmentList.loading = true
      APIGateway.ticket.getNeededDataToCreateTicket()
        .then(({ departments, priorities, statuses }) => {
          this.ticketStatusList = new TicketStatusList(statuses)
          this.ticketPriorityList = new TicketPriorityList(priorities)
          this.ticketDepartmentList = new TicketDepartmentList(departments)
        })
        .catch(() => {
          this.ticketStatusList.loading = false
          this.ticketPriorityList.loading = false
          this.ticketDepartmentList.loading = false
        })
    },
    sendTicketMessage (ticketMessage) {
      return new Promise((resolve, reject) => {
        ticketMessage.body = ticketMessage.body ? ticketMessage.body.replace(/\r?\n/g, '<br/>') : ''
        this.ticket.loading = true
        APIGateway.ticket.sendTicketMessage(ticketMessage)
          .then((ticketMessage) => {
            this.ticket.loading = false
            this.addMessageToMessageList(new TicketMessage(ticketMessage))
            this.scrollToLastMessage()
            resolve(ticketMessage)
          })
          .catch((e) => {
            this.ticket.loading = false
            reject(e)
          })
      })
    },
    addMessageToMessageList (message) {
      // this.ticket.messages.list.push(message)
      this.ticket.messages.list.unshift(message)
    },
    prepareFilesForSendMessages (data) {
      const allFilesPresignedUrlPromises = this.getAllFilesPresignedUrlPromises(data.files)
      return this.getUploadAllFilesPromises(allFilesPresignedUrlPromises)
    },
    onSendMessage (data) {
      if (Array.isArray(data.files) && data.files.length === 0) {
        data.ticket_id = this.ticketId
        this.sendTicketMessage(data)
          .then(() => {
            this.scrollToLastMessage()
          })
          .catch(() => {})
        return
      }

      const sendingMessage = this.createSendingMessage(data.body, data.files.map(file => {
        file.progress = 0
        return file
      }))
      this.prepareFilesForSendMessages(data)
        .then((uploadAllFilesPromises) => {
          Promise.all(uploadAllFilesPromises)
            .then((resolvedItems) => {
              // resolvedItem = { file, uploadedPath, presignedUrl, response }
              this.sendTicketMessage({
                body: data.body,
                ticket_id: this.ticketId,
                is_private: data.is_private,
                files: resolvedItems.map(item => item.uploadedFileName)
              })
                .then(() => {
                  this.deleteMessage(sendingMessage.id)
                  this.scrollToLastMessage()
                })
                .catch(() => {
                  this.deleteMessage(sendingMessage.id)
                })
            })
            .catch(() => {
              this.deleteMessage(sendingMessage.id)
            })
        })
        .catch(() => {
          this.deleteMessage(sendingMessage.id)
        })
    },
    deleteMessage (messageId) {
      const targetIndex = this.ticket.messages.list.findIndex(message => message.id === messageId)
      if (targetIndex === -1) {
        return
      }

      this.ticket.messages.list.splice(targetIndex, 1)
    },
    onCancelUploadFile (data) {
      const oldSendingMessage = this.ticket.messages.list[data.messageIndex]
      oldSendingMessage.files[data.fileIndex].progress = 25
      this.deleteMessage(oldSendingMessage.id)
      this.createSendingMessage(oldSendingMessage.body, oldSendingMessage.files)
    },
    createSendingMessage (body, files) {
      const message = new TicketMessage({
        id: 'temp-message-' + Date.now(),
        body,
        files
      })
      message.showAsSent = true
      this.addMessageToMessageList(message)

      return message
    },
    getAllFilesPresignedUrlPromises (files) {
      const promises = []
      files.forEach((file) => {
        promises.push(new Promise((resolve, reject) => {
          APIGateway.ticket.presignedUrl(file.name)
            .then(({ url, uploadedFileName }) => {
              resolve({
                file,
                presignedUrl: url,
                uploadedFileName
              })
            })
            .catch(() => {
              reject({
                file
              })
            })
        }))
      })

      return promises
    },
    getUploadAllFilesPromises (presignedUrlPromises) {
      return new Promise((resolve, reject) => {
        const promises = []
        Promise.all(presignedUrlPromises)
          .then((resolves) => {
            resolves.forEach((resolveItem) => {
              promises.push(new Promise((resolve, reject) => {
                APIGateway.fileUpload.uploadFile(resolveItem.presignedUrl, resolveItem.file, (data) => {
                  // console.log('onUploadProgress data', data)
                  // console.log('progress: ', data.progress) // in range [0..1]
                  // {
                  //   loaded, // number,
                  //     total, // number,
                  //     progress, // number, // in range [0..1]
                  //     bytes, // number, // how many bytes have been transferred since the last trigger (delta)
                  //     estimated, // number; // estimated time in seconds
                  //     rate, // number; // upload speed in bytes
                  //     upload // true; // upload sign
                  // }
                  // https://www.npmjs.com/package/axios#-progress-capturing
                })
                  .then((response) => {
                    resolve({
                      response,
                      file: resolveItem.file,
                      presignedUrl: resolveItem.presignedUrl,
                      uploadedFileName: resolveItem.uploadedFileName,
                      uploadedPath: resolveItem.presignedUrl.split('?')[0]
                    })
                  })
                  .catch((error) => {
                    reject({
                      error,
                      file: resolveItem.file,
                      presignedUrl: resolveItem.presignedUrl
                    })
                  })
              }))
            })
            resolve(promises)
          })
          .catch((e) => {
            reject(e)
          })
      })
    },
    scrollToLastMessage () {
      if (!this.$refs.TicketMessageList) {
        return
      }

      this.$nextTick(() => {
        this.$refs.TicketMessageList.scrollToBottom()
      })
    },
    onUpdateTicket () {
      this.getTicket()
      this.getPendingTickets()
    },
    acceptTicket () {
      this.ticket.loading = true
      APIGateway.ticket.acceptTicket(this.ticketId)
        .then(() => {
          this.getTicket()
        })
        .catch(() => {
          this.getTicket()
        })
    }
  }
}
</script>

<style scoped lang="scss">
.TicketShow {
  .TicketShow__breadcrumbs {
    margin-bottom: $space-6;
  }
  .TicketShow__template {
    /* 1440 < page < 1920 */
    @include media-max-width('xl') {
    }
    /* 1024 < page < 1440 */
    @include media-max-width('lg') {
    }
    /* 600 < page < 1024 */
    @include media-max-width('md') {
    }
    /* 360 < page < 600 */
    @include media-max-width('sm') {
    }
    .TicketShow__header {
      display: flex;
      padding: $space-3 $space-4;
      justify-content: space-between;
      width: 100%;
      align-items: center;
      align-self: stretch;
      border-bottom: 1px solid $blue-grey-3;
      border-radius: $radius-none $radius-4 $radius-none $radius-none;
      background: $grey-1;
      /* 600 < page < 1024 */
      @include media-max-width('md') {
        border-radius: $radius-none !important;
      }
    }
    .TicketShow__my-open-tickets {
      display: flex;
      height: 100%;
      padding: $space-5 $space-3;
      flex-direction: column;
      align-items: center;
      align-self: stretch;
      border-radius: $radius-4 $radius-none $radius-none $radius-4;
      border-right: 1px solid $blue-grey-3;
      background: $grey-1;
    }
    .TicketShow__ticket-info {
      display: flex;
      height: 100%;
      padding: $space-6;
      flex-direction: column;
      align-items: center;
      gap: $space-5;
      align-self: stretch;
      background: $grey-1;
      border-left: 1px solid $blue-grey-3;
      border-radius: $radius-none $radius-none $radius-4 $radius-none;
    }
    .TicketShow__messages {
      height: 100%;
      min-height: 100%;
      max-height: calc( 100vh - 300px);
      /* 600 < page < 1024 */
      @include media-max-width('md') {
        min-height: calc( 100vh - 500px);
        max-height: calc( 100vh - 350px);
      }
    }
  }
  .TicketShow__drawer-my-open-tickets {
    height: 100%;
    background: $grey-1;
    padding: $space-5;
    .TicketShow__drawer-my-open-tickets-top-action {
      display: flex;
      justify-content: flex-start;
      margin-bottom: $space-4;
    }
  }

  &__logs-col {
    margin-top: $space-6;
  }

  &__logs {
    padding: $space-6;
    border-radius: $radius-4;
    background: $grey-1;

    @include media-max-width ('md') {
      display: none;
    }
  }
  .TicketShow__drawer-ticket-info {
    height: 100%;
    background: $grey-1;
    padding: $space-5;
    .TicketShow__drawer-ticket-info-top-action {
      display: flex;
      justify-content: flex-start;
      margin-bottom: $space-4;
    }
  }
  &:deep(.q-layout) {
    min-height: 0 !important;
  }
  &.TicketShow--isNotAdmin {
    .TicketShow__template {
      .TicketShow__header {
        display: flex;
        padding: $space-3 $space-4;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        align-self: stretch;
        border-bottom: 1px solid $blue-grey-3;
        border-radius: $radius-4 $radius-4 $radius-none $radius-none;
        background: $grey-1;
        /* 600 < page < 1024 */
        @include media-max-width('md') {
          border-radius: $radius-none !important;
        }
      }
      .TicketShow__messages {
        //background-color: $grey-1;
        //padding-left: $space-6;
        border-left: 1px solid $grey-4;
        border-bottom-left-radius: $radius-4;
      }
    }
  }
}
</style>

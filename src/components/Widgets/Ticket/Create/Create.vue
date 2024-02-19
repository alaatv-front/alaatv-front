<template>
  <div class="ticket-create">
    <entity-create v-if="mounted"
                   ref="EntityCreate"
                   v-model:value="inputs"
                   :title="selectedDepartment.title"
                   :api="api"
                   entity-id-key-in-response="id"
                   show-route-param-key="id"
                   :index-route-name="options.indexRouteName"
                   :show-route-name="options.showRouteName"
                   :show-expand-button="false"
                   :show-save-button="false">
      <template #before-form-builder>
        <q-dialog v-model="showDialog"
                  no-backdrop-dismiss>
          <div>
            <q-card>
              <q-card-section class="flex justify-between items-center">
                <div>
                  لیست بخش ها
                </div>
                <q-btn v-close-popup
                       color="grey"
                       flat
                       round
                       icon="close"
                       text
                       @click="goBackToList" />
              </q-card-section>
              <q-card-section>
                <div class="row q-col-gutter-md">
                  <div v-for="department in departmentList.list"
                       :key="department.id"
                       class="col-6">
                    <q-btn v-close-popup
                           color="grey"
                           outline
                           icon="ph:office-chair"
                           class="full-width"
                           :label="department.title"
                           @click="selectDepartment(department)" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-dialog>
      </template>
    </entity-create>
    <q-separator class="q-my-md" />
    <ticket-send-message-input v-if="mounted"
                               :loading="ticket.loading"
                               :reserved-message-list="reservedMessageList"
                               :reserved-message-loading="reservedMessageLoading"
                               @sendMessage="onSendMessage" />
  </div>
</template>

<script>
import { EntityCreate } from 'quasar-crud'
import { Ticket } from 'src/models/Ticket.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { FormBuilderAssist } from 'quasar-form-builder'
import { mixinTicket, mixinWidget } from 'src/mixin/Mixins.js'
import { TicketDepartment } from 'src/models/TicketDepartment.js'
import TicketSendMessageInput from 'src/components/Ticket/TicketSendMessageInput/TicketSendMessageInput.vue'

export default {
  name: 'TicketCreate',
  components: {
    EntityCreate,
    TicketSendMessageInput
  },
  mixins: [mixinTicket, mixinWidget],
  props: {
    options: {
      type: Object,
      default () {
        return {
          showRouteName: '',
          indexRouteName: ''
        }
      }
    }
  },
  data () {
    return {
      mounted: false,
      showDialog: true,
      ticket: new Ticket(),
      reservedMessageList: [],
      reservedMessageLoading: false,
      api: APIGateway.ticket.APIAdresses.base,
      selectedDepartment: new TicketDepartment(),
      inputs: [
        {
          type: 'input',
          name: 'title',
          responseKey: 'data.title',
          value: '',
          label: 'عنوان',
          col: 'col-sm-6 col-xs-12'
        },
        {
          type: 'toggleButton',
          name: 'priority_id',
          responseKey: 'data.priority',
          label: 'اولویت',
          value: '',
          options: this.getPriorityOption(),
          toggleColor: 'blue',
          textColor: 'black',
          toggleTextColor: 'white',
          col: 'col-sm-6 col-xs-12',
          size: '14px'
        }
      ],
      defaultOptions: {
        asAdmin: false
      },
      userRole: '',
      canAssignTicket: false
    }
  },
  computed: {
    canChoseOrder () {
      return [2].includes(this.selectedDepartment.id)
    },
    getRoutingObject () {
      if (this.$route.name.includes('Admin')) {
        return { name: 'Admin.Ticket.Index' }
      }
      return { name: 'UserPanel.Ticket' }
    }
  },
  created () {
    this.initPageData()
  },
  mounted () {
    this.getReservedMessage()
  },
  methods: {
    onSendMessage (data) {
      this.ticket.loading = true
      const title = FormBuilderAssist.getInputsByName(this.inputs, 'title').value
      const priorityId = FormBuilderAssist.getInputsByName(this.inputs, 'priority_id').value

      APIGateway.ticket.creatTicket({
        body: '1',
        title,
        is_private: false,
        priority_id: priorityId,
        department_id: this.selectedDepartment.id
      })
        .then((ticket) => {
          const ticketId = ticket.id
          if (Array.isArray(data.files) && data.files.length === 0) {
            data.ticket_id = ticketId
            this.sendTicketMessage(data)
              .then(() => {
                this.goToShowTicket(ticketId)
              })
              .catch(() => {
                this.ticket.loading = false
              })
            return
          }

          this.prepareFilesForSendMessages(data)
            .then((uploadAllFilesPromises) => {
              Promise.all(uploadAllFilesPromises)
                .then((resolvedItems) => {
                  // resolvedItem = { file, uploadedPath, presignedUrl, response }
                  this.sendTicketMessage({
                    body: data.body,
                    ticket_id: ticketId,
                    files: resolvedItems.map(item => item.uploadedFileName)
                  }, ticketId)
                    .then(() => {
                      this.goToShowTicket(ticketId)
                    })
                    .catch(() => {
                      this.ticket.loading = false
                    })
                })
                .catch(() => {
                  this.ticket.loading = false
                })
            })
            .catch(() => {
              this.ticket.loading = false
            })
        })
        .catch(() => {
          this.ticket.loading = false
        })
    },
    prepareFilesForSendMessages (data) {
      const allFilesPresignedUrlPromises = this.getAllFilesPresignedUrlPromises(data.files)
      return this.getUploadAllFilesPromises(allFilesPresignedUrlPromises)
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
    sendTicketMessage (ticketMessage) {
      return new Promise((resolve, reject) => {
        ticketMessage.body = ticketMessage.body ? ticketMessage.body.replace(/\r?\n/g, '<br/>') : ''
        this.ticket.loading = true
        APIGateway.ticket.sendTicketMessage(ticketMessage)
          .then((ticketMessage) => {
            this.ticket.loading = false
            resolve(ticketMessage)
          })
          .catch((e) => {
            this.ticket.loading = false
            reject(e)
          })
      })
    },
    goToShowTicket (ticketId) {
      this.$router.push({ name: this.localOptions.asAdmin ? 'Admin.Ticket.Show' : 'UserPanel.Ticket.Show', params: { id: ticketId } })
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
    afterGetAllPageData () {
      this.mounted = true
      this.$nextTick(() => {
        this.checkQueryParams()
      })
    },
    async initTicket () {
      await this.setInputs()
    },
    async setInputs () {
      const ticketFields = await this.getTicketData()
      this.departmentList.list = ticketFields.departments.list
      this.getInput('priority_id').options = ticketFields.priorities.list.map(item => {
        return {
          label: item.title,
          value: item.id
        }
      })
    },
    checkQueryParams () {
      const title = this.$route.query.t
      const message = this.$route.query.m
      const priorityId = this.$route.query.p
      const departmentId = this.$route.query.d
      const targetDepartmentIndex = this.departmentList.list.findIndex(dep => parseInt(dep.id) === parseInt(departmentId))
      if (targetDepartmentIndex !== -1) {
        this.selectDepartment(this.departmentList.list[targetDepartmentIndex])
        this.showDialog = false
        this.$refs.EntityCreate.setInputByName('title', title)
      }

      if (title) {
        this.$refs.EntityCreate.setInputByName('title', title)
      }

      if (message) {
        this.$refs.SendMessageInput.newMessage.text = message
      }

      if (priorityId) {
        this.$refs.EntityCreate.setInputByName('priority_id', parseInt(priorityId))
      }
    },
    goBackToList () {
      const ticketRouteObj = { name: 'Admin.Ticket.Index' }
      if (this.$route.name.includes('Admin')) {
        this.$router.push(ticketRouteObj)
        return
      }
      ticketRouteObj.name = 'UserPanel.Ticket.Index'
      this.$router.push(ticketRouteObj)
    },
    initPageData () {
      this.setRoleAndPermissions()
    },
    setRoleAndPermissions () {
      this.userRole = 'user'
      this.canAssignTicket = false
    },
    selectDepartment (department) {
      this.selectedDepartment = department
    }
  }
}
</script>

<style scoped lang="scss">
.ticket-create {
  margin: 30px;
  position: relative;
}

:deep(.form-builder-separator-col) {
  display: flex;
  align-items: center;
}

:deep(.q-btn-group) {
  box-shadow: none;
}
</style>

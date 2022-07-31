<template>
  <entity-create
    ref="EntityCreate"
    v-model:value="inputs"
    :title=this.depart.title
    :api="api"
    :entity-id-key-in-response="entityIdKeyInResponse"
    :show-route-param-key="showRouteParamKey"
    :index-route-name="indexRouteName"
    :show-route-name="showRouteName"
  >
    <template #before-form-builder>
      <div
        v-if="beforeFormBuilder"
      >
        <q-dialog
          no-backdrop-dismiss
          v-model="showDialog"
        >
          <q-card
            class="flex justify-center">
            <div v-for="(item, index) in departments"
                 :key="index"
                 @click="selectDepartment(item)"
                 class="departmentForSelect col-2 q-my-md ">
              <q-btn
                flat
                class="departmentActionBtn"
                icon="isax:search-status .path4:before"
              />
              <div class="departmentTitle flex justify-center"
                   v-html="item.title"></div>
            </div>
          </q-card>

        </q-dialog>
      </div>
    </template>
  </entity-create>
  <q-separator class="q-my-md" />
  <div>
    <SendMessageInput
      ref="SendMessageInput"
      :send-loading="sendLoading"
      @sendText="sendText"
      @sendImage="sendImage"
      @sendVoice="sendVoice"
    />
  </div>

</template>

<script>
import SendMessageInput from 'components/SendMessageInput'
import { EntityCreate } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses'
import { TicketMessage } from 'src/models/TicketMessage'

export default {
  name: 'Create',
  components: {
    EntityCreate,
    SendMessageInput
  },
  data () {
    return {
      canPost: true,
      sendLoading: null,
      showDialog: true,
      expanded: true,
      api: API_ADDRESS.ticket.create.base,
      entityIdKeyInResponse: 'id',
      showRouteParamKey: 'id',
      showRouteName: 'Admin.Ticket.Show',
      indexRouteName: 'Admin.Ticket.Index',
      depart: [],
      departments: [
        {
          id: '1',
          title: 'مالی'
        }, {
          id: '2',
          title: 'استخدام'
        }, {
          id: '3',
          title: 'ابریشم'
        }, {
          id: '4',
          title: 'پرچم'
        }, {
          id: '5',
          title: 'تفتان'
        }, {
          id: '6',
          title: 'فنی'
        }, {
          id: '7',
          title: 'آموزش'
        }, {
          id: '8',
          title: 'مشاوره خرید'
        }
      ],
      inputs: [
        {
          type: 'input',
          name: 'title',
          responseKey: 'data.title',
          value: '',
          label: 'عنوان',
          col: 'col-md-6'
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-6',
          value: [
            {
              type: 'separator',
              label: 'اولویت:',
              vertical: 'false',
              col: 'col-md-1'
            },
            {
              type: 'toggleButton',
              name: 'priority_id',
              responseKey: 'data.priority',
              options: [
                {
                  label: 'کم',
                  value: '1'
                },
                {
                  label: 'متوسط',
                  value: '2'
                },
                {
                  label: 'فوری',
                  value: '3'
                },
                {
                  label: 'بحرانی',
                  value: '4'
                }
              ],
              toggleColor: 'blue',
              textColor: 'black',
              toggleTextColor: 'white',
              col: 'col-md-4',
              size: '22px'
            }

          ]

        },
        {
          name: 'department_id',
          type: 'hidden',
          value: 0
        },
        {
          name: 'photo',
          type: 'hidden',
          value: ''
        },
        {
          name: 'body',
          type: 'hidden',
          value: ''
        },
        {
          name: 'voice',
          type: 'hidden',
          value: ''
        },
        {
          name: 'is_private',
          type: 'hidden',
          value: 0
        }

      ],
      beforeFormBuilder: true,
      afterFormBuilder: true
    }
  },
  created () {
  },
  watch: {
    sendLoading: {
      handler (newVal) {
        console.log(newVal)
      }
    }
  },

  methods: {
    showMessagesInNotify (message, type) {
      if (!type) {
        type = 'negative'
      }
      this.$q.notify({
        type,
        message
      })
    },
    checkValues () {
      this.$refs.EntityCreate.getValues().forEach(item => {
        if (item.type === 'toggleButton' && !item.value) {
          this.showMessagesInNotify('<اولویت> پیام خود را انتخاب کنید')
          this.canPost = false
          this.sendLoading = false
        } else {
          this.canPost = true
          this.sendLoading = false
        }
      })
      if (!!this.inputs[0].value === false) {
        this.showMessagesInNotify('پر کردن فیلد <عنوان> ضروری میباشد')
        this.canPost = false
        this.sendLoading = false
      } else {
        this.canPost = true
      }
    },
    sendMessage (data) {
      this.sendLoading = data.loading
      this.checkValues()

      const formData = new FormData()
      if (data.photo) {
        formData.append('photo', data.photo, 'photo.jpeg')
      }

      // this.$refs.EntityCreate.getValues().forEach(input => {
      //   if (input.name === 'body') {
      //     input.value = data.body
      if (data.body) {
        formData.append('body', data.body.replace(/\r?\n/g, '<br/>'))
      }

      if (data.voice) {
        formData.append('voice', data.voice, 'voice.ogg')
      }

      if (data.isPrivate) {
        formData.append('is_private', 1)
      }

      const newTicket = new TicketMessage()
      if (this.canPost) {
        newTicket.create(formData, this.api)
        this.sendLoading = false
      }

      // if (this.canPost) {
      //   this.sendLoading = false
      //   this.$refs.EntityCreate.createEntity(formData)
      // }
    },

    sendText (data) {
      this.sendMessage({
        body: data.body,
        isPrivate: data.isPrivate,
        loading: data.loading
      })
    },
    sendImage (data) {
      console.log(data)
      this.sendMessage({
        body: data.caption,
        isPrivate: data.isPrivate,
        photo: this.createBlob(data.resultURL),
        loading: data.loading

      })
      console.log(data)
    },
    sendVoice (data) {
      this.sendMessage({
        voice: data.voice,
        isPrivate: data.isPrivate,
        loading: data.loading

      })
    },
    createBlob (dataURL) {
      const BASE64_MARKER = ';base64,'
      if (dataURL.indexOf(BASE64_MARKER) === -1) {
        const parts = dataURL.split(',')
        const contentType = parts[0].split(':')[1]
        const raw = decodeURIComponent(parts[1])
        return new Blob([raw], { type: contentType })
      }
      const parts = dataURL.split(BASE64_MARKER)
      const contentType = parts[0].split(':')[1]
      const raw = window.atob(parts[1])
      const rawLength = raw.length

      const uInt8Array = new Uint8Array(rawLength)

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i)
      }

      return new Blob([uInt8Array], { type: contentType })
    },
    selectDepartment (item) {
      this.depart = item
      this.$refs.EntityCreate.getValues().forEach(input => {
        if (input.name === 'department_id') {
          input.value = this.depart.id
        }
      })
      this.showDialog = false
    }
  }
}
</script>

<style scoped lang="scss">

:deep(.departmentForSelect) {
  cursor: pointer;
  border-radius: 0;

  &:hover {
    background-color: var(--alaa-Primary);
    color: white;
  }

  .departmentActionBtn {
    border-radius: 0;
    width: 100px;
    height: 100px;
    padding: 0;

    .q-focus-helper {
      display: none;
    }
  }

}

:deep(.form-builder-separator-col) {
  display: flex;
  align-items: center;
}

:deep(.q-btn-group) {
  box-shadow: none;

  .q-btn-item:last-child {
  }
}

</style>

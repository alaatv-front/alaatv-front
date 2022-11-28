import API_ADDRESS from 'src/api/Addresses'

const mixinTicket = {
  computed: {
    isAdmin() {
      // return this.$store.getters['Auth/user'].has_admin_permission
      return true
    }
  },
  /// api/v2/ticketMessage/193722/report
  //	/api/v2/ticket/65009/rate => تیکت با موفقیت امتیازدهی شد
  data: () => ({
    sendLoading: false
  }),
  created() {
  //  this.getDepartments()
  //  this.setRoleAndPermissions()
  },

  methods: {
    sendTicket (data, isMsg) {
      if (!isMsg && !this.hasRequiredField()) {
        return
      }
      const formData = this.setTicketFormData(data, isMsg)
      isMsg ? this.sendTicketMsg(formData) : this.sendCreateTicketReq(formData)
    },
    sendTicketMessage(data) {
      console.log('data', data)
      this.sendTicket(data, true)
    },

    async sendCreateTicketReq (formData) {
      this.sendLoading = true
      try {
        const response = await this.callCreatTicketApi(formData)
        if (this.$refs.SendMessageInput) {
          this.$refs.SendMessageInput.clearMessage()
        }
        this.showMessagesInNotify(['تیکت شما با موفقیت ایجاد شد'], 'positive')
        this.sendLoading = false
        await this.$router.push({
          name: 'Admin.Ticket.Show',
          params: { id: response.data.data.id }
        })
      } catch (e) {
        this.sendLoading = false
      }
    },

    async sendTicketMsg(formData) {
      this.sendLoading = true
      try {
        const response = await this.callSendTicketMsgApi(formData)
        this.userMessageArray.unshift(response.data.data.ticketMessage)
        if (this.$refs.SendMessageInput) {
          this.$refs.SendMessageInput.clearMessage()
        }
        this.showMessagesInNotify(['پیام شما با موفقیت ایجاد شد'], 'positive')
        this.sendLoading = false
      } catch (e) {
        console.log(e)
        this.sendLoading = false
      }
    },

    callCreatTicketApi (formData) {
      return this.$axios.post(API_ADDRESS.ticket.create.base, formData)
    },

    callSendTicketMsgApi(formData) {
      return this.$axios.post(API_ADDRESS.ticket.show.ticketMessage, formData)
    },

    setTicketFormData (data, isMsg) {
      const formData = new FormData()

      if (data.resultURL) {
        formData.append('photo', this.createBlob(data.resultURL))
        formData.append('body', data.caption)
      }

      if (data.body) {
        formData.append('body', data.body.replace(/\r?\n/g, '<br/>'))
      }

      if (data.voice) {
        formData.append('voice', data.voice, 'voice.ogg')
      }

      if (data.file) {
        formData.append('file', data.file)
        formData.append('body', '-')
      }

      if (data.isPrivate) {
        formData.append('is_private', 1)
      }
      if (isMsg) {
        formData.append('ticket_id', this.searchForInputVal('id'))
        return formData
      }
      console.log('after is messs')

      formData.append('department_id', this.selectedDepartment.id)

      formData.append('title', this.getInputsValue('title'))

      const priorityId = this.getInputsValue('priority_id')
      formData.append('priority_id', priorityId)

      return formData
    },

    hasRequiredField () {
      const errorMessages = []
      if (!this.getInputsValue('title')) {
        errorMessages.push('پر کردن فیلد عنوان ضروری میباشد')
      }
      const priorityId = this.getInputsValue('priority_id')
      if (!priorityId) {
        errorMessages.push('اولویت پیام خود را انتخاب کنید')
      }
      this.showMessagesInNotify(errorMessages)
      return !errorMessages.length > 0
    },

    getInputsValue (inputName) {
      return this.getInput(inputName).value
    },
    getInput(inputName) {
      console.log('getInput', inputName, this.inputs)
      console.log('reaaa', this.inputs.find(input => input.name === inputName))
      return this.inputs.find(input => input.name === inputName)
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
    showMessagesInNotify (messages, type) {
      messages.forEach((message) => {
        this.$q.notify({
          type: type || 'negative',
          message
        })
      })
    }
  }
}

export default mixinTicket

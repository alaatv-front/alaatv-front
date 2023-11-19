import { TicketDepartmentList } from 'src/models/TicketDepartment'
import { User } from 'src/models/User'
import { APIGateway } from 'src/api/APIGateway'
import { TicketPriorityList } from 'src/models/TicketPriority'
import { TicketStatusList } from 'src/models/TicketStatus'

const mixinTicket = {
  data: () => ({
    loading: false,
    sendLoading: false,
    departmentList: new TicketDepartmentList(),
    ticketStatusList: new TicketStatusList(),
    ticketPriorityList: new TicketPriorityList(),
    ticketStatuses: [],
    ticketPriorityOption: []
  }),
  computed: {
    isInAdminPage () {
      return !!this.$route.name.includes('Admin')
    }
  },
  mounted () {
    this.setUpTicket()
  },
  methods: {
    async setUpTicket () {
      await this.initTicket()
      await this.setPageData()
      await this.afterGetAllPageData()
    },
    async initTicket () {
      // here goes the custom methods developer chooses to run before mixin
    },
    async afterGetAllPageData () {
      // here goes the custom methods developer chooses to run after get all page data
    },
    async setPageData () {
      // this.setRoleAndPermissions()
      this.loading = true
      this.getTicketData()
        .then((ticketFields) => {
          this.ticketStatusList = new TicketStatusList(ticketFields.statuses)
          this.departmentList = new TicketDepartmentList(ticketFields.departments)
          this.ticketPriorityList = new TicketPriorityList(ticketFields.priorities)

          this.ticketStatuses = this.ticketStatusList.list
          this.ticketPriorityOption = this.ticketPriorityList.list

          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })

      // try {
      //   await Promise.all([this.setDepartments(), this.setStatuses(), this.setPriorityOption()])
      //   this.loading = false
      // } catch {
      //   this.loading = false
      // }
    },

    async setStatuses () {
      this.ticketStatuses = this.getStatuses()
    },

    async setDepartments () {
      const list = await this.getDepartments()
      this.departmentList = new TicketDepartmentList(list)
    },

    async setPriorityOption () {
      this.ticketPriorityOption = this.getPriorityOption()
    },

    getStatuses () {
      return [
        {
          title: 'پاسخ داده نشده',
          id: 1
        },
        {
          title: 'در حال بررسی',
          id: 2
        },
        {
          title: 'پاسخ داده شده',
          id: 3
        },
        {
          title: 'بسته شده',
          id: 4
        }
      ]
    },

    getPriorityOption () {
      return [{
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
      }]
    },

    getTicketData () {
      return APIGateway.ticket.getNeededDataToCreateTicket()
    },

    getDepartments () {
      return [
        {
          id: 20,
          parent_id: null,
          order: 0,
          enable: 0,
          display: 0,
          title: 'درخواست تمدید سفارش',
          ticket_form: null,
          responders_employees: null,
          created_at: '2022-07-09 07:55:21',
          updated_at: '2022-07-09 07:55:23',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/20/edit'
        },
        {
          id: 22,
          parent_id: null,
          order: 0,
          enable: 1,
          display: 0,
          title: 'درآمد زایی',
          ticket_form: null,
          responders_employees: null,
          created_at: '2022-08-04 10:22:35',
          updated_at: '2022-08-04 10:22:37',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/22/edit'
        },
        {
          id: 21,
          parent_id: null,
          order: 1,
          enable: 0,
          display: 0,
          title: 'اعتراض به انقضای مادام العمر سفارش',
          ticket_form: null,
          responders_employees: null,
          created_at: '2022-07-09 07:55:21',
          updated_at: '2022-07-09 07:55:23',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/21/edit'
        },
        {
          id: 1,
          parent_id: null,
          order: 2,
          enable: 1,
          display: 1,
          title: 'آموزش',
          ticket_form: null,
          responders_employees: null,
          created_at: '2020-08-25 11:10:48',
          updated_at: '2020-08-25 11:10:48',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/1/edit'
        },
        {
          id: 2,
          parent_id: null,
          order: 3,
          enable: 1,
          display: 1,
          title: 'مالی',
          ticket_form: null,
          responders_employees: null,
          created_at: '2020-08-25 11:10:46',
          updated_at: '2020-08-25 11:10:46',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [
            'showOrdersInTicketCreation'
          ],
          edit_link: 'http://alaatv.test/ticketDepartment/2/edit'
        },
        {
          id: 3,
          parent_id: null,
          order: 4,
          enable: 1,
          display: 1,
          title: 'استخدام',
          ticket_form: null,
          responders_employees: null,
          created_at: '2020-08-25 11:10:44',
          updated_at: '2020-08-25 11:10:45',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/3/edit'
        },
        {
          id: 4,
          parent_id: null,
          order: 5,
          enable: 1,
          display: 1,
          title: 'پرچم',
          ticket_form: null,
          responders_employees: null,
          created_at: '2020-09-17 11:27:12',
          updated_at: '2020-09-17 11:27:14',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/4/edit'
        },
        {
          id: 5,
          parent_id: null,
          order: 6,
          enable: 1,
          display: 1,
          title: 'راه ابریشم',
          ticket_form: null,
          responders_employees: null,
          created_at: '2020-10-26 17:18:44',
          updated_at: '2020-10-26 17:59:45',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/5/edit'
        },
        {
          id: 6,
          parent_id: null,
          order: 7,
          enable: 1,
          display: 1,
          title: 'فنی',
          ticket_form: null,
          responders_employees: null,
          created_at: '2020-10-26 17:59:05',
          updated_at: '2020-10-26 17:59:05',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/6/edit'
        },
        {
          id: 7,
          parent_id: null,
          order: 8,
          enable: 1,
          display: 1,
          title: 'مشاوره خرید',
          ticket_form: null,
          responders_employees: null,
          created_at: '2020-10-26 18:12:04',
          updated_at: '2020-10-26 18:12:04',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/7/edit'
        },
        {
          id: 8,
          parent_id: null,
          order: 9,
          enable: 1,
          display: 0,
          title: 'مشکلات محتوایی رایگان',
          ticket_form: null,
          responders_employees: null,
          created_at: '2020-10-31 05:50:42',
          updated_at: '2020-10-31 05:50:42',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/8/edit'
        },
        {
          id: 9,
          parent_id: null,
          order: 10,
          enable: 1,
          display: 0,
          title: 'مشکلات محتوایی غیر رایگان',
          ticket_form: null,
          responders_employees: null,
          created_at: '2020-10-31 05:50:42',
          updated_at: '2020-10-31 05:50:42',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/9/edit'
        },
        {
          id: 10,
          parent_id: null,
          order: 11,
          enable: 1,
          display: 0,
          title: 'ارتباط با ما',
          ticket_form: null,
          responders_employees: null,
          created_at: '2020-11-04 10:08:56',
          updated_at: '2020-11-04 10:08:55',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/10/edit'
        },
        {
          id: 11,
          parent_id: null,
          order: 12,
          enable: 1,
          display: 1,
          title: 'حمایت های مردمی',
          ticket_form: null,
          responders_employees: null,
          created_at: '2020-11-04 10:13:05',
          updated_at: '2020-11-04 10:13:06',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/11/edit'
        },
        {
          id: 12,
          parent_id: null,
          order: 13,
          enable: 1,
          display: 0,
          title: 'درخواست انتقال حساب کاربری',
          ticket_form: null,
          responders_employees: null,
          created_at: '2020-12-13 13:42:07',
          updated_at: '2020-12-13 13:42:09',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/12/edit'
        },
        {
          id: 13,
          parent_id: null,
          order: 14,
          enable: 1,
          display: 1,
          title: 'تفتان',
          ticket_form: null,
          responders_employees: null,
          created_at: '2021-03-22 12:47:10',
          updated_at: '2021-03-22 12:47:08',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/13/edit'
        },
        {
          id: 14,
          parent_id: null,
          order: 15,
          enable: 1,
          display: 1,
          title: 'آرش',
          ticket_form: null,
          responders_employees: null,
          created_at: '2021-03-22 12:47:10',
          updated_at: '2021-03-22 12:47:10',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/14/edit'
        },
        {
          id: 15,
          parent_id: null,
          order: 16,
          enable: 1,
          display: 1,
          title: 'تتا',
          ticket_form: null,
          responders_employees: null,
          created_at: '2021-03-22 12:47:10',
          updated_at: '2021-03-22 12:47:10',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/15/edit'
        },
        {
          id: 16,
          parent_id: null,
          order: 17,
          enable: 1,
          display: 1,
          title: 'سه آ',
          ticket_form: null,
          responders_employees: null,
          created_at: '2021-03-22 12:47:10',
          updated_at: '2021-03-22 12:47:10',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/16/edit'
        },
        {
          id: 17,
          parent_id: null,
          order: 18,
          enable: 1,
          display: 1,
          title: 'طرح حکمت',
          ticket_form: null,
          responders_employees: null,
          created_at: '2021-03-22 12:47:10',
          updated_at: '2021-03-22 12:47:10',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/17/edit'
        },
        {
          id: 18,
          parent_id: null,
          order: 19,
          enable: 0,
          display: 0,
          title: 'فنی داخلی',
          ticket_form: null,
          responders_employees: '["27244","1"]',
          created_at: '2021-04-06 08:19:35',
          updated_at: '2021-06-24 13:18:28',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/18/edit'
        },
        {
          id: 19,
          parent_id: null,
          order: 20,
          enable: 0,
          display: 0,
          title: 'مالی داخلی',
          ticket_form: null,
          responders_employees: null,
          created_at: '2021-04-08 06:28:44',
          updated_at: '2021-04-08 06:28:46',
          deleted_at: null,
          filter_access: true,
          children: [],
          features: [],
          edit_link: 'http://alaatv.test/ticketDepartment/19/edit'
        }
      ].filter(item => item.display === 1)
    },

    sendTicket (data, isMsg) {
      if (!isMsg && !this.hasRequiredField()) {
        return
      }
      const formData = this.setTicketFormData(data, isMsg)
      isMsg ? this.sendTicketMsg(formData) : this.sendCreateTicketReq(formData)
    },

    sendTicketMessage (data) {
      this.sendTicket(data, true)
    },

    async sendCreateTicketReq (formData) {
      this.loading = true
      try {
        const response = await APIGateway.ticket.creatTicket(formData)
        if (this.$refs.SendMessageInput) {
          this.$refs.SendMessageInput.clearMessage()
        }
        this.showMessagesInNotify(['تیکت شما با موفقیت ایجاد شد'], 'positive')
        this.loading = false
        const showRouteName = this.isInAdminPage ? 'Admin.Ticket.Show' : 'UserPanel.Ticket.Show'
        await this.$router.push({
          name: showRouteName,
          params: { id: response.data.data.id }
        })
      } catch {
        this.loading = false
      }
    },

    async sendTicketMsg (formData) {
      this.loading = true
      try {
        const response = await APIGateway.ticket.sendTicketMessage(formData)
        this.userMessageArray.unshift(response.data.data.ticketMessage)
        if (this.$refs.SendMessageInput) {
          this.$refs.SendMessageInput.clearMessage()
        }
        this.showMessagesInNotify(['پیام شما با موفقیت ایجاد شد'], 'positive')
        this.loading = false
      } catch {
        this.loading = false
      }
    },

    async updateTicketData (ticketId, payload) {
      try {
        this.loading = true
        await this.callUpdateTicketApi(ticketId, payload)
        this.$q.notify({
          message: 'تغییرات با موفقیت اعمال شد.',
          type: 'positive'
        })
        this.loading = false
      } catch {
        this.loading = false
      }
    },

    async changeUser () {
      const id = this.getInputsValue('id')
      const payloadData = {
        department_id: this.getInputsValue('department'),
        status_id: this.getInputsValue('status'),
        priority_id: this.getInputsValue('priority-id'),
        user_id: this.user.id,
        id,
        title: this.getInputsValue('title')
      }
      await this.updateTicketData(id, payloadData)
    },

    callUpdateTicketApi (ticketId, payloadData) {
      const id = ticketId || this.getInputsValue('id')
      if (!payloadData) {
        payloadData = {
          department_id: this.getInputsValue('department'),
          status_id: this.getInputsValue('status'),
          priority_id: this.getInputsValue('priority-id'),
          user_id: this.getInputsValue('userId'),
          id,
          title: this.getInputsValue('title')
        }
      }
      return this.$apiGateway.ticket.updateTicket(ticketId, payloadData)
    },

    async getUserInfo () {
      const payload = {
        mobile: this.phoneNumber,
        nationalCode: this.nationalCode
      }
      this.loading = true
      try {
        this.user = await this.$apiGateway.ticket.getUserData(payload)
        this.loading = false
      } catch {
        this.loading = false
        this.user = new User()
      }
    },

    setTicketFormData (data, isMsg) {
      const formData = new FormData()

      if (data.resultURL) {
        formData.append('photo', data.resultURL)
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
        formData.append('ticket_id', this.getInputsValue('id'))
        return formData
      }
      formData.append('department_id', this.selectedDepartment.id)

      formData.append('title', this.getInputsValue('title'))
      // formData.append()

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

    getInputsValue (inputName, source) {
      const input = this.getInput(inputName, source)
      if (!input) {
        return false
      }
      return input.value
    },

    getInput (inputName, source) {
      const srcFilter = source || this.inputs
      return srcFilter.find(input => input.name === inputName)
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

import { apiV2 } from 'src/boot/axios.js'
import { User } from 'src/models/User.js'
import { TicketList } from 'src/models/Ticket.js'
import APIRepository from '../classes/APIRepository.js'
import { TicketMessage } from 'src/models/TicketMessage.js'
import { TicketStatusList } from 'src/models/TicketStatus.js'
import { TicketPriorityList } from 'src/models/TicketPriority.js'
import { TicketDepartmentList } from 'src/models/TicketDepartment.js'

export default class TicketAPI extends APIRepository {
  constructor () {
    super('ticket', apiV2, '/ticket')
    this.APIAdresses = {
      base: '/ticket',
      create: '/ticket/create',
      presignedUrl: '/ticket/presigned-url',
      updateTicketApi: (ticketId) => '/ticket/' + ticketId,
      getInfo: '/user/getInfo',
      ticketMessage: '/ticketMessage',
      batchExtend: '/orderproduct/batchExtend',
      statusNotice: (ticketId) => '/ticket/' + ticketId + '/sendTicketStatusNotice',
      editAssign: (ticketId) => '/ticket/' + ticketId + '/assign',
      reportMessage: (ticketId) => 'ticket/' + ticketId + '/report',
      ticketRate: (ticketId) => 'ticket/' + ticketId + '/rate',
      ticketDepartment: {
        create: {
          base: '/admin/user'
        },
        edit: {
          base: '/admin/user/'
        },
        index: {
          base: '/admin/user'
        },
        show: {
          base: '/admin/user/'
        }
      }
    }
    this.CacheList = {
      create: '/ticket/create'
    }
    this.restUrl = (id) => this.url + '/' + id
  }

  index (data, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      cacheKey: this.CacheList.base,
      data: this.getNormalizedSendData({
        hasReported: null, // Number
        ticketMessage: null, // String
        hasAssignees: null, // Array of Number
        created_at_till: null, // String
        created_at_since: null, // String
        title: null, // String
        id: null, // Number
        order_id: null, // Array of Number
        status_id: null, // Array of Number
        priority_id: null, // Array of Number
        department_id: null, // Array of Number
        has_user_lastname: null, // String
        has_user_firstname: null, // String
        has_user_nationalcode: null, // String
        has_user_mobile: null, // String
        page: null // Number
      }, data),
      ...(cache !== undefined && { cache }),
      resolveCallback: (response) => {
        return {
          list: new TicketList(response.data.data),
          paginate: response.data.meta
          // {
          //   current_page: 1,
          //   from: 1,
          //   last_page: 1,
          //   path: '...',
          //   per_page: 15,
          //   to: 10,
          //   total: 10
          // }
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  batchExtend (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.batchExtend,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  sendTicketRate (ticketId, data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.ticketRate(ticketId),
      resolveCallback: (response) => {
        return response.data.message
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  sendReport (ticketId, data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.reportMessage(ticketId),
      resolveCallback: (response) => {
        return response.data.message
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  creatTicket (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.base,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  updateTicket (ticketId, data) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.updateTicketApi(ticketId),
      data,
      resolveCallback: (response) => {
        return {
          code: response
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getUserData (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.getInfo,
      resolveCallback: (response) => {
        return new User(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  sendTicketMessage (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.ticketMessage,
      resolveCallback: (response) => {
        return new TicketMessage(response.data?.data?.ticketMessage)
      },
      rejectCallback: (error) => {
        return error
      },
      data: this.getNormalizedSendData({
        ticket_id: 0, // Number
        is_private: false, // Boolean
        files: [], // Array of String
        body: '' // String
      }, data)
    })
  }

  sendTicketStatusNotice (ticketId, data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.statusNotice(ticketId),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  editTicketAssignedSupporters (id, data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.editAssign(id),
      resolveCallback: (response) => {
        return new User(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  getNeededDataToCreateTicket (cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.create,
      resolveCallback: (response) => {
        const ticketData = response.data
        return {
          departments: new TicketDepartmentList(ticketData.departments),
          priorities: new TicketPriorityList(ticketData.priorities),
          statuses: new TicketStatusList(ticketData.statuses)
        }
      },
      rejectCallback: (error) => {
        return error
      },
      ...(cache && { cache })
    })
  }

  presignedUrl (key) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.presignedUrl,
      resolveCallback: (response) => {
        return {
          url: response.data.url, // String presigned URL of file
          uploaded_file_name: response.data.uploaded_file_name // String
        }
      },
      rejectCallback: (error) => {
        return error
      },
      data: this.getNormalizedSendData({
        key: '' // String example: x.png
      }, { key })
    })
  }
}

import { apiV2 } from 'src/boot/axios.js'
import { User } from 'src/models/User.js'
import APIRepository from '../classes/APIRepository.js'
import { TicketPriorityList } from 'src/models/TicketPriority.js'
import { TicketDepartmentList } from 'src/models/TicketDepartment.js'
import { TicketStatusList } from 'src/models/TicketStatus'

export default class TicketAPI extends APIRepository {
  constructor() {
    super('ticket', apiV2, '/ticket')
    this.APIAdresses = {
      base: '/ticket',
      create: '/ticket/create',
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

  batchExtend(data) {
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

  sendTicketRate(ticketId, data) {
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

  sendReport(ticketId, data) {
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

  creatTicket(data) {
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

  updateTicket(ticketId, data) {
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

  getUserData(data) {
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

  sendTicketMessage(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.ticketMessage,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  sendTicketStatusNotice(ticketId, data) {
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

  editTicketAssignedSupporters(id, data) {
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

  getNeededDataToCreateTicket(cache = { TTL: 1000 }) {
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
}

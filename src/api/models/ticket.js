import APIRepository from '../classes/APIRepository'
import { apiV2 } from 'src/boot/axios'

export default class TicketAPI extends APIRepository {
  constructor() {
    super('ticket', apiV2, '/ticket')
    this.APIAdresses = {
      base: '/ticket',
      updateTicketApi: (ticketId) => '/ticket/' + ticketId
    }
    this.restUrl = (id) => this.url + '/' + id
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

  // const response = await this.$API_Gateway.ticket.creatTicket(formData)
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
}

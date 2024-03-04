import { apiV2 } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class SmsAPI extends APIRepository {
  constructor () {
    super('sms', apiV2)
    this.APIAdresses = {
      send: '/sms/v2/patterns',
      smsAdmin: {
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
  }

  sendTicketMessage (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.send,
      resolveCallback: (response) => {
        return response.data.message // String
      },
      rejectCallback: (error) => {
        return error
      },
      data: this.getNormalizedSendData({
        pattern_id: null, // number
        pattern_values: [
          {
            key: null, // String
            value: null // String
          },
          {
            key: null, // String
            value: null // String
          }
        ],
        users_id: [] // Array of user_id
      }, data)
    })
  }
}

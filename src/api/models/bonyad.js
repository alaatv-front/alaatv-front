import { apiV2 } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class BonyadAPI extends APIRepository {
  constructor () {
    super('bonyad', apiV2)
    this.APIAdresses = {
      unreadNotification: '/bonyadEhsan/notification',
      readAllNotification: '/bonyadEhsan/notification/readAll'
    }
    this.CacheList = {}
  }

  getMessages (data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.unreadNotification,
      data,
      resolveCallback: (response) => {
        return {
          messages: response.data.data,
          meta: response.data?.meta
        } // Notification object
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  readAllMessages () {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.readAllNotification,
      resolveCallback: (response) => {
        return response // string
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

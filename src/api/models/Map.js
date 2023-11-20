import APIRepository from '../classes/APIRepository'
import { apiV2 } from 'src/boot/axios'

export default class MapAPI extends APIRepository {
  constructor () {
    super('map', apiV2)
    this.APIAdresses = {
      items: '/mapDetail'
    }
  }

  saveMapItem (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.items,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }
}

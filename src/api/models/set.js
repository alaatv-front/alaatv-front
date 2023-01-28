import APIRepository from '../classes/APIRepository'
import { apiV2 } from 'src/boot/axios'
import { Set } from 'src/models/Set'

const urlAddress = {
  base: '/set',
  show: (id) => '/set/' + id
}
export default class SetAPI extends APIRepository {
  constructor() {
    super('set', apiV2, '/set', new Set(), urlAddress)
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      show: (id) => this.name + this.APIAdresses.show(id)
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => {
        return new Set(response.data.data)
      }
    })
  }

  show(data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.show(data.data.id),
      cacheKey: this.CacheList.show(data.data.id),
      ...(data?.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return new Set(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

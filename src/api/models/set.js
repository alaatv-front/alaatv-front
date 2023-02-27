import APIRepository from '../classes/APIRepository'
import { apiV2 } from 'src/boot/axios'
import { Set } from 'src/models/Set'

const urlAddress = {
  base: '/set',
  attachContents: (setId) => '/admin/set/' + setId + '/c/attach',
  show: (id) => '/set/' + id
}
export default class SetAPI extends APIRepository {
  constructor() {
    super('set', apiV2, '/set', new Set(), urlAddress)
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      show: (id) => this.name + this.APIAdresses.show(id),
      attachContents: (setId) => this.name + this.APIAdresses.attachContents(setId)
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => {
        return new Set(response.data.data)
      }
    })
  }

  show(data, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.show(data.id),
      cacheKey: this.CacheList.show(data.id),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new Set(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  attachContents (setId, data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.attachContents(setId),
      cacheKey: this.CacheList.attachContents(setId),
      ...(data?.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return response.data
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }
}

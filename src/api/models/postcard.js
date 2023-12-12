import { apiV2 } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { Postcard, PostcardList } from 'src/models/Postcard.js'

export default class PostcardAPI extends APIRepository {
  constructor () {
    super('postcard', apiV2, '/user')
    this.APIAdresses = {
      postcard: '/postal-cards',
      data: '/postal-cards/data',
      byId: (id) => '/postal-cards/' + id
    }
    this.CacheList = {
      data: this.name + this.APIAdresses.data,
      postcard: this.name + this.APIAdresses.postcard,
      byId: (id) => this.name + this.APIAdresses.byId(id)
    }
    this.setCrudCallbacks({
      get: (response) => { return new Postcard(response.data.data) },
      post: (response) => { return new Postcard(response.data.data) },
      put: (response) => { return new Postcard(response.data.data) },
      delete: (response) => { return new Postcard(response.data.data) }
    })
  }

  getContacts (data, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.postcard,
      cacheKey: this.CacheList.postcard,
      ...(cache && { cache }),
      ...(data && { data }),
      resolveCallback: (response) => {
        return new PostcardList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getPostcard (postcardId, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.byId(postcardId),
      cacheKey: this.CacheList.byId(postcardId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new Postcard(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getData (postcardId, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.data,
      cacheKey: this.CacheList.data,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new Postcard(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

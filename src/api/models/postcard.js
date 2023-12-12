import { apiV2 } from 'src/boot/axios.js'
import { Postcard, PostcardList } from 'src/models/Postcard.js'
import APIRepository from '../classes/APIRepository.js'

export default class PostcardAPI extends APIRepository {
  constructor () {
    super('postcard', apiV2, '/user')
    this.APIAdresses = {
      postcard: '/postal-cards'
    }
    this.CacheList = {
      postcard: this.name + this.APIAdresses.postcard
    }
    this.setCrudCallbacks({
      get: (response) => { return new Postcard(response.data.data) },
      post: (response) => { return new Postcard(response.data.data) },
      put: (response) => { return new Postcard(response.data.data) },
      delete: (response) => { return new Postcard(response.data.data) }
    })
  }

  getPostcards (data, cache = { TTL: 1000 }) {
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
}

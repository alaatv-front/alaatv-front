import { apiV2 } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { Postcard, PostcardList, PostcardValue } from 'src/models/Postcard.js'
import { Coupon } from 'src/models/Coupon'

export default class PostcardAPI extends APIRepository {
  constructor () {
    super('postcard', apiV2, '/user')
    this.APIAdresses = {
      postcard: '/postal-cards',
      metaData: (postcardUuid) => '/postal-cards/' + postcardUuid + '/meta-data',
      byId: (id) => '/postal-cards/' + id
    }
    this.CacheList = {
      metaData: (postcardUuid) => this.name + this.APIAdresses.metaData(postcardUuid),
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

  getPostcard (postcardUuid, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.byId(postcardUuid),
      cacheKey: this.CacheList.byId(postcardUuid),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new Postcard(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getMetaData (postcardUuid, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.metaData(postcardUuid),
      cacheKey: this.CacheList.metaData(postcardUuid),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return {
          coupon: new Coupon(response.data.coupon),
          banners: Array.isArray(response.data?.banners) ? response.data.banners : [] // array of object { src: '' }
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  savePostalCardData (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.postcard,
      data: this.getNormalizedSendData({
        value: new PostcardValue(),
        study_event_id: null // number
      }, data),
      resolveCallback: (response) => {
        return new Postcard(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  editPostalCard (data, postcardId) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.byId(postcardId),
      data: this.getNormalizedSendData({
        value: new PostcardValue(),
        study_event_id: null // number
      }, data),
      resolveCallback: (response) => {
        return new Postcard(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

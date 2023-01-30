import APIRepository from '../classes/APIRepository'
import { apiV2 } from 'src/boot/axios'
import { Content } from 'src/models/Content'
const APIAdresses = {
  admin: '/c/',
  show: (id) => '/c/' + id,
  search: '/search',
  timestampSet: 'timepoint',
  timestampGet: (id) => `timepoint/${id}`
}
export default class ContentAPI extends APIRepository {
  constructor() {
    super('content', apiV2, '', '', APIAdresses)
    this.CacheList = {
      admin: this.name + this.APIAdresses.admin,
      show: id => this.name + this.APIAdresses.show(id),
      search: this.name + this.APIAdresses.search,
      timestampSet: this.name + this.APIAdresses.timestampSet,
      timestampGet: id => this.name + this.APIAdresses.timestampGet(id)
    }
  }

  show(data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.show(data),
      cacheKey: this.CacheList.show(data),
      ...(data?.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return new Content(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  search(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.search,
      cacheKey: this.CacheList.orderProduct,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return {
          sets: response.data.data.sets,
          products: response.data.data.products,
          videos: response.data.data.videos
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  SetTimestamp(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.timestampSet,
      cacheKey: this.CacheList.timestampSet,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return {
          timestamp: response.data
        }
      },
      rejectCallback: (error) => {
        return error
      },
      data: this.getNormalizedSendData({
        content_id: null, // content Id
        title: null, // Title for Timestamp
        time: null // time of Video for timestamp in seconds
      }, data.data)
    })
  }

  GetTimestamp(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.timestampGet('131107'),
      cacheKey: this.CacheList.timestampGet('131107'),
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return {
          timestamp: response.data
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

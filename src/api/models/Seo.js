import { apiV2 } from 'src/boot/axios.js'
import { PageSeo } from 'src/models/PageSeo.js'
import APIRepository from '../classes/APIRepository.js'

export default class ContentAPI extends APIRepository {
  constructor () {
    super('content', apiV2)
    this.APIAdresses = {
      base: (type, id) => '/seo' + '?type=' + type + '&id=' + id
    }
    this.CacheList = {
      base: (type, id) => this.name + this.APIAdresses.base(type, id)
    }
  }

  show (data, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base(data.type, data.id),
      cacheKey: this.CacheList.base(data.type, data.id),
      data: this.getNormalizedSendData({
        type: '', // String -> in:content,content-set,product
        id: 0 // Number
      }, data),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new PageSeo(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

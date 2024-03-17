import { apiV2 } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class CartAPI extends APIRepository {
  constructor () {
    super('lastVersion', apiV2)
    this.APIAdresses = {
      lastVersion: '/lastVersion'
    }
    this.CacheList = {
      lastVersion: this.name + this.APIAdresses.lastVersion
    }
  }

  getLastVersion (cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.lastVersion,
      cacheKey: this.CacheList.lastVersion,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return response.data
        // {
        //   android: {
        //     type: {
        //       code: 1,
        //       last_version: '...',
        //       url: '...'
        //     }
        //   }
        // }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

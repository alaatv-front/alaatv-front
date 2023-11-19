import { apiV2 } from 'src/boot/axios.js'
import { Conductor } from 'src/models/Conductor.js'
import APIRepository from '../classes/APIRepository.js'

export default class ConductorAPI extends APIRepository {
  constructor () {
    super('conductor', apiV2, '/conductor', new Conductor())
    this.APIAdresses = {
      base: '/conductor',
      byId: (id) => '/conductor/' + id + '/live'
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      byId: (id) => this.name + this.APIAdresses.byId(id)
    }
  }

  get (id, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.byId(id),
      cacheKey: this.CacheList.byId(id),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new Conductor(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

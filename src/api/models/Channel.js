import APIRepository from '../classes/APIRepository'
import { apiV2 } from 'src/boot/axios'
import { Channel } from 'src/models/Channel'
const APIAdresses = {
  base: '/ch'
}
export default class ChannelAPI extends APIRepository {
  constructor() {
    super('channel', apiV2, '/ch', new Channel(), APIAdresses)
    this.APIAdresses = {
      base: '/ch'
    }
    this.CacheList = {
      base: '/ch'
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new Channel(response.data.data) }
    })
  }
}

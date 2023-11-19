import APIRepository from '../classes/APIRepository'
import { apiV2 } from 'src/boot/axios'
import { Channel } from 'src/models/Channel'

export default class ChannelAPI extends APIRepository {
  constructor () {
    super('channel', apiV2, '/ch', new Channel())
    this.APIAdresses = {
      base: (channelId) => '/ch/' + channelId
    }
    this.CacheList = {
      base: (channelId) => this.name + this.APIAdresses.base(channelId)
    }
  }

  getChannel (data = {}, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base(data.id),
      cacheKey: this.CacheList.base(data.id),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new Channel(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

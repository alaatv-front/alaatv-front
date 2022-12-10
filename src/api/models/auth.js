import APIRepository from '../classes/APIRepository'
import { apiV2 } from 'src/boot/axios'
import { User } from 'src/models/User'

export default class AuthAPI extends APIRepository {
  constructor() {
    super('auth', apiV2)
    this.APIAdresses = {
      login: '/login'
    }
    this.CacheList = {
      login: this.name + this.APIAdresses.login
    }
  }

  login(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.login,
      cacheKey: this.CacheList.login,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return {
          user: new User(response.data.data.user),
          token: response.data.data.token
        }
      },
      rejectCallback: (error) => {
        return error
      },
      data: this.getNormalizedSendData({
        mobile: null, // String
        password: null // Valid Password
      }, data)
    })
  }
}

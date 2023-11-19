import { apiV2 } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
// import { User } from 'src/models/User'

export default class AuthAPI extends APIRepository {
  constructor () {
    super('auth', apiV2)
    this.APIAdresses = {
      login: '/login'
    }
    this.CacheList = {}
  }

  login (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.login,
      data: this.getNormalizedSendData({
        mobile: '', // String
        password: '' // String
      }, data),
      resolveCallback: (response) => {
        const user = response.data.data.user
        const accessToken = response.data.data.access_token
        // const user = new User(response.data.data.user)

        return { accessToken, user }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

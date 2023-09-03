import { apiV2 } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class AuthAPI extends APIRepository {
  constructor() {
    super('ewano', apiV2)
    this.APIAdresses = {
      base: '/ewano'
    }
    this.CacheList = {}
  }

  login (id) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      data: { id }, // String
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

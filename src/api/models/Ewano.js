import { apiV2 } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class AuthAPI extends APIRepository {
  constructor () {
    super('ewano', apiV2)
    this.APIAdresses = {
      base: '/ewano',
      pay: '/ewano/pay',
      order: '/ewano/order'
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

  pay (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.pay,
      data: this.getNormalizedSendData({
        order_id: null // alaa order Id
      }, data),
      resolveCallback: (response) => {
        return response.data.data.status // boolean
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  makeOrder () {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.order,
      resolveCallback: (response) => {
        const ewanoOrderId = response.data.data.ewano_order_id
        const alaaOrderId = response.data.data.alaa_order_id
        const amount = response.data.data.amount

        return { ewanoOrderId, alaaOrderId, amount }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

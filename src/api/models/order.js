import APIRepository from '../classes/APIRepository'
import { apiV2 } from 'src/boot/axios'

export default class OrderAPI extends APIRepository {
  constructor() {
    super('order', apiV2)
    this.APIAdresses = {
      orderCoupon: '/orderCoupon',
      edit: '/admin/order',
      index: '/admin/order',
      show: '/admin/order',
      status: '/payment/status',
      ordersById: (id) => '/user/' + id + '/orders'

    }
  }

  getPaymentStatus() {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.status,
      resolveCallback: (response) => {
        return response.data.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  SubmitCouponOnOrder (data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.orderCoupon,
      data: this.getNormalizedSendData({
        code: '', // String
        order_id: '' // Number
      }, data.data),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  DeleteCouponFromOrder (data = {}) {
    return this.sendRequest({
      apiMethod: 'delete',
      api: this.api,
      request: this.APIAdresses.orderCoupon,
      data: this.getNormalizedSendData({
        order_id: '' // Number
      }, data.data),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

import APIRepository from '../classes/APIRepository'
import { apiV2 } from 'src/boot/axios'

export default class OrderAPI extends APIRepository {
  constructor () {
    super('order', apiV2)
    this.APIAdresses = {
      orderCoupon: '/orderCoupon',
      create: '/reqres/api/users',
      edit: '/admin/order',
      index: '/admin/order',
      show: '/admin/order',
      status: '/admin/form-builder?types[]=paymentStatuses',
      orderProduct: (id) => `/admin/orderproduct/${id}`,
      ordersById: (id) => '/user/' + id + '/orders',
      transaction: {
        create: {
          base: '/admin/user'
        },
        edit: {
          base: '/admin/user/'
        },
        index: {
          base: '/admin/user'
        },
        show: {
          base: '/admin/user/'
        }
      },
      userBon: {
        create: {
          base: '/admin/user'
        },
        edit: {
          base: '/admin/user/'
        },
        index: {
          base: '/admin/user'
        },
        show: {
          base: '/admin/user/'
        }
      }
    }
  }

  getPaymentStatus () {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.status,
      resolveCallback: (response) => {
        return response.data.data.paymentStatuses
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

  AdminDeleteOrderProduct (orderProductId) {
    return this.sendRequest({
      apiMethod: 'delete',
      api: this.api,
      request: this.APIAdresses.orderProduct(orderProductId),
      resolveCallback: (response) => {
        return response.data.message // String
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

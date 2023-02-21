import { apiV2 } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { ReferralCodeList } from 'src/models/ReferralCode'

export default class ReferralCodeAPI extends APIRepository {
  constructor() {
    super('gift-card', apiV2)
    this.APIAdresses = {
      base: '/referral-code',
      orderProducts: '/referral-code/orderproducts',
      batchStore: '/referral-code/batch-store',
      orderReferralCode: '/order-referral-code',
      assign: (referralCode) => '/referral-code/' + referralCode + '/assign'
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
  }

  // rest
  // has get

  index (data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      data: this.getNormalizedSendData({
        page: 1 // Number
      }, data.data),
      resolveCallback: (response) => {
        return {
          referralCodeList: new ReferralCodeList(response.data.data),
          paginate: response.data.meta
          // {
          //   current_page: 1,
          //   from: 1,
          //   last_page: 1,
          //   path: 'http://office.alaa.tv:700/api/v2/referral-code',
          //   per_page: 15,
          //   to: 10,
          //   total: 10
          // }
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getOrderProducts () {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.orderProducts,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  batchStore (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.batchStore,
      data: this.getNormalizedSendData({
        discounttype_id: 2, // Number -- optional
        number_of_codes: 0, // Number
        commission: 0, // Number
        mobile: '', // String
        nationalCode: '', // String
        firstName: '', // String
        lastName: '' // String
      }, data.data),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  submitReferralCodeOnOrder (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.orderReferralCode,
      data: this.getNormalizedSendData({
        referral_code: '', // String
        order_id: 0 // Number
      }, data.data),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  DeleteReferralCodeFromOrder (data) {
    return this.sendRequest({
      apiMethod: 'delete',
      api: this.api,
      request: this.APIAdresses.orderReferralCode,
      data: this.getNormalizedSendData({
        order_id: 0 // Number
      }, data.data),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  setShared (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.assign(data.data.referralCode),
      data: this.getNormalizedSendData({
        assign: true // Boolean -- optional
      }, data.data),
      resolveCallback: (response) => {
        return response.data.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

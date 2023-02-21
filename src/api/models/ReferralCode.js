import { apiV2 } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class GiftCardAPI extends APIRepository {
  constructor() {
    super('gift-card', apiV2)
    this.APIAdresses = {
      base: '/referral-code',
      orderProducts: '/referral-code/orderproducts',
      batchStore: '/referral-code/batch-store',
      orderReferralCode: '/order-referral-code',
      assign: (referralCode) => '/referral-code/' + referralCode + '/assign',
      setShared: (cardId) => '/referral-code/' + cardId + '/shared'
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
  }

  // rest
  // has get

  getReferralCodes () {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      resolveCallback: (response) => {
        return response
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
        number_of_codes: 0, // Number
        commission: 0, // Number
        discounttype_id: 0, // Number
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

  assign (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.assign(data.referralCode),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

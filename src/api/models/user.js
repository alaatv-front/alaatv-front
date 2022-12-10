import APIRepository from '../classes/APIRepository'
import { apiV2 } from 'src/boot/axios'
import { User } from 'src/models/User'
import { CartItemList } from 'src/models/CartItem'

export default class UserAPI extends APIRepository {
  constructor() {
    super('user', apiV2, '/user', new User())
    this.APIAdresses = {
      base: '/user',
      mobileResend: '/mobile/resend',
      mobileVerify: '/mobile/verify',
      ordersById: (id) => '/user/' + id + '/orders',
      getOrders: '/orders',
      orderStatus: '/payment/status',
      formData: '/megaroute/getUserFormData',
      showUser: '/getUserFor3a',
      eventResult: '/eventresult'
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      mobileResend: this.name + this.APIAdresses.base,
      mobileVerify: this.name + this.APIAdresses.base,
      ordersById: (id) => this.name + this.APIAdresses.ordersById(id),
      getOrders: this.name + this.APIAdresses.base,
      orderStatus: this.name + this.APIAdresses.base,
      formData: this.name + this.APIAdresses.base,
      showUser: this.name + this.APIAdresses.base,
      eventResult: this.name + this.APIAdresses.base
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new User(response.data.data) },
      post: (response) => { return new User(response.data.data) },
      put: (response) => { return new User(response.data.data) },
      delete: (response) => { return new User(response.data.data) }
    })
  }

  mobileResend(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.mobileResend,
      cacheKey: this.CacheList.mobileResend,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return {
          code: response
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  mobileVerify(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.mobileVerify,
      cacheKey: this.CacheList.mobileVerify,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return {
          status: response
        }
      },
      rejectCallback: (error) => {
        return error
      },
      data: this.getNormalizedSendData({
        code: null // number - string
      }, data)
    })
  }

  ordersById(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.ordersById(data.userId),
      cacheKey: this.CacheList.ordersById(data.userId),
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return {
          cartItemList: new CartItemList(response.data.data)
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getOrders(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getOrders,
      cacheKey: this.CacheList.getOrders,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  orderStatus(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.orderStatus,
      cacheKey: this.CacheList.orderStatus,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  formData(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.formData,
      cacheKey: this.CacheList.formData,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return {
          genders: response.data.data.genders,
          grades: response.data.data.grades,
          majors: response.data.data.majors,
          provinces: response.data.data.provinces,
          cities: response.data.data.cities
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  showUser(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.showUser,
      cacheKey: this.CacheList.showUser,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  eventResult(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.eventResult,
      cacheKey: this.CacheList.eventResult,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

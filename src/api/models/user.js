import APIRepository from "../classes/APIRepository"
import { apiV1, apiV2, apiWeb } from "src/boot/axios";
import { User } from 'src/models/User';
import { CartItemList } from 'src/models/CartItem';


export default class UserAPI extends APIRepository {
  constructor() {
    super(apiV2,'/user', new User())
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
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new User(response.data.data)},
      post: (response) => { return new User(response.data.data)},
      put: (response) => { return new User(response.data.data)},
      delete: (response) => { return new User(response.data.data)}
    })
  }
  mobileResend(data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.mobileResend,
      resolveCallback: (response) => {
        return {
          code: response
        }
      },
      rejectCallback: (error) => {
        return error
      }
    });
  }
  mobileVerify(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.mobileVerify,
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
      },data)
    });
  }
  ordersById(userId) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.ordersById(userId),
      resolveCallback: (response) => {
        return {
          cartItemList: new CartItemList(response.data.data)
        }
      },
      rejectCallback: (error) => {
        return error
      }
    });
  }
  getOrders() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getOrders,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    });
  }
  orderStatus() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.orderStatus,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    });
  }
  formData() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.formData,
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
    });
  }
  showUser() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.showUser,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    });
  }
  eventResult() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.eventResult,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    });
  }
}

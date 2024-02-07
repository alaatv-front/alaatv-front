import { User } from 'src/models/User.js'
import { apiV2 } from 'src/boot/axios.js'
import { ProductList } from 'src/models/Product.js'
import { FavoredList } from 'src/models/Favored.js'
import { CartItemList } from 'src/models/CartItem.js'
import { EventResult } from 'src/models/EventResult.js'
import APIRepository from '../classes/APIRepository.js'
import { BankAccountsList } from 'src/models/BankAccounts.js'
import { EventekhbReshte } from 'src/models/EventekhbReshte.js'
import { FieldSelectionForm } from 'src/models/FieldSelectionForm.js'

export default class UserAPI extends APIRepository {
  constructor () {
    super('user', apiV2, '/user', User)
    this.APIAdresses = {
      create: '/admin/user',
      base: '/user',
      byId: (id) => '/user/' + id,
      favored: '/user/favored',
      purchasedProducts: '/user/products',
      hasPurchased: '/user/products/hasPurchased',
      entekhabReshte: '/user/get/entekhab-reshte',
      bankAccounts: '/bank-accounts',
      mobileResend: '/mobile/resend',
      mobileVerify: '/mobile/verify',
      ordersById: (id) => '/user/' + id + '/orders',
      isPermittedToPurchase: (productId) => '/user/isPermittedToPurchase/' + productId,
      getOrders: '/orders',
      orderStatus: '/payment/status',
      formData: '/megaroute/getUserFormData',
      showUser: '/getUserFor3a',
      eventResult: '/event-result',
      getEntekhabReshteByUserId: (userId) => '/user/get/entekhab-reshte?user_id=' + userId,
      eventResultById: (eventId) => '/event-result/event/' + eventId,
      createEventResult: '/event-result/create',
      baseAdmin: '/admin/user',
      nationalCard: '/user/national-card-photo',
      nationalCardPhoto: '/user/national-card-photo/get',
      resendGuest: '/mobile/resendGuest',
      getUserRoleAndPermission: '/getUserRoleAndPermission',
      verifyMoshavereh: '/mobile/verifyMoshavereh',
      newsletter: '/newsletter',
      saveExam: '/user/exam-save',
      settingUserStore: '/setting/uesrStore',
      sendWatchedContents: '/watched-bulk',
      sendFavorableList: '/favorable-list',
      admin: {
        create: {
          base: '/admin/user'
        },
        edit: {
          base: '/admin/user/',
          byId: (id) => `/admin/user/${id}`
        },
        index: {
          base: '/admin/user'
        },
        show: {
          base: '/admin/user/',
          byId: (id) => `/admin/user/${id}`
        }
      },
      fixUnknownUsersCity: {
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
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      hasPurchased: this.name + this.APIAdresses.hasPurchased,
      purchasedProducts: this.name + this.APIAdresses.purchasedProducts,
      favored: this.name + this.APIAdresses.favored,
      mobileResend: this.name + this.APIAdresses.base,
      mobileVerify: this.name + this.APIAdresses.base,
      bankAccounts: this.name + this.APIAdresses.bankAccounts,
      byId: (id) => this.name + this.APIAdresses.byId(id),
      ordersById: (id) => this.name + this.APIAdresses.ordersById(id),
      isPermittedToPurchase: (productId) => this.name + this.APIAdresses.isPermittedToPurchase(productId),
      getOrders: this.name + this.APIAdresses.base,
      orderStatus: this.name + this.APIAdresses.base,
      formData: this.name + this.APIAdresses.base,
      showUser: this.name + this.APIAdresses.base,
      eventResult: this.name + this.APIAdresses.base,
      entekhabReshte: this.name + this.APIAdresses.entekhabReshte,
      getEntekhabReshteByUserId: (userId) => this.name + this.APIAdresses.getEntekhabReshteByUserId(userId),
      eventResultById: (eventId) => this.name + this.APIAdresses.eventResultById(eventId),
      createEventResult: this.name + this.APIAdresses.createEventResult,
      baseAdmin: this.name + this.APIAdresses.baseAdmin,
      nationalCard: this.name + this.APIAdresses.nationalCard,
      nationalCardPhoto: this.name + this.APIAdresses.nationalCardPhoto,
      getUserRoleAndPermission: this.name + this.APIAdresses.getUserRoleAndPermission,
      saveExam: this.name + this.APIAdresses.saveExam,
      adminShowUserById: (id) => this.name + this.APIAdresses.admin.show.byId(id)
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

  nationalCard (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.nationalCard,
      cacheKey: this.CacheList.nationalCard,
      data,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getNationalCardPhoto (cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.nationalCardPhoto,
      cacheKey: this.CacheList.nationalCardPhoto,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return response.data.data.url // string
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  storeBankAccounts (data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.bankAccounts,
      cacheKey: this.CacheList.bankAccounts,
      data: this.getNormalizedSendData({
        preShabaNumber: 'IR', // String
        shabaNumber: '', // String
        cardNumber: '' // String
      }, data),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  updateProfile (userId, data = {}) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.byId(userId),
      data,
      resolveCallback: (response) => {
        return new User(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getBankAccounts () {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.bankAccounts,
      cacheKey: this.CacheList.bankAccounts,
      resolveCallback: (response) => {
        return new BankAccountsList(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  mobileResend (data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.mobileResend,
      cacheKey: this.CacheList.mobileResend,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return {
          code: response.data.code,
          message: response.data.message
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  mobileVerify (data) {
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
      }, data)
    })
  }

  ordersById (data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.ordersById(data.data.userId),
      cacheKey: this.CacheList.ordersById(data.data.userId),
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

  getOrders (data = {}) {
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

  hasPurchased (products = [], cache = { TTL: 100 }) {
    // products -> arrays of number
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.hasPurchased,
      cacheKey: this.CacheList.hasPurchased,
      ...(cache && { cache }),
      data: { products },
      resolveCallback: (response) => {
        return response.data.data.map(item => {
          return {
            id: item.id, // Number
            is_purchased: item.is_purchased // Number
          }
        })
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  orderStatus (data = {}) {
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

  formData (data = {}) {
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

  showUser (data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.showUser,
      cacheKey: this.CacheList.showUser,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return response.data.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  adminShowUser (userId, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.admin.show.byId(userId),
      cacheKey: this.CacheList.adminShowUserById(userId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new User(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  adminUpdateUser (data, cache = { TTL: 1000 }) {
    const formData = new FormData()
    formData.append('photo', data.photo)
    formData.append('mobile', `${data.user.mobile}`)
    formData.append('nationalCode', data.user.national_code)
    formData.append('updateType', 'photo')
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.admin.edit.byId(data.user.id),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new User(response.data)
      },
      rejectCallback: (error) => {
        return error
      },
      data: formData
    })
  }

  eventResult (data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.eventResult,
      cacheKey: this.CacheList.eventResult,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return new EventResult(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getEventResult (eventId, cache = 1000) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.eventResultById(eventId),
      cacheKey: this.CacheList.eventResultById(eventId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new EventResult(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getEntekhabReshteByUserId (userId, cache = 1000) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getEntekhabReshteByUserId(userId),
      cacheKey: this.CacheList.getEntekhabReshteByUserId(userId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new FieldSelectionForm(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  isPermittedToPurchase (productId, cache = 1000) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.isPermittedToPurchase(productId),
      cacheKey: this.CacheList.isPermittedToPurchase(productId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return response.data?.data?.order_id
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getEntekhabReshte (cache = 1000) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.entekhabReshte,
      cacheKey: this.CacheList.entekhabReshte,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new EventekhbReshte(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  createEventResult (data = {}, cache = 1000) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.createEventResult,
      cacheKey: this.CacheList.createEventResult,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return {
          events: response.data.data.events,
          majors: response.data.data.majors,
          eventResultStatuses: response.data.data.eventResultStatuses,
          regions: response.data.data.regions
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  adminIndex (data = {}) {
    const routeWithParams = function (defaultRoute, payload) {
      if (typeof payload.rollId === 'object') {
        const hasRoll = []
        payload.rollId.forEach(rollId => {
          hasRoll.push(rollId)
        })
        return defaultRoute.concat('?hasRole[]=', hasRoll)
      }
      return defaultRoute.concat('?hasRole[]=', payload.rollId)
    }
    const requestRoute = routeWithParams(this.APIAdresses.baseAdmin, {
      rollId: data.data.rollId // array or number
    })
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: requestRoute,
      cacheKey: this.CacheList.baseAdmin,
      ...(data.cache && { cache: data.cache }),
      // paramSerializer: '/?hasRoll[]=10',
      // params: this.getPayload({
      //   hasRoll: [] // array
      // }, data.data),
      resolveCallback: (response) => {
        return {
          list: response.data.data,
          links: response.data.links,
          meta: response.data.meta
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getPurchasedProducts (data = {}, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.purchasedProducts,
      cacheKey: this.CacheList.purchasedProducts,
      data: this.getNormalizedSendData({
        page: 1 // Number
      }, data),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return {
          referralCodeList: new ProductList(response.data.data),
          paginate: response.data.meta
          // {
          //   current_page: 1,
          //   from: 1,
          //   last_page: 1,
          //   path: '...',
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

  getCurrent (data = {}, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getUserRoleAndPermission,
      cacheKey: this.CacheList.getUserRoleAndPermission,
      ...(cache !== undefined && { cache }),
      resolveCallback: (response) => {
        return new User(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getUserRoleAndPermission (data = {}, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getUserRoleAndPermission,
      cacheKey: this.CacheList.getUserRoleAndPermission,
      ...(cache !== undefined && { cache }),
      resolveCallback: (response) => {
        const permissions = response.data.data.permissions // Array of string
        return permissions
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getFavored (data = {}, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.favored,
      cacheKey: this.CacheList.favored + JSON.stringify(data),
      ...(cache !== undefined && { cache }),
      data: this.getNormalizedSendData({
        page: 1 // Number
      }, data),
      resolveCallback: (response) => {
        return {
          favoredList: new FavoredList(response.data.data),
          paginate: response.data.meta
          // {
          //   current_page: 1,
          //   from: 1,
          //   last_page: 1,
          //   path: '...',
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

  resendGuest (data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.resendGuest,
      data: this.getNormalizedSendData({
        mobile: '' // String
      }, data),
      resolveCallback: (response) => {
        return response.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  verifyMoshavereh (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.verifyMoshavereh,
      data: this.getNormalizedSendData({
        code: '' // String
      }, data),
      resolveCallback: (response) => {
        return response.data.message
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  newsletter (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.newsletter,
      data: this.getNormalizedSendData({
        mobile: '', // String
        code: '', // String
        first_name: '', // String
        last_name: '', // String
        major_id: '', // String
        event_id: '', // String
        grade_id: '' // String
      }, data),
      resolveCallback: (response) => {
        if (response.data.length > 0) {
          return response.data[0].message
        } else {
          return ''
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  saveExam (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.saveExam,
      data: this.getNormalizedSendData({
        exam_id: '' // String
      }, data),
      resolveCallback: (response) => {
        return response.data.data // String Message
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  sendFavorableList (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.sendFavorableList,
      data: this.getNormalizedSendData({
        favorableId: null // Int id such as (productId-contentId-setId)
      }, data),
      resolveCallback: (response) => {
        return response.data.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  sendWatchedContents (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.sendWatchedContents,
      data: this.getNormalizedSendData({
        watchable_id: null, // Int
        seconds_watched: null, // Int
        completely_watched: 0 // 0 : watched completely & 1 : watched completed and second_watched Value is null
      }, data),
      resolveCallback: (response) => {
        return response.data // Array of Null: []
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  sendOldAndroidDatabase (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.settingUserStore,
      data: this.getNormalizedSendData({
        key: null, // String
        value: null // String (JSON stringify)
      }, data),
      resolveCallback: (response) => {
        return {
          status: response
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

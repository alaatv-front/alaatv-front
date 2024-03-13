import { Set } from 'src/models/Set.js'
import { apiV2 } from 'src/boot/axios.js'
import { ProductList } from 'src/models/Product.js'
import APIRepository from '../classes/APIRepository.js'
import { EventResult } from 'src/models/EventResult'

const APIAdresses = {
  base: 'events',
  formBuilder: '/admin/form-builder',
  entekhabReshte: '/entekhab-reshte',
  getInfoByEvent: (eventId) => '/event-result/event/' + eventId,
  eventsProducts: (eventId) => `/events/${eventId}/products`,
  eventAdvisor: (eventId) => `/events/${eventId}/advisor`
}
export default class EventsAPI extends APIRepository {
  constructor () {
    super('Chatr', apiV2, 'chatr', {}, APIAdresses)
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      formBuilder: this.name + this.APIAdresses.formBuilder,
      eventsProducts: (eventId) => this.name + this.APIAdresses.eventsProducts(eventId),
      getInfoByEvent: (eventId) => this.name + this.APIAdresses.getInfoByEvent(eventId),
      eventAdvisor: (eventId) => this.name + this.APIAdresses.eventAdvisor(eventId)
    }
    this.eventList = [
      {
        id: 10,
        name: 'chatre-nejat',
        title: 'چتر نجات',
        logo: 'https://nodes.alaatv.com/upload/landing/chatr/chatr%20logo.png',
        study_plan: {
          category_id: null,
          first_pamphlet: true,
          educational_layers: []
        },
        showDashboard: false,
        showStudyPlan: false,
        groups: [
          'alaa'
        ]
      },
      {
        id: 11,
        name: 'emtahan-nahaee',
        title: 'امتحانات نهایی آلاء',
        logo: 'https://nodes.alaatv.com/upload/landing/chatr/emtahan-nahaee-logo.png',
        study_plan: {
          category_id: null,
          first_pamphlet: true,
          educational_layers: []
        },
        showDashboard: false,
        showStudyPlan: false,
        groups: [
          'alaa'
        ]
      },
      {
        id: 12,
        name: 'emtahan-nahaee-9',
        title: 'امتحانات نهایی نهم',
        logo: 'https://nodes.alaatv.com/upload/landing/41/emtehan-nahayi-nohom-logo.png',
        study_plan: {
          category_id: null,
          first_pamphlet: true,
          educational_layers: []
        },
        showDashboard: false,
        showStudyPlan: false,
        groups: [
          'alaa'
        ]
      },
      {
        id: 22,
        name: 'abrisham2',
        title: 'راه ابریشم ۲',
        logo: 'https://nodes.alaatv.com/upload/landing/RAHABRISHAM/logo-abrisham2.png',
        study_plan: {
          category_id: 1,
          first_pamphlet: true,
          educational_layers: []
        },
        showDashboard: false,
        showStudyPlan: false,
        groups: [
          'alaa'
        ]
      },
      {
        id: 25,
        name: '110',
        title: '110',
        logo: 'https://nodes.alaatv.com/upload/landing/panel/110-logo.png',
        study_plan: {
          category_id: null,
          first_pamphlet: true,
          educational_layers: []
        },
        showDashboard: false,
        showStudyPlan: false,
        groups: [
          'alaa'
        ]
      },
      {
        id: 27,
        name: 'ehsan-abrisham2',
        title: 'راه ابریشم ۲ بنیاد احسان',
        logo: 'https://nodes.alaatv.com/upload/landing/RAHABRISHAM/logo-abrisham2.png',
        study_plan: {
          category_id: null,
          first_pamphlet: true,
          educational_layers: []
        },
        showDashboard: false,
        showStudyPlan: false,
        groups: [
          'emtahan'
        ]
      },
      {
        id: 24,
        name: 'sin8',
        title: 'سین 8',
        logo: 'https://nodes.alaatv.com/upload/landing/SIN8/logo_sin8_2.png',
        study_plan: {
          category_id: 2,
          first_pamphlet: true,
          educational_layers: ['گام اول', 'گام دوم', 'گام سوم']
        },
        showDashboard: true,
        showStudyPlan: true,
        groups: [
          'alaa'
        ]
      }
    ]
  }

  index () {
    return new Promise((resolve, reject) => {
      if (!this.eventList) {
        reject()
      }

      resolve(this.eventList)
    })
  }

  getAlaaPanels () {
    return new Promise((resolve, reject) => {
      if (!this.eventList) {
        reject()
      }

      resolve(this.eventList.filter(item => item.groups.includes('alaa')))
    })
  }

  getEventInfoByName (eventName) {
    return new Promise((resolve, reject) => {
      const event = this.eventList.find(eventItem => eventItem.name === eventName)
      if (!event) {
        reject()
      }

      resolve(event)
    })
  }

  getEventsProducts (data, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.eventsProducts(data.eventId),
      cacheKey: this.CacheList.eventsProducts(data.eventId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new ProductList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      },
      data: data.data
    })
    // const products = new Promise((resolve, reject) => {
    //   const productList = fake.fakeData(product, 5)
    //   resolve(productList)
    // })
    // return products
  }

  formBuilder (data = {}, cache = { TTL: 1000 }) {
    const routeWithParams = function (defaultRoute, payload) {
      if (!Array.isArray(payload.types)) {
        const types = []
        payload.types.forEach(type => {
          types.push(type)
        })
        return defaultRoute.concat('?types[]=', types)
      }
      return defaultRoute + '?types[]=' + payload.types.join('&types[]=')
    }
    const requestRoute = routeWithParams(this.APIAdresses.formBuilder, {
      types: data.params // array or number
    })
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: requestRoute,
      cacheKey: this.CacheList.formBuilder,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return response.data.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getEventsAdvisor (data, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.eventAdvisor(data.eventId),
      cacheKey: this.CacheList.eventAdvisor(data.eventId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new Set(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
    // const products = new Promise((resolve, reject) => {
    //   const productList = fake.fakeData(product, 5)
    //   resolve(productList)
    // })
    // return products
  }

  getKonkurResultByEvent (data = {}, cache = 1000) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getInfoByEvent(data.eventId),
      cacheKey: this.CacheList.getInfoByEvent(data.eventId),
      data: this.getNormalizedSendData({
        user_id: null // Number
      }, data),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new EventResult(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

// const product = {
//   title: null,
//   description: null,
//   teacher: null,
//   photo: null,
//   url: null,
//   lastSeen: {
//     title: null,
//     section: null,
//     url: null
//   }
// }
// const fake = new Fake()

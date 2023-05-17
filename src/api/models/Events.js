import { Set } from 'src/models/Set.js'
import { apiV2 } from 'src/boot/axios.js'
import { ProductList } from 'src/models/Product.js'
import APIRepository from '../classes/APIRepository.js'

const APIAdresses = {
  base: 'events',
  formBuilder: '/admin/form-builder',
  eventsProducts: (eventId) => `/events/${eventId}/products`,
  eventAdvisor: (eventId) => `/events/${eventId}/advisor`
}
export default class EventsAPI extends APIRepository {
  constructor() {
    super('Chatr', apiV2, 'chatr', {}, APIAdresses)
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      formBuilder: this.name + this.APIAdresses.formBuilder,
      eventsProducts: (eventId) => this.name + this.APIAdresses.eventsProducts(eventId),
      eventAdvisor: (eventId) => this.name + this.APIAdresses.eventAdvisor(eventId)
    }
  }

  getEventInfoByName(eventName) {
    const events = [
      {
        id: 10,
        name: 'chatre-nejat',
        logo: 'https://nodes.alaatv.com/upload/landing/chatr/chatr%20logo.png'
      },
      {
        id: 11,
        name: 'emtahan-nahaee',
        logo: 'https://nodes.alaatv.com/upload/landing/chatr/emtahan-nahaee-logo.png'
      },
      {
        id: 12,
        name: 'emtahan-nahaee-9',
        logo: 'https://nodes.alaatv.com/upload/landing/chatr/emtahan-nahaee-logo.png'
      }
    ]
    return new Promise((resolve, reject) => {
      const event = events.find(eventItem => eventItem.name === eventName)
      if (!event) {
        reject()
      }

      resolve(event)
    })
  }

  getEventsProducts(data, cache) {
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

  formBuilder(data = {}, cache = { TTL: 100 }) {
    const routeWithParams = function (defaultRoute, payload) {
      if (!Array.isArray(payload.types)) {
        const types = []
        payload.types.forEach(type => {
          types.push(type)
        })
        return defaultRoute.concat('?types[]=', types)
      }
      return defaultRoute.concat('?types[]=', payload.types)
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

  getEventsAdvisor(data, cache = { TTL: 100 }) {
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

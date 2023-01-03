import APIRepository from '../classes/APIRepository'
import { apiV2 } from 'src/boot/axios'
import { Product } from 'src/models/Product'

export default class ProductAPI extends APIRepository {
  constructor() {
    super('product', apiV2)
    this.APIAdresses = {
      base: '/product',
      create: '/reqres/api/users',
      edit: '/admin/product',
      index: '/admin/product',
      show: (id) => '/product/' + id
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      create: this.name + this.APIAdresses.create,
      show: (id) => this.name + this.APIAdresses.show(id),
      edit: this.name + this.APIAdresses.edit
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new Product(response.data.data) },
      post: (response) => { return new Product(response.data.data) },
      put: (response) => { return new Product(response.data.data) },
      delete: (response) => { return new Product(response.data.data) }
    })
  }

  show(data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.show(data.data.id),
      cacheKey: this.CacheList.show(data.data.id),
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return response.data.data
      },
      rejectCallback: (error) => {
        return error
      },
      data: this.getNormalizedSendData({
        code: null // number - string
      }, data)
    })
  }
}

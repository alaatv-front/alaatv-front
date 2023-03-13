import { apiV2 } from 'src/boot/axios'
import { ContentList } from 'src/models/Content.js'
import APIRepository from '../classes/APIRepository.js'
import { Product, ProductList } from 'src/models/Product.js'

export default class ProductAPI extends APIRepository {
  constructor() {
    super('product', apiV2)
    this.APIAdresses = {
      base: '/product',
      create: '/reqres/api/users',
      edit: '/admin/product',
      index: '/admin/product',
      favored: (id) => id + '/favored',
      unfavored: (id) => '/product/' + id + '/unfavored',
      show: (id) => '/product/' + id,
      gifts: (id) => '/gift-products/' + id,
      sampleContent: (id) => '/product/' + id + '/sample'
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      create: this.name + this.APIAdresses.create,
      favored: id => this.name + this.APIAdresses.favored(id),
      unfavored: id => this.name + this.APIAdresses.unfavored(id),
      show: (id) => this.name + this.APIAdresses.show(id),
      gifts: (id) => this.name + this.APIAdresses.gifts(id),
      sampleContent: (id) => this.name + this.APIAdresses.sampleContent(id),
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

  show(productId, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.show(productId),
      cacheKey: this.CacheList.show(productId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new Product(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  gifts(productId, cache = { TTL: 100 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.gifts(productId),
      cacheKey: this.CacheList.gifts(productId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new ProductList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  sampleContent(productId, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.sampleContent(productId),
      cacheKey: this.CacheList.sampleContent(productId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new ContentList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  favoredProduct(data = {}, cache = { TTL: 100 }) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.favored(data),
      cacheKey: this.CacheList.favored(data),
      ...(cache !== undefined && { cache }),
      resolveCallback: (response) => {
        return response.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  unfavoredProduct(data = {}, cache = { TTL: 100 }) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.unfavored(data),
      cacheKey: this.CacheList.unfavored(data),
      ...(cache !== undefined && { cache }),
      resolveCallback: (response) => {
        return response.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

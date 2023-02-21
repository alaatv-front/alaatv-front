import APIRepository from '../classes/APIRepository'
import { apiV2 } from 'src/boot/axios'
import { Cart } from 'src/models/Cart'

export default class CartAPI extends APIRepository {
  constructor() {
    super('cart', apiV2, '/orderproduct', new Cart())
    this.APIAdresses = {
      orderProduct: '/orderproduct',
      discountSubmit: '/order/submitCoupon',
      discountRemove: '/order/RemoveCoupon',
      review: '/checkout/review',
      removeItem: (orderProductId) => '/orderproduct/' + orderProductId
    }
    this.CacheList = {
      orderProduct: this.name + this.APIAdresses.orderProduct,
      discountSubmit: this.name + this.APIAdresses.discountSubmit,
      discountRemove: this.name + this.APIAdresses.discountRemove,
      review: this.name + this.APIAdresses.review,
      removeItem: id => this.name + this.APIAdresses.removeItem(id)
    }
  }

  orderProduct(data = {}, cache) {
    const payload = {
      product_id: data.product_id, // Number or String
      products: data.products, // Number or String (List ofProduct's ID)
      attribute: data.attribute, // Number or String
      seller: 1 // 1: Alaa - 2: Soala
    }
    if (!payload.products) {
      delete payload.products
    }
    if (!payload.attribute) {
      delete payload.attribute
    }
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.orderProduct,
      cacheKey: this.CacheList.orderProduct,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      },
      data: payload
    })
  }

  discountSubmit(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.discountSubmit,
      cacheKey: this.CacheList.discountSubmit,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      },
      params: data.params
    })
  }

  discountRemove(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.discountRemove,
      cacheKey: this.CacheList.discountRemove,
      ...(!!data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  review(data = {}, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.review,
      cacheKey: this.CacheList.review,
      ...(cache !== undefined && { cache }),
      resolveCallback: (response) => {
        return new Cart(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      },
      params: this.paramSerializer(data.params)
    }
    )
  }

  removeItem(orderProductId, cache) {
    return this.sendRequest({
      apiMethod: 'delete',
      api: this.api,
      request: this.APIAdresses.removeItem(orderProductId),
      cacheKey: this.CacheList.removeItem(orderProductId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new Cart(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

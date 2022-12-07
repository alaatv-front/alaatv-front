import APIRepository from "../classes/APIRepository"
import { apiV1, apiV2, apiWeb } from "src/boot/axios";
import { Cart } from 'src/models/Cart';


export default class CartAPI extends APIRepository {
  constructor() {
    super('cart', apiV2, '/orderproduct', new Cart())
    this.APIAdresses = {
      orderProduct: '/orderproduct',
      discountSubmit: '/order/submitCoupon',
      discountRemove: '/order/RemoveCoupon',
      review: '/checkout/review'
    }
    this.CacheList = {
      orderProduct: this.name + this.APIAdresses.orderProduct,
      discountSubmit: this.name + this.APIAdresses.discountSubmit,
      discountRemove: this.name + this.APIAdresses.discountRemove,
      review: this.name + this.APIAdresses.review,
    }
  }
  orderProduct(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.orderProduct,
      cacheKey: this.CacheList.orderProduct,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      },
      data: this.getNormalizedSendData({
        product_id: null, // Number or String
        products: null, // Number or String (List ofProduct's ID)
        attribute: null, // Number or String
        seller: 1 // 1: Alaa - 2: Soala
      },data.data)
    });
  }
  discountSubmit(data={}) {
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
    });
  }
  discountRemove(data={}) {
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
    });
  }
  review(data={}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.review,
      cacheKey: this.CacheList.review,
      ...(data.cache !== undefined && { cache: data.cache }),
      resolveCallback: (response) => {
        return new Cart(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    });
  }
}

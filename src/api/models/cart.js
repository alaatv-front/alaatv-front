import APIRepository from "../classes/APIRepository"
import { apiV1, apiV2, apiWeb } from "src/boot/axios";
import { Cart } from 'src/models/Cart';


export default class CartAPI extends APIRepository {
  constructor() {
    super(apiV2,'/orderproduct', new Cart())
    this.APIAdresses = {
      orderProduct: '/orderproduct',
      discountSubmit: '/order/submitCoupon',
      discountRemove: '/order/RemoveCoupon',
      review: '/checkout/review'
    }
  }
  orderProduct(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.mobileResend,
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
      },data)
    });
  }
  discountSubmit(params) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.discountSubmit,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      },
      params
    });
  }
  discountRemove() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.discountRemove,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    });
  }
  review()  {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.review,
      resolveCallback: (response) => {
        return new Cart(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    });
  }
}

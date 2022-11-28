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
  orderProduct() {
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
  discountSubmit() {
    return new APIInstanceWrapper(apiV2, '/order/submitCoupon')
  }
  discountRemove() {
    return new APIInstanceWrapper(apiV2, '/order/RemoveCoupon')
  }
  review()  {
    return new APIInstanceWrapper(apiV2, '/checkout/review')
  }
}

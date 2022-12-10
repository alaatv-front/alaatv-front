import APIRepository from '../classes/APIRepository'
import { apiV2 } from 'src/boot/axios'

export default class CouponAPI extends APIRepository {
  constructor() {
    super('coupon', apiV2)
    this.APIAddresses = {
      create: '/v2/admin/coupon',
      edit: '',
      index: '/admin/coupon',
      show: '/v2/admin/coupon/10'
    }
  }
}

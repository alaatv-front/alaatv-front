import { apiV2 } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class VoucherAPI extends APIRepository {
  constructor() {
    super('voucher', apiV2)
    this.APIAdresses = {
      Vouchers: {
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
  }
}

import { apiV2 } from 'src/boot/axios.js'
import { ProductList } from 'src/models/Product.js'
import APIRepository from '../classes/APIRepository.js'

export default class VoucherAPI extends APIRepository {
  constructor () {
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
      },
      submit: '/voucher/submit'
    }
  }

  submit (data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.submit,
      data,
      resolveCallback: (response) => {
        return {
          message: response.data.message, // string message
          products: new ProductList(response.data.products)
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

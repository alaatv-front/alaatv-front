import { apiV2 } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class TeleMarketingAPI extends APIRepository {
  constructor () {
    super('teleMarketing', apiV2)
    this.APIAdresses = {
      create: '/admin/user',
      edit: '/admin/user',
      index: '/admin/user',
      show: '/admin/user'
    }
  }
}

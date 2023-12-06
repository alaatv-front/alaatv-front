import { apiV2 } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class YaldaAPI extends APIRepository {
  constructor () {
    super('Yalda', apiV2)
    this.APIAdresses = {
      yaldaWallet: '/yalda-1402/wallet'
    }
    this.CacheList = {
      yaldaWallet: this.name + this.APIAdresses.yaldaWallet
    }
  }

  participate () {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.yaldaWallet,
      resolveCallback: (response) => {
        return {
          code: response.data.data?.code,
          amount: response.data.data?.amount
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

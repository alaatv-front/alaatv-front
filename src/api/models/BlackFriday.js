import { apiV2 } from 'src/boot/axios.js'
import { Coupon } from 'src/models/Coupon.js'
import APIRepository from '../classes/APIRepository.js'
import { BlackFridayCampaignData } from 'src/models/BlackFridayCampaignData.js'

export default class BlackFridayAPI extends APIRepository {
  constructor() {
    super('conductor', apiV2)
    this.APIAdresses = {
      campaignData: '/black-friday/campaign-data',
      coupon: '/black-friday/coupon',
      reward: '/black-friday/reward'
    }
    this.CacheList = {
      campaignData: this.name + this.APIAdresses.campaignData
    }
  }

  getCampaignData (cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.campaignData,
      cacheKey: this.CacheList.campaignData,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new BlackFridayCampaignData(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  participateInLottery (cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.reward,
      resolveCallback: (response) => {
        return {
          code: response.data.data?.code,
          message: response.data.data?.message || '',
          coupon: new Coupon(response.data.data?.coupon)
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getCouponByWatchVideo (data, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.coupon,
      data: this.getNormalizedSendData({
        content_id: null, // Number
        token: '' // String
      }, data),
      resolveCallback: (response) => {
        return new Coupon(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

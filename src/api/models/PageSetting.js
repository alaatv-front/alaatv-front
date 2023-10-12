import { apiV2 } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { PageSetting, PageSettingList } from 'src/models/PageSetting.js'

export default class PageSettingAPI extends APIRepository {
  constructor() {
    super('page-setting', apiV2)
    this.serviceId = 1
    this.APIAdresses = {
      base: '/admin/setting',
      getWithKey: (key) => '/setting/' + key,
      updateWithKey: (key) => '/admin/setting/' + key
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      getWithKey: (key) => this.name + this.APIAdresses.getWithKey(key)
    }
  }

  index (data, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      cacheKey: this.CacheList.base,
      data: { service_id: this.serviceId },
      ...(cache !== undefined && { cache }),
      resolveCallback: (response) => {
        return {
          referralCodeList: new PageSettingList(response.data.data),
          paginate: response.data.meta
          // {
          //   current_page: 1,
          //   from: 1,
          //   last_page: 1,
          //   path: '...',
          //   per_page: 15,
          //   to: 10,
          //   total: 10
          // }
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  create (data) {
    const formData = new FormData()
    formData.append('key', data.key)
    formData.append('value', data.value)
    formData.append('service_id', this.serviceId)
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.base,
      data: formData,
      resolveCallback: (response) => {
        return response.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  update (data) {
    const settingKey = encodeURI(data.key)
    const settingValue = data.value
    const formData = new FormData()
    formData.append('value', settingValue)
    formData.append('service_id', this.serviceId)
    formData.append('_method', 'PUT')
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.updateWithKey(settingKey),
      data: formData,
      resolveCallback: (response) => {
        return response.data.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  get (data, cache = { TTL: 300000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getWithKey(encodeURI(data)),
      cacheKey: this.CacheList.getWithKey(encodeURI(data)),
      data: { service_id: this.serviceId },
      ...(cache !== undefined && { cache }),
      resolveCallback: (response) => {
        return new PageSetting(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getMenuItems (data, cache = { TTL: 300000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getWithKey(encodeURI(data)),
      cacheKey: this.CacheList.getWithKey(encodeURI(data)),
      data: { service_id: this.serviceId },
      ...(cache !== undefined && { cache }),
      resolveCallback: (response) => {
        return response.data.data.value
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

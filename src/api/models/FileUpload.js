import { apiV2 } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class FileUploadAPI extends APIRepository {
  constructor () {
    super('file-upload', apiV2)
    this.serviceId = 1
    this.APIAdresses = {
      base: '/admin/upload'
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base
    }
  }

  upload (data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      resolveCallback: (response) => {
        return response.data.data.url // String presigned URL of file
      },
      rejectCallback: (error) => {
        return error
      },
      data: this.getNormalizedSendData({
        key: null // file with type(type.mp4)
      }, data)
    })
  }
}

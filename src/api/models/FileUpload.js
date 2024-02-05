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

  uploadFile (presignedUrl, file, onUploadProgress = () => {}) {
    // https://www.npmjs.com/package/axios#-progress-capturing
    // onUploadProgress: function (axiosProgressEvent) {
    //   /*{
    //     loaded: number;
    //     total?: number;
    //     progress?: number; // in range [0..1]
    //     bytes: number; // how many bytes have been transferred since the last trigger (delta)
    //     estimated?: number; // estimated time in seconds
    //     rate?: number; // upload speed in bytes
    //     upload: true; // upload sign
    //   }*/
    // },
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: presignedUrl,
      options: {
        baseURL: '',
        headers: {
          'Content-Type': file.type
        },
        transformRequest: (data, headers) => {
          if (headers.common && headers.common.Authorization) {
            delete headers.common.Authorization
          }
          if (headers.Authorization) {
            delete headers.Authorization
          }

          return data
        },
        onUploadProgress
      },
      resolveCallback: (response) => {
        return response.data.data.url // String presigned URL of file
      },
      rejectCallback: (error) => {
        return error
      },
      data: file
    })
  }
}

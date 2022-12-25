import { axios } from 'src/boot/axios'

export default class GetWidgetsData {
  static _requests = []

  static hasThisRequest (url) {
    return !!this.getRequest(url)
  }

  static addToRequests (url) {
    this._requests.push({
      url,
      promise: new Promise(function(_resolve, _reject) {
        axios.get(url)
          .then(response => {
            _resolve(response)
          })
          .catch((error) => {
            _reject(error)
          })
      })
    })
  }

  static getRequest (url) {
    return this._requests.find(request => request.url === url)
  }

  static getData (url) {
    if (!this.hasThisRequest(url)) {
      this.addToRequests(url)
    }

    return this.getRequest(url).promise
  }
}

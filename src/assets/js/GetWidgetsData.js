export default class GetWidgetsData {
  static _requests = []

  static hasThisRequest (url) {
    return !!this.getRequest(url)
  }

  static addToRequests (axios, url) {
    this._requests.push({
      url,
      promise: new Promise(function(myResolve, myReject) {
        axios.get(url)
          .then(response => {
            myResolve(response)
          })
          .catch((error) => {
            myReject(error)
          })

      })
    })
  }

  static getRequest (url) {
    return this._requests.find(request => request.url === url)
  }

  static getData (axios, url) {
    if (!this.hasThisRequest(url)) {
      this.addToRequests(axios, url)
    }

    return this.getRequest(url).promise
  }
}

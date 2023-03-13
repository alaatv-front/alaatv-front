import axios from 'axios'

// let fetch
// if (typeof window === 'undefined') {
//   console.log('fetch', fetch)
// //   import('node-fetch')
// //     .then((Fetch) => {
// //       fetch = Fetch
// //     })
// }

const cache = []
const timeout = 0
/* It's a wrapper for the API instance that allows you to call the API instance's methods in a more
readable way */
export default class APIInstanceWrapper {
  static createInstance (baseURL, serverURL) {
    const isInServer = typeof window === 'undefined'
    if (!isInServer) {
      const axiosInstance = axios.create({ baseURL })
      axiosInstance.defaults.serverURL = serverURL

      return axiosInstance
    }
    const axiosInstance = axios.create({ baseURL: serverURL })
    // axiosInstance.defaults.serverURL = serverURL

    return axiosInstance

    // const fetchInstance = function (baseURL, serverURL) {
    //   const defaults = {
    //     baseURL,
    //     serverURL,
    //     headers: { 'Content-Type': 'application/json' }
    //   }
    //   const get = (url) => new Promise((resolve, reject) => {
    //     const requestAddress = defaults.serverURL + url
    //     fetch(requestAddress, {
    //       method: 'GET',
    //       headers: defaults.headers
    //     })
    //       .then(response => {
    //         response.json()
    //           .then(data => {
    //             resolve({ data })
    //           })
    //           .catch(error => {
    //             reject(error)
    //           })
    //       })
    //       .catch(error => {
    //         reject(error)
    //       })
    //   })
    //   const post = (url, data) => new Promise((resolve, reject) => {
    //     fetch(defaults.serverURL + url, {
    //       method: 'POST',
    //       body: JSON.stringify(data),
    //       headers: defaults.headers
    //     })
    //       .then(response => {
    //         response.json()
    //           .then(data => {
    //             resolve(data)
    //           })
    //           .catch(error => {
    //             reject(error)
    //           })
    //       })
    //       .catch(error => {
    //         reject(error)
    //       })
    //   })
    //   const put = (url, data) => new Promise((resolve, reject) => {
    //     fetch(defaults.serverURL + url, {
    //       method: 'PUT',
    //       body: JSON.stringify(data),
    //       headers: defaults.headers
    //     })
    //       .then(response => {
    //         response.json()
    //           .then(data => {
    //             resolve(data)
    //           })
    //           .catch(error => {
    //             reject(error)
    //           })
    //       })
    //       .catch(error => {
    //         reject(error)
    //       })
    //   })
    //   const deleteMethod = (url) => new Promise((resolve, reject) => {
    //     fetch(defaults.serverURL + url, {
    //       method: 'DELETE',
    //       headers: defaults.headers
    //     })
    //       .then(response => {
    //         response.json()
    //           .then(data => {
    //             resolve(data)
    //           })
    //           .catch(error => {
    //             reject(error)
    //           })
    //       })
    //       .catch(error => {
    //         reject(error)
    //       })
    //   })
    //
    //   return {
    //     put,
    //     get,
    //     post,
    //     defaults,
    //     delete: deleteMethod
    //   }
    // }
    //
    // return fetchInstance(baseURL, serverURL)
  }

  static getRequest(req, option) {
    if (req === 'get') {
      return option.api.get(option.request, { params: option.data, timeout })
    } else if (req === 'post') {
      return option.api.post(option.request, option.data)
    } else if (req === 'put') {
      return option.api.put(option.request, option.data)
    } else if (req === 'delete') {
      return option.api.delete(option.request)
    }
  }

  static requestCache(method, option) {
    if (!!option.cache && !!option.cache.TTL) {
      if (option.cache.fresh) {
        const response = this.getRequest(method, option)
        const expiration = Date.now() + option.cache.TTL
        cache[option.cacheKey] = {
          response,
          expiration
        }
        return response
      } else {
        if (cache[option.cacheKey]) {
          if (Date.now() < cache[option.cacheKey].expiration) {
            return cache[option.cacheKey].response
          } else {
            this.purgeRequest(option.cacheKey)
            const response = this.getRequest(method, option)
            const expiration = Date.now() + option.cache.TTL
            cache[option.cacheKey] = {
              response,
              expiration
            }
            return response
          }
        } else {
          const response = this.getRequest(method, option)
          const expiration = Date.now() + option.cache.TTL
          cache[option.cacheKey] = {
            response,
            expiration
          }
          return response
        }
      }
    } else {
      if (cache[option.cacheKey]) {
        if (Date.now() < cache[option.cacheKey].expiration) {
          return cache[option.cacheKey].response
        } else {
          this.purgeRequest(option.cacheKey)
          const response = this.getRequest(method, option)
          return response
        }
      } else {
        return this.getRequest(method, option)
      }
    }
  }

  static get(option) {
    return this.requestCache('get', option)
  }

  static post(option) {
    return this.requestCache('post', option)
  }

  static put(option) {
    return this.requestCache('put', option)
  }

  static delete(option) {
    return this.requestCache('delete', option)
  }

  static purgeRequest(key) {
    delete cache[key]
  }
}

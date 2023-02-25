const cache = []
/* It's a wrapper for the API instance that allows you to call the API instance's methods in a more
readable way */
export default class APIInstanceWrapper {
  static getRequest(req, option) {
    if (req === 'get') {
      return option.api.get(option.request, { params: option.data })
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

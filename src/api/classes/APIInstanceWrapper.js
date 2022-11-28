/* It's a wrapper for the API instance that allows you to call the API instance's methods in a more
readable way */
export default class APIInstanceWrapper {
  static get(option) {
    return option.api.get(option.request)
  }
  static post(option) {
    return option.api.post(option.request, option.data)
  }
  static put(option) {
    return option.api.post(option.request, option.data)
  }
  static delete(option) {
    return option.api.get(option.request)
  }
}

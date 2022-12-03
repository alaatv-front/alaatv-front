/* It's a class that wraps the APIInstanceWrapper class and provides a simple interface for making CRUD
requests to a RESTful API */
import APIInstanceWrapper from './APIInstanceWrapper'
export default class APIRepository {
  constructor(api, urlAddress, model) {
    this.api = api
    this.url = urlAddress
    this.model = model
  }

  /**
   * It takes in a requestData object, and returns a promise that resolves to the result of the
   * resolveCallback function, or rejects to the result of the rejectCallback function
   * @param requestData - {
   * @returns A promise that will resolve or reject based on the response from the API call.
   */
  sendRequest (requestData) {
    const {apiMethod, api, request, resolveCallback, rejectCallback, data, params} = requestData
    return new Promise((resolve, reject)=>{
      APIInstanceWrapper[apiMethod]({
        api,
        request,
        params,
        data
      })
      .then((response)=>{
        resolve(resolveCallback(response))
      })
      .catch((error)=>{
        reject(rejectCallback(error))
      })
    })
  }

  /**
   * It takes two objects, merges them, and returns the merged object
   * @param defaultData - The default data that will be sent to the server.
   * @param data - The data to be sent to the server.
   * @returns The defaultSendData is being returned.
   */
  getNormalizedSendData (defaultData, data) {
    const defaultSendData = Object.assign(defaultData, data)
    return defaultSendData
  }

  /**
   * It sets the callbacks for the CRUD operations.
   * @param callbacks - an object with the following properties:
   */
  setCrudCallbacks (callbacks) {
    this.getResolveCallback = callbacks.get ? callbacks.get : (response) => { return response }
    this.postResolveCallback = callbacks.post ? callbacks.post : (response) => { return response }
    this.putResolveCallback = callbacks.put ? callbacks.put : (response) => { return response }
    this.deleteResolveCallback = callbacks.delete ? callbacks.delete : (response) => { return response }
  }


  /**
   * This function sends a GET request to the API endpoint for the entity, and returns the response
   * @param entityId - The id of the entity you want to get.
   * @returns The response from the server.
   */
  get(entityId) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.restUrl(entityId),
      resolveCallback: (response) => {
        return this.getResolveCallback(response)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
  /**
   * It sends a POST request to the API, and returns the response
   * @param entityData - The data that will be sent to the API.
   * @returns The return value of the sendRequest function.
   */
  post(entityData) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.baseUrl,
      resolveCallback: (response) => {
        return this.postResolveCallback(response)
      },
      rejectCallback: (error) => {
        return error
      },
      data: new User(entityData)
    })
  }
  /**
   * The function sends a PUT request to the API, and returns the response
   * @param entityData - The data to be sent to the server.
   * @returns The return value of the sendRequest function.
   */
  put(entityData) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.restUrl(entityData.id),
      resolveCallback: (response) => {
        return this.putResolveCallback(response)
      },
      rejectCallback: (error) => {
        return error
      },
      data: new User(entityData)
    })
  }
 /**
  * It deletes an entity.
  * @param entityId - The id of the entity you want to delete.
  * @returns The promise object.
  */
  delete(entityId) {
    return this.sendRequest({
      apiMethod: 'delete',
      api: this.api,
      request: this.restUrl(entityId),
      resolveCallback: (response) => {
        return this.deleteResolveCallback(response)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

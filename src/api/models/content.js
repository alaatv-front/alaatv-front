import APIRepository from "../classes/APIRepository"
import { apiV1, apiV2, apiWeb } from "src/boot/axios";
import { Content } from "src/models/Content";

export default class ContentAPI extends APIRepository {
  constructor() {
    super('content', apiV2)
    this.APIAdresses = {
      admin: '/c/',
      show: (id) => '/c/' + id,
      search: '/search'
    }
    this.CacheList = {
      admin: this.name + this.APIAdresses.admin,
      show: id => this.name + this.APIAdresses.show(id),
      search: this.name + this.APIAdresses.search,
    }
  }

  show(data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.search,
      cacheKey: this.CacheList.orderProduct,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return new Content(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    });
  }
  search(data={}){
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.search,
      cacheKey: this.CacheList.orderProduct,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return {
          sets: response.data.data.sets,
          products: response.data.data.products,
          videos: response.data.data.videos
        }
      },
      rejectCallback: (error) => {
        return error
      }
    });
  }
}

import APIRepository from "../classes/APIRepository"
import { apiV1, apiV2, apiWeb } from "src/boot/axios";
import { BlockList } from "src/models/Block";

export default class PagesAPI extends APIRepository {
  constructor() {
    super('pages', apiV2)
    this.APIAdresses = {
      home: '/home',
      shop: '/shop'
    }
    this.CacheList = {
      home: this.name + this.APIAdresses.home,
      shop: this.name + this.APIAdresses.shop,
    }
  }

  home(data={}){
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.home,
      cacheKey: this.CacheList.home,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return new BlockList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    });
  }
  shop(data={}){
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.shop,
      cacheKey: this.CacheList.shop,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return new BlockList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    });
  }
}

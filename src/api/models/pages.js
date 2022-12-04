import APIRepository from "../classes/APIRepository"
import { apiV1, apiV2, apiWeb } from "src/boot/axios";
import { BlockList } from "src/models/Block";

export default class PagesAPI extends APIRepository {
  constructor() {
    super(apiV2)
    this.APIAdresses = {
      home: '/home',
      shop: '/shop'
    }
  }

  home(){
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.home,
      resolveCallback: (response) => {
        return new BlockList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    });
  }
  shop(){
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.shop,
      resolveCallback: (response) => {
        return new BlockList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    });
  }
}

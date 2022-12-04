import APIRepository from "../classes/APIRepository"
import { apiV1, apiV2, apiWeb } from "src/boot/axios";

export default class ProductAPI extends APIRepository {
  constructor() {
    super(apiV2)
    this.APIAdresses = {
      create: '/reqres/api/users',
      edit: '/admin/product',
      index: '/admin/product',
      show: '/product'
    }
  }
}

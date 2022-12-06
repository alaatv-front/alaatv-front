import APIRepository from "../classes/APIRepository"
import { apiV1, apiV2, apiWeb } from "src/boot/axios";
import { Product } from "src/models/Product";

export default class ProductAPI extends APIRepository {
  constructor() {
    super('product', apiV2)
    this.APIAdresses = {
      create: '/reqres/api/users',
      edit: '/admin/product',
      index: '/admin/product',
      show:(id) => '/product/' + id
    }
  }
}

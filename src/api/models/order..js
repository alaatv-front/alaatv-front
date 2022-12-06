import APIRepository from "../classes/APIRepository";
import { apiV1, apiV2, apiWeb } from "src/boot/axios";

export default class OrderAPI extends APIRepository {
  constructor() {
    super('order',apiV2)
    this.APIAdresses = {
      create: '/reqres/api/users',
      edit: '/admin/order',
      index: '/admin/order',
      show: '/admin/order'
    }
  }
}

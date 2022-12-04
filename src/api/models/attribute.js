import APIRepository from "../classes/APIRepository"
import { apiV1, apiV2, apiWeb } from "src/boot/axios";

export default class AttributeAPI extends APIRepository {
  constructor() {
    super(apiV2, '/admin/user')
    this.APIAddresses = {
      management: '/admin/user',
      value: '/admin/user'
    }
  }
}

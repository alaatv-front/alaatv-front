import APIRepository from "../classes/APIRepository"
import { apiV1, apiV2, apiWeb } from "src/boot/axios";

export default class TicketAPI extends APIRepository {
  constructor() {
    super('ticket', apiV2, '/ticket')
    this.APIAdresses = {
      base: '/ticket'
    }
    this.restUrl = (id) => this.url + '/' + id
  }
}

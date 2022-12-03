import APIRepository from "../classes/APIRepository";
import { apiV1, apiV2, apiWeb } from "src/boot/axios";

export default class StudyPlanAPI extends APIRepository {
  constructor() {
    super(apiV2,'/plan')
    this.APIAdresses = {
      plan: '/plan'
    }
    /* Setting the callback functions for the CRUD operations. */
    // this.setCrudCallbacks({
    //   get: (response) => { return new User(response.data.data)},
    //   post: (response) => { return new User(response.data.data)},
    //   put: (response) => { return new User(response.data.data)},
    //   delete: (response) => { return new User(response.data.data)}
    // })
  }
}

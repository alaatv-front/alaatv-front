import APIRepository from "../classes/APIRepository"
import { apiV1, apiV2, apiWeb } from "src/boot/axios";
import { User } from "src/models/User";

export default class AuthAPI extends APIRepository {
  constructor() {
    super(apiV2)
    this.APIAdresses = {
      login: '/login'
    }

  }

  login(data){
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.login,
      resolveCallback: (response) => {
        return {
          user: new User(response.data.data.user),
          token: response.data.data.token
        }
      },
      rejectCallback: (error) => {
        return error
      },
      data: this.getNormalizedSendData({
        mobile: null, // String
        password: null // Valid Password
      },data)
    });
  }
}

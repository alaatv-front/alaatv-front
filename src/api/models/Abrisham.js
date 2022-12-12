import APIRepository from '../classes/APIRepository'
import { apiV2 } from 'src/boot/axios'
import { ContentList } from 'src/models/Content'

export default class AbrishamAPI extends APIRepository {
  constructor() {
    super('abrisham', apiV2)
    this.APIAdresses = {
      lesson: '/abrisham/lessons',
      userLastState: (id) => '/product/' + id + '/toWatch',
      sets: (id) => '/product/' + id + '/sets',
      contents: (id) => '/set/' + id + '/contents'

    }
    this.restUrl = (id) => this.url + '/' + id
  }

  getLessons() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.lesson,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getUserLastState(id) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.userLastState(id),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  requestToGetSets(id) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.sets(id),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  requestToGetContents(id) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.contents(id),
      resolveCallback: (response) => {
        return new ContentList(response.data.data)
      },
      rejectCallback: () => {
        return new ContentList()
      }
    })
  }
}

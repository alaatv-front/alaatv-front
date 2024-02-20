import { apiV2 } from 'src/boot/axios.js'
import { Content } from 'src/models/Content.js'
import APIRepository from '../classes/APIRepository.js'
import { AbrishamMajorList } from 'src/models/AbrishamMajor'

const APIAdresses = {
  majors: '/abrisham/majors',
  lesson: '/abrisham/lessons',
  counter: '/konkur1403Countdown',
  karvan: '/abrisham/whereIsKarvan'
}
export default class AbrishamAPI extends APIRepository {
  constructor () {
    super('abrisham', apiV2, '', '', APIAdresses)

    this.CacheList = {
      counter: this.name + this.APIAdresses.counter,
      getOptions: this.name + this.APIAdresses.getOptions
    }

    this.restUrl = (id) => this.url + '/' + id
  }

  whereIsKarvan (data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.karvan,
      resolveCallback: (response) => {
        return new Content(response.data)
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  getLessons (isPro) {
    const data = {}
    if (isPro) {
      data.isPro = 1
    }
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.lesson,
      data,
      resolveCallback: (response) => {
        return new AbrishamMajorList(response.data.data).list
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getCounter (cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.counter,
      cacheKey: this.CacheList.counter,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return {
          now: response.data.data?.now,
          tillFirstTurn: response.data.data?.tillFirstTurn,
          tillSecondTurn: response.data.data?.tillSecondTurn
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

import { apiV2 } from 'src/boot/axios.js'
import { Content } from 'src/models/Content.js'
import APIRepository from '../classes/APIRepository.js'
import { AbrishamMajorList } from 'src/models/AbrishamMajor'

const APIAdresses = {
  majors: '/abrisham/majors',
  lesson: '/abrisham/lessons',
  counter: '/konkur1403Countdown',
  karvan: '/abrisham/whereIsKarvan',
  systemReport: '/abrisham/systemReport',
  getOptions: '/abrisham/selectPlan/create'
}
export default class AbrishamAPI extends APIRepository {
  constructor () {
    super('abrisham', apiV2, '', '', APIAdresses)

    this.CacheList = {
      counter: this.name + this.APIAdresses.counter,
      getOptions: this.name + this.APIAdresses.getOptions,
      systemReport: this.name + this.APIAdresses.systemReport
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

  getReports (cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.systemReport,
      cacheKey: this.CacheList.systemReport,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return response.data.data // List of reviews(reports)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getOptions (cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getOptions,
      cacheKey: this.CacheList.getOptions,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return {
          grades: response.data?.data?.grades, // list of grades [{id,title}]
          majors: response.data?.data?.majors, // list of majors [{id,title}]
          studyPlans: response.data?.data?.studyPlans // List of studyPlans [{id,title}]
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

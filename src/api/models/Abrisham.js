import { apiV2 } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { Content } from 'src/models/Content.js'
import { AbrishamMajorList } from 'src/models/AbrishamMajor'
import { StudyPlan } from 'src/models/StudyPlan'
const APIAdresses = {
  lesson: '/abrisham/lessons',
  majors: '/abrisham/majors',
  karvan: '/abrisham/whereIsKarvan',
  counter: '/konkur1403Countdown',
  systemReport: '/abrisham/systemReport',
  myStudyPlan: '/abrisham/myStudyPlan',
  getOptions: '/abrisham/selectPlan/create',
  findStudyPlan: '/abrisham/findStudyPlan'
}
export default class AbrishamAPI extends APIRepository {
  constructor () {
    super('abrisham', apiV2, '', '', APIAdresses)

    this.CacheList = {
      counter: this.name + this.APIAdresses.counter,
      systemReport: this.name + this.APIAdresses.systemReport,
      getOptions: this.name + this.APIAdresses.getOptions,
      findStudyPlan: this.name + this.APIAdresses.findStudyPlan
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

  submitStudyPlan (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.myStudyPlan,
      resolveCallback: (response) => {
        return response.data?.data // string message
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  findMyStudyPlan (data = {}, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.findStudyPlan,
      cacheKey: this.CacheList.findStudyPlan,
      ...(cache && { cache }),
      data,
      resolveCallback: (response) => {
        return new StudyPlan(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

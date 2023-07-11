import APIRepository from '../classes/APIRepository'
import { apiV2 } from 'src/boot/axios'
import { StudyPlan, StudyPlanList } from 'src/models/StudyPlan'

export default class StudyPlanAPI extends APIRepository {
  constructor() {
    super('studyPlan', apiV2, '/plan', new StudyPlan())
    this.APIAdresses = {
      plan: '/plan',
      studyEvent: (id) => '/studyEvent/' + id + '/studyPlans',
      getPlans: (id) => '/studyPlan/' + id + '/plans',
      planOptions: '/abrisham/selectPlan/create',
      myStudyPlan: '/abrisham/myStudyPlan',
      StudyPlan: '/studyPlan'
    }
    this.CacheList = {
      studyEvent: (id) => this.name + this.APIAdresses.studyEvent(id),
      getPlans: (id) => this.name + this.APIAdresses.getPlans(id),
      StudyPlan: this.name + this.APIAdresses.StudyPlan
    }
  }

  getStudyEvents(id, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.studyEvent(id),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new StudyPlanList(response.data.data)
      },
      rejectCallback: () => {
        return new StudyPlanList()
      }
    })
  }

  getPlans(id, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getPlans(id),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new StudyPlanList(response.data.data)
      },
      rejectCallback: () => {
        return new StudyPlanList()
      }
    })
  }

  getChangePlanOptions() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.planOptions,
      resolveCallback: (response) => {
        return {
          grades: response.data.data.grades ? response.data.data.grades : [],
          majors: response.data.data.majors ? response.data.data.majors : [],
          studyPans: response.data.data.studyPans ? response.data.data.studyPans : []
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getMyStudyPlan() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.myStudyPlan,
      resolveCallback: (response) => {
        return {
          id: response.data.data?.id,
          title: response.data.data?.title,
          passed_days: response.data.data?.passed_days,
          count_of_watched_sessions: response.data.data?.count_of_watched_sessions,
          count_of_remained_sessions: response.data.data?.count_of_remained_sessions
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getStudyPlans(data, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.StudyPlan,
      cacheKey: this.CacheList.StudyPlan,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new StudyPlanList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }
}

import { apiV2 } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { WebsiteSetting } from 'src/models/WebsiteSetting.js'
import { StudyPlan, StudyPlanList } from 'src/models/StudyPlan.js'

export default class StudyPlanAPI extends APIRepository {
  constructor() {
    super('studyPlan', apiV2, '/plan', new StudyPlan())
    this.APIAdresses = {
      plan: '/plan',
      studyEvent: (id) => '/studyEvent/' + id + '/studyPlans',
      getPlans: (id) => '/studyPlan/' + id + '/plans',
      studyEventReport: (id) => `/study-event-report/${id}/mark-as-read`,
      planOptions: '/abrisham/selectPlan/create',
      myStudyPlan: '/abrisham/myStudyPlan',
      studyPlan: '/studyPlan',
      setting: 'website-setting/user'
    }
    this.CacheList = {
      studyEvent: (id) => this.name + this.APIAdresses.studyEvent(id),
      getPlans: (id) => this.name + this.APIAdresses.getPlans(id),
      studyPlan: this.name + this.APIAdresses.studyPlan,
      studyEventReport: (id) => this.name + this.APIAdresses.studyEventReport(id),
      StudyPlan: this.name + this.APIAdresses.StudyPlan,
      planOptions: this.name + this.APIAdresses.planOptions,
      myStudyPlan: this.name + this.APIAdresses.myStudyPlan
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
      cacheKey: this.CacheList.getPlans(id),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new StudyPlanList(response.data.data)
      },
      rejectCallback: () => {
        return new StudyPlanList()
      }
    })
  }

  getChangePlanOptions(cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.planOptions,
      cacheKey: this.CacheList.planOptions,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return {
          grades: response.data.data.grades ? response.data.data.grades : [],
          majors: response.data.data.majors ? response.data.data.majors : [],
          studyPlans: response.data.data.studyPlans ? response.data.data.studyPlans : [],
          products: response.data.data.products ? response.data.data.products : []
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getMyStudyPlan(cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.myStudyPlan,
      cacheKey: this.CacheList.myStudyPlan,
      ...(cache && { cache }),
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

  updateMyStudyPlan(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.myStudyPlan,
      data: this.getNormalizedSendData({
        study_method_id: null, // Number
        major_id: null, // Number
        grade_id: null // Number
      }, data),
      resolveCallback: (response) => {
        return new StudyPlan(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getStudyPlanData(data = {}, cache = { TTL: 100 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.studyPlan,
      ...(cache && { cache }),
      data: this.getNormalizedSendData({
        study_event: null,
        since_date: '',
        till_date: ''
      }, data),
      resolveCallback: (response) => {
        return new StudyPlanList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  storeSetting(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.setting,
      data: this.getNormalizedSendData({
        setting: {}
      }, data),
      resolveCallback: (response) => {
        return response.message ? response.message : null
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getSetting(cache = { TTL: 100 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.setting,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new WebsiteSetting(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  markAsRead(reportId, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.studyEventReport(reportId),
      cacheKey: this.CacheList.studyEventReport(reportId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return response.data?.data // String message
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

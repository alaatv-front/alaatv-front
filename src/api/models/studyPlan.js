import APIRepository from '../classes/APIRepository'
import { apiV2 } from 'src/boot/axios'
import { StudyPlan, StudyPlanList } from 'src/models/StudyPlan'
import { WebsiteSetting } from 'src/models/WebsiteSetting'

export default class StudyPlanAPI extends APIRepository {
  constructor () {
    super('studyPlan', apiV2, '/plan', new StudyPlan())
    this.APIAdresses = {
      plan: '/plan',
      studyPlan: '/studyPlan',
      myStudyPlan: '/myStudyPlan',
      systemReport: '/systemReport',
      findStudyPlan: '/findStudyPlan',
      setting: 'website-setting/user',
      editPlan: (id) => '/plan/' + id,
      selectPlanOptions: '/selectPlan/create',
      deletePlan: (id) => '/plan/' + id,
      getPlans: (id) => '/studyPlan/' + id + '/plans',
      studyEvent: (id) => '/studyEvent/' + id + '/studyPlans',
      studyEventReport: (id) => `/study-event-report/${id}/mark-as-read`
    }
    this.CacheList = {
      setting: this.name + this.APIAdresses.setting,
      studyPlan: this.name + this.APIAdresses.studyPlan,
      planOptions: this.name + this.APIAdresses.planOptions,
      myStudyPlan: this.name + this.APIAdresses.myStudyPlan,
      systemReport: this.name + this.APIAdresses.systemReport,
      findStudyPlan: this.name + this.APIAdresses.findStudyPlan,
      getPlans: (id) => this.name + this.APIAdresses.getPlans(id),
      studyEvent: (id) => this.name + this.APIAdresses.studyEvent(id),
      studyEventReport: (id) => this.name + this.APIAdresses.studyEventReport(id)
    }
  }

  getStudyEvents (id, cache = { TTL: 1000 }) {
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

  getPlans (id, cache = { TTL: 1000 }) {
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

  getMyStudyPlan (data, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.myStudyPlan,
      cacheKey: this.CacheList.myStudyPlan,
      ...(cache && { cache }),
      data: this.getNormalizedSendData({
        category_id: null // Number
      }, data),
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

  updateMyStudyPlan (data = {}) {
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

  getStudyPlanData (data = {}, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.studyPlan,
      cacheKey: this.CacheList.studyPlan,
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

  storeSetting (data = {}) {
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

  getSetting (cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.setting,
      cacheKey: this.CacheList.setting,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new WebsiteSetting(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  markAsRead (reportId, cache = { TTL: 1000 }) {
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

  removePlan (planId) {
    return this.sendRequest({
      apiMethod: 'delete',
      api: this.api,
      request: this.APIAdresses.deletePlan(planId),
      resolveCallback: () => {
        return null
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  createPlan (data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.plan,
      data,
      resolveCallback: (response) => {
        return new StudyPlan(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  findStudyPlan (data = {}, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.findStudyPlan,
      cacheKey: this.CacheList.findStudyPlan,
      ...(cache && { cache }),
      data: this.getNormalizedSendData({
        major_id: null, // Number
        grade_id: null, // Number
        study_method_id: null // Number
      }, data),
      resolveCallback: (response) => {
        return new StudyPlan(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getSelectPlanOptions (data, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.selectPlanOptions,
      cacheKey: this.CacheList.selectPlanOptions,
      ...(cache && { cache }),
      data: this.getNormalizedSendData({
        category_id: null // Number
      }, data),
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

  getSystemReport (data, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.systemReport,
      cacheKey: this.CacheList.systemReport,
      ...(cache && { cache }),
      data: this.getNormalizedSendData({
        category_id: null // Number
      }, data),
      resolveCallback: (response) => {
        return response.data.data // List of reviews(reports)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

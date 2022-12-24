import APIRepository from '../classes/APIRepository'
import { apiV2 } from 'src/boot/axios'
import { ContentList } from 'src/models/Content'
import { StudyPlanList } from 'src/models/StudyPlan'
import { PlanList } from 'src/models/Plan'
import { User } from 'src/models/User'

export default class AbrishamAPI extends APIRepository {
  constructor() {
    super('abrisham', apiV2)
    this.APIAdresses = {
      lesson: '/abrisham/lessons',
      majors: '/abrisham/majors',
      saveComment: '/comment',
      karvan: '/abrisham/whereIsKarvan',
      consultingContent: 'set/1213/contents',
      watchedVideo: '/watched',
      unWatchedVideo: '/unwatched',
      liveDescription: '/livedescription?created_at_since=2022-07-09&order_by[]=created_at&order_type[]=desc',
      userLastState: (id) => '/product/' + id + '/toWatch',
      sets: (id) => '/product/' + id + '/sets',
      contents: (id) => '/set/' + id + '/contents',
      studyPlan: (id) => '/studyEvent/' + id + '/studyPlans',
      plan: (id) => '/studyPlan/' + id + '/plans',
      updateComment: (id) => '/comment/' + id,
      favored: (id) => '/c/' + id + '/favored',
      unFavored: (id) => '/c/' + id + '/unfavored',
      timePoint: (id, status) => '/c/timepoint/' + id + '/' + status

    }
    this.restUrl = (id) => this.url + '/' + id
  }

  whereIsKarvan(data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.karvan,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
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

  requestToGetMajors() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.majors,
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

  getStudyEvents(id) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.studyPlan(id),
      resolveCallback: (response) => {
        return new StudyPlanList(response.data.data)
      },
      rejectCallback: () => {
        return new StudyPlanList()
      }
    })
  }

  getPlan(id) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.plan(id),
      resolveCallback: (response) => {
        return new PlanList(response.data.data)
      },
      rejectCallback: () => {
        return new PlanList()
      }
    })
  }

  getConsultingContentList() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.consultingContent,
      resolveCallback: (response) => {
        return new ContentList(response.data.data)
      },
      rejectCallback: () => {
        return new ContentList()
      }
    })
  }

  getNewsList() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.liveDescription,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (er) => {
        return er
      }
    })
  }

  saveComment(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.saveComment,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  updateComment(id, data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.updateComment(id),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  setVideoWatched(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.watchedVideo,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  setVideoUnWatched(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.unWatchedVideo,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  setVideoFavored(id, data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.favored(id),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  setVideoUnFavored(id, data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.unFavored(id),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  bookmarkPostIsFavored(id, data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.unFavored(id),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }
}

import APIRepository from '../classes/APIRepository'
import { apiV2 } from 'src/boot/axios'
import { TreeNode, TreeNodeList } from 'src/models/TreeNode.js'

const APIAdresses = {
  base: '/forrest/tree',
  bulkIndex: '/forrest/tree/bulk',
  tags: '/forrest/tags',
  grid: (grid) => '/forrest/tree/' + grid

  // getMultiType: (types) => {
  //   let treeAddress = '/forrest/tree?'
  //   types.forEach(element => {
  //     treeAddress = treeAddress + `multi-type[]=${element}&`
  //   })
  //   return treeAddress
  // },
  // getGradesList: '/forrest/tree?type=test',
  // getNodeById(nodeId) {
  //   return '/forrest/tree/' + nodeId
  // },
  // getNodeByType(nodeType) {
  //   return '/forrest/tree?type=' + nodeType
  // },
  // getNodeByTitle(nodeType) {
  //   return '/forrest/tree?title=' + nodeType
  // },
  // editNode(id) {
  //   return '/forrest/tree/' + id
  // },
  // getLessonList(lessonId) {
  //   return '/forrest/tree/' + lessonId
  // }
}

export default class ForrestAPI extends APIRepository {
  constructor() {
    super('tree', apiV2, '', '', APIAdresses)
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      bulkIndex: this.name + this.APIAdresses.bulkIndex,
      tags: this.name + this.APIAdresses.tags,
      grid: (grid) => this.name + this.APIAdresses.grid(grid)
    }
  }

  index (data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      data: this.getNormalizedSendData({
        page: 1 // Number
      }, data),
      resolveCallback: (response) => {
        return {
          treeNodeList: new TreeNodeList(response.data.data),
          paginate: response.data.meta
          // {
          //   current_page: 1,
          //   from: 1,
          //   last_page: 1,
          //   path: 'http://office.alaa.tv:700/api/v2/referral-code',
          //   per_page: 15,
          //   to: 10,
          //   total: 10
          // }
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  base(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      cacheKey: this.CacheList.base,
      ...(data?.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return new TreeNode(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getNodeBy(value, data) {
    const methodName = 'getNodeBy' + value
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses[methodName](data.data.id),
      cacheKey: this.CacheList[methodName](data.data.id),
      ...(data?.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return new TreeNode(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getNodeById(data) {
    return this.getNodeBy('Id', data)
  }

  getNodeByType(data) {
    return this.getNodeBy('Type', data)
  }

  getNodeByTitle(data) {
    return this.getNodeBy('Title', data)
  }

  editNode(nodeId, data) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.editNode(nodeId),
      cacheKey: this.CacheList.editNode(nodeId),
      ...(data?.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return new TreeNode(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getGradesList(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getGradesList,
      cacheKey: this.CacheList.getGradesList,
      ...(data?.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return response.data.data.children
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getLessonList(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getLessonList(data.data.id),
      cacheKey: this.CacheList.getLessonList(data.data.id),
      ...(data?.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return response.data.data.children
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

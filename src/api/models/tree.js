import APIRepository from '../classes/APIRepository'
import { apiV2 } from 'src/boot/axios'
import { TreeNode } from 'src/models/TreeNode.js'
const APIAdresses = {
  base: '/forrest/tree',
  getNodeById (nodeId) {
    return '/forrest/tree/' + nodeId
  },
  getNodeByType (nodeType) {
    return '/forrest/tree?type=' + nodeType
  },
  getNodeByTitle (nodeType) {
    return '/forrest/tree?title=' + nodeType
  },
  editNode (id) {
    return '/forrest/tree/' + id
  }
}

export default class TreeAPI extends APIRepository {
  constructor() {
    super('tree', apiV2, '', '', APIAdresses)
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      getNodeById: nodeId => this.name + this.APIAdresses.getNodeById(nodeId),
      getNodeByType: nodeType => this.name + this.APIAdresses.getNodeByType(nodeType),
      getNodeByTitle: nodeTitle => this.name + this.APIAdresses.getNodeByTitle(nodeTitle),
      editNode: id => this.name + this.APIAdresses.editNode(id)
    }
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
}

import APIRepository from '../classes/APIRepository'
import { apiV2 } from 'src/boot/axios'
import { Content } from 'src/models/Content'
import { ProductList } from 'src/models/Product'
const APIAdresses = {
  search: '/search',
  admin: '/admin/contents',
  timestampSet: '/timepoint',
  show: (id) => '/c/' + id,
  delete: '/admin/contents/destroy',
  bulkUpdate: '/admin/contents/bulk-update',
  presigned: '/admin/upload/presigned-request',
  bulkEditText: '/admin/contents/bulk-edit-text',
  bulkEditTags: '/admin/contents/bulk-edit-tags',
  favored: (id) => '/c/' + id + '/favored',
  update: (id) => `/admin/contents/${id}/`,
  getTimestamp: (id) => `/timepoint/${id}`,
  showAdmin: (id) => '/admin/contents/' + id,
  deleteTimestamp: (id) => `/timepoint/${id}`,
  updateTimestamp: (id) => `/timepoint/${id}`,
  unfavored: (id) => '/c/' + id + '/unfavored',
  relatedProducts: (id) => '/c/' + id + '/products'
}
export default class ContentAPI extends APIRepository {
  constructor() {
    super('content', apiV2, '/c/', new Content(), APIAdresses)
    this.CacheList = {
      admin: this.name + this.APIAdresses.admin,
      search: this.name + this.APIAdresses.search,
      delete: this.name + this.APIAdresses.delete,
      presigned: this.name + this.APIAdresses.presigned,
      show: id => this.name + this.APIAdresses.show(id),
      bulkUpdate: this.name + this.APIAdresses.bulkUpdate,
      update: id => this.name + this.APIAdresses.update(id),
      bulkEditText: this.name + this.APIAdresses.bulkEditText,
      timestampSet: this.name + this.APIAdresses.timestampSet,
      bulkEditTags: this.name + this.APIAdresses.bulkEditTags,
      favored: id => this.name + this.APIAdresses.favored(id),
      unfavored: id => this.name + this.APIAdresses.unfavored(id),
      showAdmin: id => this.name + this.APIAdresses.showAdmin(id),
      getTimestamp: id => this.name + this.APIAdresses.getTimestamp(id),
      relatedProducts: id => this.name + this.APIAdresses.relatedProducts(id),
      updateTimestamp: id => this.name + this.APIAdresses.updateTimestamp(id),
      deleteTimestamp: id => this.name + this.APIAdresses.deleteTimestamp(id)
    }
  }

  show(data, cache = { TTL: 100 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.show(data),
      cacheKey: this.CacheList.show(data),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new Content(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  favored(data = {}, cache = { TTL: 100 }) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.favored(data),
      cacheKey: this.CacheList.favored(data),
      ...(cache !== undefined && { cache }),
      resolveCallback: (response) => {
        return response.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  unfavored(data = {}, cache = { TTL: 100 }) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.unfavored(data),
      cacheKey: this.CacheList.unfavored(data),
      ...(cache !== undefined && { cache }),
      resolveCallback: (response) => {
        return response.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  showAdmin(contentId, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.showAdmin(contentId),
      cacheKey: this.CacheList.showAdmin(contentId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        const content = new Content(response.data.data)
        // fillFakeData(content)
        return content
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  update(data = {}) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.update(data.id),
      cacheKey: this.CacheList.update(data.id),
      resolveCallback: (response) => {
        return new Content(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      },
      data: {
        display: 1,
        ...data
      }
      // data: this.getNormalizedSendData({
      //   contentset_id: null, // contentSet Id
      //   isFree: null, // contentSet Id
      //   name: null, // Title for content,
      //   description: null, // Description for content
      //   thumbnail: null, // thumbnail for contentfd
      //   validSinceDate: null, // time for publish content
      //   forrest_tree: null, // tree for content
      //   order: null, // order of content
      //   enable: null, // content status
      //   display: 1 // content display status
      // }, data)
    })
  }

  relatedProducts(contentId, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.relatedProducts(contentId),
      cacheKey: this.CacheList.relatedProducts(contentId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new ProductList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  bulkEditText(data) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.bulkEditText,
      cacheKey: this.CacheList.bulkEditText,
      ...(data?.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return response.data
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  bulkUpdate(data) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.bulkUpdate,
      cacheKey: this.CacheList.bulkUpdate,
      ...(data?.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return response.data
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  bulkEditTags(data) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.bulkEditTags,
      cacheKey: this.CacheList.bulkEditTags,
      ...(data?.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return response.data
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  deleteContents(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.delete,
      cacheKey: this.CacheList.delete,
      ...(data?.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return response.data
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  search(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.search,
      cacheKey: this.CacheList.orderProduct,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return {
          sets: response.data.data.sets,
          products: response.data.data.products,
          videos: response.data.data.videos
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  SetTimestamp(data = {}, cache) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.timestampSet,
      cacheKey: this.CacheList.timestampSet,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return {
          timestamp: response.data
        }
      },
      rejectCallback: (error) => {
        return error
      },
      data: this.getNormalizedSendData({
        content_id: null, // content Id
        title: null, // Title for Timestamp
        time: null // time of Video for timestamp in seconds
      }, data.data)
    })
  }

  UpdateTimestamp(data = {}, cache) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.updateTimestamp(data.id),
      cacheKey: this.CacheList.updateTimestamp(data.id),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return {
          timestamp: response.data
        }
      },
      rejectCallback: (error) => {
        return error
      },
      data: this.getNormalizedSendData({
        content_id: null, // content Id
        title: null, // Title for Timestamp
        time: null // time of Video for timestamp in seconds
      }, data)
    })
  }

  GetTimestamp(data = {}, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getTimestamp(data.id),
      cacheKey: this.CacheList.getTimestamp(data.id),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return {
          timestamp: response.data
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  DeleteTimestamp(data = {}, cache) {
    return this.sendRequest({
      apiMethod: 'delete',
      api: this.api,
      request: this.APIAdresses.deleteTimestamp(data.id),
      cacheKey: this.CacheList.deleteTimestamp(data.id),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return {
          timestamp: response.data
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getPresigned(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.presigned,
      cacheKey: this.CacheList.presigned,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return response.data.data
      },
      rejectCallback: (error) => {
        return error
      },
      data: this.getNormalizedSendData({
        bucket: null, // file name(test)
        key: null // file with type(type.mp4)
      }, data.data)
    })
  }
}

// const fillFakeData = (content) => {
//   content.forrest_tree_tags = forrestTreeTags
//   content.hls = 'https://alaatv.com/hls/input.m3u8'
// }

// const forrestTreeTags = [
//   {
//     id: '63ff427566344faf860f0f9f',
//     title: 'دبیر 1',
//     parent: {
//       id: '63f37272c590054efc012d12',
//       title: 'دبیر'
//     },
//     ancestors: [
//       {
//         id: '63f37272c590054efc012d12',
//         title: 'دبیر'
//       }
//     ],
//     order: '0',
//     type: null,
//     number_of_children: 0,
//     updated_at: '2023-03-01 15:49:18',
//     created_at: '2023-03-01 15:47:57'
//   },
//   {
//     id: '63ff427c66344faf860f0fa0',
//     title: 'دبیر 2',
//     parent: {
//       id: '63f37272c590054efc012d12',
//       title: 'دبیر'
//     },
//     ancestors: [
//       {
//         id: '63f37272c590054efc012d12',
//         title: 'دبیر'
//       }
//     ],
//     order: '2',
//     type: null,
//     number_of_children: 1,
//     updated_at: '2023-03-01 15:49:18',
//     created_at: '2023-03-01 15:48:04'
//   }
// ]

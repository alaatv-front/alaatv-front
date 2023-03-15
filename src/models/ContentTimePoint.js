import { Model, Collection } from 'js-abstract-model'
// import {Set} from "./Set";
// import Url from "./Url";

class ContentTimePoint extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      {
        key: 'favor_url',
        value: function (itemVal, inputData) {
          return inputData.favorUrl
        }
      },
      {
        key: 'unfavor_url',
        value: function (itemVal, inputData) {
          return inputData.unfavorUrl
        }
      },
      { key: 'isFavored' },
      { key: 'is_favored' },
      { key: 'time' },
      { key: 'title' }
    ])

    if (this.is_favored === null) {
      this.is_favored = this.isFavored
    }
    if (this.isFavored === null) {
      this.isFavored = this.is_favored
    }
  }

  contentUrl (contentUrl) {
    return contentUrl + '?t=' + this.time
  }

  createFavorUrl (baseUrl, favored) {
    return baseUrl + '/c/timepoint/' + this.id + '/' + ((favored) ? 'favored' : 'unfavored')
  }

  setFavor (url) {
    if (typeof url === 'undefined') {
      url = this.favor_url
    }
    if (url === null) {
      console.error('url is null.')
    }
    return this.crud.create(url)
  }

  setUnfavor (url) {
    if (typeof url === 'undefined') {
      url = this.unfavor_url
    }
    if (url === null) {
      console.error('url is null.')
    }
    return this.crud.create(url)
  }
}

class ContentTimePointList extends Collection {
  model () {
    return ContentTimePoint
  }
}

export { ContentTimePoint, ContentTimePointList }

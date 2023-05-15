import { Collection, Model } from 'js-abstract-model'
import { APIGateway } from 'src/api/APIGateway'

class AlaaContent extends Model {
  constructor (data) {
    super(data, [
      {
        key: 'baseRoute',
        default: APIGateway.content.APIAdresses.base
      },
      { key: 'id' },
      { key: 'type' },
      { key: 'title' },
      { key: 'duration' },
      { key: 'photo' },
      { key: 'order' },
      { key: 'url' }
    ])
  }
}

class AlaaContentList extends Collection {
  model () {
    return AlaaContent
  }

  getVideos () {
    return this.list.filter((item) => parseInt(item.type) === 8)
  }
}

export { AlaaContent, AlaaContentList }

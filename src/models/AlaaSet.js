import { Model } from 'js-abstract-model'
import { AlaaContentList } from '../models/AlaaContent'
import { APIGateway } from 'src/api/APIGateway'

class AlaaSet extends Model {
  constructor (data) {
    super(data, [
      {
        key: 'baseRoute',
        default: APIGateway.set.APIAdresses.base
      },
      { key: 'id' },
      { key: 'title' },
      { key: 'short_title' },
      { key: 'photo' },
      { key: 'author' },
      { key: 'contents_count' },
      {
        key: 'contents',
        relatedModel: AlaaContentList
      }
    ])
  }
}

export { AlaaSet }

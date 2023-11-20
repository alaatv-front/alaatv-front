import Url from 'src/models/Url.js'
import { SetList } from 'src/models/Set.js'
import { BlockList } from 'src/models/Block.js'
import { Model, Collection } from 'js-abstract-model'

class Channel extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'description' },
      { key: 'photo' },
      {
        key: 'url',
        relatedModel: Url
      },
      {
        key: 'sets',
        relatedModel: SetList
      },
      {
        key: 'future_blocks',
        relatedModel: BlockList
      },
      {
        key: 'normal_blocks',
        relatedModel: BlockList
      },
      { key: 'updated_at' }
    ])
  }
}

class ChannelList extends Collection {
  model () {
    return Channel
  }
}

export { Channel, ChannelList }

import { Model, Collection } from 'js-abstract-model'

class LiveDescription extends Model {
  constructor (data) {
    super(data, [
      {
        key: 'baseRoute',
        default: '/api/v2/livedescription'
      },
      { key: 'id' },
      { key: 'title' },
      { key: 'photo' },
      { key: 'description' },
      { key: 'seen_counter' },
      { key: 'created_at' },
      { key: 'tags' },
      { key: 'has_pinned' }
    ])
  }
}

class LiveDescriptionList extends Collection {
  model () {
    return LiveDescription
  }
}

export { LiveDescription, LiveDescriptionList }

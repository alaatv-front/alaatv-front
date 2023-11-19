import { Model, Collection } from 'js-abstract-model'
import { Block } from 'src/models/Block'
import { User } from './User'
import { Major } from 'src/models/Major'

class EventekhbReshte extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'event' },
      { key: 'rank' },
      { key: 'enable_report_publish' },
      { key: 'comment' },
      { key: 'created_at' },
      { key: 'updated_at' },
      { key: 'report_file_link' },
      { key: 'consultant_firstname' },
      { key: 'consultant_lastname' },
      { key: 'consultant_mobile' },
      { key: 'file' },
      { key: 'major_id' },
      { key: 'shahr' },
      { key: 'university_type' },
      {
        key: 'user',
        relatedModel: User
      },
      {
        key: 'major',
        relatedModel: Major
      },
      {
        key: 'region',
        default: {
          id: null,
          title: ''
        }
      },
      { key: 'event_result_status' }
    ])
  }
}
class EventekhbReshteList extends Collection {
  model () {
    return Block
  }
}

export { EventekhbReshte, EventekhbReshteList }

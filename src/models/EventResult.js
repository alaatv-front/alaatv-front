import { Model, Collection } from 'js-abstract-model'
import { Block } from 'src/models/Block'
import { User } from './User'
import { Major } from 'src/models/Major'

class EventResult extends Model {
  constructor(data) {
    super(data, [
      { key: 'id' },
      { key: 'event' },
      { key: 'rank' },
      { key: 'enable_report_publish' },
      { key: 'comment' },
      { key: 'created_at' },
      { key: 'updated_at' },
      { key: 'report_file_link' },
      {
        key: 'user',
        relatedModel: User
      },
      { key: 'major_id' },
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
      { key: 'event_result_status' },

      { key: 'event_id' },
      { key: 'user_id' },
      { key: 'participationCode' },
      {
        key: 'enableReportPublish',
        default: 1
      },
      { key: 'region_id' },
      { key: 'reportFile' },
      { key: 'firstName' },
      { key: 'lastName' },
      { key: 'shahr' },
      { key: 'shahr_id' },
      { key: 'eventresultstatus_id' }
    ])
  }
}
class EventResultList extends Collection {
  model () {
    return Block
  }
}

export { EventResult, EventResultList }

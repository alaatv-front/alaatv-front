import { User } from './User.js'
import { Major } from 'src/models/Major.js'
import { Model, Collection } from 'js-abstract-model'

class EventResult extends Model {
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
      { key: 'rank_in_district' },
      { key: 'rank_in_region' },
      { key: 'province' },
      { key: 'postalCode' },
      {
        key: 'enableReportPublish',
        default: 1
      },
      { key: 'region_id' },
      { key: 'nomre_taraz_dey' },
      { key: 'nomre_taraz_tir' },
      { key: 'nomre_taraz_moadel' },
      { key: 'nomre_taraz_kol' },
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
    return EventResult
  }
}

export { EventResult, EventResultList }

import { Model } from 'js-abstract-model'

class Event extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'name' },
      { key: 'logo' },
      { key: 'title' },
      {
        key: 'showDashboard',
        default: false
      },
      {
        key: 'showStudyPlan',
        default: false
      },
      { key: 'studyEventId' },
      {
        key: 'study_plan',
        default: {
          category_id: null
        }
      }
    ])
  }
}

export { Event }

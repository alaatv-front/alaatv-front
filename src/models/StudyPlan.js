import { Collection, Model } from 'js-abstract-model'
import { PlanList } from './Plan'
// ToDo: use moment-jalaali
// import * as PersianDate from 'persian-date'
const PersianDate = null

class StudyPlan extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'studyPlan_id' },
      { key: 'title' },
      { key: 'date' },
      { key: 'body' },
      {
        key: 'plans',
        relatedModel: PlanList
      }
    ])
  }

  convertDate () {
    const dayOfWeek = new PersianDate(new Date(this.date)).format('dddd')
    const dateOfMonth = new PersianDate(new Date(this.date)).format('D MMMM')

    return { dayOfWeek, dateOfMonth }
  }
}

class StudyPlanList extends Collection {
  model () {
    return StudyPlan
  }
}

export { StudyPlan, StudyPlanList }

import { Collection, Model } from 'js-abstract-model'
import { PlanList } from './Plan'
import { Content } from './Content'
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
      { key: 'plan_date' },
      { key: 'body' },
      { key: 'passed_days' },
      { key: 'event' },
      {
        key: 'plans',
        relatedModel: PlanList
      },
      {
        key: 'contents',
        relatedModel: Content
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

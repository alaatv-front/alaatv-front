import { Collection, Model } from 'js-abstract-model'
import * as PersianDate from 'persian-date'
import { ContentList } from './Content'
import { Major } from './Major'

class Plan extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      {
        key: 'major',
        relatedModel: Major
      },
      { key: 'title' },
      { key: 'start' },
      { key: 'end' },
      { key: 'date' },
      { key: 'description' },
      { key: 'long_description' },
      {
        key: 'contents',
        relatedModel: ContentList
      },
      {
        key: 'textColor',
        default: '#333333'
      },
      {
        key: 'backgroundColor',
        default: '#ffe79e'
      },
      {
        key: 'borderColor',
        default: '#707070'
      }
    ])
  }

  convertDate () {
    const dayOfWeek = new PersianDate(new Date(this.date)).format('dddd')
    const dateOfMonth = new PersianDate(new Date(this.date)).format('D MMMM')

    return { dayOfWeek, dateOfMonth }
  }
}

class PlanList extends Collection {
  model () {
    return Plan
  }
}

export { Plan, PlanList }

import { Major } from './Major.js'
import { ContentList } from './Content.js'
import { Collection, Model } from 'js-abstract-model'
// ToDo: use moment-jalaali
// import * as PersianDate from 'persian-date'
const PersianDate = null

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
      { key: 'product' },
      { key: 'has_watched' },
      { key: 'description' },
      { key: 'long_description' },
      { key: 'url' },
      { key: 'voice' },
      { key: 'video' },
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

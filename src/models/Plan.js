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
      { key: 'study_method' },
      { key: 'study_method_id' },
      { key: 'major' },
      { key: 'major_id' },
      { key: 'grade' },
      { key: 'grade_id' },
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
        default: '#C0C6D3'
      },
      {
        key: 'borderColor',
        default: '#707070'
      }
    ])

    if (!this.major_id && this.major?.id) {
      this.major_id = this.major.id
    }

    if (!this.grade_id && this.grade?.id) {
      this.grade_id = this.grade.id
    }

    if (!this.study_method_id && this.study_method?.id) {
      this.study_method_id = this.study_method.id
    }
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

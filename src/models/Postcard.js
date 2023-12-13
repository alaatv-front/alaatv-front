import { User } from 'src/models/User.js'
import { Model, Collection } from 'js-abstract-model'

class StudyEvent extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'name' },
      { key: 'title' },
      { key: 'created_at' },
      { key: 'updated_at' },
      { key: 'major_id' },
      { key: 'grade_id' },
      { key: 'method_id' },
      { key: 'start_at' }
    ])
  }
}
class Postcard extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      {
        key: 'user',
        relatedModel: User
      },
      {
        key: 'study_event',
        relatedModel: StudyEvent
      },
      { key: 'value' }
    ])
  }

  getDecodedValue () {
    if (!this.value) {
      return null
    }
    return JSON.parse(this.value)
  }
}

class PostcardList extends Collection {
  model () {
    return Postcard
  }
}
export { Postcard, PostcardList }

import { Collection, Model } from 'js-abstract-model'
import { AbrishamLessonList } from 'src/models/AbrishamLesson'

class AbrishamMajor extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'name' },
      {
        key: 'lessons',
        relatedModel: AbrishamLessonList
      },
      { key: 'title' },
      { key: 'selected' }
    ])
  }
}

class AbrishamMajorList extends Collection {
  model () {
    return AbrishamMajor
  }
}

export { AbrishamMajor, AbrishamMajorList }

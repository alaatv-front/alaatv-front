import { Collection, Model } from 'js-abstract-model'
class AbrishamLesson extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      {
        key: 'selected',
        default: false
      },
      { key: 'color' }
    ])
  }
}

class AbrishamLessonList extends Collection {
  model () {
    return AbrishamLesson
  }

  getVideos () {
    return this.list.filter((item) => parseInt(item.type) === 8)
  }
}

export { AbrishamLesson, AbrishamLessonList }

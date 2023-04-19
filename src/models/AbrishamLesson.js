import { Collection, Model } from 'js-abstract-model'
class AbrishamLesson extends Model {
  constructor (data) {
    super(data, [
      { key: 'title' },
      {
        key: 'lessons',
        default: [
          {
            id: 0,
            title: '',
            color: '',
            selected: false
          }
        ]
      },
      { key: 'id' }
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

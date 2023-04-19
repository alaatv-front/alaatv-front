import { Collection, Model } from 'js-abstract-model'

class AbrishamMajor extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'name' },
      { key: 'lessons' },
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

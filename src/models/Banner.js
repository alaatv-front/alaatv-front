import { Model, Collection } from 'js-abstract-model'

class Banner extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'body' },
      { key: 'photo' },
      { key: 'link' },
      { key: 'order' },
      { key: 'ratio' }
    ])
  }
}
class BannerList extends Collection {
  model () {
    return Banner
  }
}
export { Banner, BannerList }

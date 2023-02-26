import Url from 'src/models/Url.js'
import { Set } from 'src/models/Set.js'
import { Content } from 'src/models/Content.js'
import { Product } from 'src/models/Product.js'
import { Model, Collection } from 'js-abstract-model'

class Favored extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'is_purchased' },
      { key: 'photo' },
      { key: 'timepoint' },
      { key: 'title' },
      { key: 'type' },
      {
        key: 'url',
        relatedModel: Url
      }
    ])
  }

  getContent () {
    return new Content({
      id: this.id,
      title: this.title,
      photo: this.photo
    })
  }

  getProduct () {
    return new Product({
      id: this.id,
      title: this.title,
      photo: this.photo
    })
  }

  getSet () {
    return new Set({
      id: this.id,
      title: this.title,
      photo: this.photo
    })
  }
}

class FavoredList extends Collection {
  model () {
    return Favored
  }
}
export { Favored, FavoredList }

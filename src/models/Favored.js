import Url from 'src/models/Url.js'
import { Set } from 'src/models/Set.js'
import { Content } from 'src/models/Content.js'
import { Product } from 'src/models/Product.js'
import { Model, Collection } from 'js-abstract-model'

class Favored extends Model {
  constructor (data) {
    const set = new Set()
    const content = new Content()
    const product = new Product()
    const additionalProps = Object.assign(Object.assign(set.props, product.props), content.props)
    super(data, [
      ...additionalProps,
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

  getContents () {
    return this.list.map(item => item.getContent())
  }

  getProducts () {
    return this.list.map(item => item.getProduct())
  }

  getSets () {
    return this.list.map(item => item.getSet())
  }
}
export { Favored, FavoredList }

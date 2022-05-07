import { Model, Collection } from 'js-abstract-model'
import Price from '../models/Price'
import { EecProduct } from '../models/EecProduct'
import { SetList } from '../models/Set'

class Product extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'redirect_url' },
      { key: 'type' },
      { key: 'category' },
      {
        key: 'title',
        value: function (itemVal, inputData) {
          if (typeof inputData.title !== 'undefined' && inputData.title !== null) {
            return inputData.title
          } else if (typeof inputData.name !== 'undefined' && inputData.name !== null) {
            return inputData.name
          }
        }
      },
      { key: 'is_free' },
      { key: 'url' },
      { key: 'photo' },
      { key: 'attributes' },
      { key: 'description' },
      { key: 'longDescription' },
      { key: 'specialDescription' },
      { key: 'url' },
      {
        key: 'sets',
        relatedModel: SetList
      },
      {
        key: 'price',
        relatedModel: Price
      },
      { key: 'isFavored' },
      { key: 'favor_url' },
      { key: 'unfavor_url' },
      { key: 'catalog' },
      {
        key: 'eec',
        relatedModel: EecProduct
      },
      {
        key: 'sample_photos',
        default: []
      },
      { key: 'intro' },
      {
        key: 'blocks',
        default: []
      }
    ])
    this.loadData(data)
  }

  loadData (data) {
    if (!data) {
      return
    }
    this.eec.id = this.id
    this.eec.name = this.title
    this.eec.price = this.price.final
    this.eec.category = (!data.category) ? '-' : data.category
    this.eec.variant = (!data.variant) ? '-' : data.variant
  }

  createFavorUrl (baseUrl, favored) {
    return baseUrl + '/product/' + this.id + '/' + ((favored) ? 'favored' : 'unfavored')
  }

  setFavor (url) {
    if (typeof url === 'undefined') {
      url = this.favor_url
    }
    if (url === null) {
      console.error('url is null.')
    }

    return this.crud.create(url)
  }

  setUnfavor (url) {
    if (typeof url === 'undefined') {
      url = this.unfavor_url
    }
    if (url === null) {
      console.error('url is null.')
    }
    return this.crud.create(url)
  }
}

class ProductList extends Collection {
  model () {
    return Product
  }
}

export { Product, ProductList }

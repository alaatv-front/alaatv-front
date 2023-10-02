import { Model, Collection } from 'js-abstract-model'
import Price from '../models/Price'
import { EecProduct } from '../models/EecProduct'
import { SetList } from '../models/Set'

class Product extends Model {
  constructor(data) {
    super(data, [
      { key: 'id' },
      { key: 'redirect_url' },
      { key: 'type' },
      { key: 'category' },
      {
        key: 'title'
      },
      {
        key: 'teacher_name'
      },
      {
        key: 'teacher_image'
      },
      { key: 'has_instalment_option' },
      { key: 'instalments' },
      { key: 'is_free' },
      { key: 'is_live' },
      { key: 'is_active' },
      { key: 'is_dependent' },
      { key: 'is_purchased' },
      { key: 'live_link' },
      { key: 'photo' },
      { key: 'photo_wide' },
      { key: 'attributes' },
      { key: 'payment_default' },
      {
        key: 'contents_progress',
        default: 0
      },
      {
        key: 'description',
        default: {
          long: null,
          short: null,
          slogan: null
        }
      },
      { key: 'longDescription' },
      { key: 'last_content_user_watched' },
      { key: 'specialDescription' },
      {
        key: 'children',
        default: []
      },
      {
        key: 'sets',
        relatedModel: SetList
      },
      {
        key: 'price',
        relatedModel: Price
      },
      {
        key: 'isFavored',
        default: false
      },
      {
        key: 'is_favored_2',
        default: false
      },
      {
        key: 'is_favored',
        default: false
      },
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
    ], {
      payment_default: {
        infoKey: 'payment_default_info',
        enumListKey: 'payment_defaultEnums',
        enums: [
          {
            label: 'پرداخت نقدی',
            value: 1
          },
          {
            label: 'پرداخت قسطی',
            value: 2
          }
        ]
      }
    })
    if (this.is_favored_2) {
      this.is_favored = this.is_favored_2
    }
    if (this.isFavored) {
      this.is_favored = this.isFavored
    }
    this.fillEECData(data)
  }

  getChildren() {
    return new ProductList(this.children)
  }

  hasChildren() {
    return this.children.length > 0
  }

  fillEECData(data) {
    if (!data) {
      return
    }
    this.eec.id = this.id
    this.eec.name = this.title
    this.eec.price = this.price.final
    this.eec.category = (!data.category) ? '-' : data.category
    this.eec.variant = (!data.variant) ? '-' : data.variant
  }
}

class ProductList extends Collection {
  model() {
    return Product
  }
}

export { Product, ProductList }

import { Model, Collection } from 'js-abstract-model'
import { Product } from 'src/models/Product'
import Price from 'src/models/Price'
// import {OrderProductType} from "resourcesJs/Model/OrderProductType";

class OrderProduct extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'quantity' },
      { key: 'type' },
      { key: 'grand' },
      { key: 'photo' },
      { key: 'extra_attributes' },
      // {
      //     key: 'orderproducttype',
      //     relatedModel: OrderProductType
      // },
      {
        key: 'product',
        relatedModel: Product
      },
      {
        key: 'price',
        relatedModel: Price
      }
    ])
  }
}

class OrderProductList extends Collection {
  model () {
    return OrderProduct
  }
}

export { OrderProduct, OrderProductList }

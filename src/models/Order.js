import { Model, Collection } from 'js-abstract-model'
import OrderStatsu from 'src/models/OrderStatsu'
import { OrderProductList } from 'src/models/OrderProduct'
import PaymentStatsu from 'src/models/PaymentStatsu'
import { User } from 'src/models/User'

class Order extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'discount' },
      { key: 'customer_description' },
      { key: 'price' },
      { key: 'paid_price' },
      { key: 'refund_price' },
      { key: 'debt' },
      { key: 'coupon_info' },
      { key: 'completed_at' },
      { key: 'created_at' },
      { key: 'updated_at' },
      {
        key: 'orderstatus',
        relatedModel: OrderStatsu
      },
      {
        key: 'paymentstatus',
        relatedModel: PaymentStatsu
      },
      {
        key: 'user',
        relatedModel: User
      },
      {
        key: 'orderproducts',
        relatedModel: OrderProductList
      }
    ])
  }

  getEditPageLink (baseUrl) {
    return baseUrl + '/order/' + this.id + '/edit'
  }
}

class OrderList extends Collection {
  model () {
    return Order
  }
}

export { Order, OrderList }

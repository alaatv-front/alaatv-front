import { Model, Collection } from 'js-abstract-model'
import { User } from './User'
import { Coupon } from './Coupon'
import { OrderProductList } from 'src/models/OrderProduct'
import { OrderItemCollection } from './OrderItem'

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
      {
        key: 'coupon_info',
        relatedModel: Coupon
      },
      // {
      //   key: 'order_product',
      //   relatedModel: OrderItemCollection
      // },
      { key: 'orderproducts' },
      { key: 'orderstatus' },
      { key: 'paymentstatus' },
      { key: 'successful_transactions' },
      { key: 'pending_transactions' },
      { key: 'unpaid_transaction' },
      { key: 'posting_info' },
      {
        key: 'user',
        relatedModel: User
      },
      { key: 'created_at' },
      { key: 'completed_at' },

      {
        key: 'orderItems',
        relatedModel: OrderItemCollection
      }
    ])

    this.setOrderItems()
  }

  setOrderItems () {
    const flatOrderProducts = this.inputData.orderproducts
    if (!flatOrderProducts) {
      return
    }
    const orderProductsGrands = flatOrderProducts
      .filter((orderProductItem, index, array) => array.findIndex(item => item.grand?.id === orderProductItem.grand?.id) === index)
      .map(item => item.grand)

    orderProductsGrands.forEach(grand => {
      const orderProducts = flatOrderProducts.filter(flatOrderProduct => flatOrderProduct.grand?.id === grand?.id)
      if (!this.orderItems.list.find(orderItem => orderItem.grand?.id === grand?.id)) {
        this.orderItems.add(...[{
          grand,
          order_product: new OrderProductList(orderProducts)
        }])
      }
    })
  }

  getOrderDiscount (mode = 'percentage') {
    if (!this.coupon_info.discount) {
      return null
    }
    let string = this.coupon_info.discount.toLocaleString('fa')
    if (this.coupon_info.discounttype.name !== 'percentage' && mode === 'percentage') {
      string += ' % '
    }
    // if this.coupon_info.discounttype.name !== 'toman' && mode === 'toman'
    if (mode === 'toman') {
      string = Math.round((this.price * this.coupon_info.discount) / 100) + ' تومان '
    }
    return string
  }

  getAEEData () {
    return {
      actionField: {
        actionField: {
          id: this.id,
          affiliation: '-',
          revenue: this.paid_price,
          tax: '-',
          shipping: '-',
          coupon: this.coupon_info.couponCode
        }
      },
      products: this.orderproducts.map(orderProduct => {
        const product = orderProduct.product
        return {
          id: product.id,
          name: product.title,
          category: product.category,
          brand: 'آلاء',
          quantity: orderProduct.quantity,
          price: orderProduct.price.final
        }
      })
    }
  }
}

class OrderList extends Collection {
  model() {
    return Order
  }
}

export { Order, OrderList }

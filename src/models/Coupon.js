import { Model, Collection } from 'js-abstract-model'

class Coupon extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'couponCode' },
      { key: 'couponName' },
      { key: 'discount_in_letters' },
      { key: 'detail' },
      {
        key: 'numberOfProducts',
        default: 0
      },
      {
        key: 'totalDiscount',
        default: 0
      },
      //  new for order's api :
      { key: 'name' },
      { key: 'code' },
      {
        key: 'coupontype',
        default: {
          name: '', // partial
          display_name: '' // جزئی
        }
      },
      {
        key: 'discounttype',
        default: {
          name: '', // cost
          display_name: '' // مبلغ
        }
      }
    ])
  }

  getOrderDiscount (mode = 'percentage') {
    let string = this.discount.toLocaleString('fa')
    if (this.discounttype.name !== 'percentage' && mode === 'percentage') {
      string += ' % '
    }
    if (mode === 'toman') {
      string += ' تومان '
    }
    return string
  }
}

class CouponList extends Collection {
  model () {
    return Coupon
  }
}
export { Coupon, CouponList }

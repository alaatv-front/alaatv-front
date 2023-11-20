import { Model } from 'js-abstract-model'

class Price extends Model {
  constructor (data) {
    super(data, [
      { key: 'extraCost' },
      { key: 'base' },
      { key: 'discount' },
      { key: 'discount_instalmentally' },
      { key: 'final' },
      { key: 'final_instalmentally' },
      { key: 'payableByWallet' },
      { key: 'discountDetail' }
    ])
  }

  toman (key, suffix) {
    if (this[key]) {
      let string = this[key].toLocaleString('fa')
      if (string.length === 0) {
        string = '0'
      }
      if (typeof suffix === 'undefined' || suffix) {
        string += ' تومان '
      }

      return string
    }
    return '0'
  }

  discountInPercent (paymentMethod = 'cash') {
    let num
    if (paymentMethod === 'cash') {
      num = Math.round(this.discount * 100 / this.base)
    } else {
      num = Math.round(this.discount_instalmentally * 100 / this.base)
    }
    if (isNaN(num)) {
      return 0
    }
    return num
  }
}

export default Price

import { Model } from 'js-abstract-model'

class Price extends Model {
  constructor (data) {
    super(data, [
      { key: 'extraCost' },
      { key: 'base' },
      { key: 'discount' },
      { key: 'final' },
      { key: 'payableByWallet' },
      { key: 'discountDetail' }
    ])
  }

  toman (key, suffix) {
    if (this[key]) {
      let string = this[key].toLocaleString('fa')
      if (typeof suffix === 'undefined' || suffix) {
        string += ' تومان '
      }

      return string
    }
    return null
  }

  discountInPercent () {
    const num = Math.round(this.discount * 100 / this.base)
    if (isNaN(num)) {
      return 0
    }
    return num
  }
}

export default Price

import { Model } from 'js-abstract-model'

class PaymentStatsu extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'name' }
    ])
  }
}
export default PaymentStatsu

import { Model } from 'js-abstract-model'

class OrderStatsu extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'name' }
    ])
  }
}
export default OrderStatsu

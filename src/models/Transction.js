import { Collection, Model } from 'js-abstract-model'

class Transction extends Model {
  constructor (data) {
    super(data, [
      { key: 'code' },
      { key: 'commisson' },
      { key: 'commisson_percentage' },
      { key: 'full_name' },
      { key: 'id' },
      { key: 'product' },
      { key: 'product_price' },
      { key: 'purchased_at' }
    ])
  }
}
class TransactionList extends Collection {
  model () {
    return Transction
  }
}
export { Transction, TransactionList }

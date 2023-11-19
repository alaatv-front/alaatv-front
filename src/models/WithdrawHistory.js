import { Collection, Model } from 'js-abstract-model'

class WithdrawHistory extends Model {
  constructor (data) {
    super(data, [
      { key: 'amount' },
      { key: 'bank-tracking-code' },
      { key: 'created-at' },
      { key: 'settlement-date' },
      { key: 'id' },
      { key: 'status' },
      { key: 'updated-at' }
    ])
  }
}
class WithdrawHistoryList extends Collection {
  model () {
    return WithdrawHistory
  }
}
export { WithdrawHistory, WithdrawHistoryList }

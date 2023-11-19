import { Model, Collection } from 'js-abstract-model'

class BankAccounts extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'card-number' },
      { key: 'sheba' },
      { key: 'status' },
      { key: 'verify' }
    ])
  }
}
class BankAccountsList extends Collection {
  model () {
    return BankAccounts
  }
}

export { BankAccounts, BankAccountsList }

import { Model, Collection } from 'js-abstract-model'

class Supporter extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'userId' },
      { key: 'fullName' },
      { key: 'first_name' },
      { key: 'last_name' },
      { key: 'major' },
      { key: 'national_code' },
      { key: 'photo' },
      { key: 'role' }
    ])
  }
}

class SupporterList extends Collection {
  model () {
    return Supporter
  }
}

export { Supporter, SupporterList }

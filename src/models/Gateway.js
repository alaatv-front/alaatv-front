import { Collection, Model } from 'js-abstract-model'

class Gateway extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'name' },
      { key: 'displayName' },
      { key: 'description' },
      { key: 'order' },
      { key: 'photo' }
    ])
  }
}

class GatewayList extends Collection {
  model () {
    return Gateway
  }
}

export { Gateway, GatewayList }

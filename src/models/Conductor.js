import { Model, Collection } from 'js-abstract-model'

class Conductor extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'live_link' }
    ])
  }
}

class ConductorList extends Collection {
  model () {
    return Conductor
  }
}
export { Conductor, ConductorList }

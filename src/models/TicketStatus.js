import Model from './Model'
import Collection from './Collection'

class TicketStatus extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'name' },
      { key: 'title' }
    ])
  }
}

class TicketStatusList extends Collection {
  model () {
    return TicketStatus
  }
}

export { TicketStatus, TicketStatusList }

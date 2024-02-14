import { Model, Collection } from 'js-abstract-model'

class TicketStatus extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'name' }, // unanswered - answered - pending - closed
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

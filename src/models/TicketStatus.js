import { Model, Collection } from 'js-abstract-model'

class TicketStatus extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'name' }, // unanswered - answered - pending - closed
      { key: 'title' }
    ])
  }

  getStatusColor () {
    switch (this.name) {
      case 'answered':
        return 'positive'
      case 'unanswered':
        return 'negative'
      case 'pending':
        return 'warning'
      case 'closed':
        return 'info'
      default:
        return 'info'
    }
  }
}

class TicketStatusList extends Collection {
  model () {
    return TicketStatus
  }
}

export { TicketStatus, TicketStatusList }

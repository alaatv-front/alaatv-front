import { Model, Collection } from 'js-abstract-model'
import { User } from 'src/models/User'

class TicketLog extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'action' },
      { key: 'before' },
      { key: 'after' },
      { key: 'created_at' },
      {
        key: 'user',
        relatedModel: User
      }
    ])
  }
}

class TicketLogList extends Collection {
  model () {
    return TicketLog
  }
}

export { TicketLog, TicketLogList }

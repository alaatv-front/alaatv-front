import Model from './Model'
import { User } from '../Model/User'
import Collection from './Collection'

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

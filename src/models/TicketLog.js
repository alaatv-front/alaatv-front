import { User } from 'src/models/User.js'
import { Model, Collection } from 'js-abstract-model'
class TicketLog extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'action' },
      { key: 'after' },
      { key: 'before' },
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

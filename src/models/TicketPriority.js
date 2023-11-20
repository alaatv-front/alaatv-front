import { Model, Collection } from 'js-abstract-model'

class TicketPriority extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' }
    ])
  }
}

class TicketPriorityList extends Collection {
  model () {
    return TicketPriority
  }
}
export { TicketPriority, TicketPriorityList }

import { Model } from 'js-abstract-model'

class TicketPriority extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' }
    ])
  }
}

export default TicketPriority

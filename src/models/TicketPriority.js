import Model from './Model'

class TicketPriority extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' }
    ])
  }
}

export default TicketPriority

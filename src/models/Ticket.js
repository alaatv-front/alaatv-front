import { User } from 'src/models/User.js'
import { Model, Collection } from 'js-abstract-model'
import { TicketStatus } from 'src/models/TicketStatus.js'
import { TicketPriority } from 'src/models/TicketPriority.js'
import { TicketMessageList } from 'src/models/TicketMessage.js'
import { TicketDepartment } from 'src/models/TicketDepartment.js'
import { Supporter } from './supporter'

class Ticket extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'tags' },
      { key: 'order' },
      { key: 'orderproduct' },

      {
        key: 'assignees',
        default: []
      },
      { key: 'rate' },
      { key: 'orderproduct' },
      { key: 'totalMessages' },
      { key: 'logs' },
      {
        key: 'messages',
        relatedModel: TicketMessageList
      },
      {
        key: 'user',
        relatedModel: User
      },
      {
        key: 'responsibleUser',
        relatedModel: Supporter
      },
      { key: 'seenBefore' },
      {
        key: 'last_responder',
        relatedModel: User
      },
      {
        key: 'status',
        relatedModel: TicketStatus
      },
      {
        key: 'priority',
        relatedModel: TicketPriority
      },
      {
        key: 'department',
        relatedModel: TicketDepartment
      },
      { key: 'updated_at' },
      { key: 'created_at' }
    ])
  }
}

class TicketList extends Collection {
  model () {
    return Ticket
  }
}

export { Ticket, TicketList }

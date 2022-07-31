import { Model, Collection } from 'js-abstract-model'
import Assist from '../util/Assist'
import { TicketStatus } from 'src/models/TicketStatus.js'
import { TicketDepartment } from 'src/models/TicketDepartment'
import TicketPriority from 'src/models/TicketPriority'
import { User } from 'src/models/User'
import { TicketMessageList } from 'src/models/TicketMessage'
import { TicketLogList } from 'src/models/TicketLog'
import { Order } from './Order'
import { OrderProduct } from 'src/models/OrderProduct'

class Ticket extends Model {
  constructor (data) {
    super(data, [
      {
        key: 'url_key',
        value: function () {
          return 'ticket'
        }
      },
      { key: 'id' },
      { key: 'title' },
      { key: 'order_id' },
      { key: 'orderproduct_id' },
      { key: 'created_at' },
      { key: 'updated_at' },
      { key: 'assignees' },
      { key: 'rate' },
      {
        key: 'order',
        relatedModel: Order
      },
      {
        key: 'orderproduct',
        relatedModel: OrderProduct
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
      {
        key: 'last_responder',
        relatedModel: User
      },
      {
        key: 'user',
        relatedModel: User
      },
      {
        key: 'messages',
        relatedModel: TicketMessageList
      },
      {
        key: 'logs',
        relatedModel: TicketLogList
      }
    ])

    const that = this
    this.apiResource = {
      fields: [
        { key: 'id' },
        { key: 'title' },
        {
          key: 'user_id',
          value: function () {
            return that.user.id
          }
        },
        {
          key: 'status_id',
          value: function () {
            return that.status.id
          }
        },
        {
          key: 'priority_id',
          value: function () {
            return that.priority.id
          }
        },
        {
          key: 'department_id',
          value: function () {
            return that.department.id
          }
        }
      ]
    }

    this.sortMessages(this.inputData.messages)

    // if (this.inputData.messages) {
    //     this.messages = new TicketMessageList(this.inputData.messages);
    // } else {
    //     this.messages = new TicketMessageList();
    // }
    //
    // if (this.inputData.logs) {
    //     this.logs = new TicketLogList(this.inputData.logs);
    // } else {
    //     this.logs = new TicketLogList();
    // }
  }

  removeMessage (messageId) {
    for (let i = 0; typeof this.messages[i] !== 'undefined'; i++) {
      if (this.messages[i].id === messageId) {
        this.messages.splice(i, 1)
      }
    }
  }

  sortMessages (messages) {
    if (this.optional(messages)) {
      messages.sort(function (a, b) {
        return Assist.diffDate(a.created_at, b.created_at, 'seconds')
      })
    }
  }

  notifBySMS () {
    const url = this.actionUrl + '/' + this.id + '/sendTicketStatusNotice'
    return this.crud.create(url)
  }

  setRate (rate) {
    const url = this.actionUrl + '/' + this.id + '/rate'
    return this.crud.create(url, { rate })
  }

  editAssignedSupporters (assignees) {
    const url = this.actionUrl + '/' + this.id + '/assign'
    return this.crud.create(url, { assignees })
  }
}

class TicketList extends Collection {
  model () {
    return Ticket
  }
}

export { Ticket, TicketList }

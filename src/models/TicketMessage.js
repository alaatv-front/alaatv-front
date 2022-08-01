import { Model, Collection } from 'js-abstract-model'
import { User } from 'src/models/User.js'

class TicketMessage extends Model {
  constructor (data) {
    super(data, [
      {
        key: 'url_key',
        value: function () {
          return 'ticketMessage'
        }
      },
      { key: 'id' },
      {
        key: 'baseRoute',
        default: 'ticket'
      },
      { key: 'body' },
      { key: 'report' },
      { key: 'is_private' },
      { key: 'created_at' },
      { key: 'ticket_id' },
      { key: 'files' },
      {
        key: 'user',
        relatedModel: User
      }
    ])

    this.photo = (this.files !== null) ? this.files.photo : null
    this.voice = (this.files !== null) ? this.files.voice : null

    this.apiResource = {
      sendType: 'form-data',
      fields: [
        { key: 'photo' },
        { key: 'body' },
        { key: 'voice' },
        { key: 'ticket_id' }
      ]
    }
  }

  isVoiceMessage () {
    return (this.files !== null && this.files.voice !== null)
  }

  isPhotoMessage () {
    return (this.files !== null && this.files.photo !== null)
  }

  isTextMessage () {
    return (this.files !== null && this.body !== null && !this.isPhotoMessage())
  }

  sendReport (message) {
    const url = this.actionUrl + '/' + this.id + '/report'
    return this.crud.create(url, { report_description: message })
  }
}

class TicketMessageList extends Collection {
  model () {
    return TicketMessage
  }
}

export { TicketMessage, TicketMessageList }

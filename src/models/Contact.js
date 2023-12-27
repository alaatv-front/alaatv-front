import { User } from 'src/models/User.js'
import { Model, Collection } from 'js-abstract-model'

class Relative extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'name' },
      { key: 'display_name' },
      { key: 'description' }
    ])
  }
}
class ContactType extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'name' },
      { key: 'display_name' },
      { key: 'description' },
      { key: 'is_enable' }
    ])
  }
}
class PhoneType extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'name' },
      { key: 'display_name' },
      { key: 'description' },
      { key: 'is_enable' }
    ])
  }
}
class PhoneItem extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      {
        key: 'contact_id'
      },
      {
        key: 'phoneType',
        relatedModel: PhoneType
      },
      { key: 'phone_number' },
      { key: 'priority' }
    ])
  }
}

class PhoneList extends Collection {
  model () {
    return PhoneItem
  }
}
class Contact extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      {
        key: 'name'
      },
      {
        key: 'user',
        relatedModel: User
      },
      {
        key: 'relative',
        relatedModel: Relative
      },
      {
        key: 'contact_type',
        relatedModel: ContactType
      },
      {
        key: 'phones',
        relatedModel: PhoneList
      }
    ])
  }
}

class ContactList extends Collection {
  model () {
    return Contact
  }
}
export { Contact, ContactList }

import { Model, Collection } from 'js-abstract-model'

class TicketDepartment extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'parent_id' },
      { key: 'order' },
      { key: 'enable' },
      { key: 'display' },
      { key: 'title' },
      { key: 'ticket_form' },
      { key: 'responders_employees' },
      { key: 'created_at' },
      { key: 'updated_at' },
      { key: 'deleted_at' },
      { key: 'filter_access' },
      { key: 'children' },
      { key: 'features' },
      {
        key: 'edit_link'
      }
    ])
  }
}
class TicketDepartmentList extends Collection {
  model () {
    return TicketDepartment
  }
}

export { TicketDepartment, TicketDepartmentList }

import { Model, Collection } from 'js-abstract-model'

class TicketDepartment extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'children' },
      { key: 'enable' },
      { key: 'display' },
      { key: 'features' },
      { key: 'filter_access' }
    ])
  }

  hasFeature (feature) {
    return this.features !== null && this.features.includes(feature)
  }
}

class TicketDepartmentList extends Collection {
  model () {
    return TicketDepartment
  }
}

export { TicketDepartment, TicketDepartmentList }

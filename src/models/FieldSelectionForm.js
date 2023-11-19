import { Model, Collection } from 'js-abstract-model'

class FieldSelectionForm extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'file' },
      { key: 'comment' },
      { key: 'mobile' },
      { key: 'phone' },
      { key: 'shahrha' },
      { key: 'university_types' },
      { key: 'consultants' },
      { key: 'majors' },
      { key: 'consultant_firstname' },
      { key: 'consultant_lastname' },
      { key: 'consultant_mobile' }
    ])
  }
}
class FieldSelectionFormList extends Collection {
  model () {
    return FieldSelectionForm
  }
}

export { FieldSelectionForm, FieldSelectionFormList }

import { Collection, Model } from 'js-abstract-model'

class Major extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'name' },
      { key: 'lessons' },
      { key: 'title' },
      {
        key: 'selected',
        default: false
      }
    ])
  }

  allAvailableItems () {
    return [
      {
        id: 1,
        name: 'ریاضی'
      },
      {
        id: 2,
        name: 'تجربی'
      },
      {
        id: 3,
        name: 'انسانی'
      }
    ]
  }

  convertToValidValue (buffer) {
    if (typeof buffer !== 'undefined' && buffer) {
      return this.suggestedVal()
    } else {
      this.id = this.suggestedVal().id
      this.name = this.suggestedVal().name
    }
  }

  suggestedVal () {
    for (let i = 0; typeof this.allAvailableItems()[i] !== 'undefined'; i++) {
      if (this.name !== null && this.name.includes(this.allAvailableItems()[i].name)) {
        return this.allAvailableItems()[i]
      }
    }

    return new Major()
  }

  canBeValid () {
    return !!this.suggestedVal()
  }

  isValid () {
    for (let i = 0; typeof this.allAvailableItems()[i] !== 'undefined'; i++) {
      if (this.name === this.allAvailableItems()[i].name) {
        return true
      }
    }

    return false
  }
}

class MajorList extends Collection {
  model () {
    return Major
  }
}

export { Major, MajorList }

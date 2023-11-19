import { Model } from 'js-abstract-model'

class MapItemType extends Model {
  constructor (data) {
    super(data, [
      {
        key: 'id',
        default: 0
      },
      {
        key: 'name',
        default: ''
      }
    ])
  }

  allAvailableItems () {
    return [
      {
        id: 1,
        name: 'marker',
        altNames: [
          '1',
          1,
          'marker'
        ]
      },
      {
        id: 2,
        name: 'polyline',
        altNames: [
          '2',
          2,
          'polyline'
        ]
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
      const availableItem = this.allAvailableItems()[i]
      if (this.name !== null && this.name.toString().includes(availableItem.name)) {
        return availableItem
      } else {
        for (let j = 0; typeof availableItem.altNames[j] !== 'undefined'; j++) {
          const altName = availableItem.altNames[j]
          if (this.name !== null && this.name.toString().includes(altName)) {
            return availableItem
          }
        }
      }
    }

    return new MapItemType()
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

export default MapItemType

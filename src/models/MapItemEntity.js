import { Model } from 'js-abstract-model'

class MapItemEntity extends Model {
  constructor (data) {
    super(data, [
      {
        key: 'entity_type',
        default: 'nothing'
      },
      {
        key: 'display_name',
        default: 'هیچ کدام'
      },
      {
        key: 'entity_id',
        default: null
      }
    ])

    this.validation_keys = [
      'entity_type',
      'display_name'
    ]
  }

  clean () {
    this.entity_id = null
    this.display_name = 'هیچ کدام'
    this.entity_type = 'nothing'
  }

  allAvailableItems () {
    return [
      {
        entity_id: 0,
        entity_type: 'nothing',
        display_name: 'هیچ کدام',
        altNames: []
      },
      {
        entity_type: 'product',
        display_name: 'محصول',
        altNames: []
      },
      {
        entity_type: 'set',
        display_name: 'دسته محتوا',
        altNames: []
      },
      {
        entity_type: 'content',
        display_name: 'محتوا',
        altNames: []
      }
    ]
  }

  convertToValidValue (buffer) {
    if (typeof buffer !== 'undefined' && buffer) {
      return this.suggestedVal()
    } else {
      for (let i = 0; typeof this.validation_keys[i] !== 'undefined'; i++) {
        if (this[this.validation_keys[i]]) {
          this[this.validation_keys[i]] = this.suggestedVal()[this.validation_keys[i]]
        }
      }
    }
  }

  suggestedVal () {
    const allAvailableItems = this.allAvailableItems()
    for (let i = 0; typeof allAvailableItems[i] !== 'undefined'; i++) {
      const availableItem = allAvailableItems[i]
      for (let k = 0; typeof this.validation_keys[k] !== 'undefined'; k++) {
        const modelKey = this.validation_keys[k]
        if (!this[modelKey]) {
          continue
        }

        if (typeof this[modelKey] === 'string' && this[modelKey].includes(availableItem[modelKey])) {
          return availableItem
        }

        for (let j = 0; typeof availableItem.altNames[j] !== 'undefined'; j++) {
          const altName = availableItem.altNames[j]
          if (typeof this[modelKey] === 'string' && this[modelKey].includes(altName)) {
            return availableItem
          }
        }
      }
    }

    return new MapItemEntity()
  }

  isValid () {
    const allAvailableItems = this.allAvailableItems()
    for (let i = 0; typeof allAvailableItems[i] !== 'undefined'; i++) {
      const availableItem = allAvailableItems[i]
      for (let j = 0; typeof this.validation_keys[j] !== 'undefined'; j++) {
        const validationKeysItem = this.validation_keys[j]
        if (this[validationKeysItem] && availableItem[validationKeysItem] && this[validationKeysItem] === availableItem[validationKeysItem]) {
          return true
        }
      }
    }

    return false
  }
}

export default MapItemEntity

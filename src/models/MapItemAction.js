import { Model, Collection } from 'js-abstract-model'

class MapItemAction extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'name' },
      { key: 'data' }
    ])

    this.apiResource = {
      fields: [
        { key: 'id' },
        { key: 'name' },
        { key: 'data' }
      ]
    }
  }

  getNoActoin () {
    return new MapItemAction({
      id: 0,
      title: 'بدون فعالیت',
      name: 'noAction',
      data: {}
    })
  }

  getLink () {
    return new MapItemAction({
      id: 1,
      title: 'لینک',
      name: 'link',
      data: {
        link: '',
        target: '_blank'
      }
    })
  }

  getZoom () {
    return new MapItemAction({
      id: 2,
      title: 'زوم',
      name: 'zoom',
      data: {
        zoom: 1,
        center: [0, 0]
      }
    })
  }

  allAvailableItems () {
    return [
      this.getNoActoin(),
      this.getLink(),
      this.getZoom()
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
      } else if (availableItem.altNames) {
        for (let j = 0; typeof availableItem.altNames[j] !== 'undefined'; j++) {
          const altName = availableItem.altNames[j]
          if (this.name !== null && this.name.toString().includes(altName)) {
            return availableItem
          }
        }
      }
    }

    return new MapItemAction()
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

class MapItemActionList extends Collection {
  model () {
    return MapItemAction
  }
}

export { MapItemAction, MapItemActionList }

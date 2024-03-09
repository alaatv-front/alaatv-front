import { Model, Collection } from 'js-abstract-model'

class Pattern extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'patternId' },
      { key: 'title' },
      { key: 'text' },
      {
        key: 'patternValues',
        default: [
          {
            key: null,
            value: null
          }
        ]
      }
    ])
  }
}

class PatternList extends Collection {
  model () {
    return Pattern
  }
}

export { Pattern, PatternList }

import { User } from 'src/models/User.js'
import { Model, Collection } from 'js-abstract-model'

class StudyEvent extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'name' },
      { key: 'title' },
      { key: 'created_at' },
      { key: 'updated_at' },
      { key: 'major_id' },
      { key: 'grade_id' },
      { key: 'method_id' },
      { key: 'start_at' }
    ])
  }
}

class PostcardValue extends Model {
  constructor (data) {
    super(data, [
      { key: 'postcardMessageText' },
      { key: 'postcardPoemBody' },
      { key: 'flowerImage' },
      { key: 'patternBackgrounds' },
      { key: 'postcardBackgrounds' }
    ])
    this.apiResource = {
      fields: [
        { key: 'postcardMessageText' },
        { key: 'postcardPoemBody' },
        { key: 'flowerImage' },
        { key: 'patternBackgrounds' },
        { key: 'postcardBackgrounds' }
      ]
    }
  }
}

class Postcard extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      {
        key: 'user',
        relatedModel: User
      },
      {
        key: 'study_event',
        relatedModel: StudyEvent
      },
      { key: 'uuid' },
      {
        key: 'value',
        value: (itemVal) => {
          let postcardValueArg = itemVal
          if (typeof postcardValueArg !== 'string') {
            postcardValueArg = '{}'
          }
          return new PostcardValue(JSON.parse(postcardValueArg))
        }
      }
    ])
    const that = this
    this.apiResource = {
      fields: [
        { key: 'id' },
        { key: 'user' },
        { key: 'study_event' },
        { key: 'uuid' },
        {
          key: 'value',
          value: function () {
            return JSON.stringify(that.value.loadApiResource())
          }
        }
      ]
    }
  }

  getDecodedValue () {
    if (!this.value) {
      return null
    }
    return JSON.parse(this.value)
  }
}

class PostcardList extends Collection {
  model () {
    return Postcard
  }
}
export { Postcard, PostcardList }

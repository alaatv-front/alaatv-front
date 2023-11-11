import { Model, Collection } from 'js-abstract-model'

class PlayerSource extends Model {
  constructor (data) {
    super(data, [
      {
        key: 'src',
        default: ''
      },
      {
        key: 'type',
        default: 'video/mp4'
      },
      {
        key: 'ext',
        default: 'mp4'
      },
      {
        key: 'label',
        default: ''
      },
      {
        key: 'caption',
        default: ''
      },
      {
        key: 'link',
        default: ''
      },
      {
        key: 'res',
        default: ''
      },
      {
        key: 'selected',
        default: false
      }
    ])

    if (!this.label && this.res) {
      this.label = this.res
    }
    if (!this.label && this.caption) {
      this.label = this.caption
    }
    if (!this.src && this.link) {
      this.src = this.link
    }
    if (this.type === 'video') {
      this.type = 'video/mp4'
    }
  }
}

class PlayerSourceList extends Collection {
  model () {
    return PlayerSource
  }
}

export { PlayerSource, PlayerSourceList }

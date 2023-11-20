import { Model } from 'js-abstract-model'

class WebsiteSetting extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'setting' }
    ])
  }
}
export { WebsiteSetting }

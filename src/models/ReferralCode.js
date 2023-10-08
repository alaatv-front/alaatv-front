import { Collection, Model } from 'js-abstract-model'

class ReferralCode extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'code' },
      { key: 'created_at' },
      { key: 'discount' },
      { key: 'enable' },
      { key: 'isAssigned' },
      { key: 'url' },
      { key: 'usageNumber' },
      { key: 'orders' },
      { key: 'used_at' }
      // {
      //   key: 'contents',
      //   relatedModel: ContentList
      // }
    ])
  }
}

class ReferralCodeList extends Collection {
  model () {
    return ReferralCode
  }
}

export { ReferralCode, ReferralCodeList }

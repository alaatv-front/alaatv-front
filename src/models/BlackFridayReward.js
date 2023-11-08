// import Url from './Url.js'
// import { SetList } from './Set.js'
// import ContentSection from './ContentSection.js'
// import { ContentTimePointList } from './ContentTimePoint.js'
// import { PlayerSourceList } from 'src/models/PlayerSource.js'
import { Model, Collection } from 'js-abstract-model'

class BlackFridayReward extends Model {
  constructor (data) {
    super(data, [
      { key: 'title' },
      { key: 'code' },
      { key: 'discount' },
      {
        key: 'coupontype',
        default: {
          name: '', // partial
          display_name: '' // جزئی
        }
      },
      {
        key: 'discounttype',
        default: {
          name: '', // cost
          display_name: '' // مبلغ
        }
      },
      { key: 'created_at' }
    ])
  }
}

class BlackFridayRewardList extends Collection {
  model() {
    return BlackFridayReward
  }
}

export { BlackFridayReward, BlackFridayRewardList }

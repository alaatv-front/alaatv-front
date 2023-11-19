import { Model, Collection } from 'js-abstract-model'
import { BlackFridayVideoList } from 'src/models/BlackFridayVideo.js'
import { BlackFridayRewardList } from 'src/models/BlackFridayReward.js'

class BlackFridayCampaignData extends Model {
  constructor (data) {
    super(data, [
      {
        key: 'videos',
        relatedModel: BlackFridayVideoList
      },
      {
        key: 'chance',
        default: 0
      },
      {
        key: 'rewards',
        relatedModel: BlackFridayRewardList
      }
    ])
  }
}

class BlackFridayCampaignDataList extends Collection {
  model () {
    return BlackFridayCampaignData
  }
}

export { BlackFridayCampaignData, BlackFridayCampaignDataList }

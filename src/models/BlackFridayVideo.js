// import Url from './Url.js'
// import { SetList } from './Set.js'
// import ContentSection from './ContentSection.js'
// import { ContentTimePointList } from './ContentTimePoint.js'
// import { PlayerSourceList } from 'src/models/PlayerSource.js'
import { Model, Collection } from 'js-abstract-model'

class BlackFridayVideo extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'description' },
      { key: 'coupon_display_title' }, // جایزه 300 هزار تومانی
      { key: 'is_active' },
      { key: 'has_played' },
      { key: 'has_watched' },
      { key: 'includes_coupon' },
      { key: 'thumbnail' },
      {
        key: 'file',
        default: {
          video: [
            // {
            //   uuid: '9ad96c09-ad21-45fd-85b7-6d815b5061a5',
            //   size: 359970773,
            //   caption: 'کیفیت عالی',
            //   res: '720p',
            //   type: 'video',
            //   ext: 'mp4',
            //   link: 'http://127.0.0.1:82/d/eyJpdiI6IlV5ZUV5WTl1c3draTdyMXZtTm4vUmc9PSIsInZhbHVlIjoiUGpqMzd2c0IyME9FclhwbGxVMmc4RXVsdFYvbzlaUHlvcVplZkQzbDhtVGh0YnZoQU1uaThsVlBhWm5nYTFTVzRXdE5kazZOblZjeGVKaFRCd3UvU2dWUWpaS2hhVk1qclVxcEJwQ3J1enhaT21jSTNpb3dpTlRJVzUzWXc4MnA1SXI4ODJoSVFHOG1lRDJlM3BJU1AwUFRocXJHbVQ4Q25aVFZ4N1dKRUhIc3MwWGZRTTREMUsyNEhZRVJyK3hhIiwibWFjIjoiM2M0ZmQ3MWVmY2ViY2FlMWQxYjdjN2UyNmQ2YmNkNzE0ZGU3NGNmNWE1YzdlODdhMmJjNTgxN2RkNzQ3ZWE2YiIsInRhZyI6IiJ9'
            // },
            // ...
          ]
        }
      },
      { key: 'type' },
      { key: 'ext' },
      { key: 'link' }
    ])
  }
}

class BlackFridayVideoList extends Collection {
  model() {
    return BlackFridayVideo
  }
}

export { BlackFridayVideo, BlackFridayVideoList }

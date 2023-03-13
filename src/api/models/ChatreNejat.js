import APIRepository from '../classes/APIRepository.js'
import { apiV2 } from 'src/boot/axios.js'
import { Fake } from '../classes/fakeDataGenerator.js'
const APIAdresses = {
  base: 'chatr',
  products: 'products'
}
export default class ChatreNejatAPI extends APIRepository {
  constructor() {
    super('Chatr', apiV2, 'chatr', {}, APIAdresses)
  }

  products(data, cache) {
    // return this.sendRequest({
    //   apiMethod: 'get',
    //   api: this.api,
    //   request: this.APIAdresses.products,
    //   cacheKey: this.CacheList.products,
    //   ...(cache && { cache }),
    //   resolveCallback: (response) => {
    //     return response.data.data
    //   },
    //   rejectCallback: (error) => {
    //     return error
    //   }
    // })
    const products = new Promise((resolve, reject) => {
      const productList = fake.fakeData(product, 5)
      resolve(productList)
    })
    return products
  }
}

const product = {
  title: null,
  description: null,
  teacher: null,
  photo: null,
  url: null,
  lastSeen: {
    title: null,
    section: null,
    url: null
  }
}
const fake = new Fake()

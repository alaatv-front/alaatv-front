import Price from 'src/models/Price.js'
import { apiV2 } from 'src/boot/axios.js'
import { SetList } from 'src/models/Set.js'
import APIRepository from '../classes/APIRepository.js'
import { Content, ContentList } from 'src/models/Content.js'
import { Product, ProductList } from 'src/models/Product.js'
import { ProductCategoryList } from 'src/models/ProductCategory.js'
export default class ProductAPI extends APIRepository {
  constructor () {
    super('product', apiV2)
    this.APIAdresses = {
      base: '/product',
      bulk: (productIds) => {
        const idParams = []
        productIds.forEach((productId, productIndex) => {
          idParams.push('ids' + '[' + productIndex + ']=' + productId)
        })
        const queryParams = idParams.join('&')
        // display=2 for show all products
        const queryParamsWithDisplay = queryParams + (queryParams.length > 0 ? '&' : '') + 'display=2'
        return '/product?' + queryParamsWithDisplay
      },
      liveProducts: '/product/lives',
      admin: {
        create: '/reqres/api/users',
        edit: '/admin/product',
        index: '/admin/product',
        show: '/admin/product'
      },
      getSets: id => `/product/${id}/sets`,
      siblings: productId => `/product/${productId}/siblings`,
      getAdminSets: id => `/admin/product/${id}/sets`,
      liveLink: id => `/product/${id}/liveInfo`,
      getComments: id => `/product/${id}/content-comments`,
      getContents: id => `/product/${id}/contents`,
      favored: (id) => '/product/' + id + '/favored',
      unfavored: (id) => '/product/' + id + '/unfavored',
      show: (id) => '/product/' + id,
      gifts: (id) => '/gift-products/' + id,
      getPrice: (productId) => '/getPricgroupIndexe/' + productId,
      sampleContent: (id) => '/product/' + id + '/sample',
      categories: '/product-categories',
      liveConductors: '/live-conductors',
      userLastState: (id) => '/product/' + id + '/toWatch',
      productComplimentary: (id) => `/product/${id}/complimentary`,
      productExams: (id) => `/product/${id}/exams`,
      productFaq: (id) => `/product/${id}/faq`,
      updateSets: (productId) => '/product/' + productId + '/updateSetOrder'
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      bulk: (productIds) => this.name + this.APIAdresses.bulk(productIds),
      siblings: (productId) => this.name + this.APIAdresses.siblings(productId),
      liveProducts: this.name + this.APIAdresses.liveProducts,
      liveLink: (id) => this.name + this.APIAdresses.liveLink(id),
      create: this.name + this.APIAdresses.create,
      favored: id => this.name + this.APIAdresses.favored(id),
      getSets: id => this.name + this.APIAdresses.getSets(id),
      getAdminSets: id => this.name + this.APIAdresses.getAdminSets(id),
      getContents: id => this.name + this.APIAdresses.getContents(id),
      unfavored: id => this.name + this.APIAdresses.unfavored(id),
      show: (id) => this.name + this.APIAdresses.show(id),
      gifts: (id) => this.name + this.APIAdresses.gifts(id),
      sampleContent: (id) => this.name + this.APIAdresses.sampleContent(id),
      categories: this.name + this.APIAdresses.categories,
      edit: this.name + this.APIAdresses.edit,
      productComplimentary: (id) => this.name + this.APIAdresses.productComplimentary(id),
      productExams: (id) => this.name + this.APIAdresses.productExams(id),
      productFaq: (id) => this.name + this.APIAdresses.productFaq(id)
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new Product(response.data.data) },
      post: (response) => { return new Product(response.data.data) },
      put: (response) => { return new Product(response.data.data) },
      delete: (response) => { return new Product(response.data.data) }
    })
  }

  show (productId, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.show(productId),
      cacheKey: this.CacheList.show(productId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new Product(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  updateSetOrders (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.updateSets(data.productId),
      data: { product_orders: data.payload }, // must be an array of objects that are including setId & setOrder like: {set: setId, order: setOrder}
      resolveCallback: (response) => {
        return response // []
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  liveConductors (cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.liveConductors,
      cacheKey: this.CacheList.liveConductors,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new ProductList(response.data.data.map(item => {
          item.product.live_link = item.live_link
          return item.product
        }))
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  gifts (productId, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.gifts(productId),
      cacheKey: this.CacheList.gifts(productId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new ProductList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  sampleContent (productId, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.sampleContent(productId),
      cacheKey: this.CacheList.sampleContent(productId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new ContentList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  favored (productId) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.favored(productId),
      cacheKey: this.CacheList.favored(productId),
      resolveCallback: (response) => {
        const defaultMessageObject = {
          message: '' // String
        }
        return this.getNormalizedSendData(defaultMessageObject, response.data).message
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  unfavored (productId) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.unfavored(productId),
      cacheKey: this.CacheList.unfavored(productId),
      resolveCallback: (response) => {
        const defaultMessageObject = {
          message: '' // String
        }
        return this.getNormalizedSendData(defaultMessageObject, response.data).message
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getPrice (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.getPrice(data.product_id),
      data: this.getNormalizedSendData({
        mainAttributeValues: [], // Array
        extraAttributeValues: [], // Array
        products: [] // Array
      }, data),
      resolveCallback: (response) => {
        return new Price(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getProductList (data, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.bulk(data.productIds),
      cacheKey: this.CacheList.bulk(data.productIds),
      ...(cache !== undefined && { cache }),
      data: data.params,
      resolveCallback: (response) => {
        return new ProductList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getLiveProducts (cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.liveProducts,
      cacheKey: this.CacheList.liveProducts,
      ...(cache !== undefined && { cache }),
      resolveCallback: (response) => {
        return new ProductList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getLiveLink (productId, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.liveLink(productId),
      cacheKey: this.CacheList.liveLink(productId),
      ...(cache !== undefined && { cache }),
      resolveCallback: (response) => {
        return response.data.data.live_link // String
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getSets (productId, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getSets(productId),
      cacheKey: this.CacheList.getSets(productId),
      ...(cache !== undefined && { cache }),
      resolveCallback: (response) => {
        return new SetList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getAdminSets (productId, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getAdminSets(productId),
      cacheKey: this.CacheList.getAdminSets(productId),
      ...(cache !== undefined && { cache }),
      resolveCallback: (response) => {
        return new SetList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getContents (data = {}, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getContents(data.id),
      cacheKey: this.CacheList.getContents(data.id),
      ...(cache !== undefined && { cache }),
      ...(cache !== data && { data: data.data }),
      resolveCallback: (response) => {
        return new ContentList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      },
      params: data.params
    })
  }

  getCategories (cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.categories,
      cacheKey: this.CacheList.categories,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new ProductCategoryList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getUserLastState (id, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.userLastState(id),
      CacheList: this.CacheList.userLastState(id),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new Content(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getProductComplimentary (id, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.productComplimentary(id),
      // CacheList: this.CacheList.productComplimentary(id),
      // ...(cache && { cache }),
      resolveCallback: (response) => {
        return new ProductList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getProductExamList (id, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.productExams(id),
      // CacheList: this.CacheList.productExams(id),
      // ...(cache && { cache }),
      resolveCallback: (response) => {
        return response.data.data // examList
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getProductFaq (id, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.productFaq(id),
      // CacheList: this.CacheList.productFaq(id),
      // ...(cache && { cache }),
      resolveCallback: (response) => {
        return response.data.data // FAQ list
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getSiblings (productId, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.siblings(productId),
      CacheList: this.CacheList.siblings(productId),
      ...(cache && { cache }),
      resolveCallback: () => {
        const response = {
          data: {
            data: [
              {
                id: 1315,
                title: 'test5',
                price: {
                  base: 0,
                  discount: 0,
                  final: 0,
                  payableByWallet: null,
                  final_instalmentally: 0,
                  discount_instalmentally: 0
                },
                url: {
                  web: 'http://127.0.0.1:82/product/1315',
                  api: 'http://127.0.0.1:82/api/v2/product/1315'
                },
                photo: 'https://nodes.alaatv.com/upload/images/product/test.jpg',
                attributes: {
                  info: {
                    teacher: null,
                    shipping_method: null,
                    major: null,
                    services: null,
                    download_date: null,
                    educational_system: null,
                    duration: [],
                    production_year: null,
                    expiration_duration: null,
                    grade: null
                  },
                  extra: null,
                  subscription: null
                },
                category: 'هفتانه',
                variant: '-',
                is_purchased: false,
                is_dependent: null,
                enable: 1,
                has_instalment_option: 0,
                payment_default: 1,
                instalments: null,
                duration: 6000,
                number_of_sessions: 3
              },
              {
                id: 1311,
                title: 'test4',
                price: {
                  base: 0,
                  discount: 0,
                  final: 0,
                  payableByWallet: null,
                  final_instalmentally: 0,
                  discount_instalmentally: 0
                },
                url: {
                  web: 'http://127.0.0.1:82/product/1311',
                  api: 'http://127.0.0.1:82/api/v2/product/1311'
                },
                photo: 'https://nodes.alaatv.com/upload/images/product/test.jpg',
                attributes: {
                  info: {
                    teacher: null,
                    shipping_method: null,
                    major: null,
                    services: null,
                    download_date: null,
                    educational_system: null,
                    duration: [],
                    production_year: null,
                    expiration_duration: null,
                    grade: null
                  },
                  extra: null,
                  subscription: null
                },
                category: 'هفتانه',
                variant: '-',
                is_purchased: false,
                is_dependent: null,
                enable: 1,
                has_instalment_option: 0,
                payment_default: 1,
                instalments: null,
                duration: 6000,
                number_of_sessions: 3
              }
            ]
          }
        }
        return new ProductList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

// function loadFakeSets(sets) {
//   let categoryCounter = 1
//   return sets.map((set, setIndex) => {
//     if ((setIndex % 4) > 2) {
//       categoryCounter++
//     }
//     const lessonName = 'درس شماره ' + categoryCounter
//     const setCategoryName = 'سرفصل شماره ' + categoryCounter
//     const setName = set.short_title
//     return {
//       id: set.id,
//       sections: set.sections,
//       short_title: lessonName + '-' + setCategoryName + '-' + setName
//     }
//   })
// }

// const fakeProductExam = [
//   {
//     id: 1,
//     name: 'ghalamchi',
//     display_name: 'قلم چی'
//   },
//   {
//     id: 2,
//     name: 'soala',
//     display_name: 'سوالا'
//   },
//   {
//     id: 3,
//     name: 'ghalamchi',
//     display_name: 'قلم چی'
//   }
// ]

// const fakeProductFaq = [
//   {
//     id: 1,
//     title: 'هر فرسنگ چه مباحثی رو پوشش میده و چقدر طول میکشه؟',
//     body: '<p><font face="IRANSans Light, serif">فرسنگ‌ها بر اساس آزمون‌های گزینه دو طراحی شدن، یعنی مباحث هر آزمون رو پوشش میدن، پس از لحاظ زمانی قابل دسته بندی هستن و میشه گفت مدت هر فرسنگ 3 هفته‌اس.<br>از لحاظ مبحثی ما کمی جلوتر از مباحث آزمون پیش میریم درنتیجه میشه گفت که هر فرسنگ یه مبحث مجزا رو پوشش میده.<br><br>سرفصل فرسنگ‌ها:<br></font>&nbsp; &nbsp; فرسنگ اول (7 مهر تا 19 مهر): تابع - معادلات<br>&nbsp; &nbsp; فرسنگ دوم (20 مهر تا 10 آبان): تابع - مجموعه<br>&nbsp; &nbsp; فرسنگ سوم (11 آبان تا 1 آذر): مثلثات<br>&nbsp; &nbsp; فرسنگ چهارم (2 آذر تا 22 آذر): عبارات گویا، توان و رادیکال - حد و پیوستگی<br>&nbsp; &nbsp; فرسنگ پنجم (23 آذر تا 27 دی): مشتق<br>&nbsp; &nbsp; فرسنگ ششم (28 دی تا 11 بهمن): احتمال - مشتق<br>&nbsp; &nbsp; فرسنگ هفتم (12 بهمن تا 2 اسفند): توابع نمایی و لگاریتمی - کاربرد مشتق<br>&nbsp; &nbsp; فرسنگ هشتم (3 اسفند تا 23 اسفند): هندسه<br>&nbsp; &nbsp; فرسنگ نهم (24 اسفند تا 29 اسفند): آمار<br></p>'
//   },
//   {
//     id: 2,
//     title: 'من توی آزمون آزمایشی دیگه‌ای شرکت میکنم، چطور پیش برم؟',
//     body: '<p><span lang="FA" dir="RTL" style="font-size:11.0pt;\r\nline-height:107%;font-family:&quot;IRANSans Light&quot;,serif;mso-fareast-font-family:\r\n&quot;Times New Roman&quot;;mso-ansi-language:EN-US;mso-fareast-language:EN-US;\r\nmso-bidi-language:FA">فرسنگ‌ها به ترتیب آزمون‌ها و به عبارتی روند کتاب دوازدهم\r\nتهیه شدن. با توجه به اینکه ما هم هر مبحث رو زودتر به اتمام میرسونیم، داوطلبین\r\nهر آزمونی میتونن با استفاده از فرسنگ‌های راه ابریشم درصد بالایی از آزمون‌هاشون\r\nرو پوشش بدن. ما هم توصیه میکنیم با توجه به اینکه برنامه اصلی راه ابریشم تا عید\r\nبه اتمام میرسه، طبق برنامه ما پیش برید تا برای مرور و جمع بندی مطالب هم وقت\r\nخوبی داشته باشید.</span><br></p>'
//   },
//   {
//     id: 3,
//     title: 'من دوره صفر تا صد ریاضی تجربی رو دیدم، الان تو کدوم مرحله‌ام؟',
//     body: '<p><span lang="FA" dir="RTL" style="font-size:11.0pt;\r\nline-height:107%;font-family:&quot;IRANSans Light&quot;,serif;mso-fareast-font-family:\r\n&quot;Times New Roman&quot;;mso-ansi-language:EN-US;mso-fareast-language:EN-US;\r\nmso-bidi-language:FA">راه ابریشم براساس دوره رایگان صفر تا صد تهیه شده و الان\r\nکه از صفر تا صد به طور کامل استفاده کردی و همه مطالب رو آموزش دیدی، حالا با\r\nتورق‌ها یه مرور روی نکات مهم و تمام آموخته‌هات انجام میدی و بعد هم با حل تست‌ها\r\nتمام مطالبی که آموختی رو تثبیت میکنی و سرعت تست زنیت رو بیشتر میکنی و برای\r\nآزمون‌های آزمایشی و در نهایت کنکورت کاملن آماده بشی!</span><br></p>'
//   }
// ]

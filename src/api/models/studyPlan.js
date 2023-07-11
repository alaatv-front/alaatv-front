import APIRepository from '../classes/APIRepository'
import { apiV2 } from 'src/boot/axios'
import { StudyPlan, StudyPlanList } from 'src/models/StudyPlan'

export default class StudyPlanAPI extends APIRepository {
  constructor() {
    super('studyPlan', apiV2, '/plan', new StudyPlan())
    this.APIAdresses = {
      plan: '/plan',
      studyEvent: (id) => '/studyEvent/' + id + '/studyPlans',
      getPlans: (id) => '/studyPlan/' + id + '/plans',
      planOptions: '/abrisham/selectPlan/create',
      myStudyPlan: '/abrisham/myStudyPlan',
      StudyPlan: '/studyPlan'
    }
    this.CacheList = {
      studyEvent: (id) => this.name + this.APIAdresses.studyEvent(id),
      getPlans: (id) => this.name + this.APIAdresses.getPlans(id),
      StudyPlan: this.name + this.APIAdresses.StudyPlan
    }
  }

  getStudyEvents(id, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.studyEvent(id),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new StudyPlanList(response.data.data)
      },
      rejectCallback: () => {
        return new StudyPlanList()
      }
    })
  }

  getPlans(id, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getPlans(id),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new StudyPlanList(response.data.data)
      },
      rejectCallback: () => {
        return new StudyPlanList()
      }
    })
  }

  getChangePlanOptions() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.planOptions,
      resolveCallback: (response) => {
        return {
          grades: response.data.data.grades ? response.data.data.grades : [],
          majors: response.data.data.majors ? response.data.data.majors : [],
          studyPans: response.data.data.studyPans ? response.data.data.studyPans : []
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getMyStudyPlan() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.myStudyPlan,
      resolveCallback: (response) => {
        return response.data.data // object of user study plan info
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getStudyPlans(data, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.StudyPlan,
      cacheKey: this.CacheList.StudyPlan,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new StudyPlanList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }
}

// const studyPlanList = [
//   {
//     id: 216,
//     event: {
//       id: 6,
//       name: 'taftan1401AzEsf',
//       title: 'تفتان 1401 شروع از 21 اسفند',
//       created_at: '2022-03-08 13:52:38',
//       updated_at: '2022-03-08 13:52:40',
//       major_id: 1,
//       grade_id: 4,
//       method_id: 1,
//       start_at: '2023-06-22 11:56:53'
//     },
//     row: 1,
//     voice: null,
//     body: null,
//     title: null,
//     plan_date: '2022-03-12',
//     plans: [
//       {
//         id: 3483,
//         title: 'زیست',
//         description: 'جلسه 1 و 2',
//         long_description: '<p dir="auto"></p>',
//         start: '09:00:00',
//         end: '09:50:00',
//         major: {
//           id: 2,
//           name: 'تجربی',
//           title: 'تجربی',
//           selected: false
//         },
//         backgroundColor: null,
//         borderColor: null,
//         textColor: null,
//         url: null,
//         voice: null,
//         video: null,
//         contents: [
//           {
//             id: 33894,
//             redirect_url: null,
//             type: {
//               id: 4,
//               title: 'lesson_video',
//               display_name: 'فیلم درس'
//             },
//             title: 'درسنامه - دستگاه گوارش ، مقدمات لوله گوارش',
//             url: {
//               web: 'http://127.0.0.1:82/c/33894',
//               api: 'http://127.0.0.1:82/api/v2/c/33894'
//             },
//             file: {
//               video: [
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6Ik5NN3QzWnFoRExrQm04UUFCbG1DMmc9PSIsInZhbHVlIjoidExDWW42NVJkNTUzdjNQQUltMndYNzE0RlJXdm9PR1RMeVp4NnFVM3M5ZGhUaTJmZG80RGRWMy9McVZLcWl2a0Q0VEtWYmlZMmZOdW50SU9hNzRydndEbkhEMjhKaXBBY01EVEc5ZFJSUXMydTQwdUVCUVpMS1E3NUF4QS84VVozcmtXKzNkbzB0TzcrNU91RklqL0JBa20veXlUMFA5UDVTTVhLaGwwL0EyQ2tjaVlUNnJORTN0YmZNRTBGNjNwIiwibWFjIjoiOWZjNmJhNDZhMzBiNDc3ZDYxOTQ4MjUyNzRjMmZlM2IzOTU3NzgxNTJjMDcwMTJhOGJhN2E5MzIwNjhjM2E5ZiIsInRhZyI6IiJ9',
//                   ext: 'mp4',
//                   size: '431.06 MB',
//                   caption: 'کیفیت عالی',
//                   res: '720p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6IjlqQlpRSi9raGlxcnJ5eFdGVzRBeHc9PSIsInZhbHVlIjoiaFI0bGpXWGllcGVnQjQyL1FMbWVDeUVobHQvRVhYakM1dDdQR1h2eW5YMi9hN0RpK2RVelhxaVBNYWRXUVovNzd4djJwY2psZmZFeUtXQnRxL1gvdWFNaGQvSGdwZzJpOFRVZ0pvM1BOaVk1b0ZnaWNlazFCU243WVA4UDM4OGd6NVd3QjNYKzJtUmlIc2RMMFRsU1pkTkpYSGNzaW51b1RKTC9QVWZmRVN3PSIsIm1hYyI6IjNjOTgzNGMwYTZiZjRjYTIwMzhiOGNmNGY0NGNhNThhZmM4YjEwNTc2OWFkNDE2ODE3MmU0OWQ5NjZlMjdiNDgiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '88.51 MB',
//                   caption: 'کیفیت بالا',
//                   res: '480p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6InBpOWRUU1RUOEJsL1V3NW5CYWlLU2c9PSIsInZhbHVlIjoiS052K2ZlS2E0bGJpbzN4ekNXVTFZSFNZMDdPQkMvQUJ5NnMwMFkvOWo4WkZKajZvaTlqY040WjZxbUFBMy9QeDBMckN5UE5HSUVhbEFpeXhtT3ZaQTdmNVd5OXFZS0NVSnhLRmpZcE0zb0l3R0xwNDlZeVN6Qmp2a1h3dlo4eTh4U3BIeXNaVXdJc3Vab2FzaWQzajcxbHByc0swM0lta2h3MmN4Mi9IY0YwPSIsIm1hYyI6IjI0NzQwYjc4MDZmODkwNjFlMWY5NWJmYjUwYThkNDM4YzUzM2QyMWVmNTYxN2MxYzg5OWZhZmZmNDQ1MDk0MzUiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '38.4 MB',
//                   caption: 'کیفیت متوسط',
//                   res: '240p'
//                 }
//               ],
//               pamphlet: null,
//               voice: null
//             },
//             photo: 'https://nodes.alaatv.com/media/thumbnails/1439/1439001jghf.jpg',
//             can_see: 1,
//             has_watched: false,
//             set: {
//               id: 1439,
//               redirect_url: null,
//               title: 'جمع بندی زیست پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
//               short_title: 'جمع بندی زیست شناسی پایه (دهم و یازدهم) همایش تفتان',
//               photo: null,
//               url: {
//                 web: 'http://127.0.0.1:82/set/1439',
//                 api: 'http://127.0.0.1:82/api/v2/set/1439'
//               },
//               redirect_code: null
//             }
//           },
//           {
//             id: 33895,
//             redirect_url: null,
//             type: {
//               id: 4,
//               title: 'lesson_video',
//               display_name: 'فیلم درس'
//             },
//             title: 'درسنامه - دستگاه گوارش ، دهان و معده',
//             url: {
//               web: 'http://127.0.0.1:82/c/33895',
//               api: 'http://127.0.0.1:82/api/v2/c/33895'
//             },
//             file: {
//               video: [
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6InRIMkZNL3hBSXdsWVVqeEdmK0ZIMVE9PSIsInZhbHVlIjoiNWRlb3dNOVcxdWtyTTBaWEZ1SFpDdStGTC9pcTRjTWNucVhOaVNPMk5rQVNMWUVCWlhYSWM2UkpzcFR4YlRJY1llM2NIanZnbXZiRlFHVHFnaE1BR3JwYUI5WHgyRWZkZmZJN0lSQnBTL0JRUm1PSnNTVWx4ZzJGRUxwZldwM0hKaThWcXpQSUowNG40WmRqd2Vid2dOc3ByeVdwTmdpbzdFMGlxQXJRcm50L3BYd1U4aU0wOURVNjFicmZUZnNXIiwibWFjIjoiMjEyZGEyZWVhYWRiMTg0MWFkOWY0NDZlNTAyMjE2MGRkMDEwZTU1NDQzNTk3NzU2ODUwODFjMDkwNTFhNjEwMiIsInRhZyI6IiJ9',
//                   ext: 'mp4',
//                   size: '446.98 MB',
//                   caption: 'کیفیت عالی',
//                   res: '720p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6IitVMXRuUmJCbC8rLzFkaE1QUWNVSkE9PSIsInZhbHVlIjoiK3hqdzZyU3I3UnRxTTZZcVI0WDFxbWpWQnp6UHo5elNmbjN2K3daWlBiK1M3cjMvVTlNVUZxY1NmcWFhdzJQRDhhdGNreEZsMTBsV0hCbFNFaUhuRlVybnZ4WEVSZzRmeUZuUE1QaWtDVWk3QkZJU0hnalJMQnlWc3FLRS82L0wvV3BQQW9NUVFxZ29sRVY1RUVCeHhWZG9OK2lwOXZ4ZmtjblBOV0l3eWxZPSIsIm1hYyI6IjA5YmJkM2Q0MzBjYjcyMWExM2Y0MWZkNzJmMmZhOGZjYzk2ZGExNTZkYjUxZDNmMGY4NWVmZTBkMThmNjEwNWUiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '92.92 MB',
//                   caption: 'کیفیت بالا',
//                   res: '480p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6ImlDb1FpeFFqSjBDZ0tCeVRYYjc4alE9PSIsInZhbHVlIjoiR053MTRSd3QyQW9QTVo3cmc1dDJINDl1b1pJR2g3UjRHSXhYcVNHeGVtcTlSTGNWTXF2SGQ5SzZiaDNadlBBNC9PTXZQWEdncFRhcjBVWG5aZVViNWt1Z2RuVzVaYUViSTE0TTBnblVkSmNoZkY1amVXT1hMVVhlbFp6UHI4Uy81ZERIdG1Rd1pYdFQ3RC85VDBvRzZXcjN0VXcvSEF2aVZGOUJLS0RPNVBBPSIsIm1hYyI6IjhkODE5MjVlYzBmNWQwNjdhZjU5ZDM1MTkxZmRhMmE3Zjg1NTQxZDg0ODZhNDcwYmE0OTliNTAyOThjZTMyZTciLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '40.13 MB',
//                   caption: 'کیفیت متوسط',
//                   res: '240p'
//                 }
//               ],
//               pamphlet: null,
//               voice: null
//             },
//             photo: 'https://nodes.alaatv.com/media/thumbnails/1439/1439002yhui.jpg',
//             can_see: 1,
//             has_watched: false,
//             set: {
//               id: 1439,
//               redirect_url: null,
//               title: 'جمع بندی زیست پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
//               short_title: 'جمع بندی زیست شناسی پایه (دهم و یازدهم) همایش تفتان',
//               photo: null,
//               url: {
//                 web: 'http://127.0.0.1:82/set/1439',
//                 api: 'http://127.0.0.1:82/api/v2/set/1439'
//               },
//               redirect_code: null
//             }
//           }
//         ],
//         grade: {
//           id: 8,
//           name: 'davazdahom',
//           title: 'دوازدهم'
//         },
//         exam: {
//           id: 1,
//           title: 'قلمچی'
//         },
//         product: {
//           id: 657,
//           title: null,
//           lesson_name: null
//         }
//       },
//       {
//         id: 3484,
//         title: 'زیست',
//         description: 'جلسه 3 و 4',
//         long_description: '<p dir="[object Object]"></p>',
//         start: '10:00:00',
//         end: '10:50:00',
//         major: {
//           id: 2,
//           name: 'تجربی',
//           title: 'تجربی',
//           selected: false
//         },
//         backgroundColor: null,
//         borderColor: null,
//         textColor: null,
//         url: null,
//         voice: null,
//         video: null,
//         contents: [
//           {
//             id: 33896,
//             redirect_url: null,
//             type: {
//               id: 4,
//               title: 'lesson_video',
//               display_name: 'فیلم درس'
//             },
//             title: 'تست - دستگاه گوارش،  تست جلسات 1 و 2',
//             url: {
//               web: 'http://127.0.0.1:82/c/33896',
//               api: 'http://127.0.0.1:82/api/v2/c/33896'
//             },
//             file: {
//               video: [
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6Ii9aNU5Nc2JBczVyUWlaa1BFTG1CTUE9PSIsInZhbHVlIjoiaEUvTnZjbEVVakNMZzQ0SC9xbE5FZDJpUlVQUEZhRzJDVzNxR2RSSmFnNFYyOUw1c2JDdVIyK2N2ZEpzeXhqTFN6d1ROSmlXNmxmWVhKaWNIa2dZV1hDZVEyYmJYUDVuOXAyc25kVHVPOUVBcEY3RGxxd3Y4aEdCNzh0K2Q3RmNMMkxVZU1vTWxOUFBKYlZKdjNLeTVvZE1TdnNPa3lzcDV5V0dTcnhMRmNSbkg1dExkOWJUU29XeFliaW93THcvIiwibWFjIjoiMWJjYTc2MDA4ODFiMzM2YzhhMTgzYTQ1MzIwMGQ1ZjdmZmMwMDg5ZmIwM2RmNTI1NjJmNjEyNmQzOTY0Yzk1NSIsInRhZyI6IiJ9',
//                   ext: 'mp4',
//                   size: '407.14 MB',
//                   caption: 'کیفیت عالی',
//                   res: '720p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6Ino2TVRCZlhkVHFja1h0c1l5cW0vU1E9PSIsInZhbHVlIjoiR1Byc0t0eHV3L05zVlpnU2ZEZG1VRjVRR2xUSkdxSWRZMlpML0cxZ2d1dnZkbWo4NmRrMnVGMjVvcjRwUHZmeSttMjBrM3k4M0hoRmFaSzNEL2VhVm8wdGd3ZzRIMzRXbGo5U3JzL0Q0Ry9lREw3aUtNNG5DUzcxQ1l6WmJiRE5xK2xPK0dvUDdVNk9zS01QOWEwOTY4OStHczJtRHI4bTVvSGQ3SVc4OXBZPSIsIm1hYyI6IjkxM2UwZjA5MzI1MDM0OWNlYTVlNDQ2ZDQ5ZWFkNWM5N2UyY2ZiZTUyOTYzMDEyODQ0Mzk3NTFlYjA4Y2Y1Y2YiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '79.09 MB',
//                   caption: 'کیفیت بالا',
//                   res: '480p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6IldheEV0bnU0bjZ3Nzd5SEtVcUUrVGc9PSIsInZhbHVlIjoiVVdQWTNIVk1QdEFIUVJXK2pMZGlsMlVaalprZ2pnWmdaRTEwTzdOTHdRS0tkdDlyWWFqcVpwemxBNEpGbGpubll4UFFHWUlTVDdkRFQrL3lkb1NJczZoNmx0d3FreXFCY0tYWWJPTlc0ZlUraklZZnc1MVY1M3Z3cUhvbWlZYkc4bTBLVTV5N0p2d1pXTW5BN2ozOWhmS0VqYkcydWQzcXAxR2lzZW5IMlo4PSIsIm1hYyI6ImVkNjRhMWEwZjJhYmRjYTgxYzA0NzVjZjYwMzYxOTViOWQ3NmFlZDQxNGMwZTZjMDM1YjdmNGE4ZDA2ZDQxNGUiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '33.02 MB',
//                   caption: 'کیفیت متوسط',
//                   res: '240p'
//                 }
//               ],
//               pamphlet: null,
//               voice: null
//             },
//             photo: 'https://nodes.alaatv.com/media/thumbnails/1439/1439003edsr.jpg',
//             can_see: 1,
//             has_watched: false,
//             set: {
//               id: 1439,
//               redirect_url: null,
//               title: 'جمع بندی زیست پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
//               short_title: 'جمع بندی زیست شناسی پایه (دهم و یازدهم) همایش تفتان',
//               photo: null,
//               url: {
//                 web: 'http://127.0.0.1:82/set/1439',
//                 api: 'http://127.0.0.1:82/api/v2/set/1439'
//               },
//               redirect_code: null
//             }
//           },
//           {
//             id: 33897,
//             redirect_url: null,
//             type: {
//               id: 4,
//               title: 'lesson_video',
//               display_name: 'فیلم درس'
//             },
//             title: 'درسنامه - دستگاه گوارش ، روده باریک - قسمت اول',
//             url: {
//               web: 'http://127.0.0.1:82/c/33897',
//               api: 'http://127.0.0.1:82/api/v2/c/33897'
//             },
//             file: {
//               video: [
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6IkMyZ1duOEo2bmp1ZmlUWEw0eDZXMGc9PSIsInZhbHVlIjoiRDlqN1Z0MHhlbjVGWjdCcmdzN1dOYXR5TGx4TnRhUzRSb3Nlc3BLR1lycG5aeVB3eHFMaS92b0dFWGpMUW8zaXN1bXEvTnpXTENVaW5qeEYzR09QZFlKWlZSaVlDVm5uT2t5d2hnb3B2Z0Z3M2lUNGZxTFZ1R0RKMTF4bG15amFWaTEyQ1VpWGZzaUdwNUx3eDQzVjRtVEFBcDlkQ29KOEpnUGJHWjFHSzBDdDlqOUdlNEY0VFdFN3JKOW5sSXpIIiwibWFjIjoiZDQxOTU0NDIzNGFjMjM2M2E0OGUyNWQwNjE0NDI2ZTczMTI4MDdjMTBiZTg1Y2JlNjg5NWE1Mzg5Y2Y0NTgxMyIsInRhZyI6IiJ9',
//                   ext: 'mp4',
//                   size: '330.77 MB',
//                   caption: 'کیفیت عالی',
//                   res: '720p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6IjFBWUlBWEFjN0VPQ00yVUhBbkVWYnc9PSIsInZhbHVlIjoiOGJ2VVRPOXFVaG9qOUFvRXY2RlRPL1ExSk9OTjBCZjJieTdidS9hODBRUzNiK2hJMGV6TjM2M0RBM1p1U2JrRjdGUVZuZG1Cd0N5YnNiRk1LYkhPZm9taTFMN3dKRkQzTElxN1N2Mm9PdnBJUzE5WEh6U25qZ2FCaTVvek1LUURiTllLaFB6Ykpvakg0UVVkL25OTVBXOWh2dndDTE9CeFc3SFlzaFI3Y1VNPSIsIm1hYyI6IjEyNTg4ZDNhNjE4Y2ZmNjU5N2FjNzQyYzc4YmZjNTdkN2Y1OTdkZTZkMzliNjk0NWRlNDBmNjMxMjkzMzRmMWUiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '69.31 MB',
//                   caption: 'کیفیت بالا',
//                   res: '480p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6Img3bGdYVWNwcVJ6WUlEYnVzcE0xSXc9PSIsInZhbHVlIjoiUXR3cTRjbmlkclJiQ0duc1NQRjdDREduelpOalpOMEpqR2dhanpDalR0V2dqb3BTeTBFYm9ZdFAvUHRQMHdxZFRoVGZneXZjVm5rTjBXc2ZLdEZ2K1lCQm1HT3BjckF5bXZ0UXJQelhoVmtOTGRlZmxBT3oxTm5Oc1dicDUyTk5RRUFCaDN6dy95aUhHSCtBWjcrclRCZytYMGR1R08xLzRqUit3RFpqdjM4PSIsIm1hYyI6IjhlNTI0NGFmNTc0MTAxZTM0MGI4ZmVkMDI2NTc0M2QzN2IxYTc2MTRkZTk0NTBjMWU2NGRlY2Q1NGZmMTQ2ZjQiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '29.85 MB',
//                   caption: 'کیفیت متوسط',
//                   res: '240p'
//                 }
//               ],
//               pamphlet: null,
//               voice: null
//             },
//             photo: 'https://nodes.alaatv.com/media/thumbnails/1439/1439004hgyu.jpg',
//             can_see: 1,
//             has_watched: false,
//             set: {
//               id: 1439,
//               redirect_url: null,
//               title: 'جمع بندی زیست پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
//               short_title: 'جمع بندی زیست شناسی پایه (دهم و یازدهم) همایش تفتان',
//               photo: null,
//               url: {
//                 web: 'http://127.0.0.1:82/set/1439',
//                 api: 'http://127.0.0.1:82/api/v2/set/1439'
//               },
//               redirect_code: null
//             }
//           }
//         ],
//         grade: {
//           id: 8,
//           name: 'davazdahom',
//           title: 'دوازدهم'
//         },
//         exam: {
//           id: 1,
//           title: 'قلمچی'
//         },
//         product: {
//           id: 657,
//           title: null,
//           lesson_name: null
//         }
//       },
//       {
//         id: 3485,
//         title: 'زیست',
//         description: 'جلسه 5 و 6',
//         long_description: '<p dir="[object Object]"></p>',
//         start: '11:00:00',
//         end: '11:50:00',
//         major: {
//           id: 2,
//           name: 'تجربی',
//           title: 'تجربی',
//           selected: false
//         },
//         backgroundColor: null,
//         borderColor: null,
//         textColor: null,
//         url: null,
//         voice: null,
//         video: null,
//         contents: [
//           {
//             id: 33898,
//             redirect_url: null,
//             type: {
//               id: 4,
//               title: 'lesson_video',
//               display_name: 'فیلم درس'
//             },
//             title: 'درسنامه - دستگاه گوارش ، روده باریک - قسمت دوم',
//             url: {
//               web: 'http://127.0.0.1:82/c/33898',
//               api: 'http://127.0.0.1:82/api/v2/c/33898'
//             },
//             file: {
//               video: [
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6ImFyc1dGU1U5N0Z6QjRBMEp0cS9lN1E9PSIsInZhbHVlIjoiY3N0ZWJQWU9nLy91Q2g0UC9sNm1CNkQxZk44SWNESUllQWJaRk5TZGdodFNSS0JKNlExdjQyS2dqaFRBOUxaWTdjUFdXUWw5L0l6elFqUXl1RG9wKzE5Y0drZlVISW5zSHltYndOaGI3My9QT2xUZldzRW9iZmg0Y3BabGkyQmlJeU1wV25rZHh6SDM5WFF3bk1JSVYxNTY5UmNsVGtWdGlXclpIZll6U1padkFReTc3UWh3elJTb2oxbE5ZMUFxIiwibWFjIjoiODM4MGNmYjhlYWQ1OGJkOWQ0YjU5Yzk5YzE0OTRiN2NmYTVlMDg5YjE2ODZlZmE0NTg2MDRjYWVkNTY2ZTg0NSIsInRhZyI6IiJ9',
//                   ext: 'mp4',
//                   size: '335.39 MB',
//                   caption: 'کیفیت عالی',
//                   res: '720p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6IitNbnJiVk5wOHpHTmR0SGVRdFl3VlE9PSIsInZhbHVlIjoiQmxsR2pvb2p1ekduMXV6aEpnSVJCTmFOSEx5dXAxK252S1NEY2ovMkc3RXRqdDA0WHY5ejIxdGVkaUlMcDJCOU02czVlNGYrbGczbTBTRzZPN00xV2tERldFOUJWY1Q1b3hzY0wwSUFac2VCUEZwUnRnOWp1ZU1JK3ViZ3RLQVZYZ0tqZHZBVHpySnBsaXZneHNLdnZ6Qm1OSENZMWxQbzdkdG5IWm1ST3p3PSIsIm1hYyI6ImQyMGIyNGExNDY1ODM4Y2FlMjgyMWE5MzFiZjNkM2MxNDY0NmFiZDM4MDdlNjczNGYwMDg0Y2EzYzE2NmQ3MDkiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '67.09 MB',
//                   caption: 'کیفیت بالا',
//                   res: '480p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6InNQUU9sL2g0eWkwZE5tQUNya2dtU1E9PSIsInZhbHVlIjoiK3BMTUg1TEhZblhPNVIzSGlHd2Nwc2JVWTUwUWVaRGFsMVJRN2hnRHFzZ1BSNzM4RndLYmVuSEN1ZG9zNnhsVEcxZFZrYjBWWUpLRmY5akxIMUlCVUkzWHBzTzZ5bzNBc1krNWpFeGVWbUxBN1VaQy9ZNVltUmtybWhiTUdqWVJBMmFwMmQwV08xUFkrMXB5ZU5WZ0JGbG91R2hsUFlnVDdEa0dBNDczVzF3PSIsIm1hYyI6IjhjNmEwNzUyZjk4ZDM2OTAwM2ZkOGY1ZWM0YjFiZmUzYzZjZjg5M2NlYmRmYTQ5Yjc4OWNiZjhkYWQ0OTEzODkiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '29 MB',
//                   caption: 'کیفیت متوسط',
//                   res: '240p'
//                 }
//               ],
//               pamphlet: null,
//               voice: null
//             },
//             photo: 'https://nodes.alaatv.com/media/thumbnails/1439/1439005kjhg.jpg',
//             can_see: 1,
//             has_watched: false,
//             set: {
//               id: 1439,
//               redirect_url: null,
//               title: 'جمع بندی زیست پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
//               short_title: 'جمع بندی زیست شناسی پایه (دهم و یازدهم) همایش تفتان',
//               photo: null,
//               url: {
//                 web: 'http://127.0.0.1:82/set/1439',
//                 api: 'http://127.0.0.1:82/api/v2/set/1439'
//               },
//               redirect_code: null
//             }
//           },
//           {
//             id: 33899,
//             redirect_url: null,
//             type: {
//               id: 5,
//               title: 'tests',
//               display_name: 'تستها'
//             },
//             title: 'تست - دستگاه گوارش ، تست جلسات 4 و 5',
//             url: {
//               web: 'http://127.0.0.1:82/c/33899',
//               api: 'http://127.0.0.1:82/api/v2/c/33899'
//             },
//             file: {
//               video: [
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6IjM0dzA2dXJWZlAxWjJqOUM1UEJFY1E9PSIsInZhbHVlIjoiUW1FVmMycjFCNEFRYmFPZm1qSGJTelkyVlhUK25tbUtFWXg1cG4zRVVabGlSK05kN2lGL0ZEWmcrVFVza3RjWnpVcFQxRU9DbW1CdVJaektIbkg2VnVYNkpyUnhoWUYxZFZ0dDJic3hyNFZWMEVjQi9kZjU1NStXZGhRaEZSamx0VnlNTWUrNTNyTVVnM1UrQ0p5bUxqME8rVXpGZ3NTUnByOHdHZVNRb3pVZ1NlU3JHaXZiOHNyRjRIdTAyUnM3IiwibWFjIjoiYmUxNzAzYWVjZWEyNjUzMTgyNmNlMWFjOWMwZWIyOWZkMjNlMWM1NjEwMDhjZjg3ZTU1ZTI1MDEzZmQ5NDYyYiIsInRhZyI6IiJ9',
//                   ext: 'mp4',
//                   size: '336.02 MB',
//                   caption: 'کیفیت عالی',
//                   res: '720p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6IlZsSFVaR2hCVDdFQU9FQVZheDdOWUE9PSIsInZhbHVlIjoiRXo4VU5yajkwT05xa2VDb1BDY3hwWkFZWVpwd0RhMGNNMUlnMDlFaWtKejRKbTRDV3RvTHptQzJjVWowcllXd3RobWpJZ1duNUhlN1BPK1U2bkpBSHRpZVluSDFud1hmL0dTbUhWcG9GYlVqcVVsckdsZFp2ODV5ZGRWTlRpbm9UNlJMZmY2M21jRHc4SG5mSjJYbEpPOWpoZklUaUJxVEZDb1JyYlJOMFVVPSIsIm1hYyI6Ijg1MjY3ODJiZjZlZGQzOGFmNTFhNDNhZDM3ZGNiYjczMzdlNjUyZDc2YWRmYjI3NjVhNjFhNmQ5ZTI1MzVkYjUiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '67.08 MB',
//                   caption: 'کیفیت بالا',
//                   res: '480p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6InR1aE5YTnh2aFZnbnI1YnFvYjl5OUE9PSIsInZhbHVlIjoiL2E2bGl6d2xQVUIyaEpLWU80aDRJYVpvRkQxWjF0ZXovcjhUZGVyZjJUU2NkNGhwd2NVYkc5V0RSYStqV2syYTRzMGdoRnMzQjRlZ1BnUzFIdCtGbnlpUmJjMXkxaSsrbHZKaDI3TVcrdEVUQnRnNmlHZEZUTE5JUGxpeTBZejZBWHlzRTdVUHBUblorQlBVcFVKYjU2VldhNWFYWlkrNDRsMkhMOS9iTThNPSIsIm1hYyI6ImUxMjliOTAxY2NmZDAzNjZhNWU0MGFjMTFlZDI1MTBjZTk1YWY4YjI2MmU1MGI4NmU3MjkzMDI3NWVmMmQ1ZGEiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '27.79 MB',
//                   caption: 'کیفیت متوسط',
//                   res: '240p'
//                 }
//               ],
//               pamphlet: null,
//               voice: null
//             },
//             photo: 'https://nodes.alaatv.com/media/thumbnails/1439/1439006gfza.jpg',
//             can_see: 1,
//             has_watched: false,
//             set: {
//               id: 1439,
//               redirect_url: null,
//               title: 'جمع بندی زیست پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
//               short_title: 'جمع بندی زیست شناسی پایه (دهم و یازدهم) همایش تفتان',
//               photo: null,
//               url: {
//                 web: 'http://127.0.0.1:82/set/1439',
//                 api: 'http://127.0.0.1:82/api/v2/set/1439'
//               },
//               redirect_code: null
//             }
//           }
//         ],
//         grade: {
//           id: 8,
//           name: 'davazdahom',
//           title: 'دوازدهم'
//         },
//         exam: {
//           id: 1,
//           title: 'قلمچی'
//         },
//         product: {
//           id: 657,
//           title: null,
//           lesson_name: null
//         }
//       },
//       {
//         id: 3504,
//         title: 'ادبیات',
//         description: 'جلسه 1 تا 3',
//         long_description: '<p dir="[object Object]"></p>',
//         start: '12:00:00',
//         end: '12:50:00',
//         major: {
//           id: 2,
//           name: 'تجربی',
//           title: 'تجربی',
//           selected: false
//         },
//         backgroundColor: null,
//         borderColor: null,
//         textColor: null,
//         url: null,
//         voice: null,
//         video: null,
//         contents: [
//           {
//             id: 33690,
//             redirect_url: null,
//             type: {
//               id: 4,
//               title: 'lesson_video',
//               display_name: 'فیلم درس'
//             },
//             title: 'درسنامه - آرایه ، استعاره - قسمت اول',
//             url: {
//               web: 'http://127.0.0.1:82/c/33690',
//               api: 'http://127.0.0.1:82/api/v2/c/33690'
//             },
//             file: {
//               video: [
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6Ii8rRkZNT2xUMVJMR0ZEbFJsTFdQRFE9PSIsInZhbHVlIjoiZnJBWnZxVmpoS2UzTGFxajA1Zkhqb3pZY0ljU0VzdWpCTXBLa2xValpyeExueGxaL25DSkVaZUhFdmxMdEhjeTErd3lUbFpPSDJEWkZWdXJQRHcyUW12N044clAyTDB3QnlJTytMVUU3eU5RY1VxRFZQVzduYTRhMy9nZnA3TzZsSlhSY2J6UExVVGZJM2FTMjdhbDh4bElqZXI0eE9ESFZyZWJBRzl3M2dVelF2Tm5wMzU4OEE5UElVT3ZpLytHIiwibWFjIjoiY2UwNjE0OTYwNzRlNDg3MTEyOGU2OTgxMzQ2NjgzNTQ3MTU1YjJjYjgzNzllZDE2YjZmNDcyYzJmMzIxN2UwYyIsInRhZyI6IiJ9',
//                   ext: 'mp4',
//                   size: '269.46 MB',
//                   caption: 'کیفیت عالی',
//                   res: '720p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6InJDZGs3Sjh2Vnd4eXpWNlVPM0R6cUE9PSIsInZhbHVlIjoiVHZ6aHk3YUwva2FqSHdQanFXbTlnRGV1Q0cxLzNqVjhiWWFJN3dsaHVhckc4c0w4MStxMzBGNU1NbWNocVduUHZTa1F3UnIxZFplMVE3NHVCeFRZaktiWG1pcWRja2pqN3JkN21SaTZqSWFjdmhheUp6aVpyUi9QdWFVRFNmWStUNllHUmZSS0NCUVl5aXhaeTdDUmovWmJBV2VXa2ZKMXExeWFYL0dGUTFFPSIsIm1hYyI6IjZlNWY3MTBhZmMyYmRiNTU4OWM3ZTc2ZTlmYmIxYjQ3NzI3MWU1MWExZTJjMjE2MWNjNzc4ZTk1NTQ2MmMwMzMiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '42.17 MB',
//                   caption: 'کیفیت بالا',
//                   res: '480p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6InhkeU1qTG1LeERGbjMxZzJ3ZEk5R1E9PSIsInZhbHVlIjoiTVBVMzVKTjA5WHVNV3J0WTQ4L1MrWGR1UEFuRjF2S09xV1NDK096THhkeDdHdWxnR0hTbG00eFpaWm5TdDZrUFErM2grSk1DamVHdUh4S3lqYi9EVDNCdGE2VDVOQS82TFlsQ2tjeHpjRXl5SHU4aVlVRFJoejdmSFVhOVRJYXhnM1ZrRkRBQVhwU3VJRlhjaFkySDhnVlhwNis0aTlQMDN2VjhpUi81MHRjPSIsIm1hYyI6IjJiYmVkOTQ2MjFkOWIwOTIyZTRjMDY1MDcyNzk1ZWU3NzJiMjZmNmZiNDU5YzhkZDE0OGNmOGY3MzcwYzRjNjMiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '18.73 MB',
//                   caption: 'کیفیت متوسط',
//                   res: '240p'
//                 }
//               ],
//               pamphlet: null,
//               voice: null
//             },
//             photo: 'https://nodes.alaatv.com/media/thumbnails/1430/1430001utyr.jpg',
//             can_see: 1,
//             has_watched: false,
//             set: {
//               id: 1430,
//               redirect_url: null,
//               title: 'جمع بندی ادبیات پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
//               short_title: 'جمع بندی ادبیات پایه (دهم و یازدهم) همایش تفتان',
//               photo: null,
//               url: {
//                 web: 'http://127.0.0.1:82/set/1430',
//                 api: 'http://127.0.0.1:82/api/v2/set/1430'
//               },
//               redirect_code: null
//             }
//           },
//           {
//             id: 33691,
//             redirect_url: null,
//             type: {
//               id: 4,
//               title: 'lesson_video',
//               display_name: 'فیلم درس'
//             },
//             title: 'درسنامه - آرایه ، استعاره - قسمت دوم',
//             url: {
//               web: 'http://127.0.0.1:82/c/33691',
//               api: 'http://127.0.0.1:82/api/v2/c/33691'
//             },
//             file: {
//               video: [
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6IkVEaU1QOEZNSk5RUHBPTDQ1eTJHclE9PSIsInZhbHVlIjoiRFU3V2o1VnpsNzBTenFWdUpuMnZTSXQvV291M04xMG1VRW1Bc2I3cUFGWm1nbUc1V0tMM2F1cXR3Y09DMnJQWW9Qelp3OGp3ZzhjZGlQZG5nbnNhUElPNm0yaG9Ua3Z0cE82WjN6QjhrR1duUmRRK0tVSGg3YzZHL1VRQlJ0bFdMTlVXS2RiVWJWRGFKS2lCQW4vVUNyZFhweW5yb2pCUnkwSkVYNGNFZ0ZpaUlmaFhTRDdsUzIwZzQ2V1FoNVFmIiwibWFjIjoiZjJkYTVkZTM3ZTI1MDAzOGJmYjZiMmQxZWM3ZDQ2MGE0ZjhjYTNjNzRkMmU5MzM0MzExZTZhY2ZkY2E4ODdkMyIsInRhZyI6IiJ9',
//                   ext: 'mp4',
//                   size: '268.42 MB',
//                   caption: 'کیفیت عالی',
//                   res: '720p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6ImxJSTdLTC85VzdKb3FtNStrYWR2ekE9PSIsInZhbHVlIjoiaDNyeDZNaG1UL1JqT2dzQnRtYnVQc2tqaW5aTUZXY1hoQitsdWlHaFBETGxpMUt5WlhjUVhXN3YyWkQzd1FxOHk5WStNNHZyQmtEZTNoVkIwZjREemNpS2wrQTlQSnRVOWlFTHdZb1hpdlJuNVFHQjF1SmJvZGIvQXR0THE5WnpTcGdGMFVZQ1VDMEJIdW0wQ1ZYckFmdDdWeVRZZkw1Ykt0bkx5cGNSNzFRPSIsIm1hYyI6ImMxMzllMjI5MGFjMGNjOTZkOWU3YTdiMmY0ZTk5NjA4YjQ3YTQxNTA5YzQ4OTE5MjFhZmRmNmFhOGZhZTc2MjciLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '42.32 MB',
//                   caption: 'کیفیت بالا',
//                   res: '480p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6IjFPK0FoQ2Q4dm9mYlVVU0ZiQ21TUGc9PSIsInZhbHVlIjoieGpkYlZweUYzbHZERG56RTVPdVpNQ0IxRDdTRUM3djJ1ZVpnRzNmUXNISytiUVg5MDIzMDdJTGNSVUd3LzI0OWwveWdYUyt0ZDl2dVF6dkY2aFJ4dVA1dHJiKzc2Nmt0ZWFEeVVIdUUwbHhzTUpGTEtwWjZpNXhYVlY2MHBGN1RXYjdxMkNDZjlUcE9CRVVOMTI2dWFhVEtydmEvc3QxNE9nTEFza1VJdFFvPSIsIm1hYyI6IjlhZDlkYWIxOWJhOTZhOTMzMmU5ZGJmOWUxM2EzN2MwYjcwZGQyN2Q2MGUxMTFjOTRiZjRlMjk3ZDBjMWI1M2IiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '18.65 MB',
//                   caption: 'کیفیت متوسط',
//                   res: '240p'
//                 }
//               ],
//               pamphlet: null,
//               voice: null
//             },
//             photo: 'https://nodes.alaatv.com/media/thumbnails/1430/1430002irjf.jpg',
//             can_see: 1,
//             has_watched: false,
//             set: {
//               id: 1430,
//               redirect_url: null,
//               title: 'جمع بندی ادبیات پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
//               short_title: 'جمع بندی ادبیات پایه (دهم و یازدهم) همایش تفتان',
//               photo: null,
//               url: {
//                 web: 'http://127.0.0.1:82/set/1430',
//                 api: 'http://127.0.0.1:82/api/v2/set/1430'
//               },
//               redirect_code: null
//             }
//           },
//           {
//             id: 33692,
//             redirect_url: null,
//             type: {
//               id: 5,
//               title: 'tests',
//               display_name: 'تستها'
//             },
//             title: 'تست - آرایه ، استعاره - قسمت سوم',
//             url: {
//               web: 'http://127.0.0.1:82/c/33692',
//               api: 'http://127.0.0.1:82/api/v2/c/33692'
//             },
//             file: {
//               video: [
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6IlozUlJOOUdMSmZhWmt4Skw4VE4ydWc9PSIsInZhbHVlIjoidjlVZ2Jldk1XM2JyVGhmUW5WbnFMNTdQNmVHNENNS2krVm9lTVR1MTFmZ3UwWDlEc1pTUmV0azhGdkkrMytIRlZVYkNLdE8ybjVZckcvZzlKYzEwNTg5SWZXQTFwczQ0cExoQWZqWlB6YWRuNGk3TWFobFA5T3FzODI2UTN3V2NTYWRyckQ0V0FOTFNNM1A0Y3pIR3RycnZHeiszM1lNM2c2bzFiV2NxY2FEdEpQd0trTTUySUNlQ2xmd3I1RTFmIiwibWFjIjoiZDRhMTIxNGQ1NzI1Nzg1YmJkYWFjNDBkODA4ZjFmNzM3YjZkZGIzNmY1YjliYzI3NmIyYTlkOTg5ZjkwM2IxZiIsInRhZyI6IiJ9',
//                   ext: 'mp4',
//                   size: '266.67 MB',
//                   caption: 'کیفیت عالی',
//                   res: '720p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6ImVLY1U3ZUpMemFwalRhOVBtb2hYYkE9PSIsInZhbHVlIjoiaGtpOGJ2MDk3MFYvd3p2eWFpajQ1aTlab0dFQWlWUVdCK0t4Z203VDdqZCs4b294VDl4emtMRE1FbjBpVDI0OUg1MVJKTEpUaW5XdHJvV2J0djBBMzlTTHRKRW55YW0zLzFOSkxGMVRxY25jR3kzcEpuYnNnVDBFR2lsaVN1REVUZHFDRzdHVkxvMFg1OTBaeWpEczlnbWtnUUplZ3FCM3pOeU1SR3hEU2FvPSIsIm1hYyI6ImQwMGM0M2EwYjgxYTRmMjJjZDM4YThlMzkyMzNmMzFmOGQxYWI4NzEwZGZiZTQzY2ZjZmY0ODYxYmYzNTE4YmEiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '42.07 MB',
//                   caption: 'کیفیت بالا',
//                   res: '480p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6IlMyUDZkUmY1QVJiQnUrL0VWdWVQT1E9PSIsInZhbHVlIjoiVktWbWxLMXQ2cnR1UHE5OUNabXJVMitrVGx3Vm5RRkcwRjViMC9uSjBMZFdjMVJYQWx5Mno5VUUxZnFqaU1xbGpPYkJwUEtvdGVHRGwyMVdnZjR3Z1RGbk5OWklCK3d1ZFM4TEZ5dldnWkd0dktXQ2plM3VvekYyV01qdnUzQ0QvdVF2Qm1Sd3EvbEQvYm5FM1dyczVqN290UnYxZnNGV2Q4M2pDaGxyd2tnPSIsIm1hYyI6ImUzMjgxNWUwZTIwMzY2MDE1ZTYyYzllZjkwZmVmZjAyNTAzN2ZmNjM1NWI2ZTA5Mjg0MTNiZTE4NWQ0ZGNlOTUiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '18.37 MB',
//                   caption: 'کیفیت متوسط',
//                   res: '240p'
//                 }
//               ],
//               pamphlet: null,
//               voice: null
//             },
//             photo: 'https://nodes.alaatv.com/media/thumbnails/1430/1430003ploq.jpg',
//             can_see: 1,
//             has_watched: false,
//             set: {
//               id: 1430,
//               redirect_url: null,
//               title: 'جمع بندی ادبیات پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
//               short_title: 'جمع بندی ادبیات پایه (دهم و یازدهم) همایش تفتان',
//               photo: null,
//               url: {
//                 web: 'http://127.0.0.1:82/set/1430',
//                 api: 'http://127.0.0.1:82/api/v2/set/1430'
//               },
//               redirect_code: null
//             }
//           }
//         ],
//         grade: {
//           id: 8,
//           name: 'davazdahom',
//           title: 'دوازدهم'
//         },
//         exam: {
//           id: 1,
//           title: 'قلمچی'
//         },
//         product: {
//           id: 648,
//           title: null,
//           lesson_name: null
//         }
//       },
//       {
//         id: 3505,
//         title: 'ادبیات',
//         description: 'جلسه 4 تا 6',
//         long_description: '<p dir="[object Object]"></p>',
//         start: '19:00:00',
//         end: '19:50:00',
//         major: {
//           id: 2,
//           name: 'تجربی',
//           title: 'تجربی',
//           selected: false
//         },
//         backgroundColor: null,
//         borderColor: null,
//         textColor: null,
//         url: null,
//         voice: null,
//         video: null,
//         contents: [
//           {
//             id: 33693,
//             redirect_url: null,
//             type: {
//               id: 4,
//               title: 'lesson_video',
//               display_name: 'فیلم درس'
//             },
//             title: 'درسنامه - حفظیات ، املا و لغت - قسمت اول',
//             url: {
//               web: 'http://127.0.0.1:82/c/33693',
//               api: 'http://127.0.0.1:82/api/v2/c/33693'
//             },
//             file: {
//               video: [
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6IlpGODhTZ0lLT0xPai81Rkk4Z0RnOHc9PSIsInZhbHVlIjoibjhEWUJndGgydHRpR0M5NWN6S0hpRGhydlFlVE9ycmZEcU0yZXJmUHRlZXZ6WURHZlk5b1p0RW9JdDN5M3JoYytFd2c1Q0lUeVlybnZLMTdMT1BReUpXN1llV3hvYndubWw3TXNYYlUzYnA5dVlBR2tjYTZJT09mOGJXMHFJSEhRdEk4cFF3b1RYd1lGV0ZlQkZrclR0ZkdTM2pnc3lFZFdnYkNSRGZWRFhCcGx5Zjh3SjUrSmhYazBJaG5RTENyIiwibWFjIjoiYzIzM2Y0Y2U4NGI5NjJlNjAwMjZlZmU5YTIxZDgyMzViOGE5Njc4YWVkNTNkZDg1NjgyNmE4MWQyYTVmMjM0NSIsInRhZyI6IiJ9',
//                   ext: 'mp4',
//                   size: '277.41 MB',
//                   caption: 'کیفیت عالی',
//                   res: '720p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6IjZReEZHbVhJbkxGWks0R3JpSVpXOHc9PSIsInZhbHVlIjoiVDY3d2EvYXYveUlDdXBLVTJudjl1T0FlRjIwaWJPUUY3bFk0eTNnNVR6SDlIb0xxSytFOFFEb3h6VzhCMHZ5MXlnTFVYTXlsSmtGQnJnem1GVXlCZ2dGS0NOTk0xOTAreHROSkcrMG9jMGxydmMzS2dYVDNueTBCZHFjYlUzM2Y3eTN1cWp2R0JTNGtubnN5M0FBQ056TldOeE8vU256L1NzNHpheEhWTU04PSIsIm1hYyI6ImU1NzEzYjY4NDU1N2QyNDJmYTE3YzIwODdmYTQ3MzllNmE4NGVhNzYzM2U3YjQxZjBhNmRhYzQyMDk4ZmRkNDkiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '41.7 MB',
//                   caption: 'کیفیت بالا',
//                   res: '480p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6ImVFOGNYNzdWVGFHS3hWOW92ZHU2aXc9PSIsInZhbHVlIjoiWUd0VjQrSnlvcXYwaHB4aW9OMGNscmlTazVlK3N0TkUrQVJibmJNbnpYa211VE05YTVRZkdYZHlQVmpYWUxITmNrYmpIbkhEQWxlQm02ZCsrbjN5RFBnZWNlbUN0WWpKaUNOVEdaRGltL2lYcTdFVjdiNlMrR1BWZVgxYk5jYnhWM1NPSGR5U2xxRTRoeEVHdFhaWFRBSXF5WDhlUUV6YmpRaXVEaGdDdURZPSIsIm1hYyI6IjdjMTU2MjcxYmJmMGU5OWZmMTEyYWJlMzYzYjUxYmY5Yzk4ZjI2MGY5N2FkOTEwNTc2NmNjOGIwYTdkMjJkNTUiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '18.53 MB',
//                   caption: 'کیفیت متوسط',
//                   res: '240p'
//                 }
//               ],
//               pamphlet: null,
//               voice: null
//             },
//             photo: 'https://nodes.alaatv.com/media/thumbnails/1430/1430004nvbc.jpg',
//             can_see: 1,
//             has_watched: false,
//             set: {
//               id: 1430,
//               redirect_url: null,
//               title: 'جمع بندی ادبیات پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
//               short_title: 'جمع بندی ادبیات پایه (دهم و یازدهم) همایش تفتان',
//               photo: null,
//               url: {
//                 web: 'http://127.0.0.1:82/set/1430',
//                 api: 'http://127.0.0.1:82/api/v2/set/1430'
//               },
//               redirect_code: null
//             }
//           },
//           {
//             id: 33694,
//             redirect_url: null,
//             type: {
//               id: 5,
//               title: 'tests',
//               display_name: 'تستها'
//             },
//             title: 'تست - حفظیات ، املا و لغت - قسمت دوم',
//             url: {
//               web: 'http://127.0.0.1:82/c/33694',
//               api: 'http://127.0.0.1:82/api/v2/c/33694'
//             },
//             file: {
//               video: [
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6InJ0dkwwOVljUFg1ZnB4UHE3bVFuYmc9PSIsInZhbHVlIjoiRnQ4SFM1T05wUm41WUJUWE5rYkxGMzN1RWphNkM0NU9KdUhKREpvaGtnMjlFOEVLYUtsMXlHdHNMV3Q4L0lscUwzMWZFUHhhMDJYZ2g3UHluWTEzSzdLUTBJUkowNDRFckNIVE5IYkRJWTM5ZXIrOTJwZ1dFK2V6Tno0aGl2TCtVdUFoZVBKOC9XZjg3eVBRTGZ4Z3p4bVZoZTVhSXVWNDJYVSs0ay9Sb2F0VHZ4dEpxTk9mQmllaFRES3FIR3IxIiwibWFjIjoiZWUxOTQ3NjFiYTQyMjc5NGI1M2M3YTY0YzlmMTQxYzI0ZjdlYThjYzg3NGIyZTg3YzE5MWVmNmI5ZmMxNWZhYSIsInRhZyI6IiJ9',
//                   ext: 'mp4',
//                   size: '203.22 MB',
//                   caption: 'کیفیت عالی',
//                   res: '720p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6Imw4bG9wNWQ3cHBiUlo1RUQxTXpRUFE9PSIsInZhbHVlIjoiWFRJR2pKNUQ1cHMyaGNZakI1MmVnNjZxZHc2MjdSY05acWdEMEJhc2NsaktaWndIellPTjVwLzh5Yk5XbkttZENjRlc2am9UM2RpL2VqcVhrVHlGSlY3WDVtR052V01Ba0E0TXE3ZVo2RlhBQ0poMUJONkMxc1BsMHZxNTkxcHVuRVNMVUJRdHBOVFVvZDRDdFJsWXZkbHQvbFV0OFFHR2lnOUJ1VDRMRnNJPSIsIm1hYyI6IjMxNjAzMDA5OWYxYTVkN2JmZWU5OWIyYTU5YmJjMWQ2N2FkY2MzOTM5ZmYzOTg1ZTg0NzdjN2ZiMTMzOWUxOWIiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '31.68 MB',
//                   caption: 'کیفیت بالا',
//                   res: '480p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6ImMvOThZQmd2cnRxMGlIOHp2cXRTUmc9PSIsInZhbHVlIjoiSDlwR0NVSjN5V0JURFhaK3lWQTRsTHdwUU1SRGQzUkY4cVVwK0xBaU9oaE1Lc3hhRThTNEZkR0EwWlNObEFxRk9PR3YzdkVwMCt2ZUtROXArRWtJOXBhWnBiem1VRWM2dnBYVnB6a1FzaWNTUWlBakZiTDh0Z2UxWVdCcDRoK09qaDhRb1Z4UVhncHdYWk5nSmkzNmdnamdkUGVYWHE4dGd3eDNydlFQY0dNPSIsIm1hYyI6Ijc2ODA3ZWUxNzg1Mzk2N2U5NzEzZjczMWEzNzA5Y2Y5ZjZmMzUxMGY4OGNmNjI2NzIyZDhkNDljNGQxZTM3N2EiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '13.85 MB',
//                   caption: 'کیفیت متوسط',
//                   res: '240p'
//                 }
//               ],
//               pamphlet: null,
//               voice: null
//             },
//             photo: 'https://nodes.alaatv.com/media/thumbnails/1430/1430005moia.jpg',
//             can_see: 1,
//             has_watched: false,
//             set: {
//               id: 1430,
//               redirect_url: null,
//               title: 'جمع بندی ادبیات پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
//               short_title: 'جمع بندی ادبیات پایه (دهم و یازدهم) همایش تفتان',
//               photo: null,
//               url: {
//                 web: 'http://127.0.0.1:82/set/1430',
//                 api: 'http://127.0.0.1:82/api/v2/set/1430'
//               },
//               redirect_code: null
//             }
//           },
//           {
//             id: 33695,
//             redirect_url: null,
//             type: {
//               id: 4,
//               title: 'lesson_video',
//               display_name: 'فیلم درس'
//             },
//             title: 'درسنامه - دستور زبان ، زمان فعل',
//             url: {
//               web: 'http://127.0.0.1:82/c/33695',
//               api: 'http://127.0.0.1:82/api/v2/c/33695'
//             },
//             file: {
//               video: [
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6ImhuKzI2ZHVueEpyblJIb3NwSzMxZ3c9PSIsInZhbHVlIjoiWlV6RSszMDZreC9JdEhJTW9RZjhhMklyYzFJZENKcC9LbkE5RlN5Zitiams3WDJXQUxUZS9aek5jcnkxVGR2TFdMR2lrTjA4ZUlUaHFGVU5jekNIb0RYUHFLa0ROV1dkbDA3Q0VaOVk5UUxyYmc3bUJ5allWZnlueUpGWm9Zc3BVdnZ5Q0Jha3YxZXdmUFV1Tnh4WlFpdzVZdWpIdmJlQmVsRTRwYklWVytVUWQwSHdxZzdkbGs2V3h0UWNaT0UwIiwibWFjIjoiZDZmMTdlYTg5ZDJhMTEwNGNiZjg0ZjY3YzA0ZDczNWRiZjEwNzE5MWZlNTMyYTkyODJlMzMyMTE3YzVjYjgxNyIsInRhZyI6IiJ9',
//                   ext: 'mp4',
//                   size: '280.34 MB',
//                   caption: 'کیفیت عالی',
//                   res: '720p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6IkQ0MnhLdFFOQXN3RXdXd2pwenBSK1E9PSIsInZhbHVlIjoiM085dE5waWJkK1V6b0V3dTlMOGtjRXNseitjdlNESnY3R0xldU85ZnRZdDZyVVR3YkVFTTJkcXdUbDJCdk0zK01MTFFWODltMERjSWlQV2NSa3Y4dFJKeVpzSVd4NVcxcVg0MHdhMlFJcnJlcVN4WGJUQkxLL2FvNnZoUUVnbWNGdDczWU9LSjdVeDlPeTI0cUdDTklROEdEL1F3QUg4bGJTeGJDWURNME5rPSIsIm1hYyI6ImJkZGY1ZDFlZjBjODQxYjE1ZjYxMDZiMDUyYWFjMmNkYTk0YmQ5M2RkOTAyOTVhNzFkMGM2ZDhiMjlkNDA4YzQiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '43.88 MB',
//                   caption: 'کیفیت بالا',
//                   res: '480p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6IjZmanFHQ2tDZDN0NmdPampZdW9DZGc9PSIsInZhbHVlIjoic3lSYWNzekpMNndmQnUxRDYyS3Vjd0d1QzlqR1p5elNUajlhWU1iNjRiWmFIaVRnQms5SWdENWkxeGxkMnVaZTcwQ2tNUzdGQmUvRE5uYlNzNkZJYzBRVmVsanFUSG1PdSttQ3ZQQThsaG1HSEhtWHRYOGpXUDdSQkRSYkZKQXNweHlHV3ptSTJCeEtqZ2hWYTFtbUh2Q0U3SmV4ZldtTjEwblpHU3F2TFZvPSIsIm1hYyI6ImMzMGQ3M2Q2N2Y5NzZmZTA1MjExYTY5NjBhNWI1MzZkYTRjOGE3ZDhjYTAyODYzMDgzZTIxY2JlYmNhNWY1NzciLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '19.34 MB',
//                   caption: 'کیفیت متوسط',
//                   res: '240p'
//                 }
//               ],
//               pamphlet: null,
//               voice: null
//             },
//             photo: 'https://nodes.alaatv.com/media/thumbnails/1430/1430006iran.jpg',
//             can_see: 1,
//             has_watched: false,
//             set: {
//               id: 1430,
//               redirect_url: null,
//               title: 'جمع بندی ادبیات پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
//               short_title: 'جمع بندی ادبیات پایه (دهم و یازدهم) همایش تفتان',
//               photo: null,
//               url: {
//                 web: 'http://127.0.0.1:82/set/1430',
//                 api: 'http://127.0.0.1:82/api/v2/set/1430'
//               },
//               redirect_code: null
//             }
//           }
//         ],
//         grade: {
//           id: 8,
//           name: 'davazdahom',
//           title: 'دوازدهم'
//         },
//         exam: {
//           id: 1,
//           title: 'قلمچی'
//         },
//         product: {
//           id: 648,
//           title: null,
//           lesson_name: null
//         }
//       },
//       {
//         id: 3528,
//         title: 'زبان انگلیسی',
//         description: 'جلسه 1 تا 3',
//         long_description: '<p dir="[object Object]"></p>',
//         start: '20:00:00',
//         end: '20:50:00',
//         major: {
//           id: 2,
//           name: 'تجربی',
//           title: 'تجربی',
//           selected: false
//         },
//         backgroundColor: null,
//         borderColor: null,
//         textColor: null,
//         url: null,
//         voice: null,
//         video: null,
//         contents: [
//           {
//             id: 33880,
//             redirect_url: null,
//             type: {
//               id: 4,
//               title: 'lesson_video',
//               display_name: 'فیلم درس'
//             },
//             title: 'درسنامه - پایه دهم ، گرامر درس 1',
//             url: {
//               web: 'http://127.0.0.1:82/c/33880',
//               api: 'http://127.0.0.1:82/api/v2/c/33880'
//             },
//             file: {
//               video: [
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6Im5hOXlmS09kVVdRRlk3bGFJV2ZPK3c9PSIsInZhbHVlIjoiR0tnY29ubDBDbmpORnMxUnRYL1lNT0tjQjRuT2Uxcy8yVVBQbjFSVUx2OWpLS1J6cVFzcEVSS251UnIwZEdudU5jemRVekQ3bmRNNG14T0lIazlrdFBLU01tYUZsNklUSFVjaTVVTDRjcFVVKzd0eE5XMHBZQWRQNG0ybXBlclJFWlgyZUErcm02OTZmTjJQL2cxVmlaTmxQUkRIRjRSblRFNnppQXNyYUN3eWtTL1lpcUZaOEtYd2dPOEJqblMxIiwibWFjIjoiZGE4NjRlOGJkNDI3NmUyMWQ0YjIyYzQyYTNjYjZhMDMyYWVmNDY3MjU3OGM0OTA0MjZjNWQzNTdjMDRhY2FmOCIsInRhZyI6IiJ9',
//                   ext: 'mp4',
//                   size: '275.57 MB',
//                   caption: 'کیفیت عالی',
//                   res: '720p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6IjFubE5zSDhESEFlL1pnc05RYTIyQ2c9PSIsInZhbHVlIjoiZENldERNRFRtTE9UblRvS244UStOd0FBWVAvVWxFdE5KanlmTkNSaFdZbnRXUFV3cno5S2JNS2V1dTJMY2IraXF2S1dRYTh1MmNBbW1ETFJnajNXQnZxUENTY0pLMFpheHZJM2NNVFhieHZheVJXQkVlYnhpS0lodEZQRkVzNWhjOXpqUUVxTFNnZGJyZ1poYjU3Nmk3Q1lrcDI3Z3R5RXlHc3Z6VXNUaU9zPSIsIm1hYyI6ImY4YzJhNWY3ZWMyZDZmZjlmNGQ0NzQxMDBmNjk2ZDFiYjFlYTgwYjUzMjJlYjEzYzcyOTk0YTUxZDYzOTc0ZmMiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '46.2 MB',
//                   caption: 'کیفیت بالا',
//                   res: '480p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6InpTYXJpUUNkTFJEb3hGV1pBYlJCNFE9PSIsInZhbHVlIjoiTWFjeFI1Y3IvNG5wOTRvR3hyenNKVGJtZVByOUsxQ3Y3K0pDMXlSVXFyQ2dmb1pDNGdmM3N0bmhkbmNHeTN3UStCNmlLanJQdlNxTjVwS1NKVTZhM2dVeldNZ3ZVYnBrcjhhMXByTG5nbDFTWng0QkhkcFJSSlNFQjRFb090cnVIcnpBdlBiUlRONDJvYkhuVmJxL051NzB4WkVmSFpUSHdXb1MyVGtsYUpBPSIsIm1hYyI6IjhlZDIzMWI5MTVjM2RjODZjZTJmN2U2ZDQ2YWM1MGZlZjA2MmE0M2I0NDRjYTYxNWNlMWZjNjY1MWY2NDQ2OTkiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '20.25 MB',
//                   caption: 'کیفیت متوسط',
//                   res: '240p'
//                 }
//               ],
//               pamphlet: null,
//               voice: null
//             },
//             photo: 'https://nodes.alaatv.com/media/thumbnails/1433/1433001mbnv.jpg',
//             can_see: 1,
//             has_watched: false,
//             set: {
//               id: 1433,
//               redirect_url: null,
//               title: 'جمع بندی زبان انگلیسی پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
//               short_title: 'جمع بندی زبان انگلیسی پایه (دهم و یازدهم) همایش تفتان',
//               photo: null,
//               url: {
//                 web: 'http://127.0.0.1:82/set/1433',
//                 api: 'http://127.0.0.1:82/api/v2/set/1433'
//               },
//               redirect_code: null
//             }
//           },
//           {
//             id: 33881,
//             redirect_url: null,
//             type: {
//               id: 4,
//               title: 'lesson_video',
//               display_name: 'فیلم درس'
//             },
//             title: 'درسنامه - پایه دهم ، گرامر درس 2',
//             url: {
//               web: 'http://127.0.0.1:82/c/33881',
//               api: 'http://127.0.0.1:82/api/v2/c/33881'
//             },
//             file: {
//               video: [
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6InFscVJndk1kcEdyMjRHbjFWVDIyV1E9PSIsInZhbHVlIjoiYk5MeEZ3MVFDOXB2N1hqRW1GWVdmTisvOXpDdzZMSDVJR0ZXdVBmRnZhVWtBSHo4YUU0LzdLT0M2M0VQWFVjU1VNVXNtYzliQndqa3Y0Z2hWMGxSVnhEcnVLN2NNdjZ6SmhZazAyTkUreitVd2I3TEJCcTgzcDM1eEVyREVtYVBFdk1Ld1oyRllaN3U5R0tWQ3NsWVBVb2V1cWlXYWRjSzVhS3d2bEdmMGhJSmFuWjVJdVl3MTZ5YXNOOWlOTWUzIiwibWFjIjoiNTcyZDlmN2MzZGZmOTE5ZmQ4OWUyYzJkYTRkZmFiZDZjYzYyYjE1Njg1Y2RmODZkYWJlYjM0YTU0NDRiMTg4ZCIsInRhZyI6IiJ9',
//                   ext: 'mp4',
//                   size: '278.6 MB',
//                   caption: 'کیفیت عالی',
//                   res: '720p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6IkZ1bm10V3RyVVpCam1BNEZKWGx0OEE9PSIsInZhbHVlIjoiV2Vja0duRVpTTnF5bWZBMzVMS3pUZUwzMjRWMEszQWN0Q2hwNG5iNzMzVkVmT1FjV2VETkxTVUloa3JKMXgwSWVCWmZTZE1qczdUM1dtQStLYm83S29IQ0kxZDdKcFFEdUEveUo3UWI4K2FiNll6VzFFNTZHSXl0QnJKUElHSitoelAvSHBRalVnTUExQUlrZlE4cTVuZU9lY0twQlpWQ0drK29BSGh5ZWkwPSIsIm1hYyI6ImNkMDBjYTYxYTJjZTVmYTlmYWEzM2U0YTNjZDU0NGE4NGY2NzllODQwNzFhZmRkYzNjNmRkN2JlYjQzMmIwNzkiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '47.17 MB',
//                   caption: 'کیفیت بالا',
//                   res: '480p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6IktaN0NJVGgza3cwZi8vc05QTzNwaEE9PSIsInZhbHVlIjoiVVVvTEc5L2NFVXFOWVVTMno4U3NucTA0bkMwY3Z4MlJPRDdxNFJGTWN2aVh0dHBFVWYyelhibjZzM0FjSVFVUUlmZXJOQ1hUTTRTQWVJS0o4WFVTU0FnRlBmeituWVlRcTJHSE9EMC9Ycm8vaFpqVG5VS2ZUYXN2a3pCK25FTDNCNWRGMFI2U1RzWThPMkxYeW5CVWpaWmN5WFhtbFVwdEZmQzVzcjFaNGlrPSIsIm1hYyI6IjYyNGNlYjEyZGIzNTg5MGZmZmQxYjk4ZmEyY2MwMDgxODEyNDJjNGMwNDJmMGM4ZTk1N2MwN2I4NTA1MjZlOGYiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '20.81 MB',
//                   caption: 'کیفیت متوسط',
//                   res: '240p'
//                 }
//               ],
//               pamphlet: null,
//               voice: null
//             },
//             photo: 'https://nodes.alaatv.com/media/thumbnails/1433/1433002ythg.jpg',
//             can_see: 1,
//             has_watched: false,
//             set: {
//               id: 1433,
//               redirect_url: null,
//               title: 'جمع بندی زبان انگلیسی پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
//               short_title: 'جمع بندی زبان انگلیسی پایه (دهم و یازدهم) همایش تفتان',
//               photo: null,
//               url: {
//                 web: 'http://127.0.0.1:82/set/1433',
//                 api: 'http://127.0.0.1:82/api/v2/set/1433'
//               },
//               redirect_code: null
//             }
//           },
//           {
//             id: 33882,
//             redirect_url: null,
//             type: {
//               id: 4,
//               title: 'lesson_video',
//               display_name: 'فیلم درس'
//             },
//             title: 'درسنامه - پایه دهم ، گرامر درس 3',
//             url: {
//               web: 'http://127.0.0.1:82/c/33882',
//               api: 'http://127.0.0.1:82/api/v2/c/33882'
//             },
//             file: {
//               video: [
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6Ikh6RFFmU3NTclZZRkdSbG13a2ErMEE9PSIsInZhbHVlIjoic0sycFl6S3VuUjVKREhGV0NYWWh6REd1YW15Rkc4TlU3Z1NLMkx6WmxWNHpUMGs1bGpoakdFSFpwemd1NXAzQUxEZVRNVGpRZ3hDQkRPN1JSL1JFeVBzZHpnbWNoZjNkbElvTUtGUk9qOWRob2JQM0hDaFZiTW92NW5NS3JOd0QwVkFZdms4akRKRnlaYm96aEg2aCtpZnRJZ0l2Y1dwOVRzZkdPaGdJa2Z5VElxMUMvZEo1TjdiNFRDZFAzend0IiwibWFjIjoiNmYzNzA2OGYxOWFlODc0OGRhZGI0NmEyMzgyYThhN2MyNmI1MTI2YmE4OWMwNTQ3MGM2ZjllMDA5NTcxYjg2MiIsInRhZyI6IiJ9',
//                   ext: 'mp4',
//                   size: '282.85 MB',
//                   caption: 'کیفیت عالی',
//                   res: '720p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6IkhHci82VjRxMGJVcTl6cW1xNklIcWc9PSIsInZhbHVlIjoiNHRPQkNYWFJRWFVtelNDTCtiT1Y5VStHMzBNa291UTdvaUJ5RVlDdEpDOUppb1dHVHNjNzl4UDBmSjRoWnJVVEp5clNOSGgwcEQxZFFVcWllLzlzdDByU1JmWjNSU09ESEg0aEQ4ZmpXbitOb2tWWnZ4UlpYNFMxV3VQajV1cjZOLy9kS2w0QS9PZnV0b0NmSGhRSXdhTm1zaTRHNG1Pc2FIT091eFlCcmY4PSIsIm1hYyI6ImIzMjFlMjZlZjQwMWMxYWViZjM2ODZiNDI5MGM2YjQ5Y2Q2Yjc2OWFiNTg3MTMxZTMwMTRjOWE1NWZjZmQxMjUiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '48.41 MB',
//                   caption: 'کیفیت بالا',
//                   res: '480p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6IktqVGZ6a1lZY3lwc290dEV4aGtvSXc9PSIsInZhbHVlIjoiYUZ0eG5DSkxZbzNRT2dtZnhzRC8zdS9OQU0zUWk3Vm5JdkplNzBZM2RWUUFDVytMRDdHelNGa0FjTFU5VTQ1Rk4xQ0VtQnNxQkRZTFhKa201V3VCUHdiN3ZYTXI1bUZJaUZtM2tQUEl0MnFVU091N2ZmNlRjRlU3REkzTm9YaFA0aUtmTnk4aVdOUWdLeC9xTkV0TmE2WSt4bFNrbzljRmQ1QjFSeGE3Wnk0PSIsIm1hYyI6ImZhMTg3ZTRjZjRlOGI5YzQ3NTRkN2EzNTVjODllZDM3NDYxYjhmZGYyMjY4NWJiYmM4OTM3ZDY1YWJjM2I3OGMiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '21.38 MB',
//                   caption: 'کیفیت متوسط',
//                   res: '240p'
//                 }
//               ],
//               pamphlet: null,
//               voice: null
//             },
//             photo: 'https://nodes.alaatv.com/media/thumbnails/1433/1433003kjhg.jpg',
//             can_see: 1,
//             has_watched: false,
//             set: {
//               id: 1433,
//               redirect_url: null,
//               title: 'جمع بندی زبان انگلیسی پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
//               short_title: 'جمع بندی زبان انگلیسی پایه (دهم و یازدهم) همایش تفتان',
//               photo: null,
//               url: {
//                 web: 'http://127.0.0.1:82/set/1433',
//                 api: 'http://127.0.0.1:82/api/v2/set/1433'
//               },
//               redirect_code: null
//             }
//           }
//         ],
//         grade: {
//           id: 8,
//           name: 'davazdahom',
//           title: 'دوازدهم'
//         },
//         exam: {
//           id: 1,
//           title: 'قلمچی'
//         },
//         product: {
//           id: 651,
//           title: null,
//           lesson_name: null
//         }
//       },
//       {
//         id: 3534,
//         title: 'استراحت',
//         description: 'جبرانی',
//         long_description: '<p dir="[object Object]"></p>',
//         start: '14:00:00',
//         end: '14:50:00',
//         major: {
//           id: 2,
//           name: 'تجربی',
//           title: 'تجربی',
//           selected: false
//         },
//         backgroundColor: null,
//         borderColor: null,
//         textColor: null,
//         url: null,
//         voice: null,
//         video: null,
//         contents: [],
//         grade: {
//           id: 8,
//           name: 'davazdahom',
//           title: 'دوازدهم'
//         },
//         exam: {
//           id: 1,
//           title: 'قلمچی'
//         },
//         product: {
//           id: null,
//           title: null,
//           lesson_name: null
//         }
//       },
//       {
//         id: 3557,
//         title: 'شیمی',
//         description: 'جلسه 1 و 2',
//         long_description: '<p dir="[object Object]"></p>',
//         start: '15:00:00',
//         end: '15:50:00',
//         major: {
//           id: 2,
//           name: 'تجربی',
//           title: 'تجربی',
//           selected: false
//         },
//         backgroundColor: null,
//         borderColor: null,
//         textColor: null,
//         url: null,
//         voice: null,
//         video: null,
//         contents: [
//           {
//             id: 33718,
//             redirect_url: null,
//             type: {
//               id: 4,
//               title: 'lesson_video',
//               display_name: 'فیلم درس'
//             },
//             title: 'درسنامه - جدول تناوبی ، ذره های زیر اتمی - (قسمت اول)',
//             url: {
//               web: 'http://127.0.0.1:82/c/33718',
//               api: 'http://127.0.0.1:82/api/v2/c/33718'
//             },
//             file: {
//               video: [
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6IjZIeGlVN3ZLYXdqbmhpUmkzd3EyOUE9PSIsInZhbHVlIjoiWFFZd0g0SU1QVHV6V3ErRTVCTWJnak5RUlNLa2hKcTQ2SDYwczlPaG13TW5LZGgrb3IvTkJBVEZTREkxQ3JBcFk3cHhvQS8xTEd6VnlLN3hsRm5DUk1wbHplNUE2a3NNbnk0NC9BdUxGMkVWNytzd0VTSGtCSUk3eDVJQ0EvOUllQ1BOYVdxalIzYkdYVkRIeGJkWDF0TXRKdEF2amFKcTlxZUdJcDJQYXlqNlRnL3FxVVlkcndQTk5nWXhTVHA5IiwibWFjIjoiMzdmOTRmYzhiMTM0ZDI2NTBhYjMxZTA3MDZkNTViZjYxMTQxMTM4MmEwY2NjYjRkZTkxNGRhZTI0ZDhhMWVmNyIsInRhZyI6IiJ9',
//                   ext: 'mp4',
//                   size: '296.76 MB',
//                   caption: 'کیفیت عالی',
//                   res: '720p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6InlNMXgxMlRXbmdUNVpJYTAvS0pLTHc9PSIsInZhbHVlIjoiRWM2Z2ZlRmhpb2FiRFU4bEFGVTd3RERyM2xzWXpTNmVPcjlabTdpeEpNNUxINS9xTmZkR1pRSWl2U0NpZ3NnRS80emJyZWg3K1RjQWZhK0tGY1dnbVFjQUlyQUZ3U3BXb2cxcVkwYTMybjBXL2dRNXRNU2EzVGRSMjdJOCtaZWNlZFpNN21TRitTdkFKVTMzWUpVOXp3N25yemNnWTA2d0ZvSTF0TGkyT1BJPSIsIm1hYyI6IjIwN2VjYjdkOTc5NzJiODVkZmI5YWFjYzk0NjRjMzU4M2QwMjJmZjBhYjRiNDI3Mjc3MGVlYWZlY2VlZTQxYTYiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '61.07 MB',
//                   caption: 'کیفیت بالا',
//                   res: '480p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6IkJLQ1h3TEJZS0k5Ly9IMnc2am4vQVE9PSIsInZhbHVlIjoiWXlwT2EwQjlPQU83dURuUjB5MDRNT3B1NldIY1M1MTEzUmRucVUrc3psaTlIM1VOQ09iQ1JuUzhoNjNCQnkvRkJDak8xY0ZSM0VrYlZ0RDZ5L2poODN2cGpFT2dSSTYwYm5yWVdpbFBOVTlyem5aREFIK2pTL0RES1RMRXlFWCt6VHlnRS9hR3BrTHRraVAyMlc0YjlIMk5Tck8zZkpkK1RkeFJ4VTVHMlo0PSIsIm1hYyI6IjNiYTFlNGEyMWFkNjk0ZWNlZTkzOWUyM2VjMjAyY2UxOGI5NDdhMDYyZmUyNDliYjhkOGQzZTcxMmU0ZGMzMTEiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '24.8 MB',
//                   caption: 'کیفیت متوسط',
//                   res: '240p'
//                 }
//               ],
//               pamphlet: null,
//               voice: null
//             },
//             photo: 'https://nodes.alaatv.com/media/thumbnails/1441/1441001qwer.jpg',
//             can_see: 1,
//             has_watched: false,
//             set: {
//               id: 1441,
//               redirect_url: null,
//               title: 'جمع بندی شیمی پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
//               short_title: 'جمع بندی شیمی پایه (دهم و یازدهم) همایش تفتان',
//               photo: null,
//               url: {
//                 web: 'http://127.0.0.1:82/set/1441',
//                 api: 'http://127.0.0.1:82/api/v2/set/1441'
//               },
//               redirect_code: null
//             }
//           },
//           {
//             id: 33719,
//             redirect_url: null,
//             type: {
//               id: 4,
//               title: 'lesson_video',
//               display_name: 'فیلم درس'
//             },
//             title: 'درسنامه - جدول تناوبی ، ذره های زیر اتمی  و ایزوتوپ - (قسمت دوم)',
//             url: {
//               web: 'http://127.0.0.1:82/c/33719',
//               api: 'http://127.0.0.1:82/api/v2/c/33719'
//             },
//             file: {
//               video: [
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6IlU1NWdjK0hOKzRhTXZhMWdWVk9GV3c9PSIsInZhbHVlIjoiMUlOMVlKWXlZUFRNMnhOcjBJcGlCSzlDWTVSRldad2pFeTNDVnlUSjNVT244bzFaNHN5MlBtSEJ0ZnBRcXg3b05ZSlB5ZkVDU0dOZFJuMVZmS2Y0VXJkN1ZabDZxeG5nWHBYbjZrQXUxK1Nlclc2aUFDcm1SVDhtcjFsT05DQVdrWTNxZ2t2ZWQ3VDNZblJLSGprR1JBTnc0bTNtYWl0TlBncFVmVFdJcGxXUTMranFOaFJNQnl4SVI5UjNpZ2pxIiwibWFjIjoiYjM3NDU0ZTNlNmNhMjU3YjA5ZTBiMDJmN2Y4YzMxZWZiNzRmOGM4NDliNmQ0NzEyODc5NDkzNTRmZDRlZjAzZSIsInRhZyI6IiJ9',
//                   ext: 'mp4',
//                   size: '280.11 MB',
//                   caption: 'کیفیت عالی',
//                   res: '720p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6Ikx6SXprbUVuNlJ5RkZKUEdoTDFnTEE9PSIsInZhbHVlIjoiZnREOGxCREpnM0cxeWFTNmRiQUpORVNScDNWTTJqRTNESmM3bzI3T1IybzlPUnJTd0FEZ2MvVU00NEZmREF0ZDl1N1J0NnFBbWdOLzVwdkllamNyOWlETlFpQ0tsYzhZN1JGSE9TamJjZXRGOTNLN3cvVGRRSEdwVGZDQWFLcjIwRjA4VldoNTFnMUsrUUNzU1lYeWZXMlJIdlpCY3Zkd2JucDErVlN3SWcwPSIsIm1hYyI6ImIzZDM4OTc0MDRhNzkzNDgyNTlhMzUxYWVhMmQ2NTE3YjM2MmFlMjI1MThkNjcwNDNhODExZmI2YTNkMjI1YTQiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '53.74 MB',
//                   caption: 'کیفیت بالا',
//                   res: '480p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6IjNDWWVwS0ZqZVhJSXdyNXVVQlVreVE9PSIsInZhbHVlIjoiTkhLb1ZrSGJ6dGlLcnNLNFpqRVI2S0JwOG1xc2FUUlM4SE9SSDZtMkJWdHd4L0NrVFRwc1hBU3gzRitId2xwWUlTV1VZVzlqZVNXbEwreG5UZUFqMnprYU51R04yTThsbE0rbGVIa2IyY3pDZmpLSDRkUis3WWhoYmtTTjdUdHMycVp1U3FaWEhQUVdvSHR4S1Avblp1ZkhBaVV2OU1xdVcrUHhhaWV3bEZRPSIsIm1hYyI6IjliMzVlYzMyYzYwOWZiNjQ5MmM2MTg1MDg1MzUyMDU3YTIzNWM1MmEyMTNiY2Q3YWM3MmY1MDZlYmQ3ZTc2MWUiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '22.22 MB',
//                   caption: 'کیفیت متوسط',
//                   res: '240p'
//                 }
//               ],
//               pamphlet: null,
//               voice: null
//             },
//             photo: 'https://nodes.alaatv.com/media/thumbnails/1441/1441002rtgy.jpg',
//             can_see: 1,
//             has_watched: false,
//             set: {
//               id: 1441,
//               redirect_url: null,
//               title: 'جمع بندی شیمی پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
//               short_title: 'جمع بندی شیمی پایه (دهم و یازدهم) همایش تفتان',
//               photo: null,
//               url: {
//                 web: 'http://127.0.0.1:82/set/1441',
//                 api: 'http://127.0.0.1:82/api/v2/set/1441'
//               },
//               redirect_code: null
//             }
//           }
//         ],
//         grade: {
//           id: 8,
//           name: 'davazdahom',
//           title: 'دوازدهم'
//         },
//         exam: {
//           id: 1,
//           title: 'قلمچی'
//         },
//         product: {
//           id: 656,
//           title: null,
//           lesson_name: null
//         }
//       },
//       {
//         id: 3558,
//         title: 'شیمی',
//         description: 'جلسه 3 و 4',
//         long_description: '<p dir="[object Object]"></p>',
//         start: '16:00:00',
//         end: '16:50:00',
//         major: {
//           id: 2,
//           name: 'تجربی',
//           title: 'تجربی',
//           selected: false
//         },
//         backgroundColor: null,
//         borderColor: null,
//         textColor: null,
//         url: null,
//         voice: null,
//         video: null,
//         contents: [
//           {
//             id: 33720,
//             redirect_url: null,
//             type: {
//               id: 4,
//               title: 'lesson_video',
//               display_name: 'فیلم درس'
//             },
//             title: 'تست - جدول تناوبی ، ذره های زیر اتمی  و ایزوتوپ - (قسمت سوم)',
//             url: {
//               web: 'http://127.0.0.1:82/c/33720',
//               api: 'http://127.0.0.1:82/api/v2/c/33720'
//             },
//             file: {
//               video: [
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6IllhN3JkenU2S3BRZzJGYnBJZXJXUVE9PSIsInZhbHVlIjoiVngyWkxRZFFnSEFPTFlseXNjbWZGblBIYWN2eWRiT0F4SWZ3S1g1VWsvZWlqZWdwRmE1VFZ6RlVSYnIxZ01ZSDl3ak8zNmc3aVpseFRlL25RV2RCRmRLQlNvZmhlTUM2cDBlTFlNL3FUNVlJOFNhZjFTS3ZMS3RrdjM2ak1IK3EzdWtYWUk3Y1I0cS9EVG94ekFsbW96QUR5dFowMlY0dUNiWkVLQ0dkclNFL05xL1NPOEMra3NPeGdCK0tqZFNkIiwibWFjIjoiYjgzYWIwMzk1ZjkwMTA2NGYyMTUzNDcwN2UzYzcxZGUwN2M2OGNkZGYzYzBlYTk3ZjI2ODNhMjFjNTFhZjdjYSIsInRhZyI6IiJ9',
//                   ext: 'mp4',
//                   size: '286.64 MB',
//                   caption: 'کیفیت عالی',
//                   res: '720p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6InF0MkJPQjU2QzNxSVphTFFhUnJyK3c9PSIsInZhbHVlIjoiQWFvSElIeDdXVzlsRlZGaTBOWXpnR3J4MURKTHVQQUN0TldYZmdYbjR1M3lOYUxnWityRGhsNzB6WVpmL3NHNHpabVFtY05rVjYxNVFzek4zdDVPQlFjWGVmcWthS2N0dlAyMVhYMmF2a1V1QkpQZEZiaFRyKzNEaFBPem5CWmlBS3o2cndDYTFLZUR4eW5TdklVZkJuQ3d2bDJrSmFBUzFxZnVuN2hUMW5jPSIsIm1hYyI6IjJjYTYxYzYzZWZhZDY4MGQ3NjQ3ODFmNWFkZWQ5OTcyMWU5NzIwYWY1NTc3OTNlNzhkOTlmMWFjMDFkMzZiMWUiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '52.32 MB',
//                   caption: 'کیفیت بالا',
//                   res: '480p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6ImFSb3M5djZhbCtEanRydy9uaWpGRFE9PSIsInZhbHVlIjoicGFIaUpTMGdHQm4vWlFVTWFmdDdKaXlKYVI2c25zWlprRlQ0V0lucEwrczRsWitpOEtIckV3M1FVYlY1cS9oZG5iUVVadjJObDVaRFpHZzFoZldQaVdIbHFMVENYL2pIdU5PaC93OXlyeWlTL3U2dGluejZlWmdjZzhxenV6NkdRM0ROSW9ZT1JCc1M3Q3hWYzl0RHRnODJteGw4Q1JsdnBSZmMzaDNmTFhvPSIsIm1hYyI6Ijg4OGVhOWRkOTYwZmRhMDNmMzllZDBhNzk4YjA0NTA5MWEzNDhiNDA0ZGI1OWQ4OWFlNDY2NzI0M2MzYjg4NWYiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '21.66 MB',
//                   caption: 'کیفیت متوسط',
//                   res: '240p'
//                 }
//               ],
//               pamphlet: null,
//               voice: null
//             },
//             photo: 'https://nodes.alaatv.com/media/thumbnails/1441/1441003juik.jpg',
//             can_see: 1,
//             has_watched: false,
//             set: {
//               id: 1441,
//               redirect_url: null,
//               title: 'جمع بندی شیمی پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
//               short_title: 'جمع بندی شیمی پایه (دهم و یازدهم) همایش تفتان',
//               photo: null,
//               url: {
//                 web: 'http://127.0.0.1:82/set/1441',
//                 api: 'http://127.0.0.1:82/api/v2/set/1441'
//               },
//               redirect_code: null
//             }
//           },
//           {
//             id: 33988,
//             redirect_url: null,
//             type: {
//               id: 4,
//               title: 'lesson_video',
//               display_name: 'فیلم درس'
//             },
//             title: 'درسنامه - جدول تناوبی ، ایزوتوپ(محاسبات) - (قسمت اول)',
//             url: {
//               web: 'http://127.0.0.1:82/c/33988',
//               api: 'http://127.0.0.1:82/api/v2/c/33988'
//             },
//             file: {
//               video: [
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6ImR1dUlpS2hDRXdpNUNCRVROTWRNbmc9PSIsInZhbHVlIjoic2RvT2toNUpaVXIzL1hRZGJEMlhKNnlZTit0dTlHd1NwZHNjWmI1OUthb2lnT2RNZ1IzdGV0RXl1Z2hiUWVwRTJ1OXhuUlhDTnBvQkN0Njg3SzRDYjlBdE9ZRllyK3RHUmgxTjVEeElFMUhHUnI2YU9yZWpUcWF6eFdpT0VVV0FFK1crQU1IRDhvSDhQcXlWUnVaSkIvMVZ2V1VNWlJuZldsYmtXT1BrQkVLYzNoN0FyQVBpTXdWQ0JldHU4dnRuIiwibWFjIjoiZjExZjEyYzBkNjlhYjg2MzY5MDM0NDI4NDhhYjU0NjljOTZlMTMxOTUyOGE3YTI1MjY1ZmI3ZWRlZjZlNGI2MCIsInRhZyI6IiJ9',
//                   ext: 'mp4',
//                   size: '275.86 MB',
//                   caption: 'کیفیت عالی',
//                   res: '720p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6InpEYjZ2ZmhNM3g1aW9EZEx1c1RHa0E9PSIsInZhbHVlIjoiZktIaWlibElRK2hEczBPenNXL3ViYUF1N2ZsUmZTdmppMU04NWRRbUxCVVQvYmo3UWs2ZHVXUVpZdXNGK3lSMTVrVUl5RjdORHBpc2xiUmFxOG1WeWFCZ1VyNXBqamM3YmZmMXN1ZU1mcTdqWG8raVZtS0psTnZ4bmJNNms2QnZha010TUZLcVJ5UmlMUnJSVm95YWpTOEVQZUpQb2JPeGxtSGtBNHcycmp3PSIsIm1hYyI6ImJmZmY2YmQ2NzIxNGE1Yjc2YjlmYTgxMDNlY2ZlZTkwYWE0OTRjODUzMmM3NDU3ZGU5YTVlOTk1YWJiOWE3YzkiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '53.06 MB',
//                   caption: 'کیفیت بالا',
//                   res: '480p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6IkE3a1N4VlZxcktlNHJIbUdNSnc3RVE9PSIsInZhbHVlIjoiMWFKNFQ4a1BQUUtQUWlycklZWFhLdmhjMTZLUWxCRzNWcGZuckFMRmlUaS85bFkwSWQ4K2x6L2xVaUEzOEN0VnpFUGYwc2FOUXJaMDlhdWQrYzFUU2tPZ0V0NUUwbExYcDdVYWJYYUIxRm9XQm94MFgyT24zZi9ZQlpFZHphQ215NzltQUVZdEdQTWtVd3llcER2ZmlvS1dmd2xJOHQ3Ym1OL3A4a3FhL2k0PSIsIm1hYyI6ImZjM2NkNzA3MDM5ZDZkZTY4NDJkZTRjMmNmMDYyYjg4NzZhNjk2ODc5MjhjOGI5ZGU3ZGIwN2E2ODQyZmEzNGUiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '22.11 MB',
//                   caption: 'کیفیت متوسط',
//                   res: '240p'
//                 }
//               ],
//               pamphlet: null,
//               voice: null
//             },
//             photo: 'https://nodes.alaatv.com/media/thumbnails/1441/1441004jghu.jpg',
//             can_see: 1,
//             has_watched: false,
//             set: {
//               id: 1441,
//               redirect_url: null,
//               title: 'جمع بندی شیمی پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
//               short_title: 'جمع بندی شیمی پایه (دهم و یازدهم) همایش تفتان',
//               photo: null,
//               url: {
//                 web: 'http://127.0.0.1:82/set/1441',
//                 api: 'http://127.0.0.1:82/api/v2/set/1441'
//               },
//               redirect_code: null
//             }
//           }
//         ],
//         grade: {
//           id: 8,
//           name: 'davazdahom',
//           title: 'دوازدهم'
//         },
//         exam: {
//           id: 1,
//           title: 'قلمچی'
//         },
//         product: {
//           id: 656,
//           title: null,
//           lesson_name: null
//         }
//       },
//       {
//         id: 3559,
//         title: 'شیمی',
//         description: 'جلسه 5 و 6',
//         long_description: '<p dir="[object Object]"></p>',
//         start: '17:00:00',
//         end: '17:50:00',
//         major: {
//           id: 2,
//           name: 'تجربی',
//           title: 'تجربی',
//           selected: false
//         },
//         backgroundColor: null,
//         borderColor: null,
//         textColor: null,
//         url: null,
//         voice: null,
//         video: null,
//         contents: [
//           {
//             id: 33990,
//             redirect_url: null,
//             type: {
//               id: 4,
//               title: 'lesson_video',
//               display_name: 'فیلم درس'
//             },
//             title: 'تست - جدول تناوبی ، ایزوتوپ (محاسبات) - (قسمت دوم)',
//             url: {
//               web: 'http://127.0.0.1:82/c/33990',
//               api: 'http://127.0.0.1:82/api/v2/c/33990'
//             },
//             file: {
//               video: [
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6ImkrMmRxNmVLbFUyRHJYSGNBV0t3U1E9PSIsInZhbHVlIjoiOFk5amtzbldSVW5ZUTA1UmJQVnUwQnNreWFyNkhPWnFuUm9oZ1ZqN2NUNmJMZDVQbEQxYzNFS3NWYk45YWxydVA4LytPcFVYMDZ5MjJZQmZ5YTVqQ3JhVVRLWEhBdHppREpnNkN0bktaUGhLMnVyclI5NkdVaG1EZjdnekp1TmEya3licmUyNXgzVXdWRzZZbjhLK1cxKzAyeERFQnY3aTRObFJIdzhwQUNEUlk4VzdKKzZ5UVdKTFVyOXFEelRIIiwibWFjIjoiMGUxMzZiNTlmYzE4ZmNiMWE4OTcwNDgxYzhiMDJhOTAyODQxZmNhYWI2Yzk5ZGVmYTJjZGNmNDRkZWIyNGI2MiIsInRhZyI6IiJ9',
//                   ext: 'mp4',
//                   size: '266.87 MB',
//                   caption: 'کیفیت عالی',
//                   res: '720p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6Imd0S2ZJZ2RpVFN2S3NvVVNOZU9jbXc9PSIsInZhbHVlIjoiVWJqR3ZQb3I0enViZFliMURtb0tMVVpoVTl1MTdSd2xFMU15T2t6UGRCOVlDU3VQUE1oS3IzZjcvUTJub2pGelRZY2hiN2tpL3I0VmZXdTVqd204bTVIbDlUdk1ZUlcweEdUdnlPZlpMV2Y3eDk0dThIcVlFdHR4dE9BQ1lYOWx4RXh1VkwxOVA3OEFYT1ZKWkQ5ZnEzaEZ3V0sxd0NjWmFFVFhuUGtweE53PSIsIm1hYyI6ImJlYTA0NGQ0MjI4NDRmYzQ5MDI5MGQ1NjBjNGQyYjNhOWVlMDJlZTE5OTkzZWZiMTk5MWFjMjhiNzAxZDQ5Y2QiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '45.58 MB',
//                   caption: 'کیفیت بالا',
//                   res: '480p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6IkZSUFBxOUxQZlFUVzdXYjNNTzQrNHc9PSIsInZhbHVlIjoiQzJCMVRiR2RteHdYbms2VGNvRkVVaHpvRHhaemtiZ0pLR0tFUkIxcTdJcUdsb1hOZVlacWltZzRqTG5Pb1pkaUVqVzZvTUhsWlRpY1llLzE3Yllka2FhYS9QOTJCS3VXTmx6ZjAwRklPV1RNcDhDMUZRMW03clhvai9LL2UybnFFWFA1R0NuTTRMNEpOVDFuZGlwL3p4NERJTzN1cXIvVElpb3NaVE5JS21jPSIsIm1hYyI6IjIzZjU1ZjQ0ZWNhYjY1YTBjNzQxMTBjZjM0ZjUwZjE3NTg3Y2FjNGM0ZTEyODI4NWU3YWNlZTI5NDZmNjE3ZWYiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '19.35 MB',
//                   caption: 'کیفیت متوسط',
//                   res: '240p'
//                 }
//               ],
//               pamphlet: null,
//               voice: null
//             },
//             photo: 'https://nodes.alaatv.com/media/thumbnails/1441/1441005kiub.jpg',
//             can_see: 1,
//             has_watched: false,
//             set: {
//               id: 1441,
//               redirect_url: null,
//               title: 'جمع بندی شیمی پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
//               short_title: 'جمع بندی شیمی پایه (دهم و یازدهم) همایش تفتان',
//               photo: null,
//               url: {
//                 web: 'http://127.0.0.1:82/set/1441',
//                 api: 'http://127.0.0.1:82/api/v2/set/1441'
//               },
//               redirect_code: null
//             }
//           },
//           {
//             id: 33722,
//             redirect_url: null,
//             type: {
//               id: 4,
//               title: 'lesson_video',
//               display_name: 'فیلم درس'
//             },
//             title: 'درسنامه - جدول تناوبی ، آرایش الکترونی(بور) - (قسمت اول)',
//             url: {
//               web: 'http://127.0.0.1:82/c/33722',
//               api: 'http://127.0.0.1:82/api/v2/c/33722'
//             },
//             file: {
//               video: [
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6Im45Y25Vd2xPQi96VHg2V1RQenZwY3c9PSIsInZhbHVlIjoiQVhFVU5ZM2lEMkYzS01Xd0h3QTFtd0pWa0Z1ZittczZySkM2YVJJYzZYbGdiTUo2NlI0ZmNVNFU0MGltYmZWd2I1NHo4b3diZDdpMEhrOGZzazhYeWovRlIwMDNBWUQxWFVjUmxqRG9XbWJjYWNsQldpVk1Yayt2clZhamQ3aU4vUitBSGRZL0RvYURoZEhUNTVzeExGVDk4MytnVE01ZTFTTm9lNDVpVzZ6cFliOFJUYmRUN1NEeHIwVkxNbEVqIiwibWFjIjoiZDVmN2E5YWQyMzkzNjk4ZTFhYTZhY2NiMzAyMTljMWM1YmZkYmFjOGZiOTNhYjA0M2Q2NzlmZTYzOWIzYmE5ZCIsInRhZyI6IiJ9',
//                   ext: 'mp4',
//                   size: '316.65 MB',
//                   caption: 'کیفیت عالی',
//                   res: '720p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6ImdmUUZ5TTU0UWdsZUJOa1M2Q3JhMVE9PSIsInZhbHVlIjoibHdUc3FRZFYyOXV2U3RCTEpsRVNJVks5b2F3SEsvTXFsdXQyMlFwNTQwcEpNZmFpNURSS2RzcWJlQlcrVXN0VWZBaklOWGd3YmVuTVpHRWlBYitIOGw4MVZhRUYwQ29NRkdrWmlRay9qd2tBNTIrTXhyT21EQmlOZ2dIUHNQT3hhczRQQ2VEaWV4NThIZXlCSittTlVGczROUEwzWlhzbmZCd1hMS0xmcDd3PSIsIm1hYyI6IjNhYmJkNWU4MjFjZTU3NTRhYmQwMjNiZWM4MTQwYjQ0YzJlNmM3YjRjOGRlMzAwMDliN2YyZmRmZDcwYjMzYzAiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '64.73 MB',
//                   caption: 'کیفیت بالا',
//                   res: '480p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6Inl0UmFOT1RocEh3N2wzZjV1eWxOQ3c9PSIsInZhbHVlIjoickFBdlRYK0pFaHR3YWw4NDVqRE9rRHM1eXdmMzdndXpHRmZqM2ZvTEhyV1UzTkFxTFc1Z0Q3ZzBHN1ZZZzJhaHhXSmd3SE9kQjR5M2FUVStIMXlUcCtBVGVZaVZKYWpnNEtSQXpyNUVmdWN3SjNnVlpSMFk3Y29GL1J3a051bVJqUUpTNmNTNy82ZkIzeHZLZXB2MDlobERZN2ZPc0p2OW85OEU3Ujl3QWcwPSIsIm1hYyI6IjFhNGEyMjkxOGU1Y2MyOTE2ZmYzNjcyNGE1ODAzNjViOWQxYTYwYjc3ZjliMjI2MzY4MDA3Y2EwNDgwN2ZhMWMiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '26.87 MB',
//                   caption: 'کیفیت متوسط',
//                   res: '240p'
//                 }
//               ],
//               pamphlet: null,
//               voice: null
//             },
//             photo: 'https://nodes.alaatv.com/media/thumbnails/1441/1441006yubn.jpg',
//             can_see: 1,
//             has_watched: false,
//             set: {
//               id: 1441,
//               redirect_url: null,
//               title: 'جمع بندی شیمی پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
//               short_title: 'جمع بندی شیمی پایه (دهم و یازدهم) همایش تفتان',
//               photo: null,
//               url: {
//                 web: 'http://127.0.0.1:82/set/1441',
//                 api: 'http://127.0.0.1:82/api/v2/set/1441'
//               },
//               redirect_code: null
//             }
//           }
//         ],
//         grade: {
//           id: 8,
//           name: 'davazdahom',
//           title: 'دوازدهم'
//         },
//         exam: {
//           id: 1,
//           title: 'قلمچی'
//         },
//         product: {
//           id: 656,
//           title: null,
//           lesson_name: null
//         }
//       },
//       {
//         id: 3560,
//         title: 'شیمی',
//         description: 'جبرانی',
//         long_description: '<p dir="[object Object]"></p>',
//         start: '18:00:00',
//         end: '18:50:00',
//         major: {
//           id: 2,
//           name: 'تجربی',
//           title: 'تجربی',
//           selected: false
//         },
//         backgroundColor: null,
//         borderColor: null,
//         textColor: null,
//         url: null,
//         voice: null,
//         video: null,
//         contents: [],
//         grade: {
//           id: 8,
//           name: 'davazdahom',
//           title: 'دوازدهم'
//         },
//         exam: {
//           id: 1,
//           title: 'قلمچی'
//         },
//         product: {
//           id: null,
//           title: null,
//           lesson_name: null
//         }
//       },
//       {
//         id: 3631,
//         title: 'ریاضی',
//         description: 'جلسه 1 و 2',
//         long_description: '<p dir="[object Object]"></p>',
//         start: '09:00:00',
//         end: '09:50:00',
//         major: {
//           id: 1,
//           name: 'ریاضی',
//           title: 'ریاضی',
//           selected: true
//         },
//         backgroundColor: null,
//         borderColor: null,
//         textColor: null,
//         url: null,
//         voice: null,
//         video: null,
//         contents: [
//           {
//             id: 33902,
//             redirect_url: null,
//             type: {
//               id: 4,
//               title: 'lesson_video',
//               display_name: 'فیلم درس'
//             },
//             title: 'درسنامه - توان گویا و عبارات جبری ، ریشه توان و ریشه n ام',
//             url: {
//               web: 'http://127.0.0.1:82/c/33902',
//               api: 'http://127.0.0.1:82/api/v2/c/33902'
//             },
//             file: {
//               video: [
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6IjVtbzlodzcvcDhuTWFxa3JhanlteVE9PSIsInZhbHVlIjoiTncvRnl4ZUhPbVRwakdncmpWdERUSFFGcGRtdVZEZEZoY0Z6NmRRNGo3TXlYV2ExaUtLeXRmUXl0Si8wS3c0M29rRS93NXhpRXZqV0Q0YWlhdWdrY1k1aDFlQVpsZWN6VENldm45K1BJeUIrZFVFWnU0all5Rm5FUXhDU2ZWWjc2YTRweWVzdlZ4eW5tbUk4Nmt5cWxUVC9RaktrbTNVMUUwTVdjT1h5QTRpYWkrY2RnZDJnazZvMWhydjhlWG9PIiwibWFjIjoiMGI2Y2ViODU3NGE4M2EzMWM3OGU4ZDY4MDg2NmZlM2RjZTIyZmVkMWRjZTdjYzNhZDZkMjk5MDNiNzBmMTE5YiIsInRhZyI6IiJ9',
//                   ext: 'mp4',
//                   size: '336.16 MB',
//                   caption: 'کیفیت عالی',
//                   res: '720p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6InZxa0VScmdqUE1SVVdkeDZ6V3NPOHc9PSIsInZhbHVlIjoiQms3MXJaT1FYbHJxQlpqY2Y5MTZ2c1oyanV1eUJud3J1ODQ0USthK0xNc2FiWkFxSVV4N0dOcHJnNVpsS3hxTFI4T25BYjUrQkp2blFaQmV4WXc0cnZFNG0wenI5c09HeS8wY0RsUFN5WlhWdEgvclM4TEdUUnR1elRVYmV3UkR0MnBHQXZ0R0taZUdWT0JtMTBicGVzVHZkQ2c2SmdqSXFxOTcrSXNsa0ljPSIsIm1hYyI6IjI0YWNjMGMwN2ZiZDkyY2VmNGFjNjg1MTI0MWMwNDM3NjNhZGY3NTE0YTcyNDk0YTdiYjhmNjQ0MTFmNjMyOTgiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '53.39 MB',
//                   caption: 'کیفیت بالا',
//                   res: '480p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6ImhnM0V4ZzIweE82UTNIQVZpaHVHMmc9PSIsInZhbHVlIjoiY0Y0RmgxMmhTY3J3d0hORGJ2Unp6QWtDQjRkejQ1M3E3dVhpWkNZSWxudmhBNVhyc0NVTUZNNzhzY09Bci91WVl6NDBOa0tLaU1LNnBKeit6WjhRdFl3QzVkZVkwSVNGVUtnSG5mbGRORmNISzBJTlBMRG1DRUIrbEFzN3JvMitPTGs1R0h4aG9WRXFwZlBkNmhKWnVBQ3Bxb0NOWWNzUHNjU1F0TmQ5dGRvPSIsIm1hYyI6ImM3NTlhZGQwMTQ4OGZkNzE5NzcxOGY1MThiZWE4MjE5NzBlZDhlMWZlZTY4MDIzOWZiN2U1MGIzYWM0NTY2YmYiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '23.7 MB',
//                   caption: 'کیفیت متوسط',
//                   res: '240p'
//                 }
//               ],
//               pamphlet: null,
//               voice: null
//             },
//             photo: 'https://nodes.alaatv.com/media/thumbnails/1434/1434001jghu.jpg',
//             can_see: 1,
//             has_watched: false,
//             set: {
//               id: 1434,
//               redirect_url: null,
//               title: 'جمع بندی حسابان1  و ریاضی پایه(دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
//               short_title: 'جمع بندی حسابان یک و ریاضی پایه (دهم و یازدهم) همایش تفتان',
//               photo: null,
//               url: {
//                 web: 'http://127.0.0.1:82/set/1434',
//                 api: 'http://127.0.0.1:82/api/v2/set/1434'
//               },
//               redirect_code: null
//             }
//           },
//           {
//             id: 33903,
//             redirect_url: null,
//             type: {
//               id: 5,
//               title: 'tests',
//               display_name: 'تستها'
//             },
//             title: 'تست - توان گویا و عبارات جبری ، ریشه و توان',
//             url: {
//               web: 'http://127.0.0.1:82/c/33903',
//               api: 'http://127.0.0.1:82/api/v2/c/33903'
//             },
//             file: {
//               video: [
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6Ikh3eGlXQXBzbjFvUDEweCtLcGloQUE9PSIsInZhbHVlIjoiS3FSczgzZEFsMlNnUjZpMGlCVjYwTUI3YlBzcklzMHl6VjdrT2RaSXkyRDYzbEFzRXhQSDcvOGZvaWNSQmY1cEQ0cERTV0Q5cGh5UlZ4MVJ3NE03aldQcXBjTnE3RmpMbWxzNnJKQTFnaW9BWXBXWTMwYkgxWlRyR3M1Z2NIT2x2TGJNS0pWOCtHS1l5dUE2OEU5WUFTS0JZYUk0Y3ZGdzVTME50ZEhuZC85N3NqZTV5ZDMvUmgrUERpd2I2SWg1IiwibWFjIjoiODQ1ZjI1MjUwZDI1MDAyOWI0OWMzZDM3ZmRlY2IwOGNiMjU3ZjhmZGI3NTMzNjhkMTlkMzRkMTgwZDNiMTdhYyIsInRhZyI6IiJ9',
//                   ext: 'mp4',
//                   size: '265.57 MB',
//                   caption: 'کیفیت عالی',
//                   res: '720p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6ImNwQnhhRnJrSTY3VzUyN0p4TkMrSWc9PSIsInZhbHVlIjoicEZmVEl5SktWanhkWEUrSFB1eFJaWGd4ZWV5MUt6dnBUTDNldUdMOGRnR04xTTk0U0w2em5KUEhsQkhtVzlBcXkvejFzL0VSN1R2SS9Lek1FY2NTMENPM1FybTlsZ2JXVE9BRk9ZaCtRUXkreDlkR0FzdVJyMmpnNzZ4MGJ0RFdaL2VlVXZ2U1MvcFBtYzM2OVNOOW8xRUdGRWtWaW1TbDhtbHdZQTN4T0FzPSIsIm1hYyI6ImVhODFlYjYzZTY1NWQ0NWMwMGU3Y2Q5OTkyYmI5MTI4MjM2ODlkNzk3NDEyNTQ3MGVmZWUwMjMyYTdhZGQ2YmUiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '40.53 MB',
//                   caption: 'کیفیت بالا',
//                   res: '480p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6InZiRXlFTFJMK1dHNGg4a29NM3A2RHc9PSIsInZhbHVlIjoiU3pJRjVrQVcvR0tUOVN6VktjZGkvaFZEQ2wxaW0rYXBJdkVaWk1BZUdLT1ozZzRwWkN5ZnJIdmlUV0x0ak4ydFMxclFzQ3J2VldvNkpuSzFGbDdFTEZKMjZnOUxkellLbFVPK2ZOMDRyRnNrZm1TWkl5WHpTTWZidC9RMEpMRlJDS1JOT1NIUEU2eXZOVDBGTytjVm9oS0hCdEZobTdvSjVBNXFiSDA0aGI0PSIsIm1hYyI6IjJiNTUwZGUwOWI5MGZiZjdhNzdmMDIwMTIyMjRjNDI4NjQ0N2I0MGJlMGU5ZDIyZTc5YWVlMGNhNDBjMjBmMzIiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '18.04 MB',
//                   caption: 'کیفیت متوسط',
//                   res: '240p'
//                 }
//               ],
//               pamphlet: null,
//               voice: null
//             },
//             photo: 'https://nodes.alaatv.com/media/thumbnails/1434/1434002mhjo.jpg',
//             can_see: 1,
//             has_watched: false,
//             set: {
//               id: 1434,
//               redirect_url: null,
//               title: 'جمع بندی حسابان1  و ریاضی پایه(دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
//               short_title: 'جمع بندی حسابان یک و ریاضی پایه (دهم و یازدهم) همایش تفتان',
//               photo: null,
//               url: {
//                 web: 'http://127.0.0.1:82/set/1434',
//                 api: 'http://127.0.0.1:82/api/v2/set/1434'
//               },
//               redirect_code: null
//             }
//           }
//         ],
//         grade: {
//           id: 8,
//           name: 'davazdahom',
//           title: 'دوازدهم'
//         },
//         exam: {
//           id: 1,
//           title: 'قلمچی'
//         },
//         product: {
//           id: 652,
//           title: null,
//           lesson_name: null
//         }
//       },
//       {
//         id: 3632,
//         title: 'ریاضی',
//         description: 'جلسه 3 و 4',
//         long_description: '<p dir="[object Object]"></p>',
//         start: '10:00:00',
//         end: '10:50:00',
//         major: {
//           id: 1,
//           name: 'ریاضی',
//           title: 'ریاضی',
//           selected: true
//         },
//         backgroundColor: null,
//         borderColor: null,
//         textColor: null,
//         url: null,
//         voice: null,
//         video: null,
//         contents: [
//           {
//             id: 33904,
//             redirect_url: null,
//             type: {
//               id: 4,
//               title: 'lesson_video',
//               display_name: 'فیلم درس'
//             },
//             title: 'درسنامه - توان گویا و عبارات جبری ، عبارات جبری',
//             url: {
//               web: 'http://127.0.0.1:82/c/33904',
//               api: 'http://127.0.0.1:82/api/v2/c/33904'
//             },
//             file: {
//               video: [
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6Ik9PbzlRTGpnZ2M5TFBDejRZdVdLaFE9PSIsInZhbHVlIjoiOTZEWDU3dWUyd0VMYVJmekp0NElySmJSNGNwS1hFWEN0Mzgra3RWaUQxV25FWjRPcXhDUjVROEtrM2xodmJpMElIQWc5Q0hhaHF5Y2dCSnNsRkpqUjRJL3pjT2plWjNqdm9SVkc1M1ZCQ05pem92b1Y3UnZRRmpGUzRZOW1KZmNMTW0wR0V1ZmZ4UisxOHRENVdZb0l1U2dYV08xME95Z1pzQWhJNWpibERxcVNJWUNVTllLVHlKZmk1UEJFRTJKIiwibWFjIjoiNzU3YTYwZGY2NDJjZTQ2MGI2YWYzMjgzMTc5NjRjZGUzZDQxZmZhMWMyZWE4YTQ2Yjg5NWY1MDYwZWI4MjhmYyIsInRhZyI6IiJ9',
//                   ext: 'mp4',
//                   size: '384.38 MB',
//                   caption: 'کیفیت عالی',
//                   res: '720p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6InpPN2Yzd2t2ZlNGUEVaSHpCSk9xY1E9PSIsInZhbHVlIjoiQ2ZsZ2lDajZoMGNCTDQrcW4zOTZIOEdnMUNXbVo3d2VaT0tCb0RXZXBvRmVDMDNDWHJ3YTU3ZmhiOWVDbGVXWjI2aHBOZHpHbVcxcTNpTDdTYzVmL1pxSGVSSVFHY2w2djk1akxlajdvNXZlWXQ1UVBscytMQ2hVTUpacDZzNUU2MndkaTkvV1hCd1E0RmhNLzkvTzJaWHMxZmxKbUF6RUlUY3FmdDhFK3Y0PSIsIm1hYyI6ImE3MTMxMTI3NmE4ZDNhOTgwMzlhZDMzNWYyOGFjM2EzOGE1ZWFlNDJmNmVhM2ZlZDBmMTJjMTkzMzYzN2M5ZGMiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '58.74 MB',
//                   caption: 'کیفیت بالا',
//                   res: '480p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6IlNqVmZGaUVBT3gzZ01VYXEvcU82cHc9PSIsInZhbHVlIjoia29zSHR1d29uQU9rWVhvbFRRcEViM2RlTno0TVpGTSt0dE16cllUcEJ6TnR4SEJIMFAxRzJSMkJwbTducjJPSUFVRTRURWpEVDBvVGtFK1R5ZUFCY1NFYXl1OFVuS1ArbzdGcmhsbWtqSkw5UlVuampPU0hWUFdsQkh6eFQ0M0ZqS1pRcXhPa0JuYktqeFU5SGY4MG40ZW1keEphMSs5dDUrSVNrT2NsS05vPSIsIm1hYyI6IjM2ZjJhNTEyNTRjZTMwNTAxNDM5MWM1NDg2NzNjNjVhMDYyODU1ODAxMThkYjdlZmNmOGVhMzEzMjEwN2M1NjMiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '26.08 MB',
//                   caption: 'کیفیت متوسط',
//                   res: '240p'
//                 }
//               ],
//               pamphlet: null,
//               voice: null
//             },
//             photo: 'https://nodes.alaatv.com/media/thumbnails/1434/1434003lkjo.jpg',
//             can_see: 1,
//             has_watched: false,
//             set: {
//               id: 1434,
//               redirect_url: null,
//               title: 'جمع بندی حسابان1  و ریاضی پایه(دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
//               short_title: 'جمع بندی حسابان یک و ریاضی پایه (دهم و یازدهم) همایش تفتان',
//               photo: null,
//               url: {
//                 web: 'http://127.0.0.1:82/set/1434',
//                 api: 'http://127.0.0.1:82/api/v2/set/1434'
//               },
//               redirect_code: null
//             }
//           },
//           {
//             id: 33905,
//             redirect_url: null,
//             type: {
//               id: 5,
//               title: 'tests',
//               display_name: 'تستها'
//             },
//             title: 'تست - توان گویا و عبارات جبری ، عبارات جبری',
//             url: {
//               web: 'http://127.0.0.1:82/c/33905',
//               api: 'http://127.0.0.1:82/api/v2/c/33905'
//             },
//             file: {
//               video: [
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6ImZSVi9BOWpOd3VZMnIwMFpMSnlQeFE9PSIsInZhbHVlIjoiNHM2U0hMVnBVbDk3ZytsZGtVN3lNWW1NV25mandtMFpJSWR5bms4S2J6ODRsQVdlRTY1Z3A2Z1Q3STlBUm5CNlZhVW9VM0luZi9YcElZL2E0aVNaRFlmSmlncHlyOVhoTUVkVVpHUVFENFZ4cWFCUnRJUjFlQ1IrYlJOU2xuSVV3VlV3NUpkU1p6VTBaaHphWm1FUHlEVTN3N2w1TG4zamdMOFBaSWJoOVAwMXFjMTNxYVpaRFpIbXkrVExzUnVIIiwibWFjIjoiM2JiNjEyMmIzMWFiYjIzZDJlNmE4NjVmZDQ2MDkyN2ZlYmMyMWQxZmY3MTIxYzNmYmJmZGIyZTVhMWI2NjhhNCIsInRhZyI6IiJ9',
//                   ext: 'mp4',
//                   size: '213.79 MB',
//                   caption: 'کیفیت عالی',
//                   res: '720p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6ImpIcWdIQU85cWs2RmdLNzB2OTkrTlE9PSIsInZhbHVlIjoiYlZoQ1N0bnEybEk2aVhveG1yYm1YVFdZSDlFRmFuUlRLVzZqOXBCUDJMQXlZNVJkMnM4MW9CcTBjNGllazh2MFFKbWpiTEhKd3pBeVovcHI5TU15OHo3WStHemlQYmhmU2lyRG9FRm8yU0FITW9JK0d3YzVuSDJlais4RDQzM1Vycis3TzFkanFyTDFPVnRBV0xTYkhEUWNFYnhNMWorc0tWRm9vUkpsbUpvPSIsIm1hYyI6IjI4YTU0ZjgzNzk2NjZhNjMxMWJlZDI1ZTU5MWQzMGJjOGE3MTE2MWYzNzVmNWY3YTMxNzM1MDY3Nzc1MWMyMGIiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '32.14 MB',
//                   caption: 'کیفیت بالا',
//                   res: '480p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6Ikw1TkVxMzhPNXJSQytCNlM4bjN5U3c9PSIsInZhbHVlIjoidUVwTmk0SWFTQWJheEROUzlLWUJ1MVZhWmM0Nkl4dWJXUnNPWmQvZUNqRmpFOEpIaVU0cjBTVVhDeWRpYmgxTFNxUS9kRU91ZjdSVFc5cDlVeENPVERJK3ptNmZsYWRqNHhtd0QxZEV6d1FqNDUzajdKclB3WFhHZyt3Y1NJV1crWGdMZ2FiNitINUtOL0RTaE5SR2hMcGRFSzhtem9icWlrNitWRjdULzMwPSIsIm1hYyI6IjY2YWUyOTQ5ZmNlYjIzNDRiMDJhODhkMjY5OTdhNzgwYjE2NzI4NmE5NjkwODM5ZTM1ZWIyMjFlMjcxZWIzYjIiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '14.35 MB',
//                   caption: 'کیفیت متوسط',
//                   res: '240p'
//                 }
//               ],
//               pamphlet: null,
//               voice: null
//             },
//             photo: 'https://nodes.alaatv.com/media/thumbnails/1434/1434004nbdt.jpg',
//             can_see: 1,
//             has_watched: false,
//             set: {
//               id: 1434,
//               redirect_url: null,
//               title: 'جمع بندی حسابان1  و ریاضی پایه(دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
//               short_title: 'جمع بندی حسابان یک و ریاضی پایه (دهم و یازدهم) همایش تفتان',
//               photo: null,
//               url: {
//                 web: 'http://127.0.0.1:82/set/1434',
//                 api: 'http://127.0.0.1:82/api/v2/set/1434'
//               },
//               redirect_code: null
//             }
//           }
//         ],
//         grade: {
//           id: 8,
//           name: 'davazdahom',
//           title: 'دوازدهم'
//         },
//         exam: {
//           id: 1,
//           title: 'قلمچی'
//         },
//         product: {
//           id: 652,
//           title: null,
//           lesson_name: null
//         }
//       },
//       {
//         id: 3633,
//         title: 'ریاضی',
//         description: 'جلسه 5 و 6',
//         long_description: '<p dir="[object Object]"></p>',
//         start: '11:00:00',
//         end: '11:50:00',
//         major: {
//           id: 1,
//           name: 'ریاضی',
//           title: 'ریاضی',
//           selected: true
//         },
//         backgroundColor: null,
//         borderColor: null,
//         textColor: null,
//         url: null,
//         voice: null,
//         video: null,
//         contents: [
//           {
//             id: 33906,
//             redirect_url: null,
//             type: {
//               id: 4,
//               title: 'lesson_video',
//               display_name: 'فیلم درس'
//             },
//             title: 'درسنامه - معادله و نامعادله ، معادله درجه دو',
//             url: {
//               web: 'http://127.0.0.1:82/c/33906',
//               api: 'http://127.0.0.1:82/api/v2/c/33906'
//             },
//             file: {
//               video: [
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6Ii90WjBQb0R3eTRhSkpMVnRSRmVPcFE9PSIsInZhbHVlIjoiZ1FZMnFYdzIzc2JsVEUzanR3ZE1CSitpSlJ5OEtVRkpVM0NheUtmMmErd285K3VZVThlN3hxTmo1ZzV6amdjZVlETmYrNjFoRWZKbStyb3Iva3FuTWNGSmRuZk5paTBLaDVkYjA5SlVUWm9JT2JjR1B1K2tMKy8ybEpEV0wyU0ZWWlhocGZMRGFOSUN6MlNuci9GZ0liMzFTMm1VQnRTM1F1RTVqQ1l2K3UxT3lKeHU0WFl0bHhkOEFqYVA2SGNGIiwibWFjIjoiZDM3MDkxNmUxMTBjY2NkYTE5MDEyOGJiY2U3NzRlOTczZGFhMTM1YmUzZDhiYWMzMTBlNDE1OWI4YTUwZjVjYyIsInRhZyI6IiJ9',
//                   ext: 'mp4',
//                   size: '184.83 MB',
//                   caption: 'کیفیت عالی',
//                   res: '720p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6ImUrdWpScVVqcE92YnptMFg2N085M3c9PSIsInZhbHVlIjoiTmk2UXNPTTFhcXdQTFNvajVlaWhBVmNLUzIvbW5OZFpHa0VBeUFVMnRWQVJXVVFicFRJVGVueE5qRWR0NTVGdDRZUFA3b3ZFY2FZYURnck9DZEtBVHhCemdISEVnblE1djVhYlJjSXRtUnRFaC9zeXFlYWNGTHhGcU1HWW44eGQwTkZ6WWR6VjkzT0doSVNYMWVKeFdQNHQreE10UXNvejZjMEYxYzlwa3ZJPSIsIm1hYyI6IjU2Mjk2M2JkMjY3ZDA5Yjk1YTEwNDM4NmYyZmJiYTc3N2JhMTlkM2NiYmY1NTBkNGFjZGVhMGFkOTZlZDYwZDQiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '28.59 MB',
//                   caption: 'کیفیت بالا',
//                   res: '480p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6ImsvYTJzU2Y2L1o2QWV2d0ZqbmsvRnc9PSIsInZhbHVlIjoiUUtsSGRrZ2pneWtZc1Zwd0gweTJpRmk2bXE3cTRCVG9ZMWVGRXExNnpYTFBPN2NMMDVybHJ2TCtIVXhQQk1wSkJjR3RNaEtudi9mT0ZLcmNjdEdMTTBhNXUwNHdMWjlDTVVMUGh3QU02U3FYb1BkM0NnRktOVHJmUk5NaG1HZXFjQW5SWHJkbXUrMWxsVkt1c3lBRnFhczl5RVNpL0hFdjNUYWxlaW5aRmJRPSIsIm1hYyI6ImIxZDlkZTZiZWZjOWFlZjg4ODYyYzQzZGE2NzZkZjAxYzlhYzI2NDlmMTRhM2VkMTY3ZjM2MDQ3NjJhZTM1ZTkiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '12.68 MB',
//                   caption: 'کیفیت متوسط',
//                   res: '240p'
//                 }
//               ],
//               pamphlet: null,
//               voice: null
//             },
//             photo: 'https://nodes.alaatv.com/media/thumbnails/1434/1434005hytr.jpg',
//             can_see: 1,
//             has_watched: false,
//             set: {
//               id: 1434,
//               redirect_url: null,
//               title: 'جمع بندی حسابان1  و ریاضی پایه(دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
//               short_title: 'جمع بندی حسابان یک و ریاضی پایه (دهم و یازدهم) همایش تفتان',
//               photo: null,
//               url: {
//                 web: 'http://127.0.0.1:82/set/1434',
//                 api: 'http://127.0.0.1:82/api/v2/set/1434'
//               },
//               redirect_code: null
//             }
//           },
//           {
//             id: 33907,
//             redirect_url: null,
//             type: {
//               id: 4,
//               title: 'lesson_video',
//               display_name: 'فیلم درس'
//             },
//             title: 'درسنامه - معادله و نامعادله ، سهمی',
//             url: {
//               web: 'http://127.0.0.1:82/c/33907',
//               api: 'http://127.0.0.1:82/api/v2/c/33907'
//             },
//             file: {
//               video: [
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6IjhqcVBDSG02MExNdDZTSlh4TTBlU3c9PSIsInZhbHVlIjoiMnZIZkg3ZUZPdlp2dGJGNzgwWDJZVzlkRUM4THo2NGRheEVlUHMxUWdpYmxJTTZyQkloNnNUL2tkTUN6WDgwVFptYVlLTERaY0F2VkdCbWpnY2dTc3BkSWptZ2pqOG00aXFNTzc4SVZPdytMSnBVNGl0eGVkMWpZK0ZhdXh1L0RJL2dCRkRwdzdUUEhoSVhUZmpaMGdaUk5BSVpyNUNJdGVHU2JFazA3bUVEdjJ4SFNKdWJqemJ2Vm9TV1h2SGtRIiwibWFjIjoiZDNiNDc4ZGVmOWVhNmY4ODIzZWFiMjFkZmJmNjY5ZWMzMTE0NDMyMDgzNmFjOWUxMGQ0MDVhZDdiY2FkN2ExYyIsInRhZyI6IiJ9',
//                   ext: 'mp4',
//                   size: '284.08 MB',
//                   caption: 'کیفیت عالی',
//                   res: '720p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6Ink5U3lJV3NVb2xrWjh4T0hBQmlYc0E9PSIsInZhbHVlIjoiaGd4RUtkNThtdzJYRGY2NGRxMmZxTnlSZWFCeUxDeW56SEpET0k0YmtxWkZZajU4YkFrazhTaGMyUUlwZ00wd3JjTlZ4bTZqRjBXYkJ4SXlmOE9lNVBJdHprczRkbnJzbHRpU0JTUjA1QzFpK3F6ZU5HeTUvVFN5M2oyT2lVMmJTVVJGR0FuVkh4ZHRYaTV4RW1xMkJKYTJNN1JydFRRZ1RqY255eUJ3MC9vPSIsIm1hYyI6ImU2ODYyOTE1YjQ1YzIwZjkyMmUzZjhjZWQyMjc5ZDY1MTgxOTM5ZjVmYWNjOGQ3YzY1M2RkZTdmOTExZmJhYTQiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '42.88 MB',
//                   caption: 'کیفیت بالا',
//                   res: '480p'
//                 },
//                 {
//                   link: 'http://127.0.0.1:82/d/eyJpdiI6ImluVUlucmVMNkt4dFl6SHpWRXJ6blE9PSIsInZhbHVlIjoiTTlRYUVza1pvZ1VNZ0hUMTFHS1BTOXZXKzl3TDk1ejRLSEZzR0pjdUlhbjhIWndLczMxaFRtY1FEcG0rams4T084QWlBV0FNK0J3ME1NWi9TUmJhT0UwZnBpNnNYcEN1cC9KdEw5Y1l5blhJVEFZTWx0K3FZclJXdTJHaU5wdm1MSmcraDFvejVnQzFsRkpURGRpSnV4L25naVYzbFZ5elhRdDBlb2tSRmgwPSIsIm1hYyI6Ijc3YWEwYmMxNDU3ZDBiYjc2NWQ5N2RiNjc3ZmIzY2Q1YmE2MzYzMGQ0ZDg5MDNkNDI0Njc0YTViMWQ2NzZjNmMiLCJ0YWciOiIifQ==',
//                   ext: 'mp4',
//                   size: '19.09 MB',
//                   caption: 'کیفیت متوسط',
//                   res: '240p'
//                 }
//               ],
//               pamphlet: null,
//               voice: null
//             },
//             photo: 'https://nodes.alaatv.com/media/thumbnails/1434/1434006loiu.jpg',
//             can_see: 1,
//             has_watched: false,
//             set: {
//               id: 1434,
//               redirect_url: null,
//               title: 'جمع بندی حسابان1  و ریاضی پایه(دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
//               short_title: 'جمع بندی حسابان یک و ریاضی پایه (دهم و یازدهم) همایش تفتان',
//               photo: null,
//               url: {
//                 web: 'http://127.0.0.1:82/set/1434',
//                 api: 'http://127.0.0.1:82/api/v2/set/1434'
//               },
//               redirect_code: null
//             }
//           }
//         ],
//         grade: {
//           id: 8,
//           name: 'davazdahom',
//           title: 'دوازدهم'
//         },
//         exam: {
//           id: 1,
//           title: 'قلمچی'
//         },
//         product: {
//           id: 652,
//           title: null,
//           lesson_name: null
//         }
//       },
//       {
//         id: 3634,
//         title: 'ادبیات',
//         description: 'جلسه 1 تا 3',
//         long_description: '<p dir="[object Object]"></p>',
//         start: '12:00:00',
//         end: '12:50:00',
//         major: {
//           id: 1,
//           name: 'ریاضی',
//           title: 'ریاضی',
//           selected: true
//         },
//         backgroundColor: null,
//         borderColor: null,
//         textColor: null,
//         url: null,
//         voice: null,
//         video: null,
//         contents: [],
//         grade: {
//           id: 8,
//           name: 'davazdahom',
//           title: 'دوازدهم'
//         },
//         exam: {
//           id: 1,
//           title: 'قلمچی'
//         },
//         product: {
//           id: null,
//           title: null,
//           lesson_name: null
//         }
//       },
//       {
//         id: 3635,
//         title: 'ادبیات',
//         description: 'جلسه 4 تا 6',
//         long_description: '<p dir="[object Object]"></p>',
//         start: '19:00:00',
//         end: '19:50:00',
//         major: {
//           id: 1,
//           name: 'ریاضی',
//           title: 'ریاضی',
//           selected: true
//         },
//         backgroundColor: null,
//         borderColor: null,
//         textColor: null,
//         url: null,
//         voice: null,
//         video: null,
//         contents: [],
//         grade: {
//           id: 8,
//           name: 'davazdahom',
//           title: 'دوازدهم'
//         },
//         exam: {
//           id: 1,
//           title: 'قلمچی'
//         },
//         product: {
//           id: null,
//           title: null,
//           lesson_name: null
//         }
//       },
//       {
//         id: 3636,
//         title: 'زبان انگلیسی',
//         description: 'جلسه 1 تا 3',
//         long_description: '<p dir="[object Object]"></p>',
//         start: '20:00:00',
//         end: '20:50:00',
//         major: {
//           id: 1,
//           name: 'ریاضی',
//           title: 'ریاضی',
//           selected: true
//         },
//         backgroundColor: null,
//         borderColor: null,
//         textColor: null,
//         url: null,
//         voice: null,
//         video: null,
//         contents: [],
//         grade: {
//           id: 8,
//           name: 'davazdahom',
//           title: 'دوازدهم'
//         },
//         exam: {
//           id: 1,
//           title: 'قلمچی'
//         },
//         product: {
//           id: null,
//           title: null,
//           lesson_name: null
//         }
//       },
//       {
//         id: 3637,
//         title: 'استراحت',
//         description: 'جبرانی',
//         long_description: '<p dir="[object Object]"></p>',
//         start: '14:00:00',
//         end: '14:50:00',
//         major: {
//           id: 1,
//           name: 'ریاضی',
//           title: 'ریاضی',
//           selected: true
//         },
//         backgroundColor: null,
//         borderColor: null,
//         textColor: null,
//         url: null,
//         voice: null,
//         video: null,
//         contents: [],
//         grade: {
//           id: 8,
//           name: 'davazdahom',
//           title: 'دوازدهم'
//         },
//         exam: {
//           id: 1,
//           title: 'قلمچی'
//         },
//         product: {
//           id: null,
//           title: null,
//           lesson_name: null
//         }
//       },
//       {
//         id: 3638,
//         title: 'شیمی',
//         description: 'جلسه 1 و 2',
//         long_description: '<p dir="[object Object]"></p>',
//         start: '15:00:00',
//         end: '15:50:00',
//         major: {
//           id: 1,
//           name: 'ریاضی',
//           title: 'ریاضی',
//           selected: true
//         },
//         backgroundColor: null,
//         borderColor: null,
//         textColor: null,
//         url: null,
//         voice: null,
//         video: null,
//         contents: [],
//         grade: {
//           id: 8,
//           name: 'davazdahom',
//           title: 'دوازدهم'
//         },
//         exam: {
//           id: 1,
//           title: 'قلمچی'
//         },
//         product: {
//           id: null,
//           title: null,
//           lesson_name: null
//         }
//       },
//       {
//         id: 3639,
//         title: 'شیمی',
//         description: 'جلسه 3 و 4',
//         long_description: '<p dir="[object Object]"></p>',
//         start: '16:00:00',
//         end: '16:50:00',
//         major: {
//           id: 1,
//           name: 'ریاضی',
//           title: 'ریاضی',
//           selected: true
//         },
//         backgroundColor: null,
//         borderColor: null,
//         textColor: null,
//         url: null,
//         voice: null,
//         video: null,
//         contents: [],
//         grade: {
//           id: 8,
//           name: 'davazdahom',
//           title: 'دوازدهم'
//         },
//         exam: {
//           id: 1,
//           title: 'قلمچی'
//         },
//         product: {
//           id: null,
//           title: null,
//           lesson_name: null
//         }
//       },
//       {
//         id: 3640,
//         title: 'شیمی',
//         description: 'جلسه 5 و 6',
//         long_description: '<p dir="[object Object]"></p>',
//         start: '17:00:00',
//         end: '17:50:00',
//         major: {
//           id: 1,
//           name: 'ریاضی',
//           title: 'ریاضی',
//           selected: true
//         },
//         backgroundColor: null,
//         borderColor: null,
//         textColor: null,
//         url: null,
//         voice: null,
//         video: null,
//         contents: [],
//         grade: {
//           id: 8,
//           name: 'davazdahom',
//           title: 'دوازدهم'
//         },
//         exam: {
//           id: 1,
//           title: 'قلمچی'
//         },
//         product: {
//           id: null,
//           title: null,
//           lesson_name: null
//         }
//       },
//       {
//         id: 3641,
//         title: 'شیمی',
//         description: 'جبرانی',
//         long_description: '<p dir="[object Object]"></p>',
//         start: '18:00:00',
//         end: '18:50:00',
//         major: {
//           id: 1,
//           name: 'ریاضی',
//           title: 'ریاضی',
//           selected: true
//         },
//         backgroundColor: null,
//         borderColor: null,
//         textColor: null,
//         url: null,
//         voice: null,
//         video: null,
//         contents: [],
//         grade: {
//           id: 8,
//           name: 'davazdahom',
//           title: 'دوازدهم'
//         },
//         exam: {
//           id: 1,
//           title: 'قلمچی'
//         },
//         product: {
//           id: null,
//           title: null,
//           lesson_name: null
//         }
//       }
//     ],
//     contents: [
//       {
//         id: 33906,
//         redirect_url: null,
//         type: 8,
//         title: 'درسنامه - معادله و نامعادله ، معادله درجه دو',
//         body: '<p><span>درسنامه - معادله و نامعادله ، معادله درجه دو</span><br /></p>',
//         tags: null,
//         file: {
//           video: [
//             {
//               link: 'https://nodes.alaatv.com/paid/652/video/HD_720p/1434005hytr.mp4?download=1',
//               ext: 'mp4',
//               size: '184.83 MB',
//               caption: 'کیفیت عالی',
//               res: '720p'
//             },
//             {
//               link: 'https://nodes.alaatv.com/paid/652/video/hq/1434005hytr.mp4?download=1',
//               ext: 'mp4',
//               size: '28.59 MB',
//               caption: 'کیفیت بالا',
//               res: '480p'
//             },
//             {
//               link: 'https://nodes.alaatv.com/paid/652/video/240p/1434005hytr.mp4?download=1',
//               ext: 'mp4',
//               size: '12.68 MB',
//               caption: 'کیفیت متوسط',
//               res: '240p'
//             }
//           ],
//           pamphlet: null,
//           voice: null
//         },
//         duration: '00:10',
//         photo: 'https://nodes.alaatv.com/media/thumbnails/1434/1434005hytr.jpg',
//         is_free: 0,
//         order: 5,
//         page_view: null,
//         created_at: '2022-03-11 10:54:57',
//         updated_at: '2022-03-14 04:05:58',
//         url: {
//           web: 'http://127.0.0.1:82/c/33906',
//           api: 'http://127.0.0.1:82/api/v2/c/33906'
//         },
//         previous_url: {
//           web: 'http://127.0.0.1:82/c/33905',
//           api: 'http://127.0.0.1:82/api/v2/c/33905'
//         },
//         next_url: {
//           web: 'http://127.0.0.1:82/c/33907',
//           api: 'http://127.0.0.1:82/api/v2/c/33907'
//         },
//         author: {
//           id: null,
//           first_name: null,
//           last_name: null,
//           photo: '/acm/image/255x255.png'
//         },
//         set: {
//           id: 1434,
//           redirect_url: null,
//           title: 'جمع بندی حسابان1  و ریاضی پایه(دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
//           short_title: 'جمع بندی حسابان یک و ریاضی پایه (دهم و یازدهم) همایش تفتان',
//           photo: null,
//           url: {
//             web: 'http://127.0.0.1:82/set/1434',
//             api: 'http://127.0.0.1:82/api/v2/set/1434'
//           },
//           redirect_code: null
//         },
//         related_product: null,
//         can_see: 1,
//         recommended_products: null,
//         timepoints: [
//           {
//             id: 110586,
//             title: 'حل مثال',
//             time: 493,
//             isFavored: false,
//             favorUrl: 'http://127.0.0.1:82/api/v2/c/timepoint/110586/favored',
//             unfavorUrl: 'http://127.0.0.1:82/api/v2/c/timepoint/110586/unfavored'
//           }
//         ],
//         source: null,
//         redirect_code: null,
//         forrest_trees: [],
//         forrest_tags: [],
//         status: {
//           id: 3,
//           display_name: 'تکمیل شده',
//           description: 'ساخت محتوا تکمیل شد'
//         },
//         vast: {
//           id: 1,
//           url: 'https://nodes.alaatv.com/upload/vast/xml/vast_20220316102600100059.xml'
//         },
//         is_favored: false,
//         hls: null,
//         stream: null,
//         can_user_use_timepoint: true,
//         has_vast: true
//       },
//       {
//         id: 33907,
//         redirect_url: null,
//         type: 8,
//         title: 'درسنامه - معادله و نامعادله ، سهمی',
//         body: '<p><span>درسنامه - معادله و نامعادله ، سهمی</span><br /></p>',
//         tags: null,
//         file: {
//           video: [
//             {
//               link: 'https://nodes.alaatv.com/paid/652/video/HD_720p/1434006loiu.mp4?download=1',
//               ext: 'mp4',
//               size: '284.08 MB',
//               caption: 'کیفیت عالی',
//               res: '720p'
//             },
//             {
//               link: 'https://nodes.alaatv.com/paid/652/video/hq/1434006loiu.mp4?download=1',
//               ext: 'mp4',
//               size: '42.88 MB',
//               caption: 'کیفیت بالا',
//               res: '480p'
//             },
//             {
//               link: 'https://nodes.alaatv.com/paid/652/video/240p/1434006loiu.mp4?download=1',
//               ext: 'mp4',
//               size: '19.09 MB',
//               caption: 'کیفیت متوسط',
//               res: '240p'
//             }
//           ],
//           pamphlet: null,
//           voice: null
//         },
//         duration: '00:16',
//         photo: 'https://nodes.alaatv.com/media/thumbnails/1434/1434006loiu.jpg',
//         is_free: 0,
//         order: 6,
//         page_view: null,
//         created_at: '2022-03-11 10:55:14',
//         updated_at: '2022-03-14 04:06:03',
//         url: {
//           web: 'http://127.0.0.1:82/c/33907',
//           api: 'http://127.0.0.1:82/api/v2/c/33907'
//         },
//         previous_url: {
//           web: 'http://127.0.0.1:82/c/33906',
//           api: 'http://127.0.0.1:82/api/v2/c/33906'
//         },
//         next_url: {
//           web: 'http://127.0.0.1:82/c/33908',
//           api: 'http://127.0.0.1:82/api/v2/c/33908'
//         },
//         author: {
//           id: null,
//           first_name: null,
//           last_name: null,
//           photo: '/acm/image/255x255.png'
//         },
//         set: {
//           id: 1434,
//           redirect_url: null,
//           title: 'جمع بندی حسابان1  و ریاضی پایه(دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
//           short_title: 'جمع بندی حسابان یک و ریاضی پایه (دهم و یازدهم) همایش تفتان',
//           photo: null,
//           url: {
//             web: 'http://127.0.0.1:82/set/1434',
//             api: 'http://127.0.0.1:82/api/v2/set/1434'
//           },
//           redirect_code: null
//         },
//         related_product: null,
//         can_see: 1,
//         recommended_products: null,
//         timepoints: [
//           {
//             id: 110587,
//             title: 'حل مثال',
//             time: 786,
//             isFavored: false,
//             favorUrl: 'http://127.0.0.1:82/api/v2/c/timepoint/110587/favored',
//             unfavorUrl: 'http://127.0.0.1:82/api/v2/c/timepoint/110587/unfavored'
//           }
//         ],
//         source: null,
//         redirect_code: null,
//         forrest_trees: [],
//         forrest_tags: [],
//         status: {
//           id: 3,
//           display_name: 'تکمیل شده',
//           description: 'ساخت محتوا تکمیل شد'
//         },
//         vast: {
//           id: 1,
//           url: 'https://nodes.alaatv.com/upload/vast/xml/vast_20220316102600100059.xml'
//         },
//         is_favored: false,
//         hls: null,
//         stream: null,
//         can_user_use_timepoint: true,
//         has_vast: true
//       }
//     ],
//     created_at: '2022-03-16 12:16:00',
//     updated_at: '2022-03-16 12:16:00'
//   }
// ]

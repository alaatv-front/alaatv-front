<template>
<div class="home-page">
  <page-builder :sections="sections"/>
</div>
</template>

<script>
import PageBuilder from 'components/PageBuilder/PageBuilder'
import API_ADDRESS from 'src/api/Addresses'
import { BlockList } from 'src/models/Block'
export default {
  name: 'BaseComponent',
  components: { PageBuilder },
  created () {
    this.getPageData()
  },
  data () {
    return {
      sections: [
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: []
                  }
                ]
              }
            ]
          }
        }
      ],
      blocks: new BlockList()
    }
  },
  methods: {
    async getPageData () {
      const response = await this.getBlocksData()
      // const test = {
      //   data: [
      //     {
      //       id: 122,
      //       title: null,
      //       offer: false,
      //       url: null,
      //       order: 0,
      //       contents: null,
      //       sets: null,
      //       products: null,
      //       banners: [
      //         {
      //           id: 1,
      //           title: 'این از این',
      //           link: '',
      //           class: 'q-ma-xl rounded',
      //           photo: 'https://cdn.quasar.dev/img/mountains.jpg',
      //           ratio: 2.56,
      //           // features: {
      //           //   xl: {
      //           //     src: 'https://cdn.quasar.dev/img/mountains.jpg'
      //           //   },
      //           //   lg: {
      //           //     src: 'https://cdn.quasar.dev/img/mountains.jpg'
      //           //   },
      //           //   md: {
      //           //     src: 'https://cdn.quasar.dev/img/mountains.jpg'
      //           //   },
      //           //   sm: {
      //           //     src: 'https://cdn.quasar.dev/img/mountains.jpg'
      //           //   },
      //           //   xs: {
      //           //     src: 'https://cdn.quasar.dev/img/mountains.jpg'
      //           //   }
      //           // }
      //         },
      //         {
      //           id: 2,
      //           title: 'این از این',
      //           link: '',
      //           class: 'q-ma-xl rounded',
      //           photo: 'https://placeimg.com/500/300/nature',
      //           ratio: 2.56,
      //           // features: {
      //           //   xl: {
      //           //     src: 'https://placeimg.com/500/300/nature'
      //           //     // width: '500px',
      //           //     // height: ''
      //           //   },
      //           //   lg: {
      //           //     src: 'https://placeimg.com/500/300/nature'
      //           //     // width: '500px',
      //           //     // height: ''
      //           //   },
      //           //   md: {
      //           //     src: 'https://placeimg.com/500/300/nature'
      //           //     // width: '500px',
      //           //     // height: ''
      //           //   },
      //           //   sm: {
      //           //     src: 'https://placeimg.com/500/300/nature'
      //           //     // width: '500px',
      //           //     // height: ''
      //           //   },
      //           //   xs: {
      //           //     src: 'https://placeimg.com/500/300/nature'
      //           //     // width: '500px',
      //           //     // height: ''
      //           //   }
      //           // }
      //         },
      //         {
      //           id: 236,
      //           title: 'جمع بندی کامل کنکور آرش و تایتان 01',
      //           body: null,
      //           photo: 'https://nodes.alaatv.com/upload/images/slideShow/1652196257_3368.jpg?w=1280&h=500',
      //           link: 'https://alaatv.com/landing/15',
      //           order: 0,
      //           ratio: 2.56
      //         },
      //         {
      //           id: 97,
      //           title: 'مدرسه آنلاین آلاء',
      //           body: null,
      //           photo: 'https://nodes.alaatv.com/upload/images/slideShow/1642417634_2227.jpg?w=1280&h=500',
      //           link: '',
      //           order: 3,
      //           ratio: 2.56
      //         }
      //       ],
      //       updated_at: '2021-06-24 05:27:45'
      //     },
      //     {
      //       id: 325,
      //       title: 'جمع بندی جامع + سطح بالا ویژه کنکور 1401.',
      //       offer: false,
      //       url: {
      //         web: 'https://alaatv.com/landing/15',
      //         api: 'https://alaatv.com/landing/15'
      //       },
      //       order: 1,
      //       contents: null,
      //       sets: null,
      //       products: [
      //         {
      //           id: 705,
      //           redirect_url: null,
      //           title: 'جمع بندی کنکور آرش+تایتان پک اختصاصی تجربی آلاء',
      //           price: {
      //             base: 5780000,
      //             discount: 3468000,
      //             final: 2312000
      //           },
      //           url: {
      //             web: 'http://127.0.0.1/product/705',
      //             api: 'http://127.0.0.1/api/v2/product/705'
      //           },
      //           photo: 'https://nodes.alaatv.com/upload/images/product/p2_20220501124054.jpg',
      //           redirect_code: null
      //         },
      //         {
      //           id: 706,
      //           redirect_url: null,
      //           title: 'جمع بندی کنکور آرش+تایتان پک اختصاصی ریاضی آلاء',
      //           price: {
      //             base: 5780000,
      //             discount: 3468000,
      //             final: 2312000
      //           },
      //           url: {
      //             web: 'http://127.0.0.1/product/706',
      //             api: 'http://127.0.0.1/api/v2/product/706'
      //           },
      //           photo: 'https://nodes.alaatv.com/upload/images/product/p1_20220501125230.jpg',
      //           redirect_code: null
      //         },
      //         {
      //           id: 710,
      //           redirect_url: null,
      //           title: 'جمع بندی کنکور آرش+تایتان پک عمومی آلاء',
      //           price: {
      //             base: 4400000,
      //             discount: 2640000,
      //             final: 1760000
      //           },
      //           url: {
      //             web: 'http://127.0.0.1/product/710',
      //             api: 'http://127.0.0.1/api/v2/product/710'
      //           },
      //           photo: 'https://nodes.alaatv.com/upload/images/product/p3_20220501125743.jpg',
      //           redirect_code: null
      //         },
      //         {
      //           id: 556,
      //           redirect_url: null,
      //           title: 'پک کامل جمع بندی دروس تخصصی همایش آرش رشته تجربی',
      //           price: {
      //             base: 3020000,
      //             discount: 1510000,
      //             final: 1510000
      //           },
      //           url: {
      //             web: 'http://127.0.0.1/product/556',
      //             api: 'http://127.0.0.1/api/v2/product/556'
      //           },
      //           photo: 'https://nodes.alaatv.com/upload/images/product/p2_20220501063345.jpg',
      //           redirect_code: null
      //         },
      //         {
      //           id: 555,
      //           redirect_url: null,
      //           title: 'پک کامل جمع بندی دروس تخصصی همایش آرش رشته ریاضی',
      //           price: {
      //             base: 2320000,
      //             discount: 1160000,
      //             final: 1160000
      //           },
      //           url: {
      //             web: 'http://127.0.0.1/product/555',
      //             api: 'http://127.0.0.1/api/v2/product/555'
      //           },
      //           photo: 'https://nodes.alaatv.com/upload/images/product/p1_20220501063328.jpg',
      //           redirect_code: null
      //         },
      //         {
      //           id: 708,
      //           redirect_url: null,
      //           title: 'پک کامل اختصاصی تجربی همایش تایتان',
      //           price: {
      //             base: 2760000,
      //             discount: 828000,
      //             final: 1932000
      //           },
      //           url: {
      //             web: 'http://127.0.0.1/product/708',
      //             api: 'http://127.0.0.1/api/v2/product/708'
      //           },
      //           photo: 'https://nodes.alaatv.com/upload/images/product/p2_20220501125928.jpg',
      //           redirect_code: null
      //         },
      //         {
      //           id: 709,
      //           redirect_url: null,
      //           title: 'پک کامل اختصاصی ریاضی همایش تایتان',
      //           price: {
      //             base: 2760000,
      //             discount: 828000,
      //             final: 1932000
      //           },
      //           url: {
      //             web: 'http://127.0.0.1/product/709',
      //             api: 'http://127.0.0.1/api/v2/product/709'
      //           },
      //           photo: 'https://nodes.alaatv.com/upload/images/product/p1_20220501130247.jpg',
      //           redirect_code: null
      //         },
      //         {
      //           id: 707,
      //           redirect_url: null,
      //           title: 'پک کامل عمومی همایش تایتان',
      //           price: {
      //             base: 2200000,
      //             discount: 660000,
      //             final: 1540000
      //           },
      //           url: {
      //             web: 'http://127.0.0.1/product/707',
      //             api: 'http://127.0.0.1/api/v2/product/707'
      //           },
      //           photo: 'https://nodes.alaatv.com/upload/images/product/p3_20220501125519.jpg',
      //           redirect_code: null
      //         }
      //       ],
      //       banners: null,
      //       updated_at: '2022-05-11 04:08:02'
      //     },
      //     {
      //       id: 221,
      //       title: 'ستارگان عدالت آموزشی آلاء - کنکور 1400',
      //       offer: false,
      //       url: {
      //         web: 'https://alaatv.com/set/1257',
      //         api: 'https://alaatv.com/set/1257'
      //       },
      //       order: 2,
      //       contents: [
      //         {
      //           id: 29524,
      //           redirect_url: null,
      //           type: 8,
      //           section: null,
      //           title: 'جلسه معرفی',
      //           duration: 79,
      //           photo: 'https://nodes.alaatv.com/media/thumbnails/1257/1257000alaa.jpg',
      //           is_free: 1,
      //           order: 0,
      //           updated_at: '2021-11-20 11:14:33',
      //           url: {
      //             web: 'http://127.0.0.1/c/29524',
      //             api: 'http://127.0.0.1/api/v2/c/29524'
      //           },
      //           redirect_code: null
      //         },
      //         {
      //           id: 29525,
      //           redirect_url: null,
      //           type: 8,
      //           section: null,
      //           title: 'مصاحبه با رتبه های برتر آلاء کنکور 1400- بابک رسولی رتبه 15 منطقه 2 تجربی',
      //           duration: 2909,
      //           photo: 'https://nodes.alaatv.com/media/thumbnails/1257/1257001hala.jpg',
      //           is_free: 1,
      //           order: 1,
      //           updated_at: '2021-11-20 11:14:33',
      //           url: {
      //             web: 'http://127.0.0.1/c/29525',
      //             api: 'http://127.0.0.1/api/v2/c/29525'
      //           },
      //           redirect_code: null
      //         },
      //         {
      //           id: 29527,
      //           redirect_url: null,
      //           type: 8,
      //           section: null,
      //           title: 'مصاحبه با رتبه های برتر آلاء کنکور 1400- متین جوکار رتبه 18 منطقه 3 ریاضی (قسمت اول)',
      //           duration: 2392,
      //           photo: 'https://nodes.alaatv.com/media/thumbnails/1257/1257003baba.jpg',
      //           is_free: 1,
      //           order: 2,
      //           updated_at: '2021-11-20 11:14:33',
      //           url: {
      //             web: 'http://127.0.0.1/c/29527',
      //             api: 'http://127.0.0.1/api/v2/c/29527'
      //           },
      //           redirect_code: null
      //         },
      //         {
      //           id: 29935,
      //           redirect_url: null,
      //           type: 8,
      //           section: null,
      //           title: 'مصاحبه با رتبه برتر های آلاء کنکور 1400- امیر ارسلان نقدعلی رتبه 26 منطقه 2 رشته تجربی(قسمت اول)',
      //           duration: 1580,
      //           photo: 'https://nodes.alaatv.com/media/thumbnails/1257/1257004jfuj.jpg',
      //           is_free: 1,
      //           order: 4,
      //           updated_at: '2021-11-20 11:14:40',
      //           url: {
      //             web: 'http://127.0.0.1/c/29935',
      //             api: 'http://127.0.0.1/api/v2/c/29935'
      //           },
      //           redirect_code: null
      //         },
      //         {
      //           id: 29531,
      //           redirect_url: null,
      //           type: 8,
      //           section: null,
      //           title: 'مصاحبه با رتبه های برتر آلاء کنکور 1400- محمد مهدی شکیبایی رتبه 30 منطقه 2 تجربی',
      //           duration: 3008,
      //           photo: 'https://nodes.alaatv.com/media/thumbnails/1257/1257007jaro.jpg',
      //           is_free: 1,
      //           order: 6,
      //           updated_at: '2021-11-20 11:14:33',
      //           url: {
      //             web: 'http://127.0.0.1/c/29531',
      //             api: 'http://127.0.0.1/api/v2/c/29531'
      //           },
      //           redirect_code: null
      //         },
      //         {
      //           id: 29676,
      //           redirect_url: null,
      //           type: 8,
      //           section: null,
      //           title: 'مصاحبه با رتبه های برتر آلاء کنکور 1400- امیر حسین کاظمی رتبه 34 منطقه 2 تجربی',
      //           duration: 2422,
      //           photo: 'https://nodes.alaatv.com/media/thumbnails/1257/1257007mori.jpg',
      //           is_free: 1,
      //           order: 7,
      //           updated_at: '2021-11-20 11:14:36',
      //           url: {
      //             web: 'http://127.0.0.1/c/29676',
      //             api: 'http://127.0.0.1/api/v2/c/29676'
      //           },
      //           redirect_code: null
      //         },
      //         {
      //           id: 29526,
      //           redirect_url: null,
      //           type: 8,
      //           section: null,
      //           title: 'مصاحبه با رتبه های برتر آلاء کنکور 1400- بهزاد حیدری رتبه 79 منطقه 2 تجربی',
      //           duration: 2355,
      //           photo: 'https://nodes.alaatv.com/media/thumbnails/1257/1257002dada.jpg',
      //           is_free: 1,
      //           order: 8,
      //           updated_at: '2021-11-20 11:14:33',
      //           url: {
      //             web: 'http://127.0.0.1/c/29526',
      //             api: 'http://127.0.0.1/api/v2/c/29526'
      //           },
      //           redirect_code: null
      //         },
      //         {
      //           id: 29937,
      //           redirect_url: null,
      //           type: 8,
      //           section: null,
      //           title: 'مصاحبه با رتبه های برتر آلاء کنکور 1400- محبوبه خطائی رتبه 80 منطقه 1 رشته علوم انسانی',
      //           duration: 2324,
      //           photo: 'https://nodes.alaatv.com/media/thumbnails/1257/1257009ujyh.jpg',
      //           is_free: 1,
      //           order: 9,
      //           updated_at: '2021-11-20 11:14:40',
      //           url: {
      //             web: 'http://127.0.0.1/c/29937',
      //             api: 'http://127.0.0.1/api/v2/c/29937'
      //           },
      //           redirect_code: null
      //         },
      //         {
      //           id: 29677,
      //           redirect_url: null,
      //           type: 8,
      //           section: null,
      //           title: 'مصاحبه با رتبه های برتر آلاء کنکور 1400- مهدی فتاحی رتبه 99 منطقه 2 ریاضی (قسمت اول)',
      //           duration: 1843,
      //           photo: 'https://nodes.alaatv.com/media/thumbnails/1257/1257008zizo.jpg',
      //           is_free: 1,
      //           order: 10,
      //           updated_at: '2021-11-20 11:14:36',
      //           url: {
      //             web: 'http://127.0.0.1/c/29677',
      //             api: 'http://127.0.0.1/api/v2/c/29677'
      //           },
      //           redirect_code: null
      //         },
      //         {
      //           id: 29529,
      //           redirect_url: null,
      //           type: 8,
      //           section: null,
      //           title: 'مصاحبه با رتبه های برتر آلاء کنکور 1400- پارسا سعادتمند رتبه 107 منطقه 2 ریاضی (قسمت اول)',
      //           duration: 1704,
      //           photo: 'https://nodes.alaatv.com/media/thumbnails/1257/1257005kara.jpg',
      //           is_free: 1,
      //           order: 12,
      //           updated_at: '2021-11-20 11:14:33',
      //           url: {
      //             web: 'http://127.0.0.1/c/29529',
      //             api: 'http://127.0.0.1/api/v2/c/29529'
      //           },
      //           redirect_code: null
      //         }
      //       ],
      //       sets: null,
      //       products: null,
      //       banners: null,
      //       updated_at: '2022-02-14 07:59:47'
      //     },
      //     {
      //       id: 171,
      //       title: 'متوسطه اول',
      //       offer: false,
      //       url: {
      //         web: 'http://alaatv.test/c?tags[0]=متوسطه1',
      //         api: 'http://alaatv.test/api/v2/search?tags[0]=متوسطه1'
      //       },
      //       order: 3,
      //       contents: null,
      //       sets: [
      //         {
      //           id: 1013,
      //           redirect_url: null,
      //           title: 'خط به خط ریاضی هشتم (نظام آموزشی جدید) - وحید قلیچ خانی',
      //           short_title: 'خط به خط ریاضی هشتم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/riazi8_kh_set2_20210107115047.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/1013',
      //             api: 'http://127.0.0.1/api/v2/set/1013'
      //           },
      //           contents_count: 99,
      //           author: null,
      //           contents: null,
      //           created_at: '2020-12-27 03:56:17',
      //           updated_at: '2022-01-26 05:29:10',
      //           redirect_code: null
      //         },
      //         {
      //           id: 1047,
      //           redirect_url: null,
      //           title: 'خط به خط ادبیات هفتم (نظام آموزشی جدید) - رضا اسکندری',
      //           short_title: 'خط به خط ادبیات هفتم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/adabiat7_kh_set_20210315122639.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/1047',
      //             api: 'http://127.0.0.1/api/v2/set/1047'
      //           },
      //           contents_count: 25,
      //           author: null,
      //           contents: null,
      //           created_at: '2021-03-02 05:53:35',
      //           updated_at: '2022-01-26 05:30:14',
      //           redirect_code: null
      //         },
      //         {
      //           id: 1042,
      //           redirect_url: null,
      //           title: 'خط به خط ریاضی هفتم (نظام آموزشی جدید) - رضا موحد',
      //           short_title: 'خط به خط ریاضی هفتم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/riazi7_kh_set_20210221094207.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/1042',
      //             api: 'http://127.0.0.1/api/v2/set/1042'
      //           },
      //           contents_count: 55,
      //           author: null,
      //           contents: null,
      //           created_at: '2021-02-11 04:26:32',
      //           updated_at: '2022-01-26 05:29:55',
      //           redirect_code: null
      //         },
      //         {
      //           id: 949,
      //           redirect_url: null,
      //           title: 'خط به خط ریاضی هشتم (نظام آموزشی جدید) - سعید تودویی',
      //           short_title: 'خط به خط ریاضی هشتم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/riazi8_kh_set_20200920132629.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/949',
      //             api: 'http://127.0.0.1/api/v2/set/949'
      //           },
      //           contents_count: 35,
      //           author: null,
      //           contents: null,
      //           created_at: '2020-08-11 10:37:10',
      //           updated_at: '2022-01-26 05:13:00',
      //           redirect_code: null
      //         },
      //         {
      //           id: 969,
      //           redirect_url: null,
      //           title: 'خط به خط ریاضی نهم (نظام آموزشی جدید) - وحید قلیچ خانی',
      //           short_title: 'خط به خط ریاضی نهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/riazi9_kh_set_20200920132601.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/969',
      //             api: 'http://127.0.0.1/api/v2/set/969'
      //           },
      //           contents_count: 113,
      //           author: null,
      //           contents: null,
      //           created_at: '2020-09-19 10:14:30',
      //           updated_at: '2022-01-26 05:16:33',
      //           redirect_code: null
      //         },
      //         {
      //           id: 947,
      //           redirect_url: null,
      //           title: 'خط به خط هندسه هشتم (نظام آموزشی جدید) - هادی ادب',
      //           short_title: 'خط به خط هندسه هشتم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/hendese8_kh_set_20200909131858.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/947',
      //             api: 'http://127.0.0.1/api/v2/set/947'
      //           },
      //           contents_count: 16,
      //           author: null,
      //           contents: null,
      //           created_at: '2020-08-11 03:50:32',
      //           updated_at: '2022-01-26 05:12:18',
      //           redirect_code: null
      //         }
      //       ],
      //       products: null,
      //       banners: null,
      //       updated_at: '2021-05-15 08:55:49'
      //     },
      //     {
      //       id: 1,
      //       title: 'کنکور نظام جدید',
      //       offer: false,
      //       url: {
      //         web: 'http://alaatv.test/c?tags[0]=نظام_آموزشی_جدید&tags[1]=کنکور',
      //         api: 'http://alaatv.test/api/v2/search?tags[0]=نظام_آموزشی_جدید&tags[1]=کنکور'
      //       },
      //       order: 4,
      //       contents: null,
      //       sets: [
      //         {
      //           id: 1374,
      //           redirect_url: null,
      //           title: 'صفر تا صد فیزیک دوازدهم کنکور - محمدرضا یاری',
      //           short_title: 'صفر تا صد فیزیک دوازدهم کنکور',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/sf0t100_1374_9408953.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/1374',
      //             api: 'http://127.0.0.1/api/v2/set/1374'
      //           },
      //           contents_count: 95,
      //           author: null,
      //           contents: null,
      //           created_at: '2021-10-23 05:03:16',
      //           updated_at: '2022-01-26 06:16:43',
      //           redirect_code: null
      //         },
      //         {
      //           id: 1287,
      //           redirect_url: null,
      //           title: 'صفر تا صد شیمی دوازدهم - محسن معینی',
      //           short_title: 'صفر تا صد شیمی دوازدهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/sf0t100_1287_3266148.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/1287',
      //             api: 'http://127.0.0.1/api/v2/set/1287'
      //           },
      //           contents_count: 55,
      //           author: null,
      //           contents: null,
      //           created_at: '2021-09-25 07:32:19',
      //           updated_at: '2022-01-26 06:10:54',
      //           redirect_code: null
      //         },
      //         {
      //           id: 769,
      //           redirect_url: null,
      //           title: 'کارگاه نکته و تست عربی دوازدهم (نظام آموزشی جدید) - پدرام علیمرادی',
      //           short_title: 'کارگاه نکته و تست عربی دوازدهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/arabi12 nt 0-100 set_20200818112231.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/769',
      //             api: 'http://127.0.0.1/api/v2/set/769'
      //           },
      //           contents_count: 6,
      //           author: null,
      //           contents: null,
      //           created_at: '2020-02-27 04:51:49',
      //           updated_at: '2022-01-26 04:44:32',
      //           redirect_code: null
      //         },
      //         {
      //           id: 1286,
      //           redirect_url: null,
      //           title: 'صفر تا صد گسسته دوازدهم - آژنگ نوید',
      //           short_title: 'صفر تا صد گسسته دوازدهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1639639330_9354.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/1286',
      //             api: 'http://127.0.0.1/api/v2/set/1286'
      //           },
      //           contents_count: 66,
      //           author: null,
      //           contents: null,
      //           created_at: '2021-09-22 13:00:14',
      //           updated_at: '2022-01-26 06:10:46',
      //           redirect_code: null
      //         },
      //         {
      //           id: 1390,
      //           redirect_url: null,
      //           title: 'صفر تا صد زیست شناسی دوازدهم - حسین ذبحی تفت',
      //           short_title: 'صفر تا صد زیست شناسی دوازدهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1639639252_1785.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/1390',
      //             api: 'http://127.0.0.1/api/v2/set/1390'
      //           },
      //           contents_count: 97,
      //           author: null,
      //           contents: null,
      //           created_at: '2021-11-15 06:38:02',
      //           updated_at: '2022-01-26 06:17:09',
      //           redirect_code: null
      //         },
      //         {
      //           id: 770,
      //           redirect_url: null,
      //           title: 'فیزیک دوازدهم (نظام آموزشی جدید) - حمید فدایی فرد',
      //           short_title: 'فیزیک دوازدهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/fizik12 0-100 set_20200818112158.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/770',
      //             api: 'http://127.0.0.1/api/v2/set/770'
      //           },
      //           contents_count: 25,
      //           author: null,
      //           contents: null,
      //           created_at: '2020-02-27 12:12:37',
      //           updated_at: '2022-01-26 04:44:51',
      //           redirect_code: null
      //         },
      //         {
      //           id: 1216,
      //           redirect_url: null,
      //           title: 'صفر تا صد فیزیک دوازدهم (نظام آموزشی جدید) - شهرام رضوی',
      //           short_title: 'صفر تا صد فیزیک دوازدهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/sf0t100_1216_4583864.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/1216',
      //             api: 'http://127.0.0.1/api/v2/set/1216'
      //           },
      //           contents_count: 67,
      //           author: null,
      //           contents: null,
      //           created_at: '2021-06-27 06:03:46',
      //           updated_at: '2022-01-26 06:04:05',
      //           redirect_code: null
      //         },
      //         {
      //           id: 837,
      //           redirect_url: null,
      //           title: 'مثلثات ریاضی تجربی-پورسعید',
      //           short_title: 'صفر تا صد ریاضی تجربی-مثلثات',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/riazi t k3 0-100 m set_20200810132858.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/837',
      //             api: 'http://127.0.0.1/api/v2/set/837'
      //           },
      //           contents_count: 13,
      //           author: null,
      //           contents: null,
      //           created_at: '2020-06-13 08:51:27',
      //           updated_at: '2021-08-07 12:18:30',
      //           redirect_code: null
      //         },
      //         {
      //           id: 842,
      //           redirect_url: null,
      //           title: 'مشتق ریاضی تجربی-نباخته',
      //           short_title: 'صفر تا صد ریاضی تجربی-مشتق',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/riazi t k3 0-100 mshtq set_20200824113354.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/842',
      //             api: 'http://127.0.0.1/api/v2/set/842'
      //           },
      //           contents_count: 11,
      //           author: null,
      //           contents: null,
      //           created_at: '2020-06-13 08:55:37',
      //           updated_at: '2021-08-07 12:18:30',
      //           redirect_code: null
      //         },
      //         {
      //           id: 641,
      //           redirect_url: null,
      //           title: 'کارگاه نکته و تست‌ فیزیک دوازدهم (نظام آموزشی جدید) - پرویز کازرانیان',
      //           short_title: 'کارگاه نکته و تست فیزیک دوازدهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/fizik12 nt 0-100 set_20200818112416.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/641',
      //             api: 'http://127.0.0.1/api/v2/set/641'
      //           },
      //           contents_count: 73,
      //           author: null,
      //           contents: null,
      //           created_at: '2019-10-05 10:33:42',
      //           updated_at: '2022-01-26 04:11:23',
      //           redirect_code: null
      //         },
      //         {
      //           id: 580,
      //           redirect_url: null,
      //           title: 'کارگاه نکته و تست زیست شناسی کنکور (نظام آموزشی جدید) محمد علی امینی راد',
      //           short_title: 'کارگاه نکته و تست زیست کنکور',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/zist k nt 0-100 set_20200818112914.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/580',
      //             api: 'http://127.0.0.1/api/v2/set/580'
      //           },
      //           contents_count: 89,
      //           author: null,
      //           contents: null,
      //           created_at: '2019-07-23 06:43:58',
      //           updated_at: '2022-01-26 04:16:37',
      //           redirect_code: null
      //         },
      //         {
      //           id: 588,
      //           redirect_url: null,
      //           title: 'کارگاه نکته و تست حسابان کنکور (نظام آموزشی جدید)  محمد صادق ثابتی',
      //           short_title: 'کارگاه نکته و تست حسابان کنکور',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/hesaban k nt 0-100 set_20200818112700.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/588',
      //             api: 'http://127.0.0.1/api/v2/set/588'
      //           },
      //           contents_count: 61,
      //           author: null,
      //           contents: null,
      //           created_at: '2019-08-06 09:37:52',
      //           updated_at: '2022-01-26 04:17:26',
      //           redirect_code: null
      //         },
      //         {
      //           id: 555,
      //           redirect_url: null,
      //           title: 'صفر تا صد ادبیات فارسی دوازدهم (نظام آموزشی جدید) محمد صادقی',
      //           short_title: 'صفر تا صد ادبیات دوازدهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/adabiat12 0-100 set_20200818113319.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/555',
      //             api: 'http://127.0.0.1/api/v2/set/555'
      //           },
      //           contents_count: 51,
      //           author: null,
      //           contents: null,
      //           created_at: '2019-07-18 08:53:25',
      //           updated_at: '2022-01-26 04:14:09',
      //           redirect_code: null
      //         }
      //       ],
      //       products: null,
      //       banners: null,
      //       updated_at: '2019-10-01 14:07:33'
      //     },
      //     {
      //       id: 178,
      //       title: 'راه ابریشم آلا، شاهراه کنکور 1401',
      //       offer: false,
      //       url: {
      //         web: 'https://alaatv.com/landing/25',
      //         api: 'https://alaatv.com/landing/25'
      //       },
      //       order: 5,
      //       contents: null,
      //       sets: null,
      //       products: [
      //         {
      //           id: 445,
      //           redirect_url: null,
      //           title: 'پک اختصاصی راه ابریشم رشته تجربی آلاء',
      //           price: {
      //             base: 6720000,
      //             discount: 0,
      //             final: 6720000
      //           },
      //           url: {
      //             web: 'http://127.0.0.1/product/445',
      //             api: 'http://127.0.0.1/api/v2/product/445'
      //           },
      //           photo: 'https://nodes.alaatv.com/upload/images/product/12 copy 2-100_20210624102055.jpg',
      //           redirect_code: null
      //         },
      //         {
      //           id: 446,
      //           redirect_url: null,
      //           title: 'پک اختصاصی راه ابریشم رشته ریاضی آلاء',
      //           price: {
      //             base: 5160000,
      //             discount: 0,
      //             final: 5160000
      //           },
      //           url: {
      //             web: 'http://127.0.0.1/product/446',
      //             api: 'http://127.0.0.1/api/v2/product/446'
      //           },
      //           photo: 'https://nodes.alaatv.com/upload/images/product/12 copy 3-100_20210624102110.jpg',
      //           redirect_code: null
      //         },
      //         {
      //           id: 573,
      //           redirect_url: null,
      //           title: 'پک راه ابریشم عمومی آلاء',
      //           price: {
      //             base: 3720000,
      //             discount: 0,
      //             final: 3720000
      //           },
      //           url: {
      //             web: 'http://127.0.0.1/product/573',
      //             api: 'http://127.0.0.1/api/v2/product/573'
      //           },
      //           photo: 'https://nodes.alaatv.com/upload/images/product/12 copy-100_20210623122401.jpg',
      //           redirect_code: null
      //         },
      //         {
      //           id: 441,
      //           redirect_url: null,
      //           title: 'راه ابریشم فیزیک آلاء',
      //           price: {
      //             base: 1560000,
      //             discount: 0,
      //             final: 1560000
      //           },
      //           url: {
      //             web: 'http://127.0.0.1/product/441',
      //             api: 'http://127.0.0.1/api/v2/product/441'
      //           },
      //           photo: 'https://nodes.alaatv.com/upload/images/product/04-100_20210623122601.jpg',
      //           redirect_code: null
      //         },
      //         {
      //           id: 442,
      //           redirect_url: null,
      //           title: 'راه ابریشم زیست شناسی آلاء',
      //           price: {
      //             base: 2040000,
      //             discount: 0,
      //             final: 2040000
      //           },
      //           url: {
      //             web: 'http://127.0.0.1/product/442',
      //             api: 'http://127.0.0.1/api/v2/product/442'
      //           },
      //           photo: 'https://nodes.alaatv.com/upload/images/product/06-100_20210623122556.jpg',
      //           redirect_code: null
      //         },
      //         {
      //           id: 439,
      //           redirect_url: null,
      //           title: 'راه ابریشم ریاضیات ریاضی آلاء',
      //           price: {
      //             base: 2040000,
      //             discount: 0,
      //             final: 2040000
      //           },
      //           url: {
      //             web: 'http://127.0.0.1/product/439',
      //             api: 'http://127.0.0.1/api/v2/product/439'
      //           },
      //           photo: 'https://nodes.alaatv.com/upload/images/product/01-100_20210623122610.jpg',
      //           redirect_code: null
      //         },
      //         {
      //           id: 443,
      //           redirect_url: null,
      //           title: 'راه ابریشم شیمی آلاء',
      //           price: {
      //             base: 1560000,
      //             discount: 0,
      //             final: 1560000
      //           },
      //           url: {
      //             web: 'http://127.0.0.1/product/443',
      //             api: 'http://127.0.0.1/api/v2/product/443'
      //           },
      //           photo: 'https://nodes.alaatv.com/upload/images/product/05-100_20210623122552.jpg',
      //           redirect_code: null
      //         },
      //         {
      //           id: 440,
      //           redirect_url: null,
      //           title: 'راه ابریشم فیزیک آلاء',
      //           price: {
      //             base: 1560000,
      //             discount: 0,
      //             final: 1560000
      //           },
      //           url: {
      //             web: 'http://127.0.0.1/product/440',
      //             api: 'http://127.0.0.1/api/v2/product/440'
      //           },
      //           photo: 'https://nodes.alaatv.com/upload/images/product/03-100_20210623122605.jpg',
      //           redirect_code: null
      //         },
      //         {
      //           id: 347,
      //           redirect_url: null,
      //           title: 'راه ابریشم ریاضی تجربی آلاء',
      //           price: {
      //             base: 1560000,
      //             discount: 0,
      //             final: 1560000
      //           },
      //           url: {
      //             web: 'http://127.0.0.1/product/347',
      //             api: 'http://127.0.0.1/api/v2/product/347'
      //           },
      //           photo: 'https://nodes.alaatv.com/upload/images/product/02-100_20210623122615.jpg',
      //           redirect_code: null
      //         },
      //         {
      //           id: 572,
      //           redirect_url: null,
      //           title: 'راه ابریشم ادبیات آلاء',
      //           price: {
      //             base: 930000,
      //             discount: 0,
      //             final: 930000
      //           },
      //           url: {
      //             web: 'http://127.0.0.1/product/572',
      //             api: 'http://127.0.0.1/api/v2/product/572'
      //           },
      //           photo: 'https://nodes.alaatv.com/upload/images/product/07-100_20210623122526.jpg',
      //           redirect_code: null
      //         },
      //         {
      //           id: 571,
      //           redirect_url: null,
      //           title: 'راه ابریشم عربی آلاء',
      //           price: {
      //             base: 930000,
      //             discount: 0,
      //             final: 930000
      //           },
      //           url: {
      //             web: 'http://127.0.0.1/product/571',
      //             api: 'http://127.0.0.1/api/v2/product/571'
      //           },
      //           photo: 'https://nodes.alaatv.com/upload/images/product/09-100_20210623122530.jpg',
      //           redirect_code: null
      //         },
      //         {
      //           id: 570,
      //           redirect_url: null,
      //           title: 'راه ابریشم دین و زندگی آلاء',
      //           price: {
      //             base: 930000,
      //             discount: 0,
      //             final: 930000
      //           },
      //           url: {
      //             web: 'http://127.0.0.1/product/570',
      //             api: 'http://127.0.0.1/api/v2/product/570'
      //           },
      //           photo: 'https://nodes.alaatv.com/upload/images/product/08-100_20210623122534.jpg',
      //           redirect_code: null
      //         },
      //         {
      //           id: 569,
      //           redirect_url: null,
      //           title: 'راه ابریشم زبان انگلیسی آلاء',
      //           price: {
      //             base: 930000,
      //             discount: 0,
      //             final: 930000
      //           },
      //           url: {
      //             web: 'http://127.0.0.1/product/569',
      //             api: 'http://127.0.0.1/api/v2/product/569'
      //           },
      //           photo: 'https://nodes.alaatv.com/upload/images/product/10-100_20210623122539.jpg',
      //           redirect_code: null
      //         }
      //       ],
      //       banners: null,
      //       updated_at: '2022-04-21 08:07:32'
      //     },
      //     {
      //       id: 3,
      //       title: 'پایه یازدهم',
      //       offer: false,
      //       url: {
      //         web: 'http://alaatv.test/c?tags[0]=یازدهم',
      //         api: 'http://alaatv.test/api/v2/search?tags[0]=یازدهم'
      //       },
      //       order: 6,
      //       contents: null,
      //       sets: [
      //         {
      //           id: 1004,
      //           redirect_url: null,
      //           title: 'صفر تا صد شیمی یازدهم (نظام آموزشی جدید) - احسان گودرزی',
      //           short_title: 'صفر تا صد شیمی یازدهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/shimi11_0100_set3_20201203091141.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/1004',
      //             api: 'http://127.0.0.1/api/v2/set/1004'
      //           },
      //           contents_count: 51,
      //           author: null,
      //           contents: null,
      //           created_at: '2020-12-02 09:41:01',
      //           updated_at: '2022-01-26 09:10:35',
      //           redirect_code: null
      //         },
      //         {
      //           id: 957,
      //           redirect_url: null,
      //           title: 'صفر تا صد فیزیک یازدهم (نظام آموزشی جدید) - محمد رضا یاری',
      //           short_title: 'صفر تا صد فیزیک یازدهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/fizik11_0100_set2_20200909062115.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/957',
      //             api: 'http://127.0.0.1/api/v2/set/957'
      //           },
      //           contents_count: 98,
      //           author: null,
      //           contents: null,
      //           created_at: '2020-09-02 02:23:15',
      //           updated_at: '2022-01-26 05:14:51',
      //           redirect_code: null
      //         },
      //         {
      //           id: 1352,
      //           redirect_url: null,
      //           title: 'صفر تا صد ریاضی تجربی یازدهم - علی صدری',
      //           short_title: 'صفر تا صد ریاضی تجربی یازدهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/sf0t100_1352_6437449.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/1352',
      //             api: 'http://127.0.0.1/api/v2/set/1352'
      //           },
      //           contents_count: 68,
      //           author: null,
      //           contents: null,
      //           created_at: '2021-10-02 08:33:10',
      //           updated_at: '2022-01-26 06:12:57',
      //           redirect_code: null
      //         },
      //         {
      //           id: 948,
      //           redirect_url: null,
      //           title: 'صفر تا صد زیست شناسی یازدهم (نظام آموزشی جدید) - حسین ذبحی تفت',
      //           short_title: 'صفر تا صد زیست شناسی یازدهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/zist11_0100_set2_20200909131847.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/948',
      //             api: 'http://127.0.0.1/api/v2/set/948'
      //           },
      //           contents_count: 79,
      //           author: null,
      //           contents: null,
      //           created_at: '2020-08-11 05:54:31',
      //           updated_at: '2022-01-26 05:12:28',
      //           redirect_code: null
      //         },
      //         {
      //           id: 1110,
      //           redirect_url: null,
      //           title: 'صفر تا صد جغرافیا یازدهم (نظام آموزشی جدید) (01-00) حسن رعنایی',
      //           short_title: 'صفر تا صد جغرافیا یازدهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/sf0t100_1110_6827300.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/1110',
      //             api: 'http://127.0.0.1/api/v2/set/1110'
      //           },
      //           contents_count: 6,
      //           author: null,
      //           contents: null,
      //           created_at: '2021-05-08 08:54:15',
      //           updated_at: '2021-10-26 06:51:54',
      //           redirect_code: null
      //         },
      //         {
      //           id: 1356,
      //           redirect_url: null,
      //           title: 'صفر تا صد حسابان یازدهم - علی صدری',
      //           short_title: 'صفر تا صد حسابان یازدهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/sf0t100_1356_7835340.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/1356',
      //             api: 'http://127.0.0.1/api/v2/set/1356'
      //           },
      //           contents_count: 75,
      //           author: null,
      //           contents: null,
      //           created_at: '2021-10-03 10:28:47',
      //           updated_at: '2022-01-26 06:14:03',
      //           redirect_code: null
      //         },
      //         {
      //           id: 959,
      //           redirect_url: null,
      //           title: 'صفر تا صد عربی انسانی یازدهم (نظام آموزشی جدید) - پدرام علیمرادی',
      //           short_title: 'صفر تا صد عربی انسانی یازدهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/arabi11_0100_set3_20200907125948.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/959',
      //             api: 'http://127.0.0.1/api/v2/set/959'
      //           },
      //           contents_count: 15,
      //           author: null,
      //           contents: null,
      //           created_at: '2020-09-03 03:24:13',
      //           updated_at: '2022-01-26 05:15:15',
      //           redirect_code: null
      //         },
      //         {
      //           id: 956,
      //           redirect_url: null,
      //           title: 'کارگاه نکته و تست آمار و احتمال یازدهم (نظام آموزشی جدید) - علی صدری',
      //           short_title: 'کارگاه نکته و تست آمار و احتمال یازدهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/amar11_nt_0100_set_20200909090136.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/956',
      //             api: 'http://127.0.0.1/api/v2/set/956'
      //           },
      //           contents_count: 44,
      //           author: null,
      //           contents: null,
      //           created_at: '2020-09-01 05:21:14',
      //           updated_at: '2022-01-26 05:14:28',
      //           redirect_code: null
      //         },
      //         {
      //           id: 954,
      //           redirect_url: null,
      //           title: 'صفر تا صد آمار و احتمال یازدهم (نظام آموزشی جدید) - علی صدری',
      //           short_title: 'صفر تا صد آمار و احتمال یازدهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/amar11_0100_set_20200909090043.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/954',
      //             api: 'http://127.0.0.1/api/v2/set/954'
      //           },
      //           contents_count: 68,
      //           author: null,
      //           contents: null,
      //           created_at: '2020-08-24 23:45:46',
      //           updated_at: '2022-01-26 05:14:03',
      //           redirect_code: null
      //         },
      //         {
      //           id: 605,
      //           redirect_url: null,
      //           title: 'کارگاه نکته و تست کنکور حسابان یازدهم (نظام آموزشی جدید) - محمد صادق ثابتی',
      //           short_title: 'کارگاه نکته و تست حسابان یازدهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/hesaban11 nt 0-100 set_20200818112537.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/605',
      //             api: 'http://127.0.0.1/api/v2/set/605'
      //           },
      //           contents_count: 29,
      //           author: null,
      //           contents: null,
      //           created_at: '2019-09-01 08:35:43',
      //           updated_at: '2022-01-26 04:05:50',
      //           redirect_code: null
      //         },
      //         {
      //           id: 958,
      //           redirect_url: null,
      //           title: 'صفر تا صد عربی یازدهم (نظام آموزشی جدید) - پدرام علیمرادی',
      //           short_title: 'صفر تا صد عربی یازدهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/arabi11_0100_set2_20200907125938.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/958',
      //             api: 'http://127.0.0.1/api/v2/set/958'
      //           },
      //           contents_count: 13,
      //           author: null,
      //           contents: null,
      //           created_at: '2020-09-03 03:23:36',
      //           updated_at: '2022-01-26 05:15:01',
      //           redirect_code: null
      //         },
      //         {
      //           id: 218,
      //           redirect_url: null,
      //           title: 'صفر تا صد زبان انگلیسی یازدهم (نظام آموزشی جدید) - علی اکبر عزتی',
      //           short_title: 'صفر تا صد زبان یازدهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/zaban11 0-100 set_20200818115928.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/218',
      //             api: 'http://127.0.0.1/api/v2/set/218'
      //           },
      //           contents_count: 25,
      //           author: null,
      //           contents: null,
      //           created_at: '2018-10-07 10:04:29',
      //           updated_at: '2022-01-26 03:55:01',
      //           redirect_code: null
      //         },
      //         {
      //           id: 962,
      //           redirect_url: null,
      //           title: 'صفر تا صد هندسه یازدهم (نظام آموزشی جدید) - وحید کبریایی',
      //           short_title: 'صفر تا صد هندسه یازدهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/hendese11_0100_set_20200915113225.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/962',
      //             api: 'http://127.0.0.1/api/v2/set/962'
      //           },
      //           contents_count: 19,
      //           author: null,
      //           contents: null,
      //           created_at: '2020-09-14 07:18:40',
      //           updated_at: '2022-01-26 05:15:42',
      //           redirect_code: null
      //         },
      //         {
      //           id: 970,
      //           redirect_url: null,
      //           title: 'صفر تا صد آمار و احتمال یازدهم (نظام آموزشی جدید) - محمدرضا حسینی فرد',
      //           short_title: 'صفر تا صد آمار و احتمال یازدهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/amar11_0100_set2_20200929073141.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/970',
      //             api: 'http://127.0.0.1/api/v2/set/970'
      //           },
      //           contents_count: 42,
      //           author: null,
      //           contents: null,
      //           created_at: '2020-09-20 15:55:05',
      //           updated_at: '2022-01-26 05:16:50',
      //           redirect_code: null
      //         }
      //       ],
      //       products: null,
      //       banners: null,
      //       updated_at: '2019-10-03 09:56:11'
      //     },
      //     {
      //       id: 4,
      //       title: 'پایه دهم',
      //       offer: false,
      //       url: {
      //         web: 'http://alaatv.test/c?tags[0]=دهم',
      //         api: 'http://alaatv.test/api/v2/search?tags[0]=دهم'
      //       },
      //       order: 8,
      //       contents: null,
      //       sets: [
      //         {
      //           id: 584,
      //           redirect_url: null,
      //           title: 'صفر تا صد فیزیک دهم (نظام آموزشی جدید) محمد رضا یاری',
      //           short_title: 'صفر تا صد فیزیک دهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/fizik10 0-100 set_20200825065237.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/584',
      //             api: 'http://127.0.0.1/api/v2/set/584'
      //           },
      //           contents_count: 177,
      //           author: null,
      //           contents: null,
      //           created_at: '2019-08-01 10:50:11',
      //           updated_at: '2022-01-26 04:17:01',
      //           redirect_code: null
      //         },
      //         {
      //           id: 592,
      //           redirect_url: null,
      //           title: 'صفر تا صد شیمی دهم (نظام آموزشی جدید)  احسان گودرزی',
      //           short_title: 'صفر تا صد شیمی دهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/shimi10 0-100 set2_20200818112635.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/592',
      //             api: 'http://127.0.0.1/api/v2/set/592'
      //           },
      //           contents_count: 125,
      //           author: null,
      //           contents: null,
      //           created_at: '2019-08-11 13:44:10',
      //           updated_at: '2022-01-26 04:17:45',
      //           redirect_code: null
      //         },
      //         {
      //           id: 968,
      //           redirect_url: null,
      //           title: 'صفر تا صد ریاضی دهم (نظام آموزشی جدید) - محمدرضا لکستانی',
      //           short_title: 'صفر تا صد ریاضی دهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/riazi10_0100_set3_20200920132536.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/968',
      //             api: 'http://127.0.0.1/api/v2/set/968'
      //           },
      //           contents_count: 106,
      //           author: null,
      //           contents: null,
      //           created_at: '2020-09-16 16:03:28',
      //           updated_at: '2022-01-26 05:16:17',
      //           redirect_code: null
      //         },
      //         {
      //           id: 1357,
      //           redirect_url: null,
      //           title: 'صفر تا صد ریاضی دهم - مجید صداقت',
      //           short_title: 'صفر تا صد ریاضی دهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/sf0t100_1357_1112865.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/1357',
      //             api: 'http://127.0.0.1/api/v2/set/1357'
      //           },
      //           contents_count: 75,
      //           author: null,
      //           contents: null,
      //           created_at: '2021-10-06 05:54:17',
      //           updated_at: '2022-01-26 06:14:18',
      //           redirect_code: null
      //         },
      //         {
      //           id: 1100,
      //           redirect_url: null,
      //           title: 'صفر تا صد تاریخ دهم (نظام آموزشی جدید) - حسن رعنایی',
      //           short_title: 'صفر تا صد تاریخ دهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/sf0t100_1100_7881553.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/1100',
      //             api: 'http://127.0.0.1/api/v2/set/1100'
      //           },
      //           contents_count: 31,
      //           author: null,
      //           contents: null,
      //           created_at: '2021-05-05 11:48:36',
      //           updated_at: '2022-01-26 05:46:08',
      //           redirect_code: null
      //         },
      //         {
      //           id: 1005,
      //           redirect_url: null,
      //           title: 'صفر تا صد زیست شناسی دهم (نظام آموزشی جدید) - حسین ذبحی تفت',
      //           short_title: 'صفر تا صد زیست شناسی دهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/zist10_0100_set2_20201203091334.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/1005',
      //             api: 'http://127.0.0.1/api/v2/set/1005'
      //           },
      //           contents_count: 77,
      //           author: null,
      //           contents: null,
      //           created_at: '2020-12-02 09:41:29',
      //           updated_at: '2022-01-26 09:10:52',
      //           redirect_code: null
      //         },
      //         {
      //           id: 961,
      //           redirect_url: null,
      //           title: 'صفر تا صد فارسی دهم (نظام آموزشی جدید) - عبدالرضا مرادی',
      //           short_title: 'صفر تا صد فارسی دهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/adabiat10_0100_set_20200909061936.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/961',
      //             api: 'http://127.0.0.1/api/v2/set/961'
      //           },
      //           contents_count: 31,
      //           author: null,
      //           contents: null,
      //           created_at: '2020-09-08 06:32:43',
      //           updated_at: '2022-01-26 05:15:35',
      //           redirect_code: null
      //         },
      //         {
      //           id: 570,
      //           redirect_url: null,
      //           title: 'کارگاه نکته و تست فیزیک دهم (نظام آموزشی جدید)  پرویز کازرانیان',
      //           short_title: 'کارگاه نکته و تست فیزیک دهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/fizik10 nt 0-100 set_20200818113126.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/570',
      //             api: 'http://127.0.0.1/api/v2/set/570'
      //           },
      //           contents_count: 67,
      //           author: null,
      //           contents: null,
      //           created_at: '2019-07-21 03:40:05',
      //           updated_at: '2022-01-26 04:15:40',
      //           redirect_code: null
      //         },
      //         {
      //           id: 953,
      //           redirect_url: null,
      //           title: 'صفر تا صد عربی انسانی دهم (نظام آموزشی جدید) - پدرام علیمرادی',
      //           short_title: 'صفر تا صد عربی انسانی دهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/arabi e1000100 set2_20200906115003.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/953',
      //             api: 'http://127.0.0.1/api/v2/set/953'
      //           },
      //           contents_count: 17,
      //           author: null,
      //           contents: null,
      //           created_at: '2020-08-24 06:36:05',
      //           updated_at: '2022-01-26 05:13:52',
      //           redirect_code: null
      //         },
      //         {
      //           id: 190,
      //           redirect_url: null,
      //           title: 'صفر تا صد ریاضی دهم (نظام آموزشی جدید) - مهدی امینی راد',
      //           short_title: 'صفر تا صد ریاضی دهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/riazi10 0-100 set2_20200818121112.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/190',
      //             api: 'http://127.0.0.1/api/v2/set/190'
      //           },
      //           contents_count: 28,
      //           author: null,
      //           contents: null,
      //           created_at: '2017-06-28 14:09:00',
      //           updated_at: '2022-01-26 04:02:43',
      //           redirect_code: null
      //         },
      //         {
      //           id: 177,
      //           redirect_url: null,
      //           title: 'صفر تا صد زیست شناسی دهم (نظام آموزشی جدید) - جلال موقاری',
      //           short_title: 'صفر تا صد زیست دهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/zist10 0-100 set_20200818121043.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/177',
      //             api: 'http://127.0.0.1/api/v2/set/177'
      //           },
      //           contents_count: 83,
      //           author: null,
      //           contents: null,
      //           created_at: '2017-06-15 14:09:00',
      //           updated_at: '2022-01-26 03:53:10',
      //           redirect_code: null
      //         },
      //         {
      //           id: 952,
      //           redirect_url: null,
      //           title: 'صفر تا صد عربی دهم (نظام آموزشی جدید) - پدرام علیمرادی',
      //           short_title: 'صفر تا صد عربی دهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/arabi100-100 set2_20200906115016.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/952',
      //             api: 'http://127.0.0.1/api/v2/set/952'
      //           },
      //           contents_count: 18,
      //           author: null,
      //           contents: null,
      //           created_at: '2020-08-23 05:34:40',
      //           updated_at: '2022-01-26 05:13:35',
      //           redirect_code: null
      //         },
      //         {
      //           id: 578,
      //           redirect_url: null,
      //           title: 'صفر تا صد زبان انگلیسی دهم (نظام آموزشی جدید) علی اکبر عزتی',
      //           short_title: 'صفر تا صد زبان دهم',
      //           photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/zaban10 0-100 set_20200818112937.jpg',
      //           url: {
      //             web: 'http://127.0.0.1/set/578',
      //             api: 'http://127.0.0.1/api/v2/set/578'
      //           },
      //           contents_count: 26,
      //           author: null,
      //           contents: null,
      //           created_at: '2019-07-23 06:41:07',
      //           updated_at: '2022-01-26 04:16:24',
      //           redirect_code: null
      //         }
      //       ],
      //       products: null,
      //       banners: null,
      //       updated_at: '2019-09-16 12:39:50'
      //     }
      //   ]
      // }
      // this.blocks = new BlockList(test.data)
      this.blocks = new BlockList(response.data.data)
      this.updateSections()
    },
    updateSections () {
      const widgets = []
      this.blocks.list.forEach((block, index) => {
        if(block.banners && block.banners.list.length > 0) {
          block.headerCustomClass = `banner-header-${index}` + ' '
        }

        widgets.push({
          name: 'BlockComponent',
          data: block,
        })
      })
      this.sections[0].data.rows[0].cols[0].widgets = widgets
      console.log('sec', this.sections)
    },
    getBlocksData () {
      return this.$axios.get(API_ADDRESS.pages.home)
      // return this.$axios.get('http://alaatv.test/api/v2/home')
    }

  }
}
</script>

<style lang="scss" scoped>
.home-page {
  &:deep(.banner-header-0) {
    display: none;
  }

}

</style>

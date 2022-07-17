<template>
  <page-builder :sections="sections"/>
</template>

<script>
import PageBuilder from 'components/PageBuilder/PageBuilder'
import { BlockList } from 'src/models/Block'
import API_ADDRESS from 'src/api/Addresses'

export default {
name: "Shop",
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
      //     }
      //   ]
      // }
      // this.blocks = new BlockList(test.data)
      this.blocks = new BlockList(response.data.data)
      this.updateSections()
    },
    updateSections () {
      const widgets = []
      this.blocks.list.forEach(block => {
        widgets.push({
          name: 'BlockComponent',
          data: block
        })
      })
      this.sections[0].data.rows[0].cols[0].widgets = widgets
    },
    getBlocksData () {
      return this.$axios.get(API_ADDRESS.pages.shop)
    }

  }
}
</script>

<style scoped>

</style>

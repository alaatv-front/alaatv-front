<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable"
                  :loading="pageBuilderLoading" />
</template>

<script>
import { mixinSEO, mixinPageOptions, mixinPrefetchServerData } from 'src/mixin/Mixins.js'
// import { PageSetting } from 'src/models/PageSetting'
// import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'HomePage',
  mixins: [mixinPrefetchServerData, mixinPageOptions, mixinSEO]
  // data: () => {
  //   return {
  //     sections: [{ data: { rows: [{ cols: [{ widgets: [{ name: 'BlockList', options: { to: 1, apiName: 'home' } }, { name: 'Services', options: { services: [{ link: '#konkoor2', icon: 'https://nodes.alaatv.com/upload/homepage_icon_konkur_icon.png?w=52&h=52', title: 'کنکور', subTitle: 'صفر تا صد رایگان' }, { link: 'https://3a.alaatv.com/', icon: 'https://nodes.alaatv.com/upload/homepage_icon_3a_icon.png?w=52&h=52', title: 'سه آ', subTitle: 'آزمون آنلاین آلاء' }, { link: '#yazdahom', icon: 'https://nodes.alaatv.com/upload/homepage_icon_grade11_icon.png?w=52&h=52', title: 'یازدهم', subTitle: 'صفر تا صد رایگان' }, { link: '#dahom', icon: 'https://nodes.alaatv.com/upload/homepage_icon_grade10_icon.png?w=52&h=52', title: 'دهم', subTitle: 'صفر تا صد رایگان' }, { link: 'panel/abrisham/progress', icon: 'https://nodes.alaatv.com/upload/homepage_icon_silkroad2_icon.png?w=52&h=52', title: 'همایش راه ابریشم', subTitle: 'برنامه ای کامل ویژه کنکوری ها' }, { link: '/landing/10', icon: 'https://nodes.alaatv.com/upload/homepage_icon_godar_icon.png?w=52&h=52', title: 'همایش گدار', subTitle: 'جمع بندی نیم سال اول دوازدهم' }, { link: '/landing/9', icon: 'https://nodes.alaatv.com/upload/homepage_icon_taftan_icon.png?w=52&h=52', title: 'همایش تفتان', subTitle: 'جمع بندی دهم و یازدهم' }, { link: '/landing/15', icon: 'https://nodes.alaatv.com/upload/homepage_icon_arash_icon.png?w=52&h=52', title: 'همایش آرش', subTitle: 'جمع بندی کامل کنکور' }, { link: '/h', icon: 'https://nodes.alaatv.com/upload/homepage_icon_hekmat_icon.png?w=52&h=52', title: 'طرح حکمت', subTitle: 'ویژه خانواده های نیروهای مسلح' }], style: { 'margin-bottom': '20px' } } }, { name: 'BlockList', options: { from: 1, apiName: 'home' } }] }], options: { boxed: true, boxedWidth: 1362 } }] }, options: { fullHeight: true, verticalAlign: 'center' } }]
  //   }
  // },
  // mounted () {
  //   // this.currenSections = this.sections
  //   // const pageSetting = new PageSetting()
  //   // const routeName = this.$route.name
  //   // // const params = JSON.stringify(this.$route.params)
  //   // const key = 'route_name:' + routeName /* + '-params:' + params */
  //   // const value = pageSetting.getStringifyValue()
  //   // APIGateway.pageSetting.create({ key, value })
  // }
}
</script>

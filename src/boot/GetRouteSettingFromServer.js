import { boot } from 'quasar/wrappers'
// import { APIGateway } from 'src/api/APIGateway.js'
export default boot((context) => {
  // const store = context.store
  const router = context.router

  router.beforeEach(async (to, from, next) => {
    // // clear currentSections for new route
    // if (to.name !== from.name) {
    //   store.commit('PageBuilder/updateCurrentSections', null)
    // }
    // set open graph url
    // const ssrRequestReferer = (context.ssrContext && context.ssrContext.req) ? context.ssrContext.req.headers.referer : null
    // const locationHref = (typeof window !== 'undefined') ? window.location.href : null
    // const ogUrl = ssrRequestReferer || locationHref
    // store.commit('SEO/updateOgUrl', ogUrl)
    //
    // if (!to.meta?.hasDynamicSetting && !to.meta?.hasDynamicSettingWithParams) {
    //   return next()
    // }
    //
    // if (!context.ssrContext) {
    //   return next()
    // }
    //
    // try {
    //   const withParams = !!to.meta.hasDynamicSettingWithParams
    //   const params = JSON.stringify(to.params)
    //   const routeName = to.name
    //   const key = 'route_name:' + routeName + (withParams ? ('-params:' + params) : '')
    //   const pageSetting = await APIGateway.pageSetting.get(key)
    //   // const pageSetting = [{ data: { rows: [{ cols: [{ widgets: [{ name: 'BlockList', options: { to: 1, apiName: 'home' } }, { name: 'Services', options: { services: [{ link: '#konkoor2', icon: 'https://nodes.alaatv.com/upload/homepage_icon_konkur_icon.png?w=52&h=52', title: 'کنکور', subTitle: 'صفر تا صد رایگان' }, { link: 'https://3a.alaatv.com/', icon: 'https://nodes.alaatv.com/upload/homepage_icon_3a_icon.png?w=52&h=52', title: 'سه آ', subTitle: 'آزمون آنلاین آلاء' }, { link: '#yazdahom', icon: 'https://nodes.alaatv.com/upload/homepage_icon_grade11_icon.png?w=52&h=52', title: 'یازدهم', subTitle: 'صفر تا صد رایگان' }, { link: '#dahom', icon: 'https://nodes.alaatv.com/upload/homepage_icon_grade10_icon.png?w=52&h=52', title: 'دهم', subTitle: 'صفر تا صد رایگان' }, { link: 'panel/abrisham/progress', icon: 'https://nodes.alaatv.com/upload/homepage_icon_silkroad2_icon.png?w=52&h=52', title: 'همایش راه ابریشم', subTitle: 'برنامه ای کامل ویژه کنکوری ها' }, { link: '/landing/10', icon: 'https://nodes.alaatv.com/upload/homepage_icon_godar_icon.png?w=52&h=52', title: 'همایش گدار', subTitle: 'جمع بندی نیم سال اول دوازدهم' }, { link: '/landing/9', icon: 'https://nodes.alaatv.com/upload/homepage_icon_taftan_icon.png?w=52&h=52', title: 'همایش تفتان', subTitle: 'جمع بندی دهم و یازدهم' }, { link: '/landing/15', icon: 'https://nodes.alaatv.com/upload/homepage_icon_arash_icon.png?w=52&h=52', title: 'همایش آرش', subTitle: 'جمع بندی کامل کنکور' }, { link: '/h', icon: 'https://nodes.alaatv.com/upload/homepage_icon_hekmat_icon.png?w=52&h=52', title: 'طرح حکمت', subTitle: 'ویژه خانواده های نیروهای مسلح' }], style: { 'margin-bottom': '20px' } } }, { name: 'BlockList', options: { from: 1, apiName: 'home' } }] }], options: { boxed: true, boxedWidth: 1362 } }] }, options: { fullHeight: true, verticalAlign: 'center' } }]
    //   const sections = pageSetting.value.sections
    //   const seo = pageSetting.value.seo
    //
    //   // PageBuilder
    //   store.commit('PageBuilder/updateCurrentSections', sections)
    //
    //   // SEO
    //   store.commit('SEO/updateTitle', seo.title)
    //   store.commit('SEO/updateDescription', seo.description)
    //   store.commit('SEO/updateRobots', seo.robots)
    //   store.commit('SEO/updateOgTitle', seo.ogTitle)
    //   store.commit('SEO/updateOgDescription', seo.ogDescription)
    //   store.commit('SEO/updateOgUrl', seo.ogUrl)
    //   store.commit('SEO/updateOgImage', seo.ogImage)
    // } catch {
    //   store.commit('PageBuilder/updateCurrentSections', null)
    //   return next()
    // }
    return next()
  })
})

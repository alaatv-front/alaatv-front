import { boot } from 'quasar/wrappers'
import { APIGateway } from 'src/api/APIGateway.js'
export default boot((context) => {
  const store = context.store
  const router = context.router

  router.beforeEach(async (to, from, next) => {
    // set open graph url
    const ssrRequestReferer = (context.ssrContext && context.ssrContext.req) ? context.ssrContext.req.headers.referer : null
    const locationHref = (typeof window !== 'undefined') ? window.location.href : null
    const ogUrl = ssrRequestReferer || locationHref
    store.commit('SEO/updateOgUrl', ogUrl)

    if (!to.meta?.hasDynamicSetting) {
      return next()
    }

    try {
      const params = JSON.stringify(to.params)
      const routeName = to.name
      const key = 'route_name:' + routeName + '-params:' + params
      const pageSetting = await APIGateway.pageSetting.get(key)
      const sections = pageSetting.value.sections
      const seo = pageSetting.value.seo

      // PageBuilder
      store.commit('PageBuilder/updateCurrentSections', sections)

      // SEO
      store.commit('SEO/updateTitle', seo.title)
      store.commit('SEO/updateDescription', seo.description)
      store.commit('SEO/updateRobots', seo.robots)
      store.commit('SEO/updateOgTitle', seo.ogTitle)
      store.commit('SEO/updateOgDescription', seo.ogDescription)
      store.commit('SEO/updateOgUrl', seo.ogUrl)
      store.commit('SEO/updateOgImage', seo.ogImage)
    } catch {
      store.commit('PageBuilder/updateCurrentSections', null)
      return next()
    }
    return next()
  })
})

import { APIGateway } from 'src/api/APIGateway'
import { PageSeo } from 'src/models/PageSeo'

const mixinPageOptions = {
  data() {
    return {
      pageConfig: {}
    }
  },
  computed: {
    hasDynamicSetting () {
      return !!this.$route.meta?.hasDynamicSetting
    },
    hasDynamicSettingWithParams () {
      return !!this.$route.meta?.hasDynamicSettingWithParams
    },
    pageBuilderEditable () {
      return this.$store.getters['PageBuilder/pageBuilderEditable']
    },
    initialSections() {
      return this.$store.getters['PageBuilder/initialSections']
    },
    pageDataLoaded () {
      return this.$store.getters['PageBuilder/pageDataLoaded']
    },
    pageBuilderLoading: {
      get() {
        return this.$store.getters['PageBuilder/pageBuilderLoading']
      },
      set(newInfo) {
        return this.$store.commit('PageBuilder/updatePageBuilderLoading', newInfo)
      }
    },
    currenSections: {
      get() {
        return this.$store.getters['PageBuilder/currentSections']
      },
      set(newInfo) {
        return this.$store.commit('PageBuilder/updateCurrentSections', newInfo)
      }
    }
  },
  methods: {
    prefetchServerDataPromise () {
      return this.getPageConfigRequest()
    },
    prefetchServerDataPromiseThen () {
      this.$store.commit('PageBuilder/updatePageDataLoaded', true)
    },
    prefetchServerDataPromiseCatch () {
      this.pageBuilderLoading = false
    },
    getPageConfigRequest() {
      // this.pageBuilderLoading = true
      // const params = JSON.stringify(this.$route.params)
      // const routeName = this.$route.name
      // const key = 'route_name:' + routeName + (this.hasDynamicSettingWithParams ? ('-params:' + params) : '')
      // return APIGateway.pageSetting.get(key)

      return Promise.all([this.getPageBuilderConfigPromise(), this.getSeoPromise()])
    },

    getPageBuilderConfigPromise () {
      this.pageBuilderLoading = true
      return new Promise((resolve, reject) => {
        const params = JSON.stringify(this.$route.params)
        const routeName = this.$route.name
        const key = 'route_name:' + routeName + (this.hasDynamicSettingWithParams ? ('-params:' + params) : '')
        APIGateway.pageSetting.get(key)
          .then((pageSetting) => {
            const sections = pageSetting.value.sections
            this.$store.commit('PageBuilder/updateCurrentSections', sections)
            this.pageBuilderLoading = false
            this.$store.commit('PageBuilder/updatePageDataLoaded', true)
            resolve(pageSetting)
          })
          .catch(() => {
            this.pageBuilderLoading = false
            reject()
          })
      })
    },
    getSeoPromise () {
      return new Promise((resolve, reject) => {
        const routeName = this.$route.name
        const dynamicSeoPage = [{
          routeName: 'Public.Product.Show',
          entityType: 'product'
        }, {
          routeName: 'Public.Content.Show',
          entityType: 'content'
        }, {
          routeName: 'Public.Set.Show',
          entityType: 'content-set'
        }]
        const target = dynamicSeoPage.find(item => item.routeName === routeName)
        const comitSeo = (pageSeo) => {
          const pageSeoData = (new PageSeo(pageSeo)).getFormattedStyle()
          // SEO
          this.$store.commit('SEO/updateTitle', pageSeoData.title)
          this.$store.commit('SEO/updateDescription', pageSeoData.description)
          this.$store.commit('SEO/updateRobots', pageSeoData.robots)
          this.$store.commit('SEO/updateOgTitle', pageSeoData.ogTitle)
          this.$store.commit('SEO/updateOgDescription', pageSeoData.ogDescription)
          this.$store.commit('SEO/updateOgUrl', pageSeoData.ogUrl)
          this.$store.commit('SEO/updateOgImage', pageSeoData.ogImage)
        }
        if (target) {
          const type = target.entityType
          const id = this.$route.params.id
          APIGateway.seo.show({ type, id })
            .then((pageSeo) => {
              comitSeo(pageSeo)
              resolve(pageSeo)
            })
            .catch(() => {
              reject()
            })
        } else {
          comitSeo()
          resolve(null)
        }
      })
    }
  }
}

export default mixinPageOptions

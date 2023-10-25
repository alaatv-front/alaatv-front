import { PageSeo } from 'src/models/PageSeo.js'
import { APIGateway } from 'src/api/APIGateway.js'

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
    menuItems: {
      get() {
        return this.$store.getters['PageBuilder/menuItems']
      },
      set(newInfo) {
        return this.$store.commit('PageBuilder/updateMenuItems', newInfo)
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
    onFetchData (/* data */) {},
    onFailedFetchData (/* error */) {},
    prefetchServerDataPromise () {
      return this.getPageConfigRequest()
    },
    prefetchServerDataPromiseThen (data) {
      this.$store.commit('PageBuilder/updatePageDataLoaded', true)
      this.onFetchData(data)
    },
    prefetchServerDataPromiseCatch (error) {
      this.pageBuilderLoading = false
      this.onFailedFetchData(error)
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
            const seo = pageSetting.value.seo

            // PageBuilder
            this.$store.commit('PageBuilder/updateCurrentSections', sections)

            this.pageBuilderLoading = false
            this.$store.commit('PageBuilder/updatePageDataLoaded', true)

            const target = this.getDynamicSeoPageTarget()
            if (!target) {
              this.commitSeo(seo)
            }

            resolve(pageSetting)
          })
          .catch(() => {
            this.pageBuilderLoading = false
            reject()
          })
      })
    },
    getDynamicSeoPageTarget () {
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
      return dynamicSeoPage.find(item => item.routeName === routeName)
    },
    commitSeo (seoData) {
      const pageSeoData = (new PageSeo(seoData)).getFormattedStyle()
      // SEO
      this.$store.commit('SEO/updateTitle', pageSeoData.title)
      this.$store.commit('SEO/updateDescription', pageSeoData.description)
      this.$store.commit('SEO/updateRobots', pageSeoData.robots)
      this.$store.commit('SEO/updateOgTitle', pageSeoData.ogTitle)
      this.$store.commit('SEO/updateOgDescription', pageSeoData.ogDescription)
      this.$store.commit('SEO/updateOgUrl', pageSeoData.ogUrl)
      this.$store.commit('SEO/updateOgImage', pageSeoData.ogImage)
    },
    getSeoPromise () {
      return new Promise((resolve, reject) => {
        const target = this.getDynamicSeoPageTarget()
        if (target) {
          const type = target.entityType
          const id = this.$route.params.id

          // if (this.$route.params.id === 'null') {
          //   console.log('this.$route.params.idthis.$route.params.idthis.$route.params.idthis.$route.params.id', this.$route.params)
          // }

          if (isNaN(id)) {
            resolve(null)
          } else {
            APIGateway.seo.show({ type, id })
              .then((pageSeo) => {
                this.commitSeo(pageSeo)
                resolve(pageSeo)
              })
              .catch(() => {
                reject()
              })
          }
        } else {
          resolve(null)
        }
      })
    }
  }
}

export default mixinPageOptions

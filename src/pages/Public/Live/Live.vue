<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable"
                  :loading="pageBuilderLoading" />
</template>

<script>
import { User } from 'src/models/User.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { PageSetting } from 'src/models/PageSetting.js'
import { mixinSEO, mixinPageOptions, mixinPrefetchServerData } from 'src/mixin/Mixins.js'

export default {
  name: 'Public.Live.DynamicName',
  mixins: [mixinPrefetchServerData, mixinPageOptions, mixinSEO],
  data () {
    return {
      user: new User(),
      isUserLogin: false
    }
  },
  mounted () {
    this.loadAuthData()
    // // ToDo: must call after prefetchServerDataPromiseThen or prefetchServerDataPromiseCatch (mixinPageOptions)
    // setTimeout(() => {
    //   this.checkNewLanding()
    // }, 1000)
  },
  methods: {
    loadAuthData () { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
      this.isUserLogin = this.$store.getters['Auth/isUserLogin']
    },
    onFailedFetchData () {
      setTimeout(() => {
        this.checkNewLanding()
      }, 1000)
    },
    goToNotFoundLanding () {
      // this.$router.push({ name: 'NotFound' })
      this.$router.push({ name: 'Public.Content.Search' })
    },
    checkNewLanding () {
      // if (this.pageDataLoaded) {
      //   return
      // }

      if (!this.isUserLogin) {
        this.goToNotFoundLanding()
        return
      }

      if (!this.user.hasPermission('editSiteSetting')) {
        this.goToNotFoundLanding()
        return
      }

      this.$q.dialog({
        title: 'ساخت لایو جدید',
        message: 'از نام لایو ' + this.$route.params.live_name + ' اطمینان دارید؟ ',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.createNewLanding()
      }).onCancel(() => {
        // this.$router.push({ name: 'Public.Home' })
        this.goToNotFoundLanding()
      })
    },
    createNewLanding () {
      const pageSetting = new PageSetting({
        value: { sections: [], seo: {}, layoutConfig: {} }
      })
      const params = JSON.stringify(this.$route.params)
      const routeName = this.$route.name
      const key = 'route_name:' + routeName + '-params:' + params
      const value = pageSetting.getStringifyValue()
      APIGateway.pageSetting.create({ key, value })
        .then(() => {
          this.currenSections = []
        })
    }
  }
}
</script>

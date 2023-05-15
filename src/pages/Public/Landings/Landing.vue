<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable"
                  :loading="pageBuilderLoading" />
</template>

<script>
import { APIGateway } from 'src/api/APIGateway.js'
import { PageSetting } from 'src/models/PageSetting.js'
import { mixinSEO, mixinPageOptions, mixinPrefetchServerData } from 'src/mixin/Mixins.js'
import { User } from 'src/models/User'

export default {
  name: 'Landing',
  mixins: [mixinPrefetchServerData, mixinPageOptions, mixinSEO],
  data () {
    return {
      user: new User()
    }
  },
  mounted () {
    this.loadAuthData()
    // ToDo: must call after prefetchServerDataPromiseThen or prefetchServerDataPromiseCatch (mixinPageOptions)
    if (this.user.hasPermission('editSiteSetting')) {
      setTimeout(() => {
        this.checkNewLanding()
      }, 1000)
    } else {
      this.$router.push({ name: 'NotFound' })
    }
  },
  methods: {
    loadAuthData () { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
    },
    checkNewLanding () {
      if (this.pageDataLoaded) {
        return
      }
      this.$q.dialog({
        title: 'ساخت لندینگ جدید',
        message: 'از نام لندینگ ' + this.$route.params.landing_name + ' اطمینان دارید؟ ',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.createNewLanding()
      }).onCancel(() => {
        this.$router.push({ name: 'Public.Home' })
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

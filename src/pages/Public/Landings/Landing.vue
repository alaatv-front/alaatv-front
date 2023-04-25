<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable" />
</template>

<script>
import { APIGateway } from 'src/api/APIGateway.js'
import { PageSetting } from 'src/models/PageSetting.js'
import { mixinSEO, mixinPageOptions, mixinPrefetchServerData } from 'src/mixin/Mixins.js'

export default {
  name: 'Landing',
  mixins: [mixinPrefetchServerData, mixinPageOptions, mixinSEO],
  mounted () {
    // ToDo: must call after prefetchServerDataPromiseThen or prefetchServerDataPromiseCatch (mixinPageOptions)
    setTimeout(() => {
      this.checkNewLanding()
    }, 1000)
  },
  methods: {
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

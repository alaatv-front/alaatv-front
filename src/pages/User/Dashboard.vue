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
  name: 'UserPanel.Dashboard',
  mixins: [mixinPrefetchServerData, mixinPageOptions, mixinSEO]
  // mounted () {
  //   this.currenSections = []
  //   const pageSetting = new PageSetting({
  //     value: { sections: this.currenSections, seo: {}, layoutConfig: {} }
  //   })
  //   const routeName = this.$route.name
  //   // const params = JSON.stringify(this.$route.params)
  //   const key = 'route_name:' + routeName /* + '-params:' + params */
  //   const value = pageSetting.getStringifyValue()
  //   APIGateway.pageSetting.create({ key, value })
  // }
}
</script>

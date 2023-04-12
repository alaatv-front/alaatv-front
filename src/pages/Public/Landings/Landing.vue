<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable" />
</template>

<script>
import { APIGateway } from 'src/api/APIGateway.js'
import { PageSetting } from 'src/models/PageSetting.js'
import { mixinSEO, mixinPageOptions } from 'src/mixin/Mixins.js'

export default {
  name: 'Landing',
  mixins: [mixinPageOptions, mixinSEO],
  data() {
    return {
      landingName: null,
      pageConfig: {}
    }
  },
  created () {
    if (this.currenSections === null) {
      this.$q.dialog({
        title: 'ساخت لندینگ جدید',
        message: 'از نام لندینگ ' + this.$route.params.landing_name + ' اطمینان دارید؟ ',
        cancel: true,
        persistent: true
      }).onOk(() => {
        const pageSetting = new PageSetting()
        const params = JSON.stringify(this.$route.params)
        const routeName = this.$route.name
        const key = 'route_name:' + routeName + '-params:' + params
        const value = pageSetting.getStringifyValue()
        APIGateway.pageSetting.create({ key, value })
          .then(() => {
            this.currenSections = []
          })
      }).onCancel(() => {
        this.$router.push({ name: 'Public.Home' })
      })
    }
  }
}
</script>

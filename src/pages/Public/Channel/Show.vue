<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable"
                  :loading="pageBuilderLoading" />
</template>

<script>
import { mixinPageOptions } from 'src/mixin/Mixins.js'
// import { mixinSEO, mixinPageOptions, mixinPrefetchServerData } from 'src/mixin/Mixins.js'
// import { PageSetting } from 'src/models/PageSetting'
// import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'Show',
  // mixins: [mixinPrefetchServerData, mixinPageOptions, mixinSEO],
  mixins: [mixinPageOptions],
  data: () => {
    return {
      sections: [
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'ChannelInfo',
                        options: {}
                      },
                      {
                        name: 'ChannelBanner',
                        options: {}
                      },
                      {
                        name: 'ChannelTabPanel',
                        options: {}
                      }
                    ]
                  }
                ],
                options: {
                  boxed: true,
                  boxedWidth: 1362
                }
              }
            ]
          }
        }
      ]
    }
  },
  mounted () {
    this.currenSections = this.sections
    this.pageBuilderLoading = false
  }
}
</script>

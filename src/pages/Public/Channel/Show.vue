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
    // const pageSetting = new PageSetting({
    //   value: { sections: this.currenSections, seo: {}, layoutConfig: {} }
    // })
    // const routeName = this.$route.name
    // // const params = JSON.stringify(this.$route.params)
    // const key = 'route_name:' + routeName /* + '-params:' + params */
    // const value = pageSetting.getStringifyValue()
    // APIGateway.pageSetting.create({ key, value })
    this.setChannel()
  },
  methods: {
    async setChannel() {
      const channel = await this.$apiGateway.channel.get({
        data: {
          id: 89
        }
      })
      this.setChannelDataInWidget(channel)
    },
    setChannelDataInWidget(channel) {
      this.sections[0]
        .data.rows[0]
        .cols[0].widgets
        .forEach(item => {
          item.options.channel = Object.assign(channel, this.options)
        })
    }
  }
}
</script>

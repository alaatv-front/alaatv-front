<template>
  <q-page-builder v-model:sections="sections"
                  v-model::options="pageConfig"
                  :editable="pageBuilderEditable" />
</template>

<script>
import { mixinPageOptions, mixinSEO } from 'src/mixin/Mixins'

export default {
  name: 'Dashboard',
  data: () => ({
    pageConfig: {},
    mixins: [mixinPageOptions, mixinSEO],
    sections: [
      {
        data: {
          rows: [
            {
              cols: [
                {
                  widgets: [{ name: 'GiftCardDashboard' }]
                }
              ],
              options: {
                boxed: true,
                boxedWidth: 1602
              }
            }
          ]
        }
      }
    ]
  })
}
</script>

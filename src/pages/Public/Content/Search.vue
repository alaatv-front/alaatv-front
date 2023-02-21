<template>
  <div class="Search-page">
    <q-page-builder v-model:sections="sections"
                    v-model:options="pageConfig"
                    :editable="pageBuilderEditable" />
  </div>
</template>

<script>
import { mixinPageBuilder } from 'src/mixin/Mixins'
export default {
  name: 'Search',
  mixins: [mixinPageBuilder],
  data () {
    return {
      pageConfig: {},
      sections: [
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'ContentSearch'
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
  computed: {
    calculateHeightStyle () {
      return this.$store.getters['AppLayout/calculateContainerFullHeight']
    }
  }
}
</script>

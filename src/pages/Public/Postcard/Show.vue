<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable"
                  :loading="pageBuilderLoading" />
</template>

<script>
import { defineComponent } from 'vue'
import { mixinPageOptions } from 'src/mixin/Mixins.js'

export default defineComponent({
  name: 'show',
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
                        name: 'ShowMothersDayPostcard',
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
})
</script>

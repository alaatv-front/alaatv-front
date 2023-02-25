<template>
  <div class="userSet-page">
    <q-page-builder v-model:sections="currenSections"
                    v-model::options="pageConfig"
                    :editable="pageBuilderEditable" />
  </div>
</template>

<script>
import { mixinSEO, mixinPageOptions } from 'src/mixin/Mixins.js'
export default {
  name: 'Public.Set.Show',
  mixins: [mixinPageOptions, mixinSEO],
  data() {
    return {
      pageConfig: {},
      sections: [
        {
          data:
            {
              rows: [
                {
                  cols: [
                    {
                      widgets: [
                        {
                          name: 'Set',
                          options: {
                            className: '',
                            height: 'auto',
                            boxed: false,
                            boxedWidth: 1200,
                            style: { marginBottom: '101px' },
                            showCountOfContent: true,
                            showCountOfVideo: true,
                            showCountOfPamphlet: true,
                            showBtnFavorSet: true,
                            showBtnFavorContent: true
                          }
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
  created () {
    this.currenSections = this.sections
  }
}
</script>

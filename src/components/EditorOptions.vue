<template>
  <div class="row">
    <div class="col-12">
      <q-expansion-item expand-separator
                        icon="ph:monitor"
                        label="responsive size">
        <responsive-size-tab-panel v-model:size="responsive">
          <template v-for="sizeItem in responsiveOpts"
                    :key="sizeItem"
                    v-slot:[sizeItem]>
            <div class="row">
              <div class="col-md-3 offset-1 q-ma-sm">
                <q-select v-model="localOptions[responsive].fontStyle"
                          :options="fontStyle"
                          label="fontStyle" />
              </div>
              <div class="col-md-3 q-ma-sm">
                <q-select v-model="localOptions.fontFamily"
                          :options="fontFamilies"
                          label="font family">
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps"
                            :style="{'fontFamily': scope.opt}">
                      <q-item-section>
                        <q-item-label>{{ scope.opt }}</q-item-label>
                        <q-item-label caption>ابجد هوز</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="col-md-3 q-ma-sm">
                <q-input v-model="localOptions[responsive].fontSize"
                         label="font size" />
              </div>
              <div class="col-md-3 offset-1 q-ma-sm">
                <q-input v-model="localOptions[responsive].fontWeight"
                         label="font weight" />
              </div>
              <div class="col-md-3 q-ma-sm">
                <q-input v-model="localOptions[responsive].lineHeight"
                         label="line height" />
              </div>
              <div class="col-md-3 q-ma-sm">
                <q-input v-model="localOptions[responsive].letterSpacing"
                         label="Letter Spacing" />
              </div>
            </div>
          </template>
        </responsive-size-tab-panel>
      </q-expansion-item>
    </div>
  </div>
</template>

<script>
import { PageBuilderOptionPanel } from 'src/mixin/Mixins.js'
import ResponsiveSizeTabPanel from 'src/components/WidgetComponents/ResponsiveSizeTabPanel/ResponsiveSizeTabPanel.vue'

export default {
  name: 'EditorOptions',
  components: {
    ResponsiveSizeTabPanel
  },
  mixins: [PageBuilderOptionPanel],
  data () {
    return {
      size: 'xs',
      sizeOptions: ['xs', 'sm', 'md', 'lg', 'xl'],
      fontFamilies: ['Doran', 'IRANSans', 'IRANSansDN', 'IRANSansX', 'iranyekan', 'Plasma', 'Panchang', 'Modam'],
      fontStyle: ['inherit', 'normal', 'italic'],
      responsiveOpts: ['xs', 'sm', 'md', 'lg', 'xl'],
      responsive: 'xs'

    }
  }
}
</script>

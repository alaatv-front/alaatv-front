<template>
  <div class="ttsp-panel-list row q-col-gutter-md justify-center"
       :style="localOptions.style">
    <div v-for="(item, index) in panels"
         :key="index"
         class="col-md-3 col-xs-6">
      <t-t-s-p-panel-item :item="item" />
    </div>
  </div>
</template>

<script>
import TTSPPanelItem from './TTSPPanelItem.vue'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinWidget, mixinPrefetchServerData } from 'src/mixin/Mixins.js'

export default {
  name: 'TTSPPanelList',
  components: { TTSPPanelItem },
  mixins: [mixinPrefetchServerData, mixinWidget],
  data () {
    return {
      panels: [],
      loading: false,
      defaultOptions: {
        className: '',
        apiName: 'home',
        height: 'auto',
        style: {},
        from: 0,
        productOptions: {
          theme: 'ThemeDefault',
          className: '',
          height: 'auto',
          boxed: false,
          boxedWidth: 1200,
          style: {},
          borderStyle: {
            borderCssString: '',
            borderRadiusCssString: '20px'
          },
          boxShadows: [
            '-2px -4px 10px rgba(255, 255, 255, 0.6)',
            '2px 4px 10px rgba(46, 56, 112, 0.05)'
          ],
          cssHoverEffects: {
            boxShadows: [
              '-5px -6px 10px rgba(255, 255, 255, 0.6)',
              '5px 5px 20px rgba(0, 0, 0, 0.1)'
            ],
            borderStyle: {
              borderCssString: '',
              borderRadiusCssString: '20px'
            },
            transition: {
              time: 0.4
            },
            transform: {
              rotate: 0,
              scaleX: 1,
              scaleY: 1,
              skewX: 0,
              skewY: 0,
              translateX: 0,
              translateY: -10
            }
          }
        },
        to: undefined
      }
    }
  },
  methods: {
    prefetchServerDataPromise () {
      this.loading = true
      return APIGateway.events.getAlaaPanels()
    },
    prefetchServerDataPromiseThen (data) {
      this.panels = data
      this.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.loading = false
    }
  }
}
</script>

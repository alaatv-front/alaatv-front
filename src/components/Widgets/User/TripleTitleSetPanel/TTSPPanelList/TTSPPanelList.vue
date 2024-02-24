<template>
  <div class="ttsp-panel-list row q-col-gutter-md justify-center"
       :style="localOptions.style">
    <div v-for="(item, index) in panels"
         :key="index"
         class="col-md-3 col-xs-6">
      <t-t-s-p-panel-item :item="item"
                          :loading="loading" />
    </div>
  </div>
</template>

<script>
import TTSPPanelItem from './TTSPPanelItem.vue'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'TTSPPanelList',
  components: { TTSPPanelItem },
  mixins: [mixinWidget],
  data () {
    return {
      panels: [],
      loading: false,
      defaultOptions: {
        className: '',
        style: {}
      }
    }
  },
  created () {
    this.panels = APIGateway.events.eventList.filter(item => item.groups.includes('alaa'))
    this.panels.push({
      route: { name: 'UserPanel.Asset.Abrisham' },
      title: 'راه ابریشم',
      logo: 'https://nodes.alaatv.com/upload/abrisham-panel-logotype.png'
    })
    this.panels.push({
      route: { name: 'UserPanel.Asset.AbrishamPro' },
      title: 'راه ابریشم پرو',
      logo: 'https://nodes.alaatv.com/upload/abrisham-panel-logotype.png'
    })
  }
}
</script>

<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row">
          <div class="col-md-12">
            <q-checkbox v-model="localOptions.showBtnFavorSet"
                        label="افزودن به علاقه مندی مجموعه" />
          </div>
          <div class="col-md-12">
            <q-checkbox v-model="localOptions.showBtnFavorContent"
                        label="افزودن به علاقه مندی محتواها" />
          </div>
          <div class="col-md-12">
            <q-checkbox v-model="localOptions.showCountOfContent"
                        label="نمایش تعداد محتوا" />
          </div>
          <div class="col-md-12">
            <q-checkbox v-model="localOptions.showCountOfVideo"
                        label="نمایش تعداد ویدیو" />
          </div>
          <div class="col-md-12">
            <q-checkbox v-model="localOptions.showCountOfPamphlet"
                        label="نمایش تعداد جزوه" />
          </div>
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs },
  mixins: [mixinOptionPanel],
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      apiOptions: ['home', 'shop'],
      listSlice: 'to',
      sliceOptions: ['to', 'from'],
      defaultOptions: {
        className: '',
        height: 'auto',
        boxed: false,
        boxedWidth: 1200,
        style: {},
        showCountOfContent: true,
        showCountOfVideo: true,
        showCountOfPamphlet: true,
        showBtnFavorSet: true,
        showBtnFavorContent: true
      }
    }
  },
  watch: {
    localOptions: {
      handler (newVal) {
        this.$emit('update:options', newVal)
      },
      deep: true
    }
  }
})
</script>

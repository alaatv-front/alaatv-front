<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <q-list separator>
          <q-item>
            <q-item-section>
              <div class="row q-col-gutter-md">
                <div class="col-6">
                  <q-select v-model="localOptions.type"
                            :options="typeOption"
                            label="نوع کامپوننت"
                            outlined="" />
                </div>
                <div class="col-6">
                  <q-select v-model="localOptions.align"
                            :options="alignOption"
                            label="چیدمان"
                            outlined="" />
                </div>
              </div>
            </q-item-section>
          </q-item>
          <q-expansion-item v-if="localOptions.type === 'image'"
                            expand-separator
                            icon="image"
                            label="تصویر"
                            caption="ّimageWidget">
            <image-widget-option-panel v-model:options="localOptions.imageWidgetOptions" />
          </q-expansion-item>
          <q-expansion-item v-if="localOptions.type === 'text'"
                            expand-separator
                            icon="text_fields"
                            label="متن"
                            caption="TextWidget">
            <text-widget-option-panel v-model:options="localOptions.textWidgetOptions" />
          </q-expansion-item>
          <q-expansion-item v-if="localOptions.type === 'button'"
                            expand-separator
                            icon="work"
                            label="دکمه"
                            caption="ActionButton">
            <action-button-option-panel v-model:options="localOptions.actionButtonOptions" />
          </q-expansion-item>
        </q-list>
      </div>
    </template>
  </option-panel-tabs>
</template>

<script>
import { defineAsyncComponent, defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
import TextWidgetOptionPanel from 'src/components/Widgets/TextWidget/OptionPanel.vue'
import ImageWidgetOptionPanel from 'src/components/Widgets/ImageWidget/OptionPanel.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: {
    OptionPanelTabs,
    ImageWidgetOptionPanel,
    TextWidgetOptionPanel,
    ActionButtonOptionPanel: defineAsyncComponent(() =>
      import('src/components/Widgets/ActionButton/OptionPanel.vue')
    )
  },
  mixins: [mixinOptionPanel],
  data () {
    return {
      defaultOptions: {
        type: '',
        align: '',
        direction: '',
        actionButtonOptions: {},
        textWidgetOptions: {},
        imageWidgetOptions: {}
      },
      typeOption: ['text', 'image', 'button'],
      alignOption: ['flex-start', 'center', 'flex-end']
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

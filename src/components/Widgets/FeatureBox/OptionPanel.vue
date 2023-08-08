<template>
  <option-panel-tabs v-model:options="localOptions"
                     :show-border-style-tab="true">
    <template #main-tab>
      <div class="option-panel-container row q-col-gutter-md">
        <div class="input-container q-my-md col-md-12">
          <div class="outsideLabel">image</div>
          <q-input v-model="localOptions.image"
                   label="image" />
        </div>
        <div class="input-container col-md-3">
          <div class="outsideLabel">width</div>
          <q-input v-model="localOptions.imageWidth"
                   label="width" />
        </div>
        <div class="input-container col-md-3">
          <div class="outsideLabel">height</div>
          <q-input v-model="localOptions.imageHeight"
                   label="height" />
        </div>
        <div class="col-md-2">
          <div class="outsideLabel">horizontal</div>
          <q-checkbox v-model="localOptions.horizontal" />
        </div>
        <div class="input-container col-md-12">
          <q-expansion-item label="title">
            <q-card>
              <q-card-section>
                <text-option-panel v-model:options="localOptions.titleOptions" />
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>
        <div class="input-container col-md-12">
          <q-expansion-item label="description">
            <q-card>
              <q-card-section>
                <text-option-panel v-model:options="localOptions.descriptionOptions" />
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
import { PageBuilderOptionPanel } from 'src/mixin/Mixins.js'
import textOptionPanel from 'components/Widgets/TextWidget/OptionPanel.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: {
    OptionPanelTabs,
    textOptionPanel
  },
  mixins: [PageBuilderOptionPanel],
  data() {
    return {
      themeOptions: ['theme1', 'theme2'],
      defaultOptions: {
        title: '',
        titleOptions: {
          text: null,
          color: null,
          fontFamily: null,
          xs: {
            fontSize: null,
            fontWeight: null,
            fontStyle: null,
            lineHeight: null
          },
          sm: {
            fontSize: null,
            fontWeight: null,
            fontStyle: null,
            lineHeight: null
          },
          md: {
            fontSize: null,
            fontWeight: null,
            fontStyle: null,
            lineHeight: null
          },
          lg: {
            fontSize: null,
            fontWeight: null,
            fontStyle: null,
            lineHeight: null
          },
          xl: {
            fontSize: null,
            fontWeight: null,
            fontStyle: null,
            lineHeight: null
          }
        },
        description: '',
        descriptionOptions: {
          fontFamily: null,
          color: null,
          xs: {
            fontSize: null,
            fontWeight: null,
            fontStyle: null,
            lineHeight: null
          },
          sm: {
            fontSize: null,
            fontWeight: null,
            fontStyle: null,
            lineHeight: null
          },
          md: {
            fontSize: null,
            fontWeight: null,
            fontStyle: null,
            lineHeight: null
          },
          lg: {
            fontSize: null,
            fontWeight: null,
            fontStyle: null,
            lineHeight: null
          },
          xl: {
            fontSize: null,
            fontWeight: null,
            fontStyle: null,
            lineHeight: null
          }
        },
        image: null,
        horizontal: true,
        theme: 'theme1',
        borderStyle: {}
      }
    }
  }
})
</script>

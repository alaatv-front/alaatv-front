<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row q-my-lg">
          <div class="col-md-12">
            <q-input v-model="localOptions.image"
                     label="لینک عکس">
              <template v-slot:after>
                <q-btn round
                       dense
                       flat
                       color="primary"
                       icon="cloud_upload"
                       @click="toggleUploadDialog()" />
              </template>
            </q-input>
          </div>
        </div>
        <q-expansion-item expand-separator
                          icon="ph:gear"
                          label="Default settings">
          <div class="row q-my-md q-col-gutter-md">
            <div class="col-3">
              <q-checkbox v-model="localOptions.spaced"
                          label="spaced" />
            </div>
            <div class="col-3">
              <q-checkbox v-model="localOptions.dark"
                          label="dark" />
            </div>
            <div class="col-3">
              <q-checkbox v-model="localOptions.inset"
                          label="inset" />
            </div>
            <div class="col-3">
              <q-checkbox v-model="localOptions.vertical"
                          label="vertical" />
            </div>

          </div>
        </q-expansion-item>
        <q-expansion-item expand-separator
                          icon="ph:align-center-horizontal"
                          label="Responsive Image Size">
          <responsive-size-tab-panel v-model:size="size">
            <template v-for="sizeItem in responsiveOptions"
                      :key="sizeItem"
                      v-slot:[sizeItem]>
              <div class="row q-col-gutter-md">
                <div class="col-6">
                  <q-input v-model="localOptions.height[sizeItem]"
                           label="ارتفاع" />
                </div>
                <div class="col-6">
                  <q-input v-model="localOptions.width[sizeItem]"
                           label="عرض" />
                </div>
              </div>
            </template>
          </responsive-size-tab-panel>
        </q-expansion-item>
        <image-upload-dialog :dialog="dialog"
                             :multiple="false"
                             @toggle-dialog="toggleUploadDialog"
                             @update-value="onUpdateValue" />
      </div>
    </template>
  </option-panel-tabs>
</template>

<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
import ImageUploadDialog from 'src/components/Utils/ImageUploadDialog.vue'
import ResponsiveSizeTabPanel from 'src/components/WidgetComponents/ResponsiveSizeTabPanel/ResponsiveSizeTabPanel.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: {
    OptionPanelTabs,
    ImageUploadDialog,
    ResponsiveSizeTabPanel
  },
  mixins: [mixinOptionPanel],
  data () {
    return {
      size: 'xl',
      responsiveOptions: ['xl', 'lg', 'md', 'sm', 'xs'],
      dialog: false,
      defaultOptions: {
        spaced: false,
        dark: false,
        inset: false,
        vertical: false,
        image: null,
        ImageStyle: null,
        ImageClassName: null,
        height: {
          xl: '',
          lg: '',
          md: '',
          sm: '',
          xs: ''
        },
        width: {
          xl: '',
          lg: '',
          md: '',
          sm: '',
          xs: ''
        },
        style: {},
        className: ''
      }
    }
  },
  methods: {
    toggleUploadDialog () {
      this.dialog = !this.dialog
    },
    onUpdateValue (urlList) {
      this.localOptions.image = urlList[0]
    }
  }
})
</script>

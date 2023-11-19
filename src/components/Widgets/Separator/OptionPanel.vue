<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row q-col-gutter-md">
          <div class="col-3">
            <q-checkbox v-model="localOptions.spaced"
                        label="spaced"
                        left-label />
          </div>
          <div class="col-3">
            <q-checkbox v-model="localOptions.dark"
                        label="dark"
                        left-label />
          </div>
          <div class="col-3">
            <q-checkbox v-model="localOptions.inset"
                        label="inset"
                        left-label />
          </div>
          <div class="col-3">
            <q-checkbox v-model="localOptions.vertical"
                        label="vertical"
                        left-label />
          </div>
          <div class="col-md-12">
            <div class="outSideLabel">
              image
            </div>
            <q-input v-model="localOptions.image"
                     label="Image Link">
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
          <div class="col-md-4">
            <div class="outSideLabel">
              responsive size
            </div>
            <q-select v-model="size"
                      :options="responsiveOptions" />
          </div>
          <div class="col-md-4">
            <div class="outSideLabel">
              height ({{size}})
            </div>
            <q-input v-model="localOptions.height[size]"
                     label="height" />
          </div>
          <div class="col-md-4">
            <div class="outSideLabel">
              width ({{size}})
            </div>
            <q-input v-model="localOptions.width[size]"
                     label="width" />
          </div>
        </div>
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

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs, ImageUploadDialog },
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

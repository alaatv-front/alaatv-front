<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container q-my-md">
        <div class="outsideLabel">border radius</div>
        <q-input v-model="localOptions.style.borderRadius" />
        <div class="btn-options">
          <h4 class="text-center">Button</h4>
          <div class="row q-gutter-sm">
            <div class="input-container col-md-3">
              <div class="outsideLabel">label</div>
              <q-input v-model="localOptions.button.label"
                       label="label" />
            </div>
            <div class="input-container col-md-2">
              <div class="outsideLabel">icon name</div>
              <q-input v-model="localOptions.button.icon"
                       label="icon name" />
            </div>
            <div v-if="!localOptions.button.flat"
                 class="col-md-5 row">
              <div class="input-container col-md-6">
                <div class="outsideLabel">background color</div>
                <q-input v-model="localOptions.button.style.background"
                         icon="colorize"
                         label="background color">
                  <template v-slot:append>
                    <q-icon name="colorize"
                            class="cursor-pointer">
                      <q-popup-proxy cover
                                     transition-show="scale"
                                     transition-hide="scale">
                        <q-color v-model="localOptions.button.style.background"
                                 label="backgroundColor"
                                 format-model="rgba" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="input-container col-md-5 q-mx-sm">
                <div class="outsideLabel">color</div>
                <q-input v-model="localOptions.button.style.color"
                         label="color">
                  <template v-slot:append>
                    <q-icon name="colorize"
                            class="cursor-pointer">
                      <q-popup-proxy cover
                                     transition-show="scale"
                                     transition-hide="scale">
                        <q-color v-model="localOptions.button.style.color"
                                 label="backgroundColor"
                                 format-model="rgba" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
            <div v-else
                 class="col-md-4">
              <div class="input-container col-md-12">
                <div class="outsideLabel">color</div>
                <q-input v-model="localOptions.button.style.color"
                         label="color">
                  <template v-slot:append>
                    <q-icon name="colorize"
                            class="cursor-pointer">
                      <q-popup-proxy cover
                                     transition-show="scale"
                                     transition-hide="scale">
                        <q-color v-model="localOptions.button.style.color"
                                 label="backgroundColor"
                                 format-model="rgba" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
            <div class="input-container col-md-1">
              <div class="outsideLabel">flat</div>
              <q-checkbox v-model="localOptions.button.flat"
                          left-label />
            </div>
          </div>
          <div class="row q-col-gutter-sm">
            <div class="input-container col-md-2">
              <div class="outsideLabel">action</div>
              <q-select v-model="localOptions.button.action"
                        :options="actionOptions" />
            </div>
            <div v-if="localOptions.button.action === 'scroll'"
                 class="input-container col-md-10">
              <div class="outsideLabel">scrollTo</div>
              <q-input v-model="localOptions.button.scrollTo"
                       label="scrollTo" />
            </div>
            <div v-if="localOptions.button.action === 'link'"
                 class="input-container col-md-10">
              <div class="outsideLabel">route</div>
              <q-input v-model="localOptions.button.route"
                       label="route" />
            </div>
            <div v-if="localOptions.button.action === 'event'"
                 class="input-container col-md-5">
              <div class="outsideLabel">eventName</div>
              <q-input v-model="localOptions.button.eventName"
                       label="eventName" />
            </div>
            <div v-if="localOptions.button.action === 'event'"
                 class="input-container col-md-5">
              <div class="outsideLabel">eventArgs</div>
              <q-input v-model="localOptions.button.eventArgs"
                       label="eventArgs" />
            </div>
          </div>
        </div>
        <div class="img-options row q-gutter-sm q-my-md">
          <h4 class="text-center col-md-12">Image</h4>
          <div class="input-container col-md-3">
            <div class="outsideLabel">image source</div>
            <q-input v-model="localOptions.src"
                     label="image source" />
          </div>
          <div class="input-container col-md-3">
            <div class="outsideLabel">image width</div>
            <q-input v-model="localOptions.imageWidth"
                     label="image width" />
          </div>
          <div class="input-container col-md-3">
            <div class="outsideLabel">image height</div>
            <q-input v-model="localOptions.imageHeight"
                     label="image height" />
          </div>
        </div>
        <div class="text-options">
          <h4 class="text-center">text</h4>
          <editor v-model:value="localOptions.text" />
        </div>
        <editor-options v-model:options="localOptions.textOptions" />
      </div>
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
import Editor from 'components/Utils/Editor.vue'
import EditorOptions from 'components/EditorOptions.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: {
    OptionPanelTabs,
    Editor,
    EditorOptions
  },
  mixins: [mixinOptionPanel],
  data() {
    return {
      actionOptions: ['scroll', 'link', 'event'],
      positionOptions: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
      defaultOptions: {
        src: '',
        imageWidth: '50px',
        imageHeight: '50px',
        text: 'متن مورد نظر را وارد کنید ...',
        textOptions: {
          fontFamily: null,
          color: null,
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
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
        button: {
          style: {
            background: '',
            color: ''
          },
          color: null,
          icon: null,
          label: 'button',
          flat: false,
          callBack: null,
          imageSource: null,
          className: null,
          fixed: false,
          fixedPosition: null,
          action: null,
          scrollTo: null,
          route: null,
          eventName: null,
          eventArgs: null
        },
        style: {
          borderRadius: '15px'
        }
      }
    }
  }
})
</script>

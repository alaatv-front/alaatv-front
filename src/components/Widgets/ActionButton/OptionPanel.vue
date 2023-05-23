<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container q-py-md">
        <div class="row q-gutter-sm">
          <div class="input-container col-md-3">
            <div class="outsideLabel">label</div>
            <q-input v-model="localOptions.label"
                     label="label" />
          </div>
          <div class="input-container col-md-2">
            <div class="outsideLabel">icon name</div>
            <q-input v-model="localOptions.icon"
                     label="icon name" />
          </div>
          <div v-if="!localOptions.flat"
               class="col-md-5 row">
            <div class="input-container col-md-6">
              <div class="outsideLabel">background color</div>
              <q-input v-model="localOptions.style.background"
                       icon="colorize"
                       label="background color">
                <template v-slot:append>
                  <q-icon name="colorize"
                          class="cursor-pointer">
                    <q-popup-proxy cover
                                   transition-show="scale"
                                   transition-hide="scale">
                      <q-color v-model="localOptions.style.background"
                               label="backgroundColor"
                               format-model="rgba" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="input-container col-md-5 q-mx-sm">
              <div class="outsideLabel">color</div>
              <q-input v-model="localOptions.style.color"
                       label="color">
                <template v-slot:append>
                  <q-icon name="colorize"
                          class="cursor-pointer">
                    <q-popup-proxy cover
                                   transition-show="scale"
                                   transition-hide="scale">
                      <q-color v-model="localOptions.style.color"
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
              <q-input v-model="localOptions.style.color"
                       label="color">
                <template v-slot:append>
                  <q-icon name="colorize"
                          class="cursor-pointer">
                    <q-popup-proxy cover
                                   transition-show="scale"
                                   transition-hide="scale">
                      <q-color v-model="localOptions.style.color"
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
            <q-checkbox v-model="localOptions.flat"
                        left-label />
          </div>
          <div class="input-container col-md-2">
            <div class="outsideLabel">fix</div>
            <q-checkbox v-model="localOptions.fixed"
                        left-label />
          </div>
          <div class="input-container col-md-4">
            <div class="outsideLabel">flat</div>
            <q-select v-model="localOptions.fixedPosition"
                      :options="positionOptions"
                      left-label />
          </div>
        </div>
        <div class="input-container q-my-md">
          <div class="outsideLabel">image source</div>
          <q-input v-model="localOptions.imageSource"
                   label="image source" />
        </div>
        <div class="row q-col-gutter-sm">
          <div class="input-container col-md-2">
            <div class="outsideLabel">action</div>
            <q-select v-model="localOptions.action"
                      :options="actionOptions" />
          </div>
          <div v-if="localOptions.action === 'scroll'"
               class="input-container col-md-10">
            <div class="outsideLabel">scrollTo</div>
            <q-input v-model="localOptions.scrollTo"
                     label="scrollTo" />
          </div>
          <div v-if="localOptions.action === 'link'"
               class="input-container col-md-10">
            <div class="outsideLabel">route</div>
            <q-input v-model="localOptions.route"
                     label="route" />
          </div>
          <div v-if="localOptions.action === 'event'"
               class="input-container col-md-5">
            <div class="outsideLabel">eventName</div>
            <q-input v-model="localOptions.eventName"
                     label="eventName" />
          </div>
          <div v-if="localOptions.action === 'event'"
               class="input-container col-md-5">
            <div class="outsideLabel">eventArgs</div>
            <q-input v-model="localOptions.eventArgs"
                     label="eventArgs" />
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
      default() {
        return {}
      }
    }
  },
  data () {
    return {
      actionOptions: ['scroll', 'link', 'event'],
      positionOptions: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
      defaultOptions: {
        color: null,
        icon: null,
        label: null,
        flat: false,
        callBack: null,
        imageSource: null,
        className: null,
        fixed: false,
        fixedPosition: null,
        eventArgs: null,
        action: null,
        scrollTo: null,
        route: null,
        eventName: null
      }
    }
  },
  watch: {
    'localOptions.flat': function (val) {
      if (val) {
        this.localOptions.style.background = ''
      }
    },
    'localOptions.fixed': function (val) {
      if (!val) {
        this.localOptions.fixedPosition = null
      }
    }
  }
})
</script>

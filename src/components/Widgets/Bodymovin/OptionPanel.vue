<template>
  <option-panel-tabs v-model:options="localOptions"
                     :show-action-tab="true">
    <template #main-tab>
      <div class="option-panel-container q-my-md">
        <q-tabs v-model="responsiveTab">
          <q-tab v-for="(tab, index) in tabs"
                 :key="index"
                 :name=tab
                 :label=tab />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="responsiveTab"
                      animated>
          <q-tab-panel v-for="(tab, index) in tabs"
                       :key="index"
                       :name=tab>
            <div class="row q-col-gutter-md">
              <div class="col-3">
                <div class="outsidelabel">width</div>
                <q-input v-model="localOptions[tab].style.width" />
              </div>
              <div class="col-3">
                <div class="outsidelabel">height</div>
                <q-input v-model="localOptions[tab].style.height" />
              </div>
              <div class="col-3">
                <div class="outsidelabel">animation</div>
                <q-select v-model="localOptions.animate"
                          :options="animateOptions" />
              </div>
              <div class="col-3">
                <div class="outsidelabel">loop</div>
                <q-checkbox v-model="localOptions.loop" />
              </div>
              <div class="col-12">
                <div class="outsidelabel">animation directory 1</div>
                <q-input v-model="localOptions[tab].directory" />
              </div>
              <div v-if="localOptions.animate === 'in & out'"
                   class="col-12">
                <div class="outsidelabel">animation directory 2</div>
                <q-input v-model="localOptions[tab].directory2" />
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </template>
  </option-panel-tabs>
</template>

<script>
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default {
  name: 'OptionPanel',
  components: { OptionPanelTabs },
  mixins: [mixinOptionPanel],
  data () {
    return {
      responsiveTab: 'lg',
      tabs: ['xl', 'lg', 'md', 'sm', 'xs'],
      animateOptions: ['autoPlay', 'onClick', 'onHover', 'onInterSection', 'onInterSectionOnce', 'in & out'],
      defaultOptions: {
        loop: true,
        animate: 'autoPlay',
        autoplay: true,
        xs: {
          directory: '',
          directory2: '',
          style: {
            width: null,
            height: null
          }
        },
        sm: {
          directory: '',
          directory2: '',
          style: {
            width: null,
            height: null
          }
        },
        md: {
          directory: '',
          directory2: '',
          style: {
            width: null,
            height: null
          }
        },
        lg: {
          directory: '',
          directory2: '',
          style: {
            width: null,
            height: null
          }
        },
        xl: {
          directory: '',
          directory2: '',
          style: {
            width: null,
            height: null
          }
        },
        action: {
          hasAction: false,
          actionName: null,
          scrollTo: null,
          route: null,
          eventName: null,
          eventArgs: null
        }
      }
    }
  }
}
</script>

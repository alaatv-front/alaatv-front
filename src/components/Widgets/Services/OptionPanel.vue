<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row">
          <div class="col">
            <q-list separator>
              <q-item v-for="(service, serviceIndex) in localOptions.services"
                      :key="'service-'+serviceIndex">
                <q-item-section>
                  <q-item-label>
                    <q-input v-model="service.title"
                             label="title" />
                    <br>
                    <q-input v-model="service.subTitle"
                             label="subTitle" />
                    <br>
                  </q-item-label>
                  <q-item-label caption
                                lines="2">
                    <q-input v-model="service.icon"
                             label="icon" />
                    <br>
                    <div class="row q-col-gutter-md">
                      <div class="col-md-3">
                        <div class="outsideLabel">action</div>
                        <q-select v-model="service.action"
                                  :options="actionsOptions" />
                      </div>
                      <div class="col-md-9">
                        <div class="outsideLabel">{{service.action}}</div>
                        <q-input v-if="service.action === 'link'"
                                 v-model="service.link"
                                 label="link" />
                        <q-input v-else-if="service.action === 'scroll'"
                                 v-model="service.scrollTo"
                                 label="scroll to" />
                      </div>
                    </div>
                  </q-item-label>
                </q-item-section>
                <q-item-section avatar>
                  <q-img :src="service.icon" />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>

<script>
import { defineComponent } from 'vue'
import { PageBuilderOptionPanel } from 'src/mixin/Mixins.js'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs },
  mixins: [PageBuilderOptionPanel],
  data() {
    return {
      actionsOptions: ['scroll', 'link'],
      defaultOptions: {
        className: '',
        style: {},
        services: []
      }
    }
  }
})
</script>

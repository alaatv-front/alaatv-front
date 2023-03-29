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
                    <q-input v-model="service.link"
                             label="link" />
                    <br>
                    <q-input v-model="service.icon"
                             label="icon" />
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
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs },
  mixins: [mixinOptionPanel],
  data() {
    return {
      defaultOptions: {
        className: '',
        style: {},
        services: []
      }
    }
  }
})
</script>

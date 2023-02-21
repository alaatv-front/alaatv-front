<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row">
          <div class="col">
            <q-list bordered>
              <q-item v-for="(service, serviceIndex) in localOptions.services"
                      :key="'service-'+serviceIndex"
                      v-ripple
                      clickable>
                <q-item-section>
                  <q-input v-model="service.link"
                           label="link" />
                  <q-input v-model="service.icon"
                           label="icon" />
                  <q-input v-model="service.title"
                           label="title" />
                  <q-input v-model="service.subTitle"
                           label="subTitle" />
                  <q-img :src="service.icon" />
                </q-item-section>
                <q-item-section thumbnail>
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
import { mixinOptionPanel, OptionPanelTabs } from 'quasar-ui-q-page-builder'

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

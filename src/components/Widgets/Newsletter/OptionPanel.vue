<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row q-col-gutter-md">
          <div class="col-md-6 q-my-sm">
            <div class="outsideLabel">event name</div>
            <q-input v-model="localOptions.eventName" />
          </div>
          <div class="col-md-6 q-my-sm">
            <div class="outsideLabel">event id</div>
            <q-input v-model="localOptions.eventId" />
          </div>
          <div class="col-md-2">
            <div class="outsideLabel">verification</div>
            <q-checkbox v-model="localOptions.verification" />
          </div>
          <div class="col-md-2">
            <div class="outsideLabel">first name</div>
            <q-checkbox v-model="localOptions.userInputs.first_name" />
          </div>
          <div class="col-md-2">
            <div class="outsideLabel">last name</div>
            <q-checkbox v-model="localOptions.userInputs.last_name" />
          </div>
          <div class="col-md-2">
            <div class="outsideLabel">major</div>
            <q-checkbox v-model="localOptions.userInputs.major" />
          </div>
          <div class="col-md-2">
            <div class="outsideLabel">grade</div>
            <q-checkbox v-model="localOptions.userInputs.grade" />
          </div>
        </div>
        <div class="row q-col-gutter-md q-mt-xs">
          <div class="col-md-2">
            <div class="outsideLabel">has Redirect</div>
            <q-checkbox v-model="localOptions.hasRedirect" />
          </div>
          <div v-if="localOptions.hasRedirect"
               class="col-12 col-md-10">
            <q-input v-model="localOptions.redirectUrl"
                     type="text"
                     label="URL" />
          </div>
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>
<script>
import { PageBuilderOptionPanel } from 'src/mixin/Mixins'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default {
  name: 'OptionPanel',
  components: { OptionPanelTabs },
  mixins: [PageBuilderOptionPanel],
  data () {
    return {
      defaultOptions: {
        eventName: 'showNewsletter',
        verification: true,
        hasRedirect: false,
        redirectUrl: '',
        eventId: null,
        userInputs: {
          first_name: true,
          last_name: true,
          major: true,
          grade: true
        }
      }
    }
  }
}
</script>

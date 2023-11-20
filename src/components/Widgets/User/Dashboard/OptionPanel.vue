<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row">
          <div class="col-md-3">
            <q-checkbox v-model="localOptions.accountInfo"
                        left-label
                        label="مشخصات حساب" />
          </div>
          <div class="col-md-3">
            <q-checkbox v-model="localOptions.personalInfo"
                        left-label
                        label="مشخصات فردی" />
          </div>
          <div class="col-md-3">
            <q-checkbox v-model="localOptions.educationalInfo"
                        left-label
                        label="مشخصات تحصیلی" />
          </div>
          <div class="col-md-3">
            <q-checkbox v-model="localOptions.contactInfo"
                        left-label
                        label="اطلاعات تماس" />
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
  data () {
    return {
      accountInfo: true,
      personalInfo: true,
      educationalInfo: true,
      contactInfo: true,
      defaultOptions: {
        accountInfo: true,
        personalInfo: true,
        educationalInfo: true,
        contactInfo: true,
        className: '',
        height: 'auto',
        boxed: false,
        boxedWidth: 1200,
        style: {}
      }
    }
  }
})
</script>

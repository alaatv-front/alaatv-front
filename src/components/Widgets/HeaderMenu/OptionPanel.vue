<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="input-container q-py-md">
          <div class="outsideLabel">لینک لوگو</div>
          <q-input v-model="localOptions.logoImage"
                   label="logoImage" />
        </div>
        <div class="input-container q-py-md">
          <div class="outsideLabel">متن لوگو</div>
          <q-input v-model="localOptions.logoSlogan"
                   label="logoSlogan" />
        </div>
        <q-card class="custom-card">
          <q-card-section>
            <q-expansion-item v-for="(item, index) in options.menuLink"
                              :key="index"
                              expand-separator>
              <template v-slot:header>
                <q-btn color="negative"
                       icon="close"
                       size="14px"
                       class="q-mr-sm"
                       @click="removeItem(index)" />
                <q-input v-model="item.label"
                         label="label" />
              </template>
              <div class="text">
                <div class="input-container q-py-md">
                  <div>نوع آیتم انتخاب کنید:</div>
                  <q-radio v-model="item.type"
                           val="link"
                           class="q-mr-md"
                           label="لینک" />
                  <q-radio v-model="item.type"
                           val="scroll"
                           class="q-mr-md"
                           label="اسکرول به بخش های دیگر همین صفحه" />
                </div>
              </div>
              <div v-if="item.type && item.type === 'link'">
                <div class="outsideLabel">لینک صفحه</div>
                <q-input v-model="item.route" />
              </div>
              <div v-if="item.type && item.type === 'scroll'">
                <div class="outsideLabel">کلاس المان مربوطه</div>
                <q-input v-model="item.className" />
              </div>
            </q-expansion-item>
          </q-card-section>

          <div class="row q-gutter-xs justify-center">
            <q-btn color="positive"
                   class="full-width"
                   label="add Item"
                   @click="addItem" />
          </div>
        </q-card>
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
  data() {
    return {
      menuLinkType: ''
    }
  },
  watch: {
    localOptions: {
      handler(newVal) {
        this.$emit('update:options', newVal)
      },
      deep: true
    }
  },
  methods: {
    addItem () {
      this.localOptions.menuLink.push([])
    },
    removeItem (itemIndex) {
      this.localOptions.menuLink.splice(itemIndex, 1)
    }
  }
})
</script>

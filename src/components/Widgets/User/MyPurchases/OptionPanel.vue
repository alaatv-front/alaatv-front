<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row q-col-gutter-md">
          <div class="input-container col-12 q-mt-md">

            <div class="outsideLabel">لیست فیلتر های محصولات</div>
            <q-input v-model="filterItem"
                     label="فیلتر"
                     @keydown.enter.prevent="addItem">
              <template v-slot:append>
                <q-btn round
                       dense
                       flat
                       icon="add"
                       @click="addItem" />
              </template>
            </q-input>
          </div>
          <div class="input-container col-12 q-mt-md">

            <q-list bordered>
              <q-item v-for="(item, index) in localOptions.filterBoxCategory"
                      :key="index"
                      clickable>
                <q-item-section>
                  <div class="row q-col-gutter-lg-md">
                    <div class="col-md-4 col-12">
                      <q-input v-model="localOptions.filterBoxCategory[index].name"
                               label="نام ظاهری" />
                    </div>
                    <div class="col-md-4 col-12">
                      <q-input v-model="localOptions.filterBoxCategory[index].value"
                               label="مقدار فیلتر" />
                    </div>
                    <div class="col-md-4 col-12">
                      <q-checkbox v-model="localOptions.filterBoxCategory[index].selected"
                                  label="انتخاب شده پیشفرض" />
                    </div>
                  </div>
                </q-item-section>
                <q-item-section side>
                  <q-btn color="primary"
                         icon="delete"
                         flat
                         @click="deleteItem(index)" />
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
  data () {
    return {
      filterItem: '',
      defaultOptions: {
        filterBoxCategory: []
      }
    }
  },
  methods: {
    deleteItem (index) {
      this.defaultOptions.filterBoxCategory.splice(index, 1)
    },
    addItem () {
      this.defaultOptions.filterBoxCategory.push({
        name: this.filterItem,
        selected: false,
        value: null
      })
      this.filterItem = ''
    }
  }
})
</script>

<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="row q-col-gutter-md">
        <div class="col-md-4 col-12">
          <div>نوع لود شدن</div>
          <q-select v-model="localOptions.loadType"
                    :options="[
                      {
                        label: 'OnLoadPage',
                        value: 'OnLoadPage'
                      },
                      {
                        label: 'OnEvent',
                        value: 'OnEvent'
                      }
                    ]"
                    emit-value
                    map-options />
        </div>
        <div class="col-md-4 col-12">
          <div>conductor id</div>
          <q-input v-model="localOptions.conductorId"
                   class="q-mr-sm"
                   dense />
        </div>
        <div v-if="localOptions.loadType === 'OnEvent'"
             class="col-md-4 col-12">
          <div>نام event</div>
          <q-input v-model="localOptions.eventName"
                   class="q-mr-sm"
                   dense />
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>

<script>
import { Product } from 'src/models/Product.js'
import { PageBuilderOptionPanel } from 'src/mixin/Mixins.js'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default {
  name: 'ShowLiveClassesLinkOptionPanel',
  components: {
    OptionPanelTabs
  },
  mixins: [PageBuilderOptionPanel],
  data () {
    return {
      defaultOptions: {
        loadType: 'OnLoadPage', // OnLoadPage - OnEvent
        eventName: 'ShowLiveConductor',
        conductorId: null
      },
      layoutOptions: ['ScrollRow', 'GridRow'],
      productId: null,
      currentTabIndex: '',
      specialProductId: '',
      dialogProductId: '',
      productDialog: false
    }
  },
  methods: {
    openProduct (id) {
      if (!id) {
        return
      }
      this.dialogProductId = id
      this.productDialog = true
    },
    removeProduct (id, productIndex) {
      if (!this.localOptions.data[productIndex]) {
        return
      }
      this.localOptions.data.splice(productIndex, 1)
    },
    addProduct (id) {
      const peoductId = Number(id)
      const newProduct = new Product({ id: peoductId })
      this.localOptions.data.push(newProduct)

      this.cancelProduct()
    },
    cancelProduct () {
      this.productDialog = false
      this.currentTabIndex = ''
      this.specialProductId = ''
      this.productId = null
    }
  }
}
</script>

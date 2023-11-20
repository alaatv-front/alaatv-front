<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="scroll-row-container">
        <hr>
        <div class="row">
          <div class="col-md-12 q-ml-md">
            <div class="outsideLabel">نام event</div>
            <div class="flex items-center">
              <q-input v-model="localOptions.eventName"
                       class="q-mr-sm"
                       dense />
            </div>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-md-12 q-ml-md">
            <div class="outsideLabel">اضافه کردن محصول</div>
            <div class="flex items-center">
              <q-input v-model="productId"
                       class="q-mr-sm"
                       dense
                       label="id" />
              <div>
                <q-btn color="positive"
                       icon="check"
                       class="q-mr-sm"
                       @click="openProduct(productId)" />
              </div>
            </div>
          </div>
        </div>
        <q-card class="custom-card bg-grey-1">
          <q-list v-for="(product, productIndex) in localOptions.data"
                  :key="productIndex">
            <q-item v-ripple
                    class=" shadow-3"
                    tag="label">
              <q-item-section>
                <q-item-label>{{product.id}}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn color="negative"
                       icon="close"
                       size="10px"
                       class="q-mr-sm"
                       @click="removeProduct(product.id,productIndex)" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
        <hr>
        <q-dialog v-model="productDialog"
                  persistent>
          <q-card class="custom-card q-ma-md">
            <product-item class="product-item"
                          :options="{
                            productId: dialogProductId
                          }" />
            <div class="q-ma-md">
              <div class="row q-gutter-xs justify-center">
                <q-btn color="positive"
                       class="full-width"
                       label="محصول را اضافه کن"
                       @click="addProduct(dialogProductId)" />
                <q-btn color="negative"
                       class="full-width"
                       label="بیخیال"
                       @click="cancelProduct(dialogProductId)" />
              </div>
            </div>
          </q-card>
        </q-dialog>
      </div>
    </template>
  </option-panel-tabs>
</template>

<script>
import { Product } from 'src/models/Product.js'
import { PageBuilderOptionPanel } from 'src/mixin/Mixins.js'
import ProductItem from 'src/components/Widgets/Product/ProductItem/ProductItem.vue'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default {
  name: 'ShowLiveClassesLinkOptionPanel',
  components: {
    ProductItem,
    OptionPanelTabs
  },
  mixins: [PageBuilderOptionPanel],
  data () {
    return {
      defaultOptions: {
        data: [],
        style: {},
        eventName: 'showLiveClassesLink'
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
<script setup>
</script>

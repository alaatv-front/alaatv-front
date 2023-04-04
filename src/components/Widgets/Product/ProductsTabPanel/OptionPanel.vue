<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container q-py-md">
        <q-card class="custom-card">
          <q-card-section>
            <q-expansion-item v-for="(item, index) in value.tabsList"
                              :key="index"
                              expand-separator>
              <template v-slot:header>
                <q-btn color="negative"
                       icon="close"
                       class="q-mr-sm"
                       @click="removeTabPanel(index)" />
                <q-input v-model="item.label"
                         autogrow
                         label="label" />
              </template>
              <div class="text">
                <div class="flex items-center">
                  <div class="q-mr-sm">اضافه کردن محصول</div>
                  <q-input v-model="productId"
                           class="q-mr-sm"
                           dense
                           label="id" />
                  <div>
                    <q-btn color="positive"
                           icon="check"
                           class="q-mr-sm"
                           @click="openProduct(productId,index)" />
                  </div>
                </div>
                <q-card class="custom-card bg-grey-1">
                  <q-list v-for="(product, productIndex) in item.products"
                          :key="productIndex">
                    <q-item v-ripple
                            class=" shadow-3"
                            tag="label">
                      <q-item-section>
                        <q-item-label>{{product}}</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-btn color="negative"
                               icon="close"
                               size="10px"
                               class="q-mr-sm"
                               @click="removeProduct(product,index)" />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card>
              </div>
              <div class="text q-mt-md">
                <div class="flex items-center">
                  <div class="q-mr-sm">اضافه کردن محصول خاص</div>
                  <q-input v-model="specialProductId"
                           class="q-mr-sm"
                           autogrow
                           label="id" />
                  <div>
                    <q-btn color="positive"
                           icon="check"
                           class="q-mr-sm"
                           @click="openProduct(specialProductId,index, true)" />
                  </div>
                </div>
                <q-card class="custom-card bg-grey-1">
                  <q-list v-for="(product, productIndex) in item.spacialProducts"
                          :key="productIndex">
                    <q-item v-ripple
                            tag="label">
                      <q-item-section>
                        <q-item-label>{{product}}</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-btn color="negative"
                               icon="close"
                               size="10px"
                               class="q-mr-sm"
                               @click="removeProduct(product,index,true)" />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card>
              </div>
            </q-expansion-item>
          </q-card-section>

          <div class="row q-gutter-xs justify-center">
            <q-btn color="positive"
                   class="full-width"
                   label="اضافه کردن تب پنل جدید"
                   @click="addTabPanel" />
          </div>
        </q-card>
      </div>
    </template>
  </option-panel-tabs>
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
</template>
<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
import ProductItem from 'components/Widgets/Product/ProductItem/ProductItem.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { ProductItem, OptionPanelTabs },
  mixins: [ProductItem, mixinOptionPanel],
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data () {
    return {
      productId: '',
      currentTabIndex: '',
      specialProductId: '',
      isSpecial: false,
      dialogProductId: '',
      productDialog: false
    }
  },
  computed: {
    value: {
      get() {
        return this.options
      },
      set(value) {
        this.localOptions = value
      }
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
    removeProduct (id, tabIndex, isSpecial = false) {
      const tabObject = this.localOptions.tabsList[tabIndex]
      let productIndex
      if (isSpecial) {
        productIndex = tabObject.specialProducts
          .findIndex((item) => item === id)
        tabObject.specialProducts.splice(productIndex, 1)
      } else {
        productIndex = tabObject.products
          .findIndex((item) => item === id)
        tabObject.products.splice(productIndex, 1)
      }
      this.localOptions.tabsList[tabIndex] = tabObject
    },
    openProduct (id, tabIndex, isSpecial = false) {
      this.dialogProductId = id
      this.currentTabIndex = tabIndex
      this.productDialog = true
      this.isSpecial = isSpecial
    },
    addProduct (id) {
      if (this.isSpecial) {
        this.localOptions.tabsList[this.currentTabIndex].specialProducts.push(id)
      } else {
        this.localOptions.tabsList[this.currentTabIndex].products.push(id)
      }
      this.cancelProduct()
    },
    cancelProduct () {
      this.isSpecial = false
      this.productDialog = false
      this.currentTabIndex = ''
      this.specialProductId = ''
      this.productId = ''
    },
    addTabPanel () {
      const newTab = {
        name: 'tabNumber' + this.localOptions.tabsList.length,
        products: [],
        specialProducts: []
      }
      this.value.tabsList.push(newTab)
    },
    removeTabPanel (itemIndex) {
      this.value.tabsList.splice(itemIndex, 1)
    }
  }
})
</script>
<style lang="scss" scoped>
:deep(.q-card.custom-card) {
  :not([class^=col]) {
    box-shadow: none;
  }
  .custom-card {
    width: 150px;
  }
}
</style>

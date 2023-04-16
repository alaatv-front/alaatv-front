<template>
  <div>
    <div class="option-panel-container q-py-md">
      <q-card class="custom-card">
        <div class="row q-col-gutter-md">
          <div class="col-md-6">
            <div class="outSideLabel">
              productGroupLayout
            </div>
            <q-radio v-model="value.productGroupLayout"
                     label="tab"
                     val="tab" />
            <q-radio v-model="value.productGroupLayout"
                     label="shelf"
                     val="shelf" />
          </div>
          <div class="col-md-6">
            <div class="outSideLabel">
              rowLayout
            </div>
            <q-radio v-model="value.rowLayout"
                     label="scroll"
                     val="scroll" />
            <q-radio v-model="value.rowLayout"
                     label="grid"
                     val="grid" />
          </div>
        </div>

        <q-card-section>
          <q-expansion-item v-for="(item, index) in value.list"
                            :key="index"
                            expand-separator>
            <template v-slot:header>
              <q-btn color="negative"
                     icon="close"
                     class="q-mr-sm"
                     @click="removeTabPanel(index)" />
              <q-input v-model="item.label"
                       autogrow
                       class="full-width"
                       label="label" />
            </template>
            <div v-if="item.type === 'product'">
              <div class="layout q-pa-md">
                <div class="outSideLabel">
                  rowLayout
                </div>
                <q-radio v-model="item.rowLayout"
                         label="scroll"
                         val="scroll" />
                <q-radio v-model="item.rowLayout"
                         label="grid"
                         val="grid" />
              </div>
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
                  <q-list v-for="(product, productIndex) in item.specialProducts"
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
            </div>
            <div v-else>
              <tab-panel-component :options="item" />
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

<script>
import ProductItem from 'components/Widgets/Product/ProductItem/ProductItem.vue'

export default {
  name: 'component',
  components: { ProductItem },
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
        this.$emit('update:options', value)
      }
    }
  },
  watch: {
    // localOptions: {
    //   handler(newVal) {
    //     console.log(newVal)
    //     this.$emit('update:options', newVal)
    //   },
    //   deep: true
    // }
  },
  methods: {
    removeProduct (id, tabIndex, isSpecial = false) {
      const keyName = isSpecial ? 'specialProducts' : 'products'
      if (!this.value.list[tabIndex][keyName]) {
        return
      }
      const productIndex = this.value.list[tabIndex][keyName]
        .findIndex((item) => item === id)
      this.value.list[tabIndex][keyName].splice(productIndex, 1)
    },
    openProduct (id, tabIndex, isSpecial = false) {
      if (!id) {
        return
      }
      this.dialogProductId = id
      this.currentTabIndex = tabIndex
      this.productDialog = true
      this.isSpecial = isSpecial
    },
    addProduct (id) {
      const keyName = this.isSpecial ? 'specialProducts' : 'products'
      this.value.list[this.currentTabIndex][keyName].push(id)
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
        name: 'tabNumber' + this.value.list.length,
        products: [],
        specialProducts: []
      }
      this.value.list.push(newTab)
    },
    removeTabPanel (itemIndex) {
      this.value.list.splice(itemIndex, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
:deep(.q-card.custom-card) {
:not([class^=col]) {
  box-shadow: none;
}
.custom-card {
  //width: 150px;
}
}

</style>

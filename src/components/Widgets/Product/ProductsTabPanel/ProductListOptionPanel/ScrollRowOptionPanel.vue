<template>
  <div class="scroll-row-container">
    <div class="row q-ma-md q-col-gutter-md">
      <div class="col-md-3">
        <q-input v-model="localData.options.label"
                 label="label" />
      </div>
      <div v-if="localData.options.label && localData.options.labelStyle"
           class="col-md-3">
        <q-input v-model="localData.options.labelStyle.color"
                 label="label color" />
      </div>
      <div v-if="localData.options.label && localData.options.labelStyle"
           class="col-md-3">
        <q-input v-model="localData.options.labelStyle.fontSize"
                 label="label font size" />
      </div>
      <div v-if="localData.options.label && localData.options.labelStyle"
           class="col-md-3">
        <q-input v-model="localData.options.labelStyle.textAlign"
                 label="label align" />
      </div>
    </div>
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
               @click="openProduct(productId)" />
      </div>
    </div>
    <q-card class="custom-card bg-grey-1">
      <q-list v-for="(product, productIndex) in localData.data"
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
  name: 'productListScrollOptionPanel',
  components: {
    ProductItem
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      productId: null,
      currentTabIndex: '',
      specialProductId: '',
      dialogProductId: '',
      productDialog: false
    }
  },
  computed: {
    localData: {
      get() {
        return this.data
      },
      set(newVal) {
        this.$emit('update:data', newVal)
      }
    }
  },
  watch: {
    'localData.options.label': function (newVal) {
      if (newVal) {
        this.localData.options.labelStyle = {
          color: '',
          fontSize: '',
          textAlign: ''
        }
      }
    }
  },
  methods: {
    openProduct (id, tabIndex, isSpecial = false) {
      if (!id) {
        return
      }
      this.dialogProductId = id
      this.currentTabIndex = tabIndex
      this.productDialog = true
      this.isSpecial = isSpecial
    },
    removeProduct (id, tabIndex, isSpecial = false) {
      const keyName = isSpecial ? 'specialProducts' : 'products'
      if (!this.value.list[tabIndex][keyName]) {
        return
      }
      const productIndex = this.value.list[tabIndex][keyName]
        .findIndex((item) => item === id)
      this.value.list[tabIndex][keyName].splice(productIndex, 1)
    },
    addProduct (id) {
      const keyName = this.isSpecial ? 'specialProducts' : 'products'
      this.localData.list[this.currentTabIndex][keyName].push(id)
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

<style scoped>

</style>

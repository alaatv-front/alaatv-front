<template>
  <div class="option-panel-container">
    <div class="row">
      <div class="col-12">
        <!--        <q-input v-model="value.style.padding" />-->
      </div>
    </div>
    <component :is="value.type.concat('OptionPanel')"
               :item="value" />
  </div>
  <!--      <div class="row q-gutter-xs justify-center">-->
  <!--        <q-btn color="positive"-->
  <!--               class="full-width"-->
  <!--               label="اضافه کردن تب پنل جدید"-->
  <!--               @click="addTabPanel" />-->
  <!--      </div>-->
  <!--    <q-dialog v-model="productDialog"-->
  <!--              persistent>-->
  <!--      <q-card class="custom-card q-ma-md">-->
  <!--        <product-item class="product-item"-->
  <!--                      :options="{-->
  <!--                        productId: dialogProductId-->
  <!--                      }" />-->
  <!--        <div class="q-ma-md">-->
  <!--          <div class="row q-gutter-xs justify-center">-->
  <!--            <q-btn color="positive"-->
  <!--                   class="full-width"-->
  <!--                   label="محصول را اضافه کن"-->
  <!--                   @click="addProduct(dialogProductId)" />-->
  <!--            <q-btn color="negative"-->
  <!--                   class="full-width"-->
  <!--                   label="بیخیال"-->
  <!--                   @click="cancelProduct(dialogProductId)" />-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </q-card>-->
  <!--    </q-dialog>-->
</template>

<script>
import { defineAsyncComponent } from 'vue'
// import ProductItem from 'components/Widgets/Product/ProductItem/ProductItem.vue'
// import GroupListOptionPanel from 'components/Widgets/Product/ProductsTabPanel/GroupListOptionPanel/GroupListOptionPanel.vue'
// import ProductListOptionPanel from 'components/Widgets/Product/ProductsTabPanel/ProductListOptionPanel/ProductListOptionPanel.vue'

export default {
  name: 'component',
  components: {
    // ProductItem,
    // GroupListOptionPanel,
    // ProductListOptionPanel
    GroupListOptionPanel: defineAsyncComponent(() => import('./GroupListOptionPanel/GroupListOptionPanel.vue')),
    ProductListOptionPanel: defineAsyncComponent(() => import('./ProductListOptionPanel/ProductListOptionPanel.vue'))
  },
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
    },
    item: {
      get() {
        return this.data
      },
      set(newVal) {
        this.$emit('update:data', newVal)
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
    cancelProduct () {
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

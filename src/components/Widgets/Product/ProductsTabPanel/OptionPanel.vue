<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <tab-panel-component v-model:options="localOptions" />
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
import ProductItem from 'components/Widgets/Product/ProductItem/ProductItem.vue'
import tabPanelComponent from './tabPanelComponent.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs, tabPanelComponent },
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
        console.log(newVal)
        // this.$emit('update:options', newVal)
      },
      deep: true
    },
    options: {
      handler(newVal) {
        console.log(newVal)
        // this.$emit('update:options', newVal)
      },
      deep: true
    }
  },
  methods: {
    removeProduct (id, tabIndex, isSpecial = false) {
      const keyName = isSpecial ? 'specialProducts' : 'products'
      if (!this.localOptions.list[tabIndex][keyName]) {
        return
      }
      const productIndex = this.localOptions.list[tabIndex][keyName]
        .findIndex((item) => item === id)
      this.localOptions.list[tabIndex][keyName].splice(productIndex, 1)
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
      this.localOptions.list[this.currentTabIndex][keyName].push(id)
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
        name: 'tabNumber' + this.localOptions.list.length,
        products: [],
        specialProducts: []
      }
      this.value.list.push(newTab)
    },
    removeTabPanel (itemIndex) {
      this.value.list.splice(itemIndex, 1)
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
    //width: 150px;
  }
}
</style>

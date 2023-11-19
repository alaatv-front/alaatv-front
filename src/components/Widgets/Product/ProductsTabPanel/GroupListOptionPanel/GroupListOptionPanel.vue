<template>
  <div>
    <div v-if="localOptions.options.layout === 'ProductShelf'">
      <product-shelf-option-panel v-model:options="localOptions" />
    </div>
    <div v-else>
      <product-tab-option-panel v-model:options="localOptions" />
    </div>
    <div class="row q-gutter-xs justify-center q-my-md">
      <div class="col-md-5">
        <q-btn color="positive"
               class="full-width"
               label="اضافه کردن پنل گروهی جدید"
               @click="addGroupList" />
      </div>
      <div class="col-md-5">
        <q-btn color="positive"
               class="full-width"
               label="اضافه کردن پنل محصول جدید"
               @click="addProductList" />
      </div>
    </div>
  </div>
</template>

<script>
import productShelfOptionPanel from 'components/Widgets/Product/ProductsTabPanel/GroupListOptionPanel/ProductShelfOptionPanel.vue'
import ProductTabOptionPanel from 'components/Widgets/Product/ProductsTabPanel/GroupListOptionPanel/ProductTabOptionPanel.vue'
// import { PageBuilderOptionPanel } from 'src/mixin/Mixins.js'

export default {
  name: 'groupList',
  components: {
    productShelfOptionPanel,
    ProductTabOptionPanel
  },
  props: {
    options: {
      type: Object,
      default: () => {
      }
    }
  },
  // mixins: [PageBuilderOptionPanel],
  data() {
    return {
    }
  },
  computed: {
    localOptions: {
      get() {
        return this.options
      },
      set(newValue) {
        this.$emit('update:options', newValue)
      }
    }
  },
  methods: {
    addGroupList() {
      this.localOptions.data.push({
        options: { layout: 'ProductTab' },
        type: 'GroupList',
        data: []
      })
    },
    addProductList() {
      this.localOptions.data.push({
        options: {
          layout: 'ScrollRow',
          labelStyle: {
            color: '',
            fontSize: '',
            textAlign: ''
          },
          colNumber: 'col'
        },
        type: 'ProductList',
        data: []
      })
    }
  }
}
</script>

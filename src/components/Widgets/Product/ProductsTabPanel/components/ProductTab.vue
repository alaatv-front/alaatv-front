<template>
  <div class="tabs-wrapper">
    <q-tabs v-model="tabModel"
            :active-color="activeColor"
            :active-bg-color="activeBgColor"
            :indicator-color="indicatorColor"
            class="product-tabs">
      <q-tab v-for="(tab, index) in itemList"
             :key="index"
             :name="`productTab_${index}`"
             :label="tab.label"
             :icon="tab.icon"
             class="product-tab"
             content-class="product-tab-content" />
    </q-tabs>
  </div>
  <div class="tab-panels-wrapper">
    <q-tab-panels v-model="tabModel"
                  animated
                  class="product-tab-panels">
      <q-tab-panel v-for="(item, index) in itemList"
                   :key="index"
                   :name="`productTab_${index}`"
                   class="product-tab-panel">
        <product-tab-row v-if="isProduct(item)"
                         :loading="loading"
                         :layout="item.shelfRowLabelStyle"
                         :products-list="item.products"
                         :rowStyle="item.rowStyle"
                         :className="item.className" />
        <products-tab-panel v-else
                            :isWidget="false"
                            :options="item" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
// import ProductsTabPanel from '../ProductsTabPanel.vue'
import ProductTabRow from './ProductTabRow.vue'

export default {
  name: 'ProductsTab',
  components: {
    ProductsTabPanel: defineAsyncComponent(() =>
      import('../ProductsTabPanel.vue')
    ),
    ProductTabRow
  },
  props: {
    itemList: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    layout: {
      type: String,
      default: 'scroll'
    },
    activeColor: {
      type: String,
      default: 'primary'
    },
    activeBgColor: {
      type: String,
      default: 'white'
    },
    indicatorColor: {
      type: String,
      default: 'white'
    }
  },
  data() {
    return {
      tabModel: ''
    }
  },
  mounted() {
    this.tabModel = 'productTab_0'
  },
  methods: {
    isProduct(item) {
      return item.type === 'product'
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs-wrapper {
  display: flex;
  overflow-x: auto;
  justify-content: center;
  align-items: center;
  .product-tabs {
    display: flex;
    height: 62px;
    background: #F8F4F0;
    border-radius: 16px;
    padding: 5px;

    .product-tab {
      border-radius: 10px;
      margin: 5px;

      &:deep(.q-tab__content .q-focus-helper) {
        display: none;
      }

      &:deep(.q-tab__label) {
        font-size: 18px;
        line-height: 31px;
        text-align: center;
        font-weight: 700;
        padding: 0 15px;
      }
    }
  }
}
.tab-panels-wrapper {

  .product-tab-panels {
    background: transparent;
    .product-tab-panel {
      .product-panel-content {
        justify-content: space-between;
        padding: 40px 0;
        width: 100%;

        &.special {
          padding: 15px 15px 5px;
          border-radius: 30px;
          background: #F9F4EF;
        }

        @media screen and (max-width: 600px){
          padding: 0;

          &.special {
            padding: 5px;
          }
        }
      }
    }
  }

}
</style>

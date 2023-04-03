<template>
  <div class="products-tab-panel-container">
    <div class="tabs-wrapper">
      <q-tabs v-model="tab"
              active-color="primary"
              active-bg-color="white"
              class="product-tabs">
        <q-tab v-for="(tab, index) in tabsList"
               :key="index"
               :name="tab.name"
               :label="tab.label"
               class="product-tab"
               content-class="product-tab-content" />
      </q-tabs>
    </div>
    <div class="tab-panels-wrapper">
      <q-tab-panels v-model="tab"
                    animated
                    class="product-tab-panels">
        <q-tab-panel v-for="(tab, index) in tabsList"
                     :key="index"
                     :name="tab.name"
                     class="product-tab-panel">
          <div v-if="tab.spacialProducts"
               class="product-panel-spacial-content">
            <product-item v-for="(product, index) in tab.spacialProducts"
                          :key="index"
                          :options="{productId: product}"
                          class="product-item" />
          </div>
          <div class="product-panel-content">
            <product-item v-for="(product, index) in tab.products"
                          :key="index"
                          :options="{productId: product}"
                          class="product-item" />
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import ProductItem from '../ProductItem/ProductItem.vue'

export default {
  name: 'ProductsTabPanel',
  components: {
    ProductItem
  },
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      title: '',
      subtitle: '',
      tab: '',
      tabsList: []
    }
  },
  watch: {
    options: {
      handler() {
        this.loadConfig()
      }
    }
  },
  mounted() {
    this.loadConfig()
  },
  methods: {
    loadConfig() {
      this.tabsList = this.options.tabsList
      this.tab = this.options.tabsList[0]?.name
    }
  }
}
</script>

<style lang="scss" scoped>
.products-tab-panel-container {
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 41px;
    letter-spacing: -0.02em;
    color: #575962;
    margin-bottom: 30px;
    text-align: center;
  }

  .subtitle{
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 31px;
    letter-spacing: -0.02em;
    color: #575962;
    text-align: center;
    margin-top: 20px;
  }

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
      .product-tab-panel {
        .product-panel-spacial-content {
          display: flex;
          overflow-x: auto;
          justify-content: space-between;
          align-items: center;
          padding: 15px 15px 5px;
          border-radius: 30px;
          background: #F9F4EF;
          @media screen and (max-width: 600px){
            flex-direction: column;
          }
        }
        .product-panel-content {
          display: flex;
          overflow-x: auto;
          justify-content: space-between;
          align-items: center;
          padding: 40px 0;
          width: 100%;

          @media screen and (max-width: 600px){
            flex-direction: column;
            padding: 0;
          }
        }
      }
    }

  }
}
</style>

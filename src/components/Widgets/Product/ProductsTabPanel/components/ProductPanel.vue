<template>
  <div v-for="(item, index) in data"
       :key="index"
       :style="options.style"
       :class="options.className"
       class="product-shelf-row">
    <component :is="item.type"
               :loading="loading"
               :data="item.data"
               :options="item.options" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'ProductsPanel',
  components: {
    GroupList: defineAsyncComponent(() =>
      import('./GroupList/GroupList.vue')
    ),
    ProductList: defineAsyncComponent(() =>
      import('./ProductList/ProductList.vue')
    )
  },
  props: {
    options: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  methods: {
    isProduct(item) {
      return item.type === 'ProductList'
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
}
.product-shelf-row {

}
</style>

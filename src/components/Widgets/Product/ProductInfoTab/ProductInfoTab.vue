<template>
  <q-tabs v-model="tab"
          inline-label
          outside-arrows
          mobile-arrows
          align="left"
          breakpoint="md"
          indicator-color="primary"
          active-color="primary"
          class="text-grey">
    <q-tab name="description"
           label="توضیحات دوره" />
    <q-tab name="sections"
           disable
           label="سرفصل ها" />
    <q-tab name="faq"
           disable
           label="سوالات متداول" />
  </q-tabs>
  <q-tab-panels v-model="tab"
                animated>
    <q-tab-panel name="description">
      <div class="product-description-tab-panel">
        <div class="product-description-title">
          توضیحات تکمیلی دوره
        </div>
        <div class="product-long-description"
             v-html="localOptions.product.description?.long" />
      </div>
    </q-tab-panel>
    <q-tab-panel name="sections">
      سرفصل ها
    </q-tab-panel>
    <q-tab-panel name="faq">
      سوالات متداول
    </q-tab-panel>
  </q-tab-panels>
</template>

<script>
import { defineComponent } from 'vue'
import { Product } from 'src/models/Product.js'
import { mixinWidget } from 'src/mixin/Mixins.js'

export default defineComponent({
  name: 'ProductInfoTab',
  mixins: [mixinWidget],
  data() {
    return {
      defaultOptions: {
        product: new Product()
      },
      tab: 'description'
    }
  }
})
</script>

<style lang="scss" scoped>
.product-description-tab-panel {
  padding: 30px;
  .product-description-title {
    color:#424242;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
}
</style>

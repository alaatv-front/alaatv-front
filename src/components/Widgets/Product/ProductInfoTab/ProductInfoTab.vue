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
    <q-tab name="documents"
           :disable="contents.list.length === 0"
           label="فیلم و جزوه" />
    <q-tab name="gifts"
           :disable="gifts.list.length === 0"
           label="هدیه ها" />
    <q-tab name="faq"
           :disable="faqList.length === 0"
           label="سوالات متداول" />
  </q-tabs>
  <q-tab-panels v-model="tab"
                animated>
    <q-tab-panel name="description"
                 class="product-tab-panel">
      <div class="product-tab-panel">
        <div class="product-description-title">
          توضیحات تکمیلی دوره
        </div>
        <div class="product-long-description"
             v-html="localOptions.product.description?.long" />
      </div>
    </q-tab-panel>
    <q-tab-panel name="sections"
                 class="product-tab-panel">
      سرفصل ها
    </q-tab-panel>
    <q-tab-panel name="documents">
      <div class="product-tab-panel">
        <product-demos :options="{
          contents: contents,
          product: localOptions.product
        }" />
      </div>
    </q-tab-panel>
    <q-tab-panel name="gifts">
      <div class="product-tab-panel">
        <product-gifts :options="{products: gifts}" />
      </div>
    </q-tab-panel>
    <q-tab-panel class="product-tab-panel"
                 name="faq">
      <product-f-a-q :faqList="faqList" />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script>
import { defineComponent } from 'vue'
import { Product, ProductList } from 'src/models/Product.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { ContentList } from 'src/models/Content.js'
import ProductGifts from 'src/components/Widgets/Product/ProductGifts/ProductGifts.vue'
import ProductDemos from 'src/components/Widgets/Product/ProductDemos/ProductDemos.vue'
import ProductFAQ from 'src/components/Widgets/Product/ProductFAQ/ProductFAQ.vue'

export default defineComponent({
  name: 'ProductInfoTab',
  components: {
    ProductGifts,
    ProductDemos,
    ProductFAQ
  },
  mixins: [mixinWidget],
  data() {
    return {
      defaultOptions: {
        product: new Product()
      },
      tab: 'description',
      gifts: new ProductList(),
      contents: new ContentList(),
      faqList: []
    }
  },
  mounted() {
    this.getProductGifts()
    this.getSampleContents()
    this.getProductFaq()
  },
  methods: {
    getProductGifts() {
      const productId = this.options.productId ? this.options.productId : this.options.paramKey ? this.$route.params[this.options.paramKey] : this.$route.params.id
      this.$apiGateway.product.gifts(productId)
        .then(productList => {
          this.gifts = productList
        })
        .catch(() => {})
    },
    getSampleContents() {
      const productId = this.options.productId ? this.options.productId : this.options.paramKey ? this.$route.params[this.options.paramKey] : this.$route.params.id
      return this.$apiGateway.product.sampleContent(productId)
        .then(contentList => {
          this.contents = contentList
        })
        .catch(() => {

        })
    },
    getProductFaq() {
      const productId = this.options.productId ? this.options.productId : this.options.paramKey ? this.$route.params[this.options.paramKey] : this.$route.params.id
      return this.$apiGateway.product.getProductFaq(productId)
        .then(faqList => {
          this.faqList = faqList
        })
        .catch(() => {

        })
    }
  }
})
</script>

<style lang="scss" scoped>
.product-tab-panel {
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

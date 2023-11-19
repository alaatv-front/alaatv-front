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
    <q-tab v-if="setList.length !== 0"
           name="sections"
           label="سرفصل ها" />
    <q-tab v-if="contentListLength !== 0"
           name="documents"
           label="نمونه فیلم و جزوه" />
    <q-tab v-if="giftListLength !== 0"
           name="gifts"
           label="هدیه ها" />
    <q-tab v-if="faqListLength !== 0"
           name="faq"
           label="سوالات متداول" />
  </q-tabs>
  <q-tab-panels v-model="tab"
                animated>
    <q-tab-panel name="description"
                 class="product-tab-panel">
      <div class="product-description-title">
        توضیحات تکمیلی دوره
      </div>
      <div class="product-long-description"
           v-html="localOptions.product.description?.long" />
    </q-tab-panel>
    <q-tab-panel name="sections"
                 class="product-tab-panel">
      <product-set-list :options="{product: localOptions.product, setList:setList}"
                        @update-set-list="onUpdateSetList($event)" />
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
      <product-f-a-q :options="{faqList:faqList}" />
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
import ProductSetList from 'src/components/Widgets/Product/ProductSetList/ProductSetList.vue'

export default defineComponent({
  name: 'ProductInfoTab',
  components: {
    ProductGifts,
    ProductDemos,
    ProductFAQ,
    ProductSetList
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
      faqList: [],
      setList: []
    }
  },
  computed: {
    productId() {
      return this.localOptions.product.id ? this.localOptions.product.id : this.localOptions.paramKey ? this.$route.params[this.options.paramKey] : this.$route.params.id
    },
    setListLength() {
      return this.setList.length
    },
    contentListLength() {
      return this.contents.list.length
    },
    giftListLength() {
      return this.gifts.list.length
    },
    faqListLength() {
      return this.faqList.length
    }
  },
  watch: {
    productId() {
      this.getProductSets()
      this.getProductGifts()
      this.getSampleContents()
      this.getProductFaq()
    }
  },
  mounted() {
    if (this.productId) {
      this.getProductSets()
      this.getProductGifts()
      this.getSampleContents()
      this.getProductFaq()
    }
  },
  methods: {
    getProductGifts() {
      this.$apiGateway.product.gifts(this.productId)
        .then(productList => {
          this.gifts = productList
        })
        .catch(() => {})
    },
    getSampleContents() {
      return this.$apiGateway.product.sampleContent(this.productId)
        .then(contentList => {
          this.contents = contentList
        })
        .catch(() => {

        })
    },
    getProductFaq() {
      return this.$apiGateway.product.getProductFaq(this.productId)
        .then(faqList => {
          this.faqList = faqList
        })
        .catch(() => {

        })
    },
    getProductSets() {
      this.loading = true
      this.$apiGateway.product.getSets(this.productId)
        .then((setList) => {
          const normalizedSets = setList.list.map(set => {
            if (set.short_title !== null) {
              const splitted = set.short_title.split('-')
              const productName = splitted[0] ? splitted[0].trim() : 'متفرقه'
              const topicName = splitted[1] ? splitted[1].trim() : 'متفرقه'
              const setName = splitted[2] ? splitted[2].trim() : 'متفرقه'
              set.short_title = productName + '-' + topicName + '-' + setName

              return set
            } else {
              set.short_title = 'عنوان ندارد'
              return set
            }
          })

          this.setList = normalizedSets
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
    },
    onUpdateSetList(setList) {
      this.setList = setList
    }
  }
})
</script>

<style lang="scss" scoped>

.product-tab-panel {
  padding: 30px;

  @media screen and (width <= 1023px) {
    padding: 20px;
  }

  .product-description-title {
    color:#424242;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
}
</style>

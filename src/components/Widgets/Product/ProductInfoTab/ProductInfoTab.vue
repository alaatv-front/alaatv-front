<template>
  <div class="product-info-container">
    <div v-if="localOptions.product.children.length > 0"
         class="selectable-product">
      <div class="row items-center header">
        <lazy-img src="https://nodes.alaatv.com/upload/alaaPages/2023-11/Rectangle1700578454.png" />
        <h6 class="q-ml-sm">
          انتخاب محتوا
        </h6>
      </div>
      <div class="content">
        <div v-for="children in localOptions.product.children"
             :key="children"
             class="child-product-container">
          <child-product :product="children"
                         @add-child="addChildToProduct" />
        </div>
      </div>
    </div>
    <div ref="headerSticky"
         class="header-info"
         :class="{'sticky': isSticky}">
      <q-card>
        <q-card-section>
          <div class="row items-center">
            <div class="col-6">
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
                       label="توضیحات دوره"
                       @click="scrollTo('description')" />
                <q-tab v-if="setList.length !== 0"
                       name="sections"
                       label="سرفصل ها"
                       @click="scrollTo('sections')" />
                <q-tab v-if="contentListLength !== 0"
                       name="documents"
                       label="نمونه محتوا"
                       @click="scrollTo('documents')" />
                <!--      <q-tab v-if="giftListLength !== 0"-->
                <!--             name="gifts"-->
                <!--             label="هدیه ها" />-->
                <!--      <q-tab v-if="faqListLength !== 0"-->
                <!--             name="faq"-->
                <!--             label="سوالات متداول" />-->
              </q-tabs>
            </div>
            <div class="col-6">
              <div class="text-right">
                <q-btn class="size-md"
                       icon="ph:arrow-up"
                       square
                       flat
                       @click="scrollTop" />
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-section />
      </q-card>
    </div>
    <div ref="description"
         class="description">
      <q-intersection @enter="activeTab = 'description'">
        <course-explain v-model:height="courseExplainHeight"
                        :title="'توضیحات دوره'">
          <template v-slot:content>
            <div class="product-long-description"
                 v-html="localOptions.product.description?.long" />
          </template>
        </course-explain>
      </q-intersection>
    </div>
    <div v-if="setList.length !== 0"
         ref="sections"
         class="sections">
      <q-intersection @enter="activeTab = 'sections'">
        <course-explain v-model:height="sectionsHeight"
                        :content-type="'expansion-panel'"
                        :title="'سرفصل ها'">
          <template v-slot:content>
            <product-set-list :options="{product: localOptions.product, setList:setList}"
                              @update-set-list="onUpdateSetList($event)" />
          </template>
        </course-explain>
      </q-intersection>
    </div>
    <div v-if="contentListLength !== 0"
         ref="documents"
         class="documents">
      <q-intersection @enter="activeTab = 'documents'">
        <course-explain :title="'نمونه محتوا'"
                        :height="'100%'"
                        :show-button="false">
          <template v-slot:content>
            <div class="product-tab-panel">
              <product-demos :options="{
                contents: contents,
                product: localOptions.product
              }" />
            </div>
          </template>
        </course-explain>
      </q-intersection>
    </div>
    <!--    <q-tab-panels v-model="tab"-->
    <!--                  animated>-->
    <!--      <q-tab-panel name="description"-->
    <!--                   class="product-tab-panel">-->
    <!--        <course-explain :title="'توضیحات دوره'" />-->
    <!--        <div class="product-description-title">-->
    <!--          توضیحات تکمیلی دوره-->
    <!--        </div>-->
    <!--        <div class="product-long-description"-->
    <!--             v-html="localOptions.product.description?.long" />-->
    <!--      </q-tab-panel>-->
    <!--      <q-tab-panel name="sections"-->
    <!--                   class="product-tab-panel">-->
    <!--        <product-set-list :options="{product: localOptions.product, setList:setList}"-->
    <!--                          @update-set-list="onUpdateSetList($event)" />-->
    <!--      </q-tab-panel>-->
    <!--      <q-tab-panel name="documents">-->
    <!--        <div class="product-tab-panel">-->
    <!--          <product-demos :options="{-->
    <!--            contents: contents,-->
    <!--            product: localOptions.product-->
    <!--          }" />-->
    <!--        </div>-->
    <!--      </q-tab-panel>-->
    <!--      <q-tab-panel name="gifts">-->
    <!--        <div class="product-tab-panel">-->
    <!--          <product-gifts :options="{products: gifts}" />-->
    <!--        </div>-->
    <!--      </q-tab-panel>-->
    <!--      <q-tab-panel class="product-tab-panel"-->
    <!--                   name="faq">-->
    <!--        <product-f-a-q :options="{faqList:faqList}" />-->
    <!--      </q-tab-panel>-->
    <!--    </q-tab-panels>-->
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Product, ProductList } from 'src/models/Product.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { ContentList } from 'src/models/Content.js'
// import ProductGifts from 'src/components/Widgets/Product/ProductGifts/ProductGifts.vue'
import ProductDemos from 'src/components/Widgets/Product/ProductDemos/ProductDemos.vue'
// import ProductFAQ from 'src/components/Widgets/Product/ProductFAQ/ProductFAQ.vue'
import ProductSetList from 'src/components/Widgets/Product/ProductSetList/ProductSetList.vue'
import CourseExplain from 'components/Widgets/Product/ProductPage/components/CourseExplain/CourseExplain.vue'
import childProduct from 'components/Widgets/Product/ProductPage/components/ChildProduct.vue'
import lazyImg from 'components/lazyImg.vue'

export default defineComponent({
  name: 'ProductInfoTab',
  components: {
    lazyImg,
    childProduct,
    // ProductGifts,
    ProductDemos,
    // ProductFAQ,
    ProductSetList,
    CourseExplain
  },
  mixins: [mixinWidget],
  data () {
    return {
      courseExplainHeight: '150px',
      sectionsHeight: '659px',
      activeTab: 'description',
      defaultOptions: {
        product: new Product()
      },
      tab: 'description',
      gifts: new ProductList(),
      contents: new ContentList(),
      isSticky: false,
      faqList: [],
      setList: [],
      productData: {
        product_id: null,
        products: []
      }
    }
  },
  computed: {
    stickyElement () {
      return this.$refs.headerSticky
    },
    productId () {
      return this.localOptions.product.id ? this.localOptions.product.id : this.localOptions.paramKey ? this.$route.params[this.options.paramKey] : this.$route.params.id
    },
    setListLength () {
      return this.setList.length
    },
    contentListLength () {
      return this.contents.list.length
    },
    giftListLength () {
      return this.gifts.list.length
    },
    faqListLength () {
      return this.faqList.length
    }
  },
  watch: {
    productId () {
      this.getProductSets()
      this.getProductGifts()
      this.getSampleContents()
      this.getProductFaq()
    },
    activeTab (newValue) {
      this.scrollTo(newValue)
    }
  },
  mounted () {
    if (this.productId) {
      this.productData.product_id = this.productId
      this.getProductSets()
      this.getProductGifts()
      this.getSampleContents()
      this.getProductFaq()
    }
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    scrollTop () {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    },
    handleScroll () {
      this.isSticky = this.$refs.headerSticky.getBoundingClientRect().top <= 88
    },
    scrollTo (refName) {
      const element = this.$refs[refName]
      if (element) {
        const top = element.offsetTop + 250
        window.scrollTo({ top, behavior: 'smooth' })
      }
    },
    addChildToProduct (productId) {
      this.productData.products.push(productId)
      this.$bus.emit('updateSelectedProductPrice', this.productData)
    },
    getProductGifts () {
      this.$apiGateway.product.gifts(this.productId)
        .then(productList => {
          this.gifts = productList
        })
        .catch(() => {})
    },
    getSampleContents () {
      return this.$apiGateway.product.sampleContent(this.productId)
        .then(contentList => {
          this.contents = contentList
        })
        .catch(() => {

        })
    },
    getProductFaq () {
      return this.$apiGateway.product.getProductFaq(this.productId)
        .then(faqList => {
          this.faqList = faqList
        })
        .catch(() => {

        })
    },
    getProductSets () {
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
    onUpdateSetList (setList) {
      this.setList = setList
    }
  }
})
</script>

<style lang="scss" scoped>
.product-info-container {
  display: flex;
  flex-direction: column;
  .selectable-product {
    .header {
      margin-bottom: 24px;
    }
  }
  .header-info {
    @media screen and (max-width: 600px) {
      position: fixed;
      width: 500px;
      top: 88px;
      z-index: 9999;
    }
  }
  .sticky {
    position: sticky;
    top: 88px;
    z-index: 9999;
  }
  .sections, .documents {
    margin-top: 16px;
  }
}
.product-tab-panel {
  //padding: 30px;

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
.description {
  margin-top: 16px;
  //height: 294px;
}
.content-info {
  margin-top: 16px;
  .scroll-area {
  }
}
</style>

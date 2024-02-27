<template>
  <div class="chatre-nejat-panel">
    <div v-if="canShowAdvisor"
         class="banner-row row">
      <div class="col-lg-6 col-12 chatre-nejat-slogan">
        <div class="chatre-nejat-title">
          مشاوره
        </div>
        <div class="chatre-nejat-description">
          حتما قبل از تماشای فیلم های این دوره، دوره مشاوره را مشاهده بفرمایید!
        </div>
      </div>
      <div class="col-lg-6 col-12 flex flex-center">
        <product-item-skeleton v-if="advisorLoading" />
        <set-item-component v-else-if="advisor.id !== null"
                            width="100%"
                            :setItem="advisor" />
        <div v-else>در حال حاضر محتوایی وجود ندارد.</div>
      </div>
    </div>
    <div class="products-container">
      <div class="row">
        <div class="col-12">
          <div class="product-type-selection">
            <div class="product-type-title">
              محتوای دوره
            </div>
            <div class="row">
              <div class="col-md-12 product-type-input">
                <q-select v-model="productType"
                          class="no-title"
                          :options="productTypeOptions"
                          option-label="title"
                          option-value="id" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="productLoading"
           class="row">
        <div class="col-lg-6 col-12 skeleton-col">
          <product-item-skeleton />
        </div>
        <div class="col-lg-6 col-12 skeleton-col">
          <product-item-skeleton />
        </div>
        <div class="col-lg-6 col-12 skeleton-col">
          <product-item-skeleton />
        </div>
        <div class="col-lg-6 col-12 skeleton-col">
          <product-item-skeleton />
        </div>
        <div class="col-lg-6 col-12 skeleton-col">
          <product-item-skeleton />
        </div>
        <div class="col-lg-6 col-12 skeleton-col">
          <product-item-skeleton />
        </div>
      </div>
      <div v-if="!productLoading"
           class="row q-col-gutter-md">
        <div v-for="(product,index) in products"
             :key="index"
             class="col-lg-6 col-12">
          <product-item-component :product="product" />
        </div>
      </div>
      <div v-if="!productLoading && products.length === 0"
           class="flex justify-center items-center">
        <h5>در حال حاضر محتوایی وجود ندارد.</h5>
      </div>
    </div>
  </div>

</template>

<script>
import { Set } from 'src/models/Set.js'
import { mixinTripleTitleSet } from 'src/mixin/Mixins.js'
import SetItemComponent from 'src/components/DashboardTripleTitleSet/SetItem.vue'
import ProductItemComponent from 'src/components/DashboardTripleTitleSet/ProductItem.vue'
import ProductItemSkeleton from 'src/components/DashboardTripleTitleSet/ProductItemSkeleton.vue'

export default {
  name: 'TripleTitleSetProducts',
  components: {
    SetItemComponent,
    ProductItemSkeleton,
    ProductItemComponent
  },
  mixins: [mixinTripleTitleSet],
  data () {
    return {
      advisorLoading: false,
      productLoading: false,
      products: [],
      advisor: new Set(),
      productType: {
        id: null,
        name: null,
        selected: false,
        title: null
      },
      productTypeOptions: []
    }
  },
  computed: {
    canShowAdvisor () {
      return this.advisorLoading || (!this.advisorLoading && this.advisor.id)
    }
  },
  watch: {
    productType (type, oldtype) {
      if (oldtype.id === null) {
        return
      }
      this.getProducts(type.id)
    }
  },
  methods: {
    afterSetEvent () {
      this.loadData()
    },
    loadData () {
      this.advisorLoading = true
      this.productLoading = true
      this.$apiGateway.events.formBuilder({
        params: ['majors']
      }).then(res => {
        this.productTypeOptions = res.majors
        this.productType = res.majors[0]
        this.getAdvisor()
        this.getProducts(this.productType.id)
      }).catch(() => {
        this.advisorLoading = false
        this.productLoading = false
      })
    },
    getProducts (type) {
      this.productLoading = true
      this.$apiGateway.events.getEventsProducts({
        data: { major_id: type },
        eventId: this.event.id
      }).then(res => {
        this.products = res.list
        this.productLoading = false
      }).catch(() => {
        this.productLoading = false
      })
    },
    getAdvisor () {
      this.advisorLoading = true
      this.$apiGateway.events.getEventsAdvisor({
        eventId: this.event.id
      }).then(res => {
        this.advisor = res
        this.advisorLoading = false
      }).catch(() => {
        this.advisorLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.chatre-nejat-panel {
  .banner-row {
    padding: 40px 70px 100px;
    background: #EAEAEA;

    @media only screen and (width <= 1024px) {
      padding: 10px 15px;
    }

    .chatre-nejat-slogan {
      @media only screen and (width <= 600px) {
        padding: 0 0 0 30PX;
      }
    }

    .chatre-nejat-title {
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 28px;
      letter-spacing: -0.03em;
      color: #333;
    }

    .chatre-nejat-description {
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      text-align: justify;
      letter-spacing: -0.03em;
      color: #333;
      margin-top: 16px;
      padding-right: 50px;
    }
  }

  .products-container {
    padding: 0 $space-4;

    @include media-max-width('md') {
      padding: 0 $space-2;
    }

    .product-type-selection{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 50px;
      padding: 40px 50px 30px;

      .product-type-title {
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 28px;
        letter-spacing: -0.03em;
        color: #333;
      }

      .product-type-input {
        //width: 130px;
        margin: 0 20px;
      }
    }

    .skeleton-col {
      padding: 5px 10px;
    }
  }
}
</style>

<template>
  <div class="chatre-nejat-panel">
    <div class="banner-row row">
      <div class="col-lg-6 col-12 chatre-nejat-slogan">
        <div class="chatre-nejat-title">
          مشاوره
        </div>
        <div class="chatre-nejat-description">
          حتما قبل از تماشای فیلم های دوره چتر نجات، دوره مشاوره را مشاهده بفرمایید!
        </div>
      </div>
      <div class="col-lg-6 col-12 flex flex-center">
        <product-item-skeleton v-if="loading" />
        <chatre-nejat-set-item v-else-if="advisor.id !== null"
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
            <div class="product-type-input">
              <q-select v-model="productType"
                        bg-color="white"
                        :options="productTypeOptions"
                        option-label="title"
                        option-value="id"
                        borderless />
            </div>
          </div>
        </div>
      </div>
      <div v-if="!loading"
           class="row">
        <div v-for="(product,index) in products"
             :key="index"
             class="col-lg-6 col-12 flex flex-center">
          <chatre-nejat-product-item :product="product" />
        </div>
      </div>
      <div v-if="!loading && (!products || products.length === 0)"
           class="flex justify-center items-center">
        <h5>در حال حاضر محتوایی وجود ندارد.</h5>
      </div>
      <div v-else-if="loading"
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
    </div>
  </div>

</template>

<script>
import { Set } from 'src/models/Set.js'
import ChatreNejatSetItem from 'src/components/DashboardChatreNejat/ChatreNejatSetItem.vue'
import ProductItemSkeleton from 'src/components/DashboardChatreNejat/ProductItemSkeleton.vue'
import ChatreNejatProductItem from 'src/components/DashboardChatreNejat/ChatreNejatProdutItem.vue'

export default {
  name: 'ChatreNejatProducts',
  components: {
    ChatreNejatProductItem,
    ChatreNejatSetItem,
    ProductItemSkeleton
  },
  data: () => ({
    loading: false,
    products: null,
    advisor: new Set(),
    productType: {
      id: null,
      name: null,
      selected: false,
      title: null
    },
    productTypeOptions: [
    ]
  }),
  watch: {
    productType(type, oldtype) {
      if (oldtype.id === null) {
        return
      }
      this.getProducts(type.id)
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData() {
      this.loading = true
      this.$apiGateway.events.formBuilder({
        params: ['majors']
      }).then(res => {
        this.productTypeOptions = res.majors
        this.productType = res.majors[0]
        this.getAdvisor()
        this.getProducts(this.productType.id)
      }).catch(() => {
        this.loading = false
      })
    },
    getProducts(type) {
      this.loading = true
      this.$apiGateway.events.getEventsProducts({
        data: { major_id: type },
        eventId: this.$enums.Events.ChatreNejat
      }).then(res => {
        this.products = res.list
        if (this.advisor !== null) {
          this.loading = false
        }
      }).catch(() => {
        this.loading = false
      })
    },
    getAdvisor() {
      this.$apiGateway.events.getEventsAdvisor({
        eventId: this.$enums.Events.ChatreNejat
      }).then(res => {
        this.advisor = res
        if (this.products !== null) {
          this.loading = false
        }
      }).catch(() => {
        this.loading = false
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

    @media only screen and (max-width: 600px) {
      padding: 10px 15px;
    }

    .chatre-nejat-slogan {
      @media only screen and (max-width: 600px) {
        padding: 0px 0px 0PX 30PX;
      }
    }

    .chatre-nejat-title {
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 28px;
      letter-spacing: -0.03em;
      color: #333333;
    }

    .chatre-nejat-description {
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      text-align: justify;
      letter-spacing: -0.03em;
      color: #333333;
      margin-top: 16px;
      padding-right: 50px;
    }
  }

  .products-container {
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
        color: #333333;
      }

      .product-type-input {
        width: 130px;
        margin: 0 20px;
      }
    }
    .skeleton-col {
      padding: 5px 10px;
    }
  }
}
</style>

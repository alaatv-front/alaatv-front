<template>
  <div class="chatre-nejat-panel">
    <div class="banner-row row">
      <div class="col-lg-6 col-12 chatre-nejat-slogan">
        <div class="chatre-nejat-title">
          مشاوره
        </div>
        <div class="chatre-nejat-description">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.
        </div>
      </div>
      <div class="col-lg-6 col-12 flex flex-center">
        <chatre-nejat-product-item :product="products[0]" />
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
      <div v-else
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
      </div>
    </div>
  </div>

</template>

<script>
import ChatreNejatProductItem from 'components/DashboardChatreNejat/ChatreNejatProdutItem.vue'
import ProductItemSkeleton from 'components/DashboardChatreNejat/ProductItemSkeleton.vue'
export default {
  name: 'ChatreNejatProducts',
  components: {
    ChatreNejatProductItem,
    ProductItemSkeleton
  },
  data: () => ({
    loading: false,
    products: [
      {
        title: null,
        description: null,
        teacher: null,
        photo: null,
        url: null,
        lastSeen: {
          title: null,
          section: null,
          url: null
        }
      }
    ],
    productType: {
      label: 'رشته ریاضی',
      value: 1
    },
    productTypeOptions: [
      {
        label: 'رشته ریاضی',
        value: 1
      },
      {
        label: 'رشته تجربی',
        value: 2
      },
      {
        label: 'رشته انسانی',
        value: 3
      }
    ]
  }),
  watch: {
    productType(type) {
      this.getProducts(type.value)
    }
  },
  created () {
    this.getProducts(this.productType.value)
  },
  methods: {
    getProducts(type) {
      this.loading = true
      this.$apiGateway.chatr.products({
        type
      }).then(res => {
        this.products = res
        this.loading = false
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
      padding: 5px 30px;
    }
  }
}
</style>

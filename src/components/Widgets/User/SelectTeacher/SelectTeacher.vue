<template>
  <div :style="defaultOptions.style"
       class="select-teacher">
    <div class="select-teacher__order-items">
      <div v-for="orderItem in productsShouldSelect"
           :key="orderItem.orderId"
           class="select-teacher__order-item">
        <div v-for="packageItem in orderItem.packages"
             :key="packageItem.packageProductId"
             class="select-teacher__order-item-package">
          <div v-for="(productGroup, productGroupIndex) in packageItem.products"
               :key="productGroupIndex"
               class="select-teacher__package-product-group row q-col-gutter-md">
            <div v-for="product in productGroup"
                 :key="product.productId"
                 class="col-md-3 col-sm-6 col-xs-12">
              <q-card class="select-teacher__package-product-item">
                <div class="product-item-image">
                  <!--                  <lazy-img :src="product.image" width="50" height="50" />-->
                  <lazy-img src="https://nodes.alaatv.com/upload/images/product/payam_20230925135554.jpg?w=193&h=193" />
                </div>
                <div class="product-item-info">
                  <div>{{ product.productId }}</div>
                  <div class="product-item-name">{{ product.name }}</div>
                  <div class="product-item-shortDescription">{{ product.shortDescription }}</div>
                  <div class="product-item-longDescriptionlongDescription">{{ product.longDescription }}</div>
                </div>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Set } from 'src/models/Set.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import LazyImg from 'components/lazyImg.vue'

export default {
  name: 'SelectTeacher',
  components: { LazyImg },
  mixins: [mixinWidget],
  data () {
    return {
      loading: false,
      productsShouldSelect: [],
      defaultOptions: {
        className: '',
        height: 'auto',
        boxed: false,
        boxedWidth: 1200,
        style: {},
        showCountOfContent: true,
        showCountOfVideo: true,
        showCountOfPamphlet: true,
        showBtnFavorSet: true,
        showBtnFavorContent: true
      },
      tab: '',
      set: new Set(),
      contentVideos: [],
      allGroupsOfContents: [],
      ordered: true
    }
  },
  mounted () {
    this.getProductsShouldSelect()
  },
  methods: {
    getProductsShouldSelect () {
      this.loading = true
      APIGateway.order.getProductsShouldSelect()
        .then((productsShouldSelect) => {
          this.productsShouldSelect = productsShouldSelect
          console.log('this.productsShouldSelect', this.productsShouldSelect)
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.select-teacher {
  .select-teacher__order-items {
    margin-bottom: $space-1;
    .select-teacher__order-item {
      margin-bottom: $space-4;
      .select-teacher__order-item-package {
        margin-bottom: $space-4;
        .select-teacher__package-product-group {
          margin-bottom: $space-4;
          .select-teacher__package-product-item {
            .product-item-image {
              :deep(.lazy-img) {
                width: 100%;
              }
            }
            .product-item-info {
              padding: $space-1;
              .product-item-name {}
              .product-item-shortDescription {}
              .product-item-longDescriptionlongDescription {}
            }
          }
        }
      }
    }
  }
}
</style>

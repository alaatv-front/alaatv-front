<template>
  <q-linear-progress v-if="loading"
                     class="q-mb-md"
                     indeterminate />
  <div class="row q-pa-md">
    <!--    ----------------------------------------------------------------------- filter boxes ------------------------------------------------------------------------------- -->
    <div class="col-12">
      <div class="filter-box-container">
        <div class="q-mb-lg filter-box">
          <q-icon name="mdi-tune-vertical-variant q-mr-md"
                  class="">
            <q-tooltip>
              مرتب سازی بر اساس
            </q-tooltip>
          </q-icon>
          <div class="sortingFilter-item date q-mr-md">
            <filter-box v-model:boxSortSelected="selectedFilterBoxValue"
                        :items="filterBoxSort"
                        type="filterBoxSort"
                        :custom-class="'sort'"
                        @update:filterBoxSort="onChangeFilterSortBox" />
          </div>
          <div class="sortingFilter-item subject q-mr-md">
            <filter-box ref="filterBoxCategory"
                        v-model:categorySelected="selectedFilterCategoryValue"
                        type="filterBoxCategory"
                        :items="filterBoxCategory"
                        :custom-class="'filter'"
                        @update:filterBoxCategory="onChangeFilterBoxCategory" />
          </div>
        </div>
      </div>
    </div>
    <!--    ------------------------------------------------------------------------ banner search products ------------------------------------------------------------------------------ -->
    <div class="col-sm-12 productsCol q-pa-sm-sm q-pa-xs-xs">
      <div class="q-mb-md productsSearch ">
        <q-input v-model="searchTarget"
                 outlined
                 standout
                 type="text"
                 rounded
                 filled
                 class="form-control m-input m-input--air"
                 placeholder="جستجو ...">
          <template v-slot:prepend>
            <q-icon name="mdi-magnify" />
          </template>
        </q-input>
      </div>
      <div class="q-px-xs-none row">
        <!--        class="row"-->
        <!--        <q-infinite-scroll ref="contentAndProductList"-->
        <!--                           :offset="250"-->
        <!--                           class="row"-->
        <!--                           @load="chargeProductList">-->
        <div v-for="(product, index) in filteredProduct.list"
             :key="index"
             class="q-ma-md">
          <product-item :options="{
                          canAddToCart: false,
                          showPrice: false,
                          product,
                          routeToProduct: false
                        }"
                        @click="productItemClicked(product.id)" />
        </div>
        <!--          <div v-for="(item, index) in items"-->
        <!--               :key="index"-->
        <!--               class="caption">-->
        <!--            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.</p>-->
        <!--          </div>-->
        <!--          <template v-slot:loading>-->
        <!--            <div class="row justify-center q-my-md">-->
        <!--              <q-spinner-dots color="primary"-->
        <!--                              size="40px" />-->
        <!--            </div>-->
        <!--</template>-->
        <!--          <template v-slot:loading>-->
        <!--            <div class="row justify-center q-my-md">-->
        <!--              <q-spinner-dots color="primary"-->
        <!--                              size="40px" />-->
        <!--            </div>-->
        <!--          </template>-->
        <!--          </q-infinite-scroll>-->
      </div>
      <!--    --------------------------------------------------------------------------- show content box   --------------------------------------------------------------------------- -->
      <div v-if="!currentProduct.title && !loading"
           class="m-portlet__body">
        <div class="text-center bg-primary q-pa-lg noContentMessage">
          <div>
            <q-icon size="28px"
                    name="mdi-information-outline" />
            محصولی وجود ندارد.
          </div>
        </div>
      </div>
    </div>
  </div>
  <q-dialog v-model="productContentsDialog"
            position="bottom">
    <div class="product-contents">
      <product-contents :options="{
        productId: currentProductId
      }" />
    </div>
  </q-dialog>
</template>

<script>
import { Set } from 'src/models/Set.js'
import Assist from 'src/plugins/Assist.js'
import { Product, ProductList } from 'src/models/Product.js'
import FilterBox from 'src/components/userPurchases/filterBox.vue'
// import PurchaseItem from 'src/components/userPurchases/PurchaseItem.vue'
import { mixinWidget } from 'src/mixin/Mixins.js'
import ProductItem from 'components/Widgets/Product/ProductItem/ProductItem.vue'
import ProductContents from 'components/Widgets/Product/ProductContents/ProductContents.vue'

export default {
  name: 'MyPurchases',
  components: {
    ProductContents,
    ProductItem,
    FilterBox
    // PurchaseItem
  },
  mixins: [mixinWidget],
  data () {
    return {
      currentProductId: '',
      productContentsDialog: false,
      items: [{}, {}, {}, {}, {}, {}, {}],
      scrollTargetRef: null,
      loading: false,
      dataLoaded: false,
      showContentDialog: false,
      selectedTab: 'pamphlet',
      searchTarget: '',
      selectedFilterBoxValue: null,
      selectedFilterCategoryValue: null,
      filterBoxCategory: [],
      filteredProduct: new ProductList(),
      filterBoxSort: [
        {
          name: 'جدید ترین ها',
          value: 'data-sort1',
          selected: true
        },
        {
          name: 'قدیمی ترین ها',
          value: 'data-sort2',
          selected: false
        }],
      selectedSet: new Set(),
      products: new ProductList()
    }
  },
  computed: {
    videoContents() {
      return this.selectedSet.contents.list.filter(content => content.type === 8)
    },
    pamphletsContents() {
      return this.selectedSet.contents.list.filter(content => content.type === 1)
    },
    currentProduct () {
      if (this.filteredProduct.list.length > 0) {
        return this.filteredProduct.list[0]
      }
      return new Product()
    }
  },
  watch: {
    searchTarget (value) {
      this.filterProductBySearchInput()
      this.products.list = this.products.list.splice(0, this.products.list.length)
    }
  },
  async mounted () {
    await this.initFilterProduct()
    await this.setPurchasedProducts()
    this.setFilterBoxSelected()
    this.setFilterCategorySelected()
    this.setFirstContentsShow()
  },
  methods: {
    async initFilterProduct () {
      await this.setFilterBoxCategories()
      this.filterProduct()
    },
    async setFilterBoxCategories() {
      this.loading = true
      this.filterBoxCategory = await this.$apiGateway.product.getProductCategories()
      this.loading = false
    },
    async setPurchasedProducts () {
      this.loading = true
      const response = await this.getPurchasedProducts()
      this.products = response.referralCodeList
      this.loading = false
    },
    getPurchasedProducts (page = 1) {
      return this.$apiGateway.user.getPurchasedProducts({
        page
      })
    },
    chargeProductList(index, done) {
      // console.log('chargeProductList', index)
      setTimeout(() => {
        this.products.push(...this.products)
        done()
      }, 2000)
    },
    productItemClicked (productId) {
      this.currentProductId = productId
      this.productContentsDialog = !this.productContentsDialog
    },
    filterProduct () {
      this.filterProductByCategory()
      this.sortProducts()
    },
    filterProductBySearchInput () {
      if (!this.searchTarget) {
        return
      }
      this.filteredProduct.list = this.filteredProduct.list.filter(this.hasSearchTarget)
    },
    hasSearchTarget (data) {
      return Assist.stringContain(this.searchTarget, data.title) || data.sets.list.filter(set => (Assist.stringContain(this.searchTarget, set.title))).length > 0
    },
    filterProductByCategory () {
      const newList = this.products.list.filter(product => product.category === this.selectedFilterCategoryValue || this.selectedFilterCategoryValue === 'all')
      this.filteredProduct = new ProductList(newList)
    },
    sortProducts () {
      if (this.selectedFilterBoxValue === 'data-sort1') {
        this.filteredProduct.sortByKey('category', 'asc')
        return
      }
      this.filteredProduct.sortByKey('category', 'des')
    },
    onChangeFilterSortBox (val) {
      this.selectedFilterBoxValue = val
      this.sortProducts()
      this.filterProductBySearchInput()
    },
    onChangeFilterBoxCategory (val) {
      this.selectedFilterCategoryValue = val
      this.filterProductByCategory()
      this.filterProductBySearchInput()
    },

    setFirstContentsShow() {
      // todo : don't commit
      // if (this.products.list.length === 0 || this.products.list[0].sets.list.length === 0) {
      //   return
      // }
      const firstSet = this.products.list[1].sets.list[0]
      this.handlesTabs()
      this.getContentsData(firstSet)
    },

    setFilterBoxSelected () {
      this.onChangeFilterSortBox(this.filterBoxSort[0].value)
    },

    setFilterCategorySelected () {
      this.onChangeFilterBoxCategory(this.filterBoxCategory[0].value)
    },

    getContentsData (set) {
      this.selectedSet.loading = true
      this.selectedSet.contents.clear()
      const testFile = {
        video: [
          {
            link: 'https://alaatv.com/d/eyJpdiI6IkJ6dGdWVmxQNFEzSVdncWFpYU9WWkE9PSIsInZhbHVlIjoiVDY3dTBkbGd2a3hpTnRxWEV3bTA2aisyaGE2OFdzNWtNYjc5b1EvdUNNSVpVZlczMHdtY3ZCMm1FcnBFdStWNmZTcFMzcjh3WFJob3Y0c1cwa2M5UnRSV0gxWXh3WVBPdVJkMGV0UXpYZzA0VGQyMzJHZHU3TXBGbFhrWEpaVVA1cEhvNDF3R2ZldHorUSs0dExKR01ra1ZhdDh4S01JcGNVcFBrNWVVV2ZHQmpuUW5vTXdaWlhTSFZ0N0JrZVdnIiwibWFjIjoiYTdkMGEyNmRjZWY4NWI4Yjg5ZmZmNzdkMWJjYzM3MTM0OWY0MzM4ZmI3MTA4YmU4ODI5YjhhMmYyYzkwMjA3YyIsInRhZyI6IiJ9',
            ext: 'mp4',
            size: '1.2 G',
            caption: 'کیفیت عالی',
            res: '720p'
          },
          {
            link: 'https://alaatv.com/d/eyJpdiI6IjJ2MEhsRHdXeFdJcHNock1jbnlNUlE9PSIsInZhbHVlIjoiVjZXMVhyMFZsNUh6QnlJM1Z0cTMzYy9WT1hLUXQwWTNoVXZkbzRRcGtpWEQ5SXNESzlqb3NSS3l4bkxDZDdCd3oybHpzZVg4ZzlkWFZqdkQ3YytnQVM5bnJsMjBIZUVMSFVCMVVZdlhOOE0vZG5xZ1R3ekhNWWx4VXUxQ1RCbng4SFNPQnFCZ1VwV2R0bDRpcmNnMWZWdjNzWGhoSHRTcVN0V3UyUmtrb1l3PSIsIm1hYyI6ImZlNmQwY2QyZmYxNDFmMDdhZjQzYjU3MTljNTFmNThlNmE0MWJjN2U0MWViOTZjOTg4OWQ3YWQ1NTc5MzU3ZGUiLCJ0YWciOiIifQ==',
            ext: 'mp4',
            size: '90 MB',
            caption: 'کیفیت بالا',
            res: '480p'
          },
          {
            link: 'https://alaatv.com/d/eyJpdiI6IkY1WjJnZlJHVko0VjcrSWZ5RGxYL3c9PSIsInZhbHVlIjoiM25ZUEZmQjdWcFNOSGRKcU9nN3VZaThjWjk1bEg2dllpUUg5QmIvZ2Y2NWhJQ01pSUpITnpWeU5Icis1NnRZSDZjY3dNM0Y4UlpaZ1Exb0VxSlhqVDVQRGhkdDFFQzNNRTVISTR4OTBMQTQvbk5vd3Y0YWFLZWwxSit0SVpOOUZCck5KSC9hcGh1YW9ERDF3TXBlYldFZzJxLzd6a2ErY29PQ1Vzb3JNSEVvPSIsIm1hYyI6ImQ3NTZmMDlhNTY5MDM2YWM3NzY5NjA4NzMzM2VhNjQzOTYxMTYzMDllMmQ0Yjg1YTc4ZDU1OTkxNzYzMWNhN2QiLCJ0YWciOiIifQ==',
            ext: 'mp4',
            size: '36 MB',
            caption: 'کیفیت متوسط',
            res: '240p'
          }
        ],
        pamphlet: null,
        voice: null
      }
      const testPamphlet = {
        video: null,
        pamphlet: [
          {
            link: 'https://alaatv.com/d/eyJpdiI6InR2RExYRXduVmtIZDdoeHpDSm9adHc9PSIsInZhbHVlIjoidkl2ZnJvT1BERzQ1L01TdmRINThNbGZDMmk2eTdveDZHNG9OQml1Y2RmNkNRcEt4K2dCeWJFbytKL3pCTU51KzBZZ29PWlNiSC9Qd3FhSWUrSmxPVHZOaG5DWW0rcldYVER1aWlBVHQwUEYxUlFKaE1aL0Z6NmpqVDQvR2lBY094L0k4azk5ZXVhM0graklINFVFcFFsTmQ0QThoU21LSk5FWm1kVGlxWVVRNEErU04zckVJNXlqa2ZFaDdNSnREIiwibWFjIjoiNmU4NGE5YWM1YzgyMTE3ZmM1YmNhNjY1YzVkZjZhMjAyYTg4ZjBmZDA4MzcyNWUyYzM2Nzg2YmQ2NDAxNWFlNiIsInRhZyI6IiJ9',
            ext: 'pdf',
            size: '401 KB',
            caption: 'جزوه'
          }
        ],
        voice: null
      }
      this.getSelectedSetContents(set.id).then((contentResponse) => {
        contentResponse.list.forEach(content => {
          if (content.isVideo()) {
            content.file = testFile
          } else {
            content.file = {
              video: null,
              pamphlet: testPamphlet,
              voice: null
            }
          }
        })
        this.selectedSet = set
        this.selectedSet.contents.list = contentResponse.list
        this.selectedSet.loading = false
      })
        .catch(() => {
          this.selectedSet.loading = false
        })
    },
    handleShowModal() {
      this.showContentDialog = this.$store.getters['AppLayout/windowSize'].x < 1024
    },
    setSelectedSet (data) {
      this.handleShowModal()
      this.handlesTabs(data.contentType)
      this.getContentsData(data.setId)
    },
    handlesTabs (contentType = 'video') {
      this.selectedTab = contentType === 'pamphlet'
        ? 'pamphlet'
        : 'video'
    },
    getSelectedSetContents (setId) {
      return this.$apiGateway.set.getContents(setId)
    }
  }

}
</script>

<style scoped lang="scss">
.product-contents {
  min-width: 350px;
  :deep(.q-card.custom-card:not([class^=col])) {
    box-shadow: none;
  }
}
.costume-background-color{
  background: #F6F8FA !important;
}
.filter-box-container{
  overflow-x: scroll;
  .filter-box{
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 820px;
  }

}
.noContentMessage{
  font-size: 18px;
  font-weight: 500;
  color: white;
  border-radius: 15px;
}

.abrishamAssetBanner {
  /*background: #fec107;*/
  /*padding: 10px;*/
  /*text-align: center;*/
  /*color: white;*/
}

.abrishamAssetBanner img {
  width: 100%;
}

.nav-fill .nav-item {
  cursor: pointer;
}

.productsCol .productsSearch input {
  border-radius: 35px;
  margin-bottom: 15px;
  margin-top: 10px;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}

.list-enter-active, .list-leave-active {
  transition: all 0.5s;
}

.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */
{
  opacity: 0;
  transform: translateY(30px);
}

.fade-enter-active > *,
.fade-leave-active > * {
  transition-duration: 200ms;
  transition-property: opacity, transform;
  transition-timing-function: cubic-bezier(0.6, 0.15, 0.35, 0.8);
}

.fade-enter > *,
.fade-leave-to > * {
  opacity: 0;
  transform: translateX(40px);
}

.fade-enter-active > *:nth-child(2) {
  transition-delay: 100ms;
}

</style>

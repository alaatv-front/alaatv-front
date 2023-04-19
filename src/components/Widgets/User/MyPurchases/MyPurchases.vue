<template>
  <q-linear-progress v-if="loading"
                     class="q-mb-md"
                     indeterminate />
  <div class="row q-pa-md">
    <!--    ----------------------------------------------------------------------- filter boxes ------------------------------------------------------------------------------- -->
    <div class="col-12 q-pa-md bg-white header">
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
      <div class="q-my-md productsSearch ">
        <q-input v-model="searchTarget"
                 outlined
                 standout
                 type="text"
                 rounded
                 filled
                 class="form-control m-input m-input--air"
                 placeholder="جستجو ..."
                 @keydown.enter="sortProducts">
          <template v-slot:append>
            <q-icon v-if="searchTarget !== ''"
                    name="close"
                    class="cursor-pointer"
                    @click="searchTarget = ''" />
          </template>

          <template v-slot:after>
            <q-btn round
                   dense
                   unelevated
                   color="primary"
                   icon="search"
                   @click="sortProducts" />
          </template>
        </q-input>
      </div>
    </div>
    <!--    ------------------------------------------------------------------------ banner search products ------------------------------------------------------------------------------ -->
    <div class="col-12 productsCol q-pa-sm-sm q-pa-xs-xs">
      <div class="q-px-xs-none row justify-center items-center">
        <div v-for="(product, index) in filteredProduct.list"
             :key="index"
             class="col-12 col-sm-6 col-md-auto col-lg-auto q-ma-md-md q-mb-sm-md flex justify-center">
          <product-item class="product-item"
                        :options="{
                          canAddToCart: false,
                          showPrice: false,
                          product,
                          routeToProduct: false
                        }"
                        @click="productItemClicked(product)" />
        </div>
      </div>
      <pagination :meta="productPaginationMeta"
                  :disable="loading"
                  @updateCurrentPage="getProductsByPage" />
      <!--    --------------------------------------------------------------------------- show content box   --------------------------------------------------------------------------- -->
      <div v-if="!currentProduct.title && !loading">
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
        product: selectedProduct,
        contentGridView: true
      }" />
    </div>
  </q-dialog>
</template>

<script>
import { Set } from 'src/models/Set.js'
import { Product, ProductList } from 'src/models/Product.js'
import FilterBox from 'src/components/userPurchases/filterBox.vue'
import { mixinWidget } from 'src/mixin/Mixins.js'
import ProductItem from 'components/Widgets/Product/ProductItem/ProductItem.vue'
import ProductContents from 'components/Widgets/Product/ProductContents/ProductContents.vue'
import Pagination from 'components/Utils/Pagination.vue'

export default {
  name: 'MyPurchases',
  components: {
    Pagination,
    ProductContents,
    ProductItem,
    FilterBox
  },
  mixins: [mixinWidget],
  data () {
    return {
      productPaginationMeta: {},
      selectedProduct: new Product(),
      productContentsDialog: false,
      scrollTargetRef: null,
      loading: false,
      dataLoaded: false,
      showContentDialog: false,
      selectedTab: 'pamphlet',
      searchTarget: '',
      selectedFilterBoxValue: 'asc',
      selectedFilterCategoryValue: null,
      currentPage: 1,
      filterBoxCategory: [],
      filteredProduct: new ProductList(),
      filterBoxSort: [
        {
          name: 'جدید ترین ها',
          value: 'asc',
          selected: true
        },
        {
          name: 'قدیمی ترین ها',
          value: 'desc',
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
  async mounted () {
    await this.initFilterProduct()
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
      const categories = await this.$apiGateway.product.getCategories()
      this.filterBoxCategory = categories.list
      this.loading = false
    },
    async setPurchasedProducts () {
      this.loading = true
      this.filteredProduct = new ProductList()
      this.products = new ProductList()
      const purchasedProducts = await this.getPurchasedProducts()
      this.products = purchasedProducts.referralCodeList
      this.productPaginationMeta = purchasedProducts.paginate
      this.loading = false
    },
    getPurchasedProducts () {
      return this.$apiGateway.user.getPurchasedProducts({
        ...(this.currentPage && { page: this.currentPage }),
        ...(this.searchTarget && { title: this.searchTarget }),
        ...(this.selectedFilterBoxValue && { sort_by_order_completed_at: this.selectedFilterBoxValue })
      })
    },
    getProductsByPage (pageNum) {
      this.currentPage = pageNum
      this.sortProducts()
    },
    productItemClicked (product) {
      this.selectedProduct = product
      this.productContentsDialog = !this.productContentsDialog
    },
    filterProduct () {
      this.filterProductByCategory()
      this.sortProducts()
    },
    filterProductByCategory () {
      const newList = this.products.list.filter(product => product.category === this.selectedFilterCategoryValue || this.selectedFilterCategoryValue === 'all')
      this.filteredProduct = new ProductList(newList)
    },
    async sortProducts () {
      await this.setPurchasedProducts()
      this.filteredProduct = this.products
    },
    onChangeFilterSortBox (val) {
      this.selectedFilterBoxValue = val
      this.sortProducts()
    },
    onChangeFilterBoxCategory (val) {
      this.selectedFilterCategoryValue = val
      this.filterProductByCategory()
    },

    setFirstContentsShow() {
      if (this.products.list.length === 0 || this.products.list[0].sets.list.length === 0) {
        return
      }
      const firstSet = this.products.list[0].sets.list[0]
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
      this.getSelectedSetContents(set.id).then((contentResponse) => {
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
.header {
  border-radius: 14px;
}
.product-contents {
  width: 1024px;
  max-width: 1024px;
  :deep(.q-card.custom-card:not([class^=col])) {
    box-shadow: none;
  }
  @media screen and (max-width: 1023px) {
    min-width: 320px;
    padding: 20px;
  }
}

.product-item {
  width: 245px;
  @media screen and (max-width: 1024px) {
    width: 300px;
  }
  @media screen and (max-width: 790px) {
    margin: 15px;
  }
}

.costume-background-color{
  background: #F6F8FA !important;
}
.filter-box-container{
  overflow-x: auto;
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

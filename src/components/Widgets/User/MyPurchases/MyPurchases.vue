<template>
  <div class="MyPurchases">
    <div class="lt-sm flex justify-end">
      <q-btn flat
             color="grey"
             :to="{name: 'UserPanel.Dashboard'}">
        <q-icon name="isax:layer"
                class="q-mr-sm" />
        >
      </q-btn>
    </div>
    <q-linear-progress v-if="loading"
                       class="q-mb-md"
                       indeterminate />
    <div class="row q-pa-md">
      <!--    ----------------------------------------------------------------------- filter boxes ------------------------------------------------------------------------------- -->
      <div class="col-12 q-pa-md bg-white header">
        <div class="filter-box-container">
          <div class="outsideLabel">مرتب سازی بر اساس: </div>
          <div class="q-mb-sm filter-box row q-col-gutter-md">
            <div class="sortingFilter-item col-12 col-sm-6 date">
              <q-select v-model="selectedFilterBoxValue"
                        :options="filterBoxSort"
                        option-value="value"
                        map-options
                        @update:model-value="onChangeFilterSortBox" />
            </div>
            <div class="sortingFilter-item col-12 col-sm-6 subject">
              <q-select v-model="currentCategory"
                        :options="localOptions.filterBoxCategory"
                        option-value="value"
                        option-label="name"
                        map-options
                        @update:model-value="onChangeFilterBoxCategory" />
            </div>
          </div>
        </div>
        <div class="q-my-md productsSearch ">
          <q-input v-model="searchTarget"
                   type="text"
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
      <div class="col-12 productsCol q-mt-md q-px-xs-md q-px-none">
        <div class="row justify-center items-center q-col-gutter-sm-lg">
          <div v-for="(product, index) in filteredProduct.list"
               :key="index"
               class="col-12 col-sm-4 col-md-3">
            <product-item :options="{
                            canAddToCart: false,
                            showPrice: false,
                            productViewType: 'none',
                            product,
                            routeToProduct: false
                          }"
                          @productClicked="productItemClicked(product)" />
          </div>
        </div>
        <pagination v-if="filteredProduct.list.length > 0"
                    :meta="productPaginationMeta"
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
              full-width
              position="bottom">
      <div class="product-contents">
        <product-contents :options="{
          productId: selectedProduct.id,
          contentGridView: true,
          showContentDownloadMenu: true
        }" />
      </div>
    </q-dialog>
  </div>
</template>

<script>
import { Set } from 'src/models/Set.js'
import { Product, ProductList } from 'src/models/Product.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import ProductItem from 'components/Widgets/Product/ProductItem/ProductItem.vue'
import ProductContents from 'components/Widgets/Product/ProductContents/ProductContents.vue'
import Pagination from 'components/Utils/Pagination.vue'

export default {
  name: 'MyPurchases',
  components: {
    Pagination,
    ProductContents,
    ProductItem
  },
  mixins: [mixinWidget],
  data () {
    return {
      defaultOptions: {
        filterBoxCategory: []
      },
      productPaginationMeta: {},
      selectedProduct: new Product(),
      productContentsDialog: false,
      scrollTargetRef: null,
      loading: false,
      dataLoaded: false,
      showContentDialog: false,
      selectedTab: 'pamphlet',
      searchTarget: '',
      selectedFilterBoxValue: 'desc',
      currentPage: 1,
      filteredProduct: new ProductList(),
      filterBoxSort: [
        {
          label: 'جدید ترین ها',
          value: 'desc',
          selected: true
        },
        {
          label: 'قدیمی ترین ها',
          value: 'asc',
          selected: false
        }],
      selectedSet: new Set(),
      products: new ProductList(),
      currentCategory: ''
    }
  },
  computed: {
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
    initFilterProduct () {
      // await this.setFilterBoxCategories()
      this.filterProduct()
    },
    async setFilterBoxCategories() {
      this.loading = true
      const categories = await this.$apiGateway.product.getCategories()
      this.defaultOptions.filterBoxCategory = categories.list
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
        ...(this.currentCategory && { category: this.currentCategory }),
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
      this.sortProducts()
    },
    async sortProducts () {
      await this.setPurchasedProducts()
      this.filteredProduct = this.products
    },
    onChangeFilterSortBox (val) {
      this.selectedFilterBoxValue = val?.value || val
      this.sortProducts()
    },
    onChangeFilterBoxCategory (val) {
      this.currentCategory = val?.value || val
      this.sortProducts()
    },

    setFirstContentsShow() {
      if ((this.products.list.length === 0 && this.products.list[0]) || !this.products.list[0]?.sets) {
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
      this.onChangeFilterBoxCategory(this.localOptions.filterBoxCategory[0].value)
    },

    getContentsData (set) {
      this.selectedSet.loading = true
      this.selectedSet.contents.clear()
      this.$apiGateway.set.getContents(set.id).then((contents) => {
        this.selectedSet = set
        this.selectedSet.contents = contents
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
    }
  }

}
</script>

<style scoped lang="scss">
.MyPurchases {
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

  .costume-background-color{
    background: #F6F8FA !important;
  }
  .filter-box-container{
    overflow-x: auto;
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
}
</style>
